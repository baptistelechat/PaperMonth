import { toPng } from "html-to-image";
import { useCallback } from "react";
import { useWallpaperStore } from "./useWallpaperStore";

export function useExport() {
  const { config } = useWallpaperStore();
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

  return { exportWallpaper };
}
