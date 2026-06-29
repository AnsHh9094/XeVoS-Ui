import { highlightCode } from "@/lib/shiki"
import type { BlockRegistryItem, HighlightedBlockFile } from "@/lib/blocks/types"
import { BlockViewer } from "@/components/blocks/block-viewer"

export async function BlockDisplay({ item }: { item: BlockRegistryItem }) {
  const highlightedFiles: HighlightedBlockFile[] = await Promise.all(
    item.files.map(async (file) => ({
      ...file,
      highlightedContent: await highlightCode(file.content ?? "", "tsx"),
    }))
  )

  return <BlockViewer item={item} highlightedFiles={highlightedFiles} />
}
