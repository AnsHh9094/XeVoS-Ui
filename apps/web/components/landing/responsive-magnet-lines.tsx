/**
 * XeVoS UI — https://github.com/AnsHh9094/XeVoS-Ui
 * Copyright (c) 2026 Anand Ansh (AnsHh9094)
 * SPDX-License-Identifier: MIT
 * This notice must be retained in all copies or substantial portions (MIT License).
 */
"use client"

import { useEffect, useState } from "react"
import { MagnetLines } from "@workspace/ui/components/magnet-lines"

type MagnetLinesProps = React.ComponentProps<typeof MagnetLines>

export function ResponsiveMagnetLines(props: Omit<MagnetLinesProps, "columns">) {
  const [columns, setColumns] = useState(12)

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)")
    const update = () => setColumns(mq.matches ? 22 : 12)
    update()
    mq.addEventListener("change", update)
    return () => mq.removeEventListener("change", update)
  }, [])

  return <MagnetLines {...props} columns={columns} />
} 
