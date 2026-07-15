/**
 * XeVoS UI — https://github.com/AnsHh9094/XeVoS-Ui
 * Copyright (c) 2026 Anand Ansh (AnsHh9094)
 * SPDX-License-Identifier: MIT
 * This notice must be retained in all copies or substantial portions (MIT License).
 */
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
