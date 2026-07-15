/**
 * XeVoS UI — https://github.com/AnsHh9094/XeVoS-Ui
 * Copyright (c) 2026 Anand Ansh (AnsHh9094)
 * SPDX-License-Identifier: MIT
 * This notice must be retained in all copies or substantial portions (MIT License).
 */
"use client"

import React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Sparkles } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { Footer } from "@/components/footer"
// AnimatedGradient removed — GhostCursor handles the background

export default function Home() {
  return (
    <div className="relative min-h-screen w-full text-foreground selection:bg-zinc-200 dark:selection:bg-zinc-800 flex flex-col">
      <SiteHeader />

      <main className="relative flex-1 flex flex-col items-center justify-center overflow-hidden">

        {/* Hero Content */}
        <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-4xl mx-auto pt-20 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
            className="inline-flex items-center gap-2 px-3 py-1 mb-8 rounded-full bg-white/20 dark:bg-black/20 border border-black/10 dark:border-white/10 backdrop-blur-md"
          >
            <Sparkles className="size-4 text-indigo-500" />
            <span className="text-sm font-medium">Welcome to the new standard</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
            className="text-5xl font-extrabold leading-tight tracking-tight sm:text-6xl md:text-7xl lg:text-[5.5rem] text-zinc-900 dark:text-zinc-50"
          >
            Xevos UI.
            <br />
            <span className="bg-gradient-to-r from-indigo-700 via-indigo-600 to-violet-600 bg-clip-text text-transparent">
              Redefine the web.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
            className="mt-6 text-lg sm:text-xl md:text-2xl text-zinc-700 dark:text-zinc-300 max-w-2xl font-normal tracking-tight"
          >
            A premium collection of high-performance, animated React components designed to make your next project truly stand out.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45, ease: [0.23, 1, 0.32, 1] }}
            className="mt-10 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
          >
            <Link
              href="/showcase"
              className="group relative flex h-14 w-full sm:w-auto items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-b from-[#EAEAEA]/90 to-[#D8D8D8]/90 px-8 text-base font-semibold text-zinc-900 backdrop-blur-xl transition-[box-shadow,gap] duration-300 shadow-[0_1px_1px_0_rgba(0,0,0,0.06),0_4px_8px_-2px_rgba(0,0,0,0.10),0_0_0_1px_rgba(0,0,0,0.15),inset_0_1.5px_0_0_rgba(255,255,255,0.9),inset_0_-1px_0_0_rgba(0,0,0,0.04)] hover:shadow-[0_2px_2px_0_rgba(0,0,0,0.06),0_10px_20px_-6px_rgba(0,0,0,0.14),0_0_0_1px_rgba(0,0,0,0.15),inset_0_1.5px_0_0_rgba(255,255,255,0.9),inset_0_-1px_0_0_rgba(0,0,0,0.04)] dark:bg-gradient-to-b dark:from-zinc-700/90 dark:to-zinc-800/90 dark:text-zinc-100 dark:shadow-[0_1px_1px_0_rgba(0,0,0,0.3),0_4px_8px_-2px_rgba(0,0,0,0.4),0_0_0_1px_rgba(255,255,255,0.08),inset_0_1.5px_0_0_rgba(255,255,255,0.06)] hover:gap-3"
            >
              Explore Showcase
              <ArrowRight className="size-4" />
            </Link>

            <Link
              href="/docs"
              className="rounded-xl transition-[box-shadow,background-color] duration-300 h-14 px-8 font-medium flex items-center justify-center bg-gradient-to-b from-zinc-800 to-zinc-900 text-zinc-100 hover:from-zinc-700 hover:to-zinc-800 shadow-[0_1px_1px_0_rgba(0,0,0,0.2),0_4px_8px_-2px_rgba(0,0,0,0.3),0_0_0_1px_rgba(255,255,255,0.06),inset_0_1.5px_0_0_rgba(255,255,255,0.08)] hover:shadow-[0_2px_2px_0_rgba(0,0,0,0.3),0_10px_20px_-6px_rgba(0,0,0,0.4),0_0_0_1px_rgba(255,255,255,0.06),inset_0_1.5px_0_0_rgba(255,255,255,0.08)] dark:bg-gradient-to-b dark:from-white dark:to-zinc-100 dark:text-zinc-900 dark:hover:from-zinc-50 dark:hover:to-zinc-200 dark:shadow-[0_1px_1px_0_rgba(0,0,0,0.06),0_4px_8px_-2px_rgba(0,0,0,0.10),0_0_0_1px_rgba(0,0,0,0.08),inset_0_1.5px_0_0_rgba(255,255,255,1),inset_0_-1px_0_0_rgba(0,0,0,0.03)] dark:hover:shadow-[0_2px_2px_0_rgba(0,0,0,0.06),0_10px_20px_-6px_rgba(0,0,0,0.14),0_0_0_1px_rgba(0,0,0,0.08),inset_0_1.5px_0_0_rgba(255,255,255,1),inset_0_-1px_0_0_rgba(0,0,0,0.03)] w-full sm:w-auto"
            >
              Read Docs
            </Link>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
