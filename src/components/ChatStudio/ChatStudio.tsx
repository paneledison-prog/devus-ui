import { useEffect, useMemo, useRef, useState, type FormEvent, type ReactNode } from 'react';
import './ChatStudio.css';
import { Face, Logo, Pic, type PersonId, type PicId } from './ChatStudioArt';

/*
 * AI chat studio: a three-pane messenger (rail, chat list, conversation, AI assistant) in a fixed 1200x750 stage that
 * scales to its container. Threads, people, replies, reactions, the picture stack, voice mode and the composer all work.
 * Every picture is own SVG (see ChatStudioArt.tsx); all names and messages are made up.
 */

interface Reaction { e: string; n: number; on: boolean }
interface Msg { id: string; from: 'me' | 'ai' | PersonId; kind: 'text' | 'stack' | 'wave' | 'cmd' | 'image'; text?: string; bold?: boolean; pic?: PicId; react?: Reaction[] }
interface Thread { id: string; title: string; header?: string; kind: 'group' | 'dm' | 'app'; members: PersonId[]; unread: number; ok?: boolean; msgs: Msg[] }
type View = 'chat' | 'calendar' | 'code';

const W = 1200;
const H = 750;
const ROLE: Record<string, string> = { margo: 'Designer', dimitri: 'Developer', kate: 'Designer', wen: 'Developer', alex: 'Designer' };
const NAME: Record<string, string> = { margo: 'Margo', dimitri: 'Dimitri', kate: 'Kate', wen: 'Wen', alex: 'Alex' };
const PEOPLE: PersonId[] = ['margo', 'dimitri', 'kate', 'wen'];

let n = 1;
const mid = () => `m${n++}`;

const seed = (): Thread[] => [
  {
    id: 'anim', title: 'How we made these animations', header: 'Many of you asked…', kind: 'group', members: ['margo', 'alex', 'kate'], unread: 2,
    msgs: [
      { id: mid(), from: 'ai', kind: 'text', text: 'Adjust lighting and angles, but keep defining features unchanged.' },
      { id: mid(), from: 'ai', kind: 'stack', react: [{ e: '\u{1F3C3}', n: 13, on: false }, { e: '\u{1F600}', n: 8, on: false }, { e: '\u{1F506}', n: 8, on: false }] },
      { id: mid(), from: 'me', kind: 'cmd', text: 'Silver create video' },
      { id: mid(), from: 'ai', kind: 'wave' },
      { id: mid(), from: 'alex', kind: 'text', text: 'WOOOW \u{1F44D} \u{1F44B}' },
      { id: mid(), from: 'alex', kind: 'text', text: 'Do you see this?' },
    ],
  },
  { id: 'prompts', title: 'Better at hard prompts', kind: 'group', members: ['wen', 'dimitri', 'kate'], unread: 4, msgs: [
    { id: mid(), from: 'wen', kind: 'text', text: 'Split the task into steps before you ask.' },
    { id: mid(), from: 'dimitri', kind: 'text', text: 'And give the model one example of a good answer.' },
    { id: mid(), from: 'kate', kind: 'text', text: 'Works every time. I will post my template.' },
  ] },
  { id: 'app', title: 'ShuttleX new App', kind: 'app', members: ['alex'], unread: 0, msgs: [
    { id: mid(), from: 'alex', kind: 'text', text: 'Build 41 is live for the whole team.' },
    { id: mid(), from: 'ai', kind: 'text', text: 'Release notes drafted. Want me to attach them?' },
  ] },
  { id: 'sync', title: 'Weekly sync', kind: 'group', members: ['margo', 'wen'], unread: 0, ok: true, msgs: [
    { id: mid(), from: 'margo', kind: 'text', text: 'OK! See you all on Thursday.' },
  ] },
];

const REPLIES = ['Got it. Working on that now.', 'Nice. Want me to try a second version?', 'I kept the defining features and changed the light.', 'Done. Take a look and tell me what to adjust.', 'Added it to the board.'];
const SNIPPETS = [
  { t: 'Product shot', p: 'Create a studio product shot with soft light and a gray backdrop' },
  { t: 'Short video', p: 'create video of the planet rotating slowly' },
  { t: 'Rewrite', p: 'Rewrite this update so it is shorter and friendlier' },
  { t: 'Summary', p: 'Summarize this thread in three bullets' },
];
const EVENTS = [
  { when: 'Today, 14:00', what: 'Animation review', thread: 'anim' },
  { when: 'Tomorrow, 10:30', what: 'Prompt clinic', thread: 'prompts' },
  { when: 'Thursday, 16:00', what: 'Weekly sync', thread: 'sync' },
  { when: 'Friday, 11:00', what: 'App build check', thread: 'app' },
];
const SESSIONS = ['Silver', 'Atlas', 'Nova'];
const STACK0: PicId[] = ['ink', 'forest', 'sand', 'planet', 'moon'];

const Ico = ({ children, s = 18 }: { children: ReactNode; s?: number }) => <svg width={s} height={s} viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.700" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{children}</svg>;
const Spark = ({ s = 14 }: { s?: number }) => <svg width={s} height={s} viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M8 0c.6 4.500 3.500 7.400 8 8-4.500.6-7.400 3.500-8 8-.6-4.500-3.500-7.400-8-8 4.500-.6 7.400-3.500 8-8Z" /></svg>;

function Avatar({ id, size }: { id: PersonId; size: number }) { return <span className="cs-av" style={{ width: size, height: size }}><Face id={id} size={size} /></span>; }

/** The stack of five pictures; tapping a card brings it to the middle. */
function Stack({ order, onPick }: { order: PicId[]; onPick: (i: number) => void }) {
  const slots = ['cs-stack__c', 'cs-stack__tl', 'cs-stack__tr', 'cs-stack__bl', 'cs-stack__br'];
  return (
    <div className="cs-stack" role="group" aria-label="Pictures, tap one to bring it to the front">
      {order.map((p, i) => <button key={p} type="button" className={slots[i]} aria-label={`Show picture ${p}`} onClick={() => i !== 0 && onPick(i)}><Pic id={p} /></button>).reverse()}
    </div>
  );
}

export function ChatStudioDemo({ startView = 'chat' }: { startView?: View }) {
  const [threads, setThreads] = useState<Thread[]>(seed);
  const [activeId, setActiveId] = useState('anim');
  const [view, setView] = useState<View>(startView);
  const [compact, setCompact] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [text, setText] = useState('');
  const [aiMode, setAiMode] = useState(false);
  const [bold, setBold] = useState(false);
  const [menu, setMenu] = useState(false);
  const [typing, setTyping] = useState(false);
  const [call, setCall] = useState(false);
  const [panel, setPanel] = useState(true);
  const [listening, setListening] = useState(true);
  const [session, setSession] = useState('Silver');
  const [sessionsOpen, setSessionsOpen] = useState(false);
  const [order, setOrder] = useState<PicId[]>(STACK0);
  const [scale, setScale] = useState(1);
  const [off, setOff] = useState({ x: 0, y: 0 });
  const wrap = useRef<HTMLDivElement>(null);
  const list = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const timers = useRef<number[]>([]);

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const measure = () => {
      const k = Math.min(el.clientWidth / W, el.clientHeight / H);
      setScale(k);
      setOff({ x: (el.clientWidth - W * k) / 2, y: (el.clientHeight - H * k) / 2 });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  useEffect(() => () => timers.current.forEach((t) => window.clearTimeout(t)), []);

  const active = threads.find((t) => t.id === activeId) ?? threads[0];
  useEffect(() => { list.current?.scrollTo({ top: list.current.scrollHeight, behavior: 'smooth' }); }, [active.msgs.length, activeId, typing]);

  const patch = (id: string, fn: (t: Thread) => Thread) => setThreads((l) => l.map((t) => (t.id === id ? fn(t) : t)));
  const open = (id: string) => { setActiveId(id); setView('chat'); patch(id, (t) => ({ ...t, unread: 0 })); setMenu(false); };

  const openPerson = (p: PersonId) => {
    const id = `dm-${p}`;
    if (!threads.some((t) => t.id === id)) {
      const t: Thread = { id, title: NAME[p], kind: 'dm', members: [p], unread: 0, msgs: [{ id: mid(), from: p, kind: 'text', text: `Hi, it is ${NAME[p]}. What do you need?` }] };
      setThreads((l) => [t, ...l]);
    }
    open(id);
  };

  const newChat = () => {
    const id = `new-${n}`;
    setThreads((l) => [{ id, title: 'New chat', kind: 'group', members: ['alex'], unread: 0, msgs: [] }, ...l]);
    open(id);
    window.setTimeout(() => input.current?.focus(), 50);
  };

  const reply = (id: string, prompt: string) => {
    setTyping(true);
    const t = window.setTimeout(() => {
      const low = prompt.toLowerCase();
      const m: Msg = /video|animate|wave/.test(low) ? { id: mid(), from: 'ai', kind: 'wave' } : /image|photo|picture|shot|stack/.test(low) ? { id: mid(), from: 'ai', kind: 'image', pic: 'planet' } : { id: mid(), from: 'ai', kind: 'text', text: REPLIES[Math.floor(low.length % REPLIES.length)] };
      patch(id, (th) => ({ ...th, msgs: [...th.msgs, m] }));
      setTyping(false);
    }, 1100);
    timers.current.push(t);
  };

  const send = (e?: FormEvent) => {
    e?.preventDefault();
    const v = text.trim();
    if (!v) return;
    const m: Msg = aiMode ? { id: mid(), from: 'me', kind: 'cmd', text: `Silver ${v}` } : { id: mid(), from: 'me', kind: 'text', text: v, bold };
    patch(active.id, (t) => ({ ...t, msgs: [...t.msgs, m] }));
    setText('');
    if (aiMode || /@silver|silver/i.test(v) || active.kind !== 'group') reply(active.id, v);
  };

  const attach = (kind: 'photo' | 'file') => {
    const m: Msg = kind === 'photo' ? { id: mid(), from: 'me', kind: 'image', pic: (['forest', 'sand', 'moon', 'planet'] as PicId[])[n % 4] } : { id: mid(), from: 'me', kind: 'text', text: '\u{1F4CE} brief.pdf' };
    patch(active.id, (t) => ({ ...t, msgs: [...t.msgs, m] }));
    setMenu(false);
  };

  const toggleReact = (mId: string, i: number) => patch(active.id, (t) => ({ ...t, msgs: t.msgs.map((m) => (m.id !== mId || !m.react ? m : { ...m, react: m.react.map((r, j) => (j !== i ? r : { ...r, on: !r.on, n: r.n + (r.on ? -1 : 1) })) })) }));

  const q = query.trim().toLowerCase();
  const visible = useMemo(() => threads.filter((t) => !q || `${t.title} ${t.members.map((m) => NAME[m]).join(' ')}`.toLowerCase().includes(q)), [threads, q]);
  const header = active.header ?? active.title;
  const lastMedia = [...active.msgs].reverse().find((m) => m.kind === 'stack' || m.kind === 'wave' || m.kind === 'image');
  const speaker = (m: Msg) => (m.from === 'ai' ? 'ai' : m.from === 'me' ? 'me' : m.from);

  const bubbles = active.msgs.map((m, idx) => {
    const mine = m.from === 'me';
    const prev = active.msgs[idx - 1];
    const next = active.msgs[idx + 1];
    const first = !prev || speaker(prev) !== speaker(m);
    const last = !next || speaker(next) !== speaker(m);
    const avatar = !mine && last ? m.from === 'ai' ? <span className="cs-ai" aria-hidden="true"><Logo size={26} /></span> : <Avatar id={m.from as PersonId} size={26} /> : <span className="cs-av-gap" />;
    let body: ReactNode;
    if (m.kind === 'stack') {
      body = (
        <div className="cs-media">
          <Stack order={order} onPick={(i) => setOrder((o) => { const c = [...o]; [c[0], c[i]] = [c[i], c[0]]; return c; })} />
          <div className="cs-reacts">
            {m.react?.map((r, i) => <button key={i} type="button" aria-pressed={r.on} className={r.on ? 'is-on' : ''} onClick={() => toggleReact(m.id, i)}><span>{r.e}</span>{r.n}</button>)}
            <span className="cs-reacts__who"><Avatar id="margo" size={20} /><Avatar id="kate" size={20} /><Avatar id="alex" size={20} /></span>
            <button type="button" className="cs-reacts__count" aria-label="13 comments"><Ico s={11}><rect x="3" y="4" width="16" height="12" rx="3" /></Ico>13</button>
          </div>
        </div>
      );
    } else if (m.kind === 'wave') body = <div className="cs-wavecard"><Pic id="wave" /></div>;
    else if (m.kind === 'image') body = <div className="cs-imgcard"><Pic id={m.pic ?? 'planet'} /></div>;
    else if (m.kind === 'cmd') body = <p className="cs-bubble cs-bubble--cmd"><Spark s={12} />{m.text}</p>;
    else body = <p className={`cs-bubble${mine ? ' cs-bubble--me' : ''}${m.bold ? ' is-bold' : ''}${m.from === 'ai' ? ' cs-bubble--ai' : ''}`}>{m.from === 'ai' && first && <Spark s={14} />}{m.text}</p>;
    return (
      <div key={m.id} className={`cs-row${mine ? ' cs-row--me' : ''}${m.kind === 'stack' ? ' cs-row--stack' : ''}`}>
        {!mine && avatar}
        {body}
      </div>
    );
  });

  const bars = [34, 112, 132, 112, 44];

  return (
    <div className="cs" ref={wrap} data-compact={compact || undefined}>
      <div className="cs-stage" style={{ width: W, height: H, transform: `translate(${off.x}px, ${off.y}px) scale(${scale})` }}>
        {/* rail */}
        <nav className="cs-rail" aria-label="Workspace">
          <span className="cs-rail__logo"><Logo size={34} /></span>
          <i className="cs-rail__dots" aria-hidden="true">···</i>
          <button type="button" className="cs-rail__ring" aria-label="Workspace" onClick={() => setView('chat')}><Logo size={34} /></button>
          <div className="cs-rail__nav">
            <button type="button" aria-label="Compact list" aria-pressed={compact} className={compact ? 'is-on' : ''} onClick={() => setCompact((v) => !v)}><Ico><rect x="3" y="4" width="6" height="14" rx="2" /><rect x="13" y="4" width="6" height="14" rx="2" /></Ico></button>
            <button type="button" aria-label="Chats" aria-current={view === 'chat' ? 'page' : undefined} className={view === 'chat' ? 'is-on' : ''} onClick={() => setView('chat')}><Ico><path d="M4 5h14a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H9l-4 3v-3H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z" /></Ico></button>
            <button type="button" aria-label="Calendar" aria-current={view === 'calendar' ? 'page' : undefined} className={view === 'calendar' ? 'is-on' : ''} onClick={() => setView('calendar')}><Ico><rect x="3" y="5" width="16" height="14" rx="3" /><path d="M3 9h16M7 3v4M15 3v4" /></Ico></button>
            <button type="button" aria-label="Prompts" aria-current={view === 'code' ? 'page' : undefined} className={view === 'code' ? 'is-on' : ''} onClick={() => setView('code')}><Ico><path d="m8 7-4 4 4 4M14 7l4 4-4 4M12 5l-2 12" /></Ico></button>
          </div>
          <span className="cs-rail__me"><Avatar id="me" size={30} /></span>
        </nav>

        {/* chat list */}
        <section className="cs-list" aria-label="All chats">
          <header className="cs-list__head">
            {searchOpen ? (
              <label className="cs-search"><Ico s={15}><circle cx="9" cy="9" r="6" /><path d="m14 14 5 5" /></Ico><input autoFocus value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search chats" aria-label="Search chats" onKeyDown={(e) => { if (e.key === 'Escape') { setSearchOpen(false); setQuery(''); } }} /><button type="button" aria-label="Close search" onClick={() => { setSearchOpen(false); setQuery(''); }}><Ico s={12}><path d="m5 5 12 12M17 5 5 17" /></Ico></button></label>
            ) : (
              <><h2><span>All</span> Chats</h2><button type="button" className="cs-list__search" aria-label="Search" onClick={() => setSearchOpen(true)}><Ico><circle cx="9" cy="9" r="6" /><path d="m14 14 5 5" /></Ico></button></>
            )}
          </header>
          {!compact && (
            <div className="cs-people">
              {PEOPLE.map((p) => {
                const dm = threads.find((t) => t.id === `dm-${p}`);
                const badge = p === 'margo' ? 2 : p === 'dimitri' ? 1 : 0;
                const seen = dm !== undefined;
                return (
                  <button key={p} type="button" className="cs-person" onClick={() => openPerson(p)} aria-label={`Message ${NAME[p]}`}>
                    <span className="cs-person__av"><Avatar id={p} size={52} />{badge > 0 && !seen && <b>{badge}</b>}{p === 'kate' && <em>OK!</em>}</span>
                    <strong>{NAME[p]}</strong><small>{ROLE[p]}</small>
                  </button>
                );
              })}
            </div>
          )}
          <div className="cs-cards">
            {visible.length === 0 && <p className="cs-none">No chats match &ldquo;{query}&rdquo;</p>}
            {visible.map((t) => (
              <button key={t.id} type="button" className={`cs-card${t.id === activeId ? ' is-on' : ''}`} aria-current={t.id === activeId ? 'true' : undefined} onClick={() => open(t.id)}>
                <span className="cs-card__top">
                  {t.kind === 'app' ? <span className="cs-card__app"><Spark s={18} /></span> : <span className="cs-faces">{t.members.slice(0, 3).map((m) => <Avatar key={m} id={m} size={28} />)}</span>}
                  {t.ok && <em className="cs-ok">OK!</em>}
                  {t.unread > 0 && <b className="cs-badge">{t.unread}</b>}
                </span>
                <small>Working</small>
                <strong>{t.title}</strong>
                {t.id === activeId && (
                  <span className="cs-card__preview">
                    <span className="cs-card__who"><Avatar id={t.members[0] ?? 'alex'} size={16} /><b>{NAME[t.members[0] ?? 'alex']}</b> · {ROLE[t.members[0] ?? 'alex'] ?? 'Designer'}<i>{t.msgs.length}</i></span>
                    {lastMedia ? <span className="cs-card__thumbs"><span className="cs-card__t cs-card__t--a"><Pic id="moon" /></span><span className="cs-card__t cs-card__t--b"><Pic id="planet" /></span><span className="cs-card__t cs-card__t--c"><Pic id="forest" /></span></span> : <span className="cs-card__line">{t.msgs[t.msgs.length - 1]?.text ?? 'No messages yet'}</span>}
                  </span>
                )}
              </button>
            ))}
          </div>
          <button type="button" className="cs-fab" aria-label="New chat" onClick={newChat}><Ico s={22}><path d="M11 4v14M4 11h14" /></Ico></button>
        </section>

        {/* main */}
        <section className="cs-main" aria-label="Conversation">
          {view === 'chat' && (
            <>
              <header className="cs-main__head">
                <div><h1>{header}</h1><p><Avatar id={active.members[0] ?? 'alex'} size={16} /><span>{typing ? 'Silver is writing' : 'Writing'}</span><i className={typing ? 'is-on' : ''}><u /><u /><u /></i></p></div>
                <button type="button" className={`cs-cam${call ? ' is-on' : ''}`} aria-label={call ? 'End video call' : 'Start video call'} aria-pressed={call} onClick={() => setCall((v) => !v)}><Ico s={22}><rect x="2" y="5" width="12" height="12" rx="3" /><path d="m16 9 5-3v10l-5-3V9Z" /></Ico></button>
              </header>
              {call && <div className="cs-call" role="status"><i /> Video call with {active.members.map((m) => NAME[m]).join(', ') || 'the team'}<button type="button" onClick={() => setCall(false)}>End</button></div>}
              <div className="cs-msgs" ref={list}>
                {bubbles}
                {typing && <div className="cs-row"><span className="cs-ai" aria-hidden="true"><Logo size={26} /></span><p className="cs-bubble cs-bubble--typing" aria-label="Silver is typing"><u /><u /><u /></p></div>}
              </div>
              <form className="cs-composer" onSubmit={send}>
                <button type="button" className={`cs-composer__attach${menu ? ' is-on' : ''}`} aria-label="Attach" aria-expanded={menu} onClick={() => setMenu((v) => !v)}><Ico s={20}><path d="m15 8-6 6a2.500 2.500 0 0 0 3.500 3.500l6-6a4 4 0 0 0-5.600-5.600l-6.500 6.500a5.500 5.500 0 0 0 7.800 7.800" /></Ico></button>
                {menu && <div className="cs-menu" role="menu"><button type="button" role="menuitem" onClick={() => attach('photo')}>Photo</button><button type="button" role="menuitem" onClick={() => attach('file')}>File</button></div>}
                <div className="cs-composer__box">
                  <Ico s={16}><path d="M4 6h14M11 6v12M7 18h8" /></Ico>
                  <input ref={input} value={text} onChange={(e) => setText(e.target.value)} placeholder="Text Massege" aria-label="Message" style={{ fontWeight: bold ? 700 : 400 }} />
                  <button type="button" className={`cs-tool cs-tool--ai${aiMode ? ' is-on' : ''}`} aria-label="Ask Silver" aria-pressed={aiMode} onClick={() => setAiMode((v) => !v)}><Spark s={15} /></button>
                  <button type="button" className={`cs-tool${bold ? ' is-on' : ''}`} aria-label="Bold text" aria-pressed={bold} onClick={() => setBold((v) => !v)}><b>T</b></button>
                </div>
                <button type={text.trim() ? 'submit' : 'button'} className={`cs-composer__mic${listening ? ' is-on' : ''}`} aria-label={text.trim() ? 'Send' : listening ? 'Stop listening' : 'Start voice'} onClick={() => { if (!text.trim()) { setListening((v) => !v); setPanel(true); } }}>
                  {text.trim() ? <Ico s={18}><path d="M4 11h14M12 5l6 6-6 6" /></Ico> : <Ico s={18}><rect x="8" y="3" width="6" height="11" rx="3" /><path d="M5 11a6 6 0 0 0 12 0M11 17v3" /></Ico>}
                </button>
              </form>
            </>
          )}
          {view === 'calendar' && (
            <div className="cs-pane">
              <h1>Schedule</h1>
              <ul>{EVENTS.map((ev) => <li key={ev.thread}><button type="button" onClick={() => open(ev.thread)}><b>{ev.what}</b><span>{ev.when}</span><small>Open chat</small></button></li>)}</ul>
            </div>
          )}
          {view === 'code' && (
            <div className="cs-pane">
              <h1>Prompts</h1>
              <ul>{SNIPPETS.map((s) => <li key={s.t}><button type="button" onClick={() => { setText(s.p); setView('chat'); window.setTimeout(() => input.current?.focus(), 60); }}><b>{s.t}</b><span>{s.p}</span><small>Use in chat</small></button></li>)}</ul>
            </div>
          )}
        </section>

        {/* assistant */}
        {panel && (
          <aside className="cs-assist" aria-label="AI Assistant">
            <header>
              <div><h2>AI Assistant</h2><p>{session}</p></div>
              <span className="cs-assist__ico">
                <button type="button" aria-label="Hide assistant" onClick={() => setPanel(false)}><Ico s={14}><rect x="4" y="4" width="14" height="14" rx="3" /></Ico></button>
                <button type="button" aria-label="Sessions" aria-expanded={sessionsOpen} onClick={() => setSessionsOpen((v) => !v)}><Ico s={14}><circle cx="11" cy="11" r="8" /><path d="M11 6v5l3 2" /></Ico></button>
              </span>
              {sessionsOpen && <div className="cs-sessions" role="menu">{SESSIONS.map((s) => <button key={s} type="button" role="menuitemradio" aria-checked={s === session} className={s === session ? 'is-on' : ''} onClick={() => { setSession(s); setSessionsOpen(false); }}>{s}</button>)}</div>}
            </header>
            <div className={`cs-wave${listening ? ' is-on' : ''}`} aria-hidden="true">{bars.map((h, i) => <i key={i} style={{ height: listening ? h : 24 + (i % 2) * 10, animationDelay: `${i * 0.12}s` }} />)}</div>
            {listening
              ? <button type="button" className="cs-stop" aria-label="Stop listening" onClick={() => setListening(false)}><i /></button>
              : <button type="button" className="cs-start" aria-label="Start listening" onClick={() => setListening(true)}><Ico s={22}><rect x="8" y="3" width="6" height="11" rx="3" /><path d="M5 11a6 6 0 0 0 12 0M11 17v3" /></Ico></button>}
          </aside>
        )}
        {!panel && <button type="button" className="cs-assist-open" aria-label="Show assistant" onClick={() => setPanel(true)}><Spark s={16} /></button>}
      </div>
    </div>
  );
}
