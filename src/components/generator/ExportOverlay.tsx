import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Loader2 } from "lucide-react";
import React from "react";

interface ExportOverlayProps {
  isExporting: boolean;
  progress: {
    current: number;
    total: number;
  };
  onCancel: () => void;
}

export const ExportOverlay: React.FC<ExportOverlayProps> = ({
  isExporting,
  progress,
  onCancel,
}) => {
  if (!isExporting) return null;

  return (
    <div className="fixed inset-0 z-50 flex cursor-wait flex-col items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="flex w-80 flex-col items-center gap-4 rounded-lg border border-white/10 bg-zinc-900 p-8 shadow-2xl">
        <Loader2 className="text-primary h-12 w-12 animate-spin" />
        <div className="w-full space-y-2 text-center">
          <h3 className="text-lg font-semibold text-white">
            Exportation en cours...
          </h3>
          {progress.total > 1 ? (
            <>
              <Progress
                value={(progress.current / progress.total) * 100}
                className="h-2"
              />
              <p className="animate-pulse text-sm text-zinc-400">
                Génération {progress.current} sur {progress.total}
              </p>
            </>
          ) : (
            <p className="animate-pulse text-sm text-zinc-400">
              Veuillez patienter pendant la génération
            </p>
          )}
        </div>

        {/* Cancel Button - Only shown for long exports (Year) */}
        {progress.total > 1 && (
          <Button
            variant="destructive"
            size="sm"
            className="mt-2 w-full"
            onClick={onCancel}
          >
            Annuler
          </Button>
        )}
      </div>
    </div>
  );
};
