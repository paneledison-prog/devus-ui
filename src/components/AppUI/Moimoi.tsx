import { useId, useRef, useState, type ReactNode } from 'react';
import { TiltButton, useFling, useTiltAuto } from './gestures';
import './Moimoi.css';

/*
 * "moimoi" sign-in screen, drawn on a 558x1208 canvas that is scaled to the 320px phone (320 / 558).
 * All coordinates are canvas pixels taken from the reference image. The artwork is original SVG.
 */

export function MoimoiCanvas({ children }: { children: ReactNode }) {
  return <div className="mm">{children}</div>;
}

/** Heavy rounded wordmark "moimoi" built from strokes (stem weight 27). */
export function Wordmark() {
  const m = 'M13.500 220V141M13.500 180A25.250 25.250 0 0 1 64 180V220M64 180A25.250 25.250 0 0 1 114.500 180V220';
  const parts = [7, 270];
  return (
    <svg className="mm-wordmark" width="558" height="120" viewBox="0 110 558 120" fill="none" stroke="#000" strokeWidth="27" role="img" aria-label="moimoi">
      {parts.map((x) => (
        <g key={x} transform={`translate(${x} 0)`}>
          <path d={m} />
          <circle cx="178" cy="180" r="28.500" transform="translate(0 0.500)" />
          <path d="M241.500 141V220" />
          <circle cx="241.500" cy="121" r="14.500" fill="#000" stroke="none" />
        </g>
      ))}
    </svg>
  );
}

const Eye = ({ x, y, rx, ry, px, py, pr }: { x: number; y: number; rx: number; ry: number; px: number; py: number; pr: number }) => (
  <g>
    <ellipse cx={x} cy={y} rx={rx} ry={ry} fill="#fff" />
    <circle cx={px} cy={py} r={pr} fill="#0d0d0d" />
  </g>
);

/** Moves a character: tilt the phone (or move the pointer over it) for parallax; drag it and let go to fling it around, it springs back. */
function Mover({ depth, children }: { depth: number; children: ReactNode }) {
  const g = useRef<SVGGElement>(null);
  const fling = useFling();
  const k = (g.current?.ownerSVGElement?.getBoundingClientRect().width ?? 558) / 558 || 1;
  return (
    <g className="mm-par" style={{ transform: `translate(calc(var(--tx, 0) * ${depth}px), calc(var(--ty, 0) * ${depth}px))` }}>
      <g ref={g} className="mm-fling" data-dragging={fling.dragging || undefined} style={{ transform: `translate(${fling.pos.x / k}px, ${fling.pos.y / k}px)` }} {...fling.bind}>{children}</g>
    </g>
  );
}

const Stroke = ({ d, w = 9 }: { d: string; w?: number | string }) => <path d={d} fill="none" stroke="#050505" strokeWidth={w} strokeLinecap="round" strokeLinejoin="round" />;

/** The six round characters, the loose lines and the "Hello~" bubble. Circles are cropped by the screen edges. */
export function Cast() {
  const id = useId().replace(/:/g, '');
  const [pop, setPop] = useState<string | null>(null);
  const svg = useRef<SVGSVGElement>(null);
  const tilt = useTiltAuto(svg);
  const ch = (name: string) => ({ className: `mm-ch${pop === name ? ' is-pop' : ''}`, onClick: () => setPop(name), onAnimationEnd: () => setPop(null) });
  return (
    <>
    <svg ref={svg} className="mm-cast" width="558" height="800" viewBox="0 0 558 800" aria-hidden="true" focusable="false">
      <defs>
        <radialGradient id={`${id}-g`} cx=".4" cy=".35" r=".8"><stop offset="0" stopColor="#b6f58a" /><stop offset="1" stopColor="#7fdc4a" /></radialGradient>
        <radialGradient id={`${id}-p`} cx=".4" cy=".3" r=".8"><stop offset="0" stopColor="#ffb3dc" /><stop offset="1" stopColor="#f26cb8" /></radialGradient>
        <radialGradient id={`${id}-r`} cx=".3" cy=".25" r="1"><stop offset="0" stopColor="#ffc0b8" /><stop offset=".55" stopColor="#fb8378" /><stop offset="1" stopColor="#f2463c" /></radialGradient>
        <radialGradient id={`${id}-b`} cx=".6" cy=".3" r=".9"><stop offset="0" stopColor="#d6e8ff" /><stop offset=".5" stopColor="#8dbcf8" /><stop offset="1" stopColor="#4c96ec" /></radialGradient>
        <radialGradient id={`${id}-y`} cx=".35" cy=".3" r=".9"><stop offset="0" stopColor="#fff0b4" /><stop offset=".55" stopColor="#ffd063" /><stop offset="1" stopColor="#ffb02e" /></radialGradient>
        <radialGradient id={`${id}-o`} cx=".4" cy=".3" r=".9"><stop offset="0" stopColor="#ffc59a" /><stop offset="1" stopColor="#f5873c" /></radialGradient>
        <filter id={`${id}-sh`} x="-20%" y="-20%" width="140%" height="150%"><feDropShadow dx="0" dy="10" stdDeviation="8" floodColor="#4a78c8" floodOpacity=".16" /></filter>
        <filter id={`${id}-hair`} x="-10%" y="-10%" width="120%" height="140%"><feDropShadow dx="2" dy="7" stdDeviation="4" floodColor="#000" floodOpacity=".22" /></filter>
      </defs>

      {/* green */}
      <Mover depth={10}>
      <g {...ch('green')}>
      <circle cx="44" cy="382" r="88" fill={`url(#${id}-g)`} filter={`url(#${id}-sh)`} />
      <circle cx="67" cy="350" r="18" fill="#fff" />
      <Stroke d="M57 351q10-9 20 0" w="5" />
      <Stroke d="M52 397Q70 413 88 397" w="8" />
      <g filter={`url(#${id}-hair)`}><Stroke d="M30 276C55 280 90 298 118 308" w="9" /></g>
      <Stroke d="M0 445C70 448 140 438 155 392C160 372 135 368 122 388" w="3" />
      </g>
      </Mover>

      {/* pink */}
      <Mover depth={26}>
      <g {...ch('pink')}>
      <circle cx="242" cy="298" r="49" fill={`url(#${id}-p)`} filter={`url(#${id}-sh)`} />
      <rect x="228.500" y="278" width="5.500" height="14" rx="2.700" fill="#050505" />
      <rect x="259.500" y="279" width="5.500" height="14" rx="2.700" fill="#050505" />
      <Stroke d="M241 309q6 6 12 0" w="3" />
      </g>
      </Mover>

      {/* swoosh between pink and coral */}
      <Stroke d="M175 386C210 358 230 328 250 338C265 350 240 363 232 350C240 318 330 288 422 306" w="3" />

      {/* coral */}
      <Mover depth={14}>
      <g {...ch('coral')}>
      <circle cx="463" cy="379" r="93" fill={`url(#${id}-r)`} filter={`url(#${id}-sh)`} />
      <Eye x={415} y={333} rx={17} ry={19} px={418} py={332} pr={8} />
      <Eye x={451} y={338} rx={18} ry={20} px={455} py={337} pr={9} />
      <path d="M418 366Q440 384 465 366Z" fill="#4a0f0a" />
      <path d="M420 367h42l-4 6h-34Z" fill="#fff" />
      <ellipse cx="441" cy="379" rx="9" ry="4" fill="#ff7f8a" />
      <g filter={`url(#${id}-hair)`}><Stroke d="M425 283C455 308 510 308 555 336" w="10" /></g>
      <circle cx="508" cy="285" r="11" fill="none" stroke="#050505" strokeWidth="5" />
      </g>
      </Mover>

      {/* blue */}
      <Mover depth={8}>
      <g {...ch('blue')}>
      <circle cx="75" cy="626" r="133" fill={`url(#${id}-b)`} filter={`url(#${id}-sh)`} />
      <Eye x={115} y={563} rx={31} ry={33} px={115} py={566} pr={17} />
      <Eye x={162} y={562} rx={33} ry={35} px={163} py={563} pr={19} />
      <Stroke d="M78 634Q105 654 132 634" w="9" />
      <g filter={`url(#${id}-hair)`}><Stroke d="M0 548C50 528 100 503 135 498" w="15" /></g>
      <Stroke d="M62 538Q90 520 120 530" w="6" />
      </g>
      </Mover>

      {/* yellow */}
      <Mover depth={12}>
      <g {...ch('yellow')}>
      <circle cx="450" cy="638" r="120" fill={`url(#${id}-y)`} filter={`url(#${id}-sh)`} />
      <Eye x={397} y={583} rx={28} ry={30} px={395} py={586} pr={17} />
      <ellipse cx="457" cy="588" rx="27" ry="29" fill="#fff" />
      <circle cx="450" cy="595" r="13" fill="#0d0d0d" />
      <circle cx="456" cy="590" r="4" fill="#fff" />
      <Stroke d="M425 656Q455 678 485 656" w="9" />
      <g filter={`url(#${id}-hair)`}><Stroke d="M435 488C430 548 480 583 555 586" w="12" /><Stroke d="M520 673Q548 671 558 663" w="10" /></g>
      <Stroke d="M392 538Q420 520 445 540" w="6" />
      </g>
      </Mover>

      {/* orange */}
      <Mover depth={30}>
      <g {...ch('orange')}>
      <circle cx="253" cy="698" r="41" fill={`url(#${id}-o)`} filter={`url(#${id}-sh)`} />
      <circle cx="250" cy="676" r="14" fill="#fff8f0" stroke="#050505" strokeWidth="3" />
      <circle cx="278" cy="672" r="14" fill="#fff8f0" stroke="#050505" strokeWidth="3" />
      <path d="M264 676l0 0" stroke="#050505" strokeWidth="3" />
      <circle cx="250" cy="678" r="3.500" fill="#050505" /><circle cx="278" cy="674" r="3.500" fill="#050505" />
      <circle cx="262" cy="696" r="5" fill="#8a3a14" stroke="#050505" strokeWidth="2.500" />
      <Stroke d="M220 746l18 3M222 752l14 3M288 733l12 7" w="2.500" />
      </g>
      </Mover>

      {/* sprout and spark marks */}
      <circle cx="220" cy="450" r="9" fill="#ff7a8a" />
      <circle cx="217" cy="448" r="2.800" fill="#050505" />
      <Stroke d="M255 443L261 463M230 463L244 480" w="4.500" />

      {/* Hello~ bubble */}
      <g {...ch('hello')}>
        <g transform="translate(310 514) rotate(-14)">
          <path d="M-40-42H40Q80-42 80-2Q80 38 40 38H66L78 62 28 38H-40Q-80 38-80-2Q-80-42-40-42Z" fill="#050505" />
          <text x="0" y="14" textAnchor="middle" fill="#fff" fontFamily="var(--font-sans)" fontWeight="800" fontSize="35" letterSpacing="-.5">Hello~</text>
        </g>
      </g>
    </svg>
    <TiltButton tilt={tilt} />
    </>
  );
}

const Google = () => (
  <svg width="26" height="26" viewBox="0 0 48 48" aria-hidden="true"><path fill="#EA4335" d="M24 9.500c3.500 0 6.600 1.200 9.100 3.600l6.800-6.800C35.800 2.400 30.300 0 24 0 14.600 0 6.500 5.400 2.600 13.200l7.900 6.200C12.400 13.600 17.700 9.500 24 9.500Z" /><path fill="#4285F4" d="M46.500 24.500c0-1.600-.1-3.100-.4-4.500H24v9h12.700c-.6 3-2.200 5.500-4.700 7.200l7.600 5.900c4.400-4.100 6.900-10.100 6.900-17.600Z" /><path fill="#FBBC05" d="M10.500 28.600c-.5-1.500-.8-3-.8-4.600s.3-3.100.8-4.600l-7.900-6.200C.9 16.500 0 20.100 0 24s.9 7.500 2.600 10.800l7.900-6.200Z" /><path fill="#34A853" d="M24 48c6.500 0 11.900-2.100 15.900-5.800l-7.600-5.900c-2.100 1.400-4.900 2.300-8.300 2.300-6.300 0-11.600-4.100-13.500-9.800l-7.900 6.200C6.500 42.600 14.600 48 24 48Z" /></svg>
);
const Apple = () => (
  <svg width="26" height="30" viewBox="0 0 26 30" fill="#fff" aria-hidden="true"><path d="M21.400 15.900c0-3.300 2.700-4.900 2.800-5-1.500-2.200-3.900-2.500-4.700-2.600-2-.2-3.900 1.200-4.900 1.200s-2.600-1.200-4.300-1.100c-2.200 0-4.200 1.300-5.300 3.200-2.300 4-.6 9.800 1.600 13 1.100 1.600 2.400 3.300 4.100 3.300 1.600-.1 2.300-1 4.200-1s2.500 1 4.200 1 2.900-1.600 3.900-3.200c1.300-1.800 1.800-3.600 1.800-3.700-.1 0-3.400-1.300-3.400-5.100ZM18.200 6.300c.9-1.100 1.500-2.600 1.300-4.100-1.300.1-2.900.9-3.800 2-.8.900-1.500 2.500-1.300 3.900 1.500.1 2.900-.7 3.800-1.800Z" /></svg>
);

export function SignInPanel() {
  const [busy, setBusy] = useState<'google' | 'apple' | null>(null);
  const go = (k: 'google' | 'apple') => { if (busy) return; setBusy(k); window.setTimeout(() => setBusy(null), 1600); };
  return (
    <section className="mm-panel" aria-label="Sign in">
      <p className="mm-panel__lead">Sign in to get started</p>
      <button type="button" className="mm-btn mm-btn--google" aria-busy={busy === 'google'} disabled={!!busy} onClick={() => go('google')}>{busy === 'google' ? <i className="mm-spin" aria-hidden="true" /> : <Google />}<span>Sign in with Google</span></button>
      <button type="button" className="mm-btn mm-btn--apple" aria-busy={busy === 'apple'} disabled={!!busy} onClick={() => go('apple')}>{busy === 'apple' ? <i className="mm-spin mm-spin--light" aria-hidden="true" /> : <Apple />}<span>Sign in with Apple</span></button>
    </section>
  );
}

export function MoimoiHomeBar() { return <span className="mm-home" aria-hidden="true" />; }
