"use client"

import React from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Heart, Sparkles, Star, Rocket, ArrowUpRight } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import {
  LandingContent,
  LandingGutter,
  LandingGuideLines,
  LandingShaderBand,
} from "@/components/landing/landing-frame"
import { Footer } from "@/components/footer"

const cardClass =
  "relative flex flex-col rounded-2xl border border-border bg-white dark:bg-[#1a1a1a] p-6 shadow-card transition-[transform,box-shadow,border-color] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] hover:scale-[1.02] hover:border-input hover:shadow-card-hover active:scale-[0.98]"

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.23, 1, 0.32, 1] as const } },
}

const tiers = [
  {
    name: "Platinum",
    icon: Rocket,
    price: "$500+/mo",
    description: "Enterprise-grade support, priority feature requests, logo on homepage, and dedicated onboarding.",
    sponsors: [
      { name: "Vercel", logo: "V", href: "https://vercel.com" },
    ],
    border: "border-amber-400/50 dark:border-amber-500/50",
    badge: "Top Tier",
    badgeClass: "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300",
  },
  {
    name: "Gold",
    icon: Star,
    price: "$100+/mo",
    description: "Logo placement on the sponsors page, early access to new components, and a shoutout on socials.",
    sponsors: [
      { name: "Your Logo", logo: null, href: null },
      { name: "Your Logo", logo: null, href: null },
    ],
    border: "border-yellow-400/40 dark:border-yellow-500/40",
    badge: null,
    badgeClass: "",
  },
  {
    name: "Silver",
    icon: Sparkles,
    price: "$25+/mo",
    description: "Name listed on the sponsors page, access to private Discord channel, and our gratitude.",
    sponsors: [
      { name: "Your Logo", logo: null, href: null },
      { name: "Your Logo", logo: null, href: null },
      { name: "Your Logo", logo: null, href: null },
    ],
    border: "border-slate-400/30 dark:border-slate-500/30",
    badge: null,
    badgeClass: "",
  },
  {
    name: "Bronze",
    icon: Heart,
    price: "$5+/mo",
    description: "Name listed on the sponsors page and our heartfelt thanks for supporting open source.",
    sponsors: [
      { name: "Your Logo", logo: null, href: null },
      { name: "Your Logo", logo: null, href: null },
      { name: "Your Logo", logo: null, href: null },
      { name: "Your Logo", logo: null, href: null },
    ],
    border: "border-orange-400/30 dark:border-orange-500/30",
    badge: null,
    badgeClass: "",
  },
]

export default function SponsorsPage() {
  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-white dark:bg-[#111] text-foreground transition-colors duration-300 selection:bg-zinc-200 dark:selection:bg-zinc-800">
      <LandingGuideLines />
      <SiteHeader landingGutter />

      <main className="relative z-10 flex min-h-screen min-w-0 flex-col justify-start overflow-x-clip pt-40 pb-32">
        <LandingGutter>
          <LandingContent className="pb-8">
            <motion.h1
              initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
              className="text-4xl font-semibold leading-[1.05] tracking-[-0.04em] text-zinc-900 dark:text-white sm:text-5xl md:text-6xl lg:text-[3.35rem]"
            >
              Sponsors
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.6, delay: 0.35, ease: [0.23, 1, 0.32, 1] }}
              className="mt-4 text-base sm:text-lg md:text-xl text-zinc-400 dark:text-zinc-600 max-w-2xl font-medium tracking-tight"
            >
              Componentry is proudly open source and funded by the community.
              Your sponsorship helps us build better components for everyone.
            </motion.p>
          </LandingContent>

          <LandingShaderBand />

          {/* Sponsor Tiers */}
          <LandingContent>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.1 } },
              }}
              className="mb-20 mt-20 grid w-full min-w-0 gap-4 md:grid-cols-2"
            >
              {tiers.map((tier) => {
                const Icon = tier.icon
                return (
                  <motion.div
                    key={tier.name}
                    variants={cardVariants}
                    className={`${cardClass} ${tier.border}`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="flex size-10 items-center justify-center rounded-xl border border-border bg-zinc-50 dark:bg-[#111]">
                          <Icon className="size-5 text-zinc-600 dark:text-zinc-400" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">
                            {tier.name}
                          </h3>
                          <p className="text-sm text-zinc-500 dark:text-zinc-500">{tier.price}</p>
                        </div>
                      </div>
                      {tier.badge && (
                        <span className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium ${tier.badgeClass}`}>
                          <Sparkles className="size-3" />
                          {tier.badge}
                        </span>
                      )}
                    </div>

                    <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-6 leading-relaxed">
                      {tier.description}
                    </p>

                    <div className="mt-auto">
                      <p className="text-xs font-semibold tracking-[0.1em] uppercase text-zinc-400 dark:text-zinc-600 mb-3">
                        Sponsors
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {tier.sponsors.map((sponsor, i) => (
                          sponsor.href ? (
                            <Link
                              key={i}
                              href={sponsor.href}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-2 rounded-lg border border-border bg-zinc-50 dark:bg-[#111] px-3 py-2 text-sm font-medium text-zinc-700 dark:text-zinc-300 transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800"
                            >
                              <span className="flex size-6 items-center justify-center rounded-md bg-zinc-900 text-xs font-bold text-white dark:bg-white dark:text-zinc-900">
                                {sponsor.logo}
                              </span>
                              {sponsor.name}
                            </Link>
                          ) : (
                            <span
                              key={i}
                              className="inline-flex items-center gap-2 rounded-lg border border-dashed border-border bg-zinc-50/50 dark:bg-zinc-900/50 px-3 py-2 text-sm font-medium text-zinc-400 dark:text-zinc-600"
                            >
                              <span className="flex size-6 items-center justify-center rounded-md bg-zinc-200 text-xs font-bold text-zinc-400 dark:bg-zinc-800 dark:text-zinc-600">
                                ?
                              </span>
                              {sponsor.name}
                            </span>
                          )
                        ))}
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-border">
                      <Link
                        href="https://github.com/sponsors/harshjdhv"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-zinc-700 dark:text-zinc-300 transition-colors hover:text-zinc-900 dark:hover:text-white"
                      >
                        Become a {tier.name} sponsor
                        <ArrowUpRight className="size-3.5" />
                      </Link>
                    </div>
                  </motion.div>
                )
              })}
            </motion.div>
          </LandingContent>

          <LandingShaderBand />

          {/* One-time Support */}
          <LandingContent>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.23, 1, 0.32, 1] } },
              }}
              className="mb-20 mt-20 text-center"
            >
              <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white mb-3">
                Not ready to commit monthly?
              </h2>
              <p className="text-sm text-zinc-500 dark:text-zinc-500 max-w-md mx-auto mb-6">
                You can still support the project with a one-time donation. Every contribution counts.
              </p>
              <Link
                href="https://github.com/sponsors/harshjdhv"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-white dark:bg-[#1a1a1a] px-5 py-3 text-sm font-medium text-zinc-700 dark:text-zinc-300 shadow-card transition-all hover:shadow-card-hover hover:border-input"
              >
                <Heart className="size-4 text-red-500" />
                Sponsor on GitHub
                <ArrowUpRight className="size-3.5" />
              </Link>
            </motion.div>
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
