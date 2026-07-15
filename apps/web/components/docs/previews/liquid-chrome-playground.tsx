/**
 * XeVoS UI — https://github.com/AnsHh9094/XeVoS-Ui
 * Copyright (c) 2026 Anand Ansh (AnsHh9094)
 * SPDX-License-Identifier: MIT
 * This notice must be retained in all copies or substantial portions (MIT License).
 */
"use client";

import { useEffect, useMemo } from "react";
import { LiquidChrome } from "@workspace/ui/components/liquid-chrome";
import { cn } from "@/lib/utils";
import {
  LIQUID_CHROME_DEFAULT_CONFIG,
  type LiquidChromeConfig,
  usePlaygroundStore,
} from "@/hooks/use-playground-store";
import {
  PlaygroundSectionTitle,
  PlaygroundSlider,
  PlaygroundColorPicker,
} from "@/components/playground-primitives";

const PRESETS: Array<{ name: string; config: LiquidChromeConfig }> = [
  {
    name: "Default",
    config: LIQUID_CHROME_DEFAULT_CONFIG,
  },
  {
    name: "Purple",
    config: {
      baseColor: "#4c1d95",
      speed: 1.2,
      amplitude: 0.8,
    },
  },
  {
    name: "Fast Ripple",
    config: {
      baseColor: "#e5e7eb",
      speed: 3.0,
      amplitude: 0.5,
    },
  },
  {
    name: "Gold",
    config: {
      baseColor: "#ca8a04",
      speed: 0.8,
      amplitude: 1.2,
    },
  },
];

function hexToRgbArray(hex: string): [number, number, number] {
  hex = hex.replace(/^#/, "");
  if (hex.length === 3) {
    hex = hex[0]! + hex[0]! + hex[1]! + hex[1]! + hex[2]! + hex[2]!;
  }
  const bigint = parseInt(hex, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return [r / 255, g / 255, b / 255];
}

function generateCode(config: LiquidChromeConfig) {
  const rgb = hexToRgbArray(config.baseColor);
  const rgbString = `[${rgb[0].toFixed(2)}, ${rgb[1].toFixed(2)}, ${rgb[2].toFixed(2)}]`;
  
  return `<LiquidChrome 
  baseColor={${rgbString}}
  speed={${config.speed}}
  amplitude={${config.amplitude}}
  interactive={true}
/>`;
}

export function LiquidChromePlayground() {
  const config = usePlaygroundStore((state) => state.liquidChromeConfig);
  const renderVersion = usePlaygroundStore((state) => state.liquidChromeRenderVersion);

  useEffect(() => {
    const code = generateCode(config);
    const timeoutId = setTimeout(() => {
      usePlaygroundStore.getState().setCode(code);
    }, 250);

    return () => clearTimeout(timeoutId);
  }, [config]);

  const rgbArray = hexToRgbArray(config.baseColor);

  return (
    <div className="relative h-full w-full bg-[#f3f4f6] dark:bg-[#080808]">
      <div className="relative h-full w-full overflow-hidden rounded-none">
        <LiquidChrome
          key={renderVersion}
          baseColor={rgbArray}
          speed={config.speed}
          amplitude={config.amplitude}
          interactive={true}
          className="absolute inset-0 h-full w-full"
        />
      </div>
    </div>
  );
}

export function LiquidChromePersonalizePanel() {
  const config = usePlaygroundStore((state) => state.liquidChromeConfig);
  const activePreset = usePlaygroundStore((state) => state.activeLiquidChromePreset);
  const setConfig = usePlaygroundStore((state) => state.setLiquidChromeConfig);
  const setActivePreset = usePlaygroundStore((state) => state.setActiveLiquidChromePreset);
  const updateConfig = usePlaygroundStore((state) => state.updateLiquidChromeConfig);
  const resetPreview = usePlaygroundStore((state) => state.resetLiquidChromePreview);
  const resetConfig = usePlaygroundStore((state) => state.resetLiquidChromeConfig);

  const selectedPresetConfig = useMemo(
    () => PRESETS.find((preset) => preset.name === activePreset)?.config,
    [activePreset],
  );

  const handleChange = (key: keyof LiquidChromeConfig, value: string | number) => {
    updateConfig({ [key]: value } as Partial<LiquidChromeConfig>);

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
            Shape your premium liquid shader with custom colors, speed, and distortion.
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
                    "rounded-md border p-1.5 text-center transition-colors",
                    isActive
                      ? "border-zinc-500/70 bg-zinc-100 dark:border-zinc-500/80 dark:bg-zinc-900/70"
                      : "border-border/70 bg-transparent",
                  )}
                >
                  <div
                    className="mb-1.5 h-4 rounded-sm border border-white/20"
                    style={{
                      background: preset.config.baseColor,
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
          <PlaygroundSectionTitle>Palette</PlaygroundSectionTitle>
          <div className="grid grid-cols-1 gap-2.5">
            <PlaygroundColorPicker label="Base Color" value={config.baseColor} onChange={(v) => handleChange("baseColor", v)} />
          </div>
        </div>

        <div>
          <PlaygroundSectionTitle>Motion & Mechanics</PlaygroundSectionTitle>
          <div className="grid grid-cols-1 gap-5">
            <PlaygroundSlider
              label="Speed"
              min={0.1}
              max={5}
              step={0.1}
              value={config.speed}
              onChange={(v) => handleChange("speed", v)}
              unit="x"
            />
            <PlaygroundSlider
              label="Distortion Amplitude"
              min={0.1}
              max={3}
              step={0.1}
              value={config.amplitude}
              onChange={(v) => handleChange("amplitude", v)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
