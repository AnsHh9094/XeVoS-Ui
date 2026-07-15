/**
 * XeVoS UI — https://github.com/AnsHh9094/XeVoS-Ui
 * Copyright (c) 2026 Anand Ansh (AnsHh9094)
 * SPDX-License-Identifier: MIT
 * This notice must be retained in all copies or substantial portions (MIT License).
 */
export function BlocksHeading({
  title,
  description,
}: {
  title: string
  description: string
}) {
  return (
    <section className="px-4 py-12 md:px-0 lg:py-16">
      <h1 className="inline-block text-3xl font-semibold leading-[1.05] tracking-[-0.04em] text-zinc-900 dark:text-white sm:text-4xl">
        {title}
      </h1>
      <p className="mt-3 max-w-2xl text-pretty text-sm font-medium tracking-tight text-zinc-400 sm:text-base dark:text-zinc-600">
        {description}
      </p>
    </section>
  )
} 
