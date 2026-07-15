/**
 * XeVoS UI — https://github.com/AnsHh9094/XeVoS-Ui
 * Copyright (c) 2026 Anand Ansh (AnsHh9094)
 * SPDX-License-Identifier: MIT
 * This notice must be retained in all copies or substantial portions (MIT License).
 */
"use client"

import { Children, memo, useEffect, useMemo, useRef, useState } from "react"
import type { ReactNode } from "react"
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion"

import { cn } from "@/lib/utils"

const DEFAULT_COLUMN_COUNT = 4
const CYCLE_INTERVAL = 1600
const STAGGER_DELAY = 125
const EASE_OUT_QUAD = [0.25, 0.46, 0.45, 0.94] as const

type WaveDirection = "ltr" | "rtl"

export type LogosCarouselProps = {
  children: ReactNode
  columnCount?: number
  direction?: WaveDirection
  className?: string
}

export function LogosCarousel({
  children,
  columnCount = DEFAULT_COLUMN_COUNT,
  direction = "ltr",
  className,
}: LogosCarouselProps) {
  const columns = useMemo(
    () => distributeLogos(Children.toArray(children), columnCount),
    [children, columnCount]
  )

  const reduceMotion = useReducedMotion() ?? false
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { margin: "100px", once: false })
  const shouldPlay = !reduceMotion && isInView

  const [activeIndices, setActiveIndices] = useState<number[]>(() =>
    columns.map(() => 0)
  )

  const columnsRef = useRef(columns)

  useEffect(() => {
    columnsRef.current = columns
    setActiveIndices(columns.map(() => 0))
  }, [columns])

  useEffect(() => {
    if (!shouldPlay) return

    const beatId = window.setInterval(() => {
      setActiveIndices((prev) =>
        columnsRef.current.map(
          (column, columnIndex) =>
            ((prev[columnIndex] ?? 0) + 1) % column.length
        )
      )
    }, CYCLE_INTERVAL)

    return () => window.clearInterval(beatId)
  }, [shouldPlay])

  return (
    <div
      ref={containerRef}
      data-slot="logos-carousel"
      className={cn("grid min-h-[220px]", className)}
      style={{
        gridTemplateColumns: `repeat(var(--column-count,${columns.length}), minmax(0, 1fr))`,
      }}
    >
      {columns.map((columnLogos, columnIndex) => {
        const waveIndex =
          direction === "rtl" ? columns.length - 1 - columnIndex : columnIndex

        return (
          <LogoColumn
            key={columnIndex}
            logos={columnLogos}
            columnIndex={columnIndex}
            waveIndex={waveIndex}
            activeIndex={(activeIndices[columnIndex] ?? 0) % columnLogos.length}
            reduceMotion={reduceMotion}
          />
        )
      })}
    </div>
  )
}

type LogoColumnProps = {
  logos: ReactNode[]
  columnIndex: number
  waveIndex: number
  activeIndex: number
  reduceMotion: boolean
}

const LogoColumn = memo(function LogoColumn({
  logos,
  columnIndex,
  waveIndex,
  activeIndex,
  reduceMotion,
}: LogoColumnProps) {
  const swapDelay = reduceMotion ? 0 : waveIndex * (STAGGER_DELAY / 1000)

  return (
    <motion.div
      data-slot="logos-carousel-column"
      className="relative flex min-h-[220px] items-center justify-center px-6"
      initial={
        reduceMotion ? false : { opacity: 0, y: "60%" }
      }
      animate={{ opacity: 1, y: "0%" }}
      transition={
        reduceMotion
          ? { duration: 0 }
          : {
              ease: EASE_OUT_QUAD,
              duration: 0.5,
              delay: swapDelay,
            }
      }
    >
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.div
          key={`${columnIndex}-${activeIndex}`}
          data-slot="logos-carousel-logo"
          className="flex min-h-24 w-full items-center justify-center"
          initial={
            reduceMotion
              ? false
              : {
                  y: "60%",
                  opacity: 0,
                  filter: "blur(2px)",
                }
          }
          animate={{
            y: "0%",
            opacity: 1,
            filter: "blur(0px)",
            transition: reduceMotion
              ? { duration: 0 }
              : { ease: EASE_OUT_QUAD, duration: 0.5, delay: swapDelay },
          }}
          exit={
            reduceMotion
              ? undefined
              : {
                  y: "-50%",
                  opacity: 0,
                  filter: "blur(3px)",
                  transition: {
                    ease: EASE_OUT_QUAD,
                    duration: 0.5,
                    delay: swapDelay,
                  },
                }
          }
        >
          {logos[activeIndex]}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  )
})

function distributeLogos(logos: ReactNode[], columnCount: number): ReactNode[][] {
  if (logos.length === 0) {
    return [[]]
  }

  const effectiveCount = Math.min(columnCount, logos.length)
  const columns: ReactNode[][] = Array.from({ length: effectiveCount }, () => [])

  logos.forEach((logo, index) => {
    const column = columns[index % effectiveCount]

    if (column) {
      column.push(logo)
    }
  })

  return columns
}
