"use client"

import { useEffect, useRef, useCallback } from "react"

interface ClosingAuroraProps {
    className?: string
}

const VERT = `
attribute vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`

// Flowing aurora / silk mesh — organic luminous ribbons
const FRAG = `
precision highp float;

uniform vec2 u_res;
uniform float u_time;
uniform vec2 u_mouse;

// ── Smooth noise ─────────────────────────────────
vec2 hash2(vec2 p) {
  p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
  return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
}

float gnoise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * f * (f * (f * 6.0 - 15.0) + 10.0);

  return mix(
    mix(dot(hash2(i), f),
        dot(hash2(i + vec2(1.0, 0.0)), f - vec2(1.0, 0.0)), u.x),
    mix(dot(hash2(i + vec2(0.0, 1.0)), f - vec2(0.0, 1.0)),
        dot(hash2(i + vec2(1.0, 1.0)), f - vec2(1.0, 1.0)), u.x),
    u.y
  );
}

float fbm(vec2 p) {
  float v = 0.0, a = 0.5;
  mat2 rot = mat2(0.866, 0.5, -0.5, 0.866);
  for (int i = 0; i < 5; i++) {
    v += a * gnoise(p);
    p = rot * p * 2.0 + 17.0;
    a *= 0.5;
  }
  return v;
}

// ── Aurora ribbon function ───────────────────────
float ribbon(vec2 p, float offset, float width, float speed, float t) {
  float wave = fbm(vec2(p.x * 1.5 + t * speed, offset)) * 0.4;
  wave += gnoise(vec2(p.x * 3.0 - t * speed * 0.7, offset + 10.0)) * 0.15;
  float dist = abs(p.y - wave - offset * 0.3);
  return smoothstep(width, width * 0.05, dist);
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_res;
  float aspect = u_res.x / u_res.y;
  vec2 p = (uv - 0.5) * vec2(aspect, 1.0);
  float t = u_time;

  // Mouse influence — gentle pull
  vec2 mouse = (u_mouse - 0.5) * vec2(aspect, 1.0);
  float mDist = length(p - mouse);
  p += (mouse - p) * smoothstep(0.8, 0.0, mDist) * 0.06;

  // ── Background: deep space ────────────────────
  float bgNoise = fbm(p * 2.0 + t * 0.05) * 0.5 + 0.5;
  vec3 bg = mix(
    vec3(0.01, 0.01, 0.02),
    vec3(0.03, 0.02, 0.05),
    bgNoise
  );

  // ── Aurora ribbons ────────────────────────────
  // Ribbon 1 — violet-blue
  float r1 = ribbon(p, -0.1, 0.18, 0.12, t);
  vec3 c1 = mix(vec3(0.25, 0.10, 0.55), vec3(0.15, 0.30, 0.70), uv.x + gnoise(p * 2.0 + t * 0.1) * 0.3);

  // Ribbon 2 — teal-emerald  
  float r2 = ribbon(p, 0.15, 0.14, 0.09, t + 3.0);
  vec3 c2 = mix(vec3(0.05, 0.35, 0.40), vec3(0.10, 0.55, 0.45), uv.x + gnoise(p * 1.5 - t * 0.08) * 0.4);

  // Ribbon 3 — rose-warm
  float r3 = ribbon(p, 0.0, 0.12, 0.15, t + 7.0);
  vec3 c3 = mix(vec3(0.50, 0.15, 0.30), vec3(0.35, 0.10, 0.45), uv.x + gnoise(p * 1.8 + t * 0.06) * 0.3);

  // Ribbon 4 — pale silver (subtle)
  float r4 = ribbon(p, -0.2, 0.10, 0.07, t + 12.0);
  vec3 c4 = vec3(0.30, 0.28, 0.35);

  // Ribbon 5 — deep indigo
  float r5 = ribbon(p, 0.25, 0.16, 0.11, t + 5.0);
  vec3 c5 = mix(vec3(0.12, 0.08, 0.40), vec3(0.20, 0.15, 0.55), uv.y);

  // ── Compositing ───────────────────────────────
  vec3 color = bg;

  // Layer ribbons additively with varying intensity
  color += c1 * r1 * 0.45;
  color += c2 * r2 * 0.35;
  color += c3 * r3 * 0.30;
  color += c4 * r4 * 0.20;
  color += c5 * r5 * 0.40;

  // Glow/bloom pass — soft wash
  float glow = 0.0;
  glow += r1 * 0.3;
  glow += r2 * 0.25;
  glow += r3 * 0.2;
  glow += r5 * 0.25;
  color += glow * glow * vec3(0.15, 0.12, 0.25) * 0.6;

  // Vignette
  float vig = 1.0 - smoothstep(0.2, 1.2, length(p) * 0.85);
  color *= mix(0.4, 1.0, vig);

  // Subtle stars
  float stars = pow(max(0.0, gnoise(gl_FragCoord.xy * 0.15)), 18.0) * 0.6;
  color += stars;

  // Film grain
  float grain = (fract(sin(dot(gl_FragCoord.xy + t * 80.0, vec2(12.9898, 78.233))) * 43758.5453) - 0.5) * 0.025;
  color += grain;

  // Tone mapping — soft shoulder
  color = color / (color + 0.8);
  color = pow(color, vec3(0.95));

  gl_FragColor = vec4(color, 1.0);
}
`

export function ClosingAurora({ className }: ClosingAuroraProps) {
    const canvasRef = useRef<HTMLCanvasElement | null>(null)
    const mouseRef = useRef({ x: 0.5, y: 0.5 })
    const targetMouse = useRef({ x: 0.5, y: 0.5 })

    const handleMouseMove = useCallback((e: MouseEvent) => {
        const canvas = canvasRef.current
        if (!canvas) return
        const rect = canvas.getBoundingClientRect()
        targetMouse.current = {
            x: (e.clientX - rect.left) / rect.width,
            y: 1.0 - (e.clientY - rect.top) / rect.height,
        }
    }, [])

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const gl = canvas.getContext("webgl", { antialias: false, alpha: false })
        if (!gl) return

        const compile = (type: number, src: string) => {
            const s = gl.createShader(type)
            if (!s) return null
            gl.shaderSource(s, src)
            gl.compileShader(s)
            if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
                console.warn("[ClosingAurora]", gl.getShaderInfoLog(s))
                gl.deleteShader(s)
                return null
            }
            return s
        }

        const vs = compile(gl.VERTEX_SHADER, VERT)
        const fs = compile(gl.FRAGMENT_SHADER, FRAG)
        if (!vs || !fs) return

        const prog = gl.createProgram()!
        gl.attachShader(prog, vs)
        gl.attachShader(prog, fs)
        gl.linkProgram(prog)
        if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return

        gl.useProgram(prog)

        const pos = gl.getAttribLocation(prog, "position")
        const buf = gl.createBuffer()
        gl.bindBuffer(gl.ARRAY_BUFFER, buf)
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW)
        gl.enableVertexAttribArray(pos)
        gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0)

        const uRes = gl.getUniformLocation(prog, "u_res")
        const uTime = gl.getUniformLocation(prog, "u_time")
        const uMouse = gl.getUniformLocation(prog, "u_mouse")

        const resize = () => {
            const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
            const { width, height } = canvas.getBoundingClientRect()
            canvas.width = Math.floor(width * dpr)
            canvas.height = Math.floor(height * dpr)
            gl.viewport(0, 0, canvas.width, canvas.height)
            gl.uniform2f(uRes, canvas.width, canvas.height)
        }

        resize()
        window.addEventListener("resize", resize)
        window.addEventListener("mousemove", handleMouseMove)

        let raf = 0
        const start = performance.now()

        const render = (now: number) => {
            const elapsed = (now - start) / 1000

            // Smooth mouse lerp
            mouseRef.current.x += (targetMouse.current.x - mouseRef.current.x) * 0.03
            mouseRef.current.y += (targetMouse.current.y - mouseRef.current.y) * 0.03

            gl.uniform1f(uTime, elapsed)
            gl.uniform2f(uMouse, mouseRef.current.x, mouseRef.current.y)
            gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
            raf = requestAnimationFrame(render)
        }

        raf = requestAnimationFrame(render)

        return () => {
            window.removeEventListener("resize", resize)
            window.removeEventListener("mousemove", handleMouseMove)
            cancelAnimationFrame(raf)
        }
    }, [handleMouseMove])

    return (
        <canvas
            ref={canvasRef}
            className={className}
            style={{ width: "100%", height: "100%", display: "block" }}
            aria-hidden="true"
        />
    )
}
