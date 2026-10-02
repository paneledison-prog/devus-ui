import { useState, type ReactNode } from 'react';
import './AppUI.css';

/** White rounded surface used for grouped content on a mobile screen. */
export function AppCard({ children, label }: { children: ReactNode; label?: string }) {
  return <section className="app-card" aria-label={label}>{children}</section>;
}

export interface WeekDay { id: string; day: string; date: number }

/** Horizontal day picker; the selected day sits in a raised pill. */
export function WeekStrip({ days, defaultValue, onChange }: { days: WeekDay[]; defaultValue?: string; onChange?: (id: string) => void }) {
  const [sel, setSel] = useState(defaultValue ?? days[0]?.id);
  return (
    <div className="app-week" role="group" aria-label="Choose a day">
      {days.map((d) => (
        <button key={d.id} type="button" className="app-week__day" aria-pressed={sel === d.id} onClick={() => { setSel(d.id); onChange?.(d.id); }}>
          <small>{d.day}</small>
          <strong>{d.date}</strong>
        </button>
      ))}
    </div>
  );
}

export interface BalanceCardProps {
  label?: string;
  amount: string;
  primary?: string;
  actions?: ReactNode;
}

/** High-contrast summary card with an amount, a primary pill and extra actions. */
export function BalanceCard({ label = 'Your balance', amount, primary = 'Top up', actions }: BalanceCardProps) {
  return (
    <section className="app-balance" aria-label={label}>
      <div className="app-balance__top">
        <div><p>{label}</p><strong>{amount}</strong></div>
        <button type="button" className="app-balance__pill">{primary}</button>
      </div>
      {actions && <div className="app-balance__actions">{actions}</div>}
    </section>
  );
}

export interface TrackStep { label: string; time: string; state: 'done' | 'active' | 'todo' }

/** Three-or-more step progress line (received, in transit, delivered). */
export function TrackSteps({ steps }: { steps: TrackStep[] }) {
  return (
    <ol className="app-steps" aria-label="Progress">
      {steps.map((s) => (
        <li key={s.label} data-state={s.state} aria-current={s.state === 'active' ? 'step' : undefined}>
          <span className="app-steps__dot" aria-hidden="true">{s.state === 'done' ? '✓' : ''}</span>
          <span className="app-steps__label">{s.label}</span>
          <small>{s.time}</small>
        </li>
      ))}
    </ol>
  );
}
