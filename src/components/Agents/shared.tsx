import { useEffect, useRef, useState, type ReactNode } from 'react';
import './Agents.css';
import avatarA1 from './assets/avatars/a1.webp';
import avatarA2 from './assets/avatars/a2.webp';
import avatarA3 from './assets/avatars/a3.webp';
import avatarA4 from './assets/avatars/a4.webp';
import avatarA5 from './assets/avatars/a5.webp';
import avatarA6 from './assets/avatars/a6.webp';
import avatarA7 from './assets/avatars/a7.webp';
import avatarA8 from './assets/avatars/a8.webp';
import avatarMe from './assets/avatars/me.webp';
import avatarTeam from './assets/avatars/team.webp';

export type Theme = 'light' | 'dark';

/** Portrait avatars (own 3D-style artwork supplied for the project). `avatarFor` gives the same face for the same name. */
const POOL = [avatarA1, avatarA2, avatarA3, avatarA4, avatarA5, avatarA6, avatarA7, avatarA8];
export const avatarFor = (name: string) => {
  let h = 2166136261;
  for (const ch of name) h = Math.imul(h ^ ch.charCodeAt(0), 16777619);
  h ^= h >>> 15; h = Math.imul(h, 2246822507); h ^= h >>> 13;
  return POOL[(h >>> 0) % POOL.length];
};
export const AVATAR_ME = avatarMe;
export const AVATAR_TEAM = avatarTeam;

/** A round portrait. */
export function Face({ src, size = 28, alt = '' }: { src: string; size?: number; alt?: string }) {
  return <img className="ag-avatar ag-avatar--img" src={src} alt={alt} width={size} height={size} style={{ width: size, height: size }} draggable={false} />;
}

export function I({ d, size = 16 }: { d: ReactNode; size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{d}</svg>;
}

export const ic = {
  search: <I d={<><circle cx="11" cy="11" r="6.5" /><path d="m20 20-4-4" /></>} />,
  plus: <I d={<path d="M12 5v14M5 12h14" />} />,
  x: <I size={14} d={<path d="M6 6l12 12M18 6 6 18" />} />,
  check: <I size={13} d={<path d="m5 12.5 4.5 4.5L19 7" />} />,
  chevron: <I size={14} d={<path d="m6 9 6 6 6-6" />} />,
  back: <I d={<path d="M15 5l-7 7 7 7" />} />,
  sun: <I d={<><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5 19 19M19 5l-1.5 1.5M6.5 17.5 5 19" /></>} />,
  moon: <I d={<path d="M20 14.5A8 8 0 0 1 9.5 4 8 8 0 1 0 20 14.5Z" />} />,
  chat: <I d={<path d="M4 6a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3H11l-5 4v-4a3 3 0 0 1-2-3Z" />} />,
  book: <I d={<path d="M5 4h5a2 2 0 0 1 2 2v14a2 2 0 0 0-2-2H5ZM19 4h-5a2 2 0 0 0-2 2v14a2 2 0 0 1 2-2h5Z" />} />,
  bot: <I d={<><rect x="4" y="8" width="16" height="11" rx="3" /><path d="M12 4v4M9 13h.01M15 13h.01M9 16h6" /></>} />,
  plug: <I d={<path d="M9 3v5M15 3v5M6 8h12v3a6 6 0 0 1-12 0ZM12 17v4" />} />,
  flow: <I d={<><circle cx="6" cy="6" r="2.5" /><circle cx="18" cy="18" r="2.5" /><circle cx="18" cy="6" r="2.5" /><path d="M6 8.5V12a3 3 0 0 0 3 3h6M8.5 6h7" /></>} />,
  terminal: <I d={<><rect x="3" y="4" width="18" height="16" rx="3" /><path d="m7 10 3 2-3 2M13 15h4" /></>} />,
  key: <I d={<><circle cx="8" cy="15" r="4" /><path d="m11 12 8-8M16 7l3 3" /></>} />,
  send: <I d={<path d="M5 12 20 4l-5 16-3-6Zm7 2 8-10" />} />,
  spark: <I d={<path d="M12 3v6M12 15v6M3 12h6M15 12h6M6 6l3 3M15 15l3 3M18 6l-3 3M9 15l-3 3" />} />,
  building: <I d={<><rect x="5" y="3" width="10" height="18" rx="2" /><path d="M15 9h4v12h-4M9 7h2M9 11h2M9 15h2" /></>} />,
  user: <I d={<><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></>} />,
  coin: <I d={<><circle cx="12" cy="12" r="9" /><path d="M9 10c0-1.5 1.3-2 3-2s3 .6 3 2-1.3 1.7-3 2-3 .6-3 2 1.3 2 3 2 3-.5 3-2M12 6v2m0 8v2" /></>} />,
  share: <I d={<><circle cx="6" cy="12" r="2.5" /><circle cx="18" cy="6" r="2.5" /><circle cx="18" cy="18" r="2.5" /><path d="m8.2 10.8 7.6-3.6M8.2 13.2l7.6 3.6" /></>} />,
  copy: <I size={14} d={<><rect x="8" y="8" width="12" height="12" rx="2.5" /><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2" /></>} />,
  star: <I d={<path d="m12 3.5 2.6 5.4 5.9.8-4.3 4.1 1 5.9L12 17l-5.2 2.7 1-5.9-4.3-4.1 5.9-.8Z" />} />,
  up: <I size={14} d={<path d="M12 19V5M6 11l6-6 6 6" />} />,
  doc: <I d={<path d="M7 3h7l5 5v13H7ZM14 3v5h5M10 13h6M10 17h6" />} />,
  gear: <I d={<><circle cx="12" cy="12" r="3" /><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1" /></>} />,
  git: <I d={<><circle cx="6" cy="6" r="2.5" /><circle cx="6" cy="18" r="2.5" /><circle cx="18" cy="9" r="2.5" /><path d="M6 8.5v7M18 11.5c0 4-6 3-12 5" /></>} />,
  hash: <I d={<path d="M9 4 7 20M17 4l-2 16M4 9h16M3 15h16" />} />,
  bolt: <I d={<path d="M13 3 5 14h6l-1 7 8-11h-6Z" />} />,
};

export function useDemoTheme(defaultTheme?: Theme) {
  return useState<Theme>(() => defaultTheme ?? (typeof document !== 'undefined' && document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light'));
}

export function useToast() {
  const [msg, setMsg] = useState<string | null>(null);
  const t = useRef<number>(0);
  useEffect(() => () => window.clearTimeout(t.current), []);
  const show = (m: string) => { setMsg(m); window.clearTimeout(t.current); t.current = window.setTimeout(() => setMsg(null), 2200); };
  return { node: msg ? <div className="ag-toast" role="status">{msg}</div> : null, show };
}

export function Root({ theme, name, className = '', children }: { theme: Theme; name: string; className?: string; children: ReactNode }) {
  return <div className={`ag ${className}`} data-theme={theme} aria-label={name}>{children}</div>;
}

export function Modal({ title, onClose, children, wide, foot }: { title: string; onClose: () => void; children: ReactNode; wide?: boolean; foot?: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => { ref.current?.focus(); }, []);
  return (
    <div className="ag-scrim" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className={`ag-modal${wide ? ' ag-modal--wide' : ''}`} role="dialog" aria-modal="true" aria-label={title} tabIndex={-1} ref={ref} onKeyDown={(e) => { if (e.key === 'Escape') { e.stopPropagation(); onClose(); } }}>
        <header className="ag-modal__head"><h2>{title}</h2><button className="ag-icon" aria-label="Close" onClick={onClose}>{ic.x}</button></header>
        <div className="ag-modal__body">{children}</div>
        {foot ? <footer className="ag-modal__foot">{foot}</footer> : null}
      </div>
    </div>
  );
}

export function Toggle({ on, onChange, label }: { on: boolean; onChange: (v: boolean) => void; label: string }) {
  return <button type="button" role="switch" aria-checked={on} aria-label={label} className="ag-switch" data-on={on} onClick={() => onChange(!on)}><span /></button>;
}

export function ThemeSwitch({ theme, setTheme }: { theme: Theme; setTheme: (t: Theme) => void }) {
  return (
    <div className="ag-seg" role="group" aria-label="Appearance">
      <button aria-pressed={theme === 'light'} onClick={() => setTheme('light')}>{ic.sun} Light</button>
      <button aria-pressed={theme === 'dark'} onClick={() => setTheme('dark')}>{ic.moon} Dark</button>
    </div>
  );
}

/** Closes a popover when the user presses outside of it. */
export function useOutside(open: boolean, close: () => void) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const h = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) close(); };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  });
  return ref;
}
