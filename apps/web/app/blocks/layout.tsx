import type { Metadata } from "next"

import { BlocksHeading } from "@/components/blocks/blocks-heading"
import { SiteHeader } from "@/components/site-header"

export const metadata: Metadata = {
  title: "Blocks",
  description: "Production-ready Componentry blocks for React applications.",
  robots: {
    index: true,
    follow: true,
  },
}

export default function BlocksLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main className="pt-14">
        <div
          data-blocks-layout
          className="container mx-auto min-h-[calc(100vh-3.5rem)] border-x border-line bg-background"
        >
          <BlocksHeading
            title="Beautifully designed, production-ready."
            description="Browse, resize, theme, inspect source, copy install commands, and open blocks in isolated previews."
          />
          <div className="flex h-4" />
          <div className="screen-line-bottom flex h-px" />
          {children}
        </div>
      </main>
    </div>
  )
}
