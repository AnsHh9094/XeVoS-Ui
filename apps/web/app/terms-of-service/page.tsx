/**
 * XeVoS UI — https://github.com/AnsHh9094/XeVoS-Ui
 * Copyright (c) 2026 Anand Ansh (AnsHh9094)
 * SPDX-License-Identifier: MIT
 * This notice must be retained in all copies or substantial portions (MIT License).
 */
"use client"

import React from "react"
import { SiteHeader } from "@/components/site-header"
import { Footer } from "@/components/footer"

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen w-full bg-white dark:bg-[#09090B] text-zinc-900 dark:text-zinc-100 flex flex-col">
      <SiteHeader />

      <main className="flex-grow w-full max-w-3xl mx-auto px-6 py-32 md:py-40">
        <h1 className="text-3xl md:text-5xl font-semibold tracking-tight mb-4">Terms of Service</h1>
        <p className="text-zinc-500 dark:text-zinc-400 mb-12">Last updated: June 20, 2026</p>

        <div className="space-y-8 text-zinc-700 dark:text-zinc-300 leading-relaxed">
          <section>
            <h2 className="text-xl font-medium text-zinc-900 dark:text-zinc-100 mb-4">1. Acceptance of Terms</h2>
            <p>
              By accessing and using Xevos UI ("the Service"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-zinc-900 dark:text-zinc-100 mb-4">2. Use License</h2>
            <p className="mb-4">
              Xevos UI provides open-source UI components. The components and code snippets are generally provided under the MIT License unless otherwise specified. For the website content and design itself, permission is granted to temporarily access the materials for personal, non-commercial transitory viewing only.
            </p>
            <p>You may not:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Use the website's proprietary design or branding materials for any commercial purpose.</li>
              <li>Attempt to decompile or reverse engineer the proprietary aspects of the Xevos UI platform.</li>
              <li>Remove any copyright or other proprietary notations from the materials.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-medium text-zinc-900 dark:text-zinc-100 mb-4">3. Disclaimer</h2>
            <p>
              The materials on Xevos UI are provided on an 'as is' basis. Xevos UI makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-zinc-900 dark:text-zinc-100 mb-4">4. Limitations</h2>
            <p>
              In no event shall Xevos UI or its maintainers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Xevos UI, even if a representative has been notified orally or in writing of the possibility of such damage.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-zinc-900 dark:text-zinc-100 mb-4">5. Accuracy of Materials</h2>
            <p>
              The materials appearing on Xevos UI could include technical, typographical, or photographic errors. Xevos UI does not warrant that any of the materials on its website are accurate, complete, or current. Xevos UI may make changes to the materials contained on its website at any time without notice.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-zinc-900 dark:text-zinc-100 mb-4">6. Links</h2>
            <p>
              Xevos UI has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by Xevos UI of the site. Use of any such linked website is at the user's own risk.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-zinc-900 dark:text-zinc-100 mb-4">7. Modifications</h2>
            <p>
              Xevos UI may revise these terms of service for its website at any time without notice. By using this website you are agreeing to be bound by the then current version of these terms of service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-zinc-900 dark:text-zinc-100 mb-4">8. Contact Information</h2>
            <p>
              If you have any questions about these Terms of Service, please contact us at hello@xevos-ui.fun or via Twitter/X at @AnsHh9094.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  )
} 
