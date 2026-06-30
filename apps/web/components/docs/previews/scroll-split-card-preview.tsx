"use client";

import * as React from "react";
import { ScrollSplitCard } from "@workspace/ui/components/scroll-split-card";

export function ScrollSplitCardPreview() {
  const containerRef = React.useRef<HTMLDivElement>(null);

  return (
    <div ref={containerRef} className="w-full h-full overflow-y-auto relative [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      <ScrollSplitCard
        containerRef={containerRef}
        className="h-[250vh]" // Giving enough height to scroll

        imageSrc="https://framerusercontent.com/images/RCwmbu2vbsKf5a5D7OchNhir3Y.png?scale-down-to=1024&width=3072&height=2048"
        cards={[
          {
            title: "Going Zero to One",
            description: "If you've navigating a new business unit, or a new venture entirely, or breaking into a new market.",
            bgColor: "#e2e2e2",
            textColor: "#111111",
            icon: (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 3l-6 6"></path>
                <path d="M21 3v6"></path>
                <path d="M21 3h-6"></path>
                <path d="M10.5 13.5L3 21"></path>
                <path d="M9 15l-3 3"></path>
              </svg>
            ),
          },
          {
            title: "Scaling from One to N",
            description: "If you've achieved Product/Market Fit, and are looking to scale your business to new heights.",
            bgColor: "#1a5bcf",
            textColor: "#ffffff",
            icon: (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="5" r="3"></circle>
                <circle cx="5" cy="19" r="3"></circle>
                <circle cx="19" cy="19" r="3"></circle>
              </svg>
            ),
          },
          {
            title: "Need Quick Solutions",
            description: "If you know exactly what you want and need a team that can step in and quickly help you with it.",
            bgColor: "#1c1c1c",
            textColor: "#ffffff",
            icon: (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2l.5-.5"></path>
                <path d="M12 15l-1-1 7.5-7.5c1.41-1.41 3.09-1.41 4.5 0s1.41 3.09 0 4.5l-7.5 7.5-1-1z"></path>
              </svg>
            ),
          },
        ]}
      />
    </div>
  );
}
