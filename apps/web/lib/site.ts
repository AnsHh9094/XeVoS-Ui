/**
 * XeVoS UI — https://github.com/AnsHh9094/XeVoS-Ui
 * Copyright (c) 2026 Anand Ansh (AnsHh9094)
 * SPDX-License-Identifier: MIT
 * This notice must be retained in all copies or substantial portions (MIT License).
 */
export const siteConfig = {
  name: "Xevos UI",
  url: "https://xevos-ui.dev",
  title: "Xevos UI — Animated React UI Components for Modern Apps",
  description:
    "Beautiful, animated, copy-paste React UI components built with Tailwind CSS, TypeScript, and Framer Motion. Free and open-source.",
  author: {
    name: "ansh anand",
    twitter: "https://twitter.com/AnsHh9094",
    github: "https://github.com/AnsHh9094",
    handle: "@AnsHh9094",
  },
  repository: "https://github.com/AnsHh9094/xevos-ui",
} as const

export function absoluteUrl(path = "") {
  if (!path) return siteConfig.url
  return `${siteConfig.url}${path.startsWith("/") ? path : `/${path}`}`
} 
