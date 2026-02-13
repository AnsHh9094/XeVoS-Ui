"use client";

import React from "react";
import {
  MagneticDock,
  DockIconHome,
  DockIconSearch,
  DockIconFolder,
  DockIconMail,
  DockIconMusic,
  DockIconSettings,
  DockIconTrash,
} from "@workspace/ui/components/magnetic-dock";

const defaultItems = [
  { id: "home", label: "Home", icon: <DockIconHome />, isActive: true },
  { id: "search", label: "Search", icon: <DockIconSearch /> },
  { id: "folder", label: "Finder", icon: <DockIconFolder /> },
  { id: "mail", label: "Mail", icon: <DockIconMail />, badge: 3 },
  { id: "music", label: "Music", icon: <DockIconMusic /> },
  { id: "settings", label: "Settings", icon: <DockIconSettings /> },
  { id: "trash", label: "Trash", icon: <DockIconTrash /> },
];

const minimalItems = [
  { id: "home", label: "Home", icon: <DockIconHome /> },
  { id: "search", label: "Search", icon: <DockIconSearch /> },
  { id: "folder", label: "Finder", icon: <DockIconFolder /> },
  { id: "settings", label: "Settings", icon: <DockIconSettings /> },
];

export function MagneticDockDefaultPreview() {
  return (
    <div className="flex items-center justify-center w-full h-full p-8">
      <MagneticDock items={defaultItems} />
    </div>
  );
}

export function MagneticDockSolidPreview() {
  return (
    <div className="flex items-center justify-center w-full h-full p-8">
      <MagneticDock items={minimalItems} variant="solid" />
    </div>
  );
}

export function MagneticDockLargeScalePreview() {
  return (
    <div className="flex items-center justify-center w-full h-full p-8">
      <MagneticDock
        items={minimalItems}
        iconSize={48}
        maxScale={2}
        magneticDistance={200}
      />
    </div>
  );
}
