import { useWallpaperStore } from "@/hooks/useWallpaperStore";
import { Upload } from "lucide-react";
import React from "react";

export const ImageUploader: React.FC = () => {
  const { config, setBackgroundConfig } = useWallpaperStore();
  const { background } = config;

  if (background.type !== "image") return null;

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setBackgroundConfig({
          type: "image",
          imageUrl: event.target?.result as string,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-2">
      <div className="group relative cursor-pointer rounded-lg border-2 border-dashed border-zinc-800 p-6 text-center transition-colors hover:bg-zinc-900">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0"
        />
        <Upload className="mx-auto mb-3 h-8 w-8 text-zinc-600 transition-colors group-hover:text-zinc-400" />
        <span className="text-xs text-zinc-500 transition-colors group-hover:text-zinc-300">
          Cliquez pour uploader une image
        </span>
      </div>
      {background.imageUrl && (
        <div className="text-center text-xs font-medium text-emerald-500">
          Image chargée avec succès
        </div>
      )}
    </div>
  );
};
