import { promises as fs } from "fs";
import path from "path";

import blocksIndex from "@/registry/generated/blocks.json";
import type {
  BlockIndexItem,
  BlockRegistryFile,
  BlockRegistryItem,
  FileTree,
} from "@/lib/blocks/types";

const registryItemCache = new Map<string, BlockRegistryItem | null>();

function getWebDir() {
  const cwd = process.cwd();
  if (cwd.endsWith(`${path.sep}apps${path.sep}web`)) return cwd;

  const monorepoWebDir = path.join(cwd, "apps/web");
  return monorepoWebDir;
}

function normalizeAliasTarget(target: string) {
  return target.replace(
    /^@(components|ui|hooks|lib)\/(.+)$/,
    (_, type, rest) => {
      if (type === "components") return `components/${rest}`;
      if (type === "ui") return `components/ui/${rest}`;
      if (type === "hooks") return `hooks/${rest}`;
      if (type === "lib") return `lib/${rest}`;
      return target;
    },
  );
}

function fixInstallImport(content: string) {
  return content
    .replaceAll("@workspace/ui/components/", "@/components/")
    .replaceAll("@workspace/ui/lib/", "@/lib/")
    .replaceAll("@/registry/components/", "@/components/")
    .replaceAll("@/registry/hooks/", "@/hooks/")
    .replaceAll("@/registry/lib/", "@/lib/");
}

async function readRegistryFile(
  file: BlockRegistryFile,
): Promise<BlockRegistryFile> {
  const sourcePath = path.join(getWebDir(), "registry", file.path);
  let content = await fs.readFile(sourcePath, "utf8");

  if (file.type !== "registry:page") {
    content = content.replaceAll("export default", "export");
  }

  return {
    ...file,
    target: normalizeAliasTarget(file.target),
    content: fixInstallImport(content),
  };
}

export function getAllBlocks(categories: string[] = []): BlockIndexItem[] {
  const blocks = blocksIndex as BlockIndexItem[];

  return blocks
    .filter(
      (block) =>
        categories.length === 0 ||
        block.categories.some((category) => categories.includes(category)),
    )
    .sort((a, b) => {
      const dateA = new Date(a.meta?.createdAt ?? 0).getTime();
      const dateB = new Date(b.meta?.createdAt ?? 0).getTime();
      return dateB - dateA;
    });
}

export async function getRegistryItem(
  name: string,
): Promise<BlockRegistryItem | null> {
  if (registryItemCache.has(name)) {
    return registryItemCache.get(name) ?? null;
  }

  const block = getAllBlocks().find((item) => item.name === name);
  if (!block?.files?.length) {
    registryItemCache.set(name, null);
    return null;
  }

  const item: BlockRegistryItem = {
    ...block,
    files: await Promise.all(block.files.map(readRegistryFile)),
  };

  registryItemCache.set(name, item);
  return item;
}

export function getAllBlockStaticParams() {
  return getAllBlocks().flatMap((block) =>
    block.categories.map((category) => ({ category, name: block.name })),
  );
}

export function getBlockCategoryHref(
  block: Pick<BlockIndexItem, "categories" | "name">,
) {
  return `/blocks/${block.categories[0]}/${block.name}`;
}

export function createFileTreeForRegistryItemFiles(
  files: Array<{ path: string; target?: string }>,
): FileTree[] {
  const root: FileTree[] = [];

  for (const file of files) {
    const filePath = file.target ?? file.path;
    const parts = filePath.split("/");
    let currentLevel = root;

    for (let index = 0; index < parts.length; index++) {
      const part = parts[index];
      if (!part) continue;

      const isFile = index === parts.length - 1;
      const existingNode = currentLevel.find((node) => node.name === part);

      if (existingNode) {
        if (isFile) {
          existingNode.path = filePath;
        } else {
          currentLevel = existingNode.children ?? [];
        }
        continue;
      }

      const newNode: FileTree = isFile
        ? { name: part, path: filePath }
        : { name: part, children: [] };

      currentLevel.push(newNode);

      if (!isFile) {
        currentLevel = newNode.children ?? [];
      }
    }
  }

  return root;
}
