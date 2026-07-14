"use client"

import * as React from "react"

import { getBlockTheme } from "@/lib/blocks/theme"

export function PreviewThemeProvider({
  theme,
  children,
}: {
  theme?: string | null
  children: React.ReactNode
}) {
  const selectedTheme = getBlockTheme(theme)

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
