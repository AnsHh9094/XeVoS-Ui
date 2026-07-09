"use client"

import { DocsSidebarProvider } from "@/components/docs-sidebar-context"
import { DocsSidebarTrigger } from "@/components/docs-sidebar-trigger"
import { FloatingDocsSidebarPanel } from "@/components/floating-docs-sidebar-panel"

export function FloatingDocsSidebar() {
  return (
    <DocsSidebarProvider>
      <DocsSidebarTrigger />
      <FloatingDocsSidebarPanel />
    </DocsSidebarProvider>
  )
}
