"use client"

import { useEffect, useRef, useCallback } from "react"

interface ClosingPlasmaProps {
    className?: string
}

const VERT = `
attribute vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`

// ── Organic Plasma / Liquid Fire ─────────────────────
const FRAG = `
precision highp float;

uniform vec2 u_res;
uniform float u_time;
uniform vec2 u_mouse;

// ── Noise Functions ──────────────────────────────
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187,  // (3.0-sqrt(3.0))/6.0
                      0.366025403784439,  // 0.5*(sqrt(3.0)-1.0)
                     -0.577350269189626,  // -1.0 + 2.0 * C.x
                      0.024390243902439); // 1.0 / 41.0
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

// ── Domain Warping ───────────────────────────────
float fbm(vec2 p) {
    float total = 0.0;
    float amplitude = 0.5;
    float frequency = 1.0;
    for (int i = 0; i < 4; i++) {
        total += snoise(p * frequency) * amplitude;
        frequency *= 2.0;
        amplitude *= 0.5;
        p += vec2(1.2, 3.4); // Shift to avoid artifacts
    }
    return total;
}

void main() {
    vec2 uv = gl_FragCoord.xy / u_res;
    float aspect = u_res.x / u_res.y;
    vec2 p = (uv - 0.5) * vec2(aspect, 1.0);
    float t = u_time * 0.2; // Slow elegant movement

    // Mouse influence
    vec2 mouse = (u_mouse - 0.5) * vec2(aspect, 1.0);
    float dMouse = length(p - mouse);
    // Add a subtle push/pull from mouse
    p -= (mouse - p) * 0.05 * smoothstep(0.5, 0.0, dMouse);

    // ── Pattern Generation ───────────────────────
    
    // Domain warping: distortion 1
    vec2 q = vec2(
        fbm(p + vec2(0.0, t * 0.5)),
        fbm(p + vec2(4.2, t * 0.3))
    );

    // Domain warping: distortion 2
    vec2 r = vec2(
        fbm(p + 4.0 * q + vec2(t * 0.4, 9.2)),
        fbm(p + 4.0 * q + vec2(8.3, t * 0.2))
    );

    // Final noise value with deep warping
    float f = fbm(p + 4.0 * r);

    // ── Color Mix ────────────────────────────────
    // Creating a "liquid metal / plasma" palette
    
    // Base dark varying color
    vec3 col = mix(
        vec3(0.05, 0.0, 0.1),  // Deep plum/black
        vec3(0.1, 0.05, 0.2), // Dark violet
        clamp(f * f * 4.0, 0.0, 1.0)
    );

    // Mid-tones (Cyan/Magenta glow)
    col = mix(
        col,
        vec3(0.2, 0.1, 0.4), // Indigo
        clamp(length(q), 0.0, 1.0)
    );

    // Highlights (Gold/Electric Blue swirl)
    // We mix based on the 'r' vector which represents the secondary warp
    col = mix(
        col,
        vec3(0.1, 0.6, 0.8), // Electric Cyan
        clamp(r.x, 0.0, 1.0)
    );
    
    // Warm accent (Fiery orange/pink in the deep folds)
    col = mix(
        col, 
        vec3(0.8, 0.2, 0.5), // Magenta/Pink
        clamp(r.y * r.y, 0.0, 1.0) * 0.6
    );

    // Deep brights (White/Silver peaks)
    float peaks = smoothstep(0.7, 1.2, f + 0.5 * r.x);
    col += vec3(0.9, 0.95, 1.0) * peaks * 0.4;

    // ── Post Processing ──────────────────────────
    
    // Vignette
    float vig = 1.0 - smoothstep(0.3, 1.5, length(p));
    col *= vig;

    // Grain
    float grain = (fract(sin(dot(gl_FragCoord.xy + t * 50.0, vec2(12.9898, 78.233))) * 43758.5453) - 0.5) * 0.04;
    col += grain;

    // Soft glow integration
    gl_FragColor = vec4(col, 1.0);
}
`

export function ClosingPlasma({ className }: ClosingPlasmaProps) {
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
