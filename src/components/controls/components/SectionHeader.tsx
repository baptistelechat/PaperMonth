import React from "react";

interface SectionHeaderProps {
  title: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ title }) => {
  return (
    <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider">
      {title}
    </h3>
  );
};
