import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Avatar } from '../Avatar/Avatar';
import { Badge } from '../Badge/Badge';
import { BellIcon, SearchIcon } from './icons';
import './Finance.css';

/* ---------- Icons (24px grid, 2px stroke) ---------- */
function I({ children, size = 18, fill = false }: { children: ReactNode; size?: number; fill?: boolean }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={fill ? 'currentColor' : 'none'} stroke={fill ? 'none' : 'currentColor'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {children}
    </svg>
  );
}
export const EyeIcon = () => <I><path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12Z" /><circle cx="12" cy="12" r="3" /></I>;
export const EyeOffIcon = () => <I><path d="M3 3l18 18" /><path d="M10.6 5.1A9.7 9.7 0 0 1 12 5c6.4 0 10 7 10 7a17 17 0 0 1-3.2 4M6.4 6.5C3.8 8.3 2 12 2 12s3.6 7 10 7c1.6 0 3-.4 4.3-1" /><path d="M9.9 9.9a3 3 0 0 0 4.2 4.2" /></I>;
export const PlusSmall = () => <I><path d="M12 5v14M5 12h14" /></I>;
export const TransferIcon = () => <I><path d="M7 7h13l-4-4M17 17H4l4 4" /></I>;
export const QrIcon = () => <I><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /><path d="M14 14h3v3h-3zM20 14v.01M14 20v.01M20 20v.01M17 20h3v-3" /></I>;
export const CrownIcon = () => <I fill><path d="M5 17 3 6l5.5 4.5L12 5l3.5 5.5L21 6l-2 11H5Zm0 2h14v1.5H5V19Z" /></I>;
export const ArrowRight = () => <I size={16}><path d="M5 12h14M13 6l6 6-6 6" /></I>;
export const WifiIcon = () => <I><path d="M2 9a15 15 0 0 1 20 0M5.5 12.5a10 10 0 0 1 13 0M9 16a5 5 0 0 1 6 0" /><path d="M12 19.5v.01" /></I>;
export const BoltIcon = () => <I fill><path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" /></I>;
export const DropIcon = () => <I fill><path d="M12 2.7 17.7 8.4a8 8 0 1 1-11.4 0L12 2.7Z" /></I>;
export const CardIcon = () => <I><rect x="2" y="5" width="20" height="14" rx="3" /><path d="M2 10h20" /></I>;
export const ChartIcon = () => <I><path d="M4 20V10M10 20V4M16 20v-7M22 20H2" /></I>;
export const HomeSolid = () => <I fill><path d="M12 3 3 10.5V21h6v-6h6v6h6V10.5L12 3Z" /></I>;
export const ReceiptIcon = () => <I size={16}><path d="M5 3v18l2.5-1.5L10 21l2-1.5 2 1.5 2.5-1.5L19 21V3l-2.5 1.5L14 3l-2 1.5L10 3 7.5 4.5 5 3Z" /><path d="M9 9h6M9 13h6" /></I>;
export const MailIcon = () => <I size={14}><rect x="3" y="5" width="18" height="14" rx="2.5" /><path d="m3.5 7 8.5 6 8.5-6" /></I>;
export const DownloadIcon = () => <I size={16}><path d="M12 4v11M7.5 11 12 15.5 16.5 11M4 20h16" /></I>;
export const ShareIcon = () => <I size={16}><circle cx="6" cy="12" r="2.5" /><circle cx="18" cy="6" r="2.5" /><circle cx="18" cy="18" r="2.5" /><path d="m8.2 10.8 7.6-3.6M8.2 13.2l7.6 3.6" /></I>;
export const DotsIcon = () => <I fill><circle cx="12" cy="5" r="1.7" /><circle cx="12" cy="12" r="1.7" /><circle cx="12" cy="19" r="1.7" /></I>;
export const CheckIcon = () => <I size={16}><path d="m5 12.5 4.5 4.5L19 7" /></I>;

/* ---------- Dashboard pieces ---------- */
/** Greeting row on the blue hero: avatar, greeting and two glass icon buttons. */
export function FinanceHeader({ name, initials, greeting = 'Good morning' }: { name: string; initials: string; greeting?: string }) {
  return (
    <header className="fin-header">
      <div className="fin-header__who">
        <Avatar fallback={initials} />
        <div>
          <p className="fin-header__hi">{greeting}</p>
          <h1 className="fin-header__name">{name}</h1>
        </div>
      </div>
      <div className="fin-header__actions">
        <button type="button" className="fin-glass" aria-label="Search"><SearchIcon /></button>
        <button type="button" className="fin-glass" aria-label="Notifications"><BellIcon /><span className="fin-glass__dot" aria-hidden="true" /></button>
      </div>
    </header>
  );
}

/** Total balance with a visibility toggle and today's change. */
export function BalanceHero({ amount, change, changeAmount }: { amount: string; change: string; changeAmount: string }) {
  const [hidden, setHidden] = useState(false);
  return (
    <section className="fin-balance" aria-label="Total balance">
      <p className="fin-balance__label">Total balance</p>
      <div className="fin-balance__row">
        <span className="fin-balance__amount" aria-live="polite">{hidden ? '••••••••' : amount}</span>
        <button type="button" className="fin-balance__eye" aria-pressed={hidden} aria-label={hidden ? 'Show balance' : 'Hide balance'} onClick={() => setHidden(!hidden)}>
          {hidden ? <EyeOffIcon /> : <EyeIcon />}
        </button>
      </div>
      <p className="fin-balance__delta">{change} today ({hidden ? '••••' : changeAmount})</p>
    </section>
  );
}

/** Two pill actions and a dark square scan button. */
export function QuickActions() {
  return (
    <div className="fin-actions">
      <button type="button" className="fin-pill"><PlusSmall />Deposit</button>
      <button type="button" className="fin-pill"><TransferIcon />Transfer</button>
      <button type="button" className="fin-scan" aria-label="Scan QR code"><QrIcon /></button>
    </div>
  );
}

/** Savings suggestion with a call to action that confirms when pressed. */
export function NegotiatorCard({ children }: { children: ReactNode }) {
  const [sent, setSent] = useState(false);
  return (
    <section className="fin-card" aria-labelledby="fin-neg-title">
      <h2 className="fin-card__title" id="fin-neg-title"><span className="fin-card__crown"><CrownIcon /></span>Bill negotiator</h2>
      <p className="fin-card__bubble">{children}</p>
      <button type="button" className="fin-outline" aria-live="polite" onClick={() => setSent(true)} disabled={sent}>
        {sent ? <>Request sent <CheckIcon /></> : <>Start negotiation <ArrowRight /></>}
      </button>
    </section>
  );
}

export interface Bill { id: string; name: string; due: string; amount: string; icon: ReactNode; tone: 'blue' | 'amber' | 'sky'; urgent?: boolean }

/** Bills with an All / Needs action filter. */
export function BillList({ bills }: { bills: Bill[] }) {
  const [filter, setFilter] = useState<'all' | 'action'>('all');
  const shown = filter === 'all' ? bills : bills.filter((b) => b.urgent);
  return (
    <section className="fin-bills" aria-labelledby="fin-bills-title">
      <h2 className="fin-bills__title" id="fin-bills-title">Bills &amp; payments</h2>
      <div className="fin-filter" role="group" aria-label="Filter bills">
        <button type="button" aria-pressed={filter === 'all'} onClick={() => setFilter('all')}>All bills</button>
        <button type="button" aria-pressed={filter === 'action'} onClick={() => setFilter('action')}>Needs action</button>
      </div>
      <ul className="fin-bills__list">
        {shown.map((b) => (
          <li key={b.id}>
            <button type="button" className="fin-bill">
              <span className={`fin-bill__icon fin-bill__icon--${b.tone}`}>{b.icon}</span>
              <span className="fin-bill__text"><span className="fin-bill__name">{b.name}</span><span className="fin-bill__due">{b.due}</span></span>
              <span className="fin-bill__amount">{b.amount}</span>
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}

/** Bottom navigation with a dark pill on the active item. */
export function FinanceTabs({ items }: { items: { id: string; label: string; icon: ReactNode }[] }) {
  const [active, setActive] = useState(items[0]?.id);
  return (
    <nav className="fin-tabs" aria-label="Primary">
      {items.map((it) => (
        <button key={it.id} type="button" className="fin-tabs__item" aria-current={active === it.id ? 'page' : undefined} onClick={() => setActive(it.id)}>
          <span className="fin-tabs__icon">{it.icon}</span>
          <span className="fin-tabs__label">{it.label}</span>
        </button>
      ))}
    </nav>
  );
}

/** Scrolling area of a finance screen (scrollbar hidden). */
export function FinanceScroll({ children }: { children: ReactNode }) {
  return <div className="fin-scroll">{children}</div>;
}

/* ---------- Invoice pieces ---------- */
/** Invoice number, paid status, amount and two dates. */
export function InvoiceSummary({ number, status, amount, dates }: { number: string; status: string; amount: string; dates: { label: string; value: string }[] }) {
  return (
    <section className="inv-summary" aria-label="Invoice summary">
      <div className="inv-summary__id"><ReceiptIcon /><span>{number}</span><Badge tone="success">{status}</Badge></div>
      <p className="inv-summary__amount">{amount}</p>
      <dl className="inv-summary__dates">
        {dates.map((d) => (<div key={d.label}><dt>{d.label}</dt><dd>{d.value}</dd></div>))}
      </dl>
    </section>
  );
}

/** "Billed to" card. */
export function InvoiceParty({ name, email, initials }: { name: string; email: string; initials: string }) {
  return (
    <section className="inv-card" aria-labelledby="inv-billed">
      <h2 className="inv-card__title" id="inv-billed">Billed to</h2>
      <div className="inv-party">
        <span className="inv-party__avatar" aria-hidden="true">{initials}</span>
        <div className="inv-party__text"><p className="inv-party__name">{name}</p><p className="inv-party__mail"><MailIcon /><span>{email}</span></p></div>
      </div>
    </section>
  );
}

export interface InvoiceLine { description: string; qty: number; price: number }
const money = (n: number) => `$${n.toLocaleString('en-US')}`;

/** Item table with subtotal, tax and total computed from the lines. */
export function InvoiceItems({ lines, taxRate }: { lines: InvoiceLine[]; taxRate: number }) {
  const subtotal = lines.reduce((sum, l) => sum + l.qty * l.price, 0);
  const tax = Math.round(subtotal * taxRate);
  return (
    <section className="inv-card" aria-labelledby="inv-items">
      <h2 className="inv-card__title" id="inv-items">Item details</h2>
      <table className="inv-table">
        <thead><tr><th scope="col">Description</th><th scope="col">Qty</th><th scope="col">Price</th></tr></thead>
        <tbody>{lines.map((l) => (<tr key={l.description}><td>{l.description}</td><td>{l.qty}</td><td>{money(l.price * l.qty)}</td></tr>))}</tbody>
      </table>
      <dl className="inv-totals">
        <div><dt>Subtotal</dt><dd>{money(subtotal)}</dd></div>
        <div><dt>Tax ({Math.round(taxRate * 100)}%)</dt><dd>{money(tax)}</dd></div>
        <div className="inv-totals__total"><dt>Total</dt><dd>{money(subtotal + tax)}</dd></div>
      </dl>
    </section>
  );
}

/** Download and Share actions; each confirms briefly when pressed. */
export function InvoiceActions() {
  const [done, setDone] = useState<'download' | 'share' | null>(null);
  const timer = useRef(0);
  useEffect(() => () => window.clearTimeout(timer.current), []);
  const press = (what: 'download' | 'share') => {
    setDone(what);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setDone(null), 1600);
  };
  return (
    <div className="inv-actions" aria-live="polite">
      <button type="button" className="inv-btn" onClick={() => press('download')}>{done === 'download' ? <><CheckIcon />Saved</> : <><DownloadIcon />Download PDF</>}</button>
      <button type="button" className="inv-btn inv-btn--primary" onClick={() => press('share')}>{done === 'share' ? <><CheckIcon />Link copied</> : <><ShareIcon />Share</>}</button>
    </div>
  );
}
