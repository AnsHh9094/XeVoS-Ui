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
    <div className="min-h-screen overflow-x-clip bg-background text-foreground">
      <div className="pointer-events-none fixed left-4 top-0 z-[60] h-14 w-px bg-line md:left-20" />
      <div className="pointer-events-none fixed right-4 top-0 z-[60] h-14 w-px bg-line md:right-20" />
      <div className="pointer-events-none fixed left-4 top-14 z-[61] size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-[2px] border border-line bg-white md:left-20 dark:bg-[#09090B]" />
      <div className="pointer-events-none fixed right-4 top-14 z-[61] size-2.5 translate-x-1/2 -translate-y-1/2 rounded-[2px] border border-line bg-white md:right-20 dark:bg-[#09090B]" />
      <SiteHeader />
      <main className="overflow-x-clip pt-14">
        <div
          data-blocks-layout
          className="mx-4 min-h-[calc(100vh-3.5rem)] overflow-x-clip border-x border-line bg-background md:mx-20"
        >
          <BlocksHeading
            title="Beautifully designed, production-ready."
          />
          <div className="relative overflow-x-clip">{children}</div>
        </div>
      </main>
    </div>
  )
}
