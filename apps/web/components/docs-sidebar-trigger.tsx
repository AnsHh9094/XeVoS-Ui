/**
 * XeVoS UI — https://github.com/AnsHh9094/XeVoS-Ui
 * Copyright (c) 2026 Anand Ansh (AnsHh9094)
 * SPDX-License-Identifier: MIT
 * This notice must be retained in all copies or substantial portions (MIT License).
 */
"use client"

import { cn } from "@/lib/utils"
import { DocsSidebarIcon } from "@/components/docs-sidebar-icon"
import { useDocsSidebar } from "@/components/docs-sidebar-context"

export function DocsSidebarTrigger() {
  const { isOpen, setIsOpen, open } = useDocsSidebar()

  return (
    <div className="shrink-0" onMouseEnter={open}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={cn(
          "flex h-8 w-8 shrink-0 items-center justify-center rounded text-zinc-500 transition-[color,opacity,transform] duration-200 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100",
          isOpen ? "pointer-events-none scale-90 opacity-0" : "opacity-100"
        )}
        aria-label="Open Navigation"
        aria-expanded={isOpen}
      >
        <DocsSidebarIcon
          className="size-4"
          dividerClassName="bg-[#f3f4f6] dark:bg-[#080808]"
        />
      </button>
    </div>
  )
} 
