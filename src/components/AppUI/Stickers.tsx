import type { CSSProperties, ReactNode } from 'react';
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

export function StickerCanvas({ children }: { children: ReactNode }) {
  return <div className="sk">{children}</div>;
}

/** Dynamic Island plus the right side of the status bar (the reference shows no time). */
export function StickerStatusBar() {
  return (
    <div className="sk-status" aria-hidden="true">
      <span className="sk-status__island"><i /></span>
      <svg className="sk-status__signal" width="19" height="12" viewBox="0 0 22 14" fill="currentColor"><rect x="0" y="9" width="3.600" height="5" rx="1.100" /><rect x="6" y="6.500" width="3.600" height="7.500" rx="1.100" /><rect x="12" y="3.500" width="3.600" height="10.500" rx="1.100" /><rect x="18" y="0" width="3.600" height="14" rx="1.100" /></svg>
      <svg className="sk-status__wifi" width="17" height="13" viewBox="0 0 24 18" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><path d="M2 6.500a14 14 0 0 1 20 0" /><path d="M6 11a8.500 8.500 0 0 1 12 0" /><circle cx="12" cy="15.400" r="1.800" fill="currentColor" stroke="none" /></svg>
      <svg className="sk-status__battery" width="26" height="12" viewBox="0 0 32 14" fill="none"><rect x="0.500" y="0.500" width="27" height="13" rx="4" stroke="currentColor" opacity=".4" /><rect x="2.500" y="2.500" width="23" height="9" rx="2.400" fill="currentColor" /><rect x="29" y="4.500" width="2.200" height="5" rx="1.100" fill="currentColor" opacity=".45" /></svg>
    </div>
  );
}

export function StickerHomeBar() { return <span className="sk-home" aria-hidden="true" />; }

export const stickers = { rainbow, egg, leaves, beer, peace, heart };

/** A tab of the sticker pack row: the first is selected (blue tile). */
export function PackTabs({ className = '' }: { className?: string }) {
  return (
    <div className={`sk-tabs ${className}`} role="tablist" aria-label="Sticker packs">
      <button type="button" role="tab" aria-selected="true" className="sk-tab sk-tab--on" aria-label="Sky"><img src={rainbow} alt="" /></button>
      <button type="button" role="tab" aria-selected="false" className="sk-tab" aria-label="Food"><img src={egg} alt="" /></button>
      <button type="button" role="tab" aria-selected="false" className="sk-tab" aria-label="Autumn"><img src={leaves} alt="" /></button>
    </div>
  );
}

export function Sticker({ src, style, className = '' }: { src: string; style: CSSProperties; className?: string }) {
  return <img className={`sk-sticker ${className}`} src={src} alt="" style={style} />;
}

/** The blurred camera photo behind the picker sheet. */
export function BlurredPhoto() {
  return (
    <div className="sk-blur" aria-hidden="true">
      <img src={selfie} alt="" />
    </div>
  );
}

/** The sticker sheet at the bottom of the left screen. */
export function StickerSheet() {
  return (
    <section className="sk-sheet" aria-label="Stickers">
      <span className="sk-grab" aria-hidden="true" />
      <PackTabs className="sk-tabs--sheet" />
      <Sticker src={rainbow} style={{ left: 36, top: 108, width: 118, height: 118 }} />
      <Sticker src={beer} style={{ left: 184, top: 128, width: 118, height: 118 }} />
      <Sticker src={peace} style={{ left: 46, top: 233, width: 118, height: 118 }} />
      <Sticker src={heart} style={{ left: 199, top: 238, width: 118, height: 118 }} />
      <h2 className="sk-sheet__title">stickers</h2>
      <button type="button" className="sk-close" aria-label="Close stickers"><svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2.400" strokeLinecap="round" aria-hidden="true"><path d="m2 2 10 10M12 2 2 12" /></svg></button>
    </section>
  );
}

/* ---------- circle editor ---------- */
const Trash = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.600" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M2.500 4h11M6 4V2.500h4V4M4 4l.7 9.500h6.600L12 4M6.700 6.500v5M9.300 6.500v5" /></svg>
);

export function TrashChip({ x, y, size = 30 }: { x: number; y: number; size?: number }) {
  return <button type="button" className="sk-trash" aria-label="Delete sticker" style={{ left: x - size / 2, top: y - size / 2, width: size, height: size }}><Trash /></button>;
}

/** A sticker placed on the circle, inside a thin selection frame with a count chip. */
export function Placed({ src, frame, size, at, chip, chipAt }: { src: string; frame: { x: number; y: number; w: number; h: number; rot: number }; size: number; at: [number, number]; chip: string; chipAt: [number, number] }) {
  return (
    <>
      <span className="sk-frame" aria-hidden="true" style={{ left: frame.x, top: frame.y, width: frame.w, height: frame.h, transform: `rotate(${frame.rot}deg)` }}><i /><i /><i /><i /></span>
      <img className="sk-sticker" src={src} alt="" style={{ left: at[0] - size / 2, top: at[1] - size / 2, width: size, height: size }} />
      <span className="sk-chip" style={{ left: chipAt[0] - 22, top: chipAt[1] - 13 }}>{chip}</span>
    </>
  );
}

/** The video circle: a pearly glass rim, the photo, a blue progress arc and a play button. */
export function VideoCircle() {
  return (
    <div className="sk-circle" aria-label="Recorded circle">
      <span className="sk-circle__rim" />
      <span className="sk-circle__photo" style={{ backgroundImage: `url(${selfie})` }} />
      <svg className="sk-circle__arc" width="344" height="344" viewBox="0 0 344 344" fill="none" aria-hidden="true"><path d="M163.600 12.200A160 160 0 0 1 266 42.600" stroke="#3b8ef0" strokeWidth="15" strokeLinecap="round" /></svg>
      <button type="button" className="sk-play" aria-label="Play"><svg width="36" height="38" viewBox="0 0 36 38" aria-hidden="true"><path d="M7 4.500v29c0 1.800 2 2.900 3.500 1.900l22-14.500c1.400-.9 1.400-2.900 0-3.800l-22-14.500C9 1.600 7 2.700 7 4.500Z" fill="#fff" fillOpacity=".92" /></svg></button>
    </div>
  );
}
