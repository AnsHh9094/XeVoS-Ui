"use client";

import { useEffect, useMemo } from "react";
import { Signature } from "@workspace/ui/components/signature";
import { cn } from "@/lib/utils";
import {
  SIGNATURE_DEFAULT_CONFIG,
  type SignatureConfig,
  usePlaygroundStore,
} from "@/hooks/use-playground-store";
import {
  PlaygroundSectionTitle,
  PlaygroundInput,
  PlaygroundSlider,
  PlaygroundColorPicker,
} from "@/components/playground-primitives";

const PRESETS: Array<{ name: string; config: SignatureConfig }> = [
  {
    name: "Default",
    config: SIGNATURE_DEFAULT_CONFIG,
  },
  {
    name: "John Doe",
    config: {
      ...SIGNATURE_DEFAULT_CONFIG,
      text: "John Doe",
      color: "#3b82f6",
      duration: 2,
    },
  },
  {
    name: "Autograph",
    config: {
      ...SIGNATURE_DEFAULT_CONFIG,
      text: "Jane Smith",
      color: "#ec4899",
      duration: 1.2,
      fontSize: 56,
    },
  },
];



function generateCode(config: SignatureConfig) {
  const props = Object.entries(config)
    .filter(([key, value]) => {
      if (value === undefined || value === null) return false;
      if (key === "color" && value === "") return false;
      return true;
    })
    .map(([key, value]) => {
      if (typeof value === "string") {
        return `${key}="${value}"`;
      }
      return `${key}={${value}}`;
    })
    .join("\n  ");

  return `import { Signature } from "@/components/ui/signature"\n\n<Signature\n  ${props}\n/>`;
}

import { useTheme } from "next-themes";

export function SignaturePlayground() {
  const config = usePlaygroundStore((state) => state.signatureConfig);
  const renderVersion = usePlaygroundStore(
    (state) => state.signatureRenderVersion,
  );

  useEffect(() => {
    const code = generateCode(config);
    const timeoutId = setTimeout(() => {
      usePlaygroundStore.getState().setCode(code);
    }, 250);

    return () => clearTimeout(timeoutId);
  }, [config]);

  return (
    <div className="relative h-full w-full flex items-center justify-center p-8">
      <Signature
        key={renderVersion}
        text={config.text}
        color={config.color || undefined}
        fontSize={config.fontSize}
        duration={config.duration}
      />
    </div>
  );
}

export function SignaturePersonalizePanel() {
  const { resolvedTheme } = useTheme();

  const config = usePlaygroundStore((state) => state.signatureConfig);
  const activePreset = usePlaygroundStore(
    (state) => state.activeSignaturePreset,
  );
  const setConfig = usePlaygroundStore((state) => state.setSignatureConfig);
  const setActivePreset = usePlaygroundStore(
    (state) => state.setActiveSignaturePreset,
  );
  const updateConfig = usePlaygroundStore(
    (state) => state.updateSignatureConfig,
  );
  const resetPreview = usePlaygroundStore(
    (state) => state.resetSignaturePreview,
  );
  const resetConfig = usePlaygroundStore((state) => state.resetSignatureConfig);

  const selectedPresetConfig = useMemo(
    () => PRESETS.find((preset) => preset.name === activePreset)?.config,
    [activePreset],
  );

  // Compute the default hex visual color to show when the custom color is empty/dynamic
  const pickerDefaultColor = resolvedTheme === "dark" ? "#ffffff" : "#000000";

  const handleChange = (key: keyof SignatureConfig, value: string | number) => {
    updateConfig({ [key]: value } as Partial<SignatureConfig>);

    if (activePreset === "Custom") {
      return;
    }

    const matchedPreset = PRESETS.find(
      (preset) =>
        JSON.stringify(preset.config) ===
        JSON.stringify({ ...config, [key]: value }),
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
          <h2 className="text-2xl font-bold tracking-tighter text-foreground">
            Personalize
          </h2>
          <p className="text-sm leading-relaxed text-muted-foreground/90">
            Customize the signature text, size, color, and trace speed.
          </p>
        </header>

        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground/90">
            Current preset:{" "}
            <span className="font-mono text-foreground">{activePreset}</span>
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
          <div className="grid grid-cols-3 gap-1.5">
            {PRESETS.map((preset) => {
              const isActive =
                activePreset === preset.name ||
                (activePreset !== "Custom" &&
                  selectedPresetConfig &&
                  preset.name === activePreset);

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
                  <span className="block truncate text-[10px] font-mono uppercase tracking-widest text-foreground/90">
                    {preset.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <PlaygroundSectionTitle>Content</PlaygroundSectionTitle>
          <div className="grid grid-cols-1 gap-2.5">
            <PlaygroundInput
              value={config.text}
              onChange={(e) => handleChange("text", e.target.value)}
              placeholder="Text to trace"
            />
          </div>
        </div>

        <div>
          <PlaygroundSectionTitle>Styling</PlaygroundSectionTitle>
          <div className="grid grid-cols-1 gap-2.5">
            <PlaygroundColorPicker
              label="Color"
              value={config.color}
              defaultColor={pickerDefaultColor}
              onChange={(v) => handleChange("color", v)}
            />
          </div>
        </div>

        <div>
          <PlaygroundSectionTitle>Parameters</PlaygroundSectionTitle>
          <div className="grid grid-cols-1 gap-3">
            <PlaygroundSlider
              label="Font Size"
              min={16}
              max={120}
              step={1}
              value={config.fontSize}
              onChange={(v) => handleChange("fontSize", v)}
              unit="px"
            />
            <PlaygroundSlider
              label="Duration"
              min={0.5}
              max={10}
              step={0.1}
              value={config.duration}
              onChange={(v) => handleChange("duration", v)}
              unit="s"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
