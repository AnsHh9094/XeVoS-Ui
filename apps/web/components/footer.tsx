/**
 * XeVoS UI — https://github.com/AnsHh9094/XeVoS-Ui
 * Copyright (c) 2026 Anand Ansh (AnsHh9094)
 * SPDX-License-Identifier: MIT
 * This notice must be retained in all copies or substantial portions (MIT License).
 */
"use client"

import React from "react"
import Link from "next/link"
import {
  LandingContent,
  landingGutterClass,
} from "@/components/landing/landing-frame"
import { XevosUILogomark } from "@/components/logos/xevos-ui-logomark"

const links = {
  product: [
    { label: "Components", href: "/docs" },
    { label: "MCP Server", href: "/docs/mcp" },
    { label: "Quick Start", href: "/docs" },
  ],
  resources: [
    { label: "Documentation", href: "/docs" },
    { label: "GitHub", href: "https://github.com/AnsHh9094/xevos-ui", external: true },
    { label: "Terms of Service", href: "/terms-of-service" },
    { label: "Privacy Policy", href: "/privacy-policy" },
  ],
  connect: [
    { label: "Twitter / X", href: "https://x.com/AnsHh9094", external: true },
    { label: "LinkedIn", href: "https://linkedin.com/in/AnsHh9094", external: true },
    { label: "Developer", href: "https://AnsHh9094.com", external: true },
  ],
}

export function Footer() {
  return (
    <footer className="relative flex w-full flex-col overflow-hidden border-t border-zinc-200/60 bg-white pt-18 text-[15px] dark:border-zinc-800/60 dark:bg-[#09090B]">
      <div className={`mx-auto w-full ${landingGutterClass}`}>
        <LandingContent>
        <div className="z-10 grid w-full grid-cols-1 gap-12 pb-18 md:grid-cols-12 lg:gap-8 xl:gap-12">
          {/* Brand and Description */}
          <div className="flex flex-col items-start md:col-span-12 lg:col-span-5 xl:col-span-5">
            <Link href="/" className="group mb-6 flex w-fit items-center gap-2.5">
              <XevosUILogomark className="size-7 text-zinc-900 transition-transform duration-300 group-hover:scale-105 dark:text-white" />
              <span className="text-lg font-semibold tracking-tight text-zinc-900 dark:text-white">
                Xevos UI
              </span>
            </Link>
            <p className="mb-7 max-w-md text-base leading-7 text-zinc-500 dark:text-zinc-400">
              Beautiful animated React components. Copy, paste, ship. Built for modern web applications with a focus on motion and usability.
            </p>
            <div className="flex items-center gap-3">
              <a 
                href="https://x.com/AnsHh9094" 
                 
                 
                className="text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
              >
                <svg className="size-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a 
                href="https://github.com/AnsHh9094/xevos-ui" 
                 
                 
                className="text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
              >
                <svg className="size-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>

          {/* Links - Pushed to the right using col-start */}
          <div className="col-span-2 grid grid-cols-2 gap-9 sm:grid-cols-3 md:col-span-12 lg:col-span-6 lg:col-start-7 xl:col-span-6 xl:col-start-7">
            <div className="flex flex-col gap-4">
              <h3 className="text-[15px] font-semibold text-zinc-900 dark:text-zinc-100">Product</h3>
              <ul className="flex flex-col gap-3.5">
                {links.product.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="inline-flex items-center gap-1 text-[15px] leading-6 text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col gap-4">
              <h3 className="text-[15px] font-semibold text-zinc-900 dark:text-zinc-100">Resources</h3>
              <ul className="flex flex-col gap-3.5">
                {links.resources.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      {...(l.external ? { target: "_blank", rel: "noreferrer" } : {})}
                      className="group inline-flex items-center gap-1 text-[15px] leading-6 text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                    >
                      {l.label}
                      {l.external && (
                        <svg className="size-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M7 17L17 7" />
                          <path d="M7 7h10v10" />
                        </svg>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col gap-4">
              <h3 className="text-[15px] font-semibold text-zinc-900 dark:text-zinc-100">Connect</h3>
              <ul className="flex flex-col gap-3.5">
                {links.connect.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      {...(l.external ? { target: "_blank", rel: "noreferrer" } : {})}
                      className="group inline-flex items-center gap-1 text-[15px] leading-6 text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                    >
                      {l.label}
                      {l.external && (
                        <svg className="size-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M7 17L17 7" />
                          <path d="M7 7h10v10" />
                        </svg>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="z-10 flex flex-col items-center justify-between gap-4 pb-8 text-sm md:flex-row">
          <p className="text-zinc-500 dark:text-zinc-400">
            © {new Date().getFullYear()} Xevos UI. Created by{" "}
            <a
              href="https://x.com/AnsHh9094"
              
              
              className="text-zinc-900 dark:text-zinc-100 hover:underline underline-offset-4"
            >
              ansh anand
            </a>
            .
          </p>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 group cursor-pointer">
              <div className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </div>
              <span className="text-zinc-500 transition-colors group-hover:text-zinc-900 dark:text-zinc-400 dark:group-hover:text-zinc-100">
                All systems normal
              </span>
            </div>
          </div>
        </div>
        </LandingContent>
      </div>

      {/* Massive Half-Cut Text */}
      <div className="w-full flex justify-center mt-12 pointer-events-none select-none overflow-hidden h-[10.5vw]">
        <h1 className="text-[10.5vw] font-black leading-[0.7] tracking-tighter text-zinc-950/5 dark:text-white/5 translate-y-[28%]">
          XEVOS UI
        </h1>
      </div>
    </footer>
  )
}
