/**
 * XeVoS UI — https://github.com/AnsHh9094/XeVoS-Ui
 * Copyright (c) 2026 Anand Ansh (AnsHh9094)
 * SPDX-License-Identifier: MIT
 * This notice must be retained in all copies or substantial portions (MIT License).
 */
"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

// ─── Section Title ───────────────────────────────────────────────────────────

export function PlaygroundSectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-3 text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
      {children}
    </div>
  );
}

// ─── Input ────────────────────────────────────────────────────────────────────

export const PlaygroundInput = ({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input
    className={cn(
      "h-10 w-full rounded-md border border-border/70 bg-transparent px-3 text-sm text-foreground placeholder:text-muted-foreground/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400/25",
      className,
    )}
    {...props}
  />
);

// ─── TextArea ────────────────────────────────────────────────────────────────

export const PlaygroundTextArea = ({ className, ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement>) => (
  <textarea
    className={cn(
      "min-h-24 w-full resize-none rounded-md border border-border/70 bg-transparent px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400/25",
      className,
    )}
    {...props}
  />
);

// ─── Slider (Ruler style) ────────────────────────────────────────────────────

export function PlaygroundSlider({
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
}) {
  const percentage = ((value - min) / (max - min)) * 100;
  const decimals = step < 0.01 ? 3 : step < 0.1 ? 2 : 1;

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-foreground/90">{label}</span>
        <span className="font-mono text-xs tabular-nums text-muted-foreground">
          {Number(value).toFixed(decimals)}
          {unit}
        </span>
      </div>
      <div className="group relative flex h-10 w-full items-center overflow-hidden rounded-md border border-border/70 bg-transparent">
        <div className="absolute inset-0 flex items-center justify-between px-2 opacity-10 transition-opacity duration-300 group-hover:opacity-40">
          {Array.from({ length: 41 }).map((_, i) => (
            <div
              key={i}
              className={cn("w-[1px] bg-foreground", i % 5 === 0 ? "h-3" : "h-1.5")}
            />
          ))}
        </div>

        <div
          className="absolute inset-y-0 left-0 bg-zinc-200/50 transition-all duration-75 ease-out dark:bg-zinc-800/50"
          style={{ width: `${percentage}%` }}
        />

        <div
          className="pointer-events-none absolute inset-y-0 flex items-center justify-center -ml-[1px] w-[2px]"
          style={{ left: `${percentage}%` }}
        >
          <div className="h-full w-full bg-foreground/20 transition-colors group-hover:bg-foreground/50" />
        </div>

        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          className="absolute inset-0 h-full w-full cursor-ew-resize appearance-none bg-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400/25 [&::-webkit-slider-thumb]:h-full [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:bg-transparent"
        />
      </div>
    </div>
  );
}

// ─── Switch ──────────────────────────────────────────────────────────────────

export function PlaygroundSwitch({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (val: boolean) => void;
  label: string;
}) {
  return (
    <label className="flex items-center justify-between rounded-md border border-border/70 p-2.5">
      <span className="text-sm text-foreground/90">{label}</span>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={cn(
          "inline-flex h-6 w-10 items-center rounded-full border border-border transition-colors",
          checked ? "bg-zinc-900 dark:bg-zinc-100" : "bg-zinc-200 dark:bg-zinc-800",
        )}
      >
        <span
          className={cn(
            "mx-[2px] h-5 w-5 rounded-full bg-white transition-transform dark:bg-zinc-900",
            checked ? "translate-x-4" : "translate-x-0.5",
          )}
        />
      </button>
    </label>
  );
}

// ─── Color Picker ────────────────────────────────────────────────────────────

export function normalizeHexColor(value: string) {
  const trimmed = value.trim();
  if (!/^#?[0-9a-fA-F]{6}$/.test(trimmed)) return null;

  return `#${trimmed.replace("#", "").toLowerCase()}`;
}

export function PlaygroundColorPicker({
  value,
  onChange,
  label,
  defaultColor = "#000000",
}: {
  value: string;
  onChange: (val: string) => void;
  label: string;
  defaultColor?: string;
}) {
  const [draft, setDraft] = useState(value);

  useEffect(() => {
    setDraft(value);
  }, [value]);

  const isValidHex = /^#?[0-9a-fA-F]{6}$/.test(value);
  const colorInputVal = isValidHex ? (value.startsWith("#") ? value : `#${value}`) : defaultColor;

  return (
    <label className="flex items-center gap-3 rounded-md border border-border/70 p-2.5">
      <span className="relative h-8 w-8 overflow-hidden rounded border border-border">
        <span
          aria-hidden="true"
          className="absolute inset-0"
          style={{ backgroundColor: isValidHex ? value : defaultColor }}
        />
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
        <span className="mb-1 block text-xs font-semibold text-foreground/90">{label}</span>
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
          placeholder="#000000"
          className="h-8 w-full rounded border border-border/70 bg-transparent px-2.5 font-mono text-xs text-foreground placeholder:text-muted-foreground/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400/25"
        />
      </span>
    </label>
  );
}
