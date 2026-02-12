"use client"

import React from "react"
import { motion, type Variants } from "framer-motion"
import { FloatingNavbar } from "@/components/floating-navbar"
import { HeroButtons } from "@/components/landing/hero-buttons"
import { WebGLLiquid } from "@/components/landing/webgl-liquid"
export default function Home() {
  const titleLine1 = "PREMIUM UI"
  const titleLine2 = "COMPONENTS"
  const easeOut: [number, number, number, number] = [0.16, 1, 0.3, 1]
  const container: Variants = {
    hidden: { opacity: 0 },
    show: { opacity: 1 },
  }
  const letter: Variants = {
    hidden: { y: 28, opacity: 0, filter: "blur(6px)" },
    show: (i: number) => ({
      y: [18, -6, 0],
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        delay: 0.2 + i * 0.025,
        duration: 0.9,
        ease: easeOut,
      },
    }),
  }

  return (
    <div className="min-h-screen bg-white dark:bg-[#080808] text-zinc-900 dark:text-zinc-100 font-sans selection:bg-zinc-900 selection:text-white dark:selection:bg-white dark:selection:text-zinc-900 relative">

      {/* ── Navbar ── */}
      <FloatingNavbar />

      <main className="flex flex-col items-center justify-center min-h-screen px-4 pt-28 pb-24 text-center relative overflow-hidden">
        {/* ── Hero Background ── */}
        <div className="absolute inset-0 z-0 bg-white dark:bg-[#080808]">
          <div className="absolute bottom-0 left-0 right-0 h-28 z-0 bg-gradient-to-t from-white via-white/80 to-transparent dark:from-[#080808] dark:via-[#080808]/80 pointer-events-none backdrop-blur-[1px]" />
          <WebGLLiquid className="absolute inset-0 h-full w-full pointer-events-none opacity-90 block z-10" />
          <div className="absolute top-0 left-0 right-0 h-24 z-20 bg-gradient-to-b from-white via-white/80 to-transparent dark:from-[#080808] dark:via-[#080808]/80 pointer-events-none backdrop-blur-[1px]" />
        </div>

        <div className="max-w-4xl mx-auto space-y-12 relative z-10">

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

      {/* ── Components Showcase ── */}
      <section className="relative z-40 w-full px-4 pt-28 pb-36">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs uppercase tracking-[0.3em] text-zinc-400 dark:text-zinc-500">Components</p>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
              A bento grid built for premium UI.
            </h2>
            <p className="mt-3 text-base sm:text-lg text-zinc-500 dark:text-zinc-400">
              Each block is a preview-ready container styled like the docs gallery.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-8 gap-6">
            {/* Card 1 */}
            <div className="md:col-span-5 md:row-span-2 md:col-start-1 md:row-start-1 rounded-3xl border border-zinc-200/60 dark:border-zinc-800/60 bg-white/70 dark:bg-zinc-900/50 backdrop-blur-xl overflow-hidden">
              <div className="p-1.5">
                <div className="relative h-[360px] w-full rounded-[24px] bg-zinc-50 dark:bg-zinc-900/80 border border-dashed border-zinc-200/60 dark:border-zinc-800/60 overflow-hidden">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(99,102,241,0.25),transparent_45%),radial-gradient(circle_at_80%_30%,rgba(56,189,248,0.25),transparent_40%),radial-gradient(circle_at_50%_80%,rgba(16,185,129,0.18),transparent_45%)]" />
                  <div className="absolute inset-0 opacity-80 [mask-image:radial-gradient(circle_at_center,black,transparent_68%)] bg-[linear-gradient(120deg,rgba(0,0,0,0.02),rgba(0,0,0,0.2),rgba(0,0,0,0.02))] dark:bg-[linear-gradient(120deg,rgba(255,255,255,0.02),rgba(255,255,255,0.12),rgba(255,255,255,0.02))]" />
                </div>
              </div>
              <div className="px-5 pb-5 text-left">
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Hero Systems</h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                  Fluid gradients, motion-ready surfaces, and adaptive layouts.
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="md:col-span-3 md:col-start-6 md:row-start-1 rounded-3xl border border-zinc-200/60 dark:border-zinc-800/60 bg-white/70 dark:bg-zinc-900/50 backdrop-blur-xl overflow-hidden">
              <div className="p-1.5">
                <div className="relative h-[220px] w-full rounded-[24px] bg-zinc-50 dark:bg-zinc-900/80 border border-dashed border-zinc-200/60 dark:border-zinc-800/60 overflow-hidden">
                  <div className="absolute inset-0 bg-[conic-gradient(from_120deg_at_50%_50%,rgba(99,102,241,0.4),rgba(56,189,248,0.3),rgba(16,185,129,0.25),rgba(99,102,241,0.4))] opacity-70" />
                  <div className="absolute inset-0 mix-blend-overlay bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.7),transparent_40%)]" />
                </div>
              </div>
              <div className="px-5 pb-5 text-left">
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Controls</h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                  Buttons, toggles, and micro-interactions.
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="md:col-span-3 md:row-span-2 md:col-start-6 md:row-start-2 rounded-3xl border border-zinc-200/60 dark:border-zinc-800/60 bg-white/70 dark:bg-zinc-900/50 backdrop-blur-xl overflow-hidden">
              <div className="p-1.5">
                <div className="relative h-[320px] w-full rounded-[24px] bg-zinc-50 dark:bg-zinc-900/80 border border-dashed border-zinc-200/60 dark:border-zinc-800/60 overflow-hidden">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(14,165,233,0.35),transparent_45%),radial-gradient(circle_at_30%_70%,rgba(168,85,247,0.25),transparent_50%)]" />
                  <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(0,0,0,0.03),rgba(0,0,0,0.2))] dark:bg-[linear-gradient(135deg,rgba(255,255,255,0.03),rgba(255,255,255,0.12))]" />
                </div>
              </div>
              <div className="px-5 pb-5 text-left">
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Navigation</h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                  Floating navs, docks, and persistent bars.
                </p>
              </div>
            </div>

            {/* Card 4 */}
            <div className="md:col-span-5 md:col-start-1 md:row-start-3 rounded-3xl border border-zinc-200/60 dark:border-zinc-800/60 bg-white/70 dark:bg-zinc-900/50 backdrop-blur-xl overflow-hidden">
              <div className="p-1.5">
                <div className="relative h-[200px] w-full rounded-[24px] bg-zinc-50 dark:bg-zinc-900/80 border border-dashed border-zinc-200/60 dark:border-zinc-800/60 overflow-hidden">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_30%,rgba(16,185,129,0.35),transparent_45%),radial-gradient(circle_at_70%_70%,rgba(99,102,241,0.3),transparent_45%)]" />
                  <div className="absolute inset-0 bg-[linear-gradient(160deg,rgba(0,0,0,0.03),rgba(0,0,0,0.22))] dark:bg-[linear-gradient(160deg,rgba(255,255,255,0.03),rgba(255,255,255,0.14))]" />
                </div>
              </div>
              <div className="px-5 pb-5 text-left">
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Cards</h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                  Bento-ready blocks with depth and polish.
                </p>
              </div>
            </div>

            {/* Card 6 */}
            <div className="md:col-span-5 md:col-start-4 md:row-start-4 rounded-3xl border border-zinc-200/60 dark:border-zinc-800/60 bg-white/70 dark:bg-zinc-900/50 backdrop-blur-xl overflow-hidden">
              <div className="p-1.5">
                <div className="relative h-[220px] w-full rounded-[24px] bg-zinc-50 dark:bg-zinc-900/80 border border-dashed border-zinc-200/60 dark:border-zinc-800/60 overflow-hidden">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_25%,rgba(251,146,60,0.3),transparent_45%),radial-gradient(circle_at_30%_70%,rgba(14,165,233,0.25),transparent_45%)]" />
                  <div className="absolute inset-0 bg-[linear-gradient(145deg,rgba(0,0,0,0.03),rgba(0,0,0,0.2))] dark:bg-[linear-gradient(145deg,rgba(255,255,255,0.03),rgba(255,255,255,0.12))]" />
                </div>
              </div>
              <div className="px-5 pb-5 text-left">
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Data Views</h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                  Tables, timelines, and animated charts.
                </p>
              </div>
            </div>

            {/* Card 5 */}
            <div className="md:col-span-3 md:col-start-1 md:row-start-4 rounded-3xl border border-zinc-200/60 dark:border-zinc-800/60 bg-white/70 dark:bg-zinc-900/50 backdrop-blur-xl overflow-hidden">
              <div className="p-1.5">
                <div className="relative h-[220px] w-full rounded-[24px] bg-zinc-50 dark:bg-zinc-900/80 border border-dashed border-zinc-200/60 dark:border-zinc-800/60 overflow-hidden">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_40%,rgba(236,72,153,0.25),transparent_45%),radial-gradient(circle_at_70%_40%,rgba(59,130,246,0.28),transparent_45%),radial-gradient(circle_at_60%_80%,rgba(34,197,94,0.2),transparent_45%)]" />
                  <div className="absolute inset-0 bg-[linear-gradient(110deg,rgba(0,0,0,0.02),rgba(0,0,0,0.2))] dark:bg-[linear-gradient(110deg,rgba(255,255,255,0.02),rgba(255,255,255,0.12))]" />
                </div>
              </div>
              <div className="px-5 pb-5 text-left">
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Feedback</h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                  Toasts, banners, and status-driven UI.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
