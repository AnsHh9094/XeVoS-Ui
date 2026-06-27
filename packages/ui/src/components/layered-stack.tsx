"use client";

import { ComponentPropsWithoutRef, useCallback, useEffect, useRef } from "react";
import gsap from "gsap";
import { cn } from "@workspace/ui/lib/utils";

export type LayeredStackProps = ComponentPropsWithoutRef<"div">;

export const LayeredStack = ({ children, className, ...props }: LayeredStackProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const isStacked = useRef(true);
    const isHovered = useRef(false);

    const stackCards = useCallback((animate = true) => {
        const container = containerRef.current;
        if (!container) return;

        isStacked.current = true;
        const cards = Array.from(container.children) as HTMLElement[];

        cards.forEach((card) => {
            gsap.killTweensOf(card);
        });

        cards.forEach((card, i) => {
            const offsetX = container.clientWidth / 2 - card.offsetWidth / 2 - card.offsetLeft;
            const offsetY = container.clientHeight / 2 - card.offsetHeight / 2 - card.offsetTop;

            if (!animate) {
                gsap.set(card, {
                    x: offsetX,
                    y: offsetY,
                    rotate: gsap.utils.random(-10, 10),
                    zIndex: 100 - i,
                });
                return;
            }

            gsap.to(card, {
                x: offsetX,
                y: offsetY,
                rotate: gsap.utils.random(-10, 10),
                zIndex: 100 - i,
                duration: 0.8,
                ease: "expo.out",
                overwrite: true,
            });
        });
    }, []);

    const resetCards = useCallback((animate = true) => {
        const container = containerRef.current;
        if (!container) return;

        isStacked.current = false;
        const cards = Array.from(container.children) as HTMLElement[];

        if (!animate) {
            cards.forEach((card, i) => {
                gsap.killTweensOf(card);
                gsap.set(card, {
                    x: 0,
                    y: 0,
                    rotate: 0,
                    zIndex: 100 - i,
                });
            });
            return;
        }

        gsap.to(cards, {
            x: 0,
            y: 0,
            zIndex: (i: number) => 100 - i,
            duration: 0.8,
            rotate: 0,
            ease: "expo.out",
            stagger: {
                amount: 0.1,
                from: "start",
            },
            overwrite: true,
        });
    }, []);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        // Initial z-index setup
        const cards = Array.from(container.children) as HTMLElement[];
        cards.forEach((card, i) => {
            gsap.set(card, { zIndex: 100 - i });
        });

        stackCards();

        // Re-sync hover/stack state on resize to avoid stale hover visuals after layout shifts.
        const ro = new ResizeObserver(() => {
            const container = containerRef.current;
            if (!container) return;

            isHovered.current = container.matches(":hover");

            if (isHovered.current) {
                resetCards(false);
            } else {
                stackCards(false);
            }
        });
        ro.observe(container);

        return () => ro.disconnect();
    }, [resetCards, stackCards]);

    return (
        <div
            ref={containerRef}
            onMouseEnter={() => {
                isHovered.current = true;
                resetCards(true);
            }}
            onMouseLeave={() => {
                isHovered.current = false;
                stackCards(true);
            }}
            className={cn("relative", className)}
            {...props}>
            {children}
        </div>
    );
};
