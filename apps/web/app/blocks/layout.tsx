/**
 * XeVoS UI — https://github.com/AnsHh9094/XeVoS-Ui
 * Copyright (c) 2026 Anand Ansh (AnsHh9094)
 * SPDX-License-Identifier: MIT
 * This notice must be retained in all copies or substantial portions (MIT License).
 */
import type { Metadata } from "next"

import { BlocksHeading } from "@/components/blocks/blocks-heading"
import { SiteHeader } from "@/components/site-header"

export const metadata: Metadata = {
  title: "Blocks",
  description: "Production-ready Xevos UI blocks for React applications.",
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
      <div className="pointer-events-none fixed left-[max(1rem,calc((100vw-1440px)/2))] top-0 z-[60] hidden h-14 w-px bg-line md:block" />
      <div className="pointer-events-none fixed right-[max(1rem,calc((100vw-1440px)/2))] top-0 z-[60] hidden h-14 w-px bg-line md:block" />
      <div className="pointer-events-none fixed left-[max(1rem,calc((100vw-1440px)/2))] top-14 z-[61] hidden size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-[2px] border border-line bg-white md:block dark:bg-[#09090B]" />
      <div className="pointer-events-none fixed right-[max(1rem,calc((100vw-1440px)/2))] top-14 z-[61] hidden size-2.5 translate-x-1/2 -translate-y-1/2 rounded-[2px] border border-line bg-white md:block dark:bg-[#09090B]" />
      <SiteHeader />
      <main className="overflow-x-clip pt-14">
        <div
          data-blocks-layout
          className="mx-0 min-h-[calc(100vh-3.5rem)] overflow-x-clip bg-background md:mx-[max(1rem,calc((100vw-1440px)/2))] md:border-x md:border-line"
        >
          <div className="mx-auto w-full max-w-[1360px]">
            <BlocksHeading
              title="Composable blocks for real product screens."
              description="Browse polished sections, preview them across themes, inspect the source, and drop them into your app."
            />
          </div>
          <div className="relative overflow-x-clip">{children}</div>
        </div>
      </main>
    </div>
  )
} 
