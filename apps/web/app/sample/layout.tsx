/**
 * XeVoS UI — https://github.com/AnsHh9094/XeVoS-Ui
 * Copyright (c) 2026 Anand Ansh (AnsHh9094)
 * SPDX-License-Identifier: MIT
 * This notice must be retained in all copies or substantial portions (MIT License).
 */
import type { Metadata } from "next"

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: true,
  },
}

export default function SampleLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 
