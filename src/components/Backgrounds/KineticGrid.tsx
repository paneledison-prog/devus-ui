import { useEffect, useRef } from 'react';

export interface KineticGridProps {
  /** Distance between grid points in px. */
  spacing?: number;
  /** Radius of the pull around the pointer in px. */
  reach?: number;
  /** Glow color as `r, g, b`. */
  color?: string;
}

type Pt = { x: number; y: number; glow: number };

/**
 * An interactive background: a fine dark grid with brighter major lines and node dots that bends toward the pointer, lights up around it
 * and sends a ripple through the grid on every click or tap. While nobody is pointing, a soft light drifts across it on its own.
 * It fills its parent. With reduced motion it draws a still grid.
 */
export function KineticGrid({ spacing = 28, reach = 190, color = '132, 104, 255' }: KineticGridProps) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = ref.current;
    const host = cv?.parentElement;
    const ctx = cv?.getContext('2d');
    if (!cv || !host || !ctx) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let w = 0; let h = 0; let raf = 0; let visible = true;
    const ptr = { x: 0, y: 0, tx: 0, ty: 0, hover: false, lastMove: -1e9 };
    const ripples: { x: number; y: number; t: number }[] = [];

    const size = () => {
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      w = host.clientWidth; h = host.clientHeight;
      cv.width = Math.round(w * dpr); cv.height = Math.round(h * dpr);
      cv.style.width = `${w}px`; cv.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const warp = (x: number, y: number, now: number, live: boolean): Pt => {
      let dx = 0; let dy = 0; let glow = 0;
      if (live) {
        const ex = ptr.x - x; const ey = ptr.y - y; const d = Math.hypot(ex, ey);
        if (d < reach) { const k = (1 - d / reach) ** 2; dx += (ex / (d || 1)) * k * 20; dy += (ey / (d || 1)) * k * 20; glow = k; }
      }
      for (const r of ripples) {
        const ex = x - r.x; const ey = y - r.y; const d = Math.hypot(ex, ey); const age = (now - r.t) / 1000;
        const dist = d - age * 440;
        if (Math.abs(dist) < 80) {
          const a = Math.cos((dist / 80) * Math.PI * 0.5) * Math.max(0, 1 - age / 1.6) * 13;
          dx += (ex / (d || 1)) * a; dy += (ey / (d || 1)) * a; glow = Math.max(glow, a / 13);
        }
      }
      return { x: x + dx, y: y + dy, glow };
    };

    const draw = (now: number, live: boolean) => {
      ctx.clearRect(0, 0, w, h);
      const cols = Math.ceil(w / spacing) + 3; const rows = Math.ceil(h / spacing) + 3;
      const ox = (w - (cols - 3) * spacing) / 2; const oy = (h - (rows - 3) * spacing) / 2;
      const pts: Pt[][] = [];
      for (let j = 0; j < rows; j++) {
        const row: Pt[] = [];
        for (let i = 0; i < cols; i++) row.push(warp(ox + (i - 1) * spacing, oy + (j - 1) * spacing, now, live));
        pts.push(row);
      }

      // soft light under the pointer
      if (live) {
        const g = ctx.createRadialGradient(ptr.x, ptr.y, 0, ptr.x, ptr.y, reach * 1.25);
        g.addColorStop(0, `rgba(${color}, 0.2)`); g.addColorStop(0.5, `rgba(${color}, 0.06)`); g.addColorStop(1, `rgba(${color}, 0)`);
        ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);
      }

      // lines: every fourth one is a brighter major line
      ctx.lineWidth = 1; ctx.lineCap = 'round';
      const seg = (a: Pt, b: Pt, major: boolean) => {
        const g = Math.max(a.glow, b.glow);
        ctx.strokeStyle = g > 0.015 ? `rgba(${color}, ${(major ? 0.2 : 0.12) + g * 0.75})` : `rgba(255, 255, 255, ${major ? 0.1 : 0.05})`;
        ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
      };
      for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
          if (i + 1 < cols) seg(pts[j][i], pts[j][i + 1], j % 4 === 0);
          if (j + 1 < rows) seg(pts[j][i], pts[j + 1][i], i % 4 === 0);
        }
      }

      // node dots
      for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
          const p = pts[j][i]; const major = i % 4 === 0 && j % 4 === 0;
          ctx.fillStyle = p.glow > 0.015 ? `rgba(${color}, ${0.35 + p.glow * 0.65})` : `rgba(255, 255, 255, ${major ? 0.3 : 0.14})`;
          const r = (major ? 1.5 : 1) + p.glow * 1.8;
          ctx.beginPath(); ctx.arc(p.x, p.y, r, 0, Math.PI * 2); ctx.fill();
        }
      }

      // ripple rings
      for (const r of ripples) {
        const age = (now - r.t) / 1000; const a = Math.max(0, 1 - age / 1.6);
        ctx.strokeStyle = `rgba(${color}, ${a * 0.35})`; ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.arc(r.x, r.y, age * 440, 0, Math.PI * 2); ctx.stroke();
      }
    };

    const frame = (now: number) => {
      // with no pointer around, a soft light drifts on its own
      const idle = !ptr.hover && now - ptr.lastMove > 1200;
      if (idle) { ptr.tx = w * (0.5 + 0.3 * Math.sin(now * 0.00042)); ptr.ty = h * (0.5 + 0.24 * Math.sin(now * 0.00058 + 1.2)); }
      ptr.x += (ptr.tx - ptr.x) * 0.1; ptr.y += (ptr.ty - ptr.y) * 0.1;
      while (ripples.length && now - ripples[0].t > 1700) ripples.shift();
      draw(now, true);
      raf = visible && !document.hidden ? requestAnimationFrame(frame) : 0;
    };
    const wake = () => { if (!raf && visible && !reduced) raf = requestAnimationFrame(frame); };

    const local = (e: PointerEvent) => { const r = cv.getBoundingClientRect(); return { x: e.clientX - r.left, y: e.clientY - r.top }; };
    const move = (e: PointerEvent) => { const p = local(e); ptr.tx = p.x; ptr.ty = p.y; ptr.hover = true; ptr.lastMove = performance.now(); wake(); };
    const leave = () => { ptr.hover = false; ptr.lastMove = performance.now(); };
    const down = (e: PointerEvent) => { const p = local(e); ripples.push({ x: p.x, y: p.y, t: performance.now() }); move(e); };

    size(); ptr.x = ptr.tx = w * 0.5; ptr.y = ptr.ty = h * 0.42;
    draw(performance.now(), !reduced);
    const ro = new ResizeObserver(() => { size(); draw(performance.now(), !reduced); });
    ro.observe(host);
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; wake(); });
    io.observe(host);
    const vis = () => wake();
    document.addEventListener('visibilitychange', vis);
    if (!reduced) {
      host.addEventListener('pointermove', move); host.addEventListener('pointerleave', leave); host.addEventListener('pointerdown', down);
      wake();
    }
    return () => {
      cancelAnimationFrame(raf); ro.disconnect(); io.disconnect(); document.removeEventListener('visibilitychange', vis);
      host.removeEventListener('pointermove', move); host.removeEventListener('pointerleave', leave); host.removeEventListener('pointerdown', down);
    };
  }, [spacing, reach, color]);

  return (
    <canvas
      ref={ref} aria-hidden="true"
      style={{ position: 'absolute', inset: 0, display: 'block', touchAction: 'pan-y', background: 'radial-gradient(120% 90% at 50% 38%, #0f0e1c 0%, #08080f 55%, #040408 100%)' }}
    />
  );
}
