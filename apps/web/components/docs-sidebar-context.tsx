/**
 * XeVoS UI — https://github.com/AnsHh9094/XeVoS-Ui
 * Copyright (c) 2026 Anand Ansh (AnsHh9094)
 * SPDX-License-Identifier: MIT
 * This notice must be retained in all copies or substantial portions (MIT License).
 */
"use client"

import * as React from "react"

type DocsSidebarContextValue = {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  open: () => void
  close: () => void
}

const DocsSidebarContext = React.createContext<DocsSidebarContextValue | null>(null)

export function DocsSidebarProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = React.useState(false)
  const open = React.useCallback(() => setIsOpen(true), [])
  const close = React.useCallback(() => setIsOpen(false), [])

  const value = React.useMemo(
    () => ({
      isOpen,
      setIsOpen,
      open,
      close,
    }),
    [isOpen, open, close]
  )

  return <DocsSidebarContext.Provider value={value}>{children}</DocsSidebarContext.Provider>
}

export function useDocsSidebar() {
  const context = React.useContext(DocsSidebarContext)
  if (!context) {
    throw new Error("useDocsSidebar must be used within DocsSidebarProvider")
  }
  return context
} 
