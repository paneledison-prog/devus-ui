import { useCallback, useEffect, useRef, useState, type PointerEvent as RPointerEvent, type RefObject } from 'react';

/*
 * Gesture toolkit for the App items. Everything is built on pointer events, so mouse, pen and touch all work,
 * with desktop equivalents where a gesture needs more than one pointer (pinch = ctrl+wheel or two touches,
 * gyroscope = device orientation on phones and the pointer position on a desktop).
 *
 *   useSwipe      swipe / flick in four directions, with live offset for following the finger
 *   useLongPress  press and hold for a moment (with tap fallback)
 *   useHold       hold to confirm, with progress 0..1
 *   usePanScroll  drag a scroll container (mouse/pen) with momentum
 *   usePinch      two-pointer or ctrl+wheel zoom and rotate
 *   usePull       pull down to refresh at the top of a scroller (drag or wheel)
 *   useScrub      drag along a track, value 0..1
 *   useTilt       gyroscope parallax written to CSS variables --tx / --ty (-1..1)
 *   useFling      drag an element, throw it, let it spring back
 *
 * Gestures that move the pointer more than a few pixels cancel the click that would follow (so a swipe never taps).
 */

export type Dir = 'left' | 'right' | 'up' | 'down';
const MOVE_SLOP = 8;

type Bind = {
  onPointerDown: (e: RPointerEvent<Element>) => void;
  onPointerMove: (e: RPointerEvent<Element>) => void;
  onPointerUp: (e: RPointerEvent<Element>) => void;
  onPointerCancel: (e: RPointerEvent<Element>) => void;
  onClickCapture: (e: React.MouseEvent<Element>) => void;
};

/** Screen-pixel room an element has to move inside its phone: it may never be dragged out of the container. */
function roomIn(el: Element, ox: number, oy: number) {
  const box = el.closest('.app-phone')?.getBoundingClientRect();
  if (!box) return { minX: -Infinity, maxX: Infinity, minY: -Infinity, maxY: Infinity };
  const r = el.getBoundingClientRect();
  const l = r.left - ox; const t = r.top - oy; const rt = r.right - ox; const b = r.bottom - oy;
  return { minX: Math.min(0, box.left - l), maxX: Math.max(0, box.right - rt), minY: Math.min(0, box.top - t), maxY: Math.max(0, box.bottom - b) };
}
const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

/** Frozen clocks and timers for the design bench. */
export const benchFrozen = () => typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('bench') === '1';

/* ---------- swipe / flick ---------- */
export interface SwipeOptions {
  threshold?: number;
  /** px per ms that turns a swipe into a flick */
  flickSpeed?: number;
  axis?: 'x' | 'y' | 'both';
  onSwipe?: (dir: Dir, e: { dx: number; dy: number; speed: number }) => void;
  onFlick?: (dir: Dir, speed: number) => void;
  /** follow the pointer while dragging (used for cards) */
  follow?: boolean;
  /** ignore gestures that start on interactive children */
  ignore?: string;
}

export function useSwipe(opts: SwipeOptions) {
  const o = useRef(opts);
  o.current = opts;
  const start = useRef<{ x: number; y: number; t: number; id: number; moved: boolean; lock: 'x' | 'y' | null } | null>(null);
  const suppress = useRef(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);

  const bind: Bind = {
    onPointerDown: (e) => {
      if (e.pointerType === 'mouse' && e.button !== 0) return;
      const ig = o.current.ignore;
      if (ig && (e.target as HTMLElement).closest(ig)) return;
      start.current = { x: e.clientX, y: e.clientY, t: performance.now(), id: e.pointerId, moved: false, lock: null };
      suppress.current = false;
    },
    onPointerMove: (e) => {
      const s = start.current;
      if (!s || s.id !== e.pointerId) return;
      const dx = e.clientX - s.x;
      const dy = e.clientY - s.y;
      if (!s.moved && Math.hypot(dx, dy) > MOVE_SLOP) {
        s.moved = true;
        s.lock = Math.abs(dx) > Math.abs(dy) ? 'x' : 'y';
        const ax = o.current.axis ?? 'both';
        if (ax !== 'both' && ax !== s.lock) { start.current = null; return; }
        (e.currentTarget as Element).setPointerCapture?.(e.pointerId);
        suppress.current = true;
        setDragging(true);
      }
      if (s.moved && o.current.follow) {
        const box = (e.currentTarget as Element).closest('.app-phone')?.getBoundingClientRect();
        const mx = box ? box.width * 0.7 : Infinity; const my = box ? box.height * 0.7 : Infinity;
        setOffset({ x: clamp(s.lock === 'y' && o.current.axis === 'y' ? 0 : dx, -mx, mx), y: clamp(s.lock === 'x' && o.current.axis === 'x' ? 0 : dy, -my, my) });
      }
    },
    onPointerUp: (e) => {
      const s = start.current;
      start.current = null;
      if (!s || s.id !== e.pointerId) return;
      window.setTimeout(() => { suppress.current = false; }, 0);
      setDragging(false);
      setOffset({ x: 0, y: 0 });
      if (!s.moved) return;
      const dx = e.clientX - s.x;
      const dy = e.clientY - s.y;
      const dt = Math.max(1, performance.now() - s.t);
      const speed = Math.hypot(dx, dy) / dt;
      const th = o.current.threshold ?? 48;
      const flick = speed >= (o.current.flickSpeed ?? 0.9);
      const horizontal = Math.abs(dx) >= Math.abs(dy);
      if (Math.max(Math.abs(dx), Math.abs(dy)) < th && !flick) return;
      const dir: Dir = horizontal ? (dx < 0 ? 'left' : 'right') : dy < 0 ? 'up' : 'down';
      o.current.onSwipe?.(dir, { dx, dy, speed });
      if (flick) o.current.onFlick?.(dir, speed);
    },
    onPointerCancel: () => { start.current = null; setDragging(false); setOffset({ x: 0, y: 0 }); },
    onClickCapture: (e) => { if (suppress.current) { e.stopPropagation(); e.preventDefault(); suppress.current = false; } },
  };
  return { bind, offset, dragging };
}

/* ---------- long press ---------- */
export function useLongPress(onLong: (e: RPointerEvent<Element>) => void, ms = 520) {
  const timer = useRef<number | undefined>(undefined);
  const origin = useRef<{ x: number; y: number } | null>(null);
  const fired = useRef(false);
  const [pressing, setPressing] = useState(false);
  const cb = useRef(onLong);
  cb.current = onLong;
  const clear = () => { window.clearTimeout(timer.current); origin.current = null; setPressing(false); };
  const bind: Bind = {
    onPointerDown: (e) => {
      if (e.pointerType === 'mouse' && e.button !== 0) return;
      fired.current = false;
      origin.current = { x: e.clientX, y: e.clientY };
      setPressing(true);
      const target = e;
      timer.current = window.setTimeout(() => { fired.current = true; setPressing(false); cb.current(target); }, ms);
    },
    onPointerMove: (e) => { const o = origin.current; if (o && Math.hypot(e.clientX - o.x, e.clientY - o.y) > MOVE_SLOP) clear(); },
    onPointerUp: () => { clear(); window.setTimeout(() => { fired.current = false; }, 0); },
    onPointerCancel: () => { clear(); window.setTimeout(() => { fired.current = false; }, 0); },
    onClickCapture: (e) => { if (fired.current) { e.stopPropagation(); e.preventDefault(); fired.current = false; } },
  };
  useEffect(() => () => window.clearTimeout(timer.current), []);
  return { bind, pressing };
}

/* ---------- hold to confirm ---------- */
export function useHold(onComplete: () => void, ms = 900) {
  const [progress, setProgress] = useState(0);
  const raf = useRef(0);
  const t0 = useRef(0);
  const done = useRef(false);
  const cb = useRef(onComplete);
  cb.current = onComplete;
  const stop = useCallback(() => { cancelAnimationFrame(raf.current); setProgress(0); }, []);
  const tick = useCallback(() => {
    const p = Math.min(1, (performance.now() - t0.current) / ms);
    setProgress(p);
    if (p >= 1) { if (!done.current) { done.current = true; cb.current(); } setProgress(0); return; }
    raf.current = requestAnimationFrame(tick);
  }, [ms]);
  const bind = {
    onPointerDown: (e: RPointerEvent<Element>) => { if (e.pointerType === 'mouse' && e.button !== 0) return; done.current = false; t0.current = performance.now(); cancelAnimationFrame(raf.current); raf.current = requestAnimationFrame(tick); },
    onPointerUp: stop,
    onPointerLeave: stop,
    onPointerCancel: stop,
    onKeyDown: (e: React.KeyboardEvent<HTMLElement>) => { if ((e.key === ' ' || e.key === 'Enter') && !e.repeat) { done.current = false; t0.current = performance.now(); raf.current = requestAnimationFrame(tick); } },
    onKeyUp: (e: React.KeyboardEvent<HTMLElement>) => { if (e.key === ' ' || e.key === 'Enter') stop(); },
  };
  useEffect(() => () => cancelAnimationFrame(raf.current), []);
  return { bind, progress, holding: progress > 0 };
}

/* ---------- pan (drag a scroll container) ---------- */
export function usePanScroll(ref: RefObject<HTMLElement | null>, axis: 'x' | 'y' = 'x') {
  const st = useRef<{ p: number; s: number; id: number; last: number; t: number; v: number; moved: boolean } | null>(null);
  const raf = useRef(0);
  const suppress = useRef(false);
  const bind: Bind = {
    onPointerDown: (e) => {
      if (e.pointerType === 'touch' || (e.pointerType === 'mouse' && e.button !== 0)) return; // touch scrolls natively
      const el = ref.current; if (!el) return;
      cancelAnimationFrame(raf.current);
      const p = axis === 'x' ? e.clientX : e.clientY;
      st.current = { p, s: axis === 'x' ? el.scrollLeft : el.scrollTop, id: e.pointerId, last: p, t: performance.now(), v: 0, moved: false };
      suppress.current = false;
    },
    onPointerMove: (e) => {
      const s = st.current; const el = ref.current;
      if (!s || !el || s.id !== e.pointerId) return;
      const p = axis === 'x' ? e.clientX : e.clientY;
      if (!s.moved && Math.abs(p - s.p) > MOVE_SLOP) { s.moved = true; suppress.current = true; (e.currentTarget as Element).setPointerCapture?.(e.pointerId); }
      if (!s.moved) return;
      const now = performance.now();
      s.v = (s.last - p) / Math.max(1, now - s.t);
      s.last = p; s.t = now;
      const next = s.s - (p - s.p);
      if (axis === 'x') el.scrollLeft = next; else el.scrollTop = next;
    },
    onPointerUp: () => {
      const s = st.current; const el = ref.current;
      st.current = null;
      window.setTimeout(() => { suppress.current = false; }, 0);
      if (!s || !s.moved || !el) return;
      let v = s.v * 16;
      const step = () => { if (Math.abs(v) < 0.3) return; if (axis === 'x') el.scrollLeft += v; else el.scrollTop += v; v *= 0.94; raf.current = requestAnimationFrame(step); };
      raf.current = requestAnimationFrame(step);
    },
    onPointerCancel: () => { st.current = null; },
    onClickCapture: (e) => { if (suppress.current) { e.stopPropagation(); e.preventDefault(); suppress.current = false; } },
  };
  useEffect(() => () => cancelAnimationFrame(raf.current), []);
  return bind;
}

/* ---------- pinch ---------- */
export function usePinch(ref: RefObject<HTMLElement | null>, onChange: (v: { scale: number; rotate: number }) => void, opts: { min?: number; max?: number; enabled?: boolean; onEnd?: () => void } = {}) {
  const cb = useRef(onChange);
  cb.current = onChange;
  const o = useRef(opts);
  o.current = opts;
  const state = useRef({ scale: 1, rotate: 0 });
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const pts = new Map<number, { x: number; y: number }>();
    let d0 = 0; let a0 = 0; let s0 = 1; let r0 = 0;
    const clamp = (s: number) => Math.min(o.current.max ?? 3, Math.max(o.current.min ?? 0.5, s));
    const emit = () => cb.current({ ...state.current });
    const metrics = () => { const [a, b] = [...pts.values()]; return { d: Math.hypot(a.x - b.x, a.y - b.y), ang: (Math.atan2(b.y - a.y, b.x - a.x) * 180) / Math.PI }; };
    const down = (e: PointerEvent) => {
      if (o.current.enabled === false) return;
      pts.set(e.pointerId, { x: e.clientX, y: e.clientY });
      if (pts.size === 2) { const m = metrics(); d0 = m.d; a0 = m.ang; s0 = state.current.scale; r0 = state.current.rotate; }
    };
    const move = (e: PointerEvent) => {
      if (!pts.has(e.pointerId)) return;
      pts.set(e.pointerId, { x: e.clientX, y: e.clientY });
      if (pts.size === 2 && d0 > 0) { const m = metrics(); state.current = { scale: clamp(s0 * (m.d / d0)), rotate: r0 + (m.ang - a0) }; emit(); }
    };
    let wheelTimer = 0;
    const up = (e: PointerEvent) => { const was = pts.size; pts.delete(e.pointerId); if (was === 2) { d0 = 0; o.current.onEnd?.(); } };
    const wheel = (e: WheelEvent) => {
      if (o.current.enabled === false || !e.ctrlKey) return; // trackpad pinch and ctrl+wheel
      e.preventDefault();
      window.clearTimeout(wheelTimer); wheelTimer = window.setTimeout(() => o.current.onEnd?.(), 380);
      state.current = { ...state.current, scale: clamp(state.current.scale * Math.exp(-e.deltaY * 0.01)) };
      emit();
    };
    el.addEventListener('pointerdown', down); el.addEventListener('pointermove', move); el.addEventListener('pointerup', up); el.addEventListener('pointercancel', up); el.addEventListener('wheel', wheel, { passive: false });
    return () => { el.removeEventListener('pointerdown', down); el.removeEventListener('pointermove', move); el.removeEventListener('pointerup', up); el.removeEventListener('pointercancel', up); el.removeEventListener('wheel', wheel); };
  }, [ref]);
  return {
    reset: () => { state.current = { scale: 1, rotate: 0 }; cb.current({ scale: 1, rotate: 0 }); },
    set: (scale: number, rotate = state.current.rotate) => { state.current = { scale, rotate }; cb.current({ scale, rotate }); },
  };
}

/* ---------- pull to refresh ---------- */
export function usePull(ref: RefObject<HTMLElement | null>, onRefresh: () => void, opts: { threshold?: number; ms?: number } = {}) {
  const [pull, setPull] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const cb = useRef(onRefresh);
  cb.current = onRefresh;
  const th = opts.threshold ?? 64;
  const ms = opts.ms ?? 1100;
  const busy = useRef(false);
  const fire = useCallback(() => {
    if (busy.current) return;
    busy.current = true; setRefreshing(true); setPull(th * 0.7);
    window.setTimeout(() => { cb.current(); busy.current = false; setRefreshing(false); setPull(0); }, ms);
  }, [th, ms]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let y0 = 0; let active = false; let wheelAcc = 0; let wheelTimer = 0; let cur = 0;
    const down = (e: PointerEvent) => { if (el.scrollTop <= 0 && !busy.current && (e.pointerType !== 'mouse' || e.button === 0)) { y0 = e.clientY; active = true; } };
    const move = (e: PointerEvent) => {
      if (!active) return;
      const dy = e.clientY - y0;
      if (dy > 0 && el.scrollTop <= 0) { cur = Math.min(th * 1.6, dy * 0.55); setPull(cur); } else if (dy < 0) { active = false; cur = 0; setPull(0); }
    };
    const up = () => { if (!active) return; active = false; if (cur >= th) fire(); else setPull(0); cur = 0; };
    const wheel = (e: WheelEvent) => {
      if (el.scrollTop > 0 || e.deltaY >= 0 || busy.current) { wheelAcc = 0; return; }
      wheelAcc += -e.deltaY;
      setPull(Math.min(th * 1.4, wheelAcc * 0.5));
      window.clearTimeout(wheelTimer);
      if (wheelAcc * 0.5 >= th) { wheelAcc = 0; fire(); } else wheelTimer = window.setTimeout(() => { wheelAcc = 0; if (!busy.current) setPull(0); }, 260);
    };
    el.addEventListener('pointerdown', down); el.addEventListener('pointermove', move); el.addEventListener('pointerup', up); el.addEventListener('pointercancel', up); el.addEventListener('wheel', wheel, { passive: true });
    return () => { el.removeEventListener('pointerdown', down); el.removeEventListener('pointermove', move); el.removeEventListener('pointerup', up); el.removeEventListener('pointercancel', up); el.removeEventListener('wheel', wheel); window.clearTimeout(wheelTimer); };
  }, [ref, th, fire]);
  return { pull, refreshing, progress: Math.min(1, pull / th), trigger: fire };
}

/* ---------- scrub ---------- */
export function useScrub(onScrub: (frac: number, final: boolean) => void, axis: 'x' | 'y' = 'x') {
  const cb = useRef(onScrub);
  cb.current = onScrub;
  const [active, setActive] = useState(false);
  const frac = (e: RPointerEvent<Element>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const v = axis === 'x' ? (e.clientX - r.left) / r.width : (e.clientY - r.top) / r.height;
    return Math.min(1, Math.max(0, v));
  };
  const bind = {
    onPointerDown: (e: RPointerEvent<Element>) => { (e.currentTarget as Element).setPointerCapture?.(e.pointerId); setActive(true); cb.current(frac(e), false); },
    onPointerMove: (e: RPointerEvent<Element>) => { if (active) cb.current(frac(e), false); },
    onPointerUp: (e: RPointerEvent<Element>) => { if (active) { setActive(false); cb.current(frac(e), true); } },
    onPointerCancel: () => setActive(false),
  };
  return { bind, active };
}

/* ---------- gyroscope / tilt ---------- */
type OrientationCtor = typeof DeviceOrientationEvent & { requestPermission?: () => Promise<'granted' | 'denied'> };
/**
 * Parallax from the device orientation (beta / gamma). On a desktop the pointer position over `host`
 * stands in for tilting the phone. Writes --tx and --ty (-1..1) on `target` without re-rendering.
 */
export function useTilt(host: RefObject<HTMLElement | null>, target: RefObject<HTMLElement | SVGElement | null>, enabled = true) {
  const [mode, setMode] = useState<'none' | 'gyro' | 'pointer'>('none');
  const [needsPermission, setNeedsPermission] = useState(false);
  const cur = useRef({ x: 0, y: 0 });
  const goal = useRef({ x: 0, y: 0 });
  const raf = useRef(0);
  const gyroSeen = useRef(false);

  const loop = useCallback(() => {
    const t = target.current;
    cur.current.x += (goal.current.x - cur.current.x) * 0.12;
    cur.current.y += (goal.current.y - cur.current.y) * 0.12;
    if (t) { t.style.setProperty('--tx', cur.current.x.toFixed(3)); t.style.setProperty('--ty', cur.current.y.toFixed(3)); }
    if (Math.abs(goal.current.x - cur.current.x) > 0.002 || Math.abs(goal.current.y - cur.current.y) > 0.002) raf.current = requestAnimationFrame(loop);
  }, [target]);
  const kick = useCallback(() => { cancelAnimationFrame(raf.current); raf.current = requestAnimationFrame(loop); }, [loop]);

  useEffect(() => {
    if (!enabled || (window.matchMedia('(prefers-reduced-motion: reduce)').matches)) return;
    const el = host.current;
    const onOrient = (e: DeviceOrientationEvent) => {
      if (e.gamma == null || e.beta == null) return;
      gyroSeen.current = true;
      setMode('gyro');
      goal.current = { x: Math.max(-1, Math.min(1, e.gamma / 30)), y: Math.max(-1, Math.min(1, (e.beta - 45) / 30)) };
      kick();
    };
    const Ctor = (typeof window !== 'undefined' ? (window as unknown as { DeviceOrientationEvent?: OrientationCtor }).DeviceOrientationEvent : undefined);
    if (Ctor) {
      if (typeof Ctor.requestPermission === 'function') setNeedsPermission(true);
      else window.addEventListener('deviceorientation', onOrient);
    }
    const onPointer = (e: PointerEvent) => {
      if (gyroSeen.current || e.pointerType === 'touch' || !el) return;
      const r = el.getBoundingClientRect();
      setMode((m) => (m === 'gyro' ? m : 'pointer'));
      goal.current = { x: ((e.clientX - r.left) / r.width - 0.5) * 2, y: ((e.clientY - r.top) / r.height - 0.5) * 2 };
      kick();
    };
    const onLeave = () => { goal.current = { x: 0, y: 0 }; kick(); };
    el?.addEventListener('pointermove', onPointer);
    el?.addEventListener('pointerleave', onLeave);
    return () => { window.removeEventListener('deviceorientation', onOrient); el?.removeEventListener('pointermove', onPointer); el?.removeEventListener('pointerleave', onLeave); cancelAnimationFrame(raf.current); };
  }, [host, enabled, kick]);

  const request = useCallback(async () => {
    const Ctor = (window as unknown as { DeviceOrientationEvent?: OrientationCtor }).DeviceOrientationEvent;
    if (Ctor?.requestPermission) {
      try { if ((await Ctor.requestPermission()) === 'granted') { setNeedsPermission(false); window.addEventListener('deviceorientation', (e) => { if (e.gamma == null || e.beta == null) return; gyroSeen.current = true; setMode('gyro'); goal.current = { x: Math.max(-1, Math.min(1, e.gamma / 30)), y: Math.max(-1, Math.min(1, (e.beta - 45) / 30)) }; kick(); }); } } catch { /* denied */ }
    }
  }, [kick]);
  return { mode, needsPermission, request };
}

/* ---------- fling (drag, throw, spring back) ---------- */
export function useFling(opts: { returns?: boolean; onFling?: (dir: Dir, speed: number) => void } = {}) {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const ref = useRef({ x: 0, y: 0, vx: 0, vy: 0, sx: 0, sy: 0, ox: 0, oy: 0, id: -1, t: 0, lx: 0, ly: 0, moved: false, el: null as Element | null, lim: { minX: -Infinity, maxX: Infinity, minY: -Infinity, maxY: Infinity } });
  const raf = useRef(0);
  const o = useRef(opts);
  o.current = opts;
  const suppress = useRef(false);

  const animate = useCallback(() => {
    const s = ref.current;
    const ret = o.current.returns !== false;
    s.x += s.vx; s.y += s.vy;
    if (s.x < s.lim.minX || s.x > s.lim.maxX) { s.x = clamp(s.x, s.lim.minX, s.lim.maxX); s.vx *= -0.4; }
    if (s.y < s.lim.minY || s.y > s.lim.maxY) { s.y = clamp(s.y, s.lim.minY, s.lim.maxY); s.vy *= -0.4; }
    s.vx *= 0.93; s.vy *= 0.93;
    if (ret) { s.vx += -s.x * 0.04; s.vy += -s.y * 0.04; }
    setPos({ x: s.x, y: s.y });
    const still = Math.abs(s.vx) < 0.15 && Math.abs(s.vy) < 0.15 && (!ret || (Math.abs(s.x) < 0.6 && Math.abs(s.y) < 0.6));
    if (still) { if (ret) { s.x = 0; s.y = 0; setPos({ x: 0, y: 0 }); } return; }
    raf.current = requestAnimationFrame(animate);
  }, []);

  const bind: Bind = {
    onPointerDown: (e) => {
      if (e.pointerType === 'mouse' && e.button !== 0) return;
      cancelAnimationFrame(raf.current);
      const s = ref.current;
      s.el = e.currentTarget; s.id = e.pointerId; s.sx = e.clientX; s.sy = e.clientY; s.ox = s.x; s.oy = s.y; s.vx = 0; s.vy = 0; s.t = performance.now(); s.lx = e.clientX; s.ly = e.clientY; s.moved = false;
      s.lim = roomIn(e.currentTarget, s.x, s.y);
      suppress.current = false;
    },
    onPointerMove: (e) => {
      const s = ref.current;
      if (s.id !== e.pointerId) return;
      const dx = e.clientX - s.sx; const dy = e.clientY - s.sy;
      if (!s.moved && Math.hypot(dx, dy) > MOVE_SLOP) { s.moved = true; suppress.current = true; (e.currentTarget as Element).setPointerCapture?.(e.pointerId); setDragging(true); }
      if (!s.moved) return;
      const now = performance.now(); const dt = Math.max(1, now - s.t);
      s.vx = ((e.clientX - s.lx) / dt) * 16; s.vy = ((e.clientY - s.ly) / dt) * 16; s.lx = e.clientX; s.ly = e.clientY; s.t = now;
      s.x = clamp(s.ox + dx, s.lim.minX, s.lim.maxX); s.y = clamp(s.oy + dy, s.lim.minY, s.lim.maxY);
      setPos({ x: s.x, y: s.y });
    },
    onPointerUp: () => {
      const s = ref.current;
      if (s.id === -1) return;
      s.id = -1;
      window.setTimeout(() => { suppress.current = false; }, 0);
      setDragging(false);
      if (!s.moved) return;
      const speed = Math.hypot(s.vx, s.vy);
      if (speed > 14 && o.current.onFling) o.current.onFling(Math.abs(s.vx) > Math.abs(s.vy) ? (s.vx < 0 ? 'left' : 'right') : s.vy < 0 ? 'up' : 'down', speed);
      raf.current = requestAnimationFrame(animate);
    },
    onPointerCancel: () => { ref.current.id = -1; setDragging(false); raf.current = requestAnimationFrame(animate); },
    onClickCapture: (e) => { if (suppress.current) { e.stopPropagation(); e.preventDefault(); suppress.current = false; } },
  };
  useEffect(() => () => cancelAnimationFrame(raf.current), []);
  return { pos, dragging, bind };
}

/** useTilt with the phone around `target` as the pointer area (the nearest `.app-phone`). */
export function useTiltAuto(target: RefObject<HTMLElement | SVGElement | null>, enabled = true) {
  const host = useRef<HTMLElement | null>(null);
  useEffect(() => { host.current = (target.current?.closest('.app-phone') as HTMLElement | null) ?? (target.current?.parentElement ?? null); }, [target]);
  return useTilt(host, target, enabled);
}

/** Small pill shown only where the browser asks for permission to read the gyroscope (iOS Safari). */
export function TiltButton({ tilt }: { tilt: { needsPermission: boolean; request: () => void } }) {
  if (!tilt.needsPermission) return null;
  return <button type="button" className="app-tilt-btn" onClick={tilt.request}>Enable tilt</button>;
}

/** A floating decoration: parallax from the tilt vars, plus drag and fling with a spring back. Spread `bind` and `style` on an absolutely positioned element. */
export function useDrift(depth: number) {
  const ref = useRef<HTMLElement | null>(null);
  const fling = useFling();
  const p = ref.current?.parentElement;
  const k = p && p.offsetWidth ? p.getBoundingClientRect().width / p.offsetWidth || 1 : 1;
  return {
    ref,
    bind: fling.bind,
    dragging: fling.dragging,
    style: {
      translate: `calc(var(--tx, 0) * ${depth}px + ${(fling.pos.x / k).toFixed(1)}px) calc(var(--ty, 0) * ${depth}px + ${(fling.pos.y / k).toFixed(1)}px)`,
      touchAction: 'none',
    } as const,
  };
}
