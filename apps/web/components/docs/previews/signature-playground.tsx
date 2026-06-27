"use client";

import { useEffect, useMemo, useState } from "react";
import { Signature } from "@workspace/ui/components/signature";
import { cn } from "@/lib/utils";
import {
  SIGNATURE_DEFAULT_CONFIG,
  type SignatureConfig,
  usePlaygroundStore,
} from "@/hooks/use-playground-store";

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

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <div className="mb-3 text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
    {children}
  </div>
);

const Input = ({
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input
    className={cn(
      "h-10 w-full rounded-md border border-border/70 bg-transparent px-3 text-sm text-foreground placeholder:text-muted-foreground/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400/25",
      className,
    )}
    {...props}
  />
);

const Slider = ({
  value,
  min,
  max,
  step,
  onChange,
  label,
  unit = "",
}: {
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (val: number) => void;
  label: string;
  unit?: string;
}) => (
  <div className="space-y-2">
    <div className="flex items-center justify-between text-sm">
      <span className="text-foreground/90">{label}</span>
      <span className="font-mono text-muted-foreground">
        {Number(value).toFixed(step < 0.1 ? 2 : 1)}
        {unit}
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

function normalizeHexColor(value: string) {
  const trimmed = value.trim();
  if (!/^#?[0-9a-fA-F]{6}$/.test(trimmed)) {
    return null;
  }
  return `#${trimmed.replace("#", "").toLowerCase()}`;
}

const ColorPicker = ({
  value,
  onChange,
  label,
  defaultColor = "#000000",
}: {
  value: string;
  onChange: (val: string) => void;
  label: string;
  defaultColor?: string;
}) => {
  const [draft, setDraft] = useState(value);

  // Sync draft when value changes externally
  useEffect(() => {
    setDraft(value);
  }, [value]);

  const isValidHex = /^#?[0-9a-fA-F]{6}$/.test(value);
  // If not valid, fallback to the default computed color for the color input UI
  const colorInputVal = isValidHex
    ? value.startsWith("#")
      ? value
      : `#${value}`
    : defaultColor;

  return (
    <label className="flex items-center gap-3 rounded-md border border-border/70 p-2.5">
      <span className="relative h-8 w-8 overflow-hidden rounded border border-border">
        {isValidHex ? (
          <span
            aria-hidden="true"
            className="absolute inset-0"
            style={{ backgroundColor: value }}
          />
        ) : (
          <span
            aria-hidden="true"
            className="absolute inset-0"
            style={{ backgroundColor: defaultColor }}
          />
        )}
        <input
          type="color"
          value={colorInputVal}
          onInput={(e) => onChange((e.target as HTMLInputElement).value)}
          onChange={(e) => onChange(e.target.value)}
          aria-label={`${label} color picker`}
          className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
        />
      </span>
      <span className="min-w-0 flex-1">
        <span className="mb-1 block text-xs font-semibold text-foreground/90">
          {label}
        </span>
        <input
          value={draft}
          onChange={(e) => {
            const next = e.target.value;
            setDraft(next);
            if (next === "") {
              onChange("");
              return;
            }
            const normalized = normalizeHexColor(next);
            if (normalized) {
              onChange(normalized);
            }
          }}
          placeholder="e.g. #000000 or empty for auto"
          className="h-8 w-full rounded border border-border/70 bg-transparent px-2.5 font-mono text-xs text-foreground placeholder:text-muted-foreground/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400/25"
        />
      </span>
    </label>
  );
};

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
          <SectionTitle>Presets</SectionTitle>
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
          <SectionTitle>Content</SectionTitle>
          <div className="grid grid-cols-1 gap-2.5">
            <Input
              value={config.text}
              onChange={(e) => handleChange("text", e.target.value)}
              placeholder="Text to trace"
            />
          </div>
        </div>

        <div>
          <SectionTitle>Styling</SectionTitle>
          <div className="grid grid-cols-1 gap-2.5">
            <ColorPicker
              label="Color"
              value={config.color}
              defaultColor={pickerDefaultColor}
              onChange={(v) => handleChange("color", v)}
            />
          </div>
        </div>

        <div>
          <SectionTitle>Parameters</SectionTitle>
          <div className="grid grid-cols-1 gap-3">
            <Slider
              label="Font Size"
              min={16}
              max={120}
              step={1}
              value={config.fontSize}
              onChange={(v) => handleChange("fontSize", v)}
              unit="px"
            />
            <Slider
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
