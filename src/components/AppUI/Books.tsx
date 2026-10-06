import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { useLongPress, usePanScroll, usePull, useSwipe } from './gestures';
import { PhoneFrame } from './PhoneFrame';
import './Books.css';

/*
 * Book app flows: Explore <-> Library (tab bar, search, chips, filters) and the three-step onboarding.
 * Canvas 390x843 scaled to the 320px phone (320 / 390). Covers are original CSS/SVG artwork that use the
 * real titles and authors as text only.
 */

/* ---------- covers ---------- */
export type BookId = 'money' | 'shoedog' | 'subtle' | 'richdad' | 'thinking' | 'design' | 'hailmary' | 'refactoring' | 'dontmake' | 'monk' | 'ikigai' | 'inner' | 'atomic';

interface Book { id: BookId; title: string; author: string; short: string }
export const BOOKS: Record<BookId, Book> = {
  money: { id: 'money', title: 'The Psychology of Money', author: 'Morgan Housel', short: 'The Psychology…' },
  shoedog: { id: 'shoedog', title: 'Shoe Dog: A Memoir by the Creator of Nike', author: 'Phil Knight', short: 'Shoe Dog: A Me…' },
  subtle: { id: 'subtle', title: 'The Subtle Art of Not Giving a F*ck', author: 'Mark Manson', short: 'The Subtle Art o…' },
  richdad: { id: 'richdad', title: 'Rich Dad Poor Dad', author: 'Robert T. Kiyosaki', short: 'Rich Dad Poor Dad' },
  thinking: { id: 'thinking', title: 'Thinking, Fast and Slow', author: 'Daniel Kahneman', short: 'Thinking, Fast and Slow' },
  design: { id: 'design', title: 'The Design of Everyday Things', author: 'Don Norman', short: 'The Design of Everyday Things' },
  hailmary: { id: 'hailmary', title: 'Project Hail Mary', author: 'Andy Weir', short: 'Project Hail Mary' },
  refactoring: { id: 'refactoring', title: 'Refactoring UI', author: 'Adam Wathan', short: 'Refactoring UI' },
  dontmake: { id: 'dontmake', title: "Don't Make Me Think", author: 'Steve Krug', short: "Don't Make Me Think" },
  monk: { id: 'monk', title: 'The Monk Who Sold His Ferrari', author: 'Robin Sharma', short: 'The Monk Who Sold…' },
  ikigai: { id: 'ikigai', title: 'Ikigai', author: 'Hector Garcia', short: 'Ikigai' },
  inner: { id: 'inner', title: 'Inner Excellence', author: 'Jim Murphy', short: 'Inner Excellence' },
  atomic: { id: 'atomic', title: 'Atomic Habits', author: 'James Clear', short: 'Atomic Habits' },
};

const Teapot = () => <svg viewBox="0 0 60 60" aria-hidden="true"><path d="M14 28c0-10 8-16 18-16s18 6 18 16v14c0 4-3 6-6 6H20c-3 0-6-2-6-6V28Z" fill="#d83a2a" /><path d="M50 26c8 0 8 12 0 12M14 30c-6-4-8-8-4-12" fill="none" stroke="#d83a2a" strokeWidth="4" strokeLinecap="round" /><rect x="26" y="8" width="12" height="6" rx="3" fill="#a82a20" /></svg>;
const Rings = () => <svg viewBox="0 0 60 60" aria-hidden="true"><g fill="none" stroke="#2c2c2c" strokeWidth="1.600"><circle cx="30" cy="30" r="26" /><circle cx="30" cy="30" r="20" /><circle cx="30" cy="30" r="14" /><circle cx="30" cy="30" r="8" /></g></svg>;
const Scribble = () => <svg viewBox="0 0 60 40" aria-hidden="true"><path d="M2 36c14-2 18-30 30-30 8 0 6 14-2 14s-8-12 6-14c8-1 14 6 22 4" fill="none" stroke="#222" strokeWidth="1.400" strokeLinecap="round" /></svg>;
const Branch = () => <svg viewBox="0 0 60 60" aria-hidden="true"><path d="M6 54C22 40 34 24 50 8" stroke="#3a2a2a" strokeWidth="2" fill="none" /><g fill="#f08aa0"><circle cx="40" cy="20" r="4" /><circle cx="30" cy="30" r="3.500" /><circle cx="48" cy="12" r="3.500" /><circle cx="22" cy="38" r="3" /></g></svg>;
const Mountain = () => <svg viewBox="0 0 60 40" aria-hidden="true"><path d="M0 40 18 12l10 14 8-10 24 24Z" fill="#e6f0fa" /><path d="M18 12l6 8-4 2-6-4Z" fill="#fff" /></svg>;
const Walker = () => <svg viewBox="0 0 60 40" aria-hidden="true"><path d="M30 38c-6-6 8-8 4-14" stroke="#e8c070" strokeWidth="3" fill="none" strokeLinecap="round" /><circle cx="30" cy="10" r="3" fill="#111" /><path d="M30 13v10l-4 8M30 18l5 5" stroke="#111" strokeWidth="2.600" strokeLinecap="round" fill="none" /></svg>;

/** Original cover artwork for a book: color blocks, the real title and author as text, and a small drawn motif. */
export function Cover({ id, className = '' }: { id: BookId; className?: string }) {
  const b = BOOKS[id];
  const body: Record<BookId, ReactNode> = {
    money: <><small>INTERNATIONAL BESTSELLER</small><i className="bk-motif"><Rings /></i><b>The Psychology of Money</b><em>MORGAN HOUSEL</em></>,
    shoedog: <><b>SHOE<br />DOG</b><small>A MEMOIR BY THE CREATOR OF NIKE</small><em>PHIL KNIGHT</em></>,
    subtle: <><b>THE SUBTLE ART OF NOT GIVING A F*CK</b><small>A COUNTERINTUITIVE APPROACH TO LIVING A GOOD LIFE</small><em>MARK MANSON</em></>,
    richdad: <><b>RICH DAD<br />POOR DAD</b><em>ROBERT T. KIYOSAKI</em></>,
    thinking: <><small>International Bestseller</small><i className="bk-motif"><Scribble /></i><b>THINKING, FAST AND SLOW</b><em>DANIEL KAHNEMAN</em></>,
    design: <><b>The DESIGN of EVERYDAY THINGS</b><i className="bk-motif"><Teapot /></i><em>DON NORMAN</em></>,
    hailmary: <><em>ANDY WEIR</em><b>PROJECT HAIL MARY</b></>,
    refactoring: <><b>Refactoring UI</b></>,
    dontmake: <><b>Don&rsquo;t Make Me Think</b><em>Steve Krug</em></>,
    monk: <><small>#1 NEW YORK TIMES BESTSELLING AUTHOR</small><em>ROBIN<br />SHARMA</em><b>THE MONK WHO SOLD HIS FERRARI</b><i className="bk-motif"><Walker /></i></>,
    ikigai: <><i className="bk-motif"><Branch /></i><b>IKIGAI</b><small>THE JAPANESE SECRET TO A LONG AND HAPPY LIFE</small></>,
    inner: <><b>INNER<br />EXCELLENCE</b><i className="bk-motif"><Mountain /></i><em>JIM MURPHY</em></>,
    atomic: <><small>Tiny Changes, Remarkable Results</small><b>Atomic Habits</b><em>James Clear</em></>,
  };
  return <span className={`bk-cover bk-cover--${id} ${className}`} role="img" aria-label={`${b.title}, ${b.author}`}>{body[id]}</span>;
}

/* ---------- shared bits ---------- */
const I = {
  home: <svg width="26" height="26" viewBox="0 0 26 26" fill="currentColor" aria-hidden="true"><path d="M13 3 3 11v10a2 2 0 0 0 2 2h5v-6h6v6h5a2 2 0 0 0 2-2V11L13 3Z" /></svg>,
  explore: <svg width="26" height="26" viewBox="0 0 26 26" fill="none" stroke="currentColor" strokeWidth="2.200" strokeLinecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7.500" /><path d="m17 17 6 6" /></svg>,
  store: <svg width="26" height="26" viewBox="0 0 26 26" fill="currentColor" aria-hidden="true"><path d="M4 4h18l2 7H2l2-7Z" /><path d="M4 13h18v9H4z" /><rect x="8" y="16" width="10" height="6" fill="#fff" opacity=".55" /></svg>,
  library: <svg width="26" height="26" viewBox="0 0 26 26" fill="currentColor" aria-hidden="true"><rect x="4" y="2" width="18" height="22" rx="3" /><path d="M9 7h8M9 11h5" stroke="#fff" strokeWidth="2" strokeLinecap="round" /></svg>,
  profile: <svg width="26" height="26" viewBox="0 0 26 26" fill="currentColor" aria-hidden="true"><circle cx="13" cy="8" r="5" /><path d="M3 24c1-6 5-8 10-8s9 2 10 8Z" /></svg>,
};
type Tab = 'home' | 'explore' | 'store' | 'library' | 'profile';
const tabLabels: [Tab, string][] = [['home', 'Home'], ['explore', 'Explore'], ['store', 'Store'], ['library', 'Library'], ['profile', 'Profile']];

function TabBar({ active, onSelect }: { active: Tab; onSelect: (t: Tab) => void }) {
  return (
    <nav className="bk-tabs" aria-label="Primary">
      {tabLabels.map(([id, label]) => (
        <button key={id} type="button" className="bk-tabs__item" aria-current={active === id ? 'page' : undefined} onClick={() => (id === 'explore' || id === 'library') && onSelect(id)}>
          {I[id]}<span>{label}</span>
        </button>
      ))}
    </nav>
  );
}

function Frame({ children }: { children: ReactNode }) {
  return <PhoneFrame bare height={692}><div className="bk">{children}</div></PhoneFrame>;
}

/* ---------- Explore ---------- */
const initialRecents = ['Personal Finance', 'UI/UX Principles', 'Don Norman', 'Atomic Habits', 'Product Design', 'Walter Isaacson'];
const trending: BookId[] = ['money', 'shoedog', 'subtle', 'hailmary'];
const categories: [BookId, string][] = [['richdad', 'Finance'], ['thinking', 'Improvement'], ['design', 'Design'], ['hailmary', 'Science'], ['ikigai', 'Mind']];

/** A trending book: tap to pick, press and hold to save it. */
function TrendBook({ id, picked, onPick, onSave }: { id: BookId; picked: boolean; onPick: () => void; onSave: () => void }) {
  const lp = useLongPress(onSave, 500);
  return (
    <button type="button" className={`bk-book${picked ? ' is-on' : ''}`} data-pressing={lp.pressing || undefined} onClick={onPick} aria-pressed={picked} aria-label={`${BOOKS[id].title}. Press and hold to save`} {...lp.bind}>
      <span className="bk-book__frame"><Cover id={id} /></span>
      <b>{BOOKS[id].short}</b><small>{BOOKS[id].author.split(' ').slice(-2).join(' ')}</small>
    </button>
  );
}

function Explore({ onTab }: { onTab: (t: Tab) => void }) {
  const [q, setQ] = useState('');
  const [spin, setSpin] = useState(0);
  const [toast, setToast] = useState<string | null>(null);
  const host = useRef<HTMLDivElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);
  const catRef = useRef<HTMLDivElement>(null);
  const panRow = usePanScroll(rowRef, 'x');
  const panCat = usePanScroll(catRef, 'x');
  const pull = usePull(host, () => { setSpin((n) => n + 1); setToast('Updated just now'); }, { threshold: 60, ms: 900 });
  useEffect(() => { if (!toast) return; const t = window.setTimeout(() => setToast(null), 1600); return () => window.clearTimeout(t); }, [toast]);
  const [recents, setRecents] = useState(initialRecents);
  const [picked, setPicked] = useState<BookId | null>(null);
  const [filter, setFilter] = useState(false);
  const shown = useMemo(() => {
    const t = q.trim().toLowerCase();
    const order = trending.map((_, i) => trending[(i + spin) % trending.length]);
    return t ? order.filter((id) => (BOOKS[id].title + ' ' + BOOKS[id].author).toLowerCase().includes(t)) : order;
  }, [q, spin]);
  return (
    <div className="bk-screen bk-screen--explore" ref={host}>
      <div className="bk-pull" aria-hidden={!pull.refreshing} style={{ transform: `translateY(${Math.max(0, pull.pull - 36)}px)`, opacity: Math.min(1, pull.progress * 1.2) }}><i className={pull.refreshing ? 'is-spin' : ''} style={pull.refreshing ? undefined : { rotate: `${pull.progress * 300}deg` }} /></div>
      {toast && <p className="bk-toast" role="status">{toast}</p>}
      <label className="bk-search">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#8a8a8e" strokeWidth="1.800" strokeLinecap="round" aria-hidden="true"><circle cx="9" cy="9" r="6.500" /><path d="m14 14 4 4" /></svg>
        <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search books, authors, genres..." aria-label="Search books" spellCheck={false} />
      </label>
      <button type="button" className={`bk-roundbtn bk-roundbtn--filter${filter ? ' is-on' : ''}`} aria-label="Filters" aria-pressed={filter} onClick={() => setFilter((v) => !v)}><svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.800" strokeLinecap="round" aria-hidden="true"><path d="M3 6h16M3 11h16M3 16h16" /><circle cx="8" cy="6" r="2.200" fill="#f4f4f5" /><circle cx="14" cy="11" r="2.200" fill="#f4f4f5" /><circle cx="7" cy="16" r="2.200" fill="#f4f4f5" /></svg></button>
      {recents.length > 0 && (
        <section className="bk-recent" aria-label="Recent search">
          <h2>Recent Search</h2>
          <button type="button" className="bk-link" onClick={() => setRecents([])}>Clear All</button>
          <div className="bk-chips">
            {recents.map((r) => (
              <span key={r} className="bk-chip">{r}<button type="button" aria-label={`Remove ${r}`} onClick={() => setRecents((l) => l.filter((x) => x !== r))}><svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.500" strokeLinecap="round" aria-hidden="true"><path d="m1.500 1.500 7 7M8.500 1.500l-7 7" /></svg></button></span>
            ))}
          </div>
        </section>
      )}
      <section className={`bk-trend${recents.length === 0 ? ' is-up' : ''}`} aria-label="Trending">
        <h2><span className="bk-ico">&#128196;</span>Trending <em>This Weeks</em></h2>
        <button type="button" className="bk-link bk-link--dark">View All</button>
        <div className="bk-row" ref={rowRef} {...panRow}>
          {shown.length === 0 && <p className="bk-empty">No books match &ldquo;{q}&rdquo;</p>}
          {shown.map((id) => <TrendBook key={id} id={id} picked={picked === id} onPick={() => setPicked(picked === id ? null : id)} onSave={() => setToast(`Saved \u201c${BOOKS[id].short.replace('\u2026', '')}\u201d to My Bookmarks`)} />)}
        </div>
      </section>
      <section className="bk-cats" aria-label="Categories">
        <h2><span className="bk-ico">&#128218;</span>Explore <em>by</em> Categories</h2>
        <button type="button" className="bk-link bk-link--dark">View All</button>
        <div className="bk-cats__box" ref={catRef} {...panCat}>
          {categories.map(([id, label]) => (
            <button key={label} type="button" className="bk-cat"><Cover id={id} /><small>{label}</small></button>
          ))}
        </div>
      </section>
      <TabBar active="explore" onSelect={onTab} />
    </div>
  );
}

/* ---------- Library ---------- */
const filters = ['All', 'Recent', 'Pinned', 'To Read', 'In Progress'];
const shelves: { title: string; sub: string; readers: number; books: BookId[]; tags: string[] }[] = [
  { title: 'Mindset & Money', sub: 'Habits to upgrade your daily life.', readers: 3, books: ['richdad', 'money', 'thinking'], tags: ['Recent', 'Pinned'] },
  { title: 'Design & Craft', sub: 'Pixels, empathy, and problem-solving.', readers: 3, books: ['refactoring', 'design', 'dontmake'], tags: ['To Read', 'In Progress'] },
];

/** A shelf card that is removed when swiped sideways. */
function ShelfCard({ onGone, children }: { onGone: () => void; children: ReactNode }) {
  const { bind, offset, dragging } = useSwipe({ axis: 'x', follow: true, threshold: 80, flickSpeed: 0.8, onSwipe: (d) => { if (d === 'left' || d === 'right') onGone(); } });
  return (
    <article className="bk-shelf" data-dragging={dragging || undefined} style={{ translate: offset.x ? `${offset.x / 0.82}px 0` : undefined, opacity: 1 - Math.min(0.7, Math.abs(offset.x) / 300) }} {...bind}>{children}</article>
  );
}

function Library({ onTab }: { onTab: (t: Tab) => void }) {
  const [f, setF] = useState('All');
  const [removed, setRemoved] = useState<string[]>([]);
  const fil = useRef<HTMLDivElement>(null);
  const panFil = usePanScroll(fil, 'x');
  const list = shelves.filter((s) => (f === 'All' || s.tags.includes(f)) && !removed.includes(s.title));
  return (
    <div className="bk-screen bk-screen--library">
      <h1 className="bk-title">My Bookmarks</h1>
      <button type="button" className="bk-roundbtn bk-roundbtn--more" aria-label="More"><svg width="22" height="6" viewBox="0 0 22 6" fill="currentColor" aria-hidden="true"><circle cx="3" cy="3" r="2.500" /><circle cx="11" cy="3" r="2.500" /><circle cx="19" cy="3" r="2.500" /></svg></button>
      <div className="bk-filters" role="tablist" aria-label="Filter" ref={fil} {...panFil}>
        {filters.map((x) => <button key={x} type="button" role="tab" aria-selected={f === x} className={`bk-pill${f === x ? ' is-on' : ''}`} onClick={() => setF(x)}>{x}</button>)}
      </div>
      <h2 className="bk-saved">Recently Saved</h2>
      <button type="button" className="bk-link bk-link--saved">View All</button>
      <div className="bk-shelves">
        {list.map((s) => (
          <ShelfCard key={s.title} onGone={() => setRemoved((l) => [...l, s.title])}>
            <span className="bk-shelf__chip"><span className="bk-faces" aria-hidden="true"><i /><i /><i /></span>{s.readers} Readers</span>
            <span className="bk-shelf__chip bk-shelf__chip--r"><svg width="14" height="16" viewBox="0 0 14 16" fill="#8a8a8e" aria-hidden="true"><rect x="2" y="1" width="10" height="14" rx="2" /></svg>{s.books.length + 1} books</span>
            <h3>{s.title}</h3>
            <p>{s.sub}</p>
            <span className="bk-fan"><Cover id={s.books[0]} /><Cover id={s.books[1]} /><Cover id={s.books[2]} /></span>
          </ShelfCard>
        ))}
        {list.length === 0 && <p className="bk-empty">{removed.length ? <>Removed. <button type="button" className="bk-undo" onClick={() => setRemoved([])}>Undo</button></> : 'Nothing here yet'}</p>}
      </div>
      <button type="button" className="bk-fab" aria-label="Add bookmark"><svg width="26" height="26" viewBox="0 0 26 26" fill="none" stroke="#fff" strokeWidth="2.600" strokeLinecap="round" aria-hidden="true"><path d="M13 4v18M4 13h18" /></svg></button>
      <TabBar active="library" onSelect={onTab} />
    </div>
  );
}

/**
 * Explore and Library connected by the tab bar; search filters Trending, recent searches can be removed, filters change the shelves.
 * Gestures: pan the trending books, categories and filters sideways, pull Explore down to refresh, press and hold a book to save it, swipe a shelf away.
 */
export function BookshelfFlow({ initial }: { initial: 'explore' | 'library' }) {
  const [tab, setTab] = useState<Tab>(initial);
  return (
    <Frame>
      <div className="bk-swap" key={tab}>
        {tab === 'explore' ? <Explore onTab={setTab} /> : <Library onTab={setTab} />}
      </div>
      <span className="bk-home" aria-hidden="true" />
    </Frame>
  );
}

/** Segmented progress bar: full segments, one partial, the rest empty. */
function Prog({ total, full, partial = 0.6, label, className = '' }: { total: number; full: number; partial?: number; label: string; className?: string }) {
  return (
    <div className={`bk-prog ${className}`} role="img" aria-label={label}>
      {Array.from({ length: total }, (_, i) => <i key={i}><b style={{ width: i < full ? '100%' : i === full ? `${partial * 100}%` : '0%' }} /></i>)}
    </div>
  );
}

/* ---------- Onboarding ---------- */
const topics = ['Motivation', 'Leadership', 'Time-Management', 'Emotions', 'Nutrition', 'Parenting', 'Planning', 'Self-confidence', 'Self-care', 'Management'];
const topicRows: string[][] = [['Motivation', 'Leadership'], ['Time-Management', 'Emotions'], ['Nutrition', 'Parenting'], ['Planning', 'Self-confidence'], ['Self-care', 'Management']];
const queue: BookId[] = ['monk', 'ikigai', 'inner'];
const wall: BookId[] = ['inner', 'monk', 'money', 'atomic', 'ikigai', 'subtle', 'thinking', 'design', 'richdad', 'hailmary', 'shoedog', 'refactoring'];

type Step = 'intro' | 'topics' | 'book';

/**
 * Learn Smarter -> topics -> "Are you interested in this book?" (Yes/No moves through the books, then back to the start).
 * Gestures: swipe the intro to change the page, drag the book card right for Yes or left for No (a quick flick works too).
 */
export function OnboardingFlow({ initial = 'intro' }: { initial?: Step }) {
  const [step, setStep] = useState<Step>(initial);
  const [picked, setPicked] = useState<string[]>(['Time-Management']);
  const [idx, setIdx] = useState(0);
  const [yes, setYes] = useState(0);
  const [dot, setDot] = useState(0);
  const decide = (liked: boolean) => {
    if (liked) setYes((n) => n + 1);
    if (idx + 1 >= queue.length) { setIdx(0); setYes(0); setStep('intro'); } else setIdx(idx + 1);
  };
  const toggle = (t: string) => setPicked((l) => (l.includes(t) ? l.filter((x) => x !== t) : [...l, t]));
  const card = useSwipe({
    follow: true, threshold: 90, flickSpeed: 0.8,
    onSwipe: (d) => { if (d === 'right') decide(true); if (d === 'left') decide(false); },
  });
  const pages = useSwipe({ axis: 'x', threshold: 40, onSwipe: (d) => setDot((p) => Math.max(0, Math.min(2, p + (d === 'left' ? 1 : -1)))) });
  const cur = queue[idx];
  const left = queue[(idx + queue.length - 1) % queue.length];
  const right = queue[(idx + 1) % queue.length];
  return (
    <Frame>
      <div className="bk-swap bk-on" key={step}>
        {step === 'intro' && (
          <div className="bk-screen bk-intro" {...pages.bind}>
            <div className="bk-wall" aria-hidden="true">{wall.map((id, i) => <Cover key={i} id={id} />)}</div>
            <span className="bk-intro__logo" aria-hidden="true"><svg width="40" height="40" viewBox="0 0 40 40"><circle cx="20" cy="20" r="18" fill="#111" /><path d="M14 10v20M14 14c10-2 14 3 12 7s-8 4-12 3" fill="none" stroke="#fff" strokeWidth="3.200" strokeLinecap="round" /></svg></span>
            <h1>Learn Smarter Not Longer</h1>
            <p>Bite-sized summaries designed to fit your day. Discover insights, not just pages.</p>
            <div className="bk-dots" role="tablist" aria-label="Pages">{[0, 1, 2].map((d) => <button key={d} type="button" role="tab" aria-selected={dot === d} aria-label={`Page ${d + 1}`} className={dot === d ? 'is-on' : ''} onClick={() => setDot(d)} />)}</div>
            <button type="button" className="bk-cta" onClick={() => setStep('topics')}>Continue</button>
          </div>
        )}
        {step === 'topics' && (
          <div className="bk-screen bk-topics">
            <Prog total={4} full={0} partial={0.55} label="Step 1 of 4" />
            <span className="bk-tag">Profile</span>
            <h1>What Topics Interest<br />You Most?</h1>
            <p>Select topics that match your goals.</p>
            <div className="bk-topicgrid">
              {topicRows.map((row, i) => (
                <div key={i} className="bk-topicrow">
                  {row.map((t) => (
                    <button key={t} type="button" aria-pressed={picked.includes(t)} className={`bk-topic${picked.includes(t) ? ' is-on' : ''}`} onClick={() => toggle(t)}>
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.800" strokeLinecap="round" aria-hidden="true">{picked.includes(t) ? <path d="m2.500 7.500 3 3 6-7" /> : <path d="M7 2v10M2 7h10" />}</svg>{t}
                    </button>
                  ))}
                </div>
              ))}
            </div>
            <button type="button" className="bk-cta" disabled={picked.length === 0} onClick={() => setStep('book')}>Continue</button>
          </div>
        )}
        {step === 'book' && (
          <div className="bk-screen bk-ask">
            <Prog total={5} full={2 + idx} partial={0.55} label={`Book ${idx + 1} of ${queue.length}`} className="bk-prog--5" />
            <span className="bk-tag">Like time</span>
            <h1>Are you interested<br />in this book?</h1>
            <p>Choose a time that fits your daily routine.</p>
            <div className="bk-stack" key={idx}>
              <span className="bk-stack__side bk-stack__side--l"><Cover id={left} /></span>
              <span className="bk-stack__side bk-stack__side--r"><Cover id={right} /></span>
              <span
                className="bk-stack__main" data-dragging={card.dragging || undefined} data-dir={card.offset.x > 40 ? 'yes' : card.offset.x < -40 ? 'no' : undefined}
                style={{ translate: card.offset.x || card.offset.y ? `${card.offset.x / 0.82}px ${card.offset.y / 0.82}px` : undefined, rotate: card.offset.x ? `${card.offset.x / 14}deg` : undefined }} {...card.bind}
              ><Cover id={cur} /></span>
            </div>
            <div className="bk-dots bk-dots--ask" aria-hidden="true">{queue.map((_, d) => <i key={d} className={d === idx ? 'is-on' : ''} />)}</div>
            <div className="bk-yesno">
              <button type="button" className="bk-no" onClick={() => decide(false)}>No <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="#e5484d" strokeWidth="1.800" strokeLinecap="round" aria-hidden="true"><path d="m2 2 10 10M12 2 2 12" /></svg></button>
              <button type="button" className="bk-yes" aria-label={`Yes, ${yes} liked so far`} onClick={() => decide(true)}>Yes <svg width="16" height="14" viewBox="0 0 16 14" fill="none" stroke="#3ecf7a" strokeWidth="1.800" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m2 7.500 4 4 8-9" /></svg></button>
            </div>
          </div>
        )}
      </div>
      <span className="bk-home" aria-hidden="true" />
    </Frame>
  );
}
