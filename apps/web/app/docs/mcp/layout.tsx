import type { Metadata } from "next"
import { absoluteUrl } from "@/lib/site"

export const metadata: Metadata = {
  title: "Componentry MCP",
  description:
    "Set up Componentry's registry with MCP so AI coding tools can discover and install animated React UI components.",
  alternates: {
    canonical: absoluteUrl("/docs/mcp"),
  },
  openGraph: {
    title: "Componentry MCP",
    description:
      "Set up Componentry's registry with MCP so AI coding tools can discover and install animated React UI components.",
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
