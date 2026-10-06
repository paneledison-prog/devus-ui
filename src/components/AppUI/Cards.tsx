import { useState, type ReactNode } from 'react';
import { useScrub, useSwipe } from './gestures';
import './AppUI.css';

/** White rounded surface used for grouped content on a mobile screen. */
export function AppCard({ children, label }: { children: ReactNode; label?: string }) {
  return <section className="app-card" aria-label={label}>{children}</section>;
}

export interface WeekDay { id: string; day: string; date: number }

/** Horizontal day picker; the selected day sits in a raised pill. Swipe it sideways to move a week forward or back. */
export function WeekStrip({ days, defaultValue, onChange }: { days: WeekDay[]; defaultValue?: string; onChange?: (id: string) => void }) {
  const [sel, setSel] = useState(`${defaultValue ?? days[0]?.id}0`);
  const [week, setWeek] = useState(0);
  const { bind, offset, dragging } = useSwipe({
    axis: 'x', follow: true, threshold: 36,
    onSwipe: (dir) => { if (dir === 'left') setWeek((w) => w + 1); if (dir === 'right') setWeek((w) => w - 1); },
  });
  const label = week === 0 ? 'Choose a day' : `Choose a day, ${Math.abs(week)} week${Math.abs(week) > 1 ? 's' : ''} ${week > 0 ? 'ahead' : 'back'}`;
  return (
    <div className="app-week" role="group" aria-label={label} {...bind}>
      <div className="app-week__track" data-dragging={dragging || undefined} style={{ transform: `translateX(${offset.x * 0.5}px)` }}>
        {days.map((d) => {
          const id = `${d.id}${week}`;
          return (
            <button key={d.id} type="button" className="app-week__day" aria-pressed={sel === id} onClick={() => { setSel(id); onChange?.(d.id); }}>
              <small>{d.day}</small>
              <strong>{((d.date + week * 7 - 1 + 310) % 31) + 1}</strong>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export interface BalanceCardProps {
  label?: string;
  amount: string;
  primary?: string;
  actions?: ReactNode;
}

const FlipIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 9h13l-3-3M20 15H7l3 3" /></svg>
);

/** High-contrast summary card with an amount, a primary pill and extra actions. Flip it (button or swipe) to see the card details on the back. */
export function BalanceCard({ label = 'Your balance', amount, primary = 'Top up', actions }: BalanceCardProps) {
  const [flipped, setFlipped] = useState(false);
  const { bind } = useSwipe({ axis: 'x', threshold: 40, onSwipe: () => setFlipped((f) => !f) });
  return (
    <div className="app-flip" data-flipped={flipped} {...bind}>
      <div className="app-flip__inner">
        <section className="app-balance app-flip__face" aria-label={label} inert={flipped}>
          <div className="app-balance__top">
            <div><p>{label}</p><strong>{amount}</strong></div>
            <div className="app-balance__tools">
              <button type="button" className="app-balance__flip" aria-label="Flip card" onClick={() => setFlipped(true)}><FlipIcon /></button>
              <button type="button" className="app-balance__pill">{primary}</button>
            </div>
          </div>
          {actions && <div className="app-balance__actions">{actions}</div>}
        </section>
        <section className="app-balance app-flip__face app-flip__back" aria-label="Card details" inert={!flipped}>
          <div className="app-balance__top">
            <div><p>Card number</p><strong className="app-balance__num">&bull;&bull;&bull;&bull; 4821</strong></div>
            <button type="button" className="app-balance__flip" aria-label="Flip back" onClick={() => setFlipped(false)}><FlipIcon /></button>
          </div>
          <dl className="app-balance__facts"><div><dt>Valid thru</dt><dd>09 / 29</dd></div><div><dt>Holder</dt><dd>Victor A.</dd></div><div><dt>Limit</dt><dd>$2,000</dd></div></dl>
        </section>
      </div>
    </div>
  );
}

export interface TrackStep { label: string; time: string; state: 'done' | 'active' | 'todo' }

/** Three-or-more step progress line (received, in transit, delivered). Drag along it to scrub the shipment forward or back. */
export function TrackSteps({ steps }: { steps: TrackStep[] }) {
  const n = steps.length;
  const [at, setAt] = useState(() => Math.max(0, steps.findIndex((s) => s.state === 'active')));
  const scrub = useScrub((f) => setAt(Math.round(f * (n - 1))));
  return (
    <div
      className="app-steps-scrub" role="slider" tabIndex={0} aria-label="Shipment progress" aria-valuemin={0} aria-valuemax={n - 1} aria-valuenow={at} aria-valuetext={steps[at]?.label}
      data-active={scrub.active || undefined} {...scrub.bind}
      onKeyDown={(e) => {
        if (e.key === 'ArrowRight' || e.key === 'ArrowUp') { e.preventDefault(); setAt((a) => Math.min(n - 1, a + 1)); }
        if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') { e.preventDefault(); setAt((a) => Math.max(0, a - 1)); }
      }}
    >
      <ol className="app-steps" aria-label="Progress">
        {steps.map((s, i) => {
          const state = i < at ? 'done' : i === at ? 'active' : 'todo';
          return (
            <li key={s.label} data-state={state} aria-current={state === 'active' ? 'step' : undefined}>
              <span className="app-steps__dot" aria-hidden="true">{state === 'done' ? '\u2713' : ''}</span>
              <span className="app-steps__label">{s.label}</span>
              <small>{state === 'todo' ? 'Pending' : s.time === 'Pending' ? 'Just now' : s.time}</small>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
