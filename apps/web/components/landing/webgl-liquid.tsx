"use client"

import { useEffect, useRef } from "react"

interface WebGLLiquidProps {
  className?: string
  delayMs?: number
}

const VERTEX_SHADER = `
attribute vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`

const FRAGMENT_SHADER = `
precision highp float;
uniform vec2 u_res;
uniform float u_time;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.55;
  vec2 shift = vec2(100.0);
  for (int i = 0; i < 4; i++) {
    v += a * noise(p);
    p = p * 2.1 + shift;
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_res;
  vec2 p = uv;

  float t = u_time;
  float vertical = smoothstep(0.0, 0.8, uv.y);
  float base = 1.0 - vertical;

  float n = fbm(vec2(p.x * 3.0, p.y * 2.5 - t * 0.8));
  float flicker = fbm(vec2(p.x * 6.0 + t * 0.6, p.y * 4.0));

  float flame = base + n * 0.55 + flicker * 0.2;
  flame = smoothstep(0.2, 0.95, flame);

  vec3 colHot = vec3(1.0, 0.95, 0.75);
  vec3 colMid = vec3(1.0, 0.55, 0.1);
  vec3 colCool = vec3(0.8, 0.15, 0.02);

  vec3 color = mix(colCool, colMid, flame);
  color = mix(color, colHot, flame * flame);

  float alpha = clamp(flame * 1.1, 0.0, 1.0);
  color *= alpha;

  float dither = (hash(gl_FragCoord.xy + t * 90.0) - 0.5) / 255.0;
  color += dither;

  gl_FragColor = vec4(color, alpha);
}
`

export function WebGLLiquid({ className, delayMs = 1400 }: WebGLLiquidProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const gl = canvas.getContext("webgl", { antialias: true, alpha: true })
    if (!gl) {
      console.warn("[WebGLLiquid] WebGL context not available")
      return
    }

    const compile = (type: number, source: string) => {
      const shader = gl.createShader(type)
      if (!shader) return null
      gl.shaderSource(shader, source)
      gl.compileShader(shader)
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.warn(
          "[WebGLLiquid] Shader compile failed:",
          gl.getShaderInfoLog(shader)
        )
        gl.deleteShader(shader)
        return null
      }
      return shader
    }

    const vs = compile(gl.VERTEX_SHADER, VERTEX_SHADER)
    const fs = compile(gl.FRAGMENT_SHADER, FRAGMENT_SHADER)
    if (!vs || !fs) return

    const program = gl.createProgram()
    if (!program) {
      console.warn("[WebGLLiquid] Program creation failed")
      return
    }
    gl.attachShader(program, vs)
    gl.attachShader(program, fs)
    gl.linkProgram(program)
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.warn(
        "[WebGLLiquid] Program link failed:",
        gl.getProgramInfoLog(program)
      )
      return
    }

    gl.useProgram(program)

    const position = gl.getAttribLocation(program, "position")
    const buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW
    )
    gl.enableVertexAttribArray(position)
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0)

    const uRes = gl.getUniformLocation(program, "u_res")
    const uTime = gl.getUniformLocation(program, "u_time")
    if (!uRes || !uTime) {
      console.warn("[WebGLLiquid] Uniforms not found")
      return
    }

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const { width, height } = canvas.getBoundingClientRect()
      canvas.width = Math.max(1, Math.floor(width * dpr))
      canvas.height = Math.max(1, Math.floor(height * dpr))
      gl.viewport(0, 0, canvas.width, canvas.height)
      gl.uniform2f(uRes, canvas.width, canvas.height)
    }

    resize()
    const onResize = () => resize()
    window.addEventListener("resize", onResize)

    let raf = 0
    const start = performance.now()

    const render = (now: number) => {
      const t = Math.max(0, (now - start - delayMs) / 1000)
      gl.clearColor(0, 0, 0, 0)
      gl.clear(gl.COLOR_BUFFER_BIT)
      gl.uniform1f(uTime, t)
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
      raf = requestAnimationFrame(render)
    }

    raf = requestAnimationFrame(render)

    return () => {
      window.removeEventListener("resize", onResize)
      cancelAnimationFrame(raf)
    }
  }, [delayMs])

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ width: "100%", height: "100%", display: "block" }}
      aria-hidden="true"
    />
  )
}
