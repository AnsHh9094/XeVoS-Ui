export type RegistryFileType =
  | "registry:component"
  | "registry:page"
  | "registry:lib"
  | "registry:hook"
  | "registry:style"

export interface BlockRegistryFile {
  path: string
  target: string
  type: RegistryFileType
  content?: string
}

export interface BlockRegistryItem {
  name: string
  title: string
  description: string
  type: "registry:block"
  categories: string[]
  files: BlockRegistryFile[]
  dependencies?: string[]
  registryDependencies?: string[]
  meta?: {
    createdAt?: string
    iframeHeight?: number
    previewClassName?: string
  }
}

export interface BlockIndexItem {
  name: string
  title: string
  description: string
  categories: string[]
  meta?: BlockRegistryItem["meta"]
}

export interface HighlightedBlockFile extends BlockRegistryFile {
  highlightedContent: string
}
