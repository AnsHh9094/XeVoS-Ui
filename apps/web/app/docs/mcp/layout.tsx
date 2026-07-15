/**
 * XeVoS UI — https://github.com/AnsHh9094/XeVoS-Ui
 * Copyright (c) 2026 Anand Ansh (AnsHh9094)
 * SPDX-License-Identifier: MIT
 * This notice must be retained in all copies or substantial portions (MIT License).
 */
import type { Metadata } from "next"
import { absoluteUrl } from "@/lib/site"

export const metadata: Metadata = {
  title: "Xevos UI MCP",
  description:
    "Set up Xevos UI's registry with MCP so AI coding tools can discover and install animated React UI components.",
  alternates: {
    canonical: absoluteUrl("/docs/mcp"),
  },
  openGraph: {
    title: "Xevos UI MCP",
    description:
      "Set up Xevos UI's registry with MCP so AI coding tools can discover and install animated React UI components.",
    url: absoluteUrl("/docs/mcp"),
  },
}

export default function McpLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 
