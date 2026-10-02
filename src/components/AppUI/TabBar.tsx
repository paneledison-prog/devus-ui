import { useState, type ReactNode } from 'react';
import './AppUI.css';

export interface TabBarItem { id: string; label: string; icon: ReactNode }

export interface TabBarProps {
  items: TabBarItem[];
  label?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (id: string) => void;
  /** Floating pill style: only the active tab shows its label. */
  floating?: boolean;
  /** Round action button shown beside the floating bar. */
  action?: ReactNode;
}

/** Bottom navigation bar for mobile layouts. */
export function TabBar({ items, label = 'Primary', value, defaultValue, onChange, floating = false, action }: TabBarProps) {
  const [inner, setInner] = useState(defaultValue ?? items[0]?.id);
  const current = value ?? inner;
  const nav = (
    <nav aria-label={label} className={`app-tabbar${floating ? ' app-tabbar--floating' : ''}`}>
      {items.map((it) => (
        <button
          key={it.id} type="button" className="app-tabbar__item" aria-current={current === it.id ? 'page' : undefined} aria-label={it.label}
          onClick={() => { setInner(it.id); onChange?.(it.id); }}
        >
          {it.icon}
          <span className="app-tabbar__label">{it.label}</span>
        </button>
      ))}
    </nav>
  );
  return floating ? <div className="app-tabbar-wrap">{nav}{action}</div> : nav;
}
