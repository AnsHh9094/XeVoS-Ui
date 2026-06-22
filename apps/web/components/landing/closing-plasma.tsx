"use client"

import { useEffect, useRef, useCallback } from "react"
import { useTheme } from "next-themes"

interface ClosingPlasmaProps {
    className?: string
}

const VERT = `
attribute vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`

// ── Theme-aware Ethereal Plasma ──────────────────────
const FRAG = `
precision highp float;

uniform vec2 u_res;
uniform float u_time;
uniform vec2 u_mouse;
uniform float u_isDark;

// ── Noise Functions ──────────────────────────────
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                     -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy) );
  vec2 x0 = v -   i + dot(i, C.xx);
  vec2 i1;
  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod289(i);
  vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
        + i.x + vec3(0.0, i1.x, 1.0 ));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
  m = m*m ;
  m = m*m ;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

float fbm(vec2 p) {
    float total = 0.0;
    float amplitude = 0.5;
    float frequency = 1.0;
    mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.5));
    for (int i = 0; i < 5; i++) {
        total += snoise(p * frequency) * amplitude;
        p = rot * p;
        frequency *= 2.0;
        amplitude *= 0.5;
    }
    return total;
}

void main() {
    vec2 uv = gl_FragCoord.xy / u_res;
    float aspect = u_res.x / u_res.y;
    vec2 p = (uv - 0.5) * vec2(aspect, 1.0);
    float t = u_time * 0.15;

    // Mouse influence
    vec2 mouse = (u_mouse - 0.5) * vec2(aspect, 1.0);
    float dMouse = length(p - mouse);
    p += (mouse - p) * 0.02 * smoothstep(0.4, 0.0, dMouse);

    // ── Warped Fog ───────────────────────────────
    vec2 flow = vec2(
        fbm(p + vec2(t * 0.2, t * 0.1)),
        fbm(p + vec2(-t * 0.1, t * 0.3))
    );

    float n = fbm(p * 2.0 + flow * 1.5);

    float ridges = 1.0 - abs(snoise(p * 4.0 + n) * 2.0);
    ridges = pow(ridges, 3.0); 

    // ── Dark Theme Palette ──────────────────────
    vec3 darkA = vec3(0.05, 0.05, 0.08);
    vec3 darkB = vec3(0.12, 0.15, 0.25);
    vec3 darkC = vec3(0.3, 0.4, 0.6);

    // ── Light Theme Palette ─────────────────────
    // Soft luminous tones that blend with white
    vec3 lightA = vec3(0.92, 0.93, 0.96);    // Very light cool grey
    vec3 lightB = vec3(0.82, 0.85, 0.92);    // Soft lavender grey
    vec3 lightC = vec3(0.72, 0.76, 0.88);    // Muted periwinkle

    // Interpolate palettes based on theme
    vec3 colorA = mix(lightA, darkA, u_isDark);
    vec3 colorB = mix(lightB, darkB, u_isDark);
    vec3 colorC = mix(lightC, darkC, u_isDark);

    // Mix based on noise
    vec3 col = mix(colorA, colorB, smoothstep(-0.5, 0.5, n));
    col = mix(col, colorC, smoothstep(0.3, 1.0, n * 0.5 + ridges * 0.5));
    
    // Add subtle glow points
    float sparkle = pow(snoise(gl_FragCoord.xy * 0.2 + t * 2.0), 20.0) * 0.5;
    // Sparkle color adapts to theme
    vec3 sparkleColor = mix(vec3(0.55, 0.58, 0.72), vec3(0.8, 0.9, 1.0), u_isDark);
    col += sparkleColor * sparkle;

    // ── Post FX ──────────────────────────────────
    
    // Vignette — softer in light mode to avoid darkening edges too harshly
    float vigStrength = mix(1.8, 1.6, u_isDark);
    float vig = 1.0 - smoothstep(0.5, vigStrength, length(p));
    // In light mode, lerp vignette towards white instead of black
    col = mix(col, col * vig, u_isDark);
    // Light mode: fade edges toward white
    float lightVig = 1.0 - smoothstep(0.4, 1.5, length(p));
    col = mix(mix(vec3(1.0), col, lightVig), col, u_isDark);

    // Dither/Grain
    float grain = (fract(sin(dot(gl_FragCoord.xy + t * 50.0, vec2(12.9898, 78.233))) * 43758.5453) - 0.5) * 0.06;
    col += grain;

    gl_FragColor = vec4(col, 1.0);
}
`

export function ClosingPlasma({ className }: ClosingPlasmaProps) {
    const canvasRef = useRef<HTMLCanvasElement | null>(null)
    const mouseRef = useRef({ x: 0.5, y: 0.5 })
    const targetMouse = useRef({ x: 0.5, y: 0.5 })
    const { resolvedTheme } = useTheme()

    // Detect initial theme from HTML class (works before next-themes hydrates)
    const getIsDark = useCallback(() => {
        if (resolvedTheme) return resolvedTheme === "dark" ? 1.0 : 0.0
        if (typeof document !== "undefined") {
            return document.documentElement.classList.contains("dark") ? 1.0 : 0.0
        }
        return 0.0
    }, [resolvedTheme])

    // Set theme instantly — no transition
    const isDarkRef = useRef(getIsDark())
    useEffect(() => {
        isDarkRef.current = getIsDark()
    }, [getIsDark])

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
                console.warn("[ClosingPlasma]", gl.getShaderInfoLog(s))
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
        const uIsDark = gl.getUniformLocation(prog, "u_isDark")

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
            mouseRef.current.x += (targetMouse.current.x - mouseRef.current.x) * 0.05
            mouseRef.current.y += (targetMouse.current.y - mouseRef.current.y) * 0.05

            gl.uniform1f(uTime, elapsed)
            gl.uniform2f(uMouse, mouseRef.current.x, mouseRef.current.y)
            gl.uniform1f(uIsDark, isDarkRef.current)
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
