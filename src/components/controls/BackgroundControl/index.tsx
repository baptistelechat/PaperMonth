import React from "react";
import { SectionHeader } from "../components/SectionHeader";
import { BackgroundTypeSelector } from "./components/BackgroundTypeSelector";
import { BlurControl } from "./components/BlurControl";
import { GradientPicker } from "./components/GradientPicker";
import { ImageUploader } from "./components/ImageUploader";
import { NoiseControl } from "./components/NoiseControl";
import { OverlayControl } from "./components/OverlayControl";
import { TextColorPicker } from "./components/TextColorPicker";

export const BackgroundControl: React.FC = () => {
  return (
    <section className="space-y-4">
      <SectionHeader title="Fond d'écran" />

      <div className="space-y-4">
        <BackgroundTypeSelector />
        <GradientPicker />
        <ImageUploader />
        <OverlayControl />
        <BlurControl />
        <NoiseControl />
        <TextColorPicker />
      </div>
    </section>
  );
};
