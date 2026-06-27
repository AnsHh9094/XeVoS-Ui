export const siteConfig = {
  name: "Componentry",
  url: "https://componentry.fun",
  title: "Componentry — Animated React UI Components for Modern Apps",
  description:
    "Beautiful, animated, copy-paste React UI components built with Tailwind CSS, TypeScript, and Framer Motion. Free and open-source.",
  author: {
    name: "Harsh Jadhav",
    twitter: "https://twitter.com/harshjdhv",
    github: "https://github.com/harshjdhv",
    handle: "@harshjdhv",
  },
  repository: "https://github.com/harshjdhv/componentry",
} as const

export function absoluteUrl(path = "") {
  if (!path) return siteConfig.url
  return `${siteConfig.url}${path.startsWith("/") ? path : `/${path}`}`
}
