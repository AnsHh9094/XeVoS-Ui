"use client"

import * as React from "react"
import {
  INSTALL_COMMANDS,
  PackageManagerCommand,
  type PackageManager,
} from "@/components/package-manager-command"

interface InstallCommandProps {
  component: string
}

export function InstallCommand({ component }: InstallCommandProps) {
  const registryNamespace = process.env.NEXT_PUBLIC_REGISTRY_NAMESPACE || "@componentry"
  const componentRef = component.startsWith("@")
    ? component
    : `${registryNamespace}/${component}`

  const getCommand = React.useCallback(
    (pm: PackageManager) => `${INSTALL_COMMANDS[pm]} ${componentRef}`,
    [componentRef]
  )

  return <PackageManagerCommand getCommand={getCommand} />
}
