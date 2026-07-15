/**
 * XeVoS UI — https://github.com/AnsHh9094/XeVoS-Ui
 * Copyright (c) 2026 Anand Ansh (AnsHh9094)
 * SPDX-License-Identifier: MIT
 * This notice must be retained in all copies or substantial portions (MIT License).
 */
"use client"

import * as React from "react"

export function useSmoothCodeHeight(deps: React.DependencyList) {
  const contentRef = React.useRef<HTMLDivElement>(null)
  const [contentHeight, setContentHeight] = React.useState<number | undefined>(undefined)

  const measureHeight = React.useCallback(() => {
    const el = contentRef.current
    if (el) {
      setContentHeight(el.scrollHeight)
    }
  }, [])

  React.useLayoutEffect(() => {
    measureHeight()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  React.useEffect(() => {
    const el = contentRef.current
    if (!el) return

    const observer = new ResizeObserver(measureHeight)
    observer.observe(el)
    return () => observer.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [measureHeight, ...deps])

  return {
    contentRef,
    contentHeight,
    wrapperProps: {
      className: "overflow-hidden transition-[height] duration-200 ease-out",
      style: { height: contentHeight !== undefined ? contentHeight : ("auto" as const) },
    },
  }
}
