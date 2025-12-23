import { Dialog, DialogContent } from "@/components/ui/dialog";
import { WallpaperCanvas } from "@/components/WallpaperCanvas";
import { useWallpaperStore } from "@/hooks/useWallpaperStore";
import { Loader2, Maximize2, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";

interface FullScreenPreviewProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const FullScreenPreview: React.FC<FullScreenPreviewProps> = ({
  open,
  onOpenChange,
}) => {
  const { config } = useWallpaperStore();
  const [scale, setScale] = useState(0.5);
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const { dimensions } = config;

  const isBackNavigation = React.useRef(false);

  // Handle back button on mobile
  useEffect(() => {
    if (open) {
      isBackNavigation.current = false;
      window.history.pushState({ previewOpen: true }, "");

      const handlePopState = () => {
        isBackNavigation.current = true;
        onOpenChange(false);
      };

      window.addEventListener("popstate", handlePopState);

      return () => {
        window.removeEventListener("popstate", handlePopState);
        if (!isBackNavigation.current) {
          window.history.back();
        }
      };
    }
  }, [open, onOpenChange]);

  // Auto-scale logic for fullscreen/rotated view
  useEffect(() => {
    if (!open) {
      setIsLoading(true);
      return;
    }

    // Small delay to let the modal open and container render
    const timer = setTimeout(() => {
      if (!containerRef.current) return;

      const padding = 32;
      // We are rotated 90deg, so we swap width/height checks
      // The container width is actually the screen height in rotated view concept
      // But physically the container is normal.
      // We want the wallpaper (W x H) to fit in the container (Cw x Ch)
      // BUT rotated 90 degrees.
      // So we want to fit (H x W) into (Cw x Ch).

      const containerWidth = containerRef.current.clientWidth - padding;
      const containerHeight = containerRef.current.clientHeight - padding;

      // Fit H into Cw
      const scaleX = containerWidth / dimensions.height;
      // Fit W into Ch
      const scaleY = containerHeight / dimensions.width;

      // Use the smaller scale to fit entirely
      setScale(Math.min(scaleX, scaleY, 1.5)); // Allow some zoom but not too much
      setIsLoading(false);
    }, 100);

    return () => clearTimeout(timer);
  }, [open, dimensions]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="h-dvh w-screen max-w-none rounded-none border-none bg-zinc-950 p-0 text-white sm:max-w-none focus:outline-none"
        showCloseButton={false}
      >
        <div
          ref={containerRef}
          className="relative flex h-full w-full items-center justify-center overflow-hidden"
        >
          {/* Custom Close Button - Positioned safely */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-4 z-60 rounded-full bg-black/40 text-white backdrop-blur-md hover:bg-black/60 md:right-8 md:top-8"
            onClick={() => onOpenChange(false)}
          >
            <X className="h-6 w-6" />
            <span className="sr-only">Fermer</span>
          </Button>

          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-zinc-950/50 backdrop-blur-sm z-50">
              <Loader2 className="h-8 w-8 animate-spin text-white" />
            </div>
          )}

          {/* Rotated Container */}
          <div
            className="relative flex items-center justify-center shadow-2xl transition-transform duration-500 ease-out"
            style={{
              transform: `rotate(90deg) scale(${scale})`,
              width: dimensions.width,
              height: dimensions.height,
            }}
          >
            {/* We render a fresh canvas here specifically for the preview */}
            <WallpaperCanvas />
          </div>

          {/* Overlay Info */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none">
            <div className="flex items-center gap-2 rounded-full bg-black/60 px-4 py-2 text-xs text-zinc-400 backdrop-blur-md border border-white/10">
              <Maximize2 className="h-3 w-3" />
              {Math.round(dimensions.width * dimensions.scale)} x{" "}
              {Math.round(dimensions.height * dimensions.scale)}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
