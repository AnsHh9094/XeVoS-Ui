"use client"

import React from "react"
import { motion } from "framer-motion"
import { SiteHeader } from "@/components/site-header"

export default function BlocksComingSoon() {
  return (
    <div className="relative flex min-h-screen w-full flex-col bg-white dark:bg-[#111] text-foreground">
      <SiteHeader />

      <main className="flex flex-1 flex-col items-center justify-center px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl sm:text-7xl md:text-8xl font-bold tracking-tighter text-zinc-900 dark:text-zinc-100"
        >
          Coming Soon
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="mt-4 max-w-md text-sm sm:text-base text-zinc-500 dark:text-zinc-400"
        >
          Pre-built blocks. Infinite possibilities.
        </motion.p>
      </main>
    </div>
  )
}