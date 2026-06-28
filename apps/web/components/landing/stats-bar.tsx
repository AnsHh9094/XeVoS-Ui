"use client"

import { motion } from "framer-motion"

const stats = [
  { label: "Components", value: "40+" },
  { label: "Open Source", value: "MIT" },
  { label: "TypeScript", value: "First" },
  { label: "Zero Config", value: "Drop-in" },
]

export function StatsBar() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
      className="mt-12 w-full max-w-2xl mx-auto"
    >
      <div className="relative flex items-center justify-center gap-0 rounded-2xl border border-zinc-200/60 dark:border-zinc-800/60 bg-white/60 dark:bg-zinc-900/30 backdrop-blur-sm px-2 py-3 shadow-sm">
        {stats.map((stat, i) => (
          <div key={stat.label} className="flex items-center">
            <div className="flex flex-col items-center px-5 sm:px-8 gap-0.5">
              <span className="text-sm font-bold text-zinc-900 dark:text-zinc-100 tabular-nums tracking-tight">
                {stat.value}
              </span>
              <span className="text-[11px] font-medium text-zinc-500 dark:text-zinc-500 tracking-wide uppercase">
                {stat.label}
              </span>
            </div>
            {i < stats.length - 1 && (
              <div className="h-8 w-px bg-zinc-200 dark:bg-zinc-800 shrink-0" />
            )}
          </div>
        ))}
      </div>
    </motion.div>
  )
}
