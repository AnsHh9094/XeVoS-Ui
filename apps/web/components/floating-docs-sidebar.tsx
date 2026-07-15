/**
 * XeVoS UI — https://github.com/AnsHh9094/XeVoS-Ui
 * Copyright (c) 2026 Anand Ansh (AnsHh9094)
 * SPDX-License-Identifier: MIT
 * This notice must be retained in all copies or substantial portions (MIT License).
 */
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
