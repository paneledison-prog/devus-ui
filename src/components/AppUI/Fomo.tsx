import { useRef, useState, type ReactNode } from 'react';
import { TiltButton, useDrift, useTiltAuto } from './gestures';
import './Fomo.css';
import cowboy from './assets/fomo/cowboy.jpg';
import frog from './assets/fomo/frog.jpg';
import mush from './assets/fomo/mushroom.jpg';
import cat from './assets/fomo/cat.jpg';
import snake from './assets/fomo/snake.jpg';
import duck from './assets/fomo/duck.jpg';
import creature from './assets/fomo/creature.jpg';
import astro from './assets/fomo/astro.jpg';
import anime from './assets/fomo/anime.jpg';
import dog from './assets/fomo/dog.jpg';
import gold from './assets/fomo/gold.jpg';

/*
 * "Fomo" welcome screen, drawn on a 473x1023 canvas that is scaled to the 320px phone (320 / 473).
 * Coordinates are canvas pixels taken from the reference image. The avatars are generated image assets.
 */

export function FomoCanvas({ children }: { children: ReactNode }) {
  return <div className="fm">{children}</div>;
}

/** Thin olive rays that fan out from the logo behind the avatars. */
export function Rays() {
  const cx = 237; const cy = 376;
  const angles = Array.from({ length: 24 }, (_, i) => i * 15 + 7.5);
  return (
    <svg className="fm-rays" width="473" height="1023" viewBox="0 0 473 1023" aria-hidden="true" focusable="false">
      <defs>
        <radialGradient id="fm-ray" gradientUnits="userSpaceOnUse" cx={cx} cy={cy} r="470"><stop offset="0" stopColor="#7d8a3c" stopOpacity="0" /><stop offset=".22" stopColor="#8a9440" stopOpacity=".55" /><stop offset="1" stopColor="#5f6a30" stopOpacity="0" /></radialGradient>
      </defs>
      {angles.map((a) => {
        const r = (a * Math.PI) / 180;
        return <line key={a} x1={cx + Math.cos(r) * 90} y1={cy + Math.sin(r) * 90} x2={cx + Math.cos(r) * 520} y2={cy + Math.sin(r) * 520} stroke="url(#fm-ray)" strokeWidth="2.200" />;
      })}
    </svg>
  );
}

/** A round avatar: an image inside a ring. `blur` softens it as in the reference; `ring` is the border color. */
function Avatar({ src, x, y, r, blur = 0, ring = '#fff', ringW = 3, shade = 0, zoom = 1, pos = '50% 50%' }: { src: string; x: number; y: number; r: number; blur?: number; ring?: string; ringW?: number; shade?: number; zoom?: number; pos?: string }) {
  const drift = useDrift(Math.round(40 - r * 0.3));
  return (
    <span ref={drift.ref} className="fm-av" data-dragging={drift.dragging || undefined} {...drift.bind} style={{ left: x - r, top: y - r, width: r * 2, height: r * 2, borderColor: ring, borderWidth: ringW, filter: blur ? `blur(${blur}px)` : undefined, ...drift.style }}>
      <img src={src} alt="" style={{ objectPosition: pos, transform: `scale(${zoom})`, transformOrigin: pos }} />
      {shade > 0 && <i style={{ background: `rgb(0 0 0 / ${shade})` }} />}
    </span>
  );
}

/** Meme avatars. Tilt the phone (or move the pointer over it) and they drift at different depths; drag one and let go to fling it, it springs back. */
export function Avatars() {
  const root = useRef<HTMLDivElement>(null);
  const tilt = useTiltAuto(root);
  return (
    <div ref={root} className="fm-avatars">
      <TiltButton tilt={tilt} />
      <Avatar src={dog} x={249} y={-8} r={100} ring="#2f6a58" ringW={6} shade={0.25} />
      <Avatar src={astro} x={-22} y={118} r={88} ring="#d8e3e6" ringW={5} />
      <Avatar src={anime} x={503} y={130} r={100} ring="#b9bfd0" ringW={5} shade={0.1} />
      <Avatar src={frog} x={93} y={235} r={45} blur={5} ring="transparent" ringW={0} />
      <Avatar src={mush} x={380} y={235} r={40} blur={5} ring="transparent" ringW={0} shade={0.25} />
      <Avatar src={cowboy} x={236} y={175} r={51} ringW={4} zoom={1.9} pos="62% 28%" />
      <Avatar src={cat} x={30} y={380} r={37} ringW={4} />
      <Avatar src={snake} x={430} y={380} r={41} ringW={4} />
      <Avatar src={gold} x={-13} y={640} r={84} blur={3} ring="transparent" ringW={0} shade={0.15} />
      <Avatar src={gold} x={483} y={640} r={78} blur={1} ring="#7a2a22" ringW={4} shade={0.1} />
      <Avatar src={duck} x={380} y={520} r={39} ringW={4} ring="#f2e4c4" zoom={2} pos="46% 60%" />
      <Avatar src={creature} x={236} y={582} r={63} ringW={4} ring="#dfe6ea" zoom={1.4} pos="50% 20%" />
      <span className="fm-glow" style={{ left: 64, top: 497, width: 54, height: 54 }} aria-hidden="true" />
    </div>
  );
}

export function Logo() {
  return (
    <svg className="fm-logo" width="473" height="110" viewBox="0 321 473 110" role="img" aria-label="FOMO">
      <text x="237" y="404" textAnchor="middle" fill="#fff" fontFamily="var(--font-sans)" fontWeight="900" fontSize="88" fontStyle="italic" letterSpacing="-4" stroke="#fff" strokeWidth="5" strokeLinejoin="round" paintOrder="stroke" transform="skewX(-10) translate(66 0)">FOMO</text>
    </svg>
  );
}

const Apple = () => (
  <svg width="24" height="28" viewBox="0 0 26 30" fill="#000" aria-hidden="true"><path d="M21.400 15.900c0-3.300 2.700-4.900 2.800-5-1.500-2.200-3.900-2.500-4.700-2.600-2-.2-3.900 1.200-4.900 1.200s-2.600-1.200-4.300-1.100c-2.200 0-4.200 1.300-5.300 3.200-2.300 4-.6 9.800 1.600 13 1.100 1.600 2.400 3.300 4.100 3.300 1.600-.1 2.300-1 4.200-1s2.500 1 4.200 1 2.900-1.600 3.900-3.200c1.300-1.800 1.800-3.600 1.800-3.700-.1 0-3.400-1.300-3.400-5.100ZM18.200 6.300c.9-1.100 1.500-2.600 1.300-4.100-1.300.1-2.900.9-3.800 2-.8.900-1.500 2.500-1.300 3.900 1.500.1 2.900-.7 3.800-1.800Z" /></svg>
);

export function Welcome() {
  const [busy, setBusy] = useState<'apple' | 'phone' | null>(null);
  const go = (k: 'apple' | 'phone') => { if (busy) return; setBusy(k); window.setTimeout(() => setBusy(null), 1600); };
  return (
    <section className="fm-welcome" aria-label="Welcome">
      <h1 className="fm-welcome__title">Welcome to Fomo</h1>
      <p className="fm-welcome__sub">Trade the hottest memecoins</p>
      <button type="button" className="fm-btn fm-btn--apple" aria-busy={busy === 'apple'} disabled={!!busy} onClick={() => go('apple')}>{busy === 'apple' ? <i className="fm-spin" aria-hidden="true" /> : <Apple />}<span>Continue with Apple</span></button>
      <button type="button" className="fm-btn fm-btn--phone" aria-busy={busy === 'phone'} disabled={!!busy} onClick={() => go('phone')}>{busy === 'phone' && <i className="fm-spin fm-spin--light" aria-hidden="true" />}<span>Continue with Phone</span></button>
    </section>
  );
}

export function FomoHomeBar() { return <span className="fm-home" aria-hidden="true" />; }
