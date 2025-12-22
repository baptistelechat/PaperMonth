import React from "react";

interface SectionHeaderProps {
  title: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ title }) => {
  return (
    <h3 className="text-sm font-semibold tracking-wider text-zinc-400 uppercase">
      {title}
    </h3>
  );
};
