"use client"

import dynamic from "next/dynamic"

const FloatingDocsSidebar = dynamic(
  () => import("@/components/floating-docs-sidebar").then((mod) => mod.FloatingDocsSidebar),
  { ssr: false }
)

export function FloatingDocsSidebarLazy() {
  return <FloatingDocsSidebar />
}
