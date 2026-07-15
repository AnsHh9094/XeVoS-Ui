/**
 * XeVoS UI — https://github.com/AnsHh9094/XeVoS-Ui
 * Copyright (c) 2026 Anand Ansh (AnsHh9094)
 * SPDX-License-Identifier: MIT
 * This notice must be retained in all copies or substantial portions (MIT License).
 */
"use client";

import { MagnetLines } from "@workspace/ui/components/magnet-lines";

export function MagnetLinesDemo() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <MagnetLines
        rows={9}
        columns={9}
        containerSize="60vmin"
        lineColor="currentColor"
        lineWidth="0.8vmin"
        lineHeight="5vmin"
        baseAngle={0}
        className="text-foreground"
      />
    </div>
  );
}
