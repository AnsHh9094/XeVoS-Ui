/**
 * XeVoS UI — https://github.com/AnsHh9094/XeVoS-Ui
 * Copyright (c) 2026 Anand Ansh (AnsHh9094)
 * SPDX-License-Identifier: MIT
 * This notice must be retained in all copies or substantial portions (MIT License).
 */
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
