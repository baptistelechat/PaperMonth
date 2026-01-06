export interface ResolutionPreset {
  label: string;
  desc: string;
  width: number;
  height: number;
}

export const getResolutionScale = (height: number): number => {
  return height / 1080;
};

export const RESOLUTION_PRESETS: ResolutionPreset[] = [
  {
    label: "HD",
    desc: "1280x720",
    width: 1280,
    height: 720,
  },
  { label: "FHD", desc: "1920x1080", width: 1920, height: 1080 },
  { label: "2K", desc: "2560x1440", width: 2560, height: 1440 },
  { label: "UltraWide", desc: "3440x1440", width: 3440, height: 1440 },
  { label: "4K", desc: "3840x2160", width: 3840, height: 2160 },
];
