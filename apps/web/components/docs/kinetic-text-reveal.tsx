/**
 * XeVoS UI — https://github.com/AnsHh9094/XeVoS-Ui
 * Copyright (c) 2026 Anand Ansh (AnsHh9094)
 * SPDX-License-Identifier: MIT
 * This notice must be retained in all copies or substantial portions (MIT License).
 */
import React from "react";
import { KineticTextReveal } from "@workspace/ui/components/kinetic-text-reveal";
import { DocsPageLayout } from "@/components/docs-page-layout";
import { readComponentSource } from "@/lib/source-code";

const defaultCode = `import { KineticTextReveal } from "@/components/ui/kinetic-text-reveal"

<KineticTextReveal
  text="Interfaces that move with intent"
  className="text-4xl font-bold tracking-tight"
/>`;

const characterCode = `import { KineticTextReveal } from "@/components/ui/kinetic-text-reveal"

<KineticTextReveal
  text="Signal"
  splitBy="characters"
  stagger={0.06}
  distance={16}
  staggerFrom="center"
  className="text-5xl font-bold tracking-tight"
/>`;

const lineCode = `import { KineticTextReveal } from "@/components/ui/kinetic-text-reveal"

<KineticTextReveal
  text={"Launch faster\\nPolish deeper\\nShip calmer"}
  splitBy="lines"
  direction="right"
  stagger={0.14}
  distance={22}
  className="text-4xl font-semibold leading-tight"
/>`;

const edgeCode = `import { KineticTextReveal } from "@/components/ui/kinetic-text-reveal"

<KineticTextReveal
  text="Designed from the edges inward"
  staggerFrom="edges"
  direction="down"
  stagger={0.085}
  distance={24}
  className="text-4xl font-bold tracking-tight"
/>`;

const subtleCode = `import { KineticTextReveal } from "@/components/ui/kinetic-text-reveal"

<KineticTextReveal
  text="Quiet motion for product surfaces"
  blur={false}
  distance={12}
  stagger={0.055}
  transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
  className="text-3xl font-medium"
/>`;

export async function KineticTextRevealDocs() {
  const sourceCode =
    (await readComponentSource("kinetic-text-reveal")) ||
    "// Unable to load source code";

  return (
    <DocsPageLayout
      title="Kinetic Text Reveal"
      description="A polished text reveal that splits copy by words, characters, or lines, then brings each segment in with readable directional motion, soft blur, and configurable stagger timing."
      preview={
        <KineticTextReveal
          text="Interfaces that move with intent"
          className="text-center text-4xl font-bold tracking-tight text-foreground md:text-5xl"
        />
      }
      previewCode={defaultCode}
      installPackageName="kinetic-text-reveal"
      installDependencies="framer-motion clsx tailwind-merge"
      installSourceCode={sourceCode}
      usageCode={defaultCode}
      examples={[
        {
          title: "Character Center Wave",
          preview: (
            <KineticTextReveal
              text="Signal"
              splitBy="characters"
              stagger={0.06}
              distance={16}
              staggerFrom="center"
              className="text-5xl font-bold tracking-tight text-foreground"
            />
          ),
          code: characterCode,
        },
        {
          title: "Line Stack",
          preview: (
            <KineticTextReveal
              text={"Launch faster\nPolish deeper\nShip calmer"}
              splitBy="lines"
              direction="right"
              stagger={0.14}
              distance={22}
              className="text-4xl font-semibold leading-tight text-foreground"
            />
          ),
          code: lineCode,
        },
        {
          title: "Edge Stagger",
          preview: (
            <KineticTextReveal
              text="Designed from the edges inward"
              staggerFrom="edges"
              direction="down"
              stagger={0.085}
              distance={24}
              className="text-center text-4xl font-bold tracking-tight text-foreground"
            />
          ),
          code: edgeCode,
        },
        {
          title: "Subtle Product Motion",
          preview: (
            <KineticTextReveal
              text="Quiet motion for product surfaces"
              blur={false}
              distance={12}
              stagger={0.055}
              transition={{
                duration: 0.65,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="text-center text-3xl font-medium text-foreground"
            />
          ),
          code: subtleCode,
        },
      ]}
      props={[
        {
          name: "text",
          type: "string",
          description: "The text content to reveal.",
        },
        {
          name: "splitBy",
          type: '"words" | "characters" | "lines"',
          default: '"words"',
          description: "How the text is segmented before animation.",
        },
        {
          name: "direction",
          type: '"up" | "down" | "left" | "right"',
          default: '"up"',
          description: "Direction each segment travels from.",
        },
        {
          name: "distance",
          type: "number",
          default: "20",
          description: "Travel distance in pixels for hidden segments.",
        },
        {
          name: "stagger",
          type: "number",
          default: "0.075",
          description: "Delay in seconds between animated segments.",
        },
        {
          name: "staggerFrom",
          type: '"start" | "end" | "center" | "edges" | "random" | number',
          default: '"start"',
          description: "Origin point for the stagger wave.",
        },
        {
          name: "transition",
          type: "Transition",
          description: "Framer Motion transition for each animated segment.",
        },
        {
          name: "blur",
          type: "boolean",
          default: "true",
          description: "Whether hidden segments start blurred.",
        },
        {
          name: "autoPlay",
          type: "boolean",
          default: "true",
          description: "Starts the reveal automatically after mount.",
        },
        {
          name: "delay",
          type: "number",
          default: "0",
          description: "Automatic reveal delay in seconds.",
        },
        {
          name: "className",
          type: "string",
          description: "Additional CSS classes for the outer element.",
        },
        {
          name: "segmentClassName",
          type: "string",
          description: "CSS classes applied to each animated text segment.",
        },
        {
          name: "maskClassName",
          type: "string",
          description: "CSS classes applied to each clipping wrapper.",
        },
        {
          name: "onRevealStart",
          type: "() => void",
          description: "Callback fired when the reveal begins.",
        },
        {
          name: "onRevealComplete",
          type: "() => void",
          description: "Callback fired after the last segment completes.",
        },
      ]}
    />
  );
}
