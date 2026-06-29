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

export interface SignatureConfig {
  text: string;
  color: string;
  fontSize: number;
  duration: number;
}

export const SIGNATURE_DEFAULT_CONFIG: SignatureConfig = {
  text: "Componentry",
  color: "",
  fontSize: 48,
  duration: 1.5,
};

export interface SplitFlapDisplayConfig {
  text: string;
  columns: number;
  size: "sm" | "md" | "lg";
  accentColor: string;
  showIndicators: boolean;
  staggerDelay: number;
  flipSpeed: number;
}

export const SPLIT_FLAP_DISPLAY_DEFAULT_CONFIG: SplitFlapDisplayConfig = {
  text: "COMPONENTRY",
  columns: 14,
  size: "lg",
  accentColor: "#22c55e",
  showIndicators: true,
  staggerDelay: 30,
  flipSpeed: 35,
};

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
  description:
    "Scale your product with clarity, precision, and motion-led design.",
  color1: "#3B82F6",
  color2: "#F0F9FF",
  speed: 1,
};

export interface WebGLLiquidConfig {
  title: string;
  subtitle: string;
  description: string;
  colorDeep: string;
  colorMid: string;
  colorHighlight: string;
  speed: number;
  flowStrength: number;
  grain: number;
  contrast: number;
  opacity: number;
  reveal: boolean;
  delayMs: number;
}

export const WEBGL_LIQUID_DEFAULT_CONFIG: WebGLLiquidConfig = {
  title: "Fluid Motion",
  subtitle: "Premium Presence",
  description:
    "A cinematic liquid field tuned for modern hero sections with polished depth and restrained motion.",
  colorDeep: "#04050b",
  colorMid: "#134d93",
  colorHighlight: "#8cecff",
  speed: 1,
  flowStrength: 1,
  grain: 0.05,
  contrast: 1.1,
  opacity: 0.95,
  reveal: true,
  delayMs: 0,
};

export interface ClosingPlasmaConfig {
  speed: number;
  turbulence: number;
  mouseInfluence: number;
  grain: number;
  sparkle: number;
  vignette: number;
  opacity: number;
  interactive: boolean;
  darkColorA: string;
  darkColorB: string;
  darkColorC: string;
  lightColorA: string;
  lightColorB: string;
  lightColorC: string;
}

export const CLOSING_PLASMA_DEFAULT_CONFIG: ClosingPlasmaConfig = {
  speed: 1,
  turbulence: 1,
  mouseInfluence: 1,
  grain: 1,
  sparkle: 1,
  vignette: 1,
  opacity: 1,
  interactive: true,
  darkColorA: "#0d0d14",
  darkColorB: "#1f2540",
  darkColorC: "#4a6191",
  lightColorA: "#f0f2f7",
  lightColorB: "#d7dceb",
  lightColorC: "#bcc5e0",
};

interface PlaygroundStore {
  code: string;
  ditherPrismHeroConfig: DitherPrismHeroConfig;
  activeDitherPrismHeroPreset: string;
  ditherPrismHeroRenderVersion: number;
  heroGeometricConfig: HeroGeometricConfig;
  activeHeroGeometricPreset: string;
  heroGeometricRenderVersion: number;
  webglLiquidConfig: WebGLLiquidConfig;
  activeWebglLiquidPreset: string;
  webglLiquidRenderVersion: number;
  closingPlasmaConfig: ClosingPlasmaConfig;
  activeClosingPlasmaPreset: string;
  closingPlasmaRenderVersion: number;
  setCode: (code: string) => void;
  setDitherPrismHeroConfig: (config: DitherPrismHeroConfig) => void;
  updateDitherPrismHeroConfig: (
    updates: Partial<DitherPrismHeroConfig>,
  ) => void;
  setActiveDitherPrismHeroPreset: (preset: string) => void;
  resetDitherPrismHeroPreview: () => void;
  resetDitherPrismHeroConfig: () => void;
  setHeroGeometricConfig: (config: HeroGeometricConfig) => void;
  updateHeroGeometricConfig: (updates: Partial<HeroGeometricConfig>) => void;
  setActiveHeroGeometricPreset: (preset: string) => void;
  resetHeroGeometricPreview: () => void;
  resetHeroGeometricConfig: () => void;
  setWebglLiquidConfig: (config: WebGLLiquidConfig) => void;
  updateWebglLiquidConfig: (updates: Partial<WebGLLiquidConfig>) => void;
  setActiveWebglLiquidPreset: (preset: string) => void;
  resetWebglLiquidPreview: () => void;
  resetWebglLiquidConfig: () => void;
  setClosingPlasmaConfig: (config: ClosingPlasmaConfig) => void;
  updateClosingPlasmaConfig: (updates: Partial<ClosingPlasmaConfig>) => void;
  setActiveClosingPlasmaPreset: (preset: string) => void;
  resetClosingPlasmaPreview: () => void;
  resetClosingPlasmaConfig: () => void;
  signatureConfig: SignatureConfig;
  activeSignaturePreset: string;
  signatureRenderVersion: number;
  setSignatureConfig: (config: SignatureConfig) => void;
  updateSignatureConfig: (updates: Partial<SignatureConfig>) => void;
  setActiveSignaturePreset: (preset: string) => void;
  resetSignaturePreview: () => void;
  resetSignatureConfig: () => void;
  splitFlapDisplayConfig: SplitFlapDisplayConfig;
  activeSplitFlapDisplayPreset: string;
  splitFlapDisplayRenderVersion: number;
  setSplitFlapDisplayConfig: (config: SplitFlapDisplayConfig) => void;
  updateSplitFlapDisplayConfig: (updates: Partial<SplitFlapDisplayConfig>) => void;
  setActiveSplitFlapDisplayPreset: (preset: string) => void;
  resetSplitFlapDisplayPreview: () => void;
  resetSplitFlapDisplayConfig: () => void;
}

export const usePlaygroundStore = create<PlaygroundStore>((set) => ({
  code: "",
  ditherPrismHeroConfig: DITHER_PRISM_HERO_DEFAULT_CONFIG,
  activeDitherPrismHeroPreset: "Default",
  ditherPrismHeroRenderVersion: 0,
  heroGeometricConfig: HERO_GEOMETRIC_DEFAULT_CONFIG,
  activeHeroGeometricPreset: "Default",
  heroGeometricRenderVersion: 0,
  webglLiquidConfig: WEBGL_LIQUID_DEFAULT_CONFIG,
  activeWebglLiquidPreset: "Default",
  webglLiquidRenderVersion: 0,
  closingPlasmaConfig: CLOSING_PLASMA_DEFAULT_CONFIG,
  activeClosingPlasmaPreset: "Default",
  closingPlasmaRenderVersion: 0,
  setCode: (code) => set({ code }),
  setDitherPrismHeroConfig: (config) => set({ ditherPrismHeroConfig: config }),
  updateDitherPrismHeroConfig: (updates) =>
    set((state) => ({
      ditherPrismHeroConfig: { ...state.ditherPrismHeroConfig, ...updates },
    })),
  setActiveDitherPrismHeroPreset: (preset) =>
    set({ activeDitherPrismHeroPreset: preset }),
  resetDitherPrismHeroPreview: () =>
    set((state) => ({
      ditherPrismHeroRenderVersion: state.ditherPrismHeroRenderVersion + 1,
    })),
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
  setWebglLiquidConfig: (config) => set({ webglLiquidConfig: config }),
  updateWebglLiquidConfig: (updates) =>
    set((state) => ({
      webglLiquidConfig: { ...state.webglLiquidConfig, ...updates },
    })),
  setActiveWebglLiquidPreset: (preset) =>
    set({ activeWebglLiquidPreset: preset }),
  resetWebglLiquidPreview: () =>
    set((state) => ({
      webglLiquidRenderVersion: state.webglLiquidRenderVersion + 1,
    })),
  resetWebglLiquidConfig: () =>
    set((state) => ({
      webglLiquidConfig: WEBGL_LIQUID_DEFAULT_CONFIG,
      activeWebglLiquidPreset: "Default",
      webglLiquidRenderVersion: state.webglLiquidRenderVersion + 1,
    })),
  setClosingPlasmaConfig: (config) => set({ closingPlasmaConfig: config }),
  updateClosingPlasmaConfig: (updates) =>
    set((state) => ({
      closingPlasmaConfig: { ...state.closingPlasmaConfig, ...updates },
    })),
  setActiveClosingPlasmaPreset: (preset) =>
    set({ activeClosingPlasmaPreset: preset }),
  resetClosingPlasmaPreview: () =>
    set((state) => ({
      closingPlasmaRenderVersion: state.closingPlasmaRenderVersion + 1,
    })),
  resetClosingPlasmaConfig: () =>
    set((state) => ({
      closingPlasmaConfig: CLOSING_PLASMA_DEFAULT_CONFIG,
      activeClosingPlasmaPreset: "Default",
      closingPlasmaRenderVersion: state.closingPlasmaRenderVersion + 1,
    })),
  signatureConfig: SIGNATURE_DEFAULT_CONFIG,
  activeSignaturePreset: "Default",
  signatureRenderVersion: 0,
  setSignatureConfig: (config) => set({ signatureConfig: config }),
  updateSignatureConfig: (updates) =>
    set((state) => ({
      signatureConfig: { ...state.signatureConfig, ...updates },
    })),
  setActiveSignaturePreset: (preset) => set({ activeSignaturePreset: preset }),
  resetSignaturePreview: () =>
    set((state) => ({
      signatureRenderVersion: state.signatureRenderVersion + 1,
    })),
  resetSignatureConfig: () =>
    set((state) => ({
      signatureConfig: SIGNATURE_DEFAULT_CONFIG,
      activeSignaturePreset: "Default",
      signatureRenderVersion: state.signatureRenderVersion + 1,
    })),
  splitFlapDisplayConfig: SPLIT_FLAP_DISPLAY_DEFAULT_CONFIG,
  activeSplitFlapDisplayPreset: "Default",
  splitFlapDisplayRenderVersion: 0,
  setSplitFlapDisplayConfig: (config) => set({ splitFlapDisplayConfig: config }),
  updateSplitFlapDisplayConfig: (updates) =>
    set((state) => ({
      splitFlapDisplayConfig: { ...state.splitFlapDisplayConfig, ...updates },
    })),
  setActiveSplitFlapDisplayPreset: (preset) =>
    set({ activeSplitFlapDisplayPreset: preset }),
  resetSplitFlapDisplayPreview: () =>
    set((state) => ({
      splitFlapDisplayRenderVersion: state.splitFlapDisplayRenderVersion + 1,
    })),
  resetSplitFlapDisplayConfig: () =>
    set((state) => ({
      splitFlapDisplayConfig: SPLIT_FLAP_DISPLAY_DEFAULT_CONFIG,
      activeSplitFlapDisplayPreset: "Default",
      splitFlapDisplayRenderVersion: state.splitFlapDisplayRenderVersion + 1,
    })),
}));
