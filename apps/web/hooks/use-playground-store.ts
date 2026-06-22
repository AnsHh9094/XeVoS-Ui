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

export interface HeroGeometricConfig {
  title1: string;
  title2: string;
  description: string;
  color1: string;
  color2: string;
  speed: number;
}

export const HERO_GEOMETRIC_DEFAULT_CONFIG: HeroGeometricConfig = {
  title1: "Elevate",
  title2: "Your Brand",
  description: "Scale your product with clarity, precision, and motion-led design.",
  color1: "#3B82F6",
  color2: "#F0F9FF",
  speed: 1,
};

interface PlaygroundStore {
  code: string;
  ditherPrismHeroConfig: DitherPrismHeroConfig;
  activeDitherPrismHeroPreset: string;
  ditherPrismHeroRenderVersion: number;
  heroGeometricConfig: HeroGeometricConfig;
  activeHeroGeometricPreset: string;
  heroGeometricRenderVersion: number;
  setCode: (code: string) => void;
  setDitherPrismHeroConfig: (config: DitherPrismHeroConfig) => void;
  updateDitherPrismHeroConfig: (updates: Partial<DitherPrismHeroConfig>) => void;
  setActiveDitherPrismHeroPreset: (preset: string) => void;
  resetDitherPrismHeroPreview: () => void;
  resetDitherPrismHeroConfig: () => void;
  setHeroGeometricConfig: (config: HeroGeometricConfig) => void;
  updateHeroGeometricConfig: (updates: Partial<HeroGeometricConfig>) => void;
  setActiveHeroGeometricPreset: (preset: string) => void;
  resetHeroGeometricPreview: () => void;
  resetHeroGeometricConfig: () => void;
}

export const usePlaygroundStore = create<PlaygroundStore>((set) => ({
  code: "",
  ditherPrismHeroConfig: DITHER_PRISM_HERO_DEFAULT_CONFIG,
  activeDitherPrismHeroPreset: "Default",
  ditherPrismHeroRenderVersion: 0,
  heroGeometricConfig: HERO_GEOMETRIC_DEFAULT_CONFIG,
  activeHeroGeometricPreset: "Default",
  heroGeometricRenderVersion: 0,
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
  setHeroGeometricConfig: (config) => set({ heroGeometricConfig: config }),
  updateHeroGeometricConfig: (updates) =>
    set((state) => ({
      heroGeometricConfig: { ...state.heroGeometricConfig, ...updates },
    })),
  setActiveHeroGeometricPreset: (preset) =>
    set({ activeHeroGeometricPreset: preset }),
  resetHeroGeometricPreview: () =>
    set((state) => ({
      heroGeometricRenderVersion: state.heroGeometricRenderVersion + 1,
    })),
  resetHeroGeometricConfig: () =>
    set((state) => ({
      heroGeometricConfig: HERO_GEOMETRIC_DEFAULT_CONFIG,
      activeHeroGeometricPreset: "Default",
      heroGeometricRenderVersion: state.heroGeometricRenderVersion + 1,
    })),
}));
