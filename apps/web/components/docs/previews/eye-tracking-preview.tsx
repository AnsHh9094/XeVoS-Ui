"use client"

import * as React from "react"
import { EyeTracking } from "@workspace/ui/components/eye-tracking"

export function EyeTrackingDemo() {
  return (
    <div className="flex min-h-[350px] w-full items-center justify-center">
      <EyeTracking eyeSize={140} gap={50} />
    </div>
  )
}

export function EyeTrackingCartoonDemo() {
  return (
    <div className="flex min-h-[300px] w-full items-center justify-center">
      <EyeTracking
        variant="cartoon"
        eyeSize={160}
        gap={30}
        irisColor="#3B82F6"
        irisColorSecondary="#60A5FA"
        pupilRange={0.8}
      />
    </div>
  )
}

export function EyeTrackingCyberDemo() {
  return (
    <div className="flex min-h-[300px] w-full items-center justify-center">
      <EyeTracking
        variant="cyber"
        eyeSize={130}
        gap={60}
      />
    </div>
  )
}

export function EyeTrackingMinimalDemo() {
  return (
    <div className="flex min-h-[300px] w-full items-center justify-center">
      <EyeTracking
        variant="minimal"
        eyeSize={100}
        gap={30}
        irisColor="#18181B"
        irisColorSecondary="#3F3F46"
        showIrisDetail={false}
        showEyelids={false}
        showReflection={true}
      />
    </div>
  )
}

export function EyeTrackingTripleDemo() {
  return (
    <div className="flex min-h-[300px] w-full items-center justify-center">
      <EyeTracking
        eyeCount={3}
        eyeSize={100}
        gap={30}
        irisColor="#8B5CF6"
        irisColorSecondary="#A78BFA"
      />
    </div>
  )
}

export function EyeTrackingBrownDemo() {
  return (
    <div className="flex min-h-[300px] w-full items-center justify-center">
      <EyeTracking
        eyeSize={150}
        gap={45}
        irisColor="#6B3A1F"
        irisColorSecondary="#D4A574"
        blinkInterval={3000}
      />
    </div>
  )
}
