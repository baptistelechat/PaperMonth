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
      <div className="relative border-2 border-dashed border-zinc-800 rounded-lg p-6 hover:bg-zinc-900 transition-colors cursor-pointer text-center group">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
        />
        <Upload className="w-8 h-8 mx-auto mb-3 text-zinc-600 group-hover:text-zinc-400 transition-colors" />
        <span className="text-xs text-zinc-500 group-hover:text-zinc-300 transition-colors">
          Cliquez pour uploader une image
        </span>
      </div>
      {background.imageUrl && (
        <div className="text-xs text-emerald-500 text-center font-medium">
          Image chargée avec succès
        </div>
      )}
    </div>
  );
};
