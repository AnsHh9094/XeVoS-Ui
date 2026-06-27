import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Blocks",
  description: "Pre-built Componentry blocks for React applications.",
  robots: {
    index: false,
    follow: true,
  },
}

export default function BlocksLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
