/**
 * XeVoS UI — https://github.com/AnsHh9094/XeVoS-Ui
 * Copyright (c) 2026 Anand Ansh (AnsHh9094)
 * SPDX-License-Identifier: MIT
 * This notice must be retained in all copies or substantial portions (MIT License).
 */
interface ImportCodeBlockProps {
  html: string
}

export function ImportCodeBlock({ html }: ImportCodeBlockProps) {
  return (
    <div
      data-code-block
      data-line-numbers="false"
      className="overflow-hidden rounded-xl border border-border bg-zinc-100 text-sm dark:bg-zinc-900/50 [&_.shiki]:bg-transparent [&_pre]:whitespace-pre-wrap [&_pre]:break-words [&_pre]:px-4 [&_pre]:py-3.5"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
