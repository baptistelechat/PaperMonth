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
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm cursor-wait">
      <div className="flex flex-col items-center gap-4 rounded-lg bg-zinc-900 p-8 shadow-2xl border border-white/10 w-80">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <div className="text-center w-full space-y-2">
          <h3 className="text-lg font-semibold text-white">
            Exportation en cours...
          </h3>
          {progress.total > 1 ? (
            <>
              <Progress
                value={(progress.current / progress.total) * 100}
                className="h-2"
              />
              <p className="text-sm text-zinc-400 animate-pulse">
                Génération du mois{" "}
                {Math.min(progress.current + 1, progress.total)} sur{" "}
                {progress.total} en cours
              </p>
            </>
          ) : (
            <p className="text-sm text-zinc-400 animate-pulse">
              Veuillez patienter pendant la génération
            </p>
          )}
        </div>

        {/* Cancel Button - Only shown for long exports (Year) */}
        {progress.total > 1 && (
          <Button
            variant="destructive"
            size="sm"
            className="w-full mt-2"
            onClick={onCancel}
          >
            Annuler
          </Button>
        )}
      </div>
    </div>
  );
};
