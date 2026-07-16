/**
 * XeVoS UI — https://github.com/AnsHh9094/XeVoS-Ui
 * Copyright (c) 2026 Anand Ansh (AnsHh9094)
 * SPDX-License-Identifier: MIT
 * This notice must be retained in all copies or substantial portions (MIT License).
 */
import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { absoluteUrl } from "@/lib/site"

const fontInter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Components Documentation",
  description: "Browse the complete collection of Xevos UI UI components. Free, open-source React components with copy-paste code, Tailwind CSS styling, and Framer Motion animations by ansh anand.",
  openGraph: {
    title: "UI Components Documentation | Xevos UI by ansh anand",
    description: "Browse all React UI components. Copy-paste ready code with Tailwind CSS and Framer Motion.",
  },
  alternates: {
    canonical: absoluteUrl("/docs"),
  },
}

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode
}): React.JSX.Element {
  return (
    <div data-route-docs className={`${fontInter.variable} min-h-svh flex flex-col bg-background`}>
      <div className="flex-1 flex overflow-hidden">
        {/* Main content - Full screen split view handled by pages */}
        <main className="flex-1 w-full h-full">
          {children}
        </main>
      </div>
    </div>
  )
}
