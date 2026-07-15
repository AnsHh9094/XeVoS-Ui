/**
 * XeVoS UI — https://github.com/AnsHh9094/XeVoS-Ui
 * Copyright (c) 2026 Anand Ansh (AnsHh9094)
 * SPDX-License-Identifier: MIT
 * This notice must be retained in all copies or substantial portions (MIT License).
 */
"use client"

import * as React from "react"
import type { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { CopyButton } from "@/components/copy-button"

export interface DocsCodePanelTab {
  id: string
  label: string
}

interface DocsCodePanelProps {
  icon: LucideIcon
  copyCode: string
  tabs?: DocsCodePanelTab[]
  activeTab?: string
  onTabChange?: (id: string) => void
  tabListAriaLabel?: string
  children: React.ReactNode
  className?: string
}

export function DocsCodePanel({
  icon: Icon,
  copyCode,
  tabs,
  activeTab,
  onTabChange,
  tabListAriaLabel = "Options",
  children,
  className,
}: DocsCodePanelProps) {
  const hasTabs = tabs && tabs.length > 0

  return (
    <div
      data-code-block
      data-line-numbers="false"
      className={cn(
        "relative w-full max-w-full overflow-hidden rounded-xl border border-border bg-zinc-100 text-sm dark:bg-zinc-900/50",
        className
      )}
    >
      <div className="flex items-center justify-between gap-3 border-b border-border/50 px-4 py-2">
        <div className="flex min-w-0 flex-1 items-center gap-2 overflow-x-auto no-scrollbar">
          <Icon className="size-3.5 shrink-0 text-muted-foreground" aria-hidden />

          {hasTabs && (
            <div
              role="tablist"
              aria-label={tabListAriaLabel}
              className="flex items-center gap-1"
            >
              {tabs.map((tab) => {
                const isSelected = activeTab === tab.id
                return (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    onClick={() => onTabChange?.(tab.id)}
                    className={cn(
                      "shrink-0 rounded-md px-2.5 py-1 text-[13px] font-medium outline-none transition-colors",
                      "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1",
                      isSelected
                        ? "bg-zinc-200/80 text-foreground dark:bg-zinc-800/80"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {tab.label}
                  </button>
                )
              })}
            </div>
          )}
        </div>

        <CopyButton code={copyCode} absolute={false} className="shrink-0 p-1.5" />
      </div>

      <div className="relative">{children}</div>
    </div>
  )
} 
