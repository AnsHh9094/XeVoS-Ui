"use client";

import React, { useRef, useState } from "react";
import { cn } from "@workspace/ui/lib/utils";

export interface ScrubInputProps {
    value?: number;
    defaultValue?: number;
    onChange?: (value: number) => void;
    label: string;
    min?: number;
    max?: number;
    step?: number;
    className?: string;
}

export function ScrubInput({
    value: controlledValue,
    defaultValue = 0,
    onChange,
    label,
    min = 0,
    max = 100,
    step = 1,
    className,
}: ScrubInputProps) {
    const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);
    const isControlled = controlledValue !== undefined;
    const value = isControlled ? controlledValue : uncontrolledValue;

    const [isDragging, setIsDragging] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleValueChange = (newValue: number) => {
        if (!isControlled) setUncontrolledValue(newValue);
        onChange?.(newValue);
    };

    const updateValueFromPointer = (clientX: number) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const x = clientX - rect.left;
        let percentage = x / rect.width;
        percentage = Math.max(0, Math.min(1, percentage));

        let newValue = min + percentage * (max - min);
        newValue = Math.round(newValue / step) * step;

        // Ensure value stays within bounds due to rounding
        newValue = Math.max(min, Math.min(max, newValue));

        if (newValue !== value) {
            handleValueChange(newValue);
        }
    };

    const onPointerDown = (e: React.PointerEvent) => {
        containerRef.current?.setPointerCapture(e.pointerId);
        setIsDragging(true);
        updateValueFromPointer(e.clientX);
    };

    const onPointerMove = (e: React.PointerEvent) => {
        if (!isDragging) return;
        updateValueFromPointer(e.clientX);
    };

    const onPointerUp = (e: React.PointerEvent) => {
        containerRef.current?.releasePointerCapture(e.pointerId);
        setIsDragging(false);
    };

    const percentage = max > min ? ((value - min) / (max - min)) * 100 : 0;

    // Create a minimum width so the fill doesn't look too weird when value is 0
    const fillWidth = Math.max(20, percentage);

    return (
        <div
            ref={containerRef}
            className={cn(
                "relative h-12 w-[280px] rounded-2xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 select-none touch-none cursor-ew-resize overflow-hidden",
                "transition-transform active:scale-[0.98]",
                className
            )}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
        >
            {/* The fill / thumb */}
            <div
                className={cn(
                    "absolute left-0 top-0 h-full rounded-2xl flex items-center justify-end pr-3",
                    "bg-white dark:bg-zinc-800 shadow-[0_2px_8px_rgba(0,0,0,0.1)] dark:shadow-none border-r border-zinc-200 dark:border-zinc-700",
                    isDragging ? "transition-none" : "transition-[width] duration-300 ease-out"
                )}
                style={{ width: `${fillWidth}%` }}
            >
                {/* Handle mark */}
                <div className="h-5 w-[3px] rounded-full bg-zinc-300 dark:bg-zinc-600" />
            </div>

            {/* Label and Value (Always on top to be visible whether the thumb covers them or not) */}
            <div className="absolute inset-0 flex items-center justify-between px-5 pointer-events-none">
                <span className="text-[15px] tracking-tight font-medium text-black/60 dark:text-white/60">
                    {label}
                </span>
                <span className="text-[16px] tracking-tight font-medium text-black/50 dark:text-white/50">
                    {value}
                </span>
            </div>
        </div>
    );
}
