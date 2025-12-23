import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import React from "react";

export interface TooltipEvent {
  label: string;
  type: string;
}

interface EventTooltipProps {
  children: React.ReactNode;
  events: TooltipEvent[];
  className?: string;
  side?: "top" | "right" | "bottom" | "left";
  align?: "start" | "center" | "end";
}

export const EventTooltip: React.FC<EventTooltipProps> = ({
  children,
  events,
  className,
  side,
  align,
}) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent
        className={cn("max-w-75", className)}
        side={side}
        align={align}
      >
        <div className="flex flex-col gap-1 text-xs">
          {events.map((e, idx) => (
            <div
              key={idx}
              className={cn(
                e.type === "holiday" && "text-red-600",
                e.type === "observance" && "text-violet-600",
                e.type === "school-holiday" && "text-green-600"
              )}
            >
              {e.label}
            </div>
          ))}
        </div>
      </TooltipContent>
    </Tooltip>
  );
};
