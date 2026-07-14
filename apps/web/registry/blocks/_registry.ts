import registry from "./registry.json"

import type { BlockRegistryItem } from "@/lib/blocks/types"

export const blockCategories = registry.categories

export type BlockCategory = (typeof blockCategories)[number]["name"]

export const blocks = registry.blocks as BlockRegistryItem[]
