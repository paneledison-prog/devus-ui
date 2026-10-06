import { useEffect, useRef } from 'react';

export interface KineticGridProps {
  /** Distance between grid points in px. */
  spacing?: number;
  /** Radius of the pull around the pointer in px. */
  reach?: number;
  /** Line and glow color as `r, g, b`. */
  color?: string;
}

type Pt = { x: number; y: number; glow: number };

/**
 * An interactive background: a dark canvas grid that bends toward the pointer and sends a ripple through the grid on every click or tap.
 * It fills its parent. With reduced motion it draws a still grid.
 */
export function KineticGrid({ spacing = 30, reach = 170, color = '124, 92, 255' }: KineticGridProps) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = ref.current;
    const host = cv?.parentElement;
    const ctx = cv?.getContext('2d');
    if (!cv || !host || !ctx) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let w = 0; let h = 0; let raf = 0;
    const ptr = { x: -9999, y: -9999, tx: -9999, ty: -9999, on: false };
    const ripples: { x: number; y: number; t: number }[] = [];

    const size = () => {
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      w = host.clientWidth; h = host.clientHeight;
      cv.width = Math.round(w * dpr); cv.height = Math.round(h * dpr);
      cv.style.width = `${w}px`; cv.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const warp = (x: number, y: number, now: number): Pt => {
      let dx = 0; let dy = 0; let glow = 0;
      if (ptr.on) {
        const ex = ptr.x - x; const ey = ptr.y - y; const d = Math.hypot(ex, ey);
        if (d < reach) { const k = (1 - d / reach) ** 2; dx += (ex / (d || 1)) * k * 22; dy += (ey / (d || 1)) * k * 22; glow = k; }
      }
      for (const r of ripples) {
        const ex = x - r.x; const ey = y - r.y; const d = Math.hypot(ex, ey); const age = (now - r.t) / 1000;
        const dist = d - age * 420;
        if (Math.abs(dist) < 70) {
          const a = Math.cos((dist / 70) * Math.PI * 0.5) * Math.max(0, 1 - age / 1.6) * 14;
          dx += (ex / (d || 1)) * a; dy += (ey / (d || 1)) * a; glow = Math.max(glow, a / 14);
        }
      }
      return { x: x + dx, y: y + dy, glow };
    };

    const draw = (now: number) => {
      ctx.clearRect(0, 0, w, h);
      const cols = Math.ceil(w / spacing) + 2; const rows = Math.ceil(h / spacing) + 2;
      const ox = (w - (cols - 2) * spacing) / 2; const oy = (h - (rows - 2) * spacing) / 2;
      const pts: Pt[][] = [];
      for (let j = 0; j < rows; j++) {
        const row: Pt[] = [];
        for (let i = 0; i < cols; i++) row.push(warp(ox + (i - 1) * spacing, oy + (j - 1) * spacing, now));
        pts.push(row);
      }
      ctx.lineWidth = 1;
      const seg = (a: Pt, b: Pt) => {
        const g = Math.max(a.glow, b.glow);
        ctx.strokeStyle = `rgba(${g > 0.02 ? color : '255, 255, 255'}, ${0.09 + g * 0.7})`;
        ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
      };
      for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
          if (i + 1 < cols) seg(pts[j][i], pts[j][i + 1]);
          if (j + 1 < rows) seg(pts[j][i], pts[j + 1][i]);
        }
      }
    };

    const frame = (now: number) => {
      ptr.x += (ptr.tx - ptr.x) * 0.2; ptr.y += (ptr.ty - ptr.y) * 0.2;
      while (ripples.length && now - ripples[0].t > 1700) ripples.shift();
      draw(now);
      raf = ptr.on || ripples.length ? requestAnimationFrame(frame) : 0;
    };
    const wake = () => { if (!raf && !reduced) raf = requestAnimationFrame(frame); };

    const local = (e: PointerEvent) => { const r = cv.getBoundingClientRect(); return { x: e.clientX - r.left, y: e.clientY - r.top }; };
    const move = (e: PointerEvent) => {
      const p = local(e);
      if (!ptr.on) { ptr.x = p.x; ptr.y = p.y; }
      ptr.tx = p.x; ptr.ty = p.y; ptr.on = true; wake();
    };
    const leave = () => { ptr.on = false; wake(); };
    const down = (e: PointerEvent) => { const p = local(e); ripples.push({ x: p.x, y: p.y, t: performance.now() }); move(e); };

    size(); draw(performance.now());
    const ro = new ResizeObserver(() => { size(); draw(performance.now()); });
    ro.observe(host);
    if (!reduced) {
      host.addEventListener('pointermove', move); host.addEventListener('pointerleave', leave); host.addEventListener('pointerdown', down);
    }
    return () => {
      cancelAnimationFrame(raf); ro.disconnect();
      host.removeEventListener('pointermove', move); host.removeEventListener('pointerleave', leave); host.removeEventListener('pointerdown', down);
    };
  }, [spacing, reach, color]);

  return <canvas ref={ref} aria-hidden="true" style={{ position: 'absolute', inset: 0, display: 'block', background: '#050509', touchAction: 'pan-y' }} />;
}
