/**
 * XeVoS UI — https://github.com/AnsHh9094/XeVoS-Ui
 * Copyright (c) 2026 Anand Ansh (AnsHh9094)
 * SPDX-License-Identifier: MIT
 * This notice must be retained in all copies or substantial portions (MIT License).
 */
function isCompleteImportBlock(text: string): boolean {
  const trimmed = text.trim()
  if (!trimmed.startsWith("import")) return false

  // Side-effect: import "module" or import 'module'
  if (/^import\s+["'][^"']+["']\s*;?\s*$/.test(trimmed)) return true

  // import ... from "path" (semicolon optional)
  if (/from\s+["'][^"']+["']\s*;?\s*$/.test(trimmed)) return true

  return false
}

export function splitImportAndUsage(code: string): {
  importCode: string
  usageCode: string
} {
  const trimmed = code.trim()
  if (!trimmed) {
    return { importCode: "", usageCode: "" }
  }

  const lines = trimmed.split("\n")
  const importLines: string[] = []
  let i = 0

  while (i < lines.length && lines[i]?.trim() === "") i++

  while (i < lines.length) {
    const line = lines[i] ?? ""
    const trimmedLine = line.trim()

    if (trimmedLine === "") {
      if (importLines.length > 0 && isCompleteImportBlock(importLines.join("\n"))) {
        i++
        break
      }
      i++
      continue
    }

    if (trimmedLine.startsWith("import ")) {
      importLines.push(line)
      i++

      if (isCompleteImportBlock(importLines.join("\n"))) {
        while (i < lines.length) {
          const next = lines[i]?.trim() ?? ""
          if (next === "") {
            i++
            break
          }
          if (next.startsWith("import ")) {
            importLines.push(lines[i] ?? "")
            i++
            if (!isCompleteImportBlock(importLines.join("\n"))) {
              continue
            }
            continue
          }
          break
        }
        break
      }
      continue
    }

    if (importLines.length > 0 && !isCompleteImportBlock(importLines.join("\n"))) {
      importLines.push(line)
      i++
      continue
    }

    break
  }

  while (i < lines.length && lines[i]?.trim() === "") i++

  const importCode = importLines.join("\n").trim()
  const usageCode = lines.slice(i).join("\n").trim()

  return { importCode, usageCode }
}

/** Strip leading import block; returns full code if none found. */
export function stripImportFromCode(code: string): string {
  const { usageCode } = splitImportAndUsage(code)
  return usageCode || code.trim()
} 
