import { useEffect, useId, useMemo, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import './LiquidChat.css';

type Theme = 'light' | 'dark';
type Filter = 'all' | 'unread' | 'groups';
type Sheet = 'none' | 'compose' | 'menu' | 'attach';

/* ---------- Own artwork: generated portraits and a coastal scene ---------- */
interface Face { bg: [string, string]; skin: string; hair: string; shirt: string; style: 'bob' | 'curly' | 'short' | 'long' }
const FACES: Record<string, Face> = {
  noor: { bg: ['#8aa17f', '#4f6b52'], skin: '#e2b08f', hair: '#2a211f', shirt: '#4d74b8', style: 'bob' },
  idris: { bg: ['#e3a08e', '#c06a58'], skin: '#8a5a43', hair: '#1b1412', shirt: '#e5705e', style: 'curly' },
  hana: { bg: ['#9fb8d3', '#5d7ea3'], skin: '#efcaa6', hair: '#17141a', shirt: '#efe9dc', style: 'short' },
  pia: { bg: ['#d9c58f', '#b0975a'], skin: '#f0c9ad', hair: '#a8552d', shirt: '#2f3f56', style: 'long' },
  omar: { bg: ['#9d93c9', '#675c9b'], skin: '#b98262', hair: '#221a18', shirt: '#d9d9de', style: 'short' },
};
function Portrait({ id, size }: { id: string; size: number }) {
  const f = FACES[id] ?? FACES.noor; const uid = useId().replace(/:/g, '');
  const hair = {
    bob: <path d="M28 52c-4-22 8-36 22-36s26 14 22 36c-3-10-8-16-22-16s-19 6-22 16Z" fill={f.hair} />,
    curly: <g fill={f.hair}><circle cx="30" cy="40" r="11" /><circle cx="42" cy="28" r="12" /><circle cx="58" cy="28" r="12" /><circle cx="70" cy="40" r="11" /><circle cx="50" cy="26" r="11" /></g>,
    short: <path d="M31 46c0-18 8-26 19-26s19 8 19 26c-3-9-9-12-19-12s-16 3-19 12Z" fill={f.hair} />,
    long: <path d="M27 60c-6-30 6-44 23-44s29 14 23 44l-6 6c1-14-3-28-17-28s-18 14-17 28Z" fill={f.hair} />,
  }[f.style];
  return (
    <svg className="lq-portrait" width={size} height={size} viewBox="0 0 100 100" aria-hidden="true">
      <defs><linearGradient id={`b${uid}`} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor={f.bg[0]} /><stop offset="1" stopColor={f.bg[1]} /></linearGradient>
        <radialGradient id={`s${uid}`} cx=".3" cy=".18" r=".6"><stop offset="0" stopColor="#fff" stopOpacity=".55" /><stop offset="1" stopColor="#fff" stopOpacity="0" /></radialGradient></defs>
      <rect width="100" height="100" fill={`url(#b${uid})`} />
      <path d="M12 100c2-20 16-28 38-28s36 8 38 28Z" fill={f.shirt} />
      <rect x="43" y="58" width="14" height="16" rx="6" fill={f.skin} />
      {f.style === 'long' || f.style === 'bob' ? hair : null}
      <ellipse cx="50" cy="46" rx="17" ry="20" fill={f.skin} />
      {f.style === 'curly' || f.style === 'short' ? hair : null}
      <circle cx="43.5" cy="47" r="1.7" fill="#2a1f1a" /><circle cx="56.5" cy="47" r="1.7" fill="#2a1f1a" />
      <path d="M44 55c3 3 9 3 12 0" stroke="#7a3f33" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      <rect width="100" height="100" fill={`url(#s${uid})`} />
    </svg>
  );
}
function Coast({ w = 320, h = 230 }: { w?: number; h?: number }) {
  const uid = useId().replace(/:/g, '');
  return (
    <svg width={w} height={h} viewBox="0 0 320 230" preserveAspectRatio="xMidYMid slice" aria-hidden="true" className="lq-coast">
      <defs>
        <linearGradient id={`k${uid}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#f7dcc0" /><stop offset=".55" stopColor="#f3e7d8" /><stop offset="1" stopColor="#c9d9dc" /></linearGradient>
        <linearGradient id={`m${uid}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#8fb3b6" /><stop offset="1" stopColor="#4d8587" /></linearGradient>
        <linearGradient id={`g${uid}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#8a9a4a" /><stop offset="1" stopColor="#566b34" /></linearGradient>
      </defs>
      <rect width="320" height="230" fill={`url(#k${uid})`} />
      <circle cx="260" cy="48" r="46" fill="#fff4de" opacity=".55" />
      <path d="M0 92c40-8 86-12 140-4l60 6 120 6v38H0Z" fill="#a9b6a5" opacity=".75" />
      <rect x="0" y="104" width="320" height="70" fill={`url(#m${uid})`} />
      <g stroke="#fff" strokeWidth="2.2" strokeLinecap="round" fill="none" opacity=".75"><path d="M150 138c30-6 56-4 84 2M178 150c34-6 66-4 100 4M120 126c20-4 44-3 66 1M200 164c28-5 56-3 92 4" /></g>
      <path d="M0 96c22 6 46 22 70 28 20 5 40 8 52 22 10 12-10 26-30 36-26 12-60 20-92 18Z" fill="#8a7d59" />
      <path d="M0 120c26 4 50 20 66 38 12 14 6 30-18 44-16 9-34 14-48 14Z" fill={`url(#g${uid})`} />
      <path d="M0 178c40-6 90 0 140 18 40 14 100 18 180 6v30H0Z" fill="#6a7d3b" />
      <path d="M0 196c50-4 110 4 160 20 50 12 110 10 160 0v14H0Z" fill="#53662f" />
    </svg>
  );
}

/* ---------- Data (all fictional) ---------- */
interface Msg { id: number; from: 'me' | 'them'; kind: 'text' | 'photo'; text: string; heart?: boolean }
interface Conv { id: string; name: string; sub: string; face: string; group?: boolean; unread: boolean; online?: boolean; muted?: boolean; time: string; msgs: Msg[] }
let mid = 100;
const m = (from: Msg['from'], text: string, kind: Msg['kind'] = 'text'): Msg => ({ id: mid++, from, kind, text });
const CONVS0: Conv[] = [
  { id: 'noor', name: 'Noor Alvarez', sub: 'In your circle', face: 'noor', unread: true, online: true, time: 'now', msgs: [m('them', 'Saturday, somewhere like this?'), m('me', 'No plans. Just us.'), m('them', 'A place to disappear', 'photo'), m('them', 'A little farther from everything.')] },
  { id: 'crew', name: 'The Saturday Crew', sub: '4 people', face: 'coast', group: true, unread: true, time: '4m', msgs: [m('them', 'Idris: Same table, same chaos?'), m('me', 'Always.')] },
  { id: 'idris', name: 'Idris Cole', sub: 'In your circle', face: 'idris', unread: true, online: true, time: '12m', msgs: [m('them', 'This has your name all over it.')] },
  { id: 'hana', name: 'Hana Mori', sub: 'In your circle', face: 'hana', unread: false, online: true, time: '28m', msgs: [m('them', 'Window seat?'), m('me', 'Saving you the window seat.')] },
];
const EXTRA: { id: string; name: string; face: string }[] = [{ id: 'pia', name: 'Pia Novak', face: 'pia' }, { id: 'omar', name: 'Omar Reyes', face: 'omar' }];
const REPLIES = ['Okay, that sounds right.', 'Ha, I was thinking the same thing.', 'Send me the details later?', 'Perfect. I will bring snacks.', 'Let us do it.', 'Tell me more.'];
const preview = (c: Conv) => { const l = c.msgs[c.msgs.length - 1]; if (!l) return 'Say hello'; const t = l.kind === 'photo' ? 'Photo' : l.text; return l.from === 'me' ? `You: ${t}` : t; };

/* ---------- Icons ---------- */
const Ic = ({ d, s = 20, w = 2.2 }: { d: ReactNode; s?: number; w?: number }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={w} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{d}</svg>;
const I = {
  back: <Ic d={<path d="M15 5l-7 7 7 7" />} />, plus: <Ic d={<path d="M12 5v14M5 12h14" />} />, dots: <Ic w={3.2} d={<path d="M6 12h.01M12 12h.01M18 12h.01" />} />,
  up: <Ic d={<path d="M12 19V5M6 11l6-6 6 6" />} />, search: <Ic d={<><circle cx="11" cy="11" r="6.5" /><path d="m20 20-4-4" /></>} />,
  chev: <Ic s={14} w={2.6} d={<path d="m6 9 6 6 6-6" />} />, close: <Ic d={<path d="M6 6l12 12M18 6 6 18" />} />, sun: <Ic s={16} d={<><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5 19 19M19 5l-1.5 1.5M6.5 17.5 5 19" /></>} />,
  moon: <Ic s={16} d={<path d="M20 14.5A8 8 0 0 1 9.5 4 8 8 0 1 0 20 14.5Z" />} />,
};
const Avatar = ({ face, size }: { face: string; size: number }) => (
  <span className="lq-avatar" style={{ width: size, height: size }}>{face === 'coast' ? <Coast w={size} h={size} /> : <Portrait id={face} size={size} />}</span>
);

export interface LiquidChatDemoProps { startAt?: 'inbox' | 'chat'; defaultTheme?: Theme }

export function LiquidChatDemo({ startAt = 'inbox', defaultTheme }: LiquidChatDemoProps) {
  const [theme, setTheme] = useState<Theme>(() => defaultTheme ?? (typeof document !== 'undefined' && document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light'));
  const [convs, setConvs] = useState(CONVS0);
  const [openId, setOpenId] = useState<string | null>(startAt === 'chat' ? 'noor' : null);
  const [filter, setFilter] = useState<Filter>('all');
  const [q, setQ] = useState('');
  const [p, setP] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [sheet, setSheet] = useState<Sheet>('none');
  const [text, setText] = useState('');
  const [typing, setTyping] = useState<string | null>(null);
  const [photo, setPhoto] = useState(false);
  const [zoom, setZoom] = useState(false);
  const [note, setNote] = useState<string | null>(null);
  const [scale, setScale] = useState(1);
  const rootRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const timers = useRef<number[]>([]);
  const drag = useRef<{ y: number; p0: number; moved: boolean } | null>(null);
  const suppress = useRef(false);
  const lensId = 'lq-lens-' + useId().replace(/:/g, '');
  const reduced = typeof window !== 'undefined' && !!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => () => timers.current.forEach((t) => window.clearTimeout(t)), []);
  useEffect(() => {
    const el = rootRef.current; if (!el) return;
    const fit = () => setScale(Math.max(0.3, Math.min(1.25, (el.clientHeight - 40) / 844, (el.clientWidth - 24) / 390)));
    fit(); const ro = new ResizeObserver(fit); ro.observe(el); return () => ro.disconnect();
  }, []);
  const cur = convs.find((c) => c.id === openId) ?? null;
  const lastCount = cur?.msgs.length ?? 0;
  useEffect(() => { const el = scrollRef.current; if (el) el.scrollTop = el.scrollHeight; }, [lastCount, typing, openId]);
  const flash = (t: string) => { setNote(t); timers.current.push(window.setTimeout(() => setNote(null), 1700)); };

  const list = useMemo(() => {
    const s = q.trim().toLowerCase();
    return convs.filter((c) => (filter === 'all' || (filter === 'unread' ? c.unread : !!c.group)) && (!s || (c.name + ' ' + preview(c)).toLowerCase().includes(s)));
  }, [convs, filter, q]);

  const open = (id: string) => { if (suppress.current) return; setConvs((cs) => cs.map((c) => (c.id === id ? { ...c, unread: false } : c))); setOpenId(id); setSheet('none'); setText(''); };
  const addMsg = (id: string, msg: Msg) => setConvs((cs) => cs.map((c) => (c.id === id ? { ...c, msgs: [...c.msgs, msg], time: 'now' } : c)));
  const send = (kind: Msg['kind'] = 'text', t = text) => {
    if (!cur) return; const body = t.trim(); if (kind === 'text' && !body) return;
    const id = cur.id; addMsg(id, m('me', kind === 'photo' ? 'Photo' : body, kind)); setText(''); setSheet('none');
    timers.current.push(window.setTimeout(() => setTyping(id), 500));
    timers.current.push(window.setTimeout(() => { setTyping(null); addMsg(id, m('them', REPLIES[Math.floor(Math.random() * REPLIES.length)])); }, 1900));
  };
  const heart = (id: number) => setConvs((cs) => cs.map((c) => (c.id === openId ? { ...c, msgs: c.msgs.map((x) => (x.id === id ? { ...x, heart: !x.heart } : x)) } : c)));
  const startChat = (id: string, name: string, face: string) => {
    if (!convs.some((c) => c.id === id)) setConvs((cs) => [{ id, name, sub: 'In your circle', face, unread: false, online: true, time: 'now', msgs: [] }, ...cs]);
    open(id);
  };

  /* Pull the circle ribbon with a vertical drag, or tap the label */
  const down = (e: React.PointerEvent) => { drag.current = { y: e.clientY, p0: p, moved: false }; };
  const move = (e: React.PointerEvent) => {
    const d = drag.current; if (!d) return; const dy = (e.clientY - d.y) / scale;
    if (!d.moved && Math.abs(dy) > 7) { d.moved = true; setDragging(true); (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId); }
    if (d.moved) setP(Math.max(0, Math.min(1, d.p0 + dy / 130)));
  };
  const up = () => { const d = drag.current; drag.current = null; if (d?.moved) { setDragging(false); setP((v) => (v > 0.5 ? 1 : 0)); suppress.current = true; window.setTimeout(() => { suppress.current = false; }, 60); } };
  const toggleCircle = () => { if (!suppress.current) setP((v) => (v > 0.5 ? 0 : 1)); };

  const circle = convs.filter((c) => !c.group).slice(0, 4);
  const vars = { '--p': p, '--lens': `url(#${lensId})` } as CSSProperties;

  return (
    <div className="lq" data-theme={theme} ref={rootRef} style={vars}>
      <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
        <filter id={lensId} x="-10%" y="-10%" width="120%" height="120%" colorInterpolationFilters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency="0.012 0.03" numOctaves="2" seed="7" result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="26" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>
      <button className="lq-theme lq-glass" aria-label={theme === 'dark' ? 'Switch to light' : 'Switch to dark'} onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>{theme === 'dark' ? I.sun : I.moon}</button>
      <div className="lq-stage" style={{ width: 390 * scale, height: 844 * scale }}>
        <div className="lq-phone" style={{ transform: `scale(${scale})` }}>
          <div className="lq-status" aria-hidden="true"><b>9:41</b><span><svg width="18" height="12" viewBox="0 0 18 12" fill="currentColor"><rect x="0" y="7" width="3" height="5" rx="1" /><rect x="5" y="5" width="3" height="7" rx="1" /><rect x="10" y="2.5" width="3" height="9.5" rx="1" /><rect x="15" y="0" width="3" height="12" rx="1" /></svg><svg width="26" height="13" viewBox="0 0 26 13" fill="none"><rect x=".5" y=".5" width="22" height="12" rx="4" stroke="currentColor" opacity=".4" /><rect x="2" y="2" width="19" height="9" rx="2.6" fill="currentColor" /></svg></span></div>

          {/* Inbox */}
          <section className="lq-screen lq-inbox" data-away={!!cur} aria-hidden={!!cur} inert={!!cur}>
            <div className="lq-top" onPointerDown={down} onPointerMove={move} onPointerUp={up} onPointerCancel={up} data-dragging={dragging} data-open={p > 0.5}>
              <div className="lq-head">
                <h1>Messages</h1>
                <button className="lq-circlebtn" aria-expanded={p > 0.5} onClick={toggleCircle}>
                  <span className="lq-circlebtn__label" style={{ opacity: p }}>Your circle</span>
                  <span className="lq-stack" style={{ opacity: 1 - p }} aria-hidden="true">{circle.slice(0, 3).map((c) => <Avatar key={c.id} face={c.face} size={28} />)}</span>
                  <span className="lq-chev" style={{ transform: `rotate(${p * 180}deg)` }}>{I.chev}</span>
                </button>
                <button className="lq-round lq-glass" aria-label="New message" onClick={() => setSheet('compose')}>{I.plus}</button>
              </div>
              <div className="lq-ribbon" aria-hidden={p < 0.5}>
                {circle.map((c, i) => (
                  <button key={c.id} className="lq-rib" tabIndex={p > 0.5 ? 0 : -1} onClick={() => open(c.id)} style={{ opacity: Math.max(0, p * 1.4 - 0.2 - i * 0.04), transform: `translateX(${(1 - p * p) * -i * 46}px) translateY(${(1 - p) * -26}px) scale(${0.7 + p * 0.3})` }}>
                    <Avatar face={c.face} size={68} /><span>{c.name.split(' ')[0]}</span>
                  </button>
                ))}
              </div>
            </div>
            <div className="lq-body" data-dragging={dragging}>
              <label className="lq-search lq-glass">{I.search}<input aria-label="Find a conversation" placeholder="Find a conversation" value={q} onChange={(e) => setQ(e.target.value)} /></label>
              <div className="lq-chips" role="group" aria-label="Filter">
                {(['all', 'unread', 'groups'] as const).map((f) => <button key={f} className="lq-chip lq-glass" aria-pressed={filter === f} onClick={() => setFilter(f)}>{f[0].toUpperCase() + f.slice(1)}</button>)}
              </div>
              <ul className="lq-list">
                {list.map((c) => (
                  <li key={c.id}>
                    <button className="lq-row" onClick={() => open(c.id)}>
                      <span className="lq-row__av"><Avatar face={c.face} size={68} />{c.online ? <i className="lq-online" aria-label="Online" /> : null}</span>
                      <span className="lq-row__main"><b>{c.name}</b><span className={c.unread ? '' : 'lq-dim'}>{preview(c)}</span></span>
                      <span className="lq-row__meta"><span>{c.time}</span>{c.unread ? <i className="lq-dot" aria-label="Unread" /> : c.muted ? <span className="lq-mute" aria-label="Muted">⊘</span> : <i />}</span>
                    </button>
                  </li>
                ))}
                {list.length === 0 ? <li className="lq-empty">No conversations match.</li> : null}
              </ul>
            </div>
          </section>

          {/* Chat */}
          <section className="lq-screen lq-chat" data-open={!!cur} aria-hidden={!cur} inert={!cur}>
            {cur ? (
              <>
                <header className="lq-chathead">
                  <button className="lq-round lq-glass" aria-label="Back" onClick={() => { setOpenId(null); setSheet('none'); }}>{I.back}</button>
                  <div className="lq-who"><Avatar face={cur.face} size={56} /><span><b>{cur.name}</b><em>{cur.muted ? 'Muted' : cur.sub}</em></span></div>
                  <button className="lq-round lq-glass" aria-label="More" aria-expanded={sheet === 'menu'} onClick={() => setSheet(sheet === 'menu' ? 'none' : 'menu')}>{I.dots}</button>
                </header>
                <div className="lq-msgs" ref={scrollRef}>
                  <div className="lq-today">Today</div>
                  {cur.msgs.map((x, i) => {
                    const next = cur.msgs[i + 1]; const last = !next || next.from !== x.from;
                    return (
                      <div key={x.id} className={`lq-msg lq-msg--${x.from}${last ? ' lq-last' : ''}`} onDoubleClick={() => heart(x.id)}>
                        {x.from === 'them' ? <span className="lq-msg__av">{last ? <Avatar face={cur.face} size={30} /> : null}</span> : null}
                        {x.kind === 'photo' ? (
                          <button className="lq-photo" onClick={() => { setPhoto(true); setZoom(false); }} aria-label="Open photo">
                            <Coast />
                            <span className="lq-photo__lens" style={{ backdropFilter: `${'var(--lens)'} blur(1.5px)` }} aria-hidden="true" />
                            {x.from === 'them' ? <span className="lq-photo__cap lq-glass">{x.text}</span> : null}
                            {x.heart ? <span className="lq-heart">♥</span> : null}
                          </button>
                        ) : (
                          <div className="lq-bubble">{x.text}{x.heart ? <span className="lq-heart">♥</span> : null}</div>
                        )}
                      </div>
                    );
                  })}
                  {typing === cur.id ? <div className="lq-msg lq-msg--them lq-last"><span className="lq-msg__av"><Avatar face={cur.face} size={30} /></span><div className="lq-bubble lq-typing" aria-label="Typing"><i /><i /><i /></div></div> : null}
                </div>
                <form className="lq-composer" onSubmit={(e) => { e.preventDefault(); send(); }}>
                  <div className="lq-field lq-glass">
                    <button type="button" className="lq-plus" aria-label="Attach" aria-expanded={sheet === 'attach'} onClick={() => setSheet(sheet === 'attach' ? 'none' : 'attach')}>{I.plus}</button>
                    <input aria-label="Message" placeholder="Say something good…" value={text} onChange={(e) => setText(e.target.value)} />
                  </div>
                  <button className="lq-sendbtn lq-glass" data-ready={!!text.trim()} aria-label="Send" disabled={!text.trim()}>{I.up}</button>
                </form>
              </>
            ) : null}
          </section>

          {sheet === 'menu' && cur ? (
            <div className="lq-scrim" onClick={() => setSheet('none')}>
              <div className="lq-menu lq-glass lq-glass--strong" role="menu" onClick={(e) => e.stopPropagation()}>
                <button role="menuitem" onClick={() => { setConvs((cs) => cs.map((c) => (c.id === cur.id ? { ...c, muted: !c.muted } : c))); setSheet('none'); flash(cur.muted ? 'Notifications on' : 'Muted'); }}>{cur.muted ? 'Unmute' : 'Mute notifications'}</button>
                <button role="menuitem" onClick={() => send('photo')}>Share a photo</button>
                <button role="menuitem" onClick={() => { setConvs((cs) => cs.map((c) => (c.id === cur.id ? { ...c, msgs: [] } : c))); setSheet('none'); flash('Chat cleared'); }}>Clear chat</button>
              </div>
            </div>
          ) : null}
          {sheet === 'attach' ? (
            <div className="lq-scrim lq-scrim--clear" onClick={() => setSheet('none')}>
              <div className="lq-attach lq-glass lq-glass--strong" role="menu" onClick={(e) => e.stopPropagation()}>
                <button role="menuitem" onClick={() => send('photo')}>Share a photo</button>
                <button role="menuitem" onClick={() => { setSheet('none'); flash('Voice notes are not part of this preview'); }}>Voice note</button>
                <button role="menuitem" onClick={() => { setSheet('none'); flash('Video calls are not part of this preview'); }}>Video call</button>
              </div>
            </div>
          ) : null}
          {sheet === 'compose' ? (
            <div className="lq-scrim" onClick={() => setSheet('none')}>
              <div className="lq-sheet lq-glass lq-glass--strong" role="dialog" aria-label="New message" onClick={(e) => e.stopPropagation()}>
                <div className="lq-sheet__h"><b>New message</b><button className="lq-round lq-glass" aria-label="Close" onClick={() => setSheet('none')}>{I.close}</button></div>
                {[...convs.filter((c) => !c.group).map((c) => ({ id: c.id, name: c.name, face: c.face })), ...EXTRA.filter((e) => !convs.some((c) => c.id === e.id))].map((c) => (
                  <button key={c.id} className="lq-pick" onClick={() => startChat(c.id, c.name, c.face)}><Avatar face={c.face} size={44} /><span>{c.name}</span></button>
                ))}
              </div>
            </div>
          ) : null}
          {photo ? (
            <div className="lq-viewer" role="dialog" aria-label="Photo">
              <button className="lq-round lq-glass lq-viewer__x" aria-label="Close photo" onClick={() => setPhoto(false)}>{I.close}</button>
              <button className="lq-viewer__img" aria-label={zoom ? 'Zoom out' : 'Zoom in'} onClick={() => setZoom((z) => !z)} style={{ transform: `scale(${zoom ? 2.1 : 1})`, transition: reduced ? 'none' : undefined }}><Coast w={390} h={420} /></button>
            </div>
          ) : null}
          {note ? <div className="lq-note lq-glass lq-glass--strong" role="status">{note}</div> : null}
        </div>
      </div>
    </div>
  );
}
