import { create } from "zustand";

export interface DitherPrismHeroConfig {
  title1: string;
  title2: string;
  color1: string;
  color2: string;
  color3: string;
  speed: number;
  ditherIntensity: number;
  prismIntensity: number;
  particleCount: number;
  showParticles: boolean;
}

export const DITHER_PRISM_HERO_DEFAULT_CONFIG: DitherPrismHeroConfig = {
  title1: "Experience",
  title2: "The Future",
  color1: "#0f0f23",
  color2: "#6366f1",
  color3: "#ec4899",
  speed: 1,
  ditherIntensity: 0.15,
  prismIntensity: 0.5,
  particleCount: 50,
  showParticles: true,
};

interface PlaygroundStore {
  code: string;
  ditherPrismHeroConfig: DitherPrismHeroConfig;
  activeDitherPrismHeroPreset: string;
  ditherPrismHeroRenderVersion: number;
  setCode: (code: string) => void;
  setDitherPrismHeroConfig: (config: DitherPrismHeroConfig) => void;
  updateDitherPrismHeroConfig: (updates: Partial<DitherPrismHeroConfig>) => void;
  setActiveDitherPrismHeroPreset: (preset: string) => void;
  resetDitherPrismHeroPreview: () => void;
  resetDitherPrismHeroConfig: () => void;
}

export const usePlaygroundStore = create<PlaygroundStore>((set) => ({
  code: "",
  ditherPrismHeroConfig: DITHER_PRISM_HERO_DEFAULT_CONFIG,
  activeDitherPrismHeroPreset: "Default",
  ditherPrismHeroRenderVersion: 0,
  setCode: (code) => set({ code }),
  setDitherPrismHeroConfig: (config) => set({ ditherPrismHeroConfig: config }),
  updateDitherPrismHeroConfig: (updates) =>
    set((state) => ({
      ditherPrismHeroConfig: { ...state.ditherPrismHeroConfig, ...updates },
    })),
  setActiveDitherPrismHeroPreset: (preset) =>
    set({ activeDitherPrismHeroPreset: preset }),
  resetDitherPrismHeroPreview: () =>
    set((state) => ({ ditherPrismHeroRenderVersion: state.ditherPrismHeroRenderVersion + 1 })),
  resetDitherPrismHeroConfig: () =>
    set((state) => ({
      ditherPrismHeroConfig: DITHER_PRISM_HERO_DEFAULT_CONFIG,
      activeDitherPrismHeroPreset: "Default",
      ditherPrismHeroRenderVersion: state.ditherPrismHeroRenderVersion + 1,
    })),
}));
