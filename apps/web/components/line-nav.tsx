"use client"

import { memo, useEffect, useRef } from "react"
import Link from "next/link"
import { motion } from "framer-motion"

import { cn } from "@/lib/utils"

const lineVariants = {
  normal: { width: 24 },
  active: { width: 40 },
  hover: { width: 40 },
}

export type LineNavItem = {
  title: string
  href: string
  /** Optional accessory rendered next to the title (e.g. a "NEW" badge). */
  accessory?: React.ReactNode
}

export type LineNavProps = {
  className?: string
  items: LineNavItem[]
  activeHref?: string
  scrollActiveIntoView?: boolean
  onItemClick?: (
    item: LineNavItem,
    event: React.MouseEvent<HTMLAnchorElement>
  ) => void
  onItemMouseEnter?: (
    item: LineNavItem,
    event: React.MouseEvent<HTMLAnchorElement>
  ) => void
  onItemMouseMove?: (event: React.MouseEvent<HTMLAnchorElement>) => void
  onItemMouseLeave?: (item: LineNavItem) => void
}

export function LineNav({
  className,
  items,
  activeHref,
  scrollActiveIntoView = false,
  onItemClick,
  onItemMouseEnter,
  onItemMouseMove,
  onItemMouseLeave,
}: LineNavProps) {
  const activeItemRef = useRef<HTMLAnchorElement | null>(null)

  useEffect(() => {
    if (scrollActiveIntoView) {
      activeItemRef.current?.scrollIntoView({ block: "center" })
    }
  }, [scrollActiveIntoView])

  return (
    <nav
      className={cn("flex flex-col gap-2 py-5", className)}
      style={
        {
          "--line-nav-width": `${lineVariants.normal.width}px`,
        } as React.CSSProperties
      }
    >
      {items.map((item, index) => {
        const isActive = item.href === activeHref

        return (
          <LineNavItem
            key={item.href}
            ref={isActive ? activeItemRef : undefined}
            title={item.title}
            href={item.href}
            active={isActive}
            isLast={index === items.length - 1}
            accessory={item.accessory}
            onClick={
              onItemClick ? (event) => onItemClick(item, event) : undefined
            }
            onMouseEnter={
              onItemMouseEnter
                ? (event) => onItemMouseEnter(item, event)
                : undefined
            }
            onMouseMove={onItemMouseMove}
            onMouseLeave={
              onItemMouseLeave ? () => onItemMouseLeave(item) : undefined
            }
          />
        )
      })}
    </nav>
  )
}

type LineNavItemProps = {
  ref?: React.Ref<HTMLAnchorElement>
  title: string
  href: string
  active?: boolean
  isLast?: boolean
  accessory?: React.ReactNode
  onClick?: React.MouseEventHandler<HTMLAnchorElement>
  onMouseEnter?: React.MouseEventHandler<HTMLAnchorElement>
  onMouseMove?: React.MouseEventHandler<HTMLAnchorElement>
  onMouseLeave?: React.MouseEventHandler<HTMLAnchorElement>
}

const MotionLink = motion.create(Link)

const LineNavItem = memo(function LineNavItem({
  ref,
  title,
  href,
  active = false,
  isLast = false,
  accessory,
  onClick,
  onMouseEnter,
  onMouseMove,
  onMouseLeave,
}: LineNavItemProps) {
  return (
    <>
      <MotionLink
        ref={ref}
        href={href}
        aria-current={active ? "page" : undefined}
        className="group relative flex h-px items-center gap-3 after:absolute after:top-1/2 after:left-0 after:size-full after:-translate-y-1/2 after:p-3.5"
        initial={false}
        animate={active ? "active" : "normal"}
        whileHover="hover"
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
      >
        <motion.span
          className="block h-px shrink-0 bg-foreground/20 transition-[background-color] ease-out group-hover:bg-foreground group-aria-[current=page]:bg-foreground"
          variants={lineVariants}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
        />
        <span className="text-sm whitespace-nowrap text-muted-foreground transition-[color] ease-out group-hover:text-foreground group-aria-[current=page]:text-foreground">
          {title}
        </span>
        {accessory && (
          <span className="ml-1 inline-flex items-center">{accessory}</span>
        )}
      </MotionLink>

      {!isLast && (
        <>
          <span className="block h-px w-(--line-nav-width) bg-foreground/20" />
          <span className="block h-px w-(--line-nav-width) bg-foreground/20" />
        </>
      )}
    </>
  )
})