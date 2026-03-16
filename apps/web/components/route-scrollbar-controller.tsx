"use client"

import { usePathname } from "next/navigation"
import { useEffect } from "react"

export function RouteScrollbarController() {
  const pathname = usePathname()

  useEffect(() => {
    const shouldHide = pathname === "/" || pathname.startsWith("/docs")
    const html = document.documentElement
    const body = document.body

    if (shouldHide) {
      html.classList.add("route-hide-scrollbar")
      body.classList.add("route-hide-scrollbar")
    } else {
      html.classList.remove("route-hide-scrollbar")
      body.classList.remove("route-hide-scrollbar")
    }

    return () => {
      html.classList.remove("route-hide-scrollbar")
      body.classList.remove("route-hide-scrollbar")
    }
  }, [pathname])

  return null
}
