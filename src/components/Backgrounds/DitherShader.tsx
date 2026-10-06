import { useEffect, useRef } from 'react';

export interface DitherShaderProps {
  /** Size of one dither cell in CSS px. */
  cell?: number;
  /** Shadow color (the dark ink), hex. */
  ink?: string;
  /** Highlight color (the paper), hex. */
  paper?: string;
  /** Animation speed multiplier. 0 draws a still frame. */
  speed?: number;
}

const VERT = 'attribute vec2 p; void main() { gl_Position = vec4(p, 0.0, 1.0); }';

/* A drifting soft light field (layered sine noise), quantized to 5 steps with an 8x8 ordered Bayer matrix, mixed between two colors. */
const FRAG = `
precision highp float;
uniform vec2 res; uniform float t; uniform float cell; uniform vec3 ink; uniform vec3 paper;

float bayer8(vec2 c) {
  vec2 q = mod(floor(c), 8.0);
  float x0 = mod(q.x, 2.0); float x1 = mod(floor(q.x / 2.0), 2.0); float x2 = floor(q.x / 4.0);
  float y0 = mod(q.y, 2.0); float y1 = mod(floor(q.y / 2.0), 2.0); float y2 = floor(q.y / 4.0);
  float a0 = abs(x0 - y0); float a1 = abs(x1 - y1); float a2 = abs(x2 - y2);
  float v = (2.0 * a0 + y0) * 16.0 + (2.0 * a1 + y1) * 4.0 + (2.0 * a2 + y2);
  return (v + 0.5) / 64.0;
}

float field(vec2 uv, float time) {
  float a = sin(uv.x * 3.1 + time * 0.55) + sin(uv.y * 2.7 - time * 0.4);
  float b = sin((uv.x + uv.y) * 2.2 + time * 0.3) + sin(length(uv - vec2(0.5, 0.35)) * 7.0 - time * 0.7);
  float c = sin(uv.x * 7.3 - uv.y * 5.1 + time * 0.2) * 0.35;
  return 0.5 + 0.18 * (a + b) + c * 0.2;
}

void main() {
  vec2 px = floor(gl_FragCoord.xy / cell);
  vec2 uv = (px * cell) / res;
  uv.x *= res.x / res.y;
  float v = clamp(field(uv, t), 0.0, 1.0);
  v = smoothstep(0.12, 0.88, v);
  float steps = 5.0;
  float th = bayer8(px) - 0.5;
  float q = floor(clamp(v * (steps - 1.0) + th + 0.5, 0.0, steps - 1.0)) / (steps - 1.0);
  gl_FragColor = vec4(mix(ink, paper, q), 1.0);
}`;

const rgb = (hex: string): [number, number, number] => {
  const n = parseInt(hex.replace('#', ''), 16);
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
};

/**
 * A dithered shader background: a slowly drifting light field turned into a two-color ordered-dither pattern on the GPU.
 * Fills its parent. Falls back to a plain gradient without WebGL, and draws one still frame under reduced motion.
 */
export function DitherShader({ cell = 3, ink = '#1a1233', paper = '#efe9ff', speed = 1 }: DitherShaderProps) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = ref.current;
    const host = cv?.parentElement;
    if (!cv || !host) return;
    const gl = cv.getContext('webgl', { antialias: false, alpha: false, powerPreference: 'low-power' });
    if (!gl) { cv.style.background = `linear-gradient(135deg, ${paper}, ${ink})`; return; }

    const sh = (type: number, src: string) => { const s = gl.createShader(type)!; gl.shaderSource(s, src); gl.compileShader(s); return s; };
    const prog = gl.createProgram()!;
    gl.attachShader(prog, sh(gl.VERTEX_SHADER, VERT)); gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) { cv.style.background = `linear-gradient(135deg, ${paper}, ${ink})`; return; }
    gl.useProgram(prog);
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, 'p');
    gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    const u = (n: string) => gl.getUniformLocation(prog, n);
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let raf = 0; let visible = true; let t0 = performance.now(); let w = 1; let h = 1; let dpr = 1;

    const size = () => {
      dpr = Math.min(2, window.devicePixelRatio || 1);
      w = Math.max(1, Math.round(host.clientWidth * dpr)); h = Math.max(1, Math.round(host.clientHeight * dpr));
      cv.width = w; cv.height = h; cv.style.width = '100%'; cv.style.height = '100%';
      gl.viewport(0, 0, w, h);
    };
    const draw = (time: number) => {
      gl.uniform2f(u('res'), w, h); gl.uniform1f(u('t'), time); gl.uniform1f(u('cell'), Math.max(1, cell * dpr));
      gl.uniform3fv(u('ink'), rgb(ink)); gl.uniform3fv(u('paper'), rgb(paper));
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };
    const loop = (now: number) => { draw(((now - t0) / 1000) * speed + 4); raf = visible && !document.hidden ? requestAnimationFrame(loop) : 0; };

    size(); draw(4);
    const ro = new ResizeObserver(() => { size(); draw(4 + ((performance.now() - t0) / 1000) * speed); });
    ro.observe(host);
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible && !raf && !reduced && speed > 0) raf = requestAnimationFrame(loop); });
    io.observe(host);
    const vis = () => { if (!document.hidden && !raf && visible && !reduced && speed > 0) raf = requestAnimationFrame(loop); };
    document.addEventListener('visibilitychange', vis);
    if (!reduced && speed > 0) raf = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); io.disconnect(); document.removeEventListener('visibilitychange', vis); gl.deleteProgram(prog); gl.deleteBuffer(buf); };
  }, [cell, ink, paper, speed]);

  return <canvas ref={ref} aria-hidden="true" style={{ position: 'absolute', inset: 0, display: 'block', width: '100%', height: '100%', imageRendering: 'pixelated', background: paper }} />;
}
