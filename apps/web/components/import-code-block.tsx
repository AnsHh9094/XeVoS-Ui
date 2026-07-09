interface ImportCodeBlockProps {
  html: string
}

export function ImportCodeBlock({ html }: ImportCodeBlockProps) {
  return (
    <div
      data-code-block
      data-line-numbers="false"
      className="overflow-hidden rounded-xl border border-border bg-zinc-100 text-sm dark:bg-zinc-900/50 [&_.shiki]:bg-transparent [&_pre]:overflow-x-auto [&_pre]:px-4 [&_pre]:py-3.5 [&_pre]:whitespace-pre"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
