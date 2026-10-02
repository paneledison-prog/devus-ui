import { useState, type ReactNode, type SVGProps } from 'react';
import { Button } from '../Button/Button';
import { Switch } from '../Switch/Switch';
import { Checkbox } from '../Checkbox/Checkbox';
import './Blocks.css';

function Icon({ children, ...rest }: SVGProps<SVGSVGElement> & { children: ReactNode }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...rest}>
      {children}
    </svg>
  );
}
const Refresh = () => <Icon><path d="M21 12a9 9 0 1 1-3-6.7" /><path d="M21 4v5h-5" /></Icon>;
const Plus = () => <Icon><path d="M12 5v14M5 12h14" /></Icon>;
const ArrowUp = () => <Icon><path d="M12 19V5M5 12l7-7 7 7" /></Icon>;
const Close = () => <Icon><path d="M6 6l12 12M18 6 6 18" /></Icon>;
const Chat = () => <Icon width="20" height="20"><path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1.1-4.6A8 8 0 1 1 21 12Z" strokeDasharray="3 3" /></Icon>;
const SearchI = () => <Icon><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></Icon>;
const ArrowRight = () => <Icon width="16" height="16"><path d="M5 12h14M13 6l6 6-6 6" /></Icon>;
const Chevron = () => <Icon width="16" height="16"><path d="m6 15 6-6 6 6" /></Icon>;

/* ---------- Chat ---------- */
export function ChatCard({ name = 'Ada', onSend }: { name?: string; onSend?: (text: string) => void }) {
  const [text, setText] = useState('');
  return (
    <section className="blk-card blk-chat" aria-label="New chat">
      <header className="blk-head blk-chat__head">
        <div><h3 className="blk-card__title">New Chat</h3><p className="blk-card__desc">How can I help you today?</p></div>
        <button type="button" className="blk-icon-btn" aria-label="Start a new conversation"><Refresh /></button>
      </header>
      <div className="blk-chat__empty">
        <span className="blk-chat__icon"><Chat /></span>
        <h4>Morning, {name}!</h4>
        <p>What are we working on today? Press send to start a new conversation</p>
      </div>
      <form className="blk-composer" onSubmit={(e) => { e.preventDefault(); if (text.trim()) { onSend?.(text); setText(''); } }}>
        <textarea rows={2} value={text} onChange={(e) => setText(e.target.value)} placeholder="Ask anything…" aria-label="Message" />
        <div className="blk-composer__row">
          <button type="button" className="blk-icon-btn" aria-label="Attach a file"><Plus /></button>
          <button type="submit" className="blk-send" aria-label="Send message"><ArrowUp /></button>
        </div>
      </form>
    </section>
  );
}

/* ---------- Milestone form ---------- */
export function MilestoneCard({ onSubmit, onCancel }: { onSubmit?: (v: { goal: string; amount: string; date: string }) => void; onCancel?: () => void }) {
  return (
    <form className="blk-card" aria-label="New milestone"
      onSubmit={(e) => { e.preventDefault(); const f = new FormData(e.currentTarget); onSubmit?.({ goal: String(f.get('goal')), amount: String(f.get('amount')), date: String(f.get('date')) }); }}>
      <div><h3 className="blk-card__title">Set a new milestone</h3><p className="blk-card__desc">Define your financial target and we'll help you pace your savings.</p></div>
      <div className="blk-field"><label htmlFor="blk-goal">Goal Name</label><input id="blk-goal" name="goal" className="blk-input" placeholder="e.g. New Car, Home Downpayment" /></div>
      <div className="blk-grid2">
        <div className="blk-field"><label htmlFor="blk-amount">Target Amount</label><input id="blk-amount" name="amount" className="blk-input" defaultValue="$15,000" inputMode="decimal" /></div>
        <div className="blk-field"><label htmlFor="blk-date">Target Date</label><input id="blk-date" name="date" className="blk-input" defaultValue="Dec 2025" /></div>
      </div>
      <div style={{ display: 'grid', gap: 8 }}>
        <Button type="submit" size="md" className="blk-wide">Create Goal</Button>
        <Button type="button" size="md" variant="outline" className="blk-wide" onClick={onCancel}>Cancel</Button>
      </div>
    </form>
  );
}

/* ---------- QR connect ---------- */
function qrCells(): [number, number][] {
  // Decorative pseudo-random QR-like pattern with three finder squares. Not a scannable code.
  const n = 21; const cells: [number, number][] = []; let seed = 7;
  const rnd = () => { seed = (seed * 1103515245 + 12345) & 0x7fffffff; return seed / 0x7fffffff; };
  const inFinder = (x: number, y: number) => (x < 8 && y < 8) || (x > 12 && y < 8) || (x < 8 && y > 12);
  for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
    if (inFinder(x, y)) {
      const fx = x > 12 ? x - 14 : x; const fy = y > 12 ? y - 14 : y;
      const ring = fx === 0 || fx === 6 || fy === 0 || fy === 6; const core = fx >= 2 && fx <= 4 && fy >= 2 && fy <= 4;
      if (fx <= 6 && fy <= 6 && (ring || core)) cells.push([x, y]);
    } else if (rnd() > 0.52) cells.push([x, y]);
  }
  return cells;
}
const QR = qrCells();

export function QrCard({ title = 'Scan to connect your mobile device', hint = 'Open the mobile app and scan this code to link your device.' }: { title?: string; hint?: string }) {
  return (
    <section className="blk-card blk-qr" aria-label="Connect a device">
      <div className="blk-qr__frame">
        <svg viewBox="0 0 21 21" role="img" aria-label="Example QR code (decorative pattern, not scannable)" shapeRendering="crispEdges">
          <rect width="21" height="21" fill="#fff" />
          {QR.map(([x, y]) => <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" fill="currentColor" />)}
        </svg>
      </div>
      <strong>{title}</strong>
      <p className="blk-card__desc">{hint}</p>
    </section>
  );
}

/* ---------- Payout threshold ---------- */
export function PayoutCard({ min = 50, max = 10000, initial = 2500, onSave, onDismiss }: { min?: number; max?: number; initial?: number; onSave?: (amount: number) => void; onDismiss?: () => void }) {
  const [v, setV] = useState(initial);
  const pct = ((v - min) / (max - min)) * 100;
  return (
    <form className="blk-card" aria-label="Payout threshold" onSubmit={(e) => { e.preventDefault(); onSave?.(v); }}>
      <header className="blk-head">
        <div><h3 className="blk-card__title">Payout Threshold</h3><p className="blk-card__desc">Set the minimum balance required before a payout is triggered.</p></div>
        <button type="button" className="blk-icon-btn blk-icon-btn--soft" aria-label="Dismiss payout threshold" onClick={onDismiss}><Close /></button>
      </header>
      <div className="blk-field"><label htmlFor="blk-cur">Preferred Currency</label>
        <select id="blk-cur" className="blk-select" defaultValue="usd"><option value="usd">USD — United States Dollar</option><option value="eur">EUR — Euro</option><option value="gbp">GBP — British Pound</option></select>
      </div>
      <div>
        <div className="blk-amount"><label htmlFor="blk-pay">Minimum Payout Amount</label><strong>${v.toFixed(2)}</strong></div>
        <input id="blk-pay" type="range" className="blk-range" min={min} max={max} step={50} value={v} style={{ ['--p' as string]: `${pct}%` }} onChange={(e) => setV(Number(e.target.value))} />
        <div className="blk-minmax"><span>${min.toLocaleString()} (MIN)</span><span>${max.toLocaleString()} (MAX)</span></div>
      </div>
      <div className="blk-field"><label htmlFor="blk-notes">Notes</label><textarea id="blk-notes" className="blk-textarea" rows={3} placeholder="Add any notes for this payout configuration…" /></div>
      <Button type="submit" className="blk-wide">Save Threshold</Button>
    </form>
  );
}

/* ---------- Nav cards ---------- */
const navIcons: Record<string, ReactNode> = {
  Analytics: <Icon><path d="M4 20V10M10 20V4M16 20v-8M22 20H2" /></Icon>,
  Transactions: <Icon><path d="M4 8h16M16 4l4 4-4 4M20 16H4M8 12l-4 4 4 4" /></Icon>,
  Investments: <Icon><path d="M3 17l6-6 4 4 8-8M15 7h6v6" /></Icon>,
  Accounts: <Icon><path d="M3 10 12 4l9 6M5 10v8M10 10v8M14 10v8M19 10v8M3 20h18" /></Icon>,
  Spending: <Icon><path d="M12 3v9h9" /><path d="M20.5 15A9 9 0 1 1 9 3.5" /></Icon>,
  Profile: <Icon><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></Icon>,
  Billing: <Icon><rect x="3" y="5" width="18" height="14" rx="3" /><path d="M3 10h18" /></Icon>,
  Notifications: <Icon><path d="M6 17V11a6 6 0 0 1 12 0v6l2 2H4l2-2Z" /><path d="M10 21h4" /></Icon>,
  Security: <Icon><path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6l-8-3Z" /></Icon>,
  Appearance: <Icon><path d="M12 3a9 9 0 1 0 0 18c1.5 0 2-1 1.5-2s0-2 1.5-2h2a3 3 0 0 0 3-3A9 9 0 0 0 12 3Z" /></Icon>,
};

function NavGroup({ label, items, active }: { label: string; items: string[]; active: string }) {
  return (
    <nav className="blk-card blk-nav" aria-label={label}>
      <span className="blk-nav__label">{label}</span>
      {items.map((it) => <a key={it} href="#" aria-current={it === active ? 'page' : undefined} onClick={(e) => e.preventDefault()}>{navIcons[it]}{it}</a>)}
    </nav>
  );
}

export function NavCards() {
  return (
    <div className="blk-navs">
      <NavGroup label="Overview" items={['Analytics', 'Transactions', 'Investments', 'Accounts', 'Spending']} active="Analytics" />
      <NavGroup label="Account" items={['Profile', 'Billing', 'Notifications', 'Security', 'Appearance']} active="Billing" />
    </div>
  );
}

/* ---------- Controls showcase ---------- */
export function ShowcaseCard() {
  return (
    <section className="blk-card" aria-label="Controls">
      <div className="blk-row">
        <Button endContent={<ArrowRight />}>Button</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
      </div>
      <div className="blk-search"><input className="blk-input" placeholder="Name" aria-label="Name" /><SearchI /></div>
      <textarea className="blk-textarea" rows={2} placeholder="Message" aria-label="Message" />
      <div className="blk-row blk-row--between">
        <div className="blk-row"><span className="blk-badge">Badge</span><span className="blk-badge blk-badge--soft">Secondary</span></div>
        <div className="blk-row" style={{ gap: 12 }}>
          <input type="radio" className="blk-radio" name="blk-r" defaultChecked aria-label="Option one" />
          <input type="radio" className="blk-radio" name="blk-r" aria-label="Option two" />
          <Checkbox defaultChecked aria-label="Checked option" />
          <Switch defaultChecked aria-label="Enabled" />
        </div>
      </div>
      <div className="blk-row blk-row--between">
        <Button variant="outline">Alert Dialog</Button>
        <span className="blk-split"><Button variant="ghost">Button Group</Button><Button variant="ghost" iconOnly aria-label="More options"><Chevron /></Button></span>
      </div>
    </section>
  );
}

/* ---------- Contribution history ---------- */
const BAR_COLORS = ['#d4d4d4', '#737373', '#525252', '#404040', '#262626'];

export function ContributionCard({ data = [{ m: 'Dec', v: 62 }, { m: 'Jan', v: 85 }, { m: 'Feb', v: 68 }, { m: 'Mar', v: 92 }, { m: 'Apr', v: 64 }] }: { data?: { m: string; v: number }[] }) {
  return (
    <section className="blk-card" aria-label="Contribution history">
      <div><h3 className="blk-card__title">Contribution History</h3><p className="blk-card__desc">Last 6 months of activity</p></div>
      <div className="blk-bars" role="img" aria-label={`Contributions: ${data.map((d) => `${d.m} ${d.v}%`).join(', ')}`}>
        {data.map((d, i) => (
          <div key={d.m}><i style={{ height: `${d.v}%`, ['--c' as string]: BAR_COLORS[i % BAR_COLORS.length] }} /><span>{d.m}</span></div>
        ))}
      </div>
      <div className="blk-tiles">
        <div className="blk-tile"><small>Upcoming</small><strong>May 2024</strong><span>Scheduled</span></div>
        <div className="blk-tile"><small>Savings plan</small><strong>Accelerated</strong><span>Recurring</span></div>
      </div>
      <Button className="blk-wide">View Full Report</Button>
    </section>
  );
}
