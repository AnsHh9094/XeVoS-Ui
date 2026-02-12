"use client"

import React from "react"
import { motion } from "framer-motion"
import { FloatingNavbar } from "@/components/floating-navbar"
import { HeroButtons } from "@/components/landing/hero-buttons"
import { WebGLLiquid } from "@/components/landing/webgl-liquid"
export default function Home() {
  const titleLine1 = "PREMIUM UI"
  const titleLine2 = "COMPONENTS"
  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1 },
  }
  const letter = {
    hidden: { y: 28, opacity: 0, filter: "blur(6px)" },
    show: (i: number) => ({
      y: [18, -6, 0],
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        delay: 0.2 + i * 0.025,
        duration: 0.9,
        ease: [0.16, 1, 0.3, 1],
      },
    }),
  }

  return (
    <div className="min-h-screen bg-white dark:bg-[#080808] text-zinc-900 dark:text-zinc-100 font-sans selection:bg-zinc-900 selection:text-white dark:selection:bg-white dark:selection:text-zinc-900 relative">

      {/* ── Navbar ── */}
      <FloatingNavbar />

      {/* ── Background Pattern ── */}
      <div className="fixed inset-0 z-30 h-full w-full bg-white dark:bg-[#080808]">
        <WebGLLiquid className="absolute inset-0 h-full w-full pointer-events-none opacity-90 block" />
        <div className="absolute left-0 right-0 top-0 z-0 m-auto h-[310px] w-[310px] rounded-full bg-zinc-400 opacity-20 blur-[100px] dark:bg-zinc-500"></div>
      </div>

      {/* ── Overlay Gradients ── */}
      <div className="fixed top-0 left-0 right-0 z-20 h-24 bg-gradient-to-b from-white via-white/80 to-transparent dark:from-[#080808] dark:via-[#080808]/80 pointer-events-none backdrop-blur-[1px]" />
      <div className="fixed bottom-0 left-0 right-0 z-20 h-24 bg-gradient-to-t from-white via-white/80 to-transparent dark:from-[#080808] dark:via-[#080808]/80 pointer-events-none backdrop-blur-[1px]" />

      <main className="flex flex-col items-center justify-center min-h-screen px-4 pt-20 pb-16 text-center relative overflow-hidden z-40">
        <div className="max-w-4xl mx-auto space-y-8 relative z-10">

          {/* ── Badge / Label (Optional) ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="flex justify-center"
          >
            <div className="inline-flex items-center rounded-full border border-zinc-200 bg-white/50 px-3 py-1 text-sm font-medium text-zinc-800 backdrop-blur-xl dark:border-zinc-800 dark:bg-zinc-900/50 dark:text-zinc-200">
              <span className="flex h-2 w-2 rounded-full bg-green-500 mr-2 animate-pulse"></span>
              <span>Open source and free to use</span>
            </div>
          </motion.div>

          {/* ── Hero Title ── */}
          <motion.div initial="hidden" animate="show" variants={container}>
            <h1 className="relative text-5xl sm:text-7xl md:text-8xl font-bold tracking-tighter leading-[0.9] pb-0">
              {titleLine1.split("").map((char, i) => (
                <motion.span
                  key={`l1-${i}`}
                  className="inline-block bg-gradient-to-br from-zinc-900 via-zinc-500 to-zinc-900 dark:from-white dark:via-zinc-400 dark:to-white bg-clip-text text-transparent"
                  variants={letter}
                  custom={i}
                  style={{ transformOrigin: "50% 100%" }}
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
              <br className="hidden md:block" />
              {titleLine2.split("").map((char, i) => (
                <motion.span
                  key={`l2-${i}`}
                  className="inline-block bg-gradient-to-br from-zinc-900 via-zinc-500 to-zinc-900 dark:from-white dark:via-zinc-400 dark:to-white bg-clip-text text-transparent"
                  variants={letter}
                  custom={titleLine1.length + i}
                  style={{ transformOrigin: "50% 100%" }}
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </h1>
          </motion.div>

          {/* ── Hero Description ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
          >
            <p className="max-w-xl mx-auto text-lg sm:text-xl text-zinc-500 dark:text-zinc-400 leading-relaxed font-medium tracking-tight mt-0">
              Refined, animated React primitives for premium product UI.
            </p>
          </motion.div>

          {/* ── CTAs ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
          >
            <HeroButtons />
          </motion.div>

        </div>
      </main>
    </div>
  )
}
