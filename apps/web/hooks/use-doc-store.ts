/**
 * XeVoS UI — https://github.com/AnsHh9094/XeVoS-Ui
 * Copyright (c) 2026 Anand Ansh (AnsHh9094)
 * SPDX-License-Identifier: MIT
 * This notice must be retained in all copies or substantial portions (MIT License).
 */
import { create } from 'zustand'

interface DocStore {
  activeVariantIndex: number
  setActiveVariantIndex: (index: number) => void
}

export const useDocStore = create<DocStore>((set) => ({
  activeVariantIndex: -1,
  setActiveVariantIndex: (index) => set({ activeVariantIndex: index }),
}))
