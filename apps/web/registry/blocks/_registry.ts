/**
 * XeVoS UI — https://github.com/AnsHh9094/XeVoS-Ui
 * Copyright (c) 2026 Anand Ansh (AnsHh9094)
 * SPDX-License-Identifier: MIT
 * This notice must be retained in all copies or substantial portions (MIT License).
 */
import type { BlockCategoryItem, BlockRegistryItem } from "@/lib/blocks/types";

export const blockCategories = [
  {
    name: "marketing",
    title: "Marketing",
    description:
      "Landing sections, proof bands, and polished launch pages for high-signal product sites.",
  },
] satisfies BlockCategoryItem[];

export const blocks = [
  {
    name: "gradient-hero-01",
    title: "Gradient Hero 01",
    description:
      "A simple centered hero with a warm cinematic gradient, compact badge, short copy, and two actions.",
    type: "registry:block",
    categories: ["marketing"],
    files: [
      {
        path: "blocks/gradient-hero-01/gradient-hero-01.tsx",
        target: "@components/gradient-hero-01.tsx",
        type: "registry:component",
      },
    ],
    meta: {
      createdAt: "2026-06-30",
      iframeHeight: 760,
      previewClassName: "min-h-screen",
    },
  },
] satisfies BlockRegistryItem[];
