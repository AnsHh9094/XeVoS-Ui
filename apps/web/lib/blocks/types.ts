export type RegistryFileType =
  | "registry:component"
  | "registry:page"
  | "registry:lib"
  | "registry:hook"
  | "registry:style"
  | "registry:ui";

export interface BlockCategoryItem {
  name: string;
  title: string;
  description: string;
}

export interface BlockRegistryFile {
  path: string;
  target: string;
  type: RegistryFileType;
  content?: string;
}

export interface BlockRegistryItem {
  name: string;
  title: string;
  description: string;
  type: "registry:block";
  categories: string[];
  files: BlockRegistryFile[];
  dependencies?: string[];
  registryDependencies?: string[];
  meta?: {
    createdAt?: string;
    iframeHeight?: number;
    previewClassName?: string;
  };
}

export interface BlockIndexItem {
  name: string;
  title: string;
  description: string;
  type: "registry:block";
  categories: string[];
  files?: Omit<BlockRegistryFile, "content">[];
  dependencies?: string[];
  registryDependencies?: string[];
  meta?: BlockRegistryItem["meta"];
}

export interface HighlightedBlockFile extends BlockRegistryFile {
  highlightedContent: string;
}

export type FileTree = {
  name: string;
  path?: string;
  children?: FileTree[];
};
