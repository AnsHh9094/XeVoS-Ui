import blocksIndex from "@/registry/generated/blocks.json"
import type { BlockIndexItem, BlockRegistryItem } from "@/lib/blocks/types"

export function getAllBlocks(categories: string[] = []): BlockIndexItem[] {
  const blocks = blocksIndex as BlockIndexItem[]

  return blocks
    .filter(
      (block) =>
        categories.length === 0 ||
        block.categories.some((category) => categories.includes(category))
    )
    .sort((a, b) => {
      const dateA = new Date(a.meta?.createdAt ?? 0).getTime()
      const dateB = new Date(b.meta?.createdAt ?? 0).getTime()
      return dateB - dateA
    })
}

export function getBlock(name: string): BlockRegistryItem | null {
  const block = getAllBlocks().find((item) => item.name === name)
  return block ? (block as BlockRegistryItem) : null
}

export function getAllBlockStaticParams() {
  return getAllBlocks().flatMap((block) =>
    block.categories.map((category) => ({ category, name: block.name }))
  )
}

export function getBlockCategoryHref(block: Pick<BlockIndexItem, "categories" | "name">) {
  return `/blocks/${block.categories[0]}/${block.name}`
}
