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
  float a = 0.5;
  mat2 rot = mat2(0.87, 0.48, -0.48, 0.87);
  for (int i = 0; i < 6; i++) {
    v += a * noise(p);
    p = rot * p * 2.0;
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_res;
  float t = u_time * 0.15;
  
  vec2 aspect = vec2(u_res.x / u_res.y, 1.0);
  vec2 p = (uv - 0.5) * aspect;

  // Rising coordinates
  vec2 flowP = vec2(p.x, p.y - t * 0.5);

  // FBM warping layers
  float n1 = fbm(flowP * 3.0 + vec2(0.0, t * 0.2));
  vec2 warp = flowP + n1 * 0.5;
  float n2 = fbm(warp * 4.0 - vec2(0.0, t * 0.4));
  float n3 = fbm(warp * 6.0 + n2 * 1.0);

  // Vertical masking: Fade out towards top
  // Strongest at bottom (uv.y ~ 0), gone by top (uv.y ~ 0.8)
  float mask = smoothstep(0.8, 0.0, uv.y);
  mask = pow(mask, 1.2); 

  // Colors
  vec3 c1 = vec3(0.02, 0.02, 0.05);  // Deep
  vec3 c2 = vec3(0.1, 0.2, 0.5);     // Mid
  vec3 c3 = vec3(0.6, 0.85, 0.95);   // High

  float intensity = n3 * 1.2 + (n2 - 0.5) * 0.5;
  
  vec3 col = mix(c1, c2, smoothstep(0.2, 0.6, intensity));
  col = mix(col, c3, smoothstep(0.7, 1.1, intensity));
  
  // Apply mask
  col *= mask;
  
  // Compute alpha: transparent where mask is low or intensity is low
  float alpha = mask * smoothstep(0.1, 0.9, intensity);
  
  // Dither
  float dither = (hash(gl_FragCoord.xy + t) - 0.5) * 0.04;
  col += dither;

  // ── Entrance Reveal (Left to Right) ────────────────
  // u_time starts at 0 after the delay.
  // We want a smooth wipe appearing from left (uv.x=0) to right (uv.x=1).
  float revealProgress = u_time * 0.8; // Speed of the wipe
  float revealMask = smoothstep(0.0, 0.3, revealProgress - uv.x);
  
  alpha *= revealMask;

  gl_FragColor = vec4(col, alpha);
}
`

export function WebGLLiquid({ className, delayMs = 2400 }: WebGLLiquidProps) {
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
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
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
