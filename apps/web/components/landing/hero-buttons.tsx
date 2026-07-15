/**
 * XeVoS UI — https://github.com/AnsHh9094/XeVoS-Ui
 * Copyright (c) 2026 Anand Ansh (AnsHh9094)
 * SPDX-License-Identifier: MIT
 * This notice must be retained in all copies or substantial portions (MIT License).
 */
"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Terminal } from "lucide-react"
import { CopyButton } from "@/components/copy-button"

export function HeroButtons() {
    const installCommand = "npx shadcn@latest add @xevos-ui/magnetic-dock"

    return (
        <div className="flex w-full min-w-0 flex-col items-stretch justify-start gap-4 pt-6 pb-2 sm:flex-row sm:items-start">
            <motion.div whileTap={{ scale: 0.98 }} className="min-w-0 w-full sm:w-auto">
                <div className="group relative flex h-12 w-full min-w-0 items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-b from-[#EAEAEA]/90 to-[#D8D8D8]/90 px-3 text-sm font-semibold text-zinc-900 backdrop-blur-xl transition-[box-shadow,width,gap,padding] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] shadow-[0_1px_1px_0_rgba(0,0,0,0.06),0_4px_8px_-2px_rgba(0,0,0,0.10),0_0_0_1px_rgba(0,0,0,0.15),inset_0_1.5px_0_0_rgba(255,255,255,0.9),inset_0_-1px_0_0_rgba(0,0,0,0.04)] hover:shadow-[0_2px_2px_0_rgba(0,0,0,0.06),0_10px_20px_-6px_rgba(0,0,0,0.14),0_0_0_1px_rgba(0,0,0,0.15),inset_0_1.5px_0_0_rgba(255,255,255,0.9),inset_0_-1px_0_0_rgba(0,0,0,0.04)] dark:bg-gradient-to-b dark:from-zinc-700/90 dark:to-zinc-800/90 dark:text-zinc-100 dark:shadow-[0_1px_1px_0_rgba(0,0,0,0.3),0_4px_8px_-2px_rgba(0,0,0,0.4),0_0_0_1px_rgba(255,255,255,0.08),inset_0_1.5px_0_0_rgba(255,255,255,0.06)] sm:inline-flex sm:w-auto sm:gap-3 sm:px-4 sm:hover:px-6">
                    <Terminal className="h-4 w-4 text-zinc-600 dark:text-zinc-400" />
                    <span className="min-w-0 flex-1 truncate font-mono text-xs tracking-tight text-zinc-700 dark:text-zinc-400 sm:text-sm">
                        {installCommand}
                    </span>
                    <CopyButton code={installCommand} absolute={false} className="p-1.5" />
                </div>
            </motion.div>

            <motion.div whileTap={{ scale: 0.98 }} className="relative z-10 w-full sm:w-fit">
                <Link
                    href="/docs"
                    className="rounded-xl transition-[box-shadow,background-color,gap] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] h-12 px-5 font-medium flex whitespace-nowrap gap-5 items-center justify-between cursor-pointer bg-gradient-to-b from-zinc-800 to-zinc-900 text-zinc-100 hover:from-zinc-700 hover:to-zinc-800 shadow-[0_1px_1px_0_rgba(0,0,0,0.2),0_4px_8px_-2px_rgba(0,0,0,0.3),0_0_0_1px_rgba(255,255,255,0.06),inset_0_1.5px_0_0_rgba(255,255,255,0.08)] hover:shadow-[0_2px_2px_0_rgba(0,0,0,0.3),0_10px_20px_-6px_rgba(0,0,0,0.4),0_0_0_1px_rgba(255,255,255,0.06),inset_0_1.5px_0_0_rgba(255,255,255,0.08)] dark:bg-gradient-to-b dark:from-white dark:to-zinc-100 dark:text-zinc-900 dark:hover:from-zinc-50 dark:hover:to-zinc-200 dark:shadow-[0_1px_1px_0_rgba(0,0,0,0.06),0_4px_8px_-2px_rgba(0,0,0,0.10),0_0_0_1px_rgba(0,0,0,0.08),inset_0_1.5px_0_0_rgba(255,255,255,1),inset_0_-1px_0_0_rgba(0,0,0,0.03)] dark:hover:shadow-[0_2px_2px_0_rgba(0,0,0,0.06),0_10px_20px_-6px_rgba(0,0,0,0.14),0_0_0_1px_rgba(0,0,0,0.08),inset_0_1.5px_0_0_rgba(255,255,255,1),inset_0_-1px_0_0_rgba(0,0,0,0.03)] w-full sm:w-fit"
                >
                    <span className="text-sm font-medium">Documentation</span>
                    <ArrowRight className="size-3.5" />
                </Link>
            </motion.div>
        </div>
    )
}
