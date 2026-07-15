/**
 * XeVoS UI — https://github.com/AnsHh9094/XeVoS-Ui
 * Copyright (c) 2026 Anand Ansh (AnsHh9094)
 * SPDX-License-Identifier: MIT
 * This notice must be retained in all copies or substantial portions (MIT License).
 */
import Link from "next/link"
import type { ReactNode } from "react"
import type { LucideIcon } from "lucide-react"
import { CodeXml, Info } from "lucide-react"
import { cn } from "@/lib/utils"

interface DocsFooterNoteProps {
  icon: LucideIcon
  title?: string
  children: ReactNode
  className?: string
}

function DocsFooterNote({ icon: Icon, title, children, className }: DocsFooterNoteProps) {
  return (
    <div
      className={cn(
        "flex gap-3.5 rounded-xl border border-border bg-zinc-100 px-4 py-3.5 dark:bg-zinc-900/50",
        className
      )}
    >
      <div className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-lg bg-zinc-200/70 text-zinc-600 dark:bg-zinc-800/70 dark:text-zinc-400">
        <Icon className="size-3.5" aria-hidden />
      </div>
      <div className="min-w-0 space-y-1">
        {title && (
          <p className="text-[13px] font-medium text-zinc-900 dark:text-zinc-100">{title}</p>
        )}
        <div className="text-[13px] leading-relaxed text-muted-foreground">{children}</div>
      </div>
    </div>
  )
}

export function DocsFooterSection() {
  return (
    <div className="flex flex-col gap-3">
      <DocsFooterNote icon={CodeXml} title="View source">
        Click the{" "}
        <CodeXml className="inline-block size-3.5 align-[-2px] text-zinc-700 dark:text-zinc-300" />{" "}
        icon in the preview panel to browse source for each variant.
      </DocsFooterNote>

      <DocsFooterNote icon={Info} title="Keep in mind">
        This component is inspired by various open-source projects and patterns. Please verify
        licenses and implementation details before using in production.
      </DocsFooterNote>

      <div className="rounded-xl border border-border/50 bg-gradient-to-br from-zinc-50 to-white px-4 py-4 dark:from-zinc-900/60 dark:to-zinc-900/30 sm:flex sm:flex-row sm:items-center sm:justify-between sm:gap-4">
        <div className="space-y-0.5">
          <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 tracking-tight">
            Need a custom component?
          </p>
          <p className="text-[13px] text-muted-foreground leading-relaxed">
            I build bespoke UI components &amp; websites tailored to your brand.
          </p>
        </div>
        <Link
          href="https://x.com/AnsHh9094"


          className="mt-3 inline-flex w-fit items-center gap-2 rounded-lg border border-border bg-white px-3 py-1.5 text-[13px] font-medium text-zinc-900 transition-colors hover:bg-zinc-50 active:scale-[0.98] sm:mt-0 sm:shrink-0 dark:bg-zinc-950 dark:text-zinc-100 dark:hover:bg-zinc-900"
        >
          <svg role="img" viewBox="0 0 24 24" fill="currentColor" className="size-3.5" aria-hidden>
            <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
          </svg>
          <span>DM me on X</span>
        </Link>
      </div>
    </div>
  )
} 
