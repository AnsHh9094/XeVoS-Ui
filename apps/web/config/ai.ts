/**
 * XeVoS UI — https://github.com/AnsHh9094/XeVoS-Ui
 * Copyright (c) 2026 Anand Ansh (AnsHh9094)
 * SPDX-License-Identifier: MIT
 * This notice must be retained in all copies or substantial portions (MIT License).
 */
export const AI_ASSISTANTS = [
    {
        name: 'ChatGPT',
        id: 'chatgpt',
        url: (prompt: string) => `https://chatgpt.com/?q=${encodeURIComponent(prompt)}`
    },
    {
        name: 'Claude',
        id: 'claude',
        url: (prompt: string) => `https://claude.ai/new?q=${encodeURIComponent(prompt)}`
    },
    {
        name: 'Scira',
        id: 'scira',
        url: (prompt: string) => `https://scira.app/?q=${encodeURIComponent(prompt)}`
    }
] 
