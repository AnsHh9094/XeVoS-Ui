/**
 * XeVoS UI — https://github.com/AnsHh9094/XeVoS-Ui
 * Copyright (c) 2026 Anand Ansh (AnsHh9094)
 * SPDX-License-Identifier: MIT
 * This notice must be retained in all copies or substantial portions (MIT License).
 */
const R2_PREVIEW_HOST = "https://pub-a50e7f4ea75a4970a1738e50d53b6eb1.r2.dev"

export default function Head() {
  return (
    <>
      <link rel="preconnect" href={R2_PREVIEW_HOST} crossOrigin="anonymous" />
      <link rel="dns-prefetch" href={R2_PREVIEW_HOST} />
    </>
  )
} 
