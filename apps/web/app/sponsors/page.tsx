"use client"

import React from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import {
  LandingContent,
  LandingGutter,
  LandingGuideLines,
  LandingShaderBand,
} from "@/components/landing/landing-frame"
import { Footer } from "@/components/footer"
import { ArrowUpRight } from "lucide-react"

const sponsorCardClass =
  "relative flex flex-col items-center justify-center gap-2 rounded-2xl border border-border bg-white dark:bg-[#1a1a1a] p-4 shadow-card"


export default function SponsorsPage() {
  return (
    <div
      className="relative min-h-screen w-full overflow-x-hidden bg-white dark:bg-[#111] text-foreground transition-colors duration-300 selection:bg-zinc-200 dark:selection:bg-zinc-800"
    >
      <LandingGuideLines />
      <SiteHeader landingGutter />

      <main className="relative z-10 flex min-h-screen min-w-0 flex-col justify-start overflow-x-clip pt-28 pb-16">
        <LandingGutter>
          
          <LandingContent className="pb-8 text-center md:text-left flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="flex-1">
              <motion.h1
                initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                className="text-3xl font-semibold leading-[1.05] tracking-[-0.04em] text-zinc-900 dark:text-white sm:text-4xl"
              >
                Sponsor Componentry
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.6, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
                className="mt-3 text-sm sm:text-base text-zinc-400 dark:text-zinc-600 max-w-2xl font-medium tracking-tight mx-auto md:mx-0"
              >
                Animated React components, free for everyone. Sponsorship keeps them that way — maintained, hosted, and constantly improving.
              </motion.p>
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
              className="shrink-0 mx-auto md:mx-0"
            >
              <Link
                href="https://github.com/sponsors/harshjdhv?utm_source=componentry&utm_medium=sponsor&utm_campaign=sponsors_page"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-b from-zinc-800 to-zinc-900 px-5 py-2.5 text-sm font-medium text-zinc-100 shadow-lg transition-all hover:from-zinc-700 hover:to-zinc-800 active:scale-[0.98] dark:from-white dark:to-zinc-100 dark:text-zinc-900 dark:hover:from-zinc-100 dark:hover:to-white"
              >
                Sponsor on GitHub
                <ArrowUpRight className="size-3.5" />
              </Link>
            </motion.div>
          </LandingContent>

          <LandingContent className="pb-12">
            {/* Stats Section */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-3"
            >
              <div className="flex flex-col items-center justify-center gap-1 rounded-2xl border border-border bg-white dark:bg-[#1a1a1a] p-5 shadow-card">
                <span className="text-3xl font-semibold tracking-[-0.04em] text-zinc-900 dark:text-white mb-0.5">15k+</span>
                <span className="text-[11px] font-medium text-zinc-400 dark:text-zinc-600 tracking-wide uppercase">Monthly Visitors</span>
              </div>
              <div className="flex flex-col items-center justify-center gap-1 rounded-2xl border border-border bg-white dark:bg-[#1a1a1a] p-5 shadow-card">
                <span className="text-3xl font-semibold tracking-[-0.04em] text-zinc-900 dark:text-white mb-0.5">70k+</span>
                <span className="text-[11px] font-medium text-zinc-400 dark:text-zinc-600 tracking-wide uppercase">Page Views</span>
              </div>
              <div className="flex flex-col items-center justify-center gap-1 rounded-2xl border border-border bg-white dark:bg-[#1a1a1a] p-5 shadow-card">
                <span className="text-3xl font-semibold tracking-[-0.04em] text-zinc-900 dark:text-white mb-0.5">60+</span>
                <span className="text-[11px] font-medium text-zinc-400 dark:text-zinc-600 tracking-wide uppercase">Free Components</span>
              </div>
            </motion.div>
          </LandingContent>

          <LandingShaderBand />

          <LandingContent className="pt-12 pb-8">
            {/* Thank You Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center md:text-left"
            >
              <h2 className="text-2xl font-semibold leading-[1.05] tracking-[-0.04em] text-zinc-900 dark:text-white sm:text-3xl mb-3">
                Backed by
              </h2>
              <p className="mt-2 text-sm sm:text-base text-zinc-400 dark:text-zinc-600 max-w-2xl font-medium tracking-tight mx-auto md:mx-0">
                 Thanks to our sponsors for keeping Componentry moving. Your support funds hosting,
                 development, and everything we ship next.
              </p>
            </motion.div>
          </LandingContent>

          <LandingContent className="pb-8">
            {/* Gold Section */}
            <h3 className="text-xs font-semibold text-zinc-400 dark:text-zinc-600 mb-4 text-center md:text-left uppercase tracking-wider">Gold Tier</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {/* Shadcnblocks */}
              <Link
                href="https://shadcnblocks.com/?utm_source=componentry&utm_medium=sponsor&utm_campaign=sponsors_page"
                target="_blank"
                className={`${sponsorCardClass} min-h-[100px]`}
              >
                <div className="relative z-10 flex flex-col items-center gap-2">
                  <img
                    src="https://cdn.shadcnblocks.com/shadcnblocks/images/logo/shadcnblocks-logo.svg"
                    className="size-6 dark:invert"
                    alt="Shadcnblocks Logo"
                  />
                  <span className="font-semibold text-base text-zinc-900 dark:text-zinc-100 tracking-tight">Shadcnblocks.com</span>
                </div>
              </Link>

              {[1, 2].map((i) => (
                <Link
                  key={i}
                  href="https://github.com/sponsors/harshjdhv?utm_source=componentry&utm_medium=sponsor&utm_campaign=sponsors_page"
                  target="_blank"
                  className={`${sponsorCardClass} min-h-[100px] group`}
                >
                  <div className="relative z-10 flex flex-col items-center gap-0.5 opacity-50 group-hover:opacity-100 transition-opacity">
                    <span className="text-xl font-semibold tracking-[-0.04em] text-zinc-300 dark:text-zinc-500 block">+</span>
                    <span className="text-[10px] font-medium text-zinc-400 dark:text-zinc-500 tracking-tight uppercase">Sponsor this slot</span>
                  </div>
                </Link>
              ))}
            </div>
          </LandingContent>

          <LandingContent className="pb-8">
            {/* Silver Section */}
            <h3 className="text-xs font-semibold text-zinc-400 dark:text-zinc-600 mb-4 text-center md:text-left uppercase tracking-wider">Silver Tier</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[1, 2, 3, 4].map((i) => (
                <Link
                  key={i}
                  href="https://github.com/sponsors/harshjdhv?utm_source=componentry&utm_medium=sponsor&utm_campaign=sponsors_page"
                  target="_blank"
                  className={`${sponsorCardClass} min-h-[90px] group`}
                >
                  <div className="relative z-10 flex flex-col items-center gap-0.5 opacity-50 group-hover:opacity-100 transition-opacity">
                    <span className="text-xl font-semibold tracking-[-0.04em] text-zinc-300 dark:text-zinc-500 block">+</span>
                    <span className="text-[10px] font-medium text-zinc-400 dark:text-zinc-500 tracking-tight uppercase">Sponsor this slot</span>
                  </div>
                </Link>
              ))}
            </div>
          </LandingContent>

          <LandingContent className="pb-16">
            {/* Bronze Section */}
            <h3 className="text-xs font-semibold text-zinc-400 dark:text-zinc-600 mb-4 text-center md:text-left uppercase tracking-wider">Bronze Tier</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[1, 2, 3, 4].map((i) => (
                <Link
                  key={i}
                  href="https://github.com/sponsors/harshjdhv?utm_source=componentry&utm_medium=sponsor&utm_campaign=sponsors_page"
                  target="_blank"
                  className={`${sponsorCardClass} min-h-[90px] group`}
                >
                  <div className="relative z-10 flex flex-col items-center gap-0.5 opacity-50 group-hover:opacity-100 transition-opacity">
                    <span className="text-xl font-semibold tracking-[-0.04em] text-zinc-300 dark:text-zinc-500 block">+</span>
                    <span className="text-[10px] font-medium text-zinc-400 dark:text-zinc-500 tracking-tight uppercase">Sponsor this slot</span>
                  </div>
                </Link>
              ))}
            </div>
          </LandingContent>

        </LandingGutter>
      </main>

      <LandingGutter>
        <LandingShaderBand />
        <LandingContent>
          <Footer />
        </LandingContent>
      </LandingGutter>
    </div>
  )
}
