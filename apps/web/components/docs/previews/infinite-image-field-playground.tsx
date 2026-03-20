"use client";

import { useEffect } from "react";
import { InfiniteImageField } from "@workspace/ui/components/infinite-image-field";
import { usePlaygroundStore } from "@/hooks/use-playground-store";
import { create } from "zustand";

interface InfiniteImageFieldConfig {
  gap: number;
  maxSpeed: number;
  smoothing: number;
  borderRadius: number;
}

const DEFAULT_CONFIG: InfiniteImageFieldConfig = {
  gap: 28,
  maxSpeed: 5,
  smoothing: 0.07,
  borderRadius: 0,
};

interface InfiniteImageFieldStore {
  config: InfiniteImageFieldConfig;
  renderVersion: number;
  updateConfig: (updates: Partial<InfiniteImageFieldConfig>) => void;
  resetConfig: () => void;
  resetPreview: () => void;
}

const useInfiniteImageFieldStore = create<InfiniteImageFieldStore>((set) => ({
  config: DEFAULT_CONFIG,
  renderVersion: 0,
  updateConfig: (updates) =>
    set((state) => ({ config: { ...state.config, ...updates } })),
  resetConfig: () =>
    set((state) => ({
      config: DEFAULT_CONFIG,
      renderVersion: state.renderVersion + 1,
    })),
  resetPreview: () =>
    set((state) => ({ renderVersion: state.renderVersion + 1 })),
}));

function generateCode(config: InfiniteImageFieldConfig): string {
  const lines: string[] = [];
  lines.push(`<InfiniteImageField`);
  lines.push(`  maxSpeed={${config.maxSpeed}}`);
  lines.push(`  smoothing={${config.smoothing}}`);
  lines.push(`  gap={${config.gap}}`);
  lines.push(`  borderRadius={${config.borderRadius}}`);
  lines.push(`  className="w-full h-screen"`);
  lines.push(`/>`);
  return lines.join("\n");
}

export function InfiniteImageFieldPlayground() {
  const { config, renderVersion } = useInfiniteImageFieldStore();
  usePlaygroundStore();

  useEffect(() => {
    const code = generateCode(config);
    const id = setTimeout(() => {
      usePlaygroundStore.getState().setCode(code);
    }, 250);
    return () => clearTimeout(id);
  }, [config]);

  return (
    <InfiniteImageField
      key={renderVersion}
      gap={config.gap}
      maxSpeed={config.maxSpeed}
      smoothing={config.smoothing}
      borderRadius={config.borderRadius}
      className="w-full h-full"
    />
  );
}

// ─── Shared primitives ────────────────────────────────────────────────────────

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <div className="mb-3 text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
    {children}
  </div>
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

// ─── Personalize panel ────────────────────────────────────────────────────────

export function InfiniteImageFieldPersonalizePanel() {
  const { config, updateConfig, resetConfig } = useInfiniteImageFieldStore();

  return (
    <div className="h-full overflow-auto bg-[#f3f4f6] dark:bg-[#080808] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      <div className="space-y-6 px-4 pb-10 pt-20">
        <header className="space-y-2">
          <h2 className="text-2xl font-bold tracking-tighter text-foreground">
            Personalize
          </h2>
          <p className="text-sm leading-relaxed text-muted-foreground/90">
            Tune the speed, layout, and feel of the infinite image field.
          </p>
        </header>

        <div className="flex items-center justify-end">
          <button
            type="button"
            onClick={resetConfig}
            className="rounded-md border border-border/40 bg-white/50 px-3 py-1.5 text-[10px] font-mono uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground dark:bg-white/[0.03]"
          >
            Reset
          </button>
        </div>

        {/* Motion */}
        <div>
          <SectionTitle>Motion</SectionTitle>
          <div className="grid grid-cols-1 gap-3">
            <Slider
              label="Max Speed"
              min={1}
              max={20}
              step={0.5}
              value={config.maxSpeed}
              onChange={(v) => updateConfig({ maxSpeed: v })}
              unit="px"
            />
            <Slider
              label="Smoothing"
              min={0.01}
              max={0.3}
              step={0.01}
              value={config.smoothing}
              onChange={(v) => updateConfig({ smoothing: v })}
            />
          </div>
        </div>

        {/* Layout */}
        <div>
          <SectionTitle>Layout</SectionTitle>
          <div className="grid grid-cols-1 gap-3">
            <Slider
              label="Gap"
              min={4}
              max={80}
              step={2}
              value={config.gap}
              onChange={(v) => updateConfig({ gap: v })}
              unit="px"
            />
          </div>
        </div>

        {/* Style */}
        <div>
          <SectionTitle>Style</SectionTitle>
          <div className="grid grid-cols-1 gap-3">
            <Slider
              label="Border Radius"
              min={0}
              max={40}
              step={1}
              value={config.borderRadius}
              onChange={(v) => updateConfig({ borderRadius: v })}
              unit="px"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
