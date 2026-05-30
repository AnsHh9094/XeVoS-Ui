"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Terminal } from "lucide-react"
import { CopyButton } from "@/components/copy-button"

export function HeroButtons() {
    const installCommand = "npx shadcn@latest add @componentry/magnetic-dock"

    return (
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6 pb-2">
            <motion.div whileTap={{ scale: 0.98 }}>
                <div className="group relative inline-flex h-12 items-center justify-center gap-3 overflow-hidden rounded-xl bg-[#E3E3E3]/80 px-4 hover:px-6 text-sm font-semibold text-zinc-900 backdrop-blur-xl transition-all duration-300 shadow-[0_2px_4px_0_rgba(0,0,0,0.10),0_0_0_1px_rgba(0,0,0,0.16),inset_0_1px_0_0_rgba(255,255,255,1)] hover:shadow-[0_4px_8px_0_rgba(0,0,0,0.12),0_0_0_1px_rgba(0,0,0,0.16),inset_0_1px_0_0_rgba(255,255,255,1)] dark:bg-zinc-800/80 dark:text-zinc-100 dark:shadow-[0_2px_4px_0_rgba(0,0,0,0.4),0_0_0_1px_rgba(255,255,255,0.1)]">
                    <Terminal className="h-4 w-4 text-zinc-600 dark:text-zinc-400" />
                    <span className="font-mono text-sm tracking-tight text-zinc-700 dark:text-zinc-400 max-w-[180px] sm:max-w-[260px] whitespace-nowrap overflow-hidden text-ellipsis">
                        {installCommand}
                    </span>
                    <CopyButton code={installCommand} absolute={false} className="p-1.5" />
                </div>
            </motion.div>

            <motion.div whileTap={{ scale: 0.98 }} className="relative z-10 w-full sm:w-fit">
                <Link
                    href="/docs"
                    className="rounded-xl transition-colors h-10 px-4 font-medium flex whitespace-nowrap gap-5 items-center justify-between cursor-pointer bg-white text-zinc-900 hover:bg-zinc-50 shadow-[0_1.5px_2px_0_rgba(0,0,0,0.25),0_0_0_1px_rgba(255,255,255,0.15),0_-1px_0_0_rgba(255,255,255,0.5)] dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100 w-full sm:w-fit"
                >
                    <span className="text-sm font-medium">Documentation</span>
                    <ArrowRight className="size-3.5" />
                </Link>
            </motion.div>
        </div>
    )
}
