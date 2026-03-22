"use client";

import { useCallback, useEffect, useRef } from "react";

const ICONS = [
  "⚛️", "🔷", "⚡", "🔥", "💎", "🌊", "🎯", "✨",
  "🚀", "🔮", "💡", "🎨", "🦋", "🌈", "🎪", "🔵",
  "🌀", "⭐", "🔶", "🎁",
];

export function InfiniteIconField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dimsRef = useRef({ w: 0, h: 0 });
  const camRef = useRef({ x: 0, y: 0 });
  const velRef = useRef({ x: 0, y: 0 });
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const isInsideRef = useRef(false);
  const rafRef = useRef<number>(0);

  const cellSize = 80;
  const gap = 10;
  const maxSpeed = 3;
  const smoothing = 0.06;

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const { w: W, h: H } = dimsRef.current;
    if (W === 0 || H === 0) {
      rafRef.current = requestAnimationFrame(draw);
      return;
    }

    const dpr = window.devicePixelRatio || 1;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const step = cellSize + gap;

    const tx = isInsideRef.current ? (mouseRef.current.x - 0.5) * 2 * maxSpeed : 0;
    const ty = isInsideRef.current ? (mouseRef.current.y - 0.5) * 2 * maxSpeed : 0;

    velRef.current.x += (tx - velRef.current.x) * smoothing;
    velRef.current.y += (ty - velRef.current.y) * smoothing;
    camRef.current.x += velRef.current.x;
    camRef.current.y += velRef.current.y;

    const camX = camRef.current.x;
    const camY = camRef.current.y;

    ctx.clearRect(0, 0, W, H);

    const colMin = Math.floor((camX - W / 2) / step) - 1;
    const colMax = Math.ceil((camX + W / 2) / step) + 1;
    const rowMin = Math.floor((camY - H / 2) / step) - 1;
    const rowMax = Math.ceil((camY + H / 2) / step) + 1;

    for (let row = rowMin; row <= rowMax; row++) {
      for (let col = colMin; col <= colMax; col++) {
        const sx = col * step - camX + W / 2 - cellSize / 2;
        const sy = row * step - camY + H / 2 - cellSize / 2;

        const iconIdx = Math.abs(col * 7 + row * 13 + ((col * row * 3) | 0)) % ICONS.length;
        const icon = ICONS[iconIdx] ?? "";

        ctx.font = `${cellSize * 0.72}px serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(icon, sx + cellSize / 2, sy + cellSize / 2);
      }
    }

    rafRef.current = requestAnimationFrame(draw);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      dimsRef.current = { w: rect.width, h: rect.height };
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      };
    };
    const onEnter = () => { isInsideRef.current = true; };
    const onLeave = () => { isInsideRef.current = false; };

    canvas.addEventListener("mousemove", onMove);
    canvas.addEventListener("mouseenter", onEnter);
    canvas.addEventListener("mouseleave", onLeave);
    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
      canvas.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("mouseenter", onEnter);
      canvas.removeEventListener("mouseleave", onLeave);
    };
  }, [draw]);

  return (
    <canvas
      ref={canvasRef}
      className="block w-full h-full bg-transparent"
    />
  );
}
