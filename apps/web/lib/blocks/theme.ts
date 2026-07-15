/**
 * XeVoS UI — https://github.com/AnsHh9094/XeVoS-Ui
 * Copyright (c) 2026 Anand Ansh (AnsHh9094)
 * SPDX-License-Identifier: MIT
 * This notice must be retained in all copies or substantial portions (MIT License).
 */
export const blockThemes = [
  {
    name: "system",
    label: "System",
    className: "",
    style: {},
  },
  {
    name: "graphite",
    label: "Graphite",
    className: "dark",
    style: {
      "--background": "oklch(0.12 0 0)",
      "--foreground": "oklch(0.98 0 0)",
      "--primary": "oklch(0.92 0 0)",
      "--primary-foreground": "oklch(0.12 0 0)",
      "--muted": "oklch(0.2 0 0)",
      "--muted-foreground": "oklch(0.72 0 0)",
      "--border": "oklch(1 0 0 / 10%)",
    },
  },
  {
    name: "cobalt",
    label: "Cobalt",
    className: "dark",
    style: {
      "--background": "oklch(0.16 0.04 248)",
      "--foreground": "oklch(0.98 0.01 248)",
      "--primary": "oklch(0.76 0.16 231)",
      "--primary-foreground": "oklch(0.12 0.03 248)",
      "--muted": "oklch(0.23 0.05 248)",
      "--muted-foreground": "oklch(0.78 0.04 248)",
      "--border": "oklch(0.9 0.04 248 / 14%)",
    },
  },
  {
    name: "paper",
    label: "Paper",
    className: "",
    style: {
      "--background": "oklch(0.985 0.01 94)",
      "--foreground": "oklch(0.18 0.02 74)",
      "--primary": "oklch(0.36 0.05 74)",
      "--primary-foreground": "oklch(0.985 0.01 94)",
      "--muted": "oklch(0.93 0.02 94)",
      "--muted-foreground": "oklch(0.48 0.03 74)",
      "--border": "oklch(0.78 0.03 82)",
    },
  },
] as const

export type BlockThemeName = (typeof blockThemes)[number]["name"]

export function getBlockTheme(name?: string | null) {
  return blockThemes.find((theme) => theme.name === name) ?? blockThemes[0]
}
