import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { CircleHelp } from "lucide-react";
import React, { ReactNode } from "react";

interface ControlSwitchProps {
  label: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  id?: string;
  className?: string;
  helpContent?: ReactNode;
  indent?: boolean;
}

export const ControlSwitch: React.FC<ControlSwitchProps> = ({
  label,
  checked,
  onCheckedChange,
  id,
  className,
  helpContent,
  indent,
}) => {
  const switchId = id || `switch-${label.replace(/\s+/g, "-").toLowerCase()}`;
  const indentClass = indent ? "pl-4 border-l border-zinc-800 ml-1" : "";

  return (
    <div
      className={`flex items-center justify-between ${indentClass} ${
        className || ""
      }`}
    >
      <div className="flex items-center gap-2">
        <Label className="text-sm cursor-pointer" htmlFor={switchId}>
          {label}
        </Label>
        {helpContent && (
          <HoverCard>
            <HoverCardTrigger asChild>
              <CircleHelp className="size-4 text-muted-foreground cursor-help" />
            </HoverCardTrigger>
            <HoverCardContent className="w-80" side="right" align="start">
              {helpContent}
            </HoverCardContent>
          </HoverCard>
        )}
      </div>
      <Switch
        id={switchId}
        checked={checked}
        onCheckedChange={onCheckedChange}
      />
    </div>
  );
};
