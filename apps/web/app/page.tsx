"use client"

import React from "react"
import { motion, type Variants } from "framer-motion"
import { FloatingNavbar } from "@/components/floating-navbar"
import { HeroButtons } from "@/components/landing/hero-buttons"
import { WebGLLiquid } from "@/components/landing/webgl-liquid"
import HeroGeometric from "@workspace/ui/components/hero-geometric"
import { ParticleGalaxy } from "@workspace/ui/components/particle-galaxy"
import { MatrixRain } from "@workspace/ui/components/matrix-rain"
import { DitherGradient } from "@workspace/ui/components/dither-gradient"
import { MagnetLines } from "@workspace/ui/components/magnet-lines"
import {
  MagneticDock,
  DockIconHome,
  DockIconSearch,
  DockIconFolder,
  DockIconMail,
  DockIconMusic,
  DockIconSettings,
  DockIconTrash,
} from "@workspace/ui/components/magnetic-dock"

const dockItems = [
  { id: "home", label: "Home", icon: <DockIconHome />, isActive: true },
  { id: "search", label: "Search", icon: <DockIconSearch /> },
  { id: "folder", label: "Finder", icon: <DockIconFolder /> },
  { id: "mail", label: "Mail", icon: <DockIconMail />, badge: 2 },
  { id: "music", label: "Music", icon: <DockIconMusic /> },
  { id: "settings", label: "Settings", icon: <DockIconSettings /> },
  { id: "trash", label: "Trash", icon: <DockIconTrash /> },
]

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
                <div className="relative h-[360px] w-full rounded-[24px] bg-zinc-50 dark:bg-zinc-900/80 border border-zinc-200/60 dark:border-zinc-800/60 overflow-hidden">
                  <HeroGeometric
                    title1="Hero"
                    title2="Geometric"
                    className="!min-h-full"
                  />
                </div>
              </div>
              <div className="px-5 pb-5 text-left">
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Hero Geometric</h3>
              </div>
            </div>

            {/* Card 2 */}
            <div className="md:col-span-3 md:col-start-6 md:row-start-1 rounded-3xl border border-zinc-200/60 dark:border-zinc-800/60 bg-white/70 dark:bg-zinc-900/50 backdrop-blur-xl overflow-hidden">
              <div className="p-1.5">
                <div className="relative h-[220px] w-full rounded-[24px] bg-zinc-50 dark:bg-zinc-900/80 border border-zinc-200/60 dark:border-zinc-800/60 overflow-hidden">
                  <div className="absolute inset-0 bg-zinc-950">
                    <ParticleGalaxy
                      particleCount={4200}
                      spread={2.1}
                      glow={70}
                      density={0.85}
                      rotationSpeed={0.0013}
                      cameraMovement={false}
                      minZoom={2}
                      maxZoom={6}
                    />
                  </div>
                </div>
              </div>
              <div className="px-5 pb-5 text-left">
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Particle Galaxy</h3>
              </div>
            </div>

            {/* Card 3 */}
            <div className="md:col-span-3 md:row-span-2 md:col-start-6 md:row-start-2 rounded-3xl border border-zinc-200/60 dark:border-zinc-800/60 bg-white/70 dark:bg-zinc-900/50 backdrop-blur-xl overflow-hidden">
              <div className="p-1.5">
                <div className="relative h-[320px] w-full rounded-[24px] bg-zinc-50 dark:bg-zinc-900/80 border border-zinc-200/60 dark:border-zinc-800/60 overflow-hidden">
                  <div className="absolute inset-0 bg-zinc-950">
                    <DitherGradient
                      colorFrom="#0ea5e9"
                      colorMid="#8b5cf6"
                      colorTo="#ec4899"
                      intensity={0.18}
                      speed={2.4}
                    />
                  </div>
                </div>
              </div>
              <div className="px-5 pb-5 text-left">
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Dither Gradient</h3>
              </div>
            </div>

            {/* Card 4 */}
            <div className="md:col-span-5 md:col-start-1 md:row-start-3 rounded-3xl border border-zinc-200/60 dark:border-zinc-800/60 bg-white/70 dark:bg-zinc-900/50 backdrop-blur-xl overflow-hidden">
              <div className="p-1.5">
                <div className="relative h-[200px] w-full rounded-[24px] bg-zinc-50 dark:bg-zinc-900/80 border border-zinc-200/60 dark:border-zinc-800/60 overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center bg-zinc-900">
                    <div className="scale-[0.72] sm:scale-[0.88] md:scale-[1.02]">
                      <MagneticDock
                        items={dockItems}
                        iconSize={68}
                        maxScale={1.8}
                        magneticDistance={190}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="px-5 pb-5 text-left">
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Magnetic Dock</h3>
              </div>
            </div>

            {/* Card 6 */}
            <div className="md:col-span-5 md:col-start-4 md:row-start-4 rounded-3xl border border-zinc-200/60 dark:border-zinc-800/60 bg-white/70 dark:bg-zinc-900/50 backdrop-blur-xl overflow-hidden">
              <div className="p-1.5">
                <div className="relative h-[220px] w-full rounded-[24px] bg-zinc-50 dark:bg-zinc-900/80 border border-zinc-200/60 dark:border-zinc-800/60 overflow-hidden">
                  <div className="absolute inset-0">
                    <MagnetLines
                      rows={8}
                      columns={14}
                      containerSize="100%"
                      lineColor="rgba(113,113,122,0.7)"
                      lineWidth="2px"
                      lineHeight="18px"
                      className="h-full w-full place-items-center bg-white dark:bg-zinc-950"
                    />
                  </div>
                </div>
              </div>
              <div className="px-5 pb-5 text-left">
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Magnet Lines</h3>
              </div>
            </div>

            {/* Card 5 */}
            <div className="md:col-span-3 md:col-start-1 md:row-start-4 rounded-3xl border border-zinc-200/60 dark:border-zinc-800/60 bg-white/70 dark:bg-zinc-900/50 backdrop-blur-xl overflow-hidden">
              <div className="p-1.5">
                <div className="relative h-[220px] w-full rounded-[24px] bg-zinc-50 dark:bg-zinc-900/80 border border-zinc-200/60 dark:border-zinc-800/60 overflow-hidden">
                  <MatrixRain variant="cyan" />
                </div>
              </div>
              <div className="px-5 pb-5 text-left">
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Matrix Rain</h3>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
