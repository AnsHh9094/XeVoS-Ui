export function BlocksHeading({
  title,
  description,
}: {
  title: string
  description: string
}) {
  return (
    <section className="px-4 py-12 md:px-0 lg:py-16">
      <h1 className="mb-2 inline-block text-4xl font-semibold leading-[1.1] tracking-tight text-zinc-900 lg:text-5xl dark:text-zinc-100">
        {title}
      </h1>
      <p className="mt-1 max-w-2xl text-pretty text-lg font-normal leading-relaxed text-muted-foreground/90">
        {description}
      </p>
    </section>
  )
}
