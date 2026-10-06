import { useEffect, useRef, useState, type ReactNode } from 'react';
import { TiltButton, useFling, useHold, useLongPress, usePinch, useScrub, useSwipe, useTiltAuto } from '../AppUI/gestures';
import './Board.css';
import './Motion.css';
import man from './assets/board/man.jpg';
import street from './assets/board/street.jpg';
import cat from './assets/board/cat.png';
import couple from './assets/board/couple.jpg';
import zion from './assets/board/zion.jpg';
import car from './assets/board/car.jpg';
import side from './assets/board/side.jpg';
import lamp from './assets/board/lamp.png';

/*
 * Twelve live 286x286 widgets, each exported on its own.
 * Layout and sizes come from the reference image; pictures are generated image assets.
 */

const frozen = () => new URLSearchParams(window.location.search).get('bench') === '1';

function Tile({ className, label, children, onClick, hostRef, bind }: { className: string; label: string; children: ReactNode; onClick?: () => void; hostRef?: { current: HTMLElement | null }; bind?: object }) {
  return <section ref={(el) => { if (hostRef) hostRef.current = el; }} className={`wd ${className}`} aria-label={label} data-still={frozen() || undefined} onClick={onClick} {...bind}>{children}</section>;
}

/* 1. weather */
/** WeatherWidget. */
export function WeatherWidget() {
  const [f, setF] = useState(false);
  return (
    <Tile className="wd-weather" label={f ? 'Weather, Fahrenheit (tap to switch)' : 'Weather, Celsius (tap to switch)'} onClick={() => setF((v) => !v)}>
      <p><span>It&rsquo;s </span><b>{f ? '37°F' : '3°'}</b><span> now</span><br /><span>in </span><em>Tokyo.</em><br /><span>Will be </span><b>rainy</b><br /><b>and cold.</b></p>
    </Tile>
  );
}

/* 2. meeting */
/** MeetingWidget. */
export function MeetingWidget() {
  const [added, setAdded] = useState(false);
  return (
    <Tile className="wd-meeting" label="Meeting with Jack Reed">
      <img className="wd-meeting__av" src={man} alt="" />
      <b className="wd-meeting__t">Meeting</b>
      <span className="wd-meeting__w">with <em>@JackReed</em></span>
      <div className="wd-meeting__card"><img src={street} alt="" /><i>SAITO<br />&#12378;&#12375;&#12373;&#12356;&#12392;&#12358;</i></div>
      <button type="button" className="wd-meeting__chip" aria-pressed={added} onClick={() => setAdded((v) => !v)}>
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="#fff" strokeWidth="1.600" strokeLinecap="round" aria-hidden="true"><rect x="2" y="3" width="14" height="13" rx="3" /><path d="M2 7h14M6 1.500v3M12 1.500v3" />{added && <path d="m6 11.500 2 2 4-4" />}</svg>
        {added ? 'Added to calendar' : '12 Jan, 20:00'}
      </button>
    </Tile>
  );
}

/* 3. timer */
/** TimerWidget. */
export function TimerWidget() {
  const [run, setRun] = useState(false);
  const [s, setS] = useState(0);
  useEffect(() => {
    if (!run || frozen()) return;
    const t = window.setInterval(() => setS((v) => v + 1), 1000);
    return () => window.clearInterval(t);
  }, [run]);
  const p = (n: number) => String(n).padStart(2, '0');
  const reset = useHold(() => { setS(0); setRun(false); }, 700);
  const fling = useFling();
  return (
    <Tile className="wd-timer" label="Timer">
      <button type="button" className="wd-timer__play" aria-label={run ? 'Pause timer' : 'Start timer'} aria-pressed={run} onClick={() => setRun((v) => !v)}>
        <span>{run ? <svg width="18" height="20" viewBox="0 0 18 20" fill="#2a2a2a" aria-hidden="true"><rect x="2" y="2" width="5" height="16" rx="1.500" /><rect x="11" y="2" width="5" height="16" rx="1.500" /></svg> : <svg width="18" height="20" viewBox="0 0 18 20" fill="#2a2a2a" aria-hidden="true"><path d="M3 2v16l13-8L3 2Z" /></svg>}</span>
      </button>
      <button type="button" className="wd-timer__time" aria-label="Press and hold to reset the timer" data-hold={reset.holding ? '' : undefined} style={{ ['--hold' as string]: reset.progress }} {...reset.bind}>{p(Math.floor(s / 3600))}:{p(Math.floor((s % 3600) / 60))}:{p(s % 60)}</button>
      <img className="wd-cat" src={cat} alt="" draggable={false} data-dragging={fling.dragging || undefined} style={{ translate: `${fling.pos.x}px ${fling.pos.y}px` }} {...fling.bind} />
    </Tile>
  );
}

/* 4. AI photo */
/** AiPhotoWidget. */
export function AiPhotoWidget() {
  const [ok, setOk] = useState(false);
  const [edit, setEdit] = useState(false);
  const host = useRef<HTMLElement | null>(null);
  const [zoom, setZoom] = useState({ s: 1, snap: false });
  const pinch = usePinch(host, ({ scale }) => setZoom({ s: scale, snap: false }), { min: 1, max: 2.6, onEnd: () => { pinch.reset(); setZoom({ s: 1, snap: true }); } });
  return (
    <Tile className="wd-ai" label="Suggested photo" hostRef={host}>
      <img src={couple} alt="" draggable={false} data-snap={zoom.snap || undefined} style={{ scale: zoom.s }} />
      <button type="button" className={`wd-ai__edit${edit ? ' is-on' : ''}`} aria-label="Edit photo" aria-pressed={edit} onClick={() => setEdit((v) => !v)}><svg width="26" height="26" viewBox="0 0 26 26" fill="#2a1a14" aria-hidden="true"><path d="m4 22 1-5L17 5l4 4L9 21l-5 1Z" /></svg></button>
      <button type="button" className="wd-ai__chip" aria-pressed={ok} onClick={() => setOk((v) => !v)}>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="#fff" aria-hidden="true"><rect x="2" y="3" width="14" height="14" rx="3" /><path d="M16 2v4M14 4h4" stroke="#fff" strokeWidth="1.600" /></svg>
        {ok ? 'accepted' : 'suggested by AI'}
      </button>
      {edit && <span className="wd-ai__tag">Editing</span>}
    </Tile>
  );
}

/* 5. profile pills */
/** ProfileWidget. */
export function ProfileWidget() {
  const [on, setOn] = useState<[boolean, boolean, boolean]>([false, false, false]);
  const base = [8, 4, 9];
  const flip = (i: number) => setOn((o) => o.map((v, j) => (j === i ? !v : v)) as [boolean, boolean, boolean]);
  const icons = [
    <svg key="h" width="18" height="16" viewBox="0 0 18 16" fill="#fff" aria-hidden="true"><path d="M9 15S1 10.500 1 5.500A4 4 0 0 1 9 4a4 4 0 0 1 8 1.500C17 10.500 9 15 9 15Z" /></svg>,
    <svg key="c" width="18" height="18" viewBox="0 0 18 18" fill="#fff" aria-hidden="true"><path d="M9 1c4.500 0 8 3 8 7s-3.500 7-8 7c-1 0-2-.1-3-.4L2 16l1-3.400C1.800 11.300 1 9.800 1 8c0-4 3.500-7 8-7Z" /><circle cx="6" cy="8" r="1" fill="#e8542a" /><circle cx="9" cy="8" r="1" fill="#e8542a" /><circle cx="12" cy="8" r="1" fill="#e8542a" /></svg>,
    <svg key="s" width="18" height="18" viewBox="0 0 18 18" fill="#fff" aria-hidden="true"><path d="M16 2 2 8l5 2 2 5 7-13Z" /></svg>,
  ];
  const names = ['Like', 'Comment', 'Share'];
  return (
    <Tile className="wd-profile" label="Hiroto_98">
      <span className="wd-profile__ball" aria-hidden="true"><svg width="86" height="86" viewBox="0 0 86 86" fill="none" stroke="#e0517f" strokeWidth="5" strokeLinecap="round"><circle cx="43" cy="43" r="33" /><path d="M18 24c14 6 30 24 36 50M12 48c20-4 44 0 62 10M32 12c4 18 14 34 36 44" /></svg></span>
      <p className="wd-profile__name">Hiroto_98 <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true"><circle cx="10" cy="10" r="10" fill="#e8542a" /><path d="m5.500 10.500 3 3 6-6.500" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg></p>
      <div className="wd-profile__pills">
        {[0, 1, 2].map((i) => <button key={i} type="button" aria-pressed={on[i]} aria-label={`${names[i]}, ${base[i] + (on[i] ? 1 : 0)}`} className={on[i] ? 'is-on' : ''} onClick={() => flip(i)}>{icons[i]}{base[i] + (on[i] ? 1 : 0)}</button>)}
      </div>
    </Tile>
  );
}

/* 6. contact */
/** ContactWidget. */
export function ContactWidget() {
  const [act, setAct] = useState<string | null>(null);
  const [fav, setFav] = useState(false);
  const lp = useLongPress(() => setFav((v) => !v), 500);
  useEffect(() => { if (!act) return; const t = window.setTimeout(() => setAct(null), 1600); return () => window.clearTimeout(t); }, [act]);
  const btn = (id: string, label: string, icon: ReactNode) => <button type="button" aria-label={label} className={act === id ? 'is-on' : ''} onClick={() => setAct(id)}>{icon}</button>;
  return (
    <Tile className="wd-contact" label="Zion Carter">
      <img className={`wd-contact__av${fav ? ' is-fav' : ''}`} data-pressing={lp.pressing || undefined} src={zion} alt="" draggable={false} {...lp.bind} />
      <b className="wd-contact__name">Zion Carter</b>
      <span className="wd-contact__sub">{act === 'call' ? 'Calling…' : act === 'chat' ? 'Opening chat…' : act === 'video' ? 'Starting video…' : fav ? 'favorite \u2605' : 'best dude'}</span>
      <div className="wd-contact__btns">
        {btn('call', 'Call', <svg width="26" height="26" viewBox="0 0 26 26" fill="#d4f04a" aria-hidden="true"><path d="M7 3.500c1-.8 2.400-.5 3.100.6l1.500 2.400c.6 1 .4 2.200-.5 3l-.9.8c1.200 2.200 2.900 3.900 5.100 5.100l.8-.9c.8-.9 2-1.100 3-.5l2.400 1.500c1.100.7 1.400 2.100.6 3.100l-1 1.300c-1.300 1.600-3.500 2.100-5.400 1.300C11 20 6 15 3.500 9.300 2.700 7.400 3.200 5.200 4.800 3.900L7 3.500Z" /></svg>)}
        {btn('chat', 'Message', <svg width="26" height="26" viewBox="0 0 26 26" fill="#d4f04a" aria-hidden="true"><path d="M13 3c5.500 0 10 3.600 10 8.500S18.500 20 13 20c-1.300 0-2.600-.2-3.700-.6L4 22l1.400-4.300C3.900 16.200 3 14 3 11.500 3 6.600 7.500 3 13 3Z" /></svg>)}
        {btn('video', 'Video call', <svg width="28" height="22" viewBox="0 0 28 22" fill="#d4f04a" aria-hidden="true"><rect x="2" y="3" width="17" height="16" rx="4.500" /><path d="m21 8 6-4v14l-6-4V8Z" /></svg>)}
      </div>
    </Tile>
  );
}

/* 7. drone */
/** DroneWidget. */
export function DroneWidget() {
  const [pct, setPct] = useState(38);
  const [on, setOn] = useState(true);
  const scrub = useScrub((f) => setPct(Math.max(5, Math.round(f * 100))));
  useEffect(() => {
    if (!on || frozen()) return;
    const t = window.setInterval(() => setPct((p) => (p >= 100 ? 100 : p + 1)), 400);
    return () => window.clearInterval(t);
  }, [on]);
  return (
    <Tile className="wd-drone" label="Drone battery">
      <svg className="wd-drone__ico" width="82" height="82" viewBox="0 0 82 82" fill="none" stroke="#8a8a8a" strokeWidth="4" aria-hidden="true"><circle cx="16" cy="16" r="12" /><circle cx="66" cy="16" r="12" /><circle cx="16" cy="66" r="12" /><circle cx="66" cy="66" r="12" /><path d="M24 24 58 58M58 24 24 58" strokeWidth="9" strokeLinecap="round" /></svg>
      <button type="button" className="wd-drone__more" aria-label="More" onClick={() => setOn((v) => !v)}><svg width="24" height="6" viewBox="0 0 24 6" fill="#ddd" aria-hidden="true"><circle cx="3" cy="3" r="2.500" /><circle cx="12" cy="3" r="2.500" /><circle cx="21" cy="3" r="2.500" /></svg></button>
      <b className="wd-drone__n">Dron DJI Neo</b><span className="wd-drone__m">1435 mAh</span>
      <div className="wd-drone__bar" role="slider" tabIndex={0} aria-label="Battery charge, drag to set" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100} data-active={scrub.active || undefined} {...scrub.bind} onKeyDown={(e) => { if (e.key === 'ArrowRight') setPct((p) => Math.min(100, p + 5)); if (e.key === 'ArrowLeft') setPct((p) => Math.max(5, p - 5)); }}><i style={{ width: `${Math.max(12, pct * 2.2)}px` }} /></div>
      <span className="wd-drone__s">{on ? `⚡ Charging…` : 'Paused'}</span>
    </Tile>
  );
}

/* 8. flight board: 5x7 dot-matrix text */
const FONT: Record<string, string[]> = {
  T: ['11111', '00100', '00100', '00100', '00100', '00100', '00100'],
  O: ['01110', '10001', '10001', '10001', '10001', '10001', '01110'],
  K: ['10001', '10010', '10100', '11000', '10100', '10010', '10001'],
  Y: ['10001', '10001', '01010', '00100', '00100', '00100', '00100'],
  '1': ['00100', '01100', '00100', '00100', '00100', '00100', '01110'],
  '5': ['11111', '10000', '11110', '00001', '00001', '10001', '01110'],
  J: ['00111', '00010', '00010', '00010', '00010', '10010', '01100'],
  A: ['01110', '10001', '10001', '11111', '10001', '10001', '10001'],
  N: ['10001', '11001', '10101', '10011', '10001', '10001', '10001'],
  '3': ['11110', '00001', '00001', '01110', '00001', '00001', '11110'],
  '0': ['01110', '10001', '10011', '10101', '11001', '10001', '01110'],
  L: ['10000', '10000', '10000', '10000', '10000', '10000', '11111'],
  D: ['11110', '10001', '10001', '10001', '10001', '10001', '11110'],
  P: ['11110', '10001', '10001', '11110', '10000', '10000', '10000'],
  R: ['11110', '10001', '10001', '11110', '10100', '10010', '10001'],
  S: ['01111', '10000', '10000', '01110', '00001', '00001', '11110'],
  E: ['11111', '10000', '10000', '11110', '10000', '10000', '11111'],
  C: ['01110', '10001', '10000', '10000', '10000', '10001', '01110'],
  '2': ['01110', '10001', '00001', '00110', '01000', '10000', '11111'],
  '4': ['00010', '00110', '01010', '10010', '11111', '00010', '00010'],
  ':': ['0', '0', '1', '0', '1', '0', '0'],
  ' ': ['00', '00', '00', '00', '00', '00', '00'],
};
const COLS = 33;
function DotRow({ text, tone }: { text: string; tone: 'lime' | 'white' }) {
  const glyphs = [...text].map((c) => FONT[c] ?? FONT[' ']);
  const width = glyphs.reduce((w, g) => w + g[0].length, 0) + (glyphs.length - 1);
  const start = Math.max(0, Math.floor((COLS - width) / 2));
  const on = new Set<string>();
  let x = start;
  glyphs.forEach((g) => { g.forEach((row, r) => [...row].forEach((v, c) => { if (v === '1') on.add(`${x + c},${r}`); })); x += g[0].length + 1; });
  const cells = [];
  for (let r = 0; r < 7; r++) for (let c = 0; c < COLS; c++) cells.push(<i key={`${c},${r}`} className={on.has(`${c},${r}`) ? `is-${tone}` : ''} />);
  return <div className="wd-dots" aria-hidden="true">{cells}</div>;
}
/** FlightWidget. */
export function FlightWidget() {
  const [t24, setT24] = useState(true);
  return (
    <Tile className="wd-flight" label="Next flight Tokyo to London, 15 Jan, 13:30" onClick={() => setT24((v) => !v)}>
      <b>Next flight</b><span>Tokyo - London</span>
      <div className="wd-flight__board" aria-hidden="true"><DotRow text="TOKYO" tone="lime" /><DotRow text="15 JAN" tone="white" /><DotRow text={t24 ? '13:30' : '1:30 P'} tone="white" /></div>
    </Tile>
  );
}

/* 9. balance */
/** BalanceWidget. */
export function BalanceWidget() {
  const [view, setView] = useState<'card' | 'chart'>('card');
  const [dot, setDot] = useState(0);
  const swipe = useSwipe({ axis: 'x', threshold: 40, ignore: '.wd-balance__dots, .wd-balance__pill', onSwipe: () => setView((v) => (v === 'card' ? 'chart' : 'card')) });
  return (
    <Tile className="wd-balance" label="Balance" bind={swipe.bind}>
      {view === 'card' ? (
        <div className="wd-balance__card" key="card">
          <b>Balance</b>
          <span className="wd-mc" aria-hidden="true"><i /><i /></span>
          <strong>$450,80</strong>
          <small>5294 **** **** 2468</small>
        </div>
      ) : (
        <div className="wd-balance__card wd-balance__card--chart" key="chart">
          <b>This week</b>
          <svg width="200" height="70" viewBox="0 0 200 70" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 56 34 40l30 10 36-30 34 18 30-24 28 14" /></svg>
          <small>+$38,20 since Monday</small>
        </div>
      )}
      <div className="wd-balance__dots" role="tablist" aria-label="Cards">{[0, 1, 2].map((d) => <button key={d} type="button" role="tab" aria-selected={dot === d} aria-label={`Card ${d + 1}`} className={dot === d ? 'is-on' : ''} onClick={() => setDot(d)} />)}</div>
      <div className="wd-balance__pill" role="tablist">
        <button type="button" role="tab" aria-selected={view === 'card'} aria-label="Card" className={view === 'card' ? 'is-on' : ''} onClick={() => setView('card')}><svg width="24" height="20" viewBox="0 0 24 20" fill={view === 'card' ? '#2a2a2a' : '#8a8a8a'} aria-hidden="true"><rect x="1" y="2" width="22" height="16" rx="4" /><rect x="1" y="6" width="22" height="3" fill="#f6a0c0" /></svg></button>
        <button type="button" role="tab" aria-selected={view === 'chart'} aria-label="Chart" className={view === 'chart' ? 'is-on' : ''} onClick={() => setView('chart')}><svg width="24" height="18" viewBox="0 0 24 18" fill="none" stroke={view === 'chart' ? '#2a2a2a' : '#8a8a8a'} strokeWidth="2.200" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m2 15 7-7 4 4 9-9M16 3h6v6" /></svg></button>
      </div>
    </Tile>
  );
}

/* 10. USDC */
/** UsdcWidget. */
export function UsdcWidget() {
  const [amount, setAmount] = useState(987.86);
  const [delta, setDelta] = useState(-99.56);
  const [flip, setFlip] = useState(false);
  const fmt = (n: number) => n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  return (
    <Tile className="wd-usdc" label="USDC balance">
      <span className="wd-usdc__coin" aria-hidden="true"><i>C</i></span>
      <span className="wd-usdc__cur">{flip ? 'USD' : 'USDC'}</span>
      <strong>{fmt(amount)}</strong>
      <span className="wd-usdc__d">{delta < 0 ? '-' : '+'}{fmt(Math.abs(delta))}</span>
      <button type="button" className="wd-usdc__b wd-usdc__b--l" onClick={() => { setAmount((a) => Math.max(0, +(a - 25).toFixed(2))); setDelta((d) => +(d - 25).toFixed(2)); }}>Send</button>
      <button type="button" className="wd-usdc__b wd-usdc__b--r" aria-pressed={flip} onClick={() => setFlip((v) => !v)}>Swap</button>
    </Tile>
  );
}

/* 11. music */
/** NowPlayingWidget. */
export function NowPlayingWidget() {
  const [play, setPlay] = useState(false);
  const [t, setT] = useState(151);
  const scrub = useScrub((f) => setT(Math.round(f * 214)));
  useEffect(() => {
    if (!play || frozen()) return;
    const id = window.setInterval(() => setT((v) => (v >= 214 ? 0 : v + 1)), 1000);
    return () => window.clearInterval(id);
  }, [play]);
  const p = (n: number) => `${String(Math.floor(n / 60)).padStart(2, '0')}:${String(n % 60).padStart(2, '0')}`;
  return (
    <Tile className="wd-music" label="Now playing">
      <span className="wd-music__c wd-music__c--l"><img src={side} alt="" /></span>
      <span className="wd-music__c wd-music__c--r"><img src={side} alt="" /></span>
      <span className="wd-music__c wd-music__c--m"><img src={car} alt="" /></span>
      <p className="wd-music__title">Drive - The Cars</p>
      <button type="button" className="wd-music__app" aria-label="Open music app"><svg width="28" height="24" viewBox="0 0 28 24" fill="none" stroke="#2a2a2a" strokeWidth="3" strokeLinecap="round" aria-hidden="true"><path d="M3 6c8-3 16-2 22 2M5 12c6-2 12-1 17 2M7 18c4-1 8 0 12 2" /></svg></button>
      <div className="wd-music__player">
        <button type="button" aria-label={play ? 'Pause' : 'Play'} aria-pressed={play} onClick={() => setPlay((v) => !v)}>{play ? <svg width="14" height="16" viewBox="0 0 14 16" fill="#2a2a2a" aria-hidden="true"><rect x="2" y="1" width="4" height="14" rx="1.200" /><rect x="8" y="1" width="4" height="14" rx="1.200" /></svg> : <svg width="14" height="16" viewBox="0 0 14 16" fill="#2a2a2a" aria-hidden="true"><path d="M2 1v14l11-7L2 1Z" /></svg>}</button>
        <b>Drive - The Cars</b>
        <i className="wd-music__bar" role="slider" tabIndex={0} aria-label="Track position" aria-valuemin={0} aria-valuemax={214} aria-valuenow={t} data-active={scrub.active || undefined} {...scrub.bind} onKeyDown={(e) => { if (e.key === 'ArrowRight') setT((v) => Math.min(214, v + 5)); if (e.key === 'ArrowLeft') setT((v) => Math.max(0, v - 5)); }}><u style={{ width: `${(t / 214) * 100}%` }} /></i>
        <small><span>{p(t)}</span><span>03:34</span></small>
      </div>
    </Tile>
  );
}

/* 12. lamp */
/** LampWidget. */
export function LampWidget() {
  const [on, setOn] = useState(true);
  const host = useRef<HTMLElement | null>(null);
  const tilt = useTiltAuto(host);
  return (
    <Tile className={`wd-lamp${on ? ' is-on' : ''}`} label="Lamp" hostRef={host}>
      <TiltButton tilt={tilt} />
      <span className="wd-lamp__glow" aria-hidden="true" />
      <img src={lamp} alt="" draggable={false} />
      <div className="wd-lamp__pill" role="group" aria-label="Light">
        <button type="button" aria-label="Turn off" aria-pressed={!on} className={on ? '' : 'is-on'} onClick={() => setOn(false)}><svg width="22" height="26" viewBox="0 0 22 26" fill="none" stroke={on ? '#777' : '#2a2a2a'} strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M11 3a7 7 0 0 0-4 12.500V19h8v-3.500A7 7 0 0 0 11 3ZM8 22h6" /></svg></button>
        <button type="button" aria-label="Turn on" aria-pressed={on} className={on ? 'is-on' : ''} onClick={() => setOn(true)}><svg width="22" height="26" viewBox="0 0 22 26" fill={on ? '#2a2a2a' : '#777'} aria-hidden="true"><path d="M11 2a8 8 0 0 0-4.500 14.600V20h9v-3.400A8 8 0 0 0 11 2Z" /><rect x="7.500" y="22" width="7" height="2.500" rx="1.200" /></svg></button>
      </div>
    </Tile>
  );
}
