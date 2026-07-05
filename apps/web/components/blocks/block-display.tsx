import { highlightCode } from "@/lib/shiki";
import {
  createFileTreeForRegistryItemFiles,
  getRegistryItem,
} from "@/lib/blocks/registry";
import type { HighlightedBlockFile } from "@/lib/blocks/types";
import { BlockViewer } from "@/components/blocks/block-viewer";

export async function BlockDisplay({ name }: { name: string }) {
  const item = await getRegistryItem(name);

  if (!item?.files) {
    return null;
  }

  const tree = createFileTreeForRegistryItemFiles(item.files);
  const highlightedFiles: HighlightedBlockFile[] = await Promise.all(
    item.files.map(async (file) => ({
      ...file,
      highlightedContent: await highlightCode(file.content ?? "", "tsx", {
        darkTheme: "dark-plus",
      }),
    })),
  );

  return (
    <BlockViewer item={item} tree={tree} highlightedFiles={highlightedFiles} />
  );
}
