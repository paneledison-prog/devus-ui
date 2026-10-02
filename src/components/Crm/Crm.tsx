import { useEffect, useMemo, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import './Crm.css';

type Theme = 'light' | 'dark';
type Stage = 'signup' | 'setup' | 'app';
type View = 'companies' | 'inbox' | 'coworker' | 'page';

/* ---------- Icons ---------- */
function I({ d, size = 16 }: { d: ReactNode; size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{d}</svg>;
}
const ic = {
  mark: <I size={22} d={<><circle cx="12" cy="12" r="3" fill="currentColor" /><ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(-25 12 12)" /></>} />,
  inbox: <I d={<><rect x="3" y="4" width="18" height="16" rx="3" /><path d="M3 14h5l1 2h6l1-2h5" /></>} />,
  user: <I d={<><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></>} />,
  spark: <I d={<path d="M12 3v6M12 15v6M3 12h6M15 12h6M6 6l3 3M15 15l3 3M18 6l-3 3M9 15l-3 3" />} />,
  flow: <I d={<><circle cx="6" cy="6" r="2.5" /><circle cx="18" cy="18" r="2.5" /><circle cx="18" cy="6" r="2.5" /><path d="M6 8.5V12a3 3 0 0 0 3 3h6M8.5 6h7" /></>} />,
  agents: <I d={<path d="M5 19c8 0 14-6 14-14C11 5 5 11 5 19Zm0 0 7-7" />} />,
  cal: <I d={<><rect x="4" y="5" width="16" height="15" rx="3" /><path d="M8 3v4M16 3v4M4 10h16" /></>} />,
  people: <I d={<><rect x="3" y="5" width="18" height="14" rx="3" /><circle cx="9" cy="11" r="2" /><path d="M6 16a3 3 0 0 1 6 0M14 10h4M14 14h3" /></>} />,
  building: <I d={<><rect x="5" y="3" width="10" height="18" rx="2" /><path d="M15 9h4v12h-4M9 7h2M9 11h2M9 15h2" /></>} />,
  mail: <I d={<><rect x="3" y="5" width="18" height="14" rx="3" /><path d="m3 8 9 6 9-6" /></>} />,
  chart: <I d={<path d="M5 20V12M10 20V6M15 20v-9M20 20V4" />} />,
  apps: <I d={<><circle cx="8" cy="8" r="3" /><circle cx="17" cy="17" r="3" /><path d="M14 6h5M16.5 3.5v5M5 15h5M7.5 12.5v5" /></>} />,
  chevron: <I size={14} d={<path d="m6 9 6 6 6-6" />} />,
  check: <I size={11} d={<path d="m5 12.5 4.5 4.5L19 7" />} />,
  plus: <I d={<path d="M12 5v14M5 12h14" />} />,
  x: <I size={14} d={<path d="M6 6l12 12M18 6 6 18" />} />,
  search: <I d={<><circle cx="11" cy="11" r="6.5" /><path d="m20 20-4-4" /></>} />,
  sort: <I d={<path d="M7 5v14M3 15l4 4 4-4M17 19V5M13 9l4-4 4 4" />} />,
  filter: <I d={<path d="M4 6h16M7 12h10M10 18h4" />} />,
  cols: <I d={<><rect x="3" y="4" width="18" height="16" rx="3" /><path d="M9 4v16M15 4v16" /></>} />,
  globe: <I size={14} d={<><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" /></>} />,
  up: <I size={14} d={<path d="M12 19V5M6 11l6-6 6 6" />} />,
  panel: <I d={<><rect x="3" y="4" width="18" height="16" rx="3" /><path d="M9 4v16" /></>} />,
  sun: <I d={<><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5 19 19M19 5l-1.5 1.5M6.5 17.5 5 19" /></>} />,
  moon: <I d={<path d="M20 14.5A8 8 0 0 1 9.5 4 8 8 0 1 0 20 14.5Z" />} />,
  rocket: <I d={<path d="M5 19l4-1 8-8c2-2 3-5 3-6-1 0-4 1-6 3l-8 8-1 4Zm4-1-3-3" />} />,
  clip: <I size={14} d={<path d="m20 11-8 8a5 5 0 0 1-7-7l8-8a3.5 3.5 0 0 1 5 5l-8 8a2 2 0 0 1-3-3l7-7" />} />,
  copy: <I size={14} d={<><rect x="8" y="8" width="12" height="12" rx="2.5" /><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2" /></>} />,
  book: <I d={<path d="M5 4h5a2 2 0 0 1 2 2v14a2 2 0 0 0-2-2H5ZM19 4h-5a2 2 0 0 0-2 2v14a2 2 0 0 1 2-2h5Z" />} />,
  alert: <I d={<path d="M12 4 3 20h18Zm0 6v5m0 3h.01" />} />,
  bell: <I d={<><path d="M6 17V11a6 6 0 0 1 12 0v6l2 2H4l2-2Z" /><path d="M10 21h4" /></>} />,
};

/* ---------- Data (all fictional) ---------- */
const CAT_COLORS: Record<string, string> = {
  'Project Management': '#e8750a', 'Artificial Intelligence': '#0fa88f', Communication: '#1b72e8', 'Task Management': '#0ea5c6',
  'Video Conferencing': '#8b5cf6', Database: '#d946a8', 'Design Tool': '#e5484d', 'Online Marketplace': '#5b5bd6', Streaming: '#1f9d55',
};
interface Company { id: number; name: string; cat: string; domain: string; revenue: number; funding: number; founder: string; status: 'half' | 'open' | 'on' | 'none'; color: string }
const COMPANIES0: Company[] = [
  ['Kite Labs', 'Project Management', 'kitelabs.dev', 78910111, 78910111, 'Zeb Evans', 'half', '#f0506e'],
  ['Plume AI', 'Artificial Intelligence', 'plume.ai', 123334234, 123334234, 'Sam Altero', 'open', '#222'],
  ['Tidal', 'Project Management', 'tidal.app', 45678910, 45678910, 'Michael Prado', 'on', '#1d6fe0'],
  ['Relay Chat', 'Communication', 'relaychat.io', 89123456, 89123456, 'Stewart Burn', 'open', '#7c3aed'],
  ['Ticker', 'Task Management', 'ticker.work', 67890123, 67890123, 'Dustin Moss', 'open', '#e5484d'],
  ['Meetly', 'Video Conferencing', 'meetly.us', 234567890, 234567890, 'Eric Yuen', 'open', '#2d8cff'],
  ['Gridbase', 'Database', 'gridbase.dev', 12345678, 12345678, 'Howie Liu', 'on', '#f5a524'],
  ['Proof', 'Project Management', 'proofread.co', 34567890, 34567890, 'Jason Frieze', 'half', '#1f9d55'],
  ['Shapeful', 'Design Tool', 'shapeful.design', 99999999, 99999999, 'Dylan Fields', 'open', '#f24e1e'],
  ['Stallwise', 'Online Marketplace', 'stallwise.shop', 1000000000, 1000000000, 'Tobi Lindgren', 'on', '#5b8a2b'],
  ['Mondo', 'Project Management', 'mondo.work', 56789123, 56789123, 'Roy Mann', 'on', '#e5484d'],
  ['Stayfully', 'Online Marketplace', 'stayfully.com', 8000000000, 8000000000, 'Brian Chester', 'half', '#e5484d'],
  ['Streamly', 'Streaming', 'streamly.tv', 29800000000, 29800000000, 'Reed Haskell', 'open', '#c4181e'],
  ['Framework', 'Design Tool', 'framework.site', 27000000000, 27000000000, 'Marc Benioff', 'half', '#111'],
].map(([name, cat, domain, revenue, funding, founder, status, color], i) => ({ id: i + 1, name, cat, domain, revenue, funding, founder, status, color } as Company));

const CONVS = [
  { n: 'David', p: 'Hey how are you? Are you about to...', s: 'progress', c: '#d98a3d' }, { n: 'Raul', p: 'Hey how are you? Are you about to...', s: 'open', c: '#4c7bd9' },
  { n: 'Jet', p: "I'm good! Working on something exciting", s: 'open', c: '#c9577a' }, { n: 'Grayson', p: 'Hey how are you? Are you about to...', s: 'open', c: '#5b6b7a' },
  { n: 'Lazar', p: "I'm doing well! Diving into some new...", s: 'done', c: '#e0733a' }, { n: 'Tudor', p: "Just finished a project. What's next?", s: 'done', c: '#3a8fd9' },
  { n: 'Pawel', p: "Just finished a project. What's next?", s: 'open', c: '#d9534f' }, { n: 'Alex', p: 'I started learning Python! It is challenging', s: 'open', c: '#c9a23a' },
] as const;
const CORE_VARS = ['First name', 'Last name'];
const COMPANY_VARS = ['Name', 'Size'];
const STEPS = ['Analyzing your company domain', 'Fetching company name and logo', 'Looking up industry and sector', 'Estimating team size', 'Verifying company details', 'Preparing your workspace'];
const START_ITEMS: [string, ReactNode][] = [['Connect your channel', ic.flow], ['Build your agent', ic.agents], ['Knowledge base', ic.book], ['Review your inbox', ic.inbox], ['Escalation center', ic.alert]];

const money = (n: number) => `$${n.toLocaleString('en-US')}`;
const initials = (s: string) => s.split(/\s+/).map((w) => w[0]).slice(0, 2).join('').toUpperCase();
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

/* A decorative skyline drawn from rectangles. Deterministic, original artwork. */
function Skyline() {
  const rects = useMemo(() => {
    let seed = 11; const rnd = () => { seed = (seed * 16807) % 2147483647; return seed / 2147483647; };
    const out: { x: number; w: number; h: number; wins: [number, number][] }[] = []; let x = 0;
    while (x < 640) { const w = 26 + Math.floor(rnd() * 34); const h = 70 + Math.floor(rnd() * 130); const wins: [number, number][] = [];
      for (let y = 14; y < h - 8; y += 12) for (let wx = 6; wx < w - 6; wx += 9) if (rnd() > 0.25) wins.push([wx, y]);
      out.push({ x, w, h, wins }); x += w - 2; }
    return out;
  }, []);
  return (
    <svg className="crm-skyline" viewBox="0 0 640 220" role="img" aria-label="Decorative city skyline">
      <defs>
        <linearGradient id="crm-fade" x1="0" y1="0" x2="0" y2="1"><stop offset=".35" stopColor="#fff" /><stop offset="1" stopColor="#fff" stopOpacity=".1" /></linearGradient>
        <linearGradient id="crm-side" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#000" /><stop offset=".18" stopColor="#fff" /><stop offset=".82" stopColor="#fff" /><stop offset="1" stopColor="#000" /></linearGradient>
        <mask id="crm-mask"><rect width="640" height="220" fill="url(#crm-fade)" /><rect width="640" height="220" fill="url(#crm-side)" style={{ mixBlendMode: 'multiply' }} /></mask>
      </defs>
      <g mask="url(#crm-mask)" fill="none" stroke="currentColor" strokeWidth=".9">
        {rects.map((r, i) => (
          <g key={i} transform={`translate(${r.x} ${220 - r.h})`}><rect width={r.w} height={r.h} fill="var(--c-bg)" /><rect x="-1" y="-3" width={r.w + 2} height="3" fill="currentColor" opacity=".7" />
            {r.wins.map(([wx, wy], k) => <rect key={k} x={wx} y={wy} width="4" height="6" opacity=".55" />)}</g>
        ))}
      </g>
    </svg>
  );
}

function Av({ name, bg, md }: { name: string; bg: string; md?: boolean }) {
  return <span className={`crm-av${md ? ' crm-av--md' : ''}`} style={{ ['--bg' as string]: bg } as CSSProperties} aria-hidden="true">{initials(name)}</span>;
}

/* ---------- Compose dialog ---------- */
function Compose({ onClose, notify }: { onClose: () => void; notify: (m: string) => void }) {
  const [text, setText] = useState('Dear {First name},\n\nI noticed {Name} is doing exciting work.\nYour progress @');
  const [to, setTo] = useState(['Jordan Lee', 'Mehdi Karimi']);
  const [addr, setAddr] = useState('');
  const [saved, setSaved] = useState(false);
  const [sel, setSel] = useState(0);
  const ta = useRef<HTMLTextAreaElement>(null);
  const caretRef = useRef(text.length);
  const [caret, setCaret] = useState(text.length);
  const m = /@([\w ]*)$/.exec(text.slice(0, caret));
  const q = (m?.[1] ?? '').toLowerCase();
  const core = CORE_VARS.filter((v) => v.toLowerCase().includes(q));
  const comp = COMPANY_VARS.filter((v) => v.toLowerCase().includes(q));
  const options = [...core.map((v) => ({ v, g: 'core' })), ...comp.map((v) => ({ v, g: 'company' }))];
  const open = Boolean(m) && options.length > 0;
  const lines = text.split('\n').length;

  useEffect(() => { ta.current?.focus(); ta.current?.setSelectionRange(text.length, text.length); }, []); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => { setSaved(false); const t = window.setTimeout(() => setSaved(true), 700); return () => window.clearTimeout(t); }, [text]);

  const insert = (v: string) => {
    if (!m) return;
    const start = caret - m[0].length;
    const next = `${text.slice(0, start)}{${v}}${text.slice(caret)}`;
    const pos = start + v.length + 2;
    setText(next); setCaret(pos); caretRef.current = pos;
    window.setTimeout(() => { ta.current?.focus(); ta.current?.setSelectionRange(pos, pos); }, 0);
  };

  const mirror = text.split(/(\{[^}]+\})/g).map((part, i) => {
    const name = /^\{(.+)\}$/.exec(part)?.[1];
    if (!name) return part;
    const isCore = CORE_VARS.includes(name);
    return <span key={i} className="crm-tok" style={{ ['--tb' as string]: isCore ? '#e1f0ff' : '#ffe4f1', ['--tc' as string]: isCore ? '#0a6fd8' : '#d62a86' } as CSSProperties}>{part}</span>;
  });

  return (
    <div className="crm-scrim" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="crm-compose" role="dialog" aria-modal="true" aria-label="Compose email">
        <header>{ic.mail}Compose email<button type="button" className="crm-icon-btn" aria-label="Close" onClick={onClose}>{ic.x}</button></header>
        <div className="crm-row"><span>From</span><span className="crm-chip"><Av name="Sam Rivera" bg="#3a6fd9" />Sam Rivera {ic.check}</span></div>
        <div className="crm-row">
          <span>To</span>
          {to.map((p) => <span key={p} className="crm-chip"><Av name={p} bg="#8a5cd6" />{p}<button type="button" aria-label={`Remove ${p}`} onClick={() => setTo((t) => t.filter((x) => x !== p))}>{ic.x}</button></span>)}
          <input value={addr} onChange={(e) => setAddr(e.target.value)} placeholder="Add people" aria-label="Add recipient"
            onKeyDown={(e) => { if (e.key === 'Enter' && addr.trim()) { e.preventDefault(); setTo((t) => [...t, addr.trim()]); setAddr(''); } }} />
        </div>
        <div className="crm-editor">
          <div className="crm-lines" aria-hidden="true">{Array.from({ length: Math.max(8, lines) }, (_, i) => <div key={i}>{i + 1}</div>)}</div>
          <div className="crm-ed">
            <pre aria-hidden="true">{mirror}{'\n'}</pre>
            <textarea
              ref={ta} value={text} aria-label="Email body" spellCheck={false}
              onChange={(e) => { setText(e.target.value); setCaret(e.target.selectionStart); setSel(0); }}
              onSelect={(e) => setCaret(e.currentTarget.selectionStart)} onClick={(e) => setCaret(e.currentTarget.selectionStart)}
              onKeyDown={(e) => {
                if (!open) return;
                if (e.key === 'ArrowDown') { e.preventDefault(); setSel((s) => (s + 1) % options.length); }
                else if (e.key === 'ArrowUp') { e.preventDefault(); setSel((s) => (s - 1 + options.length) % options.length); }
                else if (e.key === 'Enter' || e.key === 'Tab') { e.preventDefault(); insert(options[Math.min(sel, options.length - 1)].v); }
              }}
            />
          </div>
          {open && (
            <div className="crm-vars" role="listbox" aria-label="Insert variable">
              {core.length > 0 && <h4>Core</h4>}
              {core.map((v, i) => <button key={v} type="button" role="option" aria-selected={sel === i} style={{ ['--vc' as string]: '#0a84ff' } as CSSProperties} onMouseEnter={() => setSel(i)} onMouseDown={(e) => { e.preventDefault(); insert(v); }}><i />{v}</button>)}
              {comp.length > 0 && <h4>Company</h4>}
              {comp.map((v, i) => <button key={v} type="button" role="option" aria-selected={sel === core.length + i} style={{ ['--vc' as string]: '#e6338d' } as CSSProperties} onMouseEnter={() => setSel(core.length + i)} onMouseDown={(e) => { e.preventDefault(); insert(v); }}><i />{v}</button>)}
            </div>
          )}
        </div>
        <footer>
          <button type="button" className="crm-icon-btn" aria-label="Attach file" onClick={() => notify('Attachments are disabled in the demo')}>{ic.plus}</button>
          <span className="draft"><i />{saved ? 'Draft saved' : 'Draft'}</span>
          <button type="button" className="crm-btn" onClick={() => { notify(`Email sent to ${to.length} recipient${to.length === 1 ? '' : 's'} (demo)`); onClose(); }} disabled={to.length === 0}>Send</button>
        </footer>
      </div>
    </div>
  );
}

/* ---------- Demo ---------- */
export interface CrmDemoProps {
  /** Which step to start on. The full journey is sign-up, setup, then the app. */
  startAt?: Stage;
  defaultTheme?: Theme;
}

export function CrmDemo({ startAt = 'app', defaultTheme }: CrmDemoProps) {
  const [theme, setTheme] = useState<Theme>(() => defaultTheme ?? (typeof document !== 'undefined' && document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light'));
  const [stage, setStage] = useState<Stage>(startAt);
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [domain, setDomain] = useState('acme.com');
  const [stepsDone, setStepsDone] = useState(0);
  const [view, setView] = useState<View>('companies');
  const [pageTitle, setPageTitle] = useState('');
  const [toast, setToast] = useState<string | null>(null);
  const timers = useRef<number[]>([]);

  const [companies, setCompanies] = useState(COMPANIES0);
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [sort, setSort] = useState<'none' | 'asc' | 'desc'>('none');
  const [cat, setCat] = useState('all');
  const [search, setSearch] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const [colMenu, setColMenu] = useState(false);
  const [cols, setCols] = useState({ cat: true, domain: true, revenue: true, funding: true, founder: true });
  const [newCo, setNewCo] = useState(false);
  const [draftCo, setDraftCo] = useState({ name: '', cat: 'Database', domain: '' });

  const [compose, setCompose] = useState(false);
  const [quick, setQuick] = useState('');
  const [gsOpen, setGsOpen] = useState(false);
  const [gsDone, setGsDone] = useState<boolean[]>([true, false, false, false, false]);

  const [convSel, setConvSel] = useState(0);
  const [convStatus, setConvStatus] = useState<Record<number, string>>({});
  const [convMsgs, setConvMsgs] = useState<Record<number, { me: boolean; t: string }[]>>({});
  const [chatText, setChatText] = useState('');
  const [panel, setPanel] = useState(true);
  const [draft, setDraft] = useState(true);
  const [coMsgs, setCoMsgs] = useState<{ ask: boolean; t: string }[]>([]);
  const [coText, setCoText] = useState('');
  const [cwText, setCwText] = useState('');
  const [cwThread, setCwThread] = useState<{ ask: boolean; t: string }[]>([]);

  useEffect(() => () => timers.current.forEach((t) => window.clearTimeout(t)), []);
  const later = (fn: () => void, ms: number) => { timers.current.push(window.setTimeout(fn, ms)); };
  const notify = (m: string) => { setToast(m); later(() => setToast(null), 2400); };

  // Company setup: tick the steps one by one (all at once for reduced motion).
  useEffect(() => {
    if (stage !== 'setup') return;
    setStepsDone(0);
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) { setStepsDone(STEPS.length); return; }
    const id = window.setInterval(() => setStepsDone((n) => { if (n >= STEPS.length) { window.clearInterval(id); return n; } return n + 1; }), 650);
    return () => window.clearInterval(id);
  }, [stage]);

  const words = (domain.split('.')[0] || 'acme').split(/[-_]+/).filter(Boolean).map(cap);
  const companyName = words.length > 1 ? words.join(' ') : `${words[0] ?? 'Acme'} Labs`;
  const submitSignup = () => {
    const e: Record<string, string> = {};
    if (!form.username.trim()) e.username = 'Enter a username';
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) e.email = 'Enter a valid work email';
    if (form.password.length < 8) e.password = 'Use at least 8 characters';
    setErrors(e);
    if (Object.keys(e).length) return;
    setDomain(form.email.split('@')[1]);
    setStage('setup');
  };

  const rows = useMemo(() => {
    let r = companies.filter((c) => (cat === 'all' || c.cat === cat) && `${c.name} ${c.domain} ${c.founder}`.toLowerCase().includes(search.trim().toLowerCase()));
    if (sort !== 'none') r = [...r].sort((a, b) => (sort === 'asc' ? a.revenue - b.revenue : b.revenue - a.revenue));
    return r;
  }, [companies, cat, search, sort]);

  const goPage = (title: string) => { setPageTitle(title); setView('page'); };
  const actions: { label: string; run: () => void }[] = [
    { label: 'Open Companies', run: () => setView('companies') }, { label: 'Open Inbox', run: () => setView('inbox') }, { label: 'Open Coworker', run: () => setView('coworker') },
    { label: 'Compose email', run: () => setCompose(true) }, { label: 'New company', run: () => { setView('companies'); setNewCo(true); } },
    { label: theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme', run: () => setTheme((t) => (t === 'dark' ? 'light' : 'dark')) },
  ];
  const quickResults = quick.trim() ? actions.filter((a) => a.label.toLowerCase().includes(quick.trim().toLowerCase())) : [];
  const runQuick = (a: { run: () => void }) => { a.run(); setQuick(''); };

  const status = (i: number) => convStatus[i] ?? CONVS[i].s;
  const sendChat = () => {
    const t = chatText.trim(); if (!t) return;
    const i = convSel;
    setConvMsgs((m) => ({ ...m, [i]: [...(m[i] ?? []), { me: true, t }] }));
    setChatText('');
    later(() => setConvMsgs((m) => ({ ...m, [i]: [...(m[i] ?? []), { me: false, t: 'Thanks, that helps!' }] })), 1100);
  };
  const askCoworker = (t: string, set: typeof setCoMsgs) => {
    set((m) => [...m, { ask: true, t }]);
    later(() => set((m) => [...m, { ask: false, t: 'On it. I will gather the context for this account and draft something you can review before it goes out.' }]), 900);
  };

  const mainNav: { v: View | 'compose'; label: string; icon: ReactNode; count?: string; title?: string }[] = [
    { v: 'inbox', label: 'Inboxes', icon: ic.inbox, count: '12' }, { v: 'inbox', label: 'Assigned to me', icon: ic.user, count: '4' },
    { v: 'coworker', label: 'Coworker', icon: ic.spark }, { v: 'page', label: 'Escalations', icon: ic.flow, title: 'Escalations' },
  ];
  const generalNav: { v: View | 'compose'; label: string; icon: ReactNode; title?: string }[] = [
    { v: 'page', label: 'Agents', icon: ic.agents, title: 'Agents' }, { v: 'page', label: 'Schedule', icon: ic.cal, title: 'Schedule' }, { v: 'page', label: 'Customers', icon: ic.people, title: 'Customers' },
    { v: 'companies', label: 'Companies', icon: ic.building }, { v: 'compose', label: 'Emails', icon: ic.mail }, { v: 'page', label: 'Report', icon: ic.chart, title: 'Report' }, { v: 'page', label: 'Apps', icon: ic.apps, title: 'Apps' },
  ];
  const activeLabel = view === 'page' ? pageTitle : view === 'companies' ? 'Companies' : view === 'coworker' ? 'Coworker' : 'Inboxes';
  const navBtn = (n: { v: View | 'compose'; label: string; icon: ReactNode; count?: string; title?: string }) => (
    <button key={n.label} type="button" className="crm-nav" aria-current={activeLabel === n.label || (view === 'inbox' && n.label === 'Inboxes') ? 'page' : undefined}
      onClick={() => { if (n.v === 'compose') setCompose(true); else if (n.v === 'page') goPage(n.title ?? n.label); else setView(n.v); }}>
      {n.icon}{n.label}{n.count && <small>{n.count}</small>}
    </button>
  );

  const gsCount = gsDone.filter(Boolean).length;

  /* ---------- Stage: sign-up ---------- */
  let body: ReactNode;
  if (stage === 'signup') {
    const f = (k: 'username' | 'email' | 'password', label: string, ph: string, type = 'text') => (
      <div className="crm-field">
        <label htmlFor={`su-${k}`}>{label}</label>
        <input id={`su-${k}`} className="crm-input" type={type} placeholder={ph} value={form[k]} aria-invalid={Boolean(errors[k])} aria-describedby={errors[k] ? `su-${k}-e` : undefined}
          onChange={(e) => setForm((s) => ({ ...s, [k]: e.target.value }))} />
        {errors[k] && <span id={`su-${k}-e`} className="crm-err">{errors[k]}</span>}
      </div>
    );
    body = (
      <div className="crm-center">
        <form className="crm-signup" noValidate onSubmit={(e) => { e.preventDefault(); submitSignup(); }}>
          <h1>Get started</h1><p className="sub">Create an account to get started</p>
          {f('username', 'Username', 'Enter your username')}
          {f('email', 'Work email', 'you@acme.com', 'email')}
          {f('password', 'Password', 'Enter your password', 'password')}
          <button type="submit" className="crm-btn crm-btn--wide" style={{ marginTop: 8 }}>Continue</button>
          <p className="alt">Already have an account? <button type="button" className="crm-link" onClick={() => notify('Login is disabled in the demo')}>Login</button></p>
        </form>
        <Skyline />
      </div>
    );
  } else if (stage === 'setup') {
    const finished = stepsDone >= STEPS.length;
    body = (
      <div className="crm-setup">
        <span className="crm-logo">{ic.mark}</span>
        <div className="crm-setup__card">
          <div className="crm-setup__left">
            <h2>Company Details</h2>
            <p>We are setting up your workspace using info from {domain}</p>
            <ol className="crm-steps" aria-live="polite">
              <li><span style={{ color: 'var(--c-blue)' }}>{ic.globe}</span><span style={{ color: 'var(--c-blue)' }}>{cap(domain)}</span></li>
              {STEPS.map((s, i) => <li key={s} data-wait={i >= stepsDone}><span className="crm-dot">{i < stepsDone && ic.check}</span>{s}</li>)}
            </ol>
            <button type="button" className="crm-btn crm-btn--wide" disabled={!finished} onClick={() => { setStage('app'); setView('companies'); }}>Continue</button>
          </div>
          <div className="crm-setup__right">
            <div className="crm-ghost" aria-hidden="true">{Array.from({ length: 9 }, (_, i) => <i key={i} style={{ width: `${70 - (i % 3) * 14}%` }} />)}</div>
            <div className="crm-company">
              <div className="crm-company__logo">{companyName[0]}</div>
              <strong style={{ fontWeight: 500 }}>{companyName}</strong>
              <div style={{ color: 'var(--c-blue)', display: 'flex', gap: 6, alignItems: 'center', margin: '4px 0' }}>{ic.globe}{domain}</div>
              <dl>
                {[['Employees', '50-200'], ['Industry', 'Software'], ['Country', 'Global'], ['Total funding', '$12.4m'], ['Last funding type', 'Series A']].map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{finished || stepsDone > 2 ? v : '...'}</dd></div>)}
              </dl>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    /* ---------- Stage: app ---------- */
    let content: ReactNode;
    if (view === 'companies') {
      const total = rows.reduce((s, r) => s + r.revenue, 0);
      const colDefs = [['cat', 'Category'], ['domain', 'Domains'], ['revenue', 'Annual Revenue'], ['funding', 'Total Funding'], ['founder', 'Founders']] as const;
      content = (
        <>
          <div className="crm-bar"><span className="crumb">{ic.building}</span><span className="crumb">Companies</span><span className="crumb">/</span><span>Database</span><button type="button" className="crm-pill spacer" onClick={() => { setView('coworker'); }}>{ic.spark}Ask AI</button></div>
          <div className="crm-tools" style={{ position: 'relative' }}>
            <select className="crm-select" aria-label="View" value={cat} onChange={(e) => setCat(e.target.value)}>
              <option value="all">All companies</option>
              {Object.keys(CAT_COLORS).map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
            <button type="button" className="crm-pill" onClick={() => setSort((s) => (s === 'none' ? 'desc' : s === 'desc' ? 'asc' : 'none'))} aria-label={`Sort by revenue: ${sort}`}>{ic.sort}Sort{sort !== 'none' && <small style={{ color: 'var(--c-blue)' }}>{sort === 'desc' ? 'High to low' : 'Low to high'}</small>}</button>
            <button type="button" className="crm-pill" onClick={() => { setSearchOpen(true); }}>{ic.filter}Filters{cat !== 'all' && <small style={{ color: 'var(--c-blue)' }}>1</small>}</button>
            <span className="spacer" />
            {searchOpen
              ? <label className="crm-search">{ic.search}<input autoFocus value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search companies" aria-label="Search companies" onBlur={() => { if (!search) setSearchOpen(false); }} /></label>
              : <button type="button" className="crm-icon-btn" aria-label="Search companies" onClick={() => setSearchOpen(true)}>{ic.search}</button>}
            <button type="button" className="crm-pill" aria-haspopup="menu" aria-expanded={colMenu} onClick={() => setColMenu((o) => !o)}>{ic.cols}Column settings{ic.chevron}</button>
            <button type="button" className="crm-btn" onClick={() => setNewCo(true)}>{ic.plus}New Company</button>
            {colMenu && (
              <div className="crm-colmenu" role="menu">
                {colDefs.map(([k, l]) => <label key={k}><input type="checkbox" className="crm-chk" checked={cols[k]} onChange={(e) => setCols((c) => ({ ...c, [k]: e.target.checked }))} />{l}</label>)}
              </div>
            )}
          </div>
          <div className="crm-tablewrap">
            <table className="crm-table">
              <thead><tr>
                <th style={{ width: 280 }}><input type="checkbox" className="crm-chk" aria-label="Select all" checked={rows.length > 0 && rows.every((r) => selected.has(r.id))} onChange={(e) => setSelected(e.target.checked ? new Set(rows.map((r) => r.id)) : new Set())} /> <span style={{ marginLeft: 12 }}>Company</span></th>
                {cols.cat && <th>Category</th>}{cols.domain && <th>Domains</th>}{cols.revenue && <th className="num">Annual Revenue</th>}{cols.funding && <th className="num">Total Funding</th>}{cols.founder && <th>Founders</th>}
              </tr></thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.id} data-sel={selected.has(r.id)}>
                    <td><div className="crm-name"><input type="checkbox" className="crm-chk" aria-label={`Select ${r.name}`} checked={selected.has(r.id)} onChange={() => setSelected((s) => { const n = new Set(s); if (n.has(r.id)) n.delete(r.id); else n.add(r.id); return n; })} />
                      <span className="logo" style={{ ['--bg' as string]: r.color } as CSSProperties}>{r.name[0]}</span>{r.name}<span style={{ marginLeft: 'auto' }}><span className="crm-status" data-s={r.status} aria-hidden="true" /></span></div></td>
                    {cols.cat && <td><span className="crm-cat" style={{ ['--cc' as string]: CAT_COLORS[r.cat] } as CSSProperties}>{r.cat}</span></td>}
                    {cols.domain && <td><a className="crm-dom" href={`https://${r.domain}`} onClick={(e) => e.preventDefault()}>{r.domain}</a></td>}
                    {cols.revenue && <td className="num">{money(r.revenue)}</td>}{cols.funding && <td className="num">{money(r.funding)}</td>}
                    {cols.founder && <td><span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}><Av name={r.founder} bg="#7a7a85" />{r.founder}</span></td>}
                  </tr>
                ))}
                {rows.length === 0 && <tr><td colSpan={6} style={{ textAlign: 'center', color: 'var(--c-muted)', height: 120 }}>No companies match your filters.</td></tr>}
              </tbody>
            </table>
          </div>
          <div className="crm-foot"><span>{selected.size > 0 ? `${selected.size} selected of ` : ''}{rows.length} {rows.length === 1 ? 'Company' : 'Companies'}</span><span>{money(total)}</span></div>
        </>
      );
    } else if (view === 'inbox') {
      const cur = CONVS[convSel];
      const msgs = convMsgs[convSel] ?? [];
      const st = status(convSel);
      const label = st === 'open' ? 'Open' : st === 'progress' ? 'In progress' : 'Resolved';
      content = (
        <div className="crm-inbox" data-panel={panel}>
          <div className="crm-convs">
            <header>{ic.panel}All Inboxes</header>
            {CONVS.map((c, i) => (
              <button key={c.n} type="button" className="crm-conv" aria-current={convSel === i} onClick={() => setConvSel(i)}>
                <Av name={c.n} bg={c.c} md /><div style={{ minWidth: 0 }}><strong>{c.n}</strong><p>{c.p}</p></div><small>3d<br /><span className="crm-status" data-s={status(i) === 'progress' ? 'half' : status(i) === 'done' ? 'on' : 'open'} /></small>
              </button>
            ))}
          </div>
          <div className="crm-thread">
            <header>{cur.n}<button type="button" className="crm-stat" data-s={st} aria-label={`Status: ${label}. Click to change`} onClick={() => setConvStatus((m) => ({ ...m, [convSel]: st === 'open' ? 'progress' : st === 'progress' ? 'done' : 'open' }))}><span className="crm-status" data-s={st === 'progress' ? 'half' : st === 'done' ? 'on' : 'open'} />{label}</button>
              {!panel && <button type="button" className="crm-icon-btn" aria-label="Open Coworker panel" onClick={() => setPanel(true)} style={{ marginLeft: 8 }}>{ic.spark}</button>}</header>
            <div className="crm-msgs">
              <div className="crm-act"><span style={{ color: 'var(--c-muted)' }}>Activity</span>
                <div><Av name={cur.n} bg={cur.c} />{cur.n} is <b>OPEN</b><small>3h</small></div><div><Av name="Naruto" bg="#8a8f98" />Naruto assigned this to <Av name="Rico" bg="#3a6fd9" />Rico<small>1h</small></div></div>
              {[{ me: false, t: 'Hey there' }, { me: true, t: 'Hi, this is Meridian. How can we help today?' }, { me: false, t: 'how are you?' }, { me: true, t: 'Doing well, thanks for asking. What can we help you with today?' }, ...msgs].map((m, i) => <div key={i} className={`crm-bub${m.me ? ' crm-bub--me' : ''}`}>{m.t}</div>)}
            </div>
            <form className="crm-write" onSubmit={(e) => { e.preventDefault(); sendChat(); }}>
              <button type="button" className="crm-icon-btn" aria-label="Attach file" onClick={() => notify('Attachments are disabled in the demo')}>{ic.clip}</button>
              <input value={chatText} onChange={(e) => setChatText(e.target.value)} placeholder={`Write to chat ${cur.n}...`} aria-label={`Message ${cur.n}`} />
              <button type="submit" className="crm-send" aria-label="Send message" disabled={!chatText.trim()}>{ic.up}</button>
            </form>
          </div>
          {panel && (
            <aside className="crm-co" aria-label="Coworker">
              <header>{ic.spark}Coworker<span className="spacer"><button type="button" className="crm-icon-btn" aria-label="New conversation" onClick={() => { setCoMsgs([]); setDraft(true); }}>{ic.plus}</button><button type="button" className="crm-icon-btn" aria-label="Close panel" onClick={() => setPanel(false)}>{ic.x}</button></span></header>
              <div className="crm-co__body">
                <div className="ask">Create personalized email draft to {cur.n}</div>
                <div className="step">Thought for 4 seconds</div><div className="step">Searching for 15 sources</div><div className="step">Search for profile behaviour</div>
                <p>Got it. I will draft a personalized email for {cur.n} so you can maximize the sales.</p>
                {draft ? (
                  <div className="crm-draft">
                    <header style={{ display: 'flex', alignItems: 'center', gap: 6 }}>{ic.mail}Email</header>
                    <div className="body"><strong style={{ fontWeight: 500, fontSize: 13 }}>Quick idea for you</strong><span>Hi {cur.n},</span><span>I have a few ideas to improve your product&apos;s first-time user experience and conversions.</span><span>I help SaaS teams increase activation by simplifying hierarchy and clarifying value quickly.</span></div>
                    <footer><button type="button" className="crm-btn crm-btn--ghost crm-btn--sm" onClick={() => { setDraft(false); notify('Draft dismissed'); }}>Dismiss</button><button type="button" className="crm-btn crm-btn--sm" onClick={() => { setDraft(false); notify(`Email sent to ${cur.n} (demo)`); }}>Send</button></footer>
                  </div>
                ) : <p style={{ color: 'var(--c-muted)' }}>Draft handled.</p>}
                {coMsgs.map((m, i) => m.ask ? <div key={i} className="ask">{m.t}</div> : <p key={i}>{m.t}</p>)}
              </div>
              <form onSubmit={(e) => { e.preventDefault(); const t = coText.trim(); if (t) { askCoworker(t, setCoMsgs); setCoText(''); } }}>
                <input value={coText} onChange={(e) => setCoText(e.target.value)} placeholder="Ask about your agent project..." aria-label="Ask Coworker" />
                <button type="submit" className="crm-send" aria-label="Send to Coworker" disabled={!coText.trim()}>{ic.up}</button>
              </form>
            </aside>
          )}
        </div>
      );
    } else if (view === 'coworker') {
      content = (
        <>
          <div className="crm-bar">{ic.spark}Coworker</div>
          <div className="crm-cw">
            <span style={{ color: 'var(--c-text)' }}>{ic.mark}</span>
            <h2>What do you want to build?</h2>
            {cwThread.length > 0 && <div className="crm-cw__thread" aria-live="polite">{cwThread.map((m, i) => <div key={i} className={`crm-bub${m.ask ? ' crm-bub--me' : ''}`} style={{ maxWidth: '85%', alignSelf: m.ask ? 'flex-end' : 'flex-start' }}>{m.t}</div>)}</div>}
            <form className="crm-cw__box" onSubmit={(e) => { e.preventDefault(); const t = cwText.trim(); if (t) { askCoworker(t, setCwThread); setCwText(''); } }}>
              <textarea value={cwText} onChange={(e) => setCwText(e.target.value)} placeholder="Do anything with Coworker..." aria-label="Message Coworker" onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); (e.currentTarget.form as HTMLFormElement).requestSubmit(); } }} />
              <div className="crm-cw__bar"><button type="button" className="crm-icon-btn" aria-label="Add" onClick={() => notify('Attachments are disabled in the demo')}>{ic.plus}</button><span style={{ display: 'inline-flex', gap: 6, alignItems: 'center' }}><span className="crm-tool" style={{ ['--bg' as string]: '#e07a52' } as CSSProperties}>O</span>Orbit 4 {ic.chevron}</span><span style={{ color: 'var(--c-muted)', display: 'inline-flex', gap: 4 }}>Medium {ic.chevron}</span>
                <button type="submit" className="crm-send" style={{ marginLeft: 'auto' }} aria-label="Send" disabled={!cwText.trim()}>{ic.up}</button></div>
            </form>
            <div className="crm-cw__tools">{ic.flow}<span>Connect your tools to Coworker</span><span style={{ marginLeft: 'auto', display: 'flex', gap: 6 }}>{['#333', '#e8318c', '#1d6fe0', '#555', '#f24e1e', '#2d8cff', '#1f9d55'].map((c, i) => <span key={i} className="crm-tool" style={{ ['--bg' as string]: c } as CSSProperties}>{'GSTNFJD'[i]}</span>)}</span></div>
          </div>
        </>
      );
    } else {
      content = (
        <>
          <div className="crm-bar">{pageTitle}</div>
          <div className="crm-empty"><h2>{pageTitle}</h2><p>This page is not part of the demo. Try Companies, Inboxes or Coworker.</p><span><button type="button" className="crm-btn crm-btn--sm" onClick={() => setView('companies')}>Go to Companies</button></span></div>
        </>
      );
    }

    body = (
      <div className="crm-win" style={{ borderRadius: 0, boxShadow: 'none', width: '100%' }}>
        <aside className="crm-side" aria-label="Workspace">
          <div className="crm-side__top">
            <button type="button" className="crm-ws" onClick={() => notify('Only one workspace in the demo')}><span className="crm-company__logo">{companyName[0]}</span>{companyName}{ic.chevron}</button>
            <button type="button" className="crm-icon-btn" aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'} onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>{theme === 'dark' ? ic.sun : ic.moon}</button>
          </div>
          <div className="crm-quick">
            <input value={quick} onChange={(e) => setQuick(e.target.value)} placeholder="Quick Actions" aria-label="Quick actions" onKeyDown={(e) => { if (e.key === 'Enter' && quickResults[0]) runQuick(quickResults[0]); if (e.key === 'Escape') setQuick(''); }} /><kbd>J</kbd>
            {quickResults.length > 0 && <div className="crm-pop" role="listbox">{quickResults.map((a) => <button key={a.label} type="button" role="option" aria-selected="false" onClick={() => runQuick(a)}>{a.label}</button>)}</div>}
          </div>
          {mainNav.map(navBtn)}
          <h6 className="crm-lab">General</h6>
          {generalNav.map(navBtn)}
          <h6 className="crm-lab">Favorites</h6>
          {[['Kite Labs', 'Company', '#f0506e'], ['Plume AI', 'Company', '#222'], ['Shapeful', 'Company', '#f24e1e'], ['Rico', 'Investor', '#3a6fd9'], ['Mehdi', 'Investor', '#333']].map(([n, t, c]) => (
            <button key={n} type="button" className="crm-nav" onClick={() => { setView('companies'); setSearch(n === 'Rico' || n === 'Mehdi' ? '' : n); setSearchOpen(n !== 'Rico' && n !== 'Mehdi'); }}><Av name={n} bg={c} />{n}<small>{t}</small></button>
          ))}
          <div className="crm-side__foot">
            {gsOpen && (
              <div className="crm-gs-pop" role="dialog" aria-label="Getting started">
                <button type="button" className="crm-icon-btn x" aria-label="Close" onClick={() => setGsOpen(false)}>{ic.x}</button>
                <span className="crm-ring" style={{ ['--p' as string]: (gsCount / 5) * 100 } as CSSProperties} />
                <h3>Getting Started</h3><p>{gsCount}/5 steps completed</p>
                {START_ITEMS.map(([l, icon], i) => (
                  <button key={l} type="button" className="item" data-done={gsDone[i]} aria-pressed={gsDone[i]} onClick={() => setGsDone((d) => d.map((x, k) => (k === i ? !x : x)))}>
                    {gsDone[i] ? <span className="crm-dot" style={{ width: 20, height: 20 }}>{ic.check}</span> : <span style={{ color: 'var(--c-muted)' }}>{icon}</span>}{l}
                  </button>
                ))}
                <button type="button" className="crm-btn crm-btn--wide" style={{ marginTop: 12 }} onClick={() => { setGsDone([true, true, true, true, true]); notify('All steps completed'); }}>Finish All</button>
              </div>
            )}
            <button type="button" className="crm-gs" aria-expanded={gsOpen} onClick={() => setGsOpen((o) => !o)}><span><span className="crm-ring" style={{ ['--p' as string]: (gsCount / 5) * 100, width: 16, height: 16 } as CSSProperties} /></span>Getting Started{ic.chevron}</button>
            <div className="crm-up"><span style={{ display: 'inline-grid', placeItems: 'center', width: 22, height: 22, borderRadius: 6, background: 'var(--c-text)', color: 'var(--c-bg)' }}>{ic.rocket}</span>Upgrade to Pro<button type="button" className="crm-badge" style={{ border: 0 }} onClick={() => notify('Upgrade is disabled in the demo')}>Upgrade</button></div>
          </div>
        </aside>
        <div className="crm-main">{content}</div>
      </div>
    );
  }

  return (
    <div className="crm" data-theme={theme} onKeyDown={(e) => { if (e.key === 'Escape') { setCompose(false); setNewCo(false); setColMenu(false); setGsOpen(false); } }}>
      {stage === 'app' ? body : <div className="crm-win" style={{ flexDirection: 'column' }}>{body}</div>}
      {compose && <Compose onClose={() => setCompose(false)} notify={notify} />}
      {newCo && (
        <div className="crm-scrim" onClick={(e) => { if (e.target === e.currentTarget) setNewCo(false); }}>
          <form className="crm-newco" role="dialog" aria-modal="true" aria-label="New company" onSubmit={(e) => {
            e.preventDefault(); const n = draftCo.name.trim(); if (!n) return;
            setCompanies((c) => [{ id: c.length + 1 + Math.floor(Math.random() * 1000), name: n, cat: draftCo.cat, domain: draftCo.domain.trim() || `${n.toLowerCase().replace(/\W+/g, '')}.com`, revenue: 0, funding: 0, founder: 'Unassigned', status: 'open', color: '#3a6fd9' }, ...c]);
            setNewCo(false); setDraftCo({ name: '', cat: 'Database', domain: '' }); notify(`${n} added`);
          }}>
            <h3>New company</h3>
            <div className="crm-field"><label htmlFor="nc-name">Name</label><input id="nc-name" className="crm-input" autoFocus value={draftCo.name} onChange={(e) => setDraftCo((d) => ({ ...d, name: e.target.value }))} placeholder="Company name" /></div>
            <div className="crm-field"><label htmlFor="nc-cat">Category</label><select id="nc-cat" className="crm-input" value={draftCo.cat} onChange={(e) => setDraftCo((d) => ({ ...d, cat: e.target.value }))}>{Object.keys(CAT_COLORS).map((c) => <option key={c}>{c}</option>)}</select></div>
            <div className="crm-field"><label htmlFor="nc-dom">Domain</label><input id="nc-dom" className="crm-input" value={draftCo.domain} onChange={(e) => setDraftCo((d) => ({ ...d, domain: e.target.value }))} placeholder="example.com" /></div>
            <div className="actions"><button type="button" className="crm-btn crm-btn--ghost" onClick={() => setNewCo(false)}>Cancel</button><button type="submit" className="crm-btn" disabled={!draftCo.name.trim()}>Add company</button></div>
          </form>
        </div>
      )}
      {toast && <div className="crm-toast" role="status">{toast}</div>}
    </div>
  );
}
