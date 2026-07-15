/**
 * XeVoS UI — https://github.com/AnsHh9094/XeVoS-Ui
 * Copyright (c) 2026 Anand Ansh (AnsHh9094)
 * SPDX-License-Identifier: MIT
 * This notice must be retained in all copies or substantial portions (MIT License).
 */
import { absoluteUrl, siteConfig } from "@/lib/site"

export function JsonLd() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    logo: absoluteUrl("/icon.svg"),
    sameAs: [
      siteConfig.repository,
      siteConfig.author.twitter,
    ],
    founder: {
      "@type": "Person",
      name: siteConfig.author.name,
      url: siteConfig.author.twitter,
      sameAs: [
        siteConfig.author.twitter,
        siteConfig.author.github,
      ],
    },
  }

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    alternateName: ["Xevos UI UI", "Xevos UI Components"],
    url: siteConfig.url,
    description: siteConfig.description,
    publisher: {
      "@type": "Person",
      name: siteConfig.author.name,
      url: siteConfig.author.twitter,
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteConfig.url}/docs?search={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  }

  const softwareApplicationSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    codeRepository: siteConfig.repository,
    programmingLanguage: ["TypeScript", "JavaScript", "React", "CSS"],
    runtimePlatform: "Node.js",
    author: {
      "@type": "Person",
      name: siteConfig.author.name,
      url: siteConfig.author.twitter,
    },
    license: "https://opensource.org/licenses/MIT",
    operatingSystem: "Cross-platform",
    applicationCategory: "DeveloperApplication",
    keywords:
      "React, UI components, Tailwind CSS, TypeScript, Framer Motion, Next.js, component library",
  }

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.author.name,
    alternateName: ["AnsHh9094", "Harsh"],
    url: siteConfig.author.twitter,
    jobTitle: "Frontend Developer",
    knowsAbout: [
      "React",
      "TypeScript",
      "JavaScript",
      "Tailwind CSS",
      "Next.js",
      "UI/UX Design",
      "Web Development",
      "Frontend Development",
    ],
    sameAs: [
      siteConfig.author.twitter,
      siteConfig.author.github,
      siteConfig.url,
    ],
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": siteConfig.url,
    },
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteConfig.url,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Components",
        item: absoluteUrl("/docs"),
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(softwareApplicationSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  )
}
