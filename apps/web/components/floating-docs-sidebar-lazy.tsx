"use client"

import dynamic from "next/dynamic"
import { DocsSidebarProvider } from "@/components/docs-sidebar-context"
import { DocsSidebarTrigger } from "@/components/docs-sidebar-trigger"

const FloatingDocsSidebarPanel = dynamic(
  () =>
    import("@/components/floating-docs-sidebar-panel").then(
      (mod) => mod.FloatingDocsSidebarPanel
    ),
  { ssr: false }
)

export function FloatingDocsSidebarLazy() {
  return (
    <DocsSidebarProvider>
      <DocsSidebarTrigger />
      <FloatingDocsSidebarPanel />
    </DocsSidebarProvider>
  )
}
