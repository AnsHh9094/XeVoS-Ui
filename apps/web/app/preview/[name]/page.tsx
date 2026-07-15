/**
 * XeVoS UI — https://github.com/AnsHh9094/XeVoS-Ui
 * Copyright (c) 2026 Anand Ansh (AnsHh9094)
 * SPDX-License-Identifier: MIT
 * This notice must be retained in all copies or substantial portions (MIT License).
 */
import { notFound } from "next/navigation"

import { PreviewThemeProvider } from "@/components/blocks/preview-theme-provider"
import type { BlockRegistryItem } from "@/lib/blocks/types"
import { cn } from "@/lib/utils"
import { blockIndex } from "@/registry/generated/block-index"

export const dynamic = "force-static"
export const dynamicParams = false

export function generateStaticParams() {
  return Object.keys(blockIndex).map((name) => ({ name }))
}

export default async function BlockPreviewPage({
  params,
  searchParams,
}: {
  params: Promise<{ name: string }>
  searchParams: Promise<{ theme?: string }>
}) {
  const { name } = await params
  const { theme } = await searchParams
  const item = blockIndex[name as keyof typeof blockIndex] as
    | (BlockRegistryItem & { component: React.ComponentType })
    | undefined

  if (!item?.component) notFound()

  const Component = item.component

  return (
    <PreviewThemeProvider theme={theme}>
      <main
        className={cn(
          "min-h-screen bg-background text-foreground",
          item.meta?.previewClassName
        )}
      >
        <Component />
      </main>
    </PreviewThemeProvider>
  )
} 
