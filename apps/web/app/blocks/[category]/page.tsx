import type { Metadata } from "next"
import { Fragment } from "react"
import { notFound } from "next/navigation"

import { BlockDisplay } from "@/components/blocks/block-display"
import { BlocksNav } from "@/components/blocks/blocks-nav"
import { getAllBlocks } from "@/lib/blocks/registry"
import type { BlockRegistryItem } from "@/lib/blocks/types"
import categories from "@/registry/generated/block-categories.json"

export const dynamic = "force-static"
export const dynamicParams = false

export function generateStaticParams() {
  return categories.map((category) => ({ category: category.name }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>
}): Promise<Metadata> {
  const { category } = await params
  const item = categories.find((candidate) => candidate.name === category)

  if (!item) return {}

  return {
    title: `${item.title} Blocks | Componentry`,
    description: item.description,
  }
}

export default async function BlocksCategoryPage({
  params,
}: {
  params: Promise<{ category: string }>
}) {
  const { category } = await params
  const item = categories.find((candidate) => candidate.name === category)

  if (!item) notFound()

  const blocks = getAllBlocks([category]) as BlockRegistryItem[]

  return (
    <>
      <BlocksNav active={category} />

      <div>
        <div className="stripe-divider" />
      </div>

      {blocks.map((block) => (
        <Fragment key={block.name}>
          <BlockDisplay item={block} />
          <BlockSeparator />
        </Fragment>
      ))}
    </>
  )
}

function BlockSeparator() {
  return (
    <div>
      <div className="stripe-divider" />
    </div>
  )
}
