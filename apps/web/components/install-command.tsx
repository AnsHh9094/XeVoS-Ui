"use client"

import * as React from "react"

import { CopyButton } from "@/components/copy-button"

const PACKAGE_MANAGERS = ["npm", "pnpm", "yarn", "bun"] as const
type PackageManager = (typeof PACKAGE_MANAGERS)[number]

const COMMANDS: Record<PackageManager, string> = {
  pnpm: "pnpm dlx shadcn@latest add",
  npm: "npx shadcn@latest add",
  yarn: "yarn dlx shadcn@latest add",
  bun: "bunx shadcn@latest add",
}


interface InstallCommandProps {
  component: string
}


export function InstallCommand({ component }: InstallCommandProps) {
  const [selected, setSelected] = React.useState<PackageManager>("pnpm")

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
  const componentUrl = `${baseUrl}/r/${component}.json`
  const command = `${COMMANDS[selected]} "${componentUrl}"`

  return (
    <div className="w-full max-w-full">
      <div className="relative rounded-xl border border-border/60 bg-white dark:bg-white/[0.02] font-mono text-sm leading-relaxed text-foreground overflow-hidden">
        <div className="flex items-center justify-between border-b border-border/50 bg-secondary/30 px-4 py-2">
          <div className="flex space-x-4 text-xs font-medium text-muted-foreground">
             {PACKAGE_MANAGERS.map((pm) => (
              <button
                key={pm}
                onClick={() => setSelected(pm)}
                className={`transition-colors hover:text-foreground ${
                  selected === pm ? "text-primary font-semibold" : ""
                }`}
              >
                {pm}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <div className="text-[10px] text-muted-foreground/70 uppercase tracking-widest">
              Installation
            </div>
            <CopyButton code={command} />
          </div>
        </div>

        <div className="relative flex items-center p-4">
          <div className="flex-1 overflow-x-auto whitespace-nowrap scrollbar-none">
            <span className="mr-2 text-muted-foreground/40">$</span>
            <span className="text-foreground">{COMMANDS[selected]}</span>
            {" "}
            <span className="text-muted-foreground">"{componentUrl}"</span>
          </div>
        </div>
      </div>
    </div>
  )
}
