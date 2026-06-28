"use client";

import { useEffect, useMemo } from "react";
import { create } from "zustand";
import { ImageRippleEffect } from "@workspace/ui/components/image-ripple-effect";
import { cn } from "@/lib/utils";
import { usePlaygroundStore } from "@/hooks/use-playground-store";

interface ImageRipplePlaygroundConfig {
  imageSrc: string;
  brushTextureUrl: string;
  imageX: number;
  imageY: number;
  imageWidthScale: number;
  imageHeightScale: number;
  distortionStrength: number;
  waveCount: number;
  waveSize: number;
  waveRotationSpeed: number;
  waveFadeMultiplier: number;
  waveGrowth: number;
  waveSpawnThreshold: number;
}

const IMAGE_RIPPLE_DEFAULT_CONFIG: ImageRipplePlaygroundConfig = {
  imageSrc:
    "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&q=80&w=1400",
  brushTextureUrl: "/brush.png",
  imageX: 0,
  imageY: 0,
  imageWidthScale: 0.34,
  imageHeightScale: 0.42,
  distortionStrength: 0.075,
  waveCount: 100,
  waveSize: 60,
  waveRotationSpeed: 0.025,
  waveFadeMultiplier: 0.95,
  waveGrowth: 0.155,
  waveSpawnThreshold: 0.1,
};

const PRESETS: Array<{ name: string; config: ImageRipplePlaygroundConfig }> = [
  {
    name: "Default",
    config: IMAGE_RIPPLE_DEFAULT_CONFIG,
  },
  {
    name: "Gentle",
    config: {
      ...IMAGE_RIPPLE_DEFAULT_CONFIG,
      distortionStrength: 0.05,
      waveFadeMultiplier: 0.965,
      waveGrowth: 0.12,
      waveRotationSpeed: 0.016,
    },
  },
  {
    name: "Punchy",
    config: {
      ...IMAGE_RIPPLE_DEFAULT_CONFIG,
      distortionStrength: 0.1,
      waveCount: 140,
      waveSize: 72,
      waveFadeMultiplier: 0.93,
      waveGrowth: 0.18,
      waveRotationSpeed: 0.034,
    },
  },
  {
    name: "Dense",
    config: {
      ...IMAGE_RIPPLE_DEFAULT_CONFIG,
      waveCount: 180,
      waveSize: 54,
      waveSpawnThreshold: 0.05,
      waveFadeMultiplier: 0.955,
    },
  },
];

interface ImageRipplePlaygroundStore {
  config: ImageRipplePlaygroundConfig;
  renderVersion: number;
  activePreset: string;
  setConfig: (config: ImageRipplePlaygroundConfig) => void;
  updateConfig: (updates: Partial<ImageRipplePlaygroundConfig>) => void;
  setActivePreset: (preset: string) => void;
  resetPreview: () => void;
  resetConfig: () => void;
}

const useImageRipplePlaygroundStore = create<ImageRipplePlaygroundStore>((set) => ({
  config: IMAGE_RIPPLE_DEFAULT_CONFIG,
  renderVersion: 0,
  activePreset: "Default",
  setConfig: (config) => set({ config }),
  updateConfig: (updates) =>
    set((state) => ({
      config: { ...state.config, ...updates },
    })),
  setActivePreset: (preset) => set({ activePreset: preset }),
  resetPreview: () =>
    set((state) => ({
      renderVersion: state.renderVersion + 1,
    })),
  resetConfig: () =>
    set((state) => ({
      config: IMAGE_RIPPLE_DEFAULT_CONFIG,
      activePreset: "Default",
      renderVersion: state.renderVersion + 1,
    })),
}));

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <div className="mb-3 text-[10px] font-mono uppercase tracking-widest text-muted-foreground">{children}</div>
);

const Slider = ({
  value,
  min,
  max,
  step,
  onChange,
  label,
}: {
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (val: number) => void;
  label: string;
}) => (
  <div className="space-y-2">
    <div className="flex items-center justify-between text-sm">
      <span className="text-foreground/90">{label}</span>
      <span className="font-mono text-muted-foreground">
        {Number(value).toFixed(step < 0.1 ? 3 : 1)}
      </span>
    </div>
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={(e) => onChange(parseFloat(e.target.value))}
      className="h-2 w-full cursor-pointer appearance-none rounded-full bg-zinc-300/70 dark:bg-zinc-700/70
      [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border [&::-webkit-slider-thumb]:border-border [&::-webkit-slider-thumb]:bg-white dark:[&::-webkit-slider-thumb]:bg-zinc-100"
    />
  </div>
);

function generateCode(config: ImageRipplePlaygroundConfig) {
  return `import { ImageRippleEffect } from "@/components/ui/image-ripple-effect"

const images = [
  {
    src: "${config.imageSrc}",
    x: ${config.imageX},
    y: ${config.imageY},
    widthScale: ${config.imageWidthScale},
    heightScale: ${config.imageHeightScale},
  },
]

<ImageRippleEffect
  images={images}
  brushTextureUrl="${config.brushTextureUrl}"
  distortionStrength={${config.distortionStrength}}
  waveCount={${config.waveCount}}
  waveSize={${config.waveSize}}
  waveRotationSpeed={${config.waveRotationSpeed}}
  waveFadeMultiplier={${config.waveFadeMultiplier}}
  waveGrowth={${config.waveGrowth}}
  waveSpawnThreshold={${config.waveSpawnThreshold}}
/>`;
}

export function ImageRippleEffectPlayground() {
  const config = useImageRipplePlaygroundStore((state) => state.config);
  const renderVersion = useImageRipplePlaygroundStore((state) => state.renderVersion);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      usePlaygroundStore.getState().setCode(generateCode(config));
    }, 250);

    return () => clearTimeout(timeoutId);
  }, [config]);

  return (
    <div className="relative h-full w-full">
      <ImageRippleEffect
        key={renderVersion}
        className="h-full w-full !min-h-full"
        brushTextureUrl={config.brushTextureUrl}
        images={[
          {
            src: config.imageSrc,
            x: config.imageX,
            y: config.imageY,
            widthScale: config.imageWidthScale,
            heightScale: config.imageHeightScale,
          },
        ]}
        distortionStrength={config.distortionStrength}
        waveCount={config.waveCount}
        waveSize={config.waveSize}
        waveRotationSpeed={config.waveRotationSpeed}
        waveFadeMultiplier={config.waveFadeMultiplier}
        waveGrowth={config.waveGrowth}
        waveSpawnThreshold={config.waveSpawnThreshold}
      />
    </div>
  );
}

export function ImageRippleEffectPersonalizePanel() {
  const config = useImageRipplePlaygroundStore((state) => state.config);
  const activePreset = useImageRipplePlaygroundStore((state) => state.activePreset);
  const setConfig = useImageRipplePlaygroundStore((state) => state.setConfig);
  const updateConfig = useImageRipplePlaygroundStore((state) => state.updateConfig);
  const setActivePreset = useImageRipplePlaygroundStore((state) => state.setActivePreset);
  const resetPreview = useImageRipplePlaygroundStore((state) => state.resetPreview);
  const resetConfig = useImageRipplePlaygroundStore((state) => state.resetConfig);

  const selectedPresetConfig = useMemo(
    () => PRESETS.find((preset) => preset.name === activePreset)?.config,
    [activePreset],
  );

  const handleChange = <K extends keyof ImageRipplePlaygroundConfig>(
    key: K,
    value: ImageRipplePlaygroundConfig[K],
  ) => {
    updateConfig({ [key]: value } as Partial<ImageRipplePlaygroundConfig>);

    if (activePreset === "Custom") {
      return;
    }

    const matchedPreset = PRESETS.find(
      (preset) => JSON.stringify(preset.config) === JSON.stringify({ ...config, [key]: value }),
    );
    setActivePreset(matchedPreset?.name ?? "Custom");
  };

  const handlePresetChange = (presetName: string) => {
    const preset = PRESETS.find((item) => item.name === presetName);
    if (!preset) {
      return;
    }

    setConfig({ ...preset.config });
    setActivePreset(presetName);
    resetPreview();
  };

  return (
    <div className="h-full overflow-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      <div className="space-y-6 px-4 pb-10 pt-20">
        <header className="space-y-2">
          <h2 className="text-2xl font-bold tracking-tighter text-foreground">Personalize</h2>
          <p className="text-sm leading-relaxed text-muted-foreground/90">
            Tune ripple intensity, wave behavior, and image placement in real-time.
          </p>
        </header>

        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground/90">
            Current preset: <span className="font-mono text-foreground">{activePreset}</span>
          </div>
          <button
            type="button"
            onClick={resetConfig}
            className="rounded-md border border-border/40 bg-white/50 px-3 py-1.5 text-[10px] font-mono uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground dark:bg-white/[0.03]"
          >
            Reset
          </button>
        </div>

        <div>
          <SectionTitle>Presets</SectionTitle>
          <div className="grid grid-cols-4 gap-1.5">
            {PRESETS.map((preset) => {
              const isActive =
                activePreset === preset.name ||
                (activePreset !== "Custom" && selectedPresetConfig && preset.name === activePreset);

              return (
                <button
                  key={preset.name}
                  type="button"
                  onClick={() => handlePresetChange(preset.name)}
                  className={cn(
                    "rounded-md border p-2 text-center text-[10px] font-mono uppercase tracking-widest transition-colors",
                    isActive
                      ? "border-zinc-500/70 bg-zinc-100 dark:border-zinc-500/80 dark:bg-zinc-900/70"
                      : "border-border/70 bg-transparent",
                  )}
                >
                  {preset.name}
                </button>
              );
            })}
          </div>
        </div>

        <div className="space-y-3">
          <SectionTitle>Ripple</SectionTitle>
          <Slider
            label="Distortion Strength"
            min={0.01}
            max={0.2}
            step={0.001}
            value={config.distortionStrength}
            onChange={(val) => handleChange("distortionStrength", val)}
          />
          <Slider
            label="Wave Count"
            min={20}
            max={220}
            step={1}
            value={config.waveCount}
            onChange={(val) => handleChange("waveCount", val)}
          />
          <Slider
            label="Wave Size"
            min={20}
            max={120}
            step={1}
            value={config.waveSize}
            onChange={(val) => handleChange("waveSize", val)}
          />
          <Slider
            label="Rotation Speed"
            min={0.005}
            max={0.06}
            step={0.001}
            value={config.waveRotationSpeed}
            onChange={(val) => handleChange("waveRotationSpeed", val)}
          />
          <Slider
            label="Fade Multiplier"
            min={0.85}
            max={0.995}
            step={0.001}
            value={config.waveFadeMultiplier}
            onChange={(val) => handleChange("waveFadeMultiplier", val)}
          />
          <Slider
            label="Wave Growth"
            min={0.05}
            max={0.3}
            step={0.001}
            value={config.waveGrowth}
            onChange={(val) => handleChange("waveGrowth", val)}
          />
          <Slider
            label="Spawn Threshold"
            min={0.01}
            max={1}
            step={0.01}
            value={config.waveSpawnThreshold}
            onChange={(val) => handleChange("waveSpawnThreshold", val)}
          />
        </div>
      </div>
    </div>
  );
}
