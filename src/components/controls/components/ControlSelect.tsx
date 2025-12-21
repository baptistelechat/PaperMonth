import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CircleHelp } from "lucide-react";
import React, { ReactNode } from "react";

export interface SelectOption {
  label: string;
  value: string;
}

export interface SelectGroupData {
  label: string;
  items: SelectOption[];
}

interface ControlSelectProps {
  label?: string;
  value: string;
  onValueChange: (value: string) => void;
  options: (SelectOption | SelectGroupData)[];
  placeholder?: string;
  className?: string;
  helpContent?: ReactNode;
  indent?: boolean;
}

export const ControlSelect: React.FC<ControlSelectProps> = ({
  label,
  value,
  onValueChange,
  options,
  placeholder,
  className,
  helpContent,
  indent,
}) => {
  const indentClass = indent ? "pl-4 border-l border-zinc-800 ml-1" : "";

  return (
    <div className={`space-y-2 ${indentClass} ${className || ""}`}>
      <div className="flex items-center gap-2">
        {label && <Label className="text-sm">{label}</Label>}
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
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger className="w-full bg-zinc-900 border-zinc-800">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option, index) => {
            if ("items" in option) {
              return (
                <SelectGroup key={index}>
                  <SelectLabel>{option.label}</SelectLabel>
                  {option.items.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              );
            } else {
              return (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              );
            }
          })}
        </SelectContent>
      </Select>
    </div>
  );
};
