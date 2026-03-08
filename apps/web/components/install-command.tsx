"use client"

import * as React from "react"
import { Terminal } from "lucide-react"
import { cn } from "@/lib/utils"

import { CopyButton } from "@/components/copy-button"

const PACKAGE_MANAGERS = ["npm", "pnpm", "yarn", "bun"] as const
type PackageManager = (typeof PACKAGE_MANAGERS)[number]

const COMMANDS: Record<PackageManager, string> = {
  pnpm: "pnpm dlx shadcn@latest add",
  npm: "npx shadcn@latest add",
  yarn: "yarn dlx shadcn@latest add",
  bun: "bunx --bun shadcn@latest add",
}

interface InstallCommandProps {
  component: string
}


export function InstallCommand({ component }: InstallCommandProps) {
  const [selected, setSelected] = React.useState<PackageManager>("pnpm")

  const registryNamespace = process.env.NEXT_PUBLIC_REGISTRY_NAMESPACE || "@componentry"
  const componentRef = component.startsWith("@")
    ? component
    : `${registryNamespace}/${component}`
  const command = `${COMMANDS[selected]} ${componentRef}`

  return (
    <div className="w-full max-w-full">
      <div className="relative rounded-xl border border-border overflow-hidden bg-zinc-100 dark:bg-zinc-900/50 font-mono text-sm leading-relaxed text-foreground">
        <style>{`
          /* Hide scrollbars for the tab header */
          .no-scrollbar::-webkit-scrollbar {
            display: none;
          }
          .no-scrollbar {
            -ms-overflow-style: none;  /* IE and Edge */
            scrollbar-width: none;  /* Firefox */
          }
        `}</style>

        {/* Tab Header */}
        <div className="flex items-center border-b border-border/40 bg-zinc-50/50 dark:bg-zinc-900/20 overflow-x-auto no-scrollbar">
          {PACKAGE_MANAGERS.map((pm) => (
            <button
              key={pm}
              onClick={() => setSelected(pm)}
              className={cn(
                "flex items-center gap-2 border-r border-border/40 px-4 py-2.5 text-xs font-medium transition-all min-w-fit outline-none hover:bg-zinc-100/50 dark:hover:bg-zinc-800/50",
                selected === pm
                  ? "bg-transparent text-zinc-950 dark:text-zinc-50 font-semibold"
                  : "bg-zinc-100/30 dark:bg-zinc-800/10 text-muted-foreground/80 hover:text-foreground"
              )}
            >
              <Terminal className={cn("h-3.5 w-3.5", selected === pm ? "text-zinc-950 dark:text-zinc-50" : "text-muted-foreground/70")} />
              <span>{pm}</span>
            </button>
          ))}
          
          <div className="flex-1" />
        </div>

        <div className="relative flex items-center p-4">
          <div className="flex-1 overflow-x-auto whitespace-nowrap no-scrollbar pr-12">
            <span className="mr-2 text-muted-foreground/40 select-none">$</span>
            <span className="text-zinc-950 dark:text-zinc-100">{COMMANDS[selected]}</span>
            {" "}
            <span className="text-muted-foreground">{componentRef}</span>
          </div>
          
          <div className="absolute right-0 top-0 bottom-0 pl-16 pr-4 flex items-center bg-gradient-to-l from-zinc-100 via-zinc-100/90 to-transparent dark:from-zinc-900 dark:via-zinc-900/90 dark:to-transparent">
            <CopyButton code={command} />
          </div>
        </div>
      </div>
    </div>
  )
}
