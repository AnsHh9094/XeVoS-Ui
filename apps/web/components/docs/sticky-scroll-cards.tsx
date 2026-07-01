import React from "react";
import { DocsPageLayout } from "@/components/docs-page-layout";
import { readComponentSource } from "@/lib/source-code";
import { StickyScrollCardsPreview } from "@/components/docs/previews/sticky-scroll-cards-preview";

const defaultCode = `import { StickyScrollCards } from "@/components/ui/sticky-scroll-cards"

export default function Page() {
  return <StickyScrollCards />
}`;

export async function StickyScrollCardsDocs() {
  const sourceCode =
    (await readComponentSource("sticky-scroll-cards")) ||
    "// Unable to load source code";

  return (
    <DocsPageLayout
      title="Sticky Scroll Cards"
      description="A scroll-driven card stack where images pin in place and scale down as you scroll, creating a satisfying layered depth effect."
      fullWidthPreview
      preview={
        <StickyScrollCardsPreview
          src="/demo/sticky-scroll-cards"
          title="Sticky Scroll Cards Demo"
        />
      }
      previewCode={defaultCode}
      installPackageName="sticky-scroll-cards"
      installDependencies="framer-motion lenis"
      installSourceCode={sourceCode}
      installSourceFilename="components/ui/sticky-scroll-cards.tsx"
      usageCode={defaultCode}
      props={[
        {
          name: "cards",
          type: "StickyScrollCardItem[]",
          description:
            "Array of card objects. Each item requires a title (string) and src (image URL). Defaults to 5 Unsplash landscape photos.",
        },
        {
          name: "hint",
          type: "string",
          default: '"scroll down to see card stack"',
          description: "Short hint label shown above the card stack before scrolling begins.",
        },
        {
          name: "className",
          type: "string",
          description: "Additional CSS classes applied to the outer container.",
        },
      ]}
    />
  );
}
