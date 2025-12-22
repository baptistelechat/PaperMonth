import { toPng } from "html-to-image";
import { useCallback } from "react";
import { useWallpaperStore } from "./useWallpaperStore";

export function useExport() {
  const { config } = useWallpaperStore();
  const { width, height } = config.dimensions;

  const exportWallpaper = useCallback(
    async (
      ref: React.RefObject<HTMLElement>,
      fileName: string,
      overrideWidth?: number,
      overrideHeight?: number
    ) => {
      if (ref.current === null) {
        return;
      }

      const finalWidth = overrideWidth ?? width;
      const finalHeight = overrideHeight ?? height;

      try {
        const dataUrl = await toPng(ref.current, {
          cacheBust: true,
          width: finalWidth,
          height: finalHeight,
          pixelRatio: 1, // Ensure 1:1 if the canvas is already 1920x1080, or adjust if scaled
          // Note: If the preview is scaled down, we might need to handle that.
          // Best approach is to export the element at its natural size.
          // If the element is scaled via CSS transform, html-to-image might capture the transform.
          // We might need to temporarily unset transform or render a hidden full-size clone.
          // For this MVP, we will assume the canvas is rendered at full size or we handle the scale.
        });

        const link = document.createElement("a");
        link.download = `${fileName}.png`;
        link.href = dataUrl;
        link.click();
      } catch (err) {
        console.error("Failed to export wallpaper", err);
      }
    },
    [width, height]
  );

  return { exportWallpaper };
}
