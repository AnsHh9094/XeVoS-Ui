"use client";

import { useEffect, useMemo, useState } from "react";
import { SplitFlapDisplay } from "@workspace/ui/components/split-flap-display";
import { cn } from "@/lib/utils";
import {
  SPLIT_FLAP_DISPLAY_DEFAULT_CONFIG,
  type SplitFlapDisplayConfig,
  usePlaygroundStore,
} from "@/hooks/use-playground-store";

const PRESETS: Array<{ name: string; config: SplitFlapDisplayConfig }> = [
  {
    name: "Default",
    config: SPLIT_FLAP_DISPLAY_DEFAULT_CONFIG,
  },
  {
    name: "Airport",
    config: {
      ...SPLIT_FLAP_DISPLAY_DEFAULT_CONFIG,
      text: "FLIGHT 404",
      columns: 12,
      size: "lg",
      accentColor: "#22c55e",
      showIndicators: true,
      staggerDelay: 25,
      flipSpeed: 30,
    },
  },
  {
    name: "Compact",
    config: {
      ...SPLIT_FLAP_DISPLAY_DEFAULT_CONFIG,
      text: "GATE B42",
      columns: 10,
      size: "sm",
      accentColor: "#3b82f6",
      showIndicators: true,
      staggerDelay: 20,
      flipSpeed: 25,
    },
  },
  {
    name: "Gold",
    config: {
      ...SPLIT_FLAP_DISPLAY_DEFAULT_CONFIG,
      text: "PREMIUM",
      columns: 10,
      size: "lg",
      accentColor: "#eab308",
      showIndicators: true,
      staggerDelay: 40,
      flipSpeed: 40,
    },
  },
  {
    name: "Minimal",
    config: {
      ...SPLIT_FLAP_DISPLAY_DEFAULT_CONFIG,
      text: "HELLO WORLD",
      columns: 14,
      size: "md",
      accentColor: "#22c55e",
      showIndicators: false,
      staggerDelay: 30,
      flipSpeed: 35,
    },
  },
];

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <div className="mb-3 text-[10px] font-mono uppercase tracking-widest text-muted-foreground">{children}</div>
);

const Input = ({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) => (
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
        {Number(value).toFixed(step < 1 ? 0 : 0)}
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
  if (!/^#?[0-9a-fA-F]{6}$/.test(trimmed)) return null;
  return `#${trimmed.replace("#", "").toLowerCase()}`;
}

const ColorPicker = ({
  value,
  onChange,
  label,
}: {
  value: string;
  onChange: (val: string) => void;
  label: string;
}) => {
  const [draft, setDraft] = useState(value);

  useEffect(() => {
    setDraft(value);
  }, [value]);

  return (
    <label className="flex items-center gap-3 rounded-md border border-border/70 p-2.5">
      <span className="relative h-8 w-8 overflow-hidden rounded border border-border">
        <span aria-hidden="true" className="absolute inset-0" style={{ backgroundColor: value }} />
        <input
          type="color"
          value={value}
          onInput={(e) => onChange((e.target as HTMLInputElement).value)}
          onChange={(e) => onChange(e.target.value)}
          aria-label={`${label} color picker`}
          className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
        />
      </span>
      <span className="min-w-0 flex-1">
        <span className="mb-1 block text-xs font-semibold text-foreground/90">{label}</span>
        <input
          value={draft}
          onChange={(e) => {
            const next = e.target.value;
            setDraft(next);
            const normalized = normalizeHexColor(next);
            if (normalized) onChange(normalized);
          }}
          placeholder="#000000"
          className="h-8 w-full rounded border border-border/70 bg-transparent px-2.5 font-mono text-xs text-foreground placeholder:text-muted-foreground/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400/25"
        />
      </span>
    </label>
  );
};

function generateCode(config: SplitFlapDisplayConfig) {
  const lines: string[] = [];
  lines.push(`<SplitFlapDisplay`);
  lines.push(`  text="${config.text}"`);
  lines.push(`  columns={${config.columns}}`);
  lines.push(`  size="${config.size}"`);
  if (config.accentColor !== "#22c55e") lines.push(`  accentColor="${config.accentColor}"`);
  if (!config.showIndicators) lines.push(`  showIndicators={false}`);
  if (config.staggerDelay !== 30) lines.push(`  staggerDelay={${config.staggerDelay}}`);
  if (config.flipSpeed !== 35) lines.push(`  flipSpeed={${config.flipSpeed}}`);
  lines.push(`/>`);
  return lines.join("\n");
}

/* ─── Playground Preview ───────────────────────────────── */

export function SplitFlapDisplayPlayground() {
  const config = usePlaygroundStore((s) => s.splitFlapDisplayConfig);
  const renderVersion = usePlaygroundStore((s) => s.splitFlapDisplayRenderVersion);

  useEffect(() => {
    const code = generateCode(config);
    const t = setTimeout(() => {
      usePlaygroundStore.getState().setCode(code);
    }, 250);
    return () => clearTimeout(t);
  }, [config]);

  return (
    <div className="relative flex h-full w-full items-center justify-center bg-black p-10">
      <SplitFlapDisplay
        key={renderVersion}
        text={config.text}
        columns={config.columns}
        size={config.size}
        accentColor={config.accentColor}
        showIndicators={config.showIndicators}
        staggerDelay={config.staggerDelay}
        flipSpeed={config.flipSpeed}
      />
    </div>
  );
}

/* ─── Personalize Panel ────────────────────────────────── */

export function SplitFlapDisplayPersonalizePanel() {
  const config = usePlaygroundStore((s) => s.splitFlapDisplayConfig);
  const activePreset = usePlaygroundStore((s) => s.activeSplitFlapDisplayPreset);
  const setConfig = usePlaygroundStore((s) => s.setSplitFlapDisplayConfig);
  const setActivePreset = usePlaygroundStore((s) => s.setActiveSplitFlapDisplayPreset);
  const updateConfig = usePlaygroundStore((s) => s.updateSplitFlapDisplayConfig);
  const resetPreview = usePlaygroundStore((s) => s.resetSplitFlapDisplayPreview);
  const resetConfig = usePlaygroundStore((s) => s.resetSplitFlapDisplayConfig);

  const selectedPresetConfig = useMemo(
    () => PRESETS.find((p) => p.name === activePreset)?.config,
    [activePreset],
  );

  const handleChange = (key: keyof SplitFlapDisplayConfig, value: string | number | boolean) => {
    updateConfig({ [key]: value } as Partial<SplitFlapDisplayConfig>);
    resetPreview();

    if (activePreset === "Custom") return;

    const matchedPreset = PRESETS.find(
      (preset) => JSON.stringify(preset.config) === JSON.stringify({ ...config, [key]: value }),
    );
    setActivePreset(matchedPreset?.name ?? "Custom");
  };

  const handlePresetChange = (presetName: string) => {
    const preset = PRESETS.find((item) => item.name === presetName);
    if (!preset) return;
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
            Customize your split-flap board with text, sizing, speed, and accent colors.
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

        {/* Presets */}
        <div>
          <SectionTitle>Presets</SectionTitle>
          <div className="grid grid-cols-5 gap-1.5">
            {PRESETS.map((preset) => {
              const isActive = activePreset === preset.name;
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
                      background: `linear-gradient(125deg, #111 0%, ${preset.config.accentColor} 100%)`,
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

        {/* Content */}
        <div>
          <SectionTitle>Content</SectionTitle>
          <div className="space-y-2.5">
            <Input
              value={config.text}
              onChange={(e) => handleChange("text", e.target.value.toUpperCase())}
              placeholder="Display text"
            />
          </div>
        </div>

        {/* Layout */}
        <div>
          <SectionTitle>Layout</SectionTitle>
          <div className="space-y-3">
            <Slider
              label="Columns"
              min={4}
              max={20}
              step={1}
              value={config.columns}
              onChange={(v) => handleChange("columns", v)}
            />
            <div>
              <span className="mb-2 block text-sm text-foreground/90">Size</span>
              <div className="grid grid-cols-3 gap-1.5">
                {(["sm", "md", "lg"] as const).map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => handleChange("size", s)}
                    className={cn(
                      "rounded-md border px-3 py-2 text-xs font-mono uppercase tracking-widest transition-colors",
                      config.size === s
                        ? "border-zinc-500/70 bg-zinc-100 text-foreground dark:border-zinc-500/80 dark:bg-zinc-900/70"
                        : "border-border/70 bg-transparent text-muted-foreground",
                    )}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-foreground/90">Show Indicators</span>
              <button
                type="button"
                onClick={() => handleChange("showIndicators", !config.showIndicators)}
                className={cn(
                  "relative h-6 w-11 rounded-full transition-colors",
                  config.showIndicators ? "bg-green-500" : "bg-zinc-300 dark:bg-zinc-700",
                )}
              >
                <span
                  className={cn(
                    "absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform",
                    config.showIndicators && "translate-x-5",
                  )}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Style */}
        <div>
          <SectionTitle>Style</SectionTitle>
          <ColorPicker
            label="Accent Color"
            value={config.accentColor}
            onChange={(v) => handleChange("accentColor", v)}
          />
        </div>

        {/* Animation */}
        <div>
          <SectionTitle>Animation</SectionTitle>
          <div className="grid grid-cols-1 gap-3">
            <Slider
              label="Stagger Delay"
              min={5}
              max={80}
              step={5}
              value={config.staggerDelay}
              onChange={(v) => handleChange("staggerDelay", v)}
              unit="ms"
            />
            <Slider
              label="Flip Speed"
              min={15}
              max={80}
              step={5}
              value={config.flipSpeed}
              onChange={(v) => handleChange("flipSpeed", v)}
              unit="ms"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
