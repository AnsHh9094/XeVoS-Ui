/**
 * XeVoS UI — https://github.com/AnsHh9094/XeVoS-Ui
 * Copyright (c) 2026 Anand Ansh (AnsHh9094)
 * SPDX-License-Identifier: MIT
 * This notice must be retained in all copies or substantial portions (MIT License).
 */
"use client";

import {
  Bell,
  Blocks,
  CreditCard,
  Settings2,
  Shield,
  User,
} from "lucide-react";
import { BouncyAccordion } from "@workspace/ui/components/bouncy-accordion";

const items = [
  {
    id: "profile",
    title: "Profile Details",
    description: "Update your personal information, avatar, and preferred language settings.",
    icon: <User className="h-4 w-4" />,
  },
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
  },
  {
    id: "billing",
    title: "Billing & Plans",
    description: "View past invoices, update payment methods, and change your subscription.",
    icon: <CreditCard className="h-4 w-4" />,
  },
  {
    id: "integrations",
    title: "Integrations",
    description: "Connect your favorite tools, configure webhooks, and automate workflows.",
    icon: <Blocks className="h-4 w-4" />,
  },
  {
    id: "advanced",
    title: "Advanced Settings",
    description: "Configure developer API keys, export account data, and danger zone actions.",
    icon: <Settings2 className="h-4 w-4" />,
  },
];

export function BouncyAccordionPreview() {
  return (
    <div className="flex min-h-96 w-full items-center justify-center">
      <div className="w-full max-w-sm h-[480px]">
        <BouncyAccordion items={items} defaultValue="notifications" />
      </div>
    </div>
  );
} 
