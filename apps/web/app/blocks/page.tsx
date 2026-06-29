import type { Metadata } from "next"
import { Fragment } from "react"

import { BlockDisplay } from "@/components/blocks/block-display"
import { BlocksNav } from "@/components/blocks/blocks-nav"
import { getAllBlocks } from "@/lib/blocks/registry"
import type { BlockRegistryItem } from "@/lib/blocks/types"

export const dynamic = "force-static"

export const metadata: Metadata = {
  title: "Blocks | Componentry",
  description:
    "Production-ready Componentry blocks with live previews, source code, themes, and shadcn install commands.",
}

export default function BlocksPage() {
  const blocks = getAllBlocks() as BlockRegistryItem[]

  return (
    <>
      <BlocksNav />

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
