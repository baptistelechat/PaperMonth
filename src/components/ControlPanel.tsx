import { BackgroundControl } from "@/components/controls/BackgroundControl";
import { CalendarControl } from "@/components/controls/CalendarControl";
import { DateControl } from "@/components/controls/DateControl";
import { TipsControl } from "@/components/controls/TipsControl";
import { TypographyControl } from "@/components/controls/TypographyControl";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import React from "react";

export const ControlPanel: React.FC = () => {
  return (
    <div className="flex h-screen w-96 shrink-0 flex-col border-r border-white/10 bg-zinc-900/50">
      <div className="border-b border-white/10 p-6">
        <h2 className="text-xl font-bold tracking-tight">Configuration</h2>
      </div>

      {/* Hauteur de l'écran (100vh) - Hauteur du header (~77px: p-6(24*2) + text-xl(28) + border(1)) */}
      <ScrollArea className="h-[calc(100vh-78px)]">
        <div className="space-y-8 p-6">
          <DateControl />
          <Separator />
          <CalendarControl />
          <Separator />
          <TipsControl />
          <Separator />
          <BackgroundControl />
          <Separator />
          <TypographyControl />
        </div>
      </ScrollArea>
    </div>
  );
};
