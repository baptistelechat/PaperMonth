import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import React from "react";

export interface GridButtonOption {
  label: string | React.ReactNode;
  value: string;
  style?: React.CSSProperties;
}

interface ControlGridButtonsProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  options: GridButtonOption[];
  className?: string;
  buttonClassName?: string;
}

export const ControlGridButtons: React.FC<ControlGridButtonsProps> = ({
  label,
  value,
  onChange,
  options,
  className,
  buttonClassName,
}) => {
  return (
    <div className="space-y-2">
      {label && <Label className="text-xs text-zinc-500">{label}</Label>}
      <div className={cn("grid grid-cols-2 gap-2", className)}>
        {options.map((option) => (
          <Button
            key={option.value}
            variant={value === option.value ? "secondary" : "outline"}
            onClick={() => onChange(option.value)}
            className={cn("w-full border-zinc-800", buttonClassName)}
            style={option.style}
          >
            {option.label}
          </Button>
        ))}
      </div>
    </div>
  );
};
