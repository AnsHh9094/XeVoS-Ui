import React from "react"
import {
  EyeTrackingDemo,
  EyeTrackingCartoonDemo,
  EyeTrackingCyberDemo,
  EyeTrackingMinimalDemo,
  EyeTrackingTripleDemo,
  EyeTrackingBrownDemo,
} from "@/components/docs/previews/eye-tracking-preview"
import { DocsPageLayout } from "@/components/docs-page-layout"
import { readComponentSource } from "@/lib/source-code"

const defaultCode = `import { EyeTracking } from "@/components/ui/eye-tracking"

<EyeTracking eyeSize={140} gap={50} />`

const cartoonCode = `import { EyeTracking } from "@/components/ui/eye-tracking"

<EyeTracking
  variant="cartoon"
  eyeSize={160}
  gap={30}
  irisColor="#3B82F6"
  irisColorSecondary="#60A5FA"
  pupilRange={0.8}
/>`

const cyberCode = `import { EyeTracking } from "@/components/ui/eye-tracking"

<EyeTracking
  variant="cyber"
  eyeSize={130}
  gap={60}
/>`

const minimalCode = `import { EyeTracking } from "@/components/ui/eye-tracking"

<EyeTracking
  variant="minimal"
  eyeSize={100}
  gap={30}
  irisColor="#18181B"
  irisColorSecondary="#3F3F46"
  showIrisDetail={false}
  showEyelids={false}
/>`

const tripleEyeCode = `import { EyeTracking } from "@/components/ui/eye-tracking"

<EyeTracking
  eyeCount={3}
  eyeSize={100}
  gap={30}
  irisColor="#8B5CF6"
  irisColorSecondary="#A78BFA"
/>`

const brownEyeCode = `import { EyeTracking } from "@/components/ui/eye-tracking"

<EyeTracking
  eyeSize={150}
  gap={45}
  irisColor="#6B3A1F"
  irisColorSecondary="#D4A574"
  blinkInterval={3000}
/>`

export async function EyeTrackingDocs() {
  const sourceCode =
    (await readComponentSource("eye-tracking")) ||
    "// Unable to load source code"

  return (
    <DocsPageLayout
      title="Eye Tracking"
      description="Hyper-realistic eyes that follow your cursor with smooth spring physics, reactive pupil dilation, natural blinking, and multiple stunning variants. Move your mouse around to see the magic."
      preview={<EyeTrackingDemo />}
      previewCode={defaultCode}
      installPackageName="eye-tracking"
      installDependencies="framer-motion clsx tailwind-merge"
      installSourceCode={sourceCode}
      usageCode={defaultCode}
      examples={[
        {
          title: "Cartoon Variant",
          preview: <EyeTrackingCartoonDemo />,
          code: cartoonCode,
        },
        {
          title: "Cyber Variant",
          preview: <EyeTrackingCyberDemo />,
          code: cyberCode,
        },
        {
          title: "Minimal Variant",
          preview: <EyeTrackingMinimalDemo />,
          code: minimalCode,
        },
        {
          title: "Three Eyes",
          preview: <EyeTrackingTripleDemo />,
          code: tripleEyeCode,
        },
        {
          title: "Brown Eyes",
          preview: <EyeTrackingBrownDemo />,
          code: brownEyeCode,
        },
      ]}
      props={[
        {
          name: "eyeSize",
          type: "number",
          default: "120",
          description: "Size of each eye in pixels.",
        },
        {
          name: "gap",
          type: "number",
          default: "40",
          description: "Gap between eyes in pixels.",
        },
        {
          name: "variant",
          type: '"realistic" | "cartoon" | "minimal" | "cyber"',
          default: '"realistic"',
          description: "Visual style variant.",
        },
        {
          name: "irisColor",
          type: "string",
          default: '"#4A6741"',
          description: "Primary iris color.",
        },
        {
          name: "irisColorSecondary",
          type: "string",
          default: '"#6B8F62"',
          description: "Secondary iris color for gradient.",
        },
        {
          name: "pupilColor",
          type: "string",
          default: '"#0a0a0a"',
          description: "Color of the pupil.",
        },
        {
          name: "scleraColor",
          type: "string",
          default: '"#F5F0EB"',
          description: "Color of the sclera (white of the eye).",
        },
        {
          name: "pupilRange",
          type: "number",
          default: "0.7",
          description: "How far the pupil can travel (0-1).",
        },
        {
          name: "eyeCount",
          type: "number",
          default: "2",
          description: "Number of eyes to render.",
        },
        {
          name: "showReflection",
          type: "boolean",
          default: "true",
          description: "Show light reflection glint on the eye.",
        },
        {
          name: "showIrisDetail",
          type: "boolean",
          default: "true",
          description: "Show iris fiber/pattern details.",
        },
        {
          name: "reactivePupil",
          type: "boolean",
          default: "true",
          description: "Pupil dilates based on cursor proximity.",
        },
        {
          name: "showEyelids",
          type: "boolean",
          default: "true",
          description: "Show eyelid shadow gradients.",
        },
        {
          name: "blinkInterval",
          type: "number",
          default: "4000",
          description: "Blink interval in ms. Set to 0 to disable.",
        },
        {
          name: "idleAnimation",
          type: "boolean",
          default: "true",
          description: "Subtle random movement when cursor is idle.",
        },
        {
          name: "className",
          type: "string",
          description: "Additional CSS classes.",
        },
      ]}
    />
  )
}
