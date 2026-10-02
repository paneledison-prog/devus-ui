import { useEffect, useId, useRef, useState, type ReactNode } from 'react';
import './Motion.css';

const reduced = () => typeof window !== 'undefined' && !!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

/* ---------- Tooltip ---------- */
export interface TooltipProps { title: string; children: ReactNode; description?: string; shortcut?: string; side?: 'top' | 'bottom'; delay?: number }
export function Tooltip({ title, description, shortcut, side = 'top', delay = 120, children }: TooltipProps) {
  const [open, setOpen] = useState(false);
  const id = useId();
  const t = useRef<number>(0);
  useEffect(() => () => window.clearTimeout(t.current), []);
  const show = () => { window.clearTimeout(t.current); t.current = window.setTimeout(() => setOpen(true), delay); };
  const hide = () => { window.clearTimeout(t.current); setOpen(false); };
  return (
    <span className="mo-tip" onMouseEnter={show} onMouseLeave={hide} onFocus={show} onBlur={hide} onKeyDown={(e) => { if (e.key === 'Escape') hide(); }}>
      <span aria-describedby={open ? id : undefined} className="mo-tip__anchor">{children}</span>
      {open ? (
        <span role="tooltip" id={id} className="mo-tip__bubble" data-side={side}>
          <span className="mo-tip__row"><b>{title}</b>{shortcut ? <kbd>{shortcut}</kbd> : null}</span>
          {description ? <span className="mo-tip__desc">{description}</span> : null}
        </span>
      ) : null}
    </span>
  );
}

/* ---------- Magnetic dock ---------- */
export interface DockItem { id: string; label: string; icon: ReactNode }
export function MagneticDock({ items, onSelect }: { items: DockItem[]; onSelect?: (id: string) => void }) {
  const [x, setX] = useState<number | null>(null);
  const [focus, setFocus] = useState<number | null>(null);
  const [active, setActive] = useState<string | null>(null);
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const still = reduced();
  const scale = (i: number) => {
    if (still) return 1;
    const el = refs.current[i]; if (!el) return 1;
    if (x != null) { const r = el.getBoundingClientRect(); const d = Math.abs(x - (r.left + r.width / 2)); return 1 + 0.7 * Math.exp(-((d / 64) ** 2)); }
    return focus === i ? 1.5 : 1;
  };
  return (
    <div className="mo-dock" role="toolbar" aria-label="Dock" onMouseMove={(e) => setX(e.clientX)} onMouseLeave={() => setX(null)}>
      {items.map((it, i) => {
        const s = scale(i);
        return (
          <span key={it.id} className="mo-dock__slot" style={{ width: 44 * s, height: 44 }}>
            <button ref={(el) => { refs.current[i] = el; }} type="button" className="mo-dock__item" aria-label={it.label} aria-pressed={active === it.id}
              style={{ transform: `scale(${s}) translateY(${(1 - s) * 2}px)` }} data-hot={s > 1.25}
              onFocus={() => setFocus(i)} onBlur={() => setFocus(null)}
              onClick={() => { setActive(active === it.id ? null : it.id); onSelect?.(it.id); }}>{it.icon}</button>
            <span className="mo-dock__label" data-show={s > 1.4} aria-hidden="true">{it.label}</span>
            {active === it.id ? <i className="mo-dock__dot" aria-hidden="true" /> : null}
          </span>
        );
      })}
    </div>
  );
}

/* ---------- Dynamic island ---------- */
type IslandState = 'idle' | 'timer' | 'call';
const fmt = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
export function DynamicIsland({ defaultState = 'idle' }: { defaultState?: IslandState }) {
  const [state, setState] = useState<IslandState>(defaultState);
  const [secs, setSecs] = useState(0);
  useEffect(() => {
    setSecs(0);
    if (state === 'idle') return;
    const id = window.setInterval(() => setSecs((v) => v + 1), 1000);
    return () => window.clearInterval(id);
  }, [state]);
  return (
    <div className="mo-island-wrap">
      <div className="mo-island" data-state={state} role="status" aria-live="polite" aria-label={state === 'idle' ? 'Idle' : state === 'timer' ? `Timer ${fmt(secs)}` : `On a call ${fmt(secs)}`}>
        {state === 'idle' ? <span className="mo-island__idle" aria-hidden="true" /> : null}
        {state === 'timer' ? <><span className="mo-island__ring" aria-hidden="true" /><span className="mo-island__time">{fmt(secs)}</span><span className="mo-island__sub">Focus</span></> : null}
        {state === 'call' ? <><span className="mo-island__av" aria-hidden="true">MV</span><span className="mo-island__col"><b>Mara Voss</b><span>{fmt(secs)}</span></span><button type="button" className="mo-island__end" aria-label="End call" onClick={() => setState('idle')}>✕</button></> : null}
      </div>
      <div className="mo-island__ctl" role="group" aria-label="Island state">
        {(['idle', 'timer', 'call'] as const).map((s) => <button key={s} type="button" aria-pressed={state === s} onClick={() => setState(s)}>{s[0].toUpperCase() + s.slice(1)}</button>)}
      </div>
    </div>
  );
}

/* ---------- Member stack ---------- */
export interface Member { name: string; role?: string; color?: string }
export function MemberStack({ members }: { members: Member[] }) {
  const initials = (n: string) => n.split(' ').map((w) => w[0]).slice(0, 2).join('');
  return (
    <ul className="mo-stack" aria-label="Team members">
      {members.map((m) => (
        <li key={m.name}>
          <button type="button" className="mo-stack__av" style={{ background: m.color ?? 'var(--default-hover)' }} aria-label={m.role ? `${m.name}, ${m.role}` : m.name}>
            {initials(m.name)}
            <span className="mo-stack__tip" aria-hidden="true"><b>{m.name}</b>{m.role ? <span>{m.role}</span> : null}</span>
          </button>
        </li>
      ))}
    </ul>
  );
}
