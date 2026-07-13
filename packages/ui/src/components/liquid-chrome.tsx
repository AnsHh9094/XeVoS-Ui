"use client";

import { cn } from "@workspace/ui/lib/utils";
import { useEffect, useRef } from "react";

interface LiquidChromeProps {
  /** Additional CSS classes for custom styling */
  className?: string;
  /** Base color tint for the chrome. Default is white/silver. Use hex or rgb. */
  baseColor?: [number, number, number];
  /** Animation speed multiplier. Default is 1.0 */
  speed?: number;
  /** Detail level of the fluid waves. Higher is more detailed. Default is 0.4 */
  amplitude?: number;
  /** Enables mouse interaction if true */
  interactive?: boolean;
}

const vertexShaderSource = `
  attribute vec2 position;
  void main() {
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

const fragmentShaderSource = `
  precision highp float;

  uniform vec2 u_resolution;
  uniform float u_time;
  uniform vec2 u_mouse;
  uniform vec3 u_baseColor;
  uniform float u_amplitude;

  // Simple 2D noise
  mat2 m = mat2( 0.80,  0.60, -0.60,  0.80 );

  float hash( vec2 p ) {
      float h = dot(p,vec2(127.1,311.7));
      return fract(sin(h)*43758.5453123);
  }

  float noise( in vec2 p ) {
      vec2 i = floor( p );
      vec2 f = fract( p );
      vec2 u = f*f*(3.0-2.0*f);
      return mix( mix( hash( i + vec2(0.0,0.0) ), 
                       hash( i + vec2(1.0,0.0) ), u.x),
                  mix( hash( i + vec2(0.0,1.0) ), 
                       hash( i + vec2(1.0,1.0) ), u.x), u.y);
  }

  float fbm( vec2 p ) {
      float f = 0.0;
      f += 0.5000*noise( p ); p = m*p*2.02;
      f += 0.2500*noise( p ); p = m*p*2.03;
      f += 0.1250*noise( p ); p = m*p*2.01;
      f += 0.0625*noise( p );
      return f/0.9375;
  }

  void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;
    vec2 p = -1.0 + 2.0 * uv;
    p.x *= u_resolution.x / u_resolution.y;

    // Mouse interaction
    vec2 mouse = (u_mouse - 0.5) * 2.0;
    mouse.x *= u_resolution.x / u_resolution.y;
    
    // Distort based on distance to mouse
    float dist = length(p - mouse);
    vec2 distortion = normalize(p - mouse) * exp(-dist * 3.0) * 0.1;
    p += distortion;

    float time = u_time * 0.5;

    // Domain warping
    vec2 q = vec2(0.0);
    q.x = fbm(p + vec2(0.0, 0.0) + time * 0.1);
    q.y = fbm(p + vec2(5.2, 1.3) + time * 0.15);

    vec2 r = vec2(0.0);
    r.x = fbm(p + 4.0 * q + vec2(1.7, 9.2) + time * 0.2);
    r.y = fbm(p + 4.0 * q + vec2(8.3, 2.8) + time * 0.25);

    float f = fbm(p + r * 4.0 * u_amplitude);

    // Color mixing (Chrome / Liquid Metal style)
    vec3 col = u_baseColor;
    
    // Add bright highlights based on the warped noise
    float highlight = smoothstep(0.4, 0.6, f);
    float highlight2 = smoothstep(0.6, 0.8, f);
    float dark = smoothstep(0.1, 0.3, f);
    
    col = mix(col, vec3(0.0), 1.0 - dark); // add shadows
    col = mix(col, vec3(0.8, 0.8, 0.9), highlight); // add silver midtones
    col = mix(col, vec3(1.0, 1.0, 1.0), highlight2); // add bright white specular
    
    // Vignette
    col *= 0.5 + 0.5 * pow(16.0 * uv.x * uv.y * (1.0 - uv.x) * (1.0 - uv.y), 0.2);

    gl_FragColor = vec4(col, 1.0);
  }
`;

export function LiquidChrome({
  className,
  baseColor = [0.1, 0.1, 0.1], // Dark gray base for chrome
  speed = 1.0,
  amplitude = 0.6,
  interactive = true,
}: LiquidChromeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl");
    if (!gl) {
      console.error("WebGL not supported");
      return;
    }

    // Setup shaders
    const vertexShader = gl.createShader(gl.VERTEX_SHADER)!;
    gl.shaderSource(vertexShader, vertexShaderSource);
    gl.compileShader(vertexShader);

    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)!;
    gl.shaderSource(fragmentShader, fragmentShaderSource);
    gl.compileShader(fragmentShader);
    
    // Check for compilation errors
    if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
      console.error("Fragment shader compilation error:", gl.getShaderInfoLog(fragmentShader));
    }

    const program = gl.createProgram()!;
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    gl.useProgram(program);

    // Setup full-screen quad
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );

    const positionLocation = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    // Uniforms
    const resolutionLocation = gl.getUniformLocation(program, "u_resolution");
    const timeLocation = gl.getUniformLocation(program, "u_time");
    const mouseLocation = gl.getUniformLocation(program, "u_mouse");
    const baseColorLocation = gl.getUniformLocation(program, "u_baseColor");
    const amplitudeLocation = gl.getUniformLocation(program, "u_amplitude");

    let mouse = [0.5, 0.5];
    let animationFrameId: number;
    let startTime = performance.now();

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      // Use devicePixelRatio for sharp rendering on retina displays
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!interactive) return;
      const rect = canvas.getBoundingClientRect();
      mouse[0] = (e.clientX - rect.left) / rect.width;
      mouse[1] = 1.0 - (e.clientY - rect.top) / rect.height; // Flip Y for WebGL
    };

    window.addEventListener("resize", resize);
    if (interactive) {
      window.addEventListener("mousemove", handleMouseMove);
    }
    
    // Initial resize
    resize();

    // Render loop
    const render = (time: number) => {
      const elapsedTime = (time - startTime) * 0.001 * speed;

      gl.uniform1f(timeLocation, elapsedTime);
      gl.uniform2f(mouseLocation, mouse[0], mouse[1]);
      gl.uniform3f(baseColorLocation, baseColor[0], baseColor[1], baseColor[2]);
      gl.uniform1f(amplitudeLocation, amplitude);

      gl.drawArrays(gl.TRIANGLES, 0, 6);
      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", resize);
      if (interactive) {
        window.removeEventListener("mousemove", handleMouseMove);
      }
      cancelAnimationFrame(animationFrameId);
    };
  }, [baseColor, speed, amplitude, interactive]);

  return (
    <canvas
      ref={canvasRef}
      className={cn("w-full h-full block", className)}
      style={{ touchAction: "none" }}
    />
  );
}
