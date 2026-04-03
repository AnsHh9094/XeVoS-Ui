import React from "react";
import { DocsPageLayout } from "@/components/docs-page-layout";
import { ScrollSplitCardPreview } from "@/components/docs/previews/scroll-split-card-preview";

const usageCode = `import { useRef } from "react"
import { ScrollSplitCard } from "@/components/ui/scroll-split-card"

export function Example() {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <div ref={containerRef} className="h-full w-full overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      <ScrollSplitCard
        containerRef={containerRef}
        imageSrc="https://images.unsplash.com/photo-1773058373644-74e4120bfc77?q=80&w=2832&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        cards={[
        {
          title: "Going Zero to One",
          description: "If you've navigating a new business... breaking into a new market.",
          bgColor: "#e2e2e2",
          textColor: "#111111"
        },
        {
          title: "Scaling from One to N",
          description: "If you've achieved Product/Market Fit...",
          bgColor: "#1a5bcf",
          textColor: "#ffffff"
        },
        {
          title: "Need Quick Solutions",
          description: "If you know exactly what you want and need...",
          bgColor: "#1c1c1c",
          textColor: "#ffffff"
        }
      ]}
    />
  )
}`;

const previewCode = `import { useRef } from "react"
import { ScrollSplitCard } from "@/components/ui/scroll-split-card"

export function ScrollSplitCardPreview() {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <div ref={containerRef} className="w-full h-full overflow-y-auto relative [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      <ScrollSplitCard
        containerRef={containerRef}
        className="h-[250vh]"
        imageSrc="https://images.unsplash.com/photo-1773058373644-74e4120bfc77?q=80&w=2832&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        cards={[
          { title: "Going Zero to One", description: "...", bgColor: "#e2e2e2", textColor: "#111111" },
          { title: "Scaling from One to N", description: "...", bgColor: "#1a5bcf", textColor: "#ffffff" },
          { title: "Need Quick Solutions", description: "...", bgColor: "#1c1c1c", textColor: "#ffffff" }
        ]}
      />
    </div>
  )
}`;

export async function ScrollSplitCardDocs() {
  return (
    <DocsPageLayout
      title="Scroll Split Card"
      description="A scroll-driven interactive card component that separates into three panels and flips to reveal custom content, inspired by high-end landing page motion."
      preview={<ScrollSplitCardPreview />}
      previewCode={previewCode}
      installPackageName="scroll-split-card"
      usageCode={usageCode}
      fullWidthPreview={true}
    />
  );
}
