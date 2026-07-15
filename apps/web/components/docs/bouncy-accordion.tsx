/**
 * XeVoS UI — https://github.com/AnsHh9094/XeVoS-Ui
 * Copyright (c) 2026 Anand Ansh (AnsHh9094)
 * SPDX-License-Identifier: MIT
 * This notice must be retained in all copies or substantial portions (MIT License).
 */
import React from "react"
import { DocsPageLayout } from "@/components/docs-page-layout"
import { readComponentSource } from "@/lib/source-code"
import { BouncyAccordionPreview } from "@/components/docs/previews/bouncy-accordion-preview"

const defaultCode = `import { BouncyAccordion } from "@/components/ui/bouncy-accordion"
import { Bell, Shield } from "lucide-react"

const items = [
  {
    id: "security",
    title: "Security & Privacy",
    description: "Manage your password, two-factor authentication, and connected devices.",
    icon: <Shield className="h-4 w-4" />,
  },
  {
    id: "notifications",
    title: "Push Notifications",
    description: "Choose which product updates and activity alerts you want to receive.",
    icon: <Bell className="h-4 w-4" />,
  }
];

export default function App() {
  return <BouncyAccordion items={items} defaultValue="notifications" />
}`

export async function BouncyAccordionDocs() {
  const sourceCode = (await readComponentSource("bouncy-accordion")) || "// Unable to load source code"

  return (
    <DocsPageLayout
      title="Bouncy Accordion"
      description="An interactive, animated accordion component with playful physics, perfect for adding energy to navigation and details sections."
      preview={<BouncyAccordionPreview />}
      previewCode={defaultCode}
      installPackageName="bouncy-accordion"
      installDependencies="framer-motion lucide-react"
      installSourceCode={sourceCode}
      installSourceFilename="components/ui/bouncy-accordion.tsx"
      usageCode={defaultCode}
      props={[
        {
          name: "items",
          type: "BouncyAccordionItem[]",
          description: "Array of accordion items containing id, title, description, and optional icon.",
        },
        {
          name: "value",
          type: "string | null",
          description: "The controlled value of the active item.",
        },
        {
          name: "defaultValue",
          type: "string | null",
          default: "null",
          description: "The initial active item when uncontrolled.",
        },
        {
          name: "collapsible",
          type: "boolean",
          default: "true",
          description: "Whether the active item can be closed by clicking it again.",
        },
      ]}
    />
  )
}
