/**
 * XeVoS UI — https://github.com/AnsHh9094/XeVoS-Ui
 * Copyright (c) 2026 Anand Ansh (AnsHh9094)
 * SPDX-License-Identifier: MIT
 * This notice must be retained in all copies or substantial portions (MIT License).
 */
"use client";

import { useEffect, useMemo } from "react";
import DitherPrismHero from "@workspace/ui/components/dither-prism-hero";
import { cn } from "@/lib/utils";
import {
  DITHER_PRISM_HERO_DEFAULT_CONFIG,
  type DitherPrismHeroConfig,
  usePlaygroundStore,
} from "@/hooks/use-playground-store";
import {
  PlaygroundSectionTitle,
  PlaygroundInput,
  PlaygroundSlider,
  PlaygroundSwitch,
  PlaygroundColorPicker,
} from "@/components/playground-primitives";

const PRESETS: Array<{ name: string; config: DitherPrismHeroConfig }> = [
  {
    name: "Default",
    config: DITHER_PRISM_HERO_DEFAULT_CONFIG,
  },
  {
    name: "Cyberpunk",
    config: {
      ...DITHER_PRISM_HERO_DEFAULT_CONFIG,
      color1: "#0a0a0a",
      color2: "#00ff88",
      color3: "#00ffff",
      title1: "Cyber",
      title2: "Punk",
      ditherIntensity: 0.25,
      prismIntensity: 0.7,
    },
  },
  {
    name: "Sunset",
    config: {
      ...DITHER_PRISM_HERO_DEFAULT_CONFIG,
      color1: "#1a0a0a",
      color2: "#ff6b35",
      color3: "#ffd93d",
      title1: "Golden",
      title2: "Hour",
      ditherIntensity: 0.12,
      prismIntensity: 0.4,
    },
  },
  {
    name: "Ocean",
    config: {
      ...DITHER_PRISM_HERO_DEFAULT_CONFIG,
      color1: "#0a1628",
      color2: "#0ea5e9",
      color3: "#22d3ee",
      title1: "Deep",
      title2: "Ocean",
      speed: 0.7,
      particleCount: 100,
    },
  },
  {
    name: "Maximum",
    config: {
      ...DITHER_PRISM_HERO_DEFAULT_CONFIG,
      title1: "Maximum",
      title2: "Impact",
      ditherIntensity: 0.3,
      prismIntensity: 0.9,
      speed: 1.5,
      particleCount: 80,
    },
  },
];



function generateCode(config: DitherPrismHeroConfig) {
  const props = Object.entries(config)
    .filter(([, value]) => value !== undefined && value !== null)
    .map(([key, value]) => {
      if (key === "title1" || key === "title2" || key.startsWith("color")) {
        return `${key}="${value}"`;
      }
      if (typeof value === "boolean") {
        return value ? `${key}` : `${key}={false}`;
      }
      return `${key}={${value}}`;
    })
    .join("\n    ");

  return `<DitherPrismHero \n    ${props}\n/>`;
}

export function DitherPrismHeroPlayground() {
  const config = usePlaygroundStore((state) => state.ditherPrismHeroConfig);
  const renderVersion = usePlaygroundStore((state) => state.ditherPrismHeroRenderVersion);

  useEffect(() => {
    const code = generateCode(config);
    const timeoutId = setTimeout(() => {
      usePlaygroundStore.getState().setCode(code);
    }, 250);

    return () => clearTimeout(timeoutId);
  }, [config]);

  return (
    <div className="relative h-full w-full bg-[#f3f4f6] dark:bg-[#080808]">
      <div className="relative h-full w-full overflow-hidden rounded-none">
        <DitherPrismHero
          key={renderVersion}
          {...config}
          className="h-full w-full !min-h-full"
          style={{ minHeight: "100%" }}
        />
      </div>
    </div>
  );
}

export function DitherPrismHeroPersonalizePanel() {
  const config = usePlaygroundStore((state) => state.ditherPrismHeroConfig);
  const activePreset = usePlaygroundStore((state) => state.activeDitherPrismHeroPreset);
  const setConfig = usePlaygroundStore((state) => state.setDitherPrismHeroConfig);
  const setActivePreset = usePlaygroundStore((state) => state.setActiveDitherPrismHeroPreset);
  const updateConfig = usePlaygroundStore((state) => state.updateDitherPrismHeroConfig);
  const resetPreview = usePlaygroundStore((state) => state.resetDitherPrismHeroPreview);
  const resetConfig = usePlaygroundStore((state) => state.resetDitherPrismHeroConfig);

  const selectedPresetConfig = useMemo(
    () => PRESETS.find((preset) => preset.name === activePreset)?.config,
    [activePreset],
  );

  const handleChange = (key: keyof DitherPrismHeroConfig, value: string | number | boolean) => {
    updateConfig({ [key]: value } as Partial<DitherPrismHeroConfig>);

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
    <div className="h-full overflow-auto bg-[#f3f4f6] dark:bg-[#080808] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      <div className="space-y-6 px-4 pb-10 pt-20">
        <header className="space-y-2">
          <h2 className="text-2xl font-bold tracking-tighter text-foreground">Personalize</h2>
          <p className="text-sm leading-relaxed text-muted-foreground/90">
            Keep the same voice as docs: clean type, minimal controls, consistent spacing.
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
          <PlaygroundSectionTitle>Presets</PlaygroundSectionTitle>
          <div className="grid grid-cols-5 gap-1.5">
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
                    "rounded-md border p-1.5 text-center transition-colors",
                    isActive
                      ? "border-zinc-500/70 bg-zinc-100 dark:border-zinc-500/80 dark:bg-zinc-900/70"
                      : "border-border/70 bg-transparent",
                  )}
                >
                  <div
                    className="mb-1.5 h-4 rounded-sm border border-white/20"
                    style={{
                      background: `linear-gradient(125deg, ${preset.config.color1} 0%, ${preset.config.color2} 55%, ${preset.config.color3} 100%)`,
                    }}
                  />
                  <span className="block truncate text-[10px] font-mono uppercase tracking-widest text-foreground/90">
                    {preset.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <PlaygroundSectionTitle>Typography</PlaygroundSectionTitle>
          <div className="grid grid-cols-2 gap-2.5">
            <PlaygroundInput
              value={config.title1}
              onChange={(e) => handleChange("title1", e.target.value)}
              placeholder="Primary headline"
            />
            <PlaygroundInput
              value={config.title2}
              onChange={(e) => handleChange("title2", e.target.value)}
              placeholder="Secondary headline"
            />
          </div>
        </div>

        <div>
          <PlaygroundSectionTitle>Palette</PlaygroundSectionTitle>
          <div className="grid grid-cols-3 gap-2.5">
            <PlaygroundColorPicker label="Primary Base" value={config.color1} onChange={(v) => handleChange("color1", v)} />
            <PlaygroundColorPicker label="Secondary Flow" value={config.color2} onChange={(v) => handleChange("color2", v)} />
            <PlaygroundColorPicker label="Accent Highlight" value={config.color3} onChange={(v) => handleChange("color3", v)} />
          </div>
        </div>

        <div>
          <PlaygroundSectionTitle>Motion</PlaygroundSectionTitle>
          <div className="grid grid-cols-2 gap-x-4 gap-y-3">
            <PlaygroundSlider
              label="Dither Grain"
              min={0}
              max={1}
              step={0.01}
              value={config.ditherIntensity}
              onChange={(v) => handleChange("ditherIntensity", v)}
            />
            <PlaygroundSlider
              label="Prism Refraction"
              min={0}
              max={2}
              step={0.1}
              value={config.prismIntensity}
              onChange={(v) => handleChange("prismIntensity", v)}
            />
            <PlaygroundSlider
              label="Speed"
              min={0.2}
              max={3}
              step={0.1}
              value={config.speed}
              onChange={(v) => handleChange("speed", v)}
              unit="x"
            />
            {config.showParticles && (
              <PlaygroundSlider
                label="Particles"
                min={0}
                max={200}
                step={10}
                value={config.particleCount}
                onChange={(v) => handleChange("particleCount", v)}
              />
            )}
            <div className="col-span-2">
              <PlaygroundSwitch
                label="Floating Particles"
                checked={config.showParticles}
                onChange={(v) => handleChange("showParticles", v)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
