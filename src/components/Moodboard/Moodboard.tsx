import { useCallback, useEffect, useMemo, useReducer, useRef, useState, type CSSProperties, type KeyboardEvent as ReactKeyboardEvent, type PointerEvent as RPointerEvent, type ReactNode } from 'react';
import './Moodboard.css';
import { Art, Shapes, type ArtId } from './MoodboardArt';

/*
 * Moodboard: an infinite-feeling pinboard in a fixed 1023x717 stage that scales to its container.
 * Cards, stickies, photos and notes can be dragged, resized, edited, recolored, linked and deleted;
 * a pen wheel draws on the board; spaces, history, search, settings, inbox and sync all work.
 * Artwork is own SVG (see MoodboardArt.tsx).
 */

type Kind = 'sticky' | 'note' | 'photo' | 'swatch' | 'slide' | 'card' | 'tag' | 'pad' | 'strip' | 'text' | 'circle';
interface Item { id: string; kind: Kind; x: number; y: number; w: number; h: number; z: number; text?: string; color?: string; art?: ArtId; slide?: number; caption?: string }
interface Link { id: string; a: string; ax: number; ay: number; b: string; bx: number; by: number }
interface Stroke { id: string; color: string; w: number; alpha: number; pts: [number, number][] }
interface Board { items: Item[]; links: Link[]; strokes: Stroke[]; removed: Item[] }
interface Hist { past: Board[]; present: Board; future: Board[]; log: { text: string; at: number }[] }
type Tool = 'select' | 'pen' | 'marker' | 'eraser' | 'text';

const W = 1023;
const H = 717;
const INK = ['#5f6d2c', '#7d8e4a', '#b9c25b', '#d9d9ce', '#f4d9d4', '#f0aaa3', '#e57e78', '#8c1d2f'];
const STICKY_COLORS = ['#c97bc2', '#f2d27a', '#9ec7a4', '#8fb4e0', '#f0a79c'];
const PAPER_COLORS = ['#e8cfc4', '#f1e7c9', '#d6e3d3', '#d7dff0'];
const SLIDES = 4;
const ARTS: ArtId[] = ['flowers', 'frame', 'cat', 'coffee', 'shell', 'bleeding', 'blossom'];

const FEB = 'FEBRUARY – Connection\nFocus on building meaningful relationships. Explore how curiosity can help you understand others and deepen your connections.';
const MAR = 'MARCH – Momentum\nSet things in motion this month by taking small, consistent steps. Experiment with new ways to sustain energy and explore your ambitions.';
const PAD = 'Reading List\nThinking Fast and Slow – Daniel Kahneman\nAll that we see or seem – Ken Liu\nThinking in Systems – Donella Meadows\nThe Design of Everyday Things – Don Norman\nMeans – Yuval Noah Harari\nLight on – Samara Harris\nCreativity – Mihaly Csikszentmihalyi';

const mainBoard = (): Board => ({
  items: [
    { id: 'note', kind: 'note', x: 251, y: 169, w: 241, h: 155, z: 1, color: '#e8cfc4', text: 'handwriting your notes' },
    { id: 'hello', kind: 'sticky', x: 358, y: 77, w: 161, h: 53, z: 2, color: '#c97bc2', text: 'Hello' },
    { id: 'frame', kind: 'photo', x: 662, y: 69, w: 140, h: 140, z: 2, art: 'frame' },
    { id: 'flowers', kind: 'photo', x: 535, y: 108, w: 105, h: 135, z: 3, art: 'flowers' },
    { id: 'cat', kind: 'photo', x: 638, y: 176, w: 96, h: 96, z: 3, art: 'cat' },
    { id: 'swatch', kind: 'swatch', x: 526, y: 256, w: 31, h: 31, z: 3, color: '#a28ac9', text: 'New Space' },
    { id: 'coffee', kind: 'photo', x: 592, y: 262, w: 70, h: 70, z: 4, art: 'coffee' },
    { id: 'shell', kind: 'photo', x: 714, y: 291, w: 55, h: 62, z: 4, art: 'shell', caption: 'Morning Pages' },
    { id: 'strip', kind: 'strip', x: 152, y: 309, w: 209, h: 41, z: 2, slide: 0 },
    { id: 'slide', kind: 'slide', x: 100, y: 353, w: 312, h: 175, z: 3 },
    { id: 'pad', kind: 'pad', x: 74, y: 477, w: 295, h: 145, z: 5, text: PAD },
    { id: 'feb', kind: 'card', x: 440, y: 405, w: 311, h: 174, z: 4, text: FEB, art: 'bleeding' },
    { id: 'mar', kind: 'card', x: 516, y: 521, w: 311, h: 174, z: 5, text: MAR, art: 'blossom' },
    { id: 'tagfeb', kind: 'tag', x: 866, y: 301, w: 124, h: 37, z: 4, color: '#e6d6cc', text: 'FEBRUARY – Connection' },
    { id: 'tagmar', kind: 'tag', x: 866, y: 354, w: 114, h: 37, z: 4, color: '#a48cca', text: 'MARCH – Momentum' },
  ],
  links: [
    { id: 'l1', a: 'hello', ax: 9, ay: 13, b: 'note', bx: 12, by: 12 },
    { id: 'l2', a: 'tagfeb', ax: -1, ay: 1, b: 'feb', bx: 17, by: 57 },
    { id: 'l3', a: 'tagmar', ax: 0, ay: -1, b: 'mar', bx: 155, by: 56 },
  ],
  strokes: [],
  removed: [],
});
const ideasBoard = (): Board => ({
  items: [
    { id: 'i1', kind: 'sticky', x: 120, y: 120, w: 170, h: 64, z: 1, color: '#f2d27a', text: 'Plan the spring reading club' },
    { id: 'i2', kind: 'sticky', x: 330, y: 190, w: 170, h: 64, z: 2, color: '#9ec7a4', text: 'Pressed flower cards' },
    { id: 'i3', kind: 'photo', x: 560, y: 120, w: 140, h: 140, z: 1, art: 'frame' },
  ],
  links: [], strokes: [], removed: [],
});
const emptyBoard = (): Board => ({ items: [], links: [], strokes: [], removed: [] });
const SPACES: Record<string, () => Board> = { Main: mainBoard, Ideas: ideasBoard, Archive: emptyBoard };

let uidN = 100;
const uid = (p: string) => `${p}${uidN++}`;

/* ---------- small pieces ---------- */
function Editable({ value, editing, onCommit, className, style }: { value: string; editing: boolean; onCommit: (v: string) => void; className?: string; style?: CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (editing && ref.current) {
      ref.current.focus();
      const sel = window.getSelection();
      if (sel) { sel.selectAllChildren(ref.current); sel.collapseToEnd(); }
    }
  }, [editing]);
  return (
    <div
      ref={ref}
      className={`${className ?? ''}${editing ? ' is-editing' : ''}`}
      style={style}
      contentEditable={editing}
      suppressContentEditableWarning
      spellCheck={false}
      onBlur={() => editing && onCommit(ref.current?.innerText.replace(/\n$/, '') ?? value)}
      onKeyDown={(e) => { e.stopPropagation(); if (e.key === 'Escape') { (e.target as HTMLElement).blur(); } }}
    >
      {value}
    </div>
  );
}

const Ico = ({ children, w = 20 }: { children: ReactNode; w?: number }) => <svg width={w} height={w} viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.700" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{children}</svg>;

function SlideFace({ n }: { n: number }) {
  if (n === 0) {
    return (
      <div className="mb-slide">
        <p><span className="mb-ul mb-ul--o">A YEAR OF</span><br /><span className="mb-ul mb-ul--b">CURIOSITY</span></p>
        <div className="mb-slide__shapes"><Shapes /></div>
      </div>
    );
  }
  if (n === 1) {
    const bars = [38, 64, 52, 88, 70, 104, 92];
    return (
      <div className="mb-slide mb-slide--chart">
        <p><span className="mb-ul mb-ul--o">WEEKLY</span><br /><span className="mb-ul mb-ul--b">QUESTIONS</span></p>
        <svg viewBox="0 0 160 120" aria-hidden="true">{bars.map((h, i) => <rect key={i} x={6 + i * 22} y={118 - h} width="14" height={h} rx="3" fill={['#f09ab8', '#2f6fdc', '#f0a03a', '#2f6a3a'][i % 4]} />)}</svg>
      </div>
    );
  }
  if (n === 2) {
    return (
      <div className="mb-slide mb-slide--cal">
        <p><span className="mb-ul mb-ul--o">JANUARY</span></p>
        <div className="mb-cal">{Array.from({ length: 31 }, (_, i) => <i key={i} className={[3, 10, 17, 24].includes(i) ? 'is-on' : ''}>{i + 1}</i>)}</div>
      </div>
    );
  }
  return (
    <div className="mb-slide mb-slide--quote">
      <p><span className="mb-ul mb-ul--b">STAY CURIOUS</span></p>
      <q>Ask one new question every day.</q>
    </div>
  );
}

function PadFace({ text, editing, onCommit }: { text: string; editing: boolean; onCommit: (v: string) => void }) {
  return <div className="mb-pad"><span className="mb-pad__rip" aria-hidden="true" /><Editable className="mb-pad__text" value={text} editing={editing} onCommit={onCommit} /></div>;
}

function CardFace({ text, art, editing, onCommit, flip }: { text: string; art?: ArtId; editing: boolean; onCommit: (v: string) => void; flip: boolean }) {
  const [first] = text.split('\n');
  const dash = first.indexOf('–');
  return (
    <div className={`mb-card${flip ? ' mb-card--flip' : ''}`}>
      <span className="mb-card__leaf" aria-hidden="true"><i /><i /></span>
      {editing ? <Editable className="mb-card__edit" value={text} editing onCommit={onCommit} /> : (
        <>
          <b className="mb-card__t">{dash > 0 ? <><strong>{first.slice(0, dash).trim()}</strong> {first.slice(dash)}</> : first}</b>
          <p className="mb-card__p">{text.split('\n').slice(1).join(' ')}</p>
        </>
      )}
      {art && <span className="mb-card__img"><Art id={art} /></span>}
    </div>
  );
}

function StripFace({ n, onPick }: { n: number; onPick: (i: number) => void }) {
  return (
    <div className="mb-strip" role="tablist" aria-label="Slides">
      {Array.from({ length: SLIDES }, (_, i) => (
        <button key={i} type="button" role="tab" aria-selected={n === i} aria-label={`Slide ${i + 1}`} className={n === i ? 'is-on' : ''} onPointerDown={(e) => e.stopPropagation()} onClick={() => onPick(i)}>
          <span className={`mb-thumb mb-thumb--${i}`}>{i === 0 && <Shapes />}{i === 1 && <svg viewBox="0 0 40 30" aria-hidden="true"><rect x="4" y="14" width="6" height="12" fill="#f09ab8" /><rect x="14" y="8" width="6" height="18" fill="#2f6fdc" /><rect x="24" y="4" width="6" height="22" fill="#f0a03a" /></svg>}{i === 2 && <svg viewBox="0 0 40 30" aria-hidden="true"><g fill="#999">{Array.from({ length: 20 }, (_, k) => <rect key={k} x={4 + (k % 7) * 5} y={5 + Math.floor(k / 7) * 7} width="3.200" height="3.200" />)}</g></svg>}{i === 3 && <svg viewBox="0 0 40 30" aria-hidden="true"><path d="M8 20h24M8 14h16" stroke="#555" strokeWidth="2" /></svg>}</span>
        </button>
      ))}
    </div>
  );
}

/* ---------- the board ---------- */
export function MoodboardDemo({ initialSpace = 'Main' }: { initialSpace?: string }) {
  const [space, setSpace] = useState(initialSpace in SPACES ? initialSpace : 'Main');
  const hists = useRef<Record<string, Hist>>({});
  const [, bump] = useReducer((n: number) => n + 1, 0);
  if (!hists.current[space]) hists.current[space] = { past: [], present: SPACES[space](), future: [], log: [] };
  const hist = hists.current[space];
  const board = hist.present;

  const [selected, setSelected] = useState<string | null>(null);
  const [editing, setEditing] = useState<string | null>(null);
  const [tool, setTool] = useState<Tool>('select');
  const [ink, setInk] = useState(INK[7]);
  const [query, setQuery] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const [pop, setPop] = useState<null | 'history' | 'space' | 'cloud' | 'settings' | 'inbox'>(null);
  const [snap, setSnap] = useState(false);
  const [showLinks, setShowLinks] = useState(true);
  const [bg, setBg] = useState('#dad2c5');
  const [sync, setSync] = useState<'saved' | 'saving'>('saved');
  const [draft, setDraft] = useState<Stroke | null>(null);
  const [linkDrag, setLinkDrag] = useState<{ from: string; x: number; y: number; sx: number; sy: number } | null>(null);
  const [scale, setScale] = useState(1);
  const [off, setOff] = useState({ x: 0, y: 0 });
  const wrap = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{ id: string; sx: number; sy: number; ox: number; oy: number; ow: number; oh: number; mode: 'move' | 'resize'; base: Board; moved: boolean } | null>(null);
  const syncTimer = useRef<number | undefined>(undefined);

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

  const markSaving = useCallback(() => {
    setSync('saving');
    window.clearTimeout(syncTimer.current);
    syncTimer.current = window.setTimeout(() => setSync('saved'), 900);
  }, []);
  useEffect(() => () => window.clearTimeout(syncTimer.current), []);

  const set = (next: Board, label?: string, base?: Board) => {
    if (label) {
      hist.past.push(base ?? hist.present);
      if (hist.past.length > 60) hist.past.shift();
      hist.future = [];
      hist.log.unshift({ text: label, at: Date.now() });
      markSaving();
    }
    hist.present = next;
    bump();
  };
  const commit = (label: string, fn: (b: Board) => Board) => set(fn(hist.present), label);
  const undo = () => { const p = hist.past.pop(); if (!p) return; hist.future.push(hist.present); hist.present = p; hist.log.unshift({ text: 'Undo', at: Date.now() }); markSaving(); bump(); };
  const redo = () => { const f = hist.future.pop(); if (!f) return; hist.past.push(hist.present); hist.present = f; hist.log.unshift({ text: 'Redo', at: Date.now() }); markSaving(); bump(); };

  const topZ = useMemo(() => board.items.reduce((m, i) => Math.max(m, i.z), 0), [board.items]);
  const sel = board.items.find((i) => i.id === selected) ?? null;
  const stripItem = board.items.find((i) => i.kind === 'strip');
  const q = query.trim().toLowerCase();
  const matches = (i: Item) => !q || `${i.text ?? ''} ${i.caption ?? ''} ${i.kind}`.toLowerCase().includes(q);

  /* ----- adding, removing ----- */
  const add = (partial: Omit<Item, 'id' | 'z' | 'x' | 'y'> & { x?: number; y?: number }) => {
    const n = board.items.length;
    const it: Item = { x: 420 + (n % 5) * 24, y: 250 + (n % 4) * 22, ...partial, id: uid('n'), z: topZ + 1 };
    commit(`Added ${it.kind}`, (b) => ({ ...b, items: [...b.items, it] }));
    setSelected(it.id);
    setTool('select');
  };
  const remove = (id: string) => {
    const it = board.items.find((i) => i.id === id);
    if (!it) return;
    commit(`Removed ${it.kind}`, (b) => ({ ...b, items: b.items.filter((i) => i.id !== id), links: b.links.filter((l) => l.a !== id && l.b !== id), removed: [it, ...b.removed] }));
    setSelected(null);
  };
  const restore = (id: string) => commit('Restored item', (b) => {
    const it = b.removed.find((i) => i.id === id);
    return it ? { ...b, items: [...b.items, { ...it, z: topZ + 1 }], removed: b.removed.filter((i) => i.id !== id) } : b;
  });
  const duplicate = (id: string) => {
    const it = board.items.find((i) => i.id === id);
    if (!it) return;
    const c: Item = { ...it, id: uid('n'), x: it.x + 22, y: it.y + 22, z: topZ + 1 };
    commit('Duplicated item', (b) => ({ ...b, items: [...b.items, c] }));
    setSelected(c.id);
  };
  const patch = (id: string, p: Partial<Item>, label: string) => commit(label, (b) => ({ ...b, items: b.items.map((i) => (i.id === id ? { ...i, ...p } : i)) }));

  /* ----- pointer: move / resize ----- */
  const toStage = (e: { clientX: number; clientY: number }) => {
    const r = stage.current!.getBoundingClientRect();
    return { x: (e.clientX - r.left) / scale, y: (e.clientY - r.top) / scale };
  };
  const onItemDown = (e: RPointerEvent<HTMLElement>, it: Item, mode: 'move' | 'resize') => {
    if (tool !== 'select' || editing === it.id) return;
    e.stopPropagation();
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    setSelected(it.id);
    dragRef.current = { id: it.id, sx: e.clientX, sy: e.clientY, ox: it.x, oy: it.y, ow: it.w, oh: it.h, mode, base: hist.present, moved: false };
  };
  const onItemMove = (e: RPointerEvent<HTMLElement>) => {
    const d = dragRef.current;
    if (!d) return;
    const dx = (e.clientX - d.sx) / scale;
    const dy = (e.clientY - d.sy) / scale;
    if (!d.moved && Math.abs(dx) + Math.abs(dy) < 2) return;
    d.moved = true;
    const g = (v: number) => (snap ? Math.round(v / 8) * 8 : Math.round(v));
    set({ ...hist.present, items: hist.present.items.map((i) => (i.id !== d.id ? i : d.mode === 'move' ? { ...i, x: g(d.ox + dx), y: g(d.oy + dy) } : { ...i, w: Math.max(28, g(d.ow + dx)), h: Math.max(24, g(d.oh + dy)) })) });
  };
  const onItemUp = (e: RPointerEvent<HTMLElement>) => {
    const d = dragRef.current;
    dragRef.current = null;
    if (!d || !d.moved) return;
    const hit = document.elementsFromPoint(e.clientX, e.clientY).some((n) => (n as HTMLElement).dataset?.trash === 'true');
    if (hit && d.mode === 'move') {
      hist.present = d.base; // drop onto the trash: delete the item as one step
      remove(d.id);
      return;
    }
    set(hist.present, d.mode === 'move' ? 'Moved item' : 'Resized item', d.base);
  };

  /* ----- pointer: stage (drawing, text tool, deselect) ----- */
  const strokeId = useRef(0);
  const onStageDown = (e: RPointerEvent<HTMLDivElement>) => {
    const p = toStage(e);
    if (tool === 'select') { setSelected(null); setEditing(null); setPop(null); return; }
    if (tool === 'text') {
      add({ kind: 'text', x: p.x, y: p.y, w: 160, h: 34, text: 'Type here', color: ink });
      return;
    }
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    if (tool === 'eraser') { eraseAt(p.x, p.y); return; }
    const marker = tool === 'marker';
    setDraft({ id: `s${++strokeId.current}`, color: ink, w: marker ? 12 : 3, alpha: marker ? 0.38 : 1, pts: [[p.x, p.y]] });
  };
  const eraseAt = (x: number, y: number) => {
    const cur = hist.present;
    const keep = cur.strokes.filter((s) => !s.pts.some(([px, py]) => Math.hypot(px - x, py - y) < 12));
    if (keep.length !== cur.strokes.length) set({ ...cur, strokes: keep });
  };
  const eraseBase = useRef<Board | null>(null);
  const onStageMove = (e: RPointerEvent<HTMLDivElement>) => {
    const p = toStage(e);
    if (linkDrag) setLinkDrag({ ...linkDrag, x: p.x, y: p.y });
    if (tool === 'eraser' && e.buttons === 1) { if (!eraseBase.current) eraseBase.current = hist.present; eraseAt(p.x, p.y); return; }
    if (draft) setDraft({ ...draft, pts: [...draft.pts, [p.x, p.y]] });
  };
  const onStageUp = (e: RPointerEvent<HTMLDivElement>) => {
    if (linkDrag) finishLink(e);
    if (eraseBase.current) { set(hist.present, 'Erased ink', eraseBase.current); eraseBase.current = null; }
    if (draft) {
      if (draft.pts.length > 1) commit(tool === 'marker' ? 'Marker stroke' : 'Pen stroke', (b) => ({ ...b, strokes: [...b.strokes, draft] }));
      setDraft(null);
    }
  };

  /* ----- links ----- */
  const startLink = (e: RPointerEvent<HTMLElement>, it: Item) => {
    e.stopPropagation();
    (stage.current as HTMLElement).setPointerCapture(e.pointerId);
    setLinkDrag({ from: it.id, x: it.x + 9, y: it.y + 9, sx: it.x + 9, sy: it.y + 9 });
  };
  const finishLink = (e: RPointerEvent<HTMLElement>) => {
    const d = linkDrag;
    setLinkDrag(null);
    if (!d) return;
    const el = document.elementsFromPoint(e.clientX, e.clientY).find((n) => (n as HTMLElement).dataset?.item && (n as HTMLElement).dataset.item !== d.from) as HTMLElement | undefined;
    const from = board.items.find((i) => i.id === d.from);
    const to = el && board.items.find((i) => i.id === el.dataset.item);
    if (from && to) {
      const p = toStage(e);
      commit('Linked cards', (b) => ({ ...b, links: [...b.links, { id: uid('l'), a: from.id, ax: 9, ay: 9, b: to.id, bx: Math.round(Math.min(to.w, Math.max(0, p.x - to.x))), by: Math.round(Math.min(to.h, Math.max(0, p.y - to.y))) }] }));
    }
  };
  const anchor = (id: string, dx: number, dy: number): [number, number] | null => {
    const it = board.items.find((i) => i.id === id);
    return it ? [it.x + dx, it.y + dy] : null;
  };

  /* ----- keyboard ----- */
  const onKey = (e: ReactKeyboardEvent<HTMLDivElement>) => {
    if (editing) return;
    const mod = e.ctrlKey || e.metaKey;
    if (mod && e.key.toLowerCase() === 'z') { e.preventDefault(); e.shiftKey ? redo() : undo(); return; }
    if (mod && e.key.toLowerCase() === 'y') { e.preventDefault(); redo(); return; }
    if (e.key === 'Escape') { setSelected(null); setPop(null); setSearchOpen(false); setTool('select'); return; }
    if (!sel) return;
    if (e.key === 'Delete' || e.key === 'Backspace') { e.preventDefault(); remove(sel.id); return; }
    const step = e.shiftKey ? 10 : 1;
    const mv: Record<string, [number, number]> = { ArrowLeft: [-step, 0], ArrowRight: [step, 0], ArrowUp: [0, -step], ArrowDown: [0, step] };
    if (mv[e.key]) { e.preventDefault(); patch(sel.id, { x: sel.x + mv[e.key][0], y: sel.y + mv[e.key][1] }, 'Nudged item'); }
  };

  /* ----- item content ----- */
  const slideNo = stripItem?.slide ?? 0;
  const body = (it: Item): ReactNode => {
    const isEdit = editing === it.id;
    const done = (v: string) => { setEditing(null); if (v !== it.text) patch(it.id, { text: v }, 'Edited text'); };
    switch (it.kind) {
      case 'sticky': return <Editable className="mb-sticky" value={it.text ?? ''} editing={isEdit} onCommit={done} style={{ background: it.color, fontSize: Math.max(14, Math.min(40, it.h * 0.68)) }} />;
      case 'note': return <div className="mb-note" style={{ background: it.color }}><Editable className="mb-note__t" value={it.text ?? ''} editing={isEdit} onCommit={done} /></div>;
      case 'tag': return <Editable className="mb-tag" value={it.text ?? ''} editing={isEdit} onCommit={done} style={{ background: it.color }} />;
      case 'text': return <Editable className="mb-text" value={it.text ?? ''} editing={isEdit} onCommit={done} style={{ color: it.color }} />;
      case 'swatch': return <><span className="mb-swatch" style={{ background: it.color }} /><Editable className="mb-label" value={it.text ?? ''} editing={isEdit} onCommit={done} /></>;
      case 'circle': return <span className="mb-circle" style={{ background: it.color ?? '#e8a0a0' }} />;
      case 'photo': return <><span className={`mb-photo mb-photo--${it.art}`}><Art id={it.art ?? 'flowers'} /></span>{it.caption && <span className="mb-caption">{it.caption}</span>}</>;
      case 'slide': return <SlideFace n={slideNo} />;
      case 'strip': return <StripFace n={it.slide ?? 0} onPick={(i) => patch(it.id, { slide: i }, 'Changed slide')} />;
      case 'pad': return <PadFace text={it.text ?? ''} editing={isEdit} onCommit={done} />;
      case 'card': return <CardFace text={it.text ?? ''} art={it.art} editing={isEdit} onCommit={done} flip={it.art === 'blossom'} />;
      default: return null;
    }
  };

  const colorable = sel && (sel.kind === 'sticky' || sel.kind === 'tag' || sel.kind === 'swatch' || sel.kind === 'circle' || sel.kind === 'note' || sel.kind === 'text');
  const palette = sel?.kind === 'note' ? PAPER_COLORS : sel?.kind === 'tag' ? [...PAPER_COLORS, '#a48cca'] : sel?.kind === 'text' ? INK : STICKY_COLORS;
  const toolBtn = (id: Tool, label: string, icon: ReactNode, cls: string) => <button type="button" className={`mb-wheel__tool ${cls}${tool === id ? ' is-on' : ''}`} aria-label={label} aria-pressed={tool === id} onClick={() => setTool(tool === id ? 'select' : id)}>{icon}</button>;

  const railAdd = (label: string, icon: ReactNode, fn: () => void) => <button type="button" className="mb-rail__btn" aria-label={label} title={label} onClick={fn}>{icon}</button>;
  const nextArt = useRef(0);

  return (
    <div className="mb" ref={wrap} tabIndex={0} onKeyDown={onKey} style={{ background: bg }} data-tool={tool}>
      <div className="mb-stage" ref={stage} style={{ width: W, height: H, transform: `translate(${off.x}px, ${off.y}px) scale(${scale})` }} onPointerDown={onStageDown} onPointerMove={onStageMove} onPointerUp={onStageUp} onPointerCancel={onStageUp}>
        {/* items */}
        {[...board.items].sort((a, b) => a.z - b.z).map((it) => (
          <div
            key={it.id}
            data-item={it.id}
            className={`mb-item mb-item--${it.kind}${selected === it.id ? ' is-sel' : ''}${q && !matches(it) ? ' is-dim' : ''}${q && matches(it) ? ' is-hit' : ''}`}
            style={{ left: it.x, top: it.y, width: it.w, height: it.h, zIndex: it.z }}
            onPointerDown={(e) => onItemDown(e, it, 'move')}
            onPointerMove={onItemMove}
            onPointerUp={onItemUp}
            onDoubleClick={() => { if (['sticky', 'note', 'tag', 'text', 'swatch', 'pad', 'card'].includes(it.kind)) { setSelected(it.id); setEditing(it.id); } }}
          >
            {body(it)}
            {selected === it.id && tool === 'select' && editing !== it.id && (
              <>
                <span className="mb-handle" aria-hidden="true" onPointerDown={(e) => onItemDown(e, it, 'resize')} onPointerMove={onItemMove} onPointerUp={onItemUp} />
                <span className="mb-linkdot" title="Drag to another card to link" onPointerDown={(e) => startLink(e, it)} />
              </>
            )}
          </div>
        ))}

        {/* connectors */}
        <svg className="mb-links" width={W} height={H} aria-hidden="true">
          {showLinks && board.links.map((l) => {
            const a = anchor(l.a, l.ax, l.ay); const b = anchor(l.b, l.bx, l.by);
            if (!a || !b) return null;
            return (
              <g key={l.id}>
                <line x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke="#0d0d0d" strokeWidth="3" strokeLinecap="round" />
                {[a, b].map((p, i) => <circle key={i} cx={p[0]} cy={p[1]} r="6.500" fill="#0d0d0d" className="mb-anchor" onDoubleClick={() => commit('Removed link', (bd) => ({ ...bd, links: bd.links.filter((x) => x.id !== l.id) }))}><title>Double-click to remove the link</title></circle>)}
              </g>
            );
          })}
          {linkDrag && <line x1={linkDrag.sx} y1={linkDrag.sy} x2={linkDrag.x} y2={linkDrag.y} stroke="#0d0d0d" strokeWidth="3" strokeDasharray="6 6" strokeLinecap="round" />}
        </svg>

        {/* ink */}
        <svg className={`mb-ink${tool === 'pen' || tool === 'marker' || tool === 'eraser' ? ' is-on' : ''}`} width={W} height={H} aria-hidden="true">
          {[...board.strokes, ...(draft ? [draft] : [])].map((s) => <polyline key={s.id} points={s.pts.map((p) => p.join(',')).join(' ')} fill="none" stroke={s.color} strokeWidth={s.w} strokeOpacity={s.alpha} strokeLinecap="round" strokeLinejoin="round" />)}
        </svg>

        {/* context toolbar */}
        {sel && tool === 'select' && !editing && (
          <div className="mb-ctx" style={{ left: Math.max(4, Math.min(W - 190, sel.x)), top: Math.max(4, sel.y - 42) }} onPointerDown={(e) => e.stopPropagation()}>
            {colorable && palette.map((c) => <button key={c} type="button" className={`mb-ctx__dot${sel.color === c ? ' is-on' : ''}`} style={{ background: c }} aria-label={`Color ${c}`} onClick={() => patch(sel.id, { color: c }, 'Changed color')} />)}
            <button type="button" aria-label="Duplicate" title="Duplicate" onClick={() => duplicate(sel.id)}><Ico w={16}><rect x="7" y="7" width="12" height="12" rx="3" /><path d="M15 7V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2" /></Ico></button>
            <button type="button" aria-label="Bring to front" title="Bring to front" onClick={() => patch(sel.id, { z: topZ + 1 }, 'Brought to front')}><Ico w={16}><path d="M11 3 3 8l8 5 8-5-8-5ZM3 12l8 5 8-5" /></Ico></button>
            <button type="button" aria-label="Delete" title="Delete" onClick={() => remove(sel.id)}><Ico w={16}><path d="M4 6h14M8 6V4h6v2M6 6l1 12h8l1-12" /></Ico></button>
          </div>
        )}
      </div>

      {/* top pill */}
      <div className="mb-top" role="toolbar" aria-label="Board">
        {searchOpen ? (
          <label className="mb-search"><Ico><circle cx="9" cy="9" r="6" /><path d="m14 14 5 5" /></Ico><input autoFocus value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search the board" aria-label="Search the board" onKeyDown={(e) => { e.stopPropagation(); if (e.key === 'Escape') { setSearchOpen(false); setQuery(''); } }} /><button type="button" aria-label="Close search" onClick={() => { setSearchOpen(false); setQuery(''); }}><Ico w={14}><path d="m5 5 12 12M17 5 5 17" /></Ico></button></label>
        ) : (
          <button type="button" className="mb-top__btn" aria-label="Search" onClick={() => { setSearchOpen(true); setPop(null); }}><Ico><circle cx="9" cy="9" r="6" /><path d="m14 14 5 5" /></Ico></button>
        )}
        <button type="button" className={`mb-top__btn${pop === 'history' ? ' is-on' : ''}`} aria-label="History" aria-expanded={pop === 'history'} onClick={() => setPop(pop === 'history' ? null : 'history')}><Ico><circle cx="11" cy="11" r="8" /><path d="M11 6v5l3 2" /></Ico></button>
        <button type="button" className={`mb-top__space${pop === 'space' ? ' is-on' : ''}`} aria-label={`Space ${space}`} aria-expanded={pop === 'space'} onClick={() => setPop(pop === 'space' ? null : 'space')}>{space}</button>
        <button type="button" className={`mb-top__btn${pop === 'cloud' ? ' is-on' : ''}`} aria-label={sync === 'saving' ? 'Saving' : 'Saved'} aria-expanded={pop === 'cloud'} onClick={() => setPop(pop === 'cloud' ? null : 'cloud')}>
          <Ico><path d="M6 17a4 4 0 0 1-.5-8 5.500 5.500 0 0 1 10.600-1A4.500 4.500 0 0 1 16 17H6Z" />{sync === 'saved' ? <path d="m8.500 12 2 2 3.500-4" /> : <path d="M11 9v4" className="mb-pulse" />}</Ico>
        </button>
        {pop === 'history' && (
          <div className="mb-pop mb-pop--history" role="dialog" aria-label="History">
            <div className="mb-pop__row"><button type="button" disabled={!hist.past.length} onClick={undo}>Undo</button><button type="button" disabled={!hist.future.length} onClick={redo}>Redo</button></div>
            <ul>{hist.log.length === 0 && <li className="mb-pop__empty">No changes yet</li>}{hist.log.slice(0, 7).map((l, i) => <li key={`${l.at}${i}`}>{l.text}</li>)}</ul>
          </div>
        )}
        {pop === 'space' && (
          <div className="mb-pop mb-pop--space" role="menu" aria-label="Spaces">
            {Object.keys(SPACES).map((s) => <button key={s} type="button" role="menuitemradio" aria-checked={s === space} className={s === space ? 'is-on' : ''} onClick={() => { setSpace(s); setSelected(null); setEditing(null); setPop(null); }}>{s}</button>)}
          </div>
        )}
        {pop === 'cloud' && <div className="mb-pop mb-pop--cloud" role="status">{sync === 'saving' ? 'Saving…' : 'All changes saved'}<small>{hist.log.length ? `${hist.log.length} change${hist.log.length === 1 ? '' : 's'} this session` : 'Nothing to save'}</small></div>}
      </div>

      {/* pen wheel */}
      <div className="mb-wheel" role="group" aria-label="Pen tools">
        <span className="mb-wheel__ring" aria-hidden="true" />
        {INK.map((c, i) => {
          const a = ((8 + i * 20) * Math.PI) / 180;
          const on = ink === c;
          const r = 56;
          return <button key={c} type="button" className={`mb-wheel__ink${on ? ' is-on' : ''}`} style={{ left: 71 + Math.sin(a) * r, top: 71 - Math.cos(a) * r, background: c }} aria-label={`Ink ${c}`} aria-pressed={on} onClick={() => setInk(c)} />;
        })}
        {toolBtn('pen', 'Pen', <Ico w={18}><path d="m4 18 1-5L15 3l4 4L9 17l-5 1Z" /></Ico>, 'mb-wheel__t1')}
        {toolBtn('select', 'Select', <svg width="16" height="18" viewBox="0 0 16 18" fill="currentColor" aria-hidden="true"><path d="M2 1v13l3.500-3.200L8 17l2.200-1-2.500-5.800H13L2 1Z" /></svg>, 'mb-wheel__t2')}
        {toolBtn('eraser', 'Eraser', <Ico w={18}><path d="m4 14 8-9 6 5-6 8H8Z M9 18h9" /></Ico>, 'mb-wheel__t3')}
        <button type="button" className="mb-wheel__tool mb-wheel__t4" aria-label="Undo" disabled={!hist.past.length} onClick={undo}><Ico w={18}><path d="M8 5 4 9l4 4M4 9h9a5 5 0 0 1 0 10h-3" /></Ico></button>
        <button type="button" className="mb-wheel__tool mb-wheel__t5" aria-label="Redo" disabled={!hist.future.length} onClick={redo}><Ico w={18}><path d="m14 5 4 4-4 4M18 9H9a5 5 0 0 0 0 10h3" /></Ico></button>
        {toolBtn('marker', 'Marker', <Ico w={18}><path d="m6 17 9-12 3 2-9 12-4 1 1-3Z" /></Ico>, 'mb-wheel__t6')}
        <button type="button" className={`mb-wheel__a${tool === 'text' ? ' is-on' : ''}`} aria-label="Text" aria-pressed={tool === 'text'} onClick={() => setTool(tool === 'text' ? 'select' : 'text')}>A</button>
      </div>

      {/* left rail */}
      <div className="mb-rail" role="toolbar" aria-label="Add to board">
        <div className="mb-rail__group">
          {railAdd('New card', <Ico><path d="M6 3h7l4 4v12H6z" /><path d="M13 3v4h4" /></Ico>, () => add({ kind: 'card', w: 260, h: 150, text: 'New card\nWrite something that matters. Double-click to edit this card.' }))}
          {railAdd('Duplicate selection', <Ico><rect x="7" y="7" width="12" height="12" rx="2" /><path d="M15 7V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2" /></Ico>, () => sel && duplicate(sel.id))}
          {railAdd('New space swatch', <Ico><path d="M3 6a2 2 0 0 1 2-2h4l2 2h6a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6Z" /></Ico>, () => add({ kind: 'swatch', w: 31, h: 31, color: '#a28ac9', text: 'New Space' }))}
          {railAdd('Sticky note', <Ico><path d="M4 4h14v9l-5 5H4z" /><path d="M13 18v-5h5" /></Ico>, () => add({ kind: 'sticky', w: 170, h: 56, color: STICKY_COLORS[board.items.length % STICKY_COLORS.length], text: 'New idea' }))}
          {railAdd('Text box', <Ico><rect x="3" y="4" width="16" height="14" rx="3" /><path d="M8 9h6M11 9v6" /></Ico>, () => add({ kind: 'text', w: 160, h: 34, text: 'Type here', color: ink }))}
          {railAdd('Circle', <Ico><circle cx="11" cy="11" r="8" /></Ico>, () => add({ kind: 'circle', w: 70, h: 70, color: '#e8a0a0' }))}
          {railAdd('Attach a picture', <Ico><path d="m15 8-6 6a2.500 2.500 0 0 0 3.500 3.500l6-6a4 4 0 0 0-5.600-5.600l-6.500 6.500a5.500 5.500 0 0 0 7.800 7.800" /></Ico>, () => { const art = ARTS[nextArt.current++ % ARTS.length]; add({ kind: 'photo', w: art === 'frame' ? 120 : 96, h: art === 'frame' ? 120 : 100, art }); })}
        </div>
        <div className="mb-rail__group mb-rail__group--low">
          <button type="button" className={`mb-rail__btn${pop === 'settings' ? ' is-on' : ''}`} aria-label="Settings" aria-expanded={pop === 'settings'} onClick={() => setPop(pop === 'settings' ? null : 'settings')}><Ico><circle cx="11" cy="11" r="3" /><path d="M11 2v3M11 17v3M2 11h3M17 11h3M4.600 4.600l2 2M15.400 15.400l2 2M4.600 17.400l2-2M15.400 6.600l2-2" /></Ico></button>
          <button type="button" className={`mb-rail__btn${pop === 'inbox' ? ' is-on' : ''}`} aria-label={`Inbox, ${board.removed.length} removed`} aria-expanded={pop === 'inbox'} onClick={() => setPop(pop === 'inbox' ? null : 'inbox')}><Ico><path d="M3 12h4l1 3h6l1-3h4M5 4h12l2 8v6H3v-6Z" /></Ico>{board.removed.length > 0 && <b className="mb-rail__badge">{board.removed.length}</b>}</button>
          <button type="button" className="mb-rail__btn mb-rail__trash" data-trash="true" aria-label="Trash (drop a card here)" onClick={() => sel && remove(sel.id)}><Ico><path d="M4 6h14M8 6V4h6v2M6 6l1 12h8l1-12M9 10v5M13 10v5" /></Ico></button>
        </div>
        {pop === 'settings' && (
          <div className="mb-pop mb-pop--settings" role="dialog" aria-label="Settings">
            <label><input type="checkbox" checked={snap} onChange={(e) => setSnap(e.target.checked)} /> Snap to grid</label>
            <label><input type="checkbox" checked={showLinks} onChange={(e) => setShowLinks(e.target.checked)} /> Show connectors</label>
            <div className="mb-pop__bgs" role="radiogroup" aria-label="Background">{['#dad2c5', '#e8e4da', '#cdd5cc', '#d8d0e4'].map((c) => <button key={c} type="button" role="radio" aria-checked={bg === c} aria-label={`Background ${c}`} className={bg === c ? 'is-on' : ''} style={{ background: c }} onClick={() => setBg(c)} />)}</div>
          </div>
        )}
        {pop === 'inbox' && (
          <div className="mb-pop mb-pop--inbox" role="dialog" aria-label="Inbox">
            <b>Removed items</b>
            <ul>{board.removed.length === 0 && <li className="mb-pop__empty">Nothing here. Removed items wait here.</li>}{board.removed.map((r) => <li key={r.id}><span>{r.text?.split('\n')[0] ?? r.caption ?? r.kind}</span><button type="button" onClick={() => restore(r.id)}>Restore</button></li>)}</ul>
          </div>
        )}
      </div>
    </div>
  );
}
