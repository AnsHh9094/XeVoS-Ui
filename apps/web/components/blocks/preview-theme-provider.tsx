/**
 * XeVoS UI — https://github.com/AnsHh9094/XeVoS-Ui
 * Copyright (c) 2026 Anand Ansh (AnsHh9094)
 * SPDX-License-Identifier: MIT
 * This notice must be retained in all copies or substantial portions (MIT License).
 */
"use client"

import * as React from "react"
import { useSearchParams } from "next/navigation"

import { getBlockTheme } from "@/lib/blocks/theme"

export function PreviewThemeProvider({
  theme,
  children,
}: {
  theme?: string | null
  children: React.ReactNode
}) {
  const searchParams = useSearchParams()
  const selectedTheme = getBlockTheme(searchParams.get("theme") ?? theme)

  React.useEffect(() => {
    document.documentElement.classList.toggle(
      "dark",
      selectedTheme.className === "dark"
    )
  }, [selectedTheme.className])

  return (
    <div
      className={selectedTheme.className}
      style={selectedTheme.style as React.CSSProperties}
    >
      {children}
    </div>
  )
}
