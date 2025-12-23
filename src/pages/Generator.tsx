import { ControlPanel } from "@/components/ControlPanel";
import { ExportOverlay } from "@/components/generator/ExportOverlay";
import { GeneratorHeader } from "@/components/generator/GeneratorHeader";
import { PreviewArea } from "@/components/generator/PreviewArea";
import { useExport } from "@/hooks/useExport";
import { useUmami } from "@/hooks/useUmami";
import { useWallpaperStore } from "@/hooks/useWallpaperStore";
import { getExportTrackingData } from "@/utils/tracking";
import React, { useEffect, useRef, useState } from "react";

export const Generator: React.FC = () => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.5);
  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState({
    current: 0,
    total: 0,
  });
  const [abortController, setAbortController] =
    useState<AbortController | null>(null);

  const { exportWallpaper, exportYear } = useExport();
  const { track } = useUmami();
  const { config } = useWallpaperStore();
  const { dimensions } = config;

  // Auto-scale logic
  useEffect(() => {
    const handleResize = () => {
      if (!containerRef.current) return;

      const padding = 64; // 32px padding on each side
      const availableWidth = containerRef.current.clientWidth - padding;
      const availableHeight = containerRef.current.clientHeight - padding;

      const scaleX = availableWidth / dimensions.width;
      const scaleY = availableHeight / dimensions.height;

      // Use the smaller scale to fit entirely, with a max of 1
      setScale(Math.min(scaleX, scaleY, 1));
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [dimensions]);

  const handleExportMonth = async () => {
    track("Export", getExportTrackingData(config, "Month"));

    setIsExporting(true);
    setExportProgress({ current: 0, total: 1 }); // Indeterminate or single step
    const fileName = `PaperMonth_${config.calendar.year}_${
      config.calendar.month + 1
    }`;

    // Always use store dimensions for now as we want to respect user selection
    // But if we wanted to support export-only scaling, we could pass overrideWidth/Height here
    // based on a different selection than the view dimensions.
    // For now, let's assume the user wants to export what they see (dimensions in store).
    await exportWallpaper(canvasRef, fileName);
    setIsExporting(false);
    setExportProgress({ current: 0, total: 0 });
  };

  const handleExportYear = async () => {
    track("Export", getExportTrackingData(config, "Year"));

    setIsExporting(true);
    const controller = new AbortController();
    setAbortController(controller);
    setExportProgress({ current: 0, total: 12 });

    await exportYear(
      canvasRef,
      config.calendar.year,
      (current, total) => {
        setExportProgress({ current, total });
      },
      controller.signal
    );

    setIsExporting(false);
    setExportProgress({ current: 0, total: 0 });
    setAbortController(null);
  };

  const handleCancelExport = () => {
    if (abortController) {
      abortController.abort();
      setIsExporting(false);
      setExportProgress({ current: 0, total: 0 });
      setAbortController(null);
    }
  };

  return (
    <div className="relative flex h-dvh w-full flex-col overflow-auto bg-black font-sans text-white lg:flex-row lg:overflow-hidden">
      <ExportOverlay
        isExporting={isExporting}
        progress={exportProgress}
        onCancel={handleCancelExport}
      />

      {/* Sidebar */}
      <ControlPanel />

      {/* Main Content */}
      <div className="relative flex min-h-[50vh] md:min-h-[70vh] min-w-0 flex-1 flex-col bg-zinc-950 lg:min-h-0">
        <GeneratorHeader
          isExporting={isExporting}
          onExportMonth={handleExportMonth}
          onExportYear={handleExportYear}
        />

        <PreviewArea
          canvasRef={canvasRef}
          containerRef={containerRef}
          scale={scale}
        />
      </div>
    </div>
  );
};
