import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { Switch } from '../Switch/Switch';
import './Workspace.css';

type Theme = 'light' | 'dark';
type Mode = 'chat' | 'agent';
type View = 'welcome' | 'new-chat' | 'projects' | 'artifacts' | 'apps' | 'plans' | 'task' | 'workspace' | 'runs' | 'live' | 'plugins' | 'mobile';
interface Msg { role: 'user' | 'ai'; text: string }

/* ---------- Icons (simple 16px stroke set) ---------- */
function I({ d, size = 16, fill }: { d: ReactNode; size?: number; fill?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={fill ?? 'none'} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{d}</svg>
  );
}
const ic = {
  mark: <I size={20} d={<><circle cx="12" cy="12" r="3" fill="currentColor" /><ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(-25 12 12)" /></>} />,
  chat: <I d={<path d="M20 12a8 8 0 0 1-11.5 7.2L4 20l1-4.3A8 8 0 1 1 20 12Z" />} />,
  agent: <I d={<><rect x="4" y="8" width="16" height="11" rx="3" /><path d="M12 8V4M9 13h.01M15 13h.01" /></>} />,
  code: <I d={<><path d="m8 8-4 4 4 4M16 8l4 4-4 4" /></>} />,
  design: <I d={<path d="M5 19c8 0 14-6 14-14C11 5 5 11 5 19Zm0 0 7-7" />} />,
  search: <I d={<><circle cx="11" cy="11" r="6.5" /><path d="m20 20-4-4" /></>} />,
  bell: <I d={<><path d="M6 17V11a6 6 0 0 1 12 0v6l2 2H4l2-2Z" /><path d="M10 21h4" /></>} />,
  user: <I d={<><circle cx="9" cy="8" r="3.5" /><path d="M3 20a6 6 0 0 1 12 0M17 8h4M19 6v4" /></>} />,
  hand: <I d={<path d="M8 12V6a1.5 1.5 0 0 1 3 0v5m0-6a1.5 1.5 0 0 1 3 0v6m0-4a1.5 1.5 0 0 1 3 0v6c0 4-2 7-6 7s-6-2-8-6l-1-2a1.5 1.5 0 0 1 3-1l1 1" />} />,
  plus: <I d={<path d="M12 5v14M5 12h14" />} />,
  folder: <I d={<path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z" />} />,
  grid: <I d={<><rect x="4" y="4" width="6" height="6" rx="1.5" /><rect x="14" y="4" width="6" height="6" rx="1.5" /><rect x="4" y="14" width="6" height="6" rx="1.5" /><path d="M14 17h6M17 14v6" /></>} />,
  apps: <I d={<><path d="M8 4H5a1 1 0 0 0-1 1v3M16 4h3a1 1 0 0 1 1 1v3M8 20H5a1 1 0 0 1-1-1v-3M16 20h3a1 1 0 0 0 1-1v-3" /><circle cx="12" cy="12" r="3" /></>} />,
  copy: <I size={14} d={<><rect x="8" y="8" width="12" height="12" rx="2.5" /><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2" /></>} />,
  check: <I size={14} d={<path d="m5 12.5 4.5 4.5L19 7" />} />,
  up: <I size={14} d={<path d="M12 19V5M6 11l6-6 6 6" />} />,
  mic: <I size={14} d={<><rect x="9" y="3" width="6" height="11" rx="3" /><path d="M5 11a7 7 0 0 0 14 0M12 18v3" /></>} />,
  down: <I size={14} d={<path d="m6 9 6 6 6-6" />} />,
  rocket: <I d={<path d="M5 19l4-1 8-8c2-2 3-5 3-6-1 0-4 1-6 3l-8 8-1 4Zm4-1-3-3M14 10l-1-1" />} />,
  globe: <I d={<><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" /></>} />,
  phone: <I d={<><rect x="7" y="3" width="10" height="18" rx="2.5" /><path d="M11 18h2" /></>} />,
  plug: <I d={<path d="M9 3v5M15 3v5M6 8h12v3a6 6 0 0 1-12 0V8Zm6 9v4" />} />,
  flow: <I d={<><circle cx="6" cy="6" r="2.5" /><circle cx="18" cy="18" r="2.5" /><path d="M6 8.5V12a3 3 0 0 0 3 3h6" /></>} />,
  runs: <I d={<><circle cx="12" cy="12" r="9" /><path d="m10 8.5 5 3.5-5 3.5Z" /></>} />,
  x: <I size={14} d={<path d="M6 6l12 12M18 6 6 18" />} />,
  sun: <I d={<><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5 19 19M19 5l-1.5 1.5M6.5 17.5 5 19" /></>} />,
  moon: <I d={<path d="M20 14.5A8 8 0 0 1 9.5 4 8 8 0 1 0 20 14.5Z" />} />,
  clone: <I d={<><rect x="4" y="4" width="16" height="16" rx="3" /><path d="m9 12 2 2 4-4" /></>} />,
};

/* ---------- Demo data ---------- */
const PROJECTS = [
  { name: 'Growth Campaign', note: 'Landing copy, ad variants and weekly reporting.' },
  { name: 'Content Engine', note: 'Drafts, edits and a publishing calendar.' },
  { name: 'Automation Flow', note: 'Triggers that connect your inbox to your tools.' },
  { name: 'User Research', note: 'Interview notes and synthesized themes.' },
];
const RECENTS = ['Fix spacing on cards', 'Need better empty state', 'Update sidebar structure', 'Mobile nav feels cramped', 'Can we simplify this?', 'Generate onboarding copy', 'Improve search results', 'Settings page feedback'];
const APPS = [
  { id: 'pulse', name: 'Pulse', desc: 'Post and read updates for your social channels.', c: '#111' },
  { id: 'forge', name: 'Forge', desc: 'Streamline your development workflow.', c: '#2d2d34' },
  { id: 'relay', name: 'Relay', desc: 'Facilitate team communication and chat.', c: '#7c3aed' },
  { id: 'tally', name: 'Tally', desc: 'Manage project tasks and deadlines.', c: '#f0506e' },
  { id: 'meet', name: 'Meet', desc: 'Host virtual meetings and webinars easily.', c: '#2d8cff' },
  { id: 'board', name: 'Board', desc: 'Organize projects with boards and cards.', c: '#1d6fe0' },
  { id: 'sketch', name: 'Sketch', desc: 'Design and prototype collaboratively.', c: '#f24e1e' },
  { id: 'pages', name: 'Pages', desc: 'Create documents and databases for teams.', c: '#444' },
  { id: 'canvas', name: 'Canvas', desc: 'Design graphics and presentations with ease.', c: '#00a6c8' },
  { id: 'vault', name: 'Vault', desc: 'Store and share files securely in the cloud.', c: '#0a61ff' },
];
const ARTIFACTS0 = [
  { t: 'AI Landing Page', d: 'Modern marketing site for your product', when: '1h ago' },
  { t: 'Research Agent', d: 'Autonomous web research workflow', when: '5h ago' },
  { t: 'Code Assistant', d: 'Terminal-first coding workspace', when: '2d ago' },
  { t: 'Meeting Notes', d: 'Product strategy and roadmap ideas', when: '2d ago' },
  { t: 'Prompt Library', d: 'Reusable prompts for AI tasks', when: '2d ago' },
];
const MODELS = [
  { id: 'orbit-4', name: 'Orbit 4', level: 7, c: '#e07a52' },
  { id: 'orbit-max', name: 'Orbit Max', level: 9, c: '#222' },
  { id: 'orbit-mini', name: 'Orbit Mini', level: 4, c: '#2b7cf5' },
  { id: 'open-r1', name: 'Open R1', level: 6, c: '#e8318c' },
];
const TRIGGERS = [['Search', '#4f8cff'], ['Photos', '#e8506b'], ['Repos', '#333'], ['Network', '#1a6fb5'], ['Web search', '#888'], ['Run workflow', '#888']];
const SKILLS = [['image-generation', '#888'], ['article-writing', '#888'], ['data-cleanup', '#888']];
const RUNS = [['Refine memory retrieval', 72], ['Rebuild orchestration layer', 38], ['Simplify execution flow', 91]] as const;

function replyFor(text: string): string {
  const t = text.toLowerCase();
  if (/(hi|hello|hey)\b/.test(t)) return 'Hi! I can help you plan, write, research or build. What should we work on first?';
  if (t.includes('spacing') || t.includes('card')) return 'Cards read best with a consistent 16px inner padding, a 12px gap between them and one radius value. Want me to audit yours?';
  if (t.includes('empty')) return 'A good empty state says what belongs here, why it is empty, and gives one clear action. I can draft the copy and a small illustration brief.';
  if (t.includes('nav')) return 'On small screens, keep to 3-5 destinations in a bottom bar and move everything else into a menu. Shall I propose a structure?';
  return 'Got it. Here is how I would start: 1) clarify the goal, 2) list what you already have, 3) draft a first version we can refine together. Want me to begin?';
}

/* ---------- Pieces ---------- */
function CopyBox({ text, onCopied }: { text: string; onCopied: (m: string) => void }) {
  const [done, setDone] = useState(false);
  return (
    <div className="ws-codebox">
      <span>{text}</span>
      <button type="button" aria-label={`Copy ${text}`} onClick={() => { navigator.clipboard?.writeText(text).catch(() => {}); setDone(true); onCopied('Copied to clipboard'); window.setTimeout(() => setDone(false), 1500); }}>
        {done ? ic.check : ic.copy}{done ? 'Copied' : ''}
      </button>
    </div>
  );
}

function Terminal() {
  const lines: [ReactNode, string][] = [[ic.flow, 'orbit launch workspace'], [ic.code, 'installing runtime...'], [ic.agent, 'configuring model...'], [ic.globe, 'adding web tools...'], [ic.rocket, 'workspace is running']];
  return (
    <div className="ws-term">
      <div className="ws-term__dots"><i /><i /><i /></div>
      <ul>{lines.map(([icon, t]) => <li key={t}>{icon}{t}</li>)}</ul>
    </div>
  );
}

/* ---------- The demo ---------- */
export interface WorkspaceDemoProps {
  /** Initial theme. Defaults to the site theme (document data-theme) or light. */
  defaultTheme?: Theme;
}

export function WorkspaceDemo({ defaultTheme }: WorkspaceDemoProps) {
  const [theme, setTheme] = useState<Theme>(() => defaultTheme ?? (typeof document !== 'undefined' && document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light'));
  const [mode, setMode] = useState<Mode>('chat');
  const [view, setView] = useState<View>('welcome');
  const [project, setProject] = useState(0);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [text, setText] = useState('');
  const [thinking, setThinking] = useState(false);
  const [model, setModel] = useState(MODELS[0].id);
  const [menu, setMenu] = useState(false);
  const [modal, setModal] = useState(true);
  const [channelCard, setChannelCard] = useState(true);
  const [connected, setConnected] = useState<Set<string>>(new Set(['pulse']));
  const [appQuery, setAppQuery] = useState('');
  const [artifacts, setArtifacts] = useState(ARTIFACTS0);
  const [query, setQuery] = useState('');
  const [toast, setToast] = useState<string | null>(null);
  const [paired, setPaired] = useState(false);
  const [triggers, setTriggers] = useState<Record<string, boolean>>(() => Object.fromEntries(TRIGGERS.map(([n]) => [n, true])));
  const [skills, setSkills] = useState<Record<string, boolean>>(() => Object.fromEntries(SKILLS.map(([n]) => [n, true])));
  const timers = useRef<number[]>([]);
  const searchRef = useRef<HTMLInputElement>(null);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => () => timers.current.forEach((t) => window.clearTimeout(t)), []);
  useEffect(() => { endRef.current?.scrollIntoView({ block: 'end' }); }, [msgs, thinking]);

  const notify = (m: string) => {
    setToast(m);
    timers.current.push(window.setTimeout(() => setToast(null), 2400));
  };

  const send = (raw: string) => {
    const t = raw.trim();
    if (!t || thinking) return;
    setMsgs((m) => [...m, { role: 'user', text: t }]);
    setText('');
    setThinking(true);
    timers.current.push(window.setTimeout(() => { setMsgs((m) => [...m, { role: 'ai', text: replyFor(t) }]); setThinking(false); }, 900));
  };

  const go = (v: View, m?: Mode) => { if (m) setMode(m); setView(v); setMenu(false); setQuery(''); };
  const openRecent = (title: string) => { setMode('chat'); setView('new-chat'); setMsgs([{ role: 'user', text: title }, { role: 'ai', text: replyFor(title) }]); };

  const nav: { id: View; label: string; icon: ReactNode; isNew?: boolean }[] = mode === 'chat'
    ? [{ id: 'welcome', label: 'Welcome', icon: ic.hand }, { id: 'new-chat', label: 'New chat', icon: ic.plus }, { id: 'projects', label: 'Projects', icon: ic.folder }, { id: 'artifacts', label: 'Artifacts', icon: ic.grid }, { id: 'apps', label: 'Apps', icon: ic.apps, isNew: true }]
    : [{ id: 'task', label: 'New task', icon: ic.plus }, { id: 'workspace', label: 'Workspace', icon: ic.folder }, { id: 'runs', label: 'Active runs', icon: ic.runs }, { id: 'live', label: 'Live artifacts', icon: ic.grid }, { id: 'plugins', label: 'Plugins', icon: ic.plug }, { id: 'mobile', label: 'Mobile', icon: ic.phone }];

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    const all: { label: string; kind: string; run: () => void }[] = [
      ...nav.map((n) => ({ label: n.label, kind: 'Page', run: () => go(n.id) })),
      ...PROJECTS.map((p, i) => ({ label: p.name, kind: 'Project', run: () => { setProject(i); go(mode === 'chat' ? 'projects' : 'workspace'); } })),
      ...RECENTS.map((r) => ({ label: r, kind: 'Chat', run: () => openRecent(r) })),
      ...APPS.map((a) => ({ label: a.name, kind: 'App', run: () => go('apps', 'chat') })),
    ];
    return all.filter((r) => r.label.toLowerCase().includes(q)).slice(0, 6);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, mode]);

  const Composer = ({ placeholder = 'Ask anything...' }: { placeholder?: string }) => (
    <form className="ws-composer" onSubmit={(e) => { e.preventDefault(); send(text); }}>
      <textarea
        value={text} onChange={(e) => setText(e.target.value)} placeholder={placeholder} aria-label="Message"
        onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(text); } }}
      />
      <div className="ws-composer__bar">
        <button type="button" className="ws-chip ws-chip--sq" aria-label="Add attachment" onClick={() => notify('Attachments are disabled in the demo')}>{ic.plus}</button>
        <button type="button" className="ws-chip" onClick={() => go('task', 'agent')}>{ic.rocket}Super mode <span className="ws-new">New</span></button>
        <button type="button" className="ws-chip ws-spacer" aria-haspopup="menu" aria-expanded={menu} onClick={() => setMenu((o) => !o)}>
          <span style={{ width: 9, height: 9, borderRadius: 3, background: MODELS.find((m) => m.id === model)?.c }} />{MODELS.find((m) => m.id === model)?.name}{ic.down}
        </button>
        <button type="button" className="ws-chip ws-chip--sq" aria-label="Dictate" style={{ boxShadow: 'none' }} onClick={() => notify('Voice input is disabled in the demo')}>{ic.mic}</button>
        <button type="submit" className="ws-send" aria-label="Send message" disabled={!text.trim() || thinking}>{ic.up}</button>
      </div>
    </form>
  );

  const chatBody = (title: string) => (
    msgs.length === 0 ? (
      <div className="ws-hero">
        <span style={{ color: 'var(--ws-text)' }}>{ic.mark}</span>
        <h2>{title}</h2>
        {Composer({})}
        <div className="ws-upgrade"><span>Upgrade to Pro</span><button type="button" className="ws-btn ws-btn--sm" onClick={() => go('plans')}>Upgrade</button></div>
        <div className="ws-cards3">
          {[['Create', 'Tasks, images, docs', 'Help me draft a project brief for '], ['Find', 'Answers and files', 'Find everything we decided about '], ['Research', 'Apps and web', 'Research the best way to ']].map(([a, b, seed]) => (
            <button key={a} type="button" onClick={() => setText(seed)}>{a === 'Create' ? ic.plus : a === 'Find' ? ic.search : ic.globe}<span><strong>{a}</strong>{b}</span></button>
          ))}
        </div>
      </div>
    ) : (
      <>
        <div className="ws-thread" aria-live="polite">
          {msgs.map((m, i) => <div key={i} className={`ws-msg ws-msg--${m.role}`}>{m.text}</div>)}
          {thinking && <div className="ws-msg ws-msg--ai" aria-label="Assistant is thinking"><span className="ws-typing"><i /><i /><i /></span></div>}
          <div ref={endRef} />
        </div>
        <div className="ws-chatdock">{Composer({ placeholder: 'Reply...' })}</div>
      </>
    )
  );

  const artifactsView = (
    <div className="ws-col">
      <div className="ws-head">
        <h2 className="ws-h2">{ic.grid}Artifacts</h2>
        <button type="button" className="ws-btn ws-btn--sm" onClick={() => { setArtifacts((a) => [{ t: `Untitled artifact ${a.length + 1}`, d: 'New artifact, ready to edit', when: 'just now' }, ...a]); notify('Artifact created'); }}>New artifact</button>
      </div>
      <div className="ws-grid2">
        {artifacts.map((a) => (
          <button key={a.t} type="button" className="ws-art" onClick={() => notify(`Opening "${a.t}" (demo)`)}>
            <div className="ws-art__thumb"><div className="ws-art__page">{ic.code}<p style={{ margin: '8px 0 10px' }}>{a.d}</p><i /><i style={{ width: '60%' }} /></div></div>
            <strong>{a.t}</strong><small>{a.when}</small>
          </button>
        ))}
      </div>
    </div>
  );

  const projectsView = (
    <div className="ws-col">
      <h2 className="ws-h2" style={{ marginBottom: 14 }}>{mode === 'chat' ? 'Projects' : 'Workspace'}</h2>
      <div className="ws-list">
        {PROJECTS.map((p, i) => (
          <div key={p.name} style={i === project ? { background: 'var(--ws-hover)' } : undefined}>
            <span style={{ color: 'var(--ws-muted)' }}>{ic.folder}</span>
            <div><strong>{p.name}</strong><p>{p.note}</p></div>
            <button type="button" className="ws-btn ws-btn--sm" style={{ marginLeft: 'auto' }} onClick={() => { setProject(i); notify(`Opened ${p.name}`); }}>Open</button>
          </div>
        ))}
      </div>
    </div>
  );

  const appsView = (
    <div className="ws-col" style={{ maxWidth: 820 }}>
      <h2 className="ws-h2" style={{ textAlign: 'center', marginBottom: 18 }}>Connect the tools your team already uses</h2>
      <label className="ws-field">{ic.search}<input value={appQuery} onChange={(e) => setAppQuery(e.target.value)} placeholder="Search marketplace..." aria-label="Search marketplace" /></label>
      <div className="ws-banner">
        {[['Relay', '#7c3aed', 'Summarize key updates from recent conversations'], ['Forge', '#333', 'Review open issues and pull request activity'], ['Mail', '#e0335c', 'Draft replies for every email I\'m behind on']].map(([n, c, t]) => (
          <div key={n} className="ws-pill" style={{ ['--c' as string]: c }}><b>{n}</b>{t}</div>
        ))}
      </div>
      <h3 className="ws-h3 ws-feat">Featured</h3>
      <div className="ws-apps">
        {APPS.filter((a) => `${a.name} ${a.desc}`.toLowerCase().includes(appQuery.trim().toLowerCase())).map((a) => {
          const on = connected.has(a.id);
          return (
            <div key={a.id} className="ws-app-row">
              <span className="ws-tile" style={{ ['--c' as string]: a.c }} aria-hidden="true">{a.name[0]}</span>
              <div><strong>{a.name}</strong><p>{a.desc}</p></div>
              <button type="button" className="ws-plus" aria-pressed={on} aria-label={`${on ? 'Disconnect' : 'Connect'} ${a.name}`}
                onClick={() => { setConnected((s) => { const n = new Set(s); if (n.has(a.id)) n.delete(a.id); else n.add(a.id); return n; }); notify(on ? `${a.name} disconnected` : `${a.name} connected`); }}>
                {on ? ic.check : ic.plus}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );

  const welcomeView = (
    <div className="ws-col">
      <span style={{ color: 'var(--ws-text)' }}>{ic.mark}</span>
      <h1 className="ws-h1" style={{ marginTop: 14 }}>Build AI apps locally</h1>
      <p className="ws-sub">Run powerful open models in minutes.</p>
      <CopyBox text="curl -fsSL https://orbit.example/install.sh | sh" onCopied={notify} />
      <hr className="ws-rule" />
      <div className="ws-split">
        <Terminal />
        <div>
          <h2 className="ws-h2">Launch your workspace</h2>
          <p className="ws-sub" style={{ margin: '10px 0 18px' }}>Start coding, researching and automating with your own models.</p>
          <CopyBox text="orbit launch workspace" onCopied={notify} />
        </div>
      </div>
      <h2 className="ws-h2">Local first. Cloud ready.</h2>
      <p className="ws-sub" style={{ margin: '12px 0 0' }}>Scale from your laptop to larger hosted models whenever you need more power.</p>
      <ul className="ws-checks">{['Run larger models instantly', 'Parallelize complex workflows', 'Connect to live web data'].map((t) => <li key={t}>{ic.check}{t}</li>)}</ul>
    </div>
  );

  const plansView = (
    <div className="ws-plans-wrap">
      <span style={{ color: 'var(--ws-text)' }}>{ic.mark}</span>
      <h2 className="ws-h3" style={{ marginTop: 14 }}>Start free, no demo required</h2>
      <p className="ws-sub" style={{ margin: '4px 0 0' }}>You are set to start on your own. Book a demo if you would prefer a walkthrough.</p>
      <div className="ws-plans">
        {[
          { n: 'Starter', tag: 'Free', blue: false, d: 'Hands-on with a free workspace. Upgrade when you outgrow it.', items: ['Free for up to 10 projects', 'Connect 1 channel + 1 integration', 'Live in under 10 minutes'], btn: 'Create account', art: 'linear-gradient(120deg,#c3a5ff,#f6b0ff 50%,#9fd0ff)' },
          { n: 'Pro', tag: '$650/month', blue: true, d: 'Get a 30-minute walkthrough with our team if you would rather see it first.', items: ['Live screen-share session', 'Tailored to your use case', 'You can still sign up after'], btn: 'Book a demo', art: 'linear-gradient(120deg,#9ec7ff,#ffb35c 55%,#ff9ec2)' },
        ].map((p) => (
          <div key={p.n} className="ws-plan">
            <div className="ws-plan__art" style={{ background: p.art }} />
            <div className="ws-plan__body">
              <div className="ws-plan__top">{p.n}<span className={`ws-tag${p.blue ? ' ws-tag--blue' : ''}`}>{p.tag}</span></div>
              <p>{p.d}</p>
              <small>What you get:</small>
              <ul>{p.items.map((it) => <li key={it}>{ic.clone}{it}</li>)}</ul>
            </div>
            <footer><button type="button" className={`ws-btn ws-btn--wide${p.blue ? ' ws-btn--blue' : ''}`} onClick={() => notify(p.blue ? 'Demo requested (demo)' : 'Account created (demo)')}>{p.btn}</button></footer>
          </div>
        ))}
      </div>
    </div>
  );

  const runsView = (
    <div className="ws-col">
      <h2 className="ws-h2" style={{ marginBottom: 14 }}>Active runs</h2>
      <div className="ws-list">
        {RUNS.map(([n, p]) => (
          <div key={n}><span style={{ color: 'var(--ws-muted)' }}>{ic.runs}</span>
            <div className="ws-run"><strong>{n}</strong><div className="ws-progress" role="progressbar" aria-valuenow={p} aria-valuemin={0} aria-valuemax={100} aria-label={n}><i style={{ width: `${p}%` }} /></div></div>
            <span style={{ color: 'var(--ws-muted)' }}>{p}%</span>
          </div>
        ))}
      </div>
    </div>
  );

  const pluginsView = (
    <div className="ws-panel">
      <section>
        <header>Triggers<button type="button" className="ws-icon-btn" aria-label="Add trigger" onClick={() => notify('Adding triggers is disabled in the demo')}>{ic.plus}</button></header>
        {TRIGGERS.map(([n, c]) => (
          <div key={n} className="ws-toggle-row"><span className="ws-tile" style={{ ['--c' as string]: c }} aria-hidden="true">{n[0]}</span><label htmlFor={`t-${n}`}>{n}</label><Switch id={`t-${n}`} checked={triggers[n]} onChange={(e) => setTriggers((s) => ({ ...s, [n]: e.target.checked }))} aria-label={n} /></div>
        ))}
      </section>
      <section>
        <header>Skills<button type="button" className="ws-icon-btn" aria-label="Add skill" onClick={() => notify('Adding skills is disabled in the demo')}>{ic.plus}</button></header>
        {SKILLS.map(([n, c]) => (
          <div key={n} className="ws-toggle-row"><span className="ws-tile" style={{ ['--c' as string]: c }} aria-hidden="true">{n[0]}</span><label htmlFor={`s-${n}`}>{n}</label><Switch id={`s-${n}`} checked={skills[n]} onChange={(e) => setSkills((s) => ({ ...s, [n]: e.target.checked }))} aria-label={n} /></div>
        ))}
      </section>
    </div>
  );

  const mobileView = (
    <div className="ws-pair" style={{ margin: '-36px -40px -32px' }}>
      <div style={{ padding: '70px 0 0 56px' }}>
        <span style={{ color: 'var(--ws-text)' }}>{ic.phone}</span>
        <h1 className="ws-h1" style={{ margin: '14px 0 6px' }}>Pair with the mobile app</h1>
        <p className="ws-sub">Keep working from your phone or another device.</p>
        <button type="button" className="ws-btn" onClick={() => { setPaired((p) => !p); notify(paired ? 'Device disconnected' : 'Device connected'); }}>{paired ? 'Disconnect device' : 'Connect device'}</button>
        <div className="ws-feat-list">
          {[['Resume instantly', 'Pick up any run or workspace from your desktop'], ['Stay connected', 'Get notified when a task completes or needs input'], ['Start from anywhere', 'Launch new workflows directly from your phone']].map(([a, b]) => (
            <div key={a}><span style={{ color: 'var(--ws-muted)' }}>{ic.check}</span><div><strong>{a}</strong><p>{b}</p></div></div>
          ))}
        </div>
      </div>
      <div className="ws-pair__art" style={{ margin: '14px 14px 14px 0' }}>
        <div className="ws-phone"><div className="ws-phone__screen"><span>9:41</span><strong>Orbit Labs</strong><span>Projects</span><span>Artifacts</span><span>Integrations</span><span style={{ marginTop: 6 }}>Recents</span><span>Fix spacing on cards</span><span>Agent response feels verbose</span><button type="button" className="ws-btn">{paired ? 'Connected' : 'New task'}</button></div></div>
      </div>
    </div>
  );

  let content: ReactNode;
  switch (view) {
    case 'welcome': content = welcomeView; break;
    case 'new-chat': content = chatBody('Where should we begin?'); break;
    case 'task': content = chatBody('What should the agent do?'); break;
    case 'projects': case 'workspace': content = projectsView; break;
    case 'artifacts': case 'live': content = artifactsView; break;
    case 'apps': content = appsView; break;
    case 'plans': content = plansView; break;
    case 'runs': content = runsView; break;
    case 'plugins': content = pluginsView; break;
    default: content = mobileView;
  }

  return (
    <div
      className="ws-frame" data-theme={theme}
      onKeyDown={(e) => { if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); e.stopPropagation(); searchRef.current?.focus(); } if (e.key === 'Escape') { setModal(false); setMenu(false); } }}
    >
      <div className="ws-app">
        <header className="ws-top">
          <span className="ws-mark" aria-hidden="true">{ic.mark}</span>
          <div role="tablist" aria-label="Mode" style={{ display: 'flex', gap: 2 }}>
            {([['chat', 'Chat', ic.chat], ['agent', 'Agent', ic.agent]] as const).map(([id, label, icon]) => (
              <button key={id} role="tab" aria-selected={mode === id} className="ws-tab" onClick={() => { setMode(id); setView(id === 'chat' ? 'new-chat' : 'task'); setMenu(false); }}>{icon}{label}</button>
            ))}
            <button role="tab" aria-selected="false" className="ws-tab" onClick={() => notify('Code mode is not part of this demo')}>{ic.code}Code</button>
            <button role="tab" aria-selected="false" className="ws-tab" onClick={() => notify('Design mode is not part of this demo')}>{ic.design}Design</button>
          </div>
          <div className="ws-search">
            {ic.search}
            <input ref={searchRef} value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search" aria-label="Search the workspace" />
            <kbd>Ctrl K</kbd>
            {results.length > 0 && (
              <div className="ws-results" role="listbox">
                {results.map((r) => <button key={`${r.kind}-${r.label}`} type="button" role="option" aria-selected="false" onClick={r.run}>{r.label}<small>{r.kind}</small></button>)}
              </div>
            )}
          </div>
          <button type="button" className="ws-icon-btn ws-theme-toggle" aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'} onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>{theme === 'dark' ? ic.sun : ic.moon}</button>
          <button type="button" className="ws-icon-btn" aria-label="Notifications" onClick={() => notify('You are all caught up')}>{ic.bell}</button>
          <button type="button" className="ws-invite" onClick={() => notify('Invite link copied (demo)')}>{ic.user}Invite</button>
          <span className="ws-avatar" aria-hidden="true" />
        </header>

        <div className="ws-body">
          <aside className="ws-side" aria-label="Workspace">
            {nav.map((n) => (
              <button key={n.id} type="button" className="ws-nav" aria-current={view === n.id ? 'page' : undefined} onClick={() => go(n.id)}>{n.icon}{n.label}{n.isNew && <span className="ws-badge-new">New</span>}</button>
            ))}
            <h6 className="ws-label">Projects</h6>
            {PROJECTS.map((p, i) => <button key={p.name} type="button" className="ws-nav" onClick={() => { setProject(i); go(mode === 'chat' ? 'projects' : 'workspace'); }}>{ic.folder}{p.name}</button>)}
            <h6 className="ws-label">Recents</h6>
            {RECENTS.map((r) => <button key={r} type="button" className="ws-nav ws-recent" onClick={() => openRecent(r)}>{r}</button>)}
            <div className="ws-connect"><strong>Connect apps</strong>External apps such as docs, issues and storage.<div className="ws-dots">{APPS.slice(0, 6).map((a) => <i key={a.id} style={{ ['--c' as string]: a.c, opacity: connected.has(a.id) ? 1 : .55 }}>{a.name[0]}</i>)}</div></div>
          </aside>

          <main className="ws-main" style={view === 'mobile' ? { paddingTop: 36 } : undefined}>
            {content}
            {menu && (
              <div className="ws-menu" role="menu">
                <h4>Models</h4>
                {MODELS.map((m) => (
                  <button key={m.id} type="button" role="menuitemradio" aria-checked={model === m.id} className="ws-model" style={{ ['--c' as string]: m.c }} onClick={() => { setModel(m.id); setMenu(false); }}>
                    <i />{m.name}<span className="ws-bars" aria-hidden="true">{Array.from({ length: 9 }, (_, i) => <b key={i} className={i < m.level ? 'on' : ''} />)}</span>
                  </button>
                ))}
              </div>
            )}
            {(view === 'new-chat' || view === 'task') && msgs.length === 0 && channelCard && (
              <div className="ws-toast-card">
                <span className="ws-toast-card__art" aria-hidden="true" />
                <div><strong style={{ fontWeight: 500 }}>Connect your channel</strong><p style={{ color: 'var(--ws-muted)' }}>Connect chat, tickets or support inboxes.</p></div>
                <button type="button" aria-label="Dismiss" onClick={() => setChannelCard(false)}>{ic.x}</button>
              </div>
            )}
          </main>
        </div>

        {modal && view === 'welcome' && (
          <div className="ws-scrim" onClick={(e) => { if (e.target === e.currentTarget) setModal(false); }}>
            <div className="ws-modal" role="dialog" aria-modal="true" aria-label="Connect your apps">
              <div className="ws-modal__art"><Terminal /></div>
              <div className="ws-modal__body">
                <h2 className="ws-h3">Connect your apps</h2>
                <p>Link your apps to unify data and automate work across your day.</p>
                <button type="button" className="ws-btn ws-btn--wide" autoFocus onClick={() => { setModal(false); go('apps'); }}>Explore</button>
              </div>
            </div>
          </div>
        )}
        {toast && <div className="ws-toast" role="status">{toast}</div>}
      </div>
    </div>
  );
}
