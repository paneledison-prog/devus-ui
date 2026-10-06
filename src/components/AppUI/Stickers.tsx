import { forwardRef, useEffect, useRef, useState, type CSSProperties, type PointerEvent as RPointerEvent, type ReactNode } from 'react';
import { useLongPress, usePinch, useSwipe } from './gestures';
import './Stickers.css';
import rainbow from './assets/stickers/rainbow.png';
import egg from './assets/stickers/egg.png';
import leaves from './assets/stickers/leaves.png';
import beer from './assets/stickers/beer.png';
import peace from './assets/stickers/peace.png';
import heart from './assets/stickers/heart.png';
import selfie from './assets/stickers/selfie.jpg';

/*
 * Sticker picker and circle editor, drawn on a 357x773 canvas scaled to the 320px phone (320 / 357).
 * Coordinates are canvas pixels taken from the reference image. Stickers and the photo are generated image assets
 * (the stickers are cut out and given a white outline by scripts, not by hand).
 */

export const StickerCanvas = forwardRef<HTMLDivElement, { children: ReactNode }>(function StickerCanvas({ children }, ref) {
  return <div className="sk" ref={ref}>{children}</div>;
});

export function StickerHomeBar() { return <span className="sk-home" aria-hidden="true" />; }

export const stickers = { rainbow, egg, leaves, beer, peace, heart };

export type Pack = 'sky' | 'food' | 'autumn';
const packs: { id: Pack; label: string; src: string }[] = [
  { id: 'sky', label: 'Sky', src: rainbow },
  { id: 'food', label: 'Food', src: egg },
  { id: 'autumn', label: 'Autumn', src: leaves },
];

/** The sticker pack row: the selected tab is a blue tile. Controlled with `value` / `onChange`, or uncontrolled. */
export function PackTabs({ className = '', value, onChange }: { className?: string; value?: Pack; onChange?: (p: Pack) => void }) {
  const [own, setOwn] = useState<Pack>('sky');
  const cur = value ?? own;
  return (
    <div className={`sk-tabs ${className}`} role="tablist" aria-label="Sticker packs">
      {packs.map((p) => (
        <button key={p.id} type="button" role="tab" aria-selected={cur === p.id} className={`sk-tab${cur === p.id ? ' sk-tab--on' : ''}`} aria-label={p.label} onClick={() => { setOwn(p.id); onChange?.(p.id); }}>
          <img src={p.src} alt="" />
        </button>
      ))}
    </div>
  );
}

export function Sticker({ src, style, className = '', onTap, onPeek, peeking }: { src: string; style: CSSProperties; className?: string; onTap?: () => void; onPeek?: () => void; peeking?: boolean }) {
  const lp = useLongPress(() => onPeek?.(), 420);
  return <img className={`sk-sticker ${className}`} data-pressing={lp.pressing || peeking || undefined} src={src} alt="" style={style} onClick={onTap} {...(onPeek ? lp.bind : {})} />;
}

/** The blurred camera photo behind the picker sheet. Tapping it brings the sheet back after it was closed. */
export function BlurredPhoto({ onOpen, sheetOpen = true }: { onOpen?: () => void; sheetOpen?: boolean }) {
  return (
    <button type="button" className="sk-blur" aria-label="Show stickers" disabled={sheetOpen} onClick={onOpen}>
      <img src={selfie} alt="" />
    </button>
  );
}

/**
 * The sticker sheet at the bottom of the left screen. Packs switch the sticker set, stickers pop when tapped, the close button slides the sheet away.
 * Gestures: swipe the sheet down to close it, swipe it left or right to change pack, press and hold a sticker to peek at it full size.
 */
export function StickerSheet({ open = true, onClose }: { open?: boolean; onClose?: () => void }) {
  const [pack, setPack] = useState<Pack>('sky');
  const [tapped, setTapped] = useState<string | null>(null);
  const [peek, setPeek] = useState<string | null>(null);
  const order: Pack[] = ['sky', 'food', 'autumn'];
  const swipe = useSwipe({
    threshold: 44, ignore: '.sk-close', flickSpeed: 0.8,
    onSwipe: (d) => {
      if (d === 'down') onClose?.();
      if (d === 'left' || d === 'right') setPack((p) => order[Math.max(0, Math.min(order.length - 1, order.indexOf(p) + (d === 'left' ? 1 : -1)))]);
    },
  });
  const sets: Record<Pack, { src: string; name: string }[]> = {
    sky: [{ src: rainbow, name: 'rainbow' }, { src: beer, name: 'beer' }, { src: peace, name: 'peace' }, { src: heart, name: 'heart' }],
    food: [{ src: egg, name: 'egg' }, { src: beer, name: 'beer' }],
    autumn: [{ src: leaves, name: 'leaves' }],
  };
  const slots = [{ left: 36, top: 108 }, { left: 184, top: 128 }, { left: 46, top: 233 }, { left: 199, top: 238 }];
  return (
    <section className={`sk-sheet${open ? '' : ' is-closed'}`} aria-label="Stickers" aria-hidden={!open} {...swipe.bind} onPointerUp={(e) => { setPeek(null); swipe.bind.onPointerUp(e); }}>
      <span className="sk-grab" aria-hidden="true" />
      <PackTabs className="sk-tabs--sheet" value={pack} onChange={setPack} />
      <div className="sk-grid" key={pack}>
        {sets[pack].map((st, i) => (
          <Sticker key={st.name} src={st.src} className={`sk-sticker--tap${tapped === st.name ? ' is-tapped' : ''}`} style={{ ...slots[i], width: 118, height: 118 }} onTap={() => setTapped(st.name)} onPeek={() => setPeek(st.src)} peeking={peek === st.src} />
        ))}
      </div>
      {peek && <div className="sk-peek" aria-hidden="true"><img src={peek} alt="" /></div>}
      <h2 className="sk-sheet__title">stickers</h2>
      <button type="button" className="sk-close" aria-label="Close stickers" onClick={onClose}><svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2.400" strokeLinecap="round" aria-hidden="true"><path d="m2 2 10 10M12 2 2 12" /></svg></button>
    </section>
  );
}

/* ---------- circle editor ---------- */
const Trash = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.600" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M2.500 4h11M6 4V2.500h4V4M4 4l.7 9.500h6.600L12 4M6.700 6.500v5M9.300 6.500v5" /></svg>
);

export function TrashChip({ x, y, size = 30, onClick }: { x: number; y: number; size?: number; onClick?: () => void }) {
  return <button type="button" className="sk-trash" aria-label="Delete sticker" onClick={onClick} style={{ left: x - size / 2, top: y - size / 2, width: size, height: size }}><Trash /></button>;
}

interface PlacedItem { id: number; src: string; x: number; y: number; size: number; size0: number; spin: number; rot: number; chip: string; frame: [number, number, number, number]; chipAt: [number, number]; trashAt: [number, number] }
const initial: PlacedItem[] = [
  { id: 1, src: heart, x: 68, y: 173, size: 135, size0: 135, spin: 0, rot: -6, chip: 'x9', frame: [-62, -77, 150, 150], chipAt: [31, 80], trashAt: [-15, -87] },
  { id: 2, src: egg, x: 275, y: 426, size: 118, size0: 118, spin: 0, rot: -3, chip: 'x12', frame: [-72, -78, 150, 140], chipAt: [-23, 84], trashAt: [13, -85] },
];
const packSrc: Record<Pack, string> = { sky: rainbow, food: egg, autumn: leaves };

/** A sticker placed on the circle: draggable, inside a thin selection frame with a count chip and a delete button. */
function PlacedSticker({ it, selected, scale, onMove, onSelect, onDelete, onCopy }: { it: PlacedItem; selected: boolean; scale: () => number; onMove: (id: number, x: number, y: number) => void; onSelect: (id: number) => void; onDelete: (id: number) => void; onCopy: (id: number) => void }) {
  const lp = useLongPress(() => onCopy(it.id), 600);
  const drag = useRef<{ px: number; py: number; x: number; y: number } | null>(null);
  const down = (e: RPointerEvent<HTMLImageElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    drag.current = { px: e.clientX, py: e.clientY, x: it.x, y: it.y };
    onSelect(it.id);
    lp.bind.onPointerDown(e);
  };
  const move = (e: RPointerEvent<HTMLImageElement>) => {
    lp.bind.onPointerMove(e);
    const d = drag.current;
    if (!d) return;
    const k = scale();
    onMove(it.id, Math.max(0, Math.min(357, d.x + (e.clientX - d.px) / k)), Math.max(60, Math.min(640, d.y + (e.clientY - d.py) / k)));
  };
  const up = (e: RPointerEvent<HTMLImageElement>) => { drag.current = null; lp.bind.onPointerUp(e); };
  const k = it.size / it.size0;
  const [fx, fy, fw, fh] = it.frame.map((v) => v * k);
  const [cx, cy] = it.chipAt.map((v) => v * k);
  const [tx, ty] = it.trashAt.map((v) => v * k);
  return (
    <>
      <span className="sk-frame" aria-hidden="true" data-selected={selected} style={{ left: it.x + fx, top: it.y + fy, width: fw, height: fh, transform: `rotate(${it.rot + it.spin}deg)` }}><i /><i /><i /><i /></span>
      <img className="sk-sticker sk-sticker--drag" src={it.src} alt="" draggable={false} data-pressing={lp.pressing || undefined} onPointerDown={down} onPointerMove={move} onPointerUp={up} onPointerCancel={up} onClickCapture={lp.bind.onClickCapture} style={{ left: it.x - it.size / 2, top: it.y - it.size / 2, width: it.size, height: it.size, transform: it.spin ? `rotate(${it.spin}deg)` : undefined }} />
      <span className="sk-chip" style={{ left: it.x + cx - 22, top: it.y + cy - 13 }}>{it.chip}</span>
      <TrashChip x={it.x + tx} y={it.y + ty} onClick={() => onDelete(it.id)} />
    </>
  );
}

/** The video circle: a pearly glass rim, the photo, a blue progress arc and a play button. Tap to play: the arc fills and loops. */
export function VideoCircle({ playing, onToggle, progress, onScrub }: { playing: boolean; onToggle: () => void; progress: number; onScrub?: (p: number) => void }) {
  const scrubbing = useRef(false);
  const angle = (e: RPointerEvent<SVGSVGElement>) => {
    const b = e.currentTarget.getBoundingClientRect();
    const deg = (Math.atan2(e.clientY - (b.top + b.height / 2), e.clientX - (b.left + b.width / 2)) * 180) / Math.PI;
    onScrub?.((((deg + 93) % 360) + 360) % 360 / 3.6);
  };
  return (
    <div className="sk-circle" aria-label="Recorded circle">
      <span className="sk-circle__rim" />
      <span className="sk-circle__photo" style={{ backgroundImage: `url(${selfie})` }} />
      <svg
        className="sk-circle__arc" width="344" height="344" viewBox="0 0 344 344" fill="none" aria-hidden="true"
        onPointerDown={(e) => { scrubbing.current = true; e.currentTarget.setPointerCapture(e.pointerId); angle(e); }}
        onPointerMove={(e) => { if (scrubbing.current) angle(e); }} onPointerUp={() => { scrubbing.current = false; }} onPointerCancel={() => { scrubbing.current = false; }}
      >
        <circle cx="172" cy="172" r="160" stroke="transparent" strokeWidth="44" className="sk-circle__track" />
        <circle cx="172" cy="172" r="160" stroke="#3b8ef0" strokeWidth="15" strokeLinecap="round" pathLength="100" strokeDasharray={`${progress} 100`} transform="rotate(-93 172 172)" />
      </svg>
      <button
        type="button" className={`sk-play${playing ? ' is-playing' : ''}`} aria-label={playing ? 'Pause' : 'Play'} aria-pressed={playing} onClick={onToggle}
        onKeyDown={(e) => { if (e.key === 'ArrowRight') onScrub?.(Math.min(100, progress + 5)); if (e.key === 'ArrowLeft') onScrub?.(Math.max(0, progress - 5)); }}
      >
        <svg width="36" height="38" viewBox="0 0 36 38" aria-hidden="true"><path d="M7 4.500v29c0 1.800 2 2.900 3.500 1.900l22-14.500c1.400-.9 1.400-2.900 0-3.800l-22-14.500C9 1.600 7 2.700 7 4.500Z" fill="#fff" fillOpacity=".92" /></svg>
      </button>
    </div>
  );
}

/**
 * The whole circle-editor screen with its state: drag and delete placed stickers, add the selected pack's sticker, play the circle.
 * Gestures: drag a sticker, pinch (two fingers, or ctrl + wheel) to resize and rotate the selected one, press and hold a sticker to copy it,
 * drag around the blue ring to scrub the video.
 */
export function CircleEditorScreen() {
  const [items, setItems] = useState<PlacedItem[]>(initial);
  const [pack, setPack] = useState<Pack>('sky');
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(11);
  const canvas = useRef<HTMLDivElement>(null);
  const nextId = useRef(10);
  const [sel, setSel] = useState(1);
  const base = useRef<{ size: number; spin: number } | null>(null);
  const selRef = useRef(sel); selRef.current = sel;
  const itemsRef = useRef(items); itemsRef.current = items;
  const pinch = usePinch(canvas, ({ scale, rotate }) => {
    const cur = itemsRef.current.find((it) => it.id === selRef.current);
    if (!cur) return;
    if (!base.current) base.current = { size: cur.size, spin: cur.spin };
    const b = base.current;
    setItems((l) => l.map((it) => (it.id === cur.id ? { ...it, size: Math.max(56, Math.min(240, b.size * scale)), spin: b.spin + rotate } : it)));
  }, { min: 0.4, max: 2.4, onEnd: () => { base.current = null; pinch.reset(); base.current = null; } });
  const copy = (id: number) => setItems((l) => {
    const src = l.find((it) => it.id === id);
    if (!src || l.length >= 8) return l;
    const nid = nextId.current++;
    setSel(nid);
    return [...l, { ...src, id: nid, x: Math.min(340, src.x + 26), y: Math.min(620, src.y + 26), chip: 'x1' }];
  });

  useEffect(() => {
    if (!playing) return;
    const t = window.setInterval(() => setProgress((p) => (p >= 100 ? 4 : p + 0.8)), 50);
    return () => window.clearInterval(t);
  }, [playing]);

  // screen pixels per canvas pixel (the canvas is scaled by CSS zoom and by the preview zoom)
  const scale = () => (canvas.current ? canvas.current.getBoundingClientRect().width / 357 : 1);
  const move = (id: number, x: number, y: number) => setItems((l) => l.map((it) => (it.id === id ? { ...it, x, y } : it)));
  const remove = (id: number) => setItems((l) => l.filter((it) => it.id !== id));
  const add = (p: Pack) => {
    setPack(p);
    setItems((l) => (l.length >= 6 ? l : [...l, { id: nextId.current++, src: packSrc[p], x: 150 + (l.length % 3) * 28, y: 290 + (l.length % 2) * 30, size: 100, rot: (l.length % 3) * 3 - 3, chip: 'x1', size0: 100, spin: 0, frame: [-56, -60, 112, 112], chipAt: [8, 74], trashAt: [60, -62] }]));
  };

  return (
    <StickerCanvas ref={canvas}>
      <p className="sk-pause">Pause</p>
      <VideoCircle playing={playing} onToggle={() => setPlaying((p) => !p)} progress={progress} onScrub={setProgress} />
      {items.map((it) => <PlacedSticker key={it.id} it={it} selected={sel === it.id} scale={scale} onMove={move} onSelect={setSel} onDelete={remove} onCopy={copy} />)}
      <section className="sk-bar" aria-label="Sticker packs">
        <span className="sk-grab" aria-hidden="true" />
        <PackTabs className="sk-tabs--bar" value={pack} onChange={add} />
      </section>
      <StickerHomeBar />
    </StickerCanvas>
  );
}
