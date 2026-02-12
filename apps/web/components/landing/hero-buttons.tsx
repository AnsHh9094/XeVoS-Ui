"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Terminal } from "lucide-react"
import { CopyButton } from "@/components/copy-button"

export function HeroButtons() {
    const installCommand = 'npx shadcn@latest add "http://localhost:3000/r/magnetic-dock.json"'

    return (
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6 pb-2">
            <motion.div whileTap={{ scale: 0.99 }}>
                <div className="group relative inline-flex h-12 items-center justify-center gap-3 overflow-hidden rounded-2xl border border-zinc-200/60 bg-white/80 px-4 text-sm font-semibold text-zinc-900 backdrop-blur-xl shadow-lg shadow-zinc-200/20 transition-all duration-300 dark:border-zinc-800/60 dark:bg-zinc-900/90 dark:text-zinc-100 dark:shadow-black/20">
                    <Terminal className="h-4 w-4 text-zinc-500 dark:text-zinc-400" />
                    <span className="font-mono text-sm tracking-tight text-zinc-600 dark:text-zinc-400 max-w-[180px] sm:max-w-[260px] whitespace-nowrap overflow-hidden text-ellipsis">
                        {installCommand}
                    </span>
                    <CopyButton code={installCommand} absolute={false} className="p-1.5" />
                </div>
            </motion.div>

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="relative z-10">
                <Link
                    href="/docs"
                    className="group relative inline-flex h-12 items-center justify-center gap-2 overflow-hidden rounded-2xl bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/30 transition-all duration-300 hover:bg-primary/90 hover:shadow-primary/40"
                >
                    <span>Quick Start</span>
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
            </motion.div>
        </div>
    )
}
