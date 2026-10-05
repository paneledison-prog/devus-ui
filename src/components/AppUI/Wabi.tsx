import { useState, type ReactNode } from 'react';
import './Wabi.css';
import swirl from './assets/wabi/swirl.jpg';
import irid from './assets/wabi/irid.jpg';
import mush from './assets/wabi/mushroom.jpg';
import hills from './assets/wabi/hills.jpg';
import teal from './assets/wabi/teal.jpg';
import rainbow from './assets/wabi/rainbow.jpg';
import hikers from './assets/wabi/hikers.jpg';
import headphones from './assets/wabi/headphones.jpg';
import laugh from './assets/wabi/laugh.jpg';
import flower from './assets/wabi/flower.jpg';
import dalmatian from './assets/wabi/dalmatian.jpg';
import smoke from './assets/wabi/smoke.jpg';
import jump from './assets/wabi/jump.jpg';
import sun from './assets/wabi/sun.jpg';
import ball from './assets/wabi/ball.jpg';

/*
 * "Wabi" welcome screen, drawn on a 736x1472 canvas scaled to the 320px phone (320 / 736).
 * It is a cropped screenshot: the status bar is cut off at the top, as in the reference image.
 * The sphere photos are generated image assets.
 */

export function WabiCanvas({ children }: { children: ReactNode }) {
  return <div className="wb">{children}</div>;
}

/** The status bar of the cropped screenshot: only its lower edge is visible. */
export function WabiStatusBar() {
  return (
    <div className="wb-status" aria-hidden="true">
      <span className="wb-status__back">&#9666; TestFlight</span>
      <span className="wb-status__sig" />
      <span className="wb-status__bat" />
    </div>
  );
}

export function WabiLogo() {
  return (
    <svg className="wb-logo" width="96" height="60" viewBox="0 0 96 60" aria-label="Wabi" role="img">
      <g fill="#dcdcdc"><circle cx="18" cy="16" r="17" /><circle cx="48" cy="16" r="17" /><circle cx="78" cy="16" r="17" /><circle cx="33" cy="42" r="17" /><circle cx="63" cy="42" r="17" /></g>
      <g fill="#e9e9e9"><circle cx="48" cy="16" r="12" /><circle cx="33" cy="42" r="11" /></g>
    </svg>
  );
}

/** One glass sphere with a photo inside, a rim and soft highlights. */
function Sphere({ src, x, y, r, pos = '50% 50%', zoom = 1.15, wave = false }: { src: string; x: number; y: number; r: number; pos?: string; zoom?: number; wave?: boolean }) {
  return (
    <span className={`wb-sphere${wave ? ' is-wave' : ''}`} style={{ left: x - r, top: y - r, width: r * 2, height: r * 2, animationDelay: wave ? `${Math.round((x + y) / 6)}ms` : undefined }}>
      <img src={src} alt="" style={{ objectPosition: pos, transform: `scale(${zoom})`, transformOrigin: pos }} />
      <i className="wb-sphere__rim" />
      <i className="wb-sphere__hl" />
    </span>
  );
}

export function Spheres() {
  const [wave, setWave] = useState(false);
  const poke = () => { setWave(false); window.requestAnimationFrame(() => setWave(true)); window.setTimeout(() => setWave(false), 1400); };
  return (
    <div className="wb-spheres">
      <Sphere wave={wave} src={jump} x={685} y={288} r={64} zoom={1.5} pos="50% 38%" />
      <Sphere wave={wave} src={swirl} x={105} y={360} r={92} />
      <Sphere wave={wave} src={irid} x={62} y={452} r={94} />
      <Sphere wave={wave} src={mush} x={265} y={402} r={72} />
      <Sphere wave={wave} src={rainbow} x={403} y={372} r={68} />
      <Sphere wave={wave} src={ball} x={630} y={365} r={62} zoom={2.4} />
      <Sphere wave={wave} src={sun} x={722} y={416} r={50} />
      <Sphere wave={wave} src={hills} x={190} y={476} r={76} />
      <Sphere wave={wave} src={teal} x={355} y={436} r={60} zoom={2.4} pos="45% 55%" />
      <Sphere wave={wave} src={hikers} x={503} y={410} r={82} zoom={1.7} pos="45% 62%" />
      <Sphere wave={wave} src={dalmatian} x={43} y={556} r={62} zoom={1.3} pos="50% 40%" />
      <Sphere wave={wave} src={smoke} x={142} y={578} r={50} />
      <Sphere wave={wave} src={flower} x={278} y={555} r={102} zoom={1.3} pos="50% 30%" />
      <Sphere wave={wave} src={laugh} x={646} y={532} r={112} zoom={1.6} pos="35% 30%" />
      <Sphere wave={wave} src={headphones} x={460} y={552} r={118} zoom={1.7} pos="62% 38%" />
      <button type="button" className={`wb-plus${wave ? ' is-on' : ''}`} aria-label="Add" onClick={poke}><span className="wb-plus__shine" /><svg width="34" height="34" viewBox="0 0 34 34" fill="none" stroke="#222" strokeWidth="2.600" strokeLinecap="round"><path d="M17 4v26M4 17h26" /></svg></button>
    </div>
  );
}

const Google = () => (
  <svg width="46" height="46" viewBox="0 0 48 48" aria-hidden="true"><path fill="#EA4335" d="M24 9.500c3.500 0 6.600 1.200 9.100 3.600l6.800-6.800C35.800 2.400 30.300 0 24 0 14.600 0 6.500 5.400 2.600 13.200l7.900 6.200C12.400 13.600 17.700 9.500 24 9.500Z" /><path fill="#4285F4" d="M46.500 24.500c0-1.600-.1-3.100-.4-4.500H24v9h12.700c-.6 3-2.200 5.500-4.700 7.200l7.600 5.900c4.400-4.100 6.900-10.100 6.900-17.600Z" /><path fill="#FBBC05" d="M10.500 28.600c-.5-1.500-.8-3-.8-4.600s.3-3.100.8-4.600l-7.900-6.200C.9 16.500 0 20.100 0 24s.9 7.500 2.600 10.800l7.900-6.200Z" /><path fill="#34A853" d="M24 48c6.500 0 11.900-2.100 15.900-5.800l-7.600-5.900c-2.100 1.400-4.900 2.300-8.300 2.300-6.300 0-11.600-4.100-13.500-9.800l-7.900 6.200C6.500 42.600 14.600 48 24 48Z" /></svg>
);
const Apple = () => (
  <svg width="36" height="42" viewBox="0 0 26 30" fill="#fff" aria-hidden="true"><path d="M21.400 15.900c0-3.300 2.700-4.900 2.800-5-1.500-2.200-3.900-2.500-4.700-2.600-2-.2-3.900 1.200-4.900 1.200s-2.600-1.200-4.300-1.100c-2.200 0-4.200 1.300-5.300 3.200-2.300 4-.6 9.800 1.600 13 1.100 1.600 2.400 3.300 4.100 3.300 1.600-.1 2.300-1 4.200-1s2.500 1 4.200 1 2.900-1.600 3.900-3.200c1.300-1.800 1.800-3.600 1.800-3.700-.1 0-3.400-1.300-3.400-5.100ZM18.200 6.300c.9-1.100 1.500-2.600 1.300-4.100-1.300.1-2.900.9-3.800 2-.8.900-1.500 2.500-1.300 3.900 1.500.1 2.900-.7 3.800-1.800Z" /></svg>
);

export function Pitch() {
  const [busy, setBusy] = useState<'google' | 'apple' | null>(null);
  const go = (k: 'google' | 'apple') => { if (busy) return; setBusy(k); window.setTimeout(() => setBusy(null), 1600); };
  return (
    <section className="wb-pitch" aria-label="Welcome">
      <h1 className="wb-pitch__title">Meet Wabi.<br />The first personal<br />software platform.</h1>
      <button type="button" className="wb-btn wb-btn--google" aria-busy={busy === 'google'} disabled={!!busy} onClick={() => go('google')}>{busy === 'google' ? <i className="wb-spin" aria-hidden="true" /> : <Google />}<span>Continue with Google</span></button>
      <button type="button" className="wb-btn wb-btn--apple" aria-busy={busy === 'apple'} disabled={!!busy} onClick={() => go('apple')}>{busy === 'apple' ? <i className="wb-spin wb-spin--light" aria-hidden="true" /> : <Apple />}<span>Continue with Apple</span></button>
    </section>
  );
}
