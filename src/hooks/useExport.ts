import { toBlob, toPng } from "html-to-image";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { useCallback } from "react";
import { getRandomTips, useWallpaperStore } from "./useWallpaperStore";

export function useExport() {
  const {
    config,
    setCalendarConfig,
    setTipsConfig,
  } = useWallpaperStore();
  const { width, height, scale, exportWidth, exportHeight } = config.dimensions;

  const exportWallpaper = useCallback(
    async (ref: React.RefObject<HTMLElement>, fileName: string) => {
      if (ref.current === null) {
        return;
      }

      // Use the stored scale for export, or explicit dimensions if provided
      const finalWidth = exportWidth ?? Math.round(width * scale);
      const finalHeight = exportHeight ?? Math.round(height * scale);

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
    },
    [width, height, scale, exportWidth, exportHeight]
  );

  const exportYear = useCallback(
    async (ref: React.RefObject<HTMLElement>, year: number) => {
      if (ref.current === null) {
        return;
      }

      const zip = new JSZip();
      const originalConfig = { ...config };
      
      // We need to keep the user's tips for the currently displayed month
      // if it was manually edited. But here we assume if the user is exporting
      // the year, they want the current state for the current month, and random for others.
      // The store already holds the "current state" for the displayed month.
      
      const currentMonthIndex = originalConfig.calendar.month;
      const currentTips = originalConfig.tips.currentTips;

      try {
        // Iterate through all 12 months
        for (let m = 0; m < 12; m++) {
          // Update month
          setCalendarConfig({ month: m, year });

          // Handle tips
          if (m === currentMonthIndex && year === originalConfig.calendar.year) {
            // Restore original tips for the current month
            setTipsConfig({ currentTips });
          } else {
            // Generate random tips for other months
            const newTips = getRandomTips(3, config.tips.selectedCategories);
            setTipsConfig({ currentTips: newTips });
          }

          // Wait for render to update
          // A short delay is needed for React to commit changes and DOM to update
          await new Promise((resolve) => setTimeout(resolve, 200));

          const finalWidth = exportWidth ?? Math.round(width * scale);
          const finalHeight = exportHeight ?? Math.round(height * scale);

          const blob = await toBlob(ref.current, {
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

          if (blob) {
            // Format: PaperMonth_2025_01.png
            const monthStr = (m + 1).toString().padStart(2, "0");
            zip.file(`PaperMonth_${year}_${monthStr}.png`, blob);
          }
        }

        // Generate and save zip
        const content = await zip.generateAsync({ type: "blob" });
        saveAs(content, `PaperMonth_${year}_Year.zip`);

      } catch (err) {
        console.error("Failed to export year", err);
      } finally {
        // Restore original state
        setCalendarConfig(originalConfig.calendar);
        setTipsConfig(originalConfig.tips);
      }
    },
    [config, width, height, scale, exportWidth, exportHeight, setCalendarConfig, setTipsConfig]
  );

  return { exportWallpaper, exportYear };
}
