/**
 * XeVoS UI — https://github.com/AnsHh9094/XeVoS-Ui
 * Copyright (c) 2026 Anand Ansh (AnsHh9094)
 * SPDX-License-Identifier: MIT
 * This notice must be retained in all copies or substantial portions (MIT License).
 */
import { cn } from "@/lib/utils"

export interface DocsPropItem {
  name: string
  type: string
  default?: string
  description: string
}

interface DocsPropsTableProps {
  props: DocsPropItem[]
  className?: string
}

export function DocsPropsTable({ props, className }: DocsPropsTableProps) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border border-border bg-zinc-100 dark:bg-zinc-900/50",
        className
      )}
    >
      <div className="w-full overflow-x-auto">
        <table className="w-full min-w-[520px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-border/50">
              <th className="px-4 py-3 text-left text-[13px] font-medium text-muted-foreground">
                Property
              </th>
              <th className="px-4 py-3 text-left text-[13px] font-medium text-muted-foreground w-[28%]">
                Type
              </th>
              <th className="px-4 py-3 text-left text-[13px] font-medium text-muted-foreground w-[22%]">
                Default
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/50">
            {props.map((prop) => (
              <tr
                key={prop.name}
                className="transition-colors hover:bg-zinc-200/35 dark:hover:bg-zinc-800/35"
              >
                <td className="px-4 py-4 align-top">
                  <div className="space-y-1.5">
                    <code className="font-mono text-[13px] font-semibold text-zinc-900 dark:text-zinc-100">
                      {prop.name}
                    </code>
                    {prop.description && (
                      <p className="max-w-md text-[13px] leading-relaxed text-muted-foreground">
                        {prop.description}
                      </p>
                    )}
                  </div>
                </td>
                <td className="px-4 py-4 align-top">
                  <code className="inline-block rounded-md bg-zinc-200/70 px-2 py-1 font-mono text-[12px] text-zinc-700 dark:bg-zinc-800/70 dark:text-zinc-300">
                    {prop.type}
                  </code>
                </td>
                <td className="px-4 py-4 align-top">
                  {prop.default ? (
                    <code className="inline-block rounded-md bg-zinc-200/40 px-2 py-1 font-mono text-[12px] text-muted-foreground dark:bg-zinc-800/40">
                      {prop.default}
                    </code>
                  ) : (
                    <span className="text-[13px] text-muted-foreground/35">—</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
} 
