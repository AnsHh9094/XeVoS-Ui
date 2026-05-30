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

      <div className="flex flex-col gap-3 rounded-xl border border-border bg-zinc-100 px-4 py-3.5 dark:bg-zinc-900/50 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[13px] font-medium text-zinc-700 dark:text-zinc-300">
          Have any questions?
        </p>
        <Link
          href="https://x.com/harshjdhv"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex w-fit items-center gap-2 rounded-lg border border-border bg-white px-3 py-1.5 text-[13px] font-medium text-zinc-900 transition-colors hover:bg-zinc-50 active:scale-[0.98] dark:bg-zinc-950 dark:text-zinc-100 dark:hover:bg-zinc-900"
        >
          <span>Contact on</span>
          <svg role="img" viewBox="0 0 24 24" fill="currentColor" className="size-3" aria-hidden>
            <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
          </svg>
          <span>@harshjdhv</span>
        </Link>
      </div>
    </div>
  )
}
