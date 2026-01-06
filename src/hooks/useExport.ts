import { getResolutionScale } from "@/constants/resolutions";
import { saveAs } from "file-saver";
import { toBlob, toPng } from "html-to-image";
import JSZip from "jszip";
import { useCallback } from "react";
import { getRandomTips, useWallpaperStore } from "./useWallpaperStore";

export function useExport() {
  const { config, setCalendarConfig, setTipsConfig, setDimensionsConfig } =
    useWallpaperStore();
  const { width, height, scale, exportWidth, exportHeight, exportResolutions } =
    config.dimensions;

  const exportWallpaper = useCallback(
    async (
      ref: React.RefObject<HTMLElement>,
      fileName: string,
      onProgress?: (current: number, total: number) => void
    ) => {
      if (ref.current === null) {
        return;
      }

      // Check if we have multiple resolutions to export
      const targets =
        exportResolutions && exportResolutions.length > 0
          ? exportResolutions
          : [
              {
                width: exportWidth ?? Math.round(width * scale),
                height: exportHeight ?? Math.round(height * scale),
                label: "Default",
              },
            ];

      if (targets.length === 1 && targets[0].label === "Default") {
        // Simple single export
        const finalWidth = targets[0].width;
        const finalHeight = targets[0].height;

        try {
          const dataUrl = await toPng(ref.current, {
            cacheBust: true,
            width: finalWidth,
            height: finalHeight,
            pixelRatio: 1,
            style: {
              transform: `scale(${scale})`,
              transformOrigin: "top left",
              width: `${width}px`,
              height: `${height}px`,
            },
          });

          const link = document.createElement("a");
          link.download = `${fileName}.png`;
          link.href = dataUrl;
          link.click();
        } catch (err) {
          console.error("Failed to export wallpaper", err);
        }
      } else {
        // Multi-resolution export (ZIP)
        const zip = new JSZip();
        const originalDimensions = { ...config.dimensions };

        try {
          for (let i = 0; i < targets.length; i++) {
            const target = targets[i];
            onProgress?.(i, targets.length);

            // Update store to render correct aspect ratio
            const referenceHeight = 1080;
            const newScale = getResolutionScale(target.height);
            const baseWidth =
              Math.round((target.width / newScale) * 10000) / 10000;
            const baseHeight = referenceHeight;

            setDimensionsConfig({
              width: baseWidth,
              height: baseHeight,
              scale: newScale,
              exportWidth: target.width,
              exportHeight: target.height,
            });

            // Wait for render
            await new Promise((resolve) => setTimeout(resolve, 500));

            const blob = await toBlob(ref.current, {
              cacheBust: true,
              width: target.width,
              height: target.height,
              pixelRatio: 1,
              style: {
                transform: `scale(${newScale})`,
                transformOrigin: "top left",
                width: `${baseWidth}px`,
                height: `${baseHeight}px`,
              },
            });

            if (blob) {
              const suffix =
                target.label !== "Default" && target.label !== "Custom"
                  ? `_${target.label}`
                  : `_${target.width}x${target.height}`;
              zip.file(`${fileName}${suffix}.png`, blob);
            }
          }

          const content = await zip.generateAsync({ type: "blob" });
          saveAs(content, `${fileName}_Multi.zip`);
        } catch (err) {
          console.error("Failed to export multi-res", err);
        } finally {
          // Restore
          setDimensionsConfig(originalDimensions);
          onProgress?.(0, 0);
        }
      }
    },
    [
      width,
      height,
      scale,
      exportWidth,
      exportHeight,
      exportResolutions,
      config.dimensions,
      setDimensionsConfig,
    ]
  );

  const exportYear = useCallback(
    async (
      ref: React.RefObject<HTMLElement>,
      year: number,
      onProgress?: (current: number, total: number) => void,
      abortSignal?: AbortSignal
    ) => {
      if (ref.current === null) {
        return;
      }

      const zip = new JSZip();
      const originalConfig = { ...config };
      const targets =
        exportResolutions && exportResolutions.length > 0
          ? exportResolutions
          : [
              {
                width: exportWidth ?? Math.round(width * scale),
                height: exportHeight ?? Math.round(height * scale),
                label: "Default",
              },
            ];

      // Calculate total steps: 12 months * number of resolutions
      const totalSteps = 12 * targets.length;
      let currentStep = 0;

      const currentMonthIndex = originalConfig.calendar.month;
      const currentTips = originalConfig.tips.currentTips;

      try {
        for (let m = 0; m < 12; m++) {
          if (abortSignal?.aborted) throw new Error("Export cancelled");

          // Update month
          setCalendarConfig({ month: m, year });

          // Handle tips
          if (
            m === currentMonthIndex &&
            year === originalConfig.calendar.year
          ) {
            setTipsConfig({ currentTips });
          } else {
            const newTips = getRandomTips(3, config.tips.selectedCategories);
            setTipsConfig({ currentTips: newTips });
          }

          // Loop through resolutions for this month
          for (let r = 0; r < targets.length; r++) {
            const target = targets[r];
            onProgress?.(currentStep, totalSteps);

            if (targets.length > 1 || target.label !== "Default") {
              // Only rescale if we are doing multi-res or custom
              const referenceHeight = 1080;
              const newScale = getResolutionScale(target.height);
              const baseWidth =
                Math.round((target.width / newScale) * 10000) / 10000;
              const baseHeight = referenceHeight;

              setDimensionsConfig({
                width: baseWidth,
                height: baseHeight,
                scale: newScale,
                exportWidth: target.width,
                exportHeight: target.height,
              });

              await new Promise((resolve) => setTimeout(resolve, 300));
            } else {
              // If default, just wait a bit for month change
              if (r === 0)
                await new Promise((resolve) => setTimeout(resolve, 200));
            }

            // Ensure we use the CURRENT dimensions in store after potential update
            const currentDims = useWallpaperStore.getState().config.dimensions;
            const currentScale = currentDims.scale;
            const currentW = currentDims.width;
            const currentH = currentDims.height;

            const blob = await toBlob(ref.current, {
              cacheBust: true,
              width: target.width,
              height: target.height,
              pixelRatio: 1,
              style: {
                transform: `scale(${currentScale})`,
                transformOrigin: "top left",
                width: `${currentW}px`,
                height: `${currentH}px`,
              },
            });

            if (blob) {
              const monthStr = (m + 1).toString().padStart(2, "0");
              let fileName = `PaperMonth_${year}_${monthStr}`;

              if (targets.length > 1) {
                // If multi-res, maybe put in folders or suffix?
                // Suffix is safer for flat zip
                const suffix =
                  target.label !== "Default" && target.label !== "Custom"
                    ? `_${target.label}`
                    : `_${target.width}x${target.height}`;
                fileName += suffix;
              }

              zip.file(`${fileName}.png`, blob);
            }

            currentStep++;
            onProgress?.(currentStep, totalSteps);
          }
        }

        if (abortSignal?.aborted) throw new Error("Export cancelled");

        const content = await zip.generateAsync({ type: "blob" });
        saveAs(content, `PaperMonth_${year}_Year.zip`);
      } catch (err) {
        if ((err as Error).message === "Export cancelled") {
          console.log("Export cancelled by user");
        } else {
          console.error("Failed to export year", err);
        }
      } finally {
        setCalendarConfig(originalConfig.calendar);
        setTipsConfig(originalConfig.tips);
        setDimensionsConfig(originalConfig.dimensions);
        onProgress?.(0, 0);
      }
    },
    [
      config,
      width,
      height,
      scale,
      exportWidth,
      exportHeight,
      exportResolutions,
      setCalendarConfig,
      setTipsConfig,
      setDimensionsConfig,
    ]
  );

  return { exportWallpaper, exportYear };
}
