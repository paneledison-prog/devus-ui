import { useEffect, useRef, useState, type ReactNode } from 'react';
import { I, ic, Modal, Root, useDemoTheme, useOutside, useToast, type Theme } from '../Agents/shared';
import './BuildAgent.css';

/* ---------- Icons ---------- */
const bi = {
  folder: <I size={14} d={<path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z" />} />,
  laptop: <I size={14} d={<path d="M5 6h14v9H5ZM3 19h18" />} />,
  branch: <I size={14} d={<><circle cx="7" cy="6" r="2" /><circle cx="7" cy="18" r="2" /><circle cx="17" cy="9" r="2" /><path d="M7 8v8M17 11c0 4-8 2-10 5" /></>} />,
  globe: <I size={14} d={<><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" /></>} />,
  terminal: <I size={14} d={<><rect x="3" y="4" width="18" height="16" rx="3" /><path d="m7 10 3 2-3 2M13 15h4" /></>} />,
  eye: <I size={14} d={<><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12Z" /><circle cx="12" cy="12" r="3" /></>} />,
  tap: <I size={14} d={<path d="M9 11V5a2 2 0 1 1 4 0v5l5 1v4a6 6 0 0 1-6 6h-1a6 6 0 0 1-5-3l-3-5 3 1Z" />} />,
  file: <I size={14} d={<path d="M7 3h7l5 5v13H7ZM14 3v5h5" />} />,
  tool: <I size={14} d={<path d="M14 6a4 4 0 0 0 4 4l-9 9a2.5 2.5 0 0 1-4-4l9-9a4 4 0 0 0 0-4Z" />} />,
  search: <I size={14} d={<><circle cx="11" cy="11" r="6" /><path d="m20 20-4-4" /></>} />,
  check: <I size={14} d={<path d="m5 12.5 4.5 4.5L19 7" />} />,
  select: <I size={16} d={<path d="m5 4 14 6-6 2-2 6Z" />} />,
  rotate: <I size={16} d={<path d="M4 12a8 8 0 0 1 14-5l2 2M20 4v5h-5M20 12a8 8 0 0 1-14 5l-2-2M4 20v-5h5" />} />,
  home: <I size={16} d={<path d="M4 11 12 4l8 7v9h-5v-5H9v5H4Z" />} />,
  mic: <I size={15} d={<><rect x="9" y="3" width="6" height="11" rx="3" /><path d="M5 11a7 7 0 0 0 14 0M12 18v3" /></>} />,
  shield: <I size={14} d={<path d="M12 3 5 6v6c0 4 3 7 7 9 4-2 7-5 7-9V6Z" />} />,
  stop: <I size={14} d={<rect x="6" y="6" width="12" height="12" rx="2" fill="currentColor" />} />,
  up: <I size={16} d={<path d="M12 19V5M6 11l6-6 6 6" />} />,
  back: <I size={14} d={<path d="M15 5l-7 7 7 7" />} />,
  fwd: <I size={14} d={<path d="m9 5 7 7-7 7" />} />,
  reload: <I size={14} d={<path d="M4 12a8 8 0 0 1 14-5l2 2M20 4v5h-5" />} />,
  dots: <I size={16} d={<path d="M5 12h.01M12 12h.01M19 12h.01" />} />,
  panel: <I size={15} d={<><rect x="3" y="4" width="18" height="16" rx="3" /><path d="M15 4v16" /></>} />,
};

/* ---------- Types ---------- */
type StepIcon = 'search' | 'tool' | 'terminal' | 'check' | 'globe' | 'tap' | 'file' | 'eye' | 'shield';
type ModKey = 'avatarTop' | 'bigText' | 'tight';
type Item =
  | { id: number; kind: 'user'; text: string; annotation?: string }
  | { id: number; kind: 'text'; text: string }
  | { id: number; kind: 'step'; icon: StepIcon; label: string; sub?: string }
  | { id: number; kind: 'edit'; file: string; plus: number; minus: number; mod: ModKey; undone?: boolean }
  | { id: number; kind: 'approval'; text: string; state: 'pending' | 'approved' | 'denied' }
  | { id: number; kind: 'preview' }
  | { id: number; kind: 'turn'; start: number; secs?: number };
type NewItem = Item extends infer U ? (U extends Item ? Omit<U, 'id'> : never) : never;
interface Sim { orient: 'portrait' | 'landscape'; avatarTop: boolean; bigText: boolean; tight: boolean; dark: boolean; menu: 'none' | 'overflow' | 'share'; liked: number[]; note: string | null }
interface Pending { label: string; x: number; y: number }

const SIM0: Sim = { orient: 'portrait', avatarTop: false, bigText: false, tight: false, dark: false, menu: 'none', liked: [], note: null };
const DIFFS: Record<ModKey, { file: string; lines: [string, string][] }> = {
  avatarTop: { file: 'PostRowView.swift', lines: [[' ', 'var body: some View {'], ['-', '    HStack(alignment: .center, spacing: 12) {'], ['+', '    HStack(alignment: .top, spacing: 12) {'], [' ', '        AvatarView(post.author)']] },
  bigText: { file: 'PostBodyView.swift', lines: [[' ', 'Text(post.body)'], ['-', '    .font(.body)'], ['+', '    .font(.title3)'], [' ', '    .lineSpacing(3)']] },
  tight: { file: 'PostRowView.swift', lines: [[' ', '.padding(.horizontal, 16)'], ['-', '.padding(.vertical, 14)'], ['+', '.padding(.vertical, 6)'], [' ', '.background(.surface)']] },
};
const APPROVALS = ['Approve for me', 'Ask every time', 'Full access'];
const MODELS = ['Pro 5 · Low', 'Pro 5 · Medium', 'Pro 5 · High'];
const PROJECTS = ['ChirpApp', 'Atlas Notes', 'Pebble Fit'];
const POSTS = [
  { who: 'Ada Lindqvist', time: 'now', body: <>Here's to the <b className="ba-tag">#crazy</b> ones. The misfits. The <b className="ba-tag">@rebels</b>. The troublemakers.</>, r: 34, b: 10, s: 150 },
  { who: 'Ada Lindqvist', time: '2m', body: <>Ship small, look closely, <b className="ba-tag">#iterate</b>. The <b className="ba-tag">@preview</b> never lies.</>, r: 8, b: 3, s: 61 },
  { who: 'Ada Lindqvist', time: '9m', body: <>Reading every row at <b className="ba-tag">#every</b> size. Landscape too.</>, r: 2, b: 1, s: 24 },
];

const fmt = (s: number) => (s >= 60 ? `${Math.floor(s / 60)}m ${s % 60}s` : `${s}s`);
const rich = (s: string): ReactNode[] => s.split('`').map((p, i) => (i % 2 ? <code key={i}>{p}</code> : p));
const STOP = Symbol('stop');

/* ---------- Small dropdown ---------- */
function Pick({ value, options, onChange, icon, label, up }: { value: string; options: string[]; onChange: (v: string) => void; icon?: ReactNode; label: string; up?: boolean }) {
  const [open, setOpen] = useState(false);
  const ref = useOutside(open, () => setOpen(false));
  return (
    <div className="ba-pick" ref={ref}>
      <button type="button" className="ba-pickbtn" aria-haspopup="listbox" aria-expanded={open} aria-label={`${label}: ${value}`} onClick={() => setOpen((o) => !o)}>{icon}{value}{ic.chevron}</button>
      {open ? (
        <ul className={`ba-picklist${up ? ' up' : ''}`} role="listbox" aria-label={label}>
          {options.map((o) => <li key={o} role="option" aria-selected={o === value} onClick={() => { onChange(o); setOpen(false); }}><span>{o}</span>{o === value ? ic.check : null}</li>)}
        </ul>
      ) : null}
    </div>
  );
}

/* ---------- Simulator phone ---------- */
function Phone({ sim, annotate, markers, onPick, onMenu, onLike, onMenuItem }: {
  sim: Sim; annotate: boolean; markers: Pending[]; onPick: (label: string, el: HTMLElement) => void;
  onMenu: (m: Sim['menu']) => void; onLike: (i: number) => void; onMenuItem: (label: string) => void;
}) {
  const hot = useRef<HTMLElement | null>(null);
  const over = (e: React.MouseEvent) => {
    if (!annotate) return;
    const el = (e.target as HTMLElement).closest('[data-ann]') as HTMLElement | null;
    if (hot.current && hot.current !== el) hot.current.classList.remove('ba-hot');
    hot.current = el; el?.classList.add('ba-hot');
  };
  const click = (e: React.MouseEvent) => {
    if (!annotate) return;
    const el = (e.target as HTMLElement).closest('[data-ann]') as HTMLElement | null;
    if (!el) return;
    e.preventDefault(); e.stopPropagation();
    onPick(el.dataset.ann ?? 'Element', el);
  };
  void markers;
  return (
    <div className="ba-phone" data-o={sim.orient} data-dark={sim.dark} data-annotating={annotate} onMouseOver={over} onMouseLeave={() => { hot.current?.classList.remove('ba-hot'); hot.current = null; }} onClickCapture={click}>
      <div className="ba-phone__status" data-ann="Status bar"><span>10:09</span><span className="ba-island" data-ann="Dynamic island" /><span className="ba-phone__sys">▂▄▆ ▮</span></div>
      <div className="ba-feed">
        {POSTS.map((p, i) => (
          <article key={i} className="ba-post" data-top={sim.avatarTop} data-tight={sim.tight} data-big={sim.bigText}>
            <span className="ba-avatar" data-ann="Avatar"><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><circle cx="12" cy="9" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></svg></span>
            <div className="ba-post__col">
              <div className="ba-post__head" data-ann="Author name"><b>{p.who}</b><span>{p.time}</span>
                <button type="button" className="ba-more" aria-label="More actions" data-ann="More button" onClick={() => onMenu('overflow')}>⋯</button></div>
              <p className="ba-post__body" data-ann="Post text">{p.body}</p>
              <div className="ba-post__acts" data-ann="Action bar">
                <span>↩ {p.r}</span><span>⟲ {p.b}</span>
                <button type="button" className="ba-like" aria-pressed={sim.liked.includes(i)} aria-label="Favorite" onClick={() => onLike(i)}>{sim.liked.includes(i) ? '★' : '☆'} {p.s + (sim.liked.includes(i) ? 1 : 0)}</button>
                <button type="button" className="ba-share" aria-label="Share" onClick={() => onMenu('share')}>⇧</button>
              </div>
            </div>
          </article>
        ))}
      </div>
      {sim.menu !== 'none' ? (
        <div className="ba-sheet-scrim" onClick={() => onMenu('none')}>
          <div className="ba-sheet" role="menu" aria-label="Post actions" onClick={(e) => e.stopPropagation()}>
            <div className="ba-sheet__icons"><span>↩</span><span>⟲</span><span>☆</span><span>⚑</span></div>
            <button role="menuitem" onClick={() => onMenuItem('Quote')}>❝ Quote</button>
            <button role="menuitem" aria-expanded={sim.menu === 'share'} onClick={() => onMenu(sim.menu === 'share' ? 'overflow' : 'share')}>⇧ Share <i>{sim.menu === 'share' ? '⌃' : '⌄'}</i></button>
            {sim.menu === 'share' ? <div className="ba-sheet__sub"><button role="menuitem" onClick={() => onMenuItem('Post shared')}>Share Post</button><button role="menuitem" onClick={() => onMenuItem('Link copied')}>Share Link</button><button role="menuitem" onClick={() => onMenuItem('Image saved to Photos')}>Share as Image</button></div> : null}
            <button role="menuitem" onClick={() => onMenuItem('Translated')}>文 Translate</button>
            <button role="menuitem" onClick={() => onMenuItem('Muted')}>Mute</button>
          </div>
        </div>
      ) : null}
      {sim.note ? <div className="ba-simnote" role="status">{sim.note}</div> : null}
    </div>
  );
}

export interface BuildAgentDemoProps {
  /** Start on the new-thread screen or inside a running thread. */
  startAt?: 'home' | 'thread';
  defaultTheme?: Theme;
}

export function BuildAgentDemo({ startAt = 'home', defaultTheme }: BuildAgentDemoProps) {
  const [theme, setTheme] = useDemoTheme(defaultTheme);
  const [stage, setStage] = useState<'home' | 'thread'>('home');
  const [project, setProject] = useState(PROJECTS[0]);
  const [where, setWhere] = useState('Work locally');
  const [branch, setBranch] = useState('main');
  const [approval, setApproval] = useState(APPROVALS[0]);
  const [model, setModel] = useState(MODELS[0]);
  const [plugin, setPlugin] = useState(true);
  const [plusMenu, setPlusMenu] = useState(false);
  const [text, setText] = useState('');
  const [listening, setListening] = useState(false);
  const [thread, setThread] = useState<Item[]>([]);
  const [busy, setBusy] = useState(false);
  const [now, setNow] = useState(Date.now());
  const [simOpen, setSimOpen] = useState(false);
  const [sim, setSim] = useState<Sim>(SIM0);
  const [annotate, setAnnotate] = useState(false);
  const [pending, setPending] = useState<Pending | null>(null);
  const [annText, setAnnText] = useState('');
  const [changes, setChanges] = useState({ plus: 188, minus: 239 });
  const [commitOpen, setCommitOpen] = useState(false);
  const [commitMsg, setCommitMsg] = useState('Update post row layout');
  const [review, setReview] = useState<ModKey | null>(null);
  const [scale, setScale] = useState(1);
  const toast = useToast();
  const plusRef = useOutside(plusMenu, () => setPlusMenu(false));
  const idRef = useRef(1);
  const runId = useRef(0);
  const mounted = useRef(true);
  const timers = useRef<number[]>([]);
  const resolver = useRef<((ok: boolean) => void) | null>(null);
  const endRef = useRef<HTMLDivElement>(null);
  const paneRef = useRef<HTMLDivElement>(null);
  const simNote = useRef<number>(0);

  useEffect(() => { mounted.current = true; return () => { mounted.current = false; timers.current.forEach((t) => window.clearTimeout(t)); window.clearTimeout(simNote.current); }; }, []);
  useEffect(() => { if (!busy) return; const t = window.setInterval(() => setNow(Date.now()), 1000); return () => window.clearInterval(t); }, [busy]);
  useEffect(() => { endRef.current?.scrollIntoView?.({ block: 'end' }); }, [thread]);
  useEffect(() => { if (startAt === 'thread' && stage === 'home' && thread.length === 0) { void run('Show me the PostRow SwiftUI previews'); } /* eslint-disable-next-line react-hooks/exhaustive-deps */ }, []);

  /* Scale the phone to the pane */
  useEffect(() => {
    const el = paneRef.current; if (!el || !simOpen) return;
    const fit = () => {
      const w = sim.orient === 'portrait' ? 318 : 640; const h = sim.orient === 'portrait' ? 650 : 330;
      setScale(Math.max(0.35, Math.min(1, (el.clientWidth - 48) / w, (el.clientHeight - 150) / h)));
    };
    fit();
    const ro = new ResizeObserver(fit); ro.observe(el);
    return () => ro.disconnect();
  }, [simOpen, sim.orient]);

  const push = (it: NewItem) => { const id = idRef.current++; setThread((t) => [...t, { ...it, id } as Item]); return id; };
  const patch = (id: number, p: Partial<Item>) => setThread((t) => t.map((x) => (x.id === id ? ({ ...x, ...p } as Item) : x)));
  const flash = (n: string) => { setSim((s) => ({ ...s, note: n })); window.clearTimeout(simNote.current); simNote.current = window.setTimeout(() => setSim((s) => ({ ...s, note: null })), 1600); };

  const stop = () => {
    runId.current++; resolver.current?.(false); resolver.current = null;
    timers.current.forEach((t) => window.clearTimeout(t)); timers.current = [];
    setThread((t) => t.map((x) => (x.kind === 'turn' && x.secs == null ? { ...x, secs: Math.floor((Date.now() - x.start) / 1000) } : x.kind === 'approval' && x.state === 'pending' ? { ...x, state: 'denied' } : x)));
    push({ kind: 'text', text: 'Stopped. Tell me what to do next.' });
    setBusy(false);
  };

  const applyMod = (mod: ModKey, plus: number, minus: number, file: string) => {
    setSim((s) => ({ ...s, [mod]: true }));
    setChanges((c) => ({ plus: c.plus + plus, minus: c.minus + minus }));
    push({ kind: 'edit', file, plus, minus, mod });
  };
  const undoEdit = (it: Extract<Item, { kind: 'edit' }>) => {
    setSim((s) => ({ ...s, [it.mod]: false }));
    setChanges((c) => ({ plus: c.plus - it.plus, minus: c.minus - it.minus }));
    patch(it.id, { undone: true });
  };

  async function run(raw: string, annotation?: string) {
    const msg = raw.trim(); if (!msg || busy) return;
    if (stage === 'home') setStage('thread');
    setBusy(true); setText('');
    const my = ++runId.current;
    const alive = () => mounted.current && runId.current === my;
    const go = async (ms: number) => { await new Promise<void>((r) => { timers.current.push(window.setTimeout(r, ms)); }); if (!alive()) throw STOP; };
    const say = (t: string) => push({ kind: 'text', text: t });
    const step = (icon: StepIcon, label: string, sub?: string) => push({ kind: 'step', icon, label, sub });
    push({ kind: 'user', text: msg, annotation });
    const turn = push({ kind: 'turn', start: Date.now() });
    setNow(Date.now());
    try {
      await go(600);
      if (annotation) {
        const l = `${annotation} ${msg}`.toLowerCase();
        const mod: ModKey = /avatar|align|top|center|move|image/.test(l) ? 'avatarTop' : /text|font|bigger|larger|size|read/.test(l) ? 'bigText' : 'tight';
        const d = DIFFS[mod];
        say(`I see the selected ${annotation.toLowerCase()}. I'll adjust the layout, then let the running preview hot-reload and verify it visually.`);
        await go(900); step('file', 'Reading PostRowHeaderView.swift');
        await go(1100); step('file', `Editing ${d.file}`, '+1 −1');
        await go(1000); applyMod(mod, 1, 1, d.file);
        await go(900); step('eye', 'Check current preview');
        await go(900); say(`Done. I changed \`${d.file}\` ${mod === 'avatarTop' ? 'so the leading avatar uses `.top` alignment instead of vertical centering' : mod === 'bigText' ? 'so the post text uses a larger type size' : 'so the rows use tighter vertical padding'}. Verified via hot reload in the running SwiftUI preview.`);
      } else if (!simOpen) {
        say(`I'll use the iOS simulator browser workflow so you can see the SwiftUI preview inside the app, then I'll point it at the \`PostRow\` preview target.`);
        await go(1000); step('search', 'Explored 1 file, 1 search, 1 command');
        await go(900); say(`I found the \`PostRowView\` preview in the \`PostKit\` package. The worktree already has local changes, so I'll treat those as yours and only run what's needed to launch the preview.`);
        await go(900); step('tool', 'Used buildtool');
        await go(700); step('terminal', 'Running command', 'start preview host');
        await go(1000); say('The booted simulator is `iPhone 17 Pro`. I\'m going to start the package preview host, then mirror that simulator into the in-app browser. This needs host access, so I\'m asking for the scoped simulator-bridge permission.');
        await go(700);
        if (approval === 'Ask every time') {
          const id = push({ kind: 'approval', text: 'Allow the simulator bridge to read and control the booted simulator?', state: 'pending' });
          const ok = await new Promise<boolean>((r) => { resolver.current = r; });
          resolver.current = null; if (!alive()) throw STOP;
          patch(id, { state: ok ? 'approved' : 'denied' });
          if (!ok) { say('Understood. I will not start the simulator stream. Tell me if you want a different approach.'); throw new Error('denied'); }
        } else step('shield', 'Approved request', 'ran 1 command');
        await go(900); step('globe', 'Browser control connected');
        await go(800); step('tool', 'Open simulator stream');
        setSimOpen(true);
        await go(1200); say('The simulator stream is available at `http://localhost:3200`. I verified the frame is live and showing the `PostRowView` preview variants on `iPhone 17 Pro`. The preview host and simulator stream are still running so you can inspect it.');
        push({ kind: 'preview' });
      } else if (/share|menu|overflow/i.test(msg)) {
        say(`I'll use the live simulator stream and open the first row's overflow menu, then choose the share-as-image action.`);
        await go(1000); step('eye', 'Check current preview');
        await go(900); step('tap', 'Tap overflow'); setSim((s) => ({ ...s, menu: 'overflow' }));
        await go(1100); say('The context menu is open. The share item has a submenu indicator, so I\'m opening that next.');
        await go(800); step('tap', 'Open share submenu'); setSim((s) => ({ ...s, menu: 'share' }));
        await go(900); say('The share submenu is open with Share Post, Share Link and Share as Image. I left it open so you can pick one.');
      } else if (/rotate|landscape|portrait|orientation/i.test(msg)) {
        const next = sim.orient === 'portrait' ? 'landscape' : 'portrait';
        say(`I'll rotate the simulator to ${next} and check that every row still fits.`);
        await go(900); step('tap', 'Rotate device'); setSim((s) => ({ ...s, orient: next }));
        await go(1000); say(`The device is now in ${next}. Rows reflow correctly and no text is clipped.`);
      } else if (/dark|appearance|theme/i.test(msg)) {
        say('Switching the simulator appearance and re-checking contrast.');
        await go(900); step('tap', 'Toggle appearance'); setSim((s) => ({ ...s, dark: !s.dark }));
        await go(900); say(`The preview is now in ${sim.dark ? 'light' : 'dark'} mode. Text and icons keep enough contrast.`);
      } else if (/undo|revert/i.test(msg)) {
        const last = [...thread].reverse().find((x) => x.kind === 'edit' && !x.undone) as Extract<Item, { kind: 'edit' }> | undefined;
        if (last) { await go(700); undoEdit(last); say(`Reverted the change in \`${last.file}\`.`); } else say('There is no edit to undo.');
      } else {
        say('Let me look at the preview and the code involved.');
        await go(900); step('search', 'Explored 2 files, 1 search');
        await go(900); step('eye', 'Check current preview');
        await go(1000); say('I checked the preview. Tap an element in the simulator with annotation mode on (the cursor button) and describe the change; I will edit the code and hot-reload it.');
      }
    } catch (e) {
      if (e !== STOP && (e as Error).message !== 'denied') throw e;
      if (e === STOP) return;
    }
    if (alive()) {
      setThread((t) => t.map((x) => (x.id === turn && x.kind === 'turn' ? { ...x, secs: Math.max(1, Math.floor((Date.now() - x.start) / 1000)) } : x)));
      setBusy(false);
    }
  }

  const submitAnnotation = () => {
    if (!pending || !annText.trim()) return;
    const label = pending.label; const t = annText; setPending(null); setAnnText(''); setAnnotate(false);
    void run(t, label);
  };
  const dictate = () => {
    if (listening) return; setListening(true);
    timers.current.push(window.setTimeout(() => { if (!mounted.current) return; setListening(false); setText('Rotate the simulator to landscape and check every row'); }, 1400));
  };
  const onMenuItem = (n: string) => { setSim((s) => ({ ...s, menu: 'none' })); flash(n); };

  const turnSecs = (x: Extract<Item, { kind: 'turn' }>) => (x.secs ?? Math.max(0, Math.floor((now - x.start) / 1000)));
  const composer = (home: boolean) => (
    <form className={`ba-composer${home ? ' ba-composer--home' : ''}`} onSubmit={(e) => { e.preventDefault(); void run(text); }}>
      <div className="ba-composer__in">
        {home && plugin ? <button type="button" className="ba-chip" onClick={() => setPlugin(false)} aria-label="Remove Build iOS Apps plugin">{bi.tool} Build iOS Apps <span aria-hidden="true">×</span></button> : null}
        <textarea aria-label={home ? 'Describe what to build' : 'Ask for follow-up changes'} rows={home ? 2 : 1} placeholder={home ? 'Ask me to build anything' : 'Ask for follow-up changes'} value={text} onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); void run(text); } }} />
      </div>
      <div className="ba-composer__bar">
        <div style={{ position: 'relative' }} ref={plusRef}>
          <button type="button" className="ba-round" aria-label="Add" aria-expanded={plusMenu} onClick={() => setPlusMenu((o) => !o)}>{ic.plus}</button>
          {plusMenu ? (
            <div className={`ag-pop ba-plusmenu${home ? '' : ' up'}`} role="menu">
              <button className="ag-item" role="menuitem" onClick={() => { setPlusMenu(false); toast.show('Attach files (demo)'); }}>{bi.file} Add files or photos</button>
              <button className="ag-item" role="menuitem" onClick={() => { setPlugin((p) => !p); setPlusMenu(false); }}>{bi.tool} {plugin ? 'Remove' : 'Use'} Build iOS Apps</button>
            </div>
          ) : null}
        </div>
        <Pick value={approval} options={APPROVALS} onChange={setApproval} icon={bi.shield} label="Approval mode" up={!home} />
        <span className="ag-grow" />
        <Pick value={model} options={MODELS} onChange={setModel} label="Model" up={!home} />
        <button type="button" className="ba-round ba-mic" data-on={listening} aria-label={listening ? 'Listening' : 'Dictate'} onClick={dictate}>{bi.mic}</button>
        {busy ? <button type="button" className="ba-send ba-send--stop" aria-label="Stop" onClick={stop}>{bi.stop}</button>
          : <button className="ba-send" aria-label="Send" disabled={!text.trim()}>{bi.up}</button>}
      </div>
    </form>
  );

  return (
    <Root theme={theme} name="Build agent demo" className="ba">
      <div className="ag-win ba-win">
        <header className="ba-title">
          <span className="ba-lights" aria-hidden="true"><i /><i /><i /></span>
          <button className="ba-tbtn" aria-label="Back" onClick={() => { if (!busy) { setStage('home'); } }}>{bi.back}</button>
          <button className="ba-tbtn" aria-label="Forward" disabled>{bi.fwd}</button>
          <span className="ba-title__name">{stage === 'home' ? 'New thread' : 'Show me the PostRow previews'}</span>
          <span className="ag-grow" />
          <button className="ba-tbtn" aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'} onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>{theme === 'dark' ? ic.sun : ic.moon}</button>
          <button className="ba-tbtn" aria-label="Toggle browser pane" aria-pressed={simOpen} disabled={stage === 'home'} onClick={() => setSimOpen((o) => !o)}>{bi.panel}</button>
        </header>

        {stage === 'home' ? (
          <div className="ba-home">
            <h1>What should we build in {project}?</h1>
            {composer(true)}
            <div className="ba-ctx">
              <Pick value={project} options={PROJECTS} onChange={setProject} icon={bi.folder} label="Project" />
              <Pick value={where} options={['Work locally', 'Work in the cloud']} onChange={setWhere} icon={bi.laptop} label="Where to work" />
              <Pick value={branch} options={['main', 'develop', 'feature/post-row']} onChange={setBranch} icon={bi.branch} label="Branch" />
            </div>
            <div className="ag-chips ba-ideas">{['Show me the PostRow SwiftUI previews', 'Open the share menu and test it', 'Rotate to landscape and check every row'].map((s) => <button key={s} type="button" className="ag-chip" onClick={() => setText(s)}>{s}</button>)}</div>
          </div>
        ) : (
          <div className="ba-body">
            <section className="ba-thread" aria-label="Thread">
              <div className="ag-scroll ba-thread__scroll">
                <div className="ba-thread__in">
                  {thread.map((it) => {
                    switch (it.kind) {
                      case 'user': return <div key={it.id} className="ba-user">{it.annotation ? <div className="ba-ann"><span className="ba-ann__thumb" aria-hidden="true" /><span className="ba-ann__pill">1 annotation · {it.annotation}</span></div> : null}<div className="ba-user__bubble">{plugin && it.id === 1 ? <span className="ba-chip ba-chip--sm">{bi.tool} Build iOS Apps</span> : null} {it.text}</div></div>;
                      case 'turn': return <div key={it.id} className="ba-turn"><span>{it.secs == null ? `Working for ${fmt(turnSecs(it))}` : `Worked for ${fmt(it.secs)}`}</span></div>;
                      case 'text': return <p key={it.id} className="ba-text">{rich(it.text)}</p>;
                      case 'step': return <div key={it.id} className="ba-step">{bi[it.icon]}<span>{it.label}</span>{it.sub ? <em>{it.sub}</em> : null}</div>;
                      case 'edit': return (
                        <div key={it.id} className="ba-edit" data-undone={it.undone}>
                          <span className="ba-edit__ic">{bi.file}</span>
                          <span className="ag-grow"><b>{it.undone ? 'Reverted' : 'Edited'} {it.file}</b><span className="ba-diffn"><i>+{it.plus}</i> <u>−{it.minus}</u></span></span>
                          {it.undone ? null : <button type="button" className="ba-link" onClick={() => undoEdit(it)}>Undo</button>}
                          <button type="button" className="ba-link ba-link--strong" onClick={() => setReview(it.mod)}>Review</button>
                        </div>
                      );
                      case 'approval': return (
                        <div key={it.id} className="ba-approval" data-state={it.state} role="group" aria-label="Permission request">
                          <b>Permission request</b><p>{it.text}</p>
                          {it.state === 'pending' ? <div className="ag-row"><button type="button" className="ag-btn ag-btn--sm" onClick={() => resolver.current?.(true)}>Allow</button><button type="button" className="ag-btn ag-btn--ghost ag-btn--sm" onClick={() => resolver.current?.(false)}>Deny</button></div> : <span className="ag-muted">{it.state === 'approved' ? 'Allowed' : 'Denied'}</span>}
                        </div>
                      );
                      case 'preview': return <div key={it.id} className="ba-webcard"><span className="ba-webcard__ic">{bi.globe}</span><span className="ag-grow"><b>Web preview</b><div className="ag-muted">Website</div></span><Pick value="Open in" options={['In-app browser', 'Default browser']} onChange={(v) => { if (v === 'In-app browser') setSimOpen(true); toast.show(`Opened in ${v.toLowerCase()}`); }} label="Open in" /></div>;
                    }
                  })}
                  <div ref={endRef} />
                </div>
              </div>
              <div className="ba-thread__foot">
                {changes.plus !== 188 || changes.minus !== 239 ? <div className="ba-filesbar"><span>Files changed <i>+{changes.plus}</i> <u>−{changes.minus}</u></span><button type="button" className="ba-link ba-link--strong" onClick={() => setCommitOpen(true)}>Commit</button></div> : null}
                {composer(false)}
              </div>
            </section>

            <aside className="ba-env" aria-label="Environment">
              <div className="ba-env__card">
                <div className="ba-env__h">Environment</div>
                <div className="ba-env__row"><span>Changes</span><span className="ba-diffn"><i>+{changes.plus}</i> <u>−{changes.minus}</u></span></div>
                <div className="ba-env__row"><span>{where === 'Work locally' ? 'Local' : 'Cloud'}</span></div>
                <div className="ba-env__row"><span>{branch}</span></div>
                <button type="button" className="ba-env__row ba-env__btn" onClick={() => setCommitOpen(true)}>Commit or push</button>
                <div className="ba-env__h">Tasks</div>
                <div className="ba-env__row ba-env__mono">{bi.terminal} preview-host --port 3200</div>
                <div className="ba-env__row">{bi.terminal} Background terminal</div>
                <div className="ba-env__h">Browser</div>
                <div className="ba-env__row">{simOpen ? <>{bi.globe} Simulator · iPhone 17 Pro</> : <span className="ag-muted">None open</span>}</div>
              </div>
            </aside>

            {simOpen ? (
              <section className="ba-browser" aria-label="Simulator browser">
                <div className="ba-tabs"><span className="ba-tab">{bi.select} Simulator · iPhone 17 Pro</span></div>
                <div className="ba-urlbar"><span className="ba-tbtn">{bi.back}</span><span className="ba-tbtn">{bi.fwd}</span><button className="ba-tbtn" aria-label="Reload" onClick={() => flash('Reloaded')}>{bi.reload}</button><span className="ba-url">localhost:3200</span>{annotate ? <span className="ba-annpill">Annotating</span> : null}</div>
                <div className="ba-pane" ref={paneRef}>
                  <div className="ba-devbar" role="toolbar" aria-label="Device">
                    <span className="ba-devname"><b>iPhone 17 Pro</b><span>iOS 26.5</span></span>
                    <button className="ba-devbtn" aria-label="Home" onClick={() => setSim((s) => ({ ...s, menu: 'none' }))}>{bi.home}</button>
                    <button className="ba-devbtn" aria-label="Annotate" aria-pressed={annotate} onClick={() => { setAnnotate((a) => !a); setPending(null); }}>{bi.select}</button>
                    <button className="ba-devbtn" aria-label="Rotate device" onClick={() => setSim((s) => ({ ...s, orient: s.orient === 'portrait' ? 'landscape' : 'portrait' }))}>{bi.rotate}</button>
                  </div>
                  <div className="ba-stage" style={{ width: (sim.orient === 'portrait' ? 318 : 640) * scale, height: (sim.orient === 'portrait' ? 650 : 330) * scale }}>
                    <div className="ba-scale" style={{ transform: `scale(${scale})` }}>
                      <Phone sim={sim} annotate={annotate} markers={pending ? [pending] : []}
                        onPick={(label, el) => { const r = el.getBoundingClientRect(); const p = paneRef.current!.getBoundingClientRect(); setPending({ label, x: Math.min(r.left - p.left + 10, p.width - 270), y: Math.min(r.top - p.top + 10, p.height - 70) }); setAnnText(''); }}
                        onMenu={(m) => setSim((s) => ({ ...s, menu: m }))}
                        onLike={(i) => setSim((s) => ({ ...s, liked: s.liked.includes(i) ? s.liked.filter((x) => x !== i) : [...s.liked, i] }))}
                        onMenuItem={onMenuItem} />
                    </div>
                  </div>
                  <span className="ba-live"><i /> Live</span>
                  {pending ? (
                    <form className="ba-annpop" style={{ left: pending.x, top: pending.y }} onSubmit={(e) => { e.preventDefault(); submitAnnotation(); }}>
                      <span className="ba-annpop__n">1</span>
                      <input autoFocus aria-label={`Feedback on ${pending.label}`} placeholder={`Feedback on ${pending.label.toLowerCase()}`} value={annText} onChange={(e) => setAnnText(e.target.value)} onKeyDown={(e) => { if (e.key === 'Escape') setPending(null); }} />
                      <button className="ba-send" aria-label="Send annotation" disabled={!annText.trim()}>{bi.up}</button>
                    </form>
                  ) : null}
                </div>
              </section>
            ) : null}
          </div>
        )}

        {commitOpen ? (
          <Modal title="Commit changes" onClose={() => setCommitOpen(false)}
            foot={<><button className="ag-btn ag-btn--ghost" onClick={() => setCommitOpen(false)}>Cancel</button><button className="ag-btn" disabled={!commitMsg.trim()} onClick={() => { setCommitOpen(false); setChanges({ plus: 0, minus: 0 }); toast.show(`Committed to ${branch}`); }}>Commit</button></>}>
            <div className="ag-field"><label htmlFor="ba-cm">Message</label><input id="ba-cm" className="ag-input" value={commitMsg} onChange={(e) => setCommitMsg(e.target.value)} /></div>
            <p className="ag-muted">{changes.plus} additions and {changes.minus} deletions will be committed to <b>{branch}</b>.</p>
          </Modal>
        ) : null}
        {review ? (
          <Modal title={`Review · ${DIFFS[review].file}`} onClose={() => setReview(null)} wide foot={<button className="ag-btn" onClick={() => setReview(null)}>Close</button>}>
            <div className="ba-diff ag-mono" role="img" aria-label="Code diff">{DIFFS[review].lines.map(([t, s], i) => <div key={i} data-t={t}><span>{t}</span>{s}</div>)}</div>
          </Modal>
        ) : null}
        {toast.node}
      </div>
    </Root>
  );
}
