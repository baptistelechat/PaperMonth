import { FullScreenPreview } from "@/components/generator/FullScreenPreview";
import { WallpaperCanvas } from "@/components/WallpaperCanvas";
import { useWallpaperStore } from "@/hooks/useWallpaperStore";
import { Settings2 } from "lucide-react";
import React, { useState } from "react";

interface PreviewAreaProps {
  canvasRef: React.RefObject<HTMLDivElement>;
  containerRef: React.RefObject<HTMLDivElement>;
  scale: number;
}

export const PreviewArea: React.FC<PreviewAreaProps> = ({
  canvasRef,
  containerRef,
  scale,
}) => {
  const { config } = useWallpaperStore();
  const { dimensions } = config;
  const [isFullscreenOpen, setIsFullscreenOpen] = useState(false);

  return (
    <>
      <div
        ref={containerRef}
        className="relative flex flex-1 items-center justify-center overflow-hidden bg-zinc-950 bg-[url('/grid-pattern.svg')]"
        onClick={() => {
          // Only open on mobile/tablet (approx < 1024px or strictly touch devices,
          // but checking window width in click handler is simple enough)
          if (window.innerWidth < 1024) {
            setIsFullscreenOpen(true);
          }
        }}
      >
        {/* Dotted Background (Simulated with CSS) */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle, #fff 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        />

        <div
          style={{
            transform: `scale(${scale})`,
            transformOrigin: "center",
            boxShadow: "0 0 100px rgba(0,0,0,0.5)",
          }}
          className="transition-transform duration-200 ease-out cursor-pointer lg:cursor-default"
        >
          <WallpaperCanvas ref={canvasRef} />

          {/* Mobile Overlay Hint */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors active:bg-black/10 lg:hidden">
            {/* Transparent overlay for touch feedback */}
          </div>
        </div>

        {/* Zoom Info */}
        <div className="absolute right-6 bottom-4 rounded-full border border-white/10 bg-zinc-900/80 px-3 py-1.5 text-xs text-zinc-400 backdrop-blur flex items-center gap-2">
          <Settings2 className="size-3" />
          {Math.round(dimensions.width * dimensions.scale)}x
          {Math.round(dimensions.height * dimensions.scale)}px -{" "}
          {Math.round((scale / (dimensions.scale || 1)) * 100)}%
        </div>
      </div>

      <FullScreenPreview
        open={isFullscreenOpen}
        onOpenChange={setIsFullscreenOpen}
      />
    </>
  );
};
