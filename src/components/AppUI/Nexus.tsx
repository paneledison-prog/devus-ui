import { useId, useState, type ReactNode } from 'react';
import { useLongPress, useSwipe } from './gestures';
import './Nexus.css';

/*
 * "Nexus" learning-app screens, drawn on a 454x982 canvas that is scaled to the 320px phone (320 / 454).
 * All coordinates are in canvas pixels taken from the reference image.
 */

export function NexusCanvas({ children, dim = false }: { children: ReactNode; dim?: boolean }) {
  return <div className={`nx${dim ? ' nx--dim' : ''}`}>{children}</div>;
}

/** Dark status bar (time left, signal, wifi and battery right). */
export function NexusStatusBar() {
  return (
    <div className="nx-status" aria-hidden="true">
      <span className="nx-status__time">9:41</span>
      <svg className="nx-status__signal" width="22" height="14" viewBox="0 0 22 14" fill="currentColor"><rect x="0" y="9" width="3.6" height="5" rx="1.1" /><rect x="6" y="6.5" width="3.6" height="7.5" rx="1.1" /><rect x="12" y="3.5" width="3.6" height="10.5" rx="1.1" /><rect x="18" y="0" width="3.6" height="14" rx="1.1" /></svg>
      <svg className="nx-status__wifi" width="19" height="14" viewBox="0 0 24 18" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><path d="M2 6.5a14 14 0 0 1 20 0" /><path d="M6 11a8.5 8.5 0 0 1 12 0" /><circle cx="12" cy="15.4" r="1.8" fill="currentColor" stroke="none" /></svg>
      <svg className="nx-status__battery" width="32" height="14" viewBox="0 0 32 14" fill="none"><rect x="0.5" y="0.5" width="27" height="13" rx="4" stroke="currentColor" opacity=".4" /><rect x="2.5" y="2.5" width="23" height="9" rx="2.4" fill="currentColor" /><rect x="29" y="4.5" width="2.2" height="5" rx="1.1" fill="currentColor" opacity=".45" /></svg>
    </div>
  );
}

export function NexusHomeBar() { return <span className="nx-home" aria-hidden="true" />; }

/* ---------- icons ---------- */
/** Three-blade lotus mark. */
export function Lotus({ size = 26, gradient = false }: { size?: number; gradient?: boolean }) {
  const id = useId().replace(/:/g, '');
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" aria-hidden="true" focusable="false">
      {gradient && <defs><linearGradient id={id} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#5A86F5" /><stop offset="1" stopColor="#9266F0" /></linearGradient></defs>}
      <g fill={gradient ? `url(#${id})` : 'currentColor'}>
        <path d="M14 3c3.4 2.2 4.7 6 3.4 9.6-.5 1.4-1.8 2.4-3.4 2.4s-2.9-1-3.4-2.4C9.3 9 10.6 5.2 14 3Z" />
        <path d="M4.6 13.6c3.8-.7 7.1 1.4 8.3 4.3.6 1.4.1 3-1.1 3.9l-3.5 2.6C5.8 21.7 3.7 17.8 4.6 13.6Z" transform="translate(0 -1)" />
        <path d="M23.4 13.6c-3.8-.7-7.1 1.4-8.3 4.3-.6 1.4-.1 3 1.1 3.9l3.5 2.6c2.9-2.7 5-6.6 3.7-10.8Z" transform="translate(0 -1)" />
      </g>
    </svg>
  );
}

const Glyph = ({ children, size = 26 }: { children: ReactNode; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 28 28" aria-hidden="true" focusable="false">{children}</svg>
);
const HomeGlyph = ({ f }: { f: string }) => <Glyph><path d="M14 3.2 4.3 11.4c-.8.7-1.3 1.7-1.3 2.8V22a3 3 0 0 0 3 3h5v-6.5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1V25h5a3 3 0 0 0 3-3v-7.8c0-1.1-.5-2.100-1.300-2.800L14 3.200Z" fill={f} /></Glyph>;
const PlayGlyph = ({ f }: { f: string }) => <Glyph><rect x="3" y="4" width="22" height="20" rx="6" fill={f} /><path d="M11.500 9.800v8.400l7-4.200-7-4.200Z" fill="#fff" /></Glyph>;
const CalendarGlyph = ({ f }: { f: string }) => <Glyph><rect x="3.500" y="6" width="21" height="18.500" rx="5" fill={f} /><path d="M9 3.500v4M19 3.500v4" stroke={f} strokeWidth="2.400" strokeLinecap="round" /><path d="M3.500 11.500h21" stroke="#fff" strokeWidth="2" opacity=".8" /><circle cx="9.500" cy="16" r="1.400" fill="#fff" /><circle cx="14" cy="16" r="1.400" fill="#fff" /><circle cx="9.500" cy="20.200" r="1.400" fill="#fff" /><circle cx="14" cy="20.200" r="1.400" fill="#fff" /></Glyph>;
const PersonGlyph = ({ f }: { f: string }) => <Glyph><circle cx="14" cy="9" r="5.200" fill={f} /><ellipse cx="14" cy="21.500" rx="8.500" ry="5" fill={f} /></Glyph>;
const MoreGlyph = ({ f }: { f: string }) => <Glyph><rect x="3" y="4" width="22" height="20" rx="6" fill={f} /><circle cx="9.500" cy="14" r="1.500" fill="#fff" /><circle cx="14" cy="14" r="1.500" fill="#fff" /><circle cx="18.500" cy="14" r="1.500" fill="#fff" /></Glyph>;

/** Bottom tab bar: five tabs, the active one has a blue-violet gradient icon and label. */
export type NexusTab = 'home' | 'courses' | 'today';

export function NexusTabs({ active, onSelect }: { active: NexusTab; onSelect?: (id: NexusTab) => void }) {
  const id = useId().replace(/:/g, '');
  const tabs = [
    { id: 'home', label: 'Home', Icon: HomeGlyph },
    { id: 'courses', label: 'Courses', Icon: PlayGlyph },
    { id: 'today', label: 'Today', Icon: CalendarGlyph },
    { id: 'profile', label: 'Profile', Icon: PersonGlyph },
    { id: 'more', label: 'More', Icon: MoreGlyph },
  ];
  return (
    <nav className="nx-tabs" aria-label="Primary">
      <svg width="0" height="0" aria-hidden="true" focusable="false" style={{ position: 'absolute' }}><defs><linearGradient id={`${id}-g`} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#4C8DF6" /><stop offset="1" stopColor="#9566F2" /></linearGradient></defs></svg>
      {tabs.map((t, i) => (
        <button key={t.id} type="button" className="nx-tabs__item" aria-current={t.id === active ? 'page' : undefined} onClick={() => (t.id === 'home' || t.id === 'courses' || t.id === 'today') && onSelect?.(t.id)} style={{ left: [50, 138, 227, 315, 404][i] - 44 }}>
          <span className="nx-tabs__icon"><t.Icon f={t.id === active ? `url(#${id}-g)` : '#8e8e93'} /></span>
          <span className="nx-tabs__label">{t.label}</span>
        </button>
      ))}
    </nav>
  );
}

/* ---------- home pieces ---------- */
export function NexusHeader() {
  return (
    <header className="nx-header">
      <span className="nx-logo" aria-hidden="true"><Lotus size={24} /></span>
      <h1 className="nx-header__name">Nexus</h1>
      <button type="button" className="nx-header__search" aria-label="Search">
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><circle cx="12.500" cy="12.500" r="8.500" /><path d="m19 19 5 5" /></svg>
      </button>
      <button type="button" className="nx-header__inbox" aria-label="Notifications">
        <svg width="26" height="26" viewBox="0 0 26 26" aria-hidden="true"><rect x="1" y="3" width="22" height="22" rx="6" fill="currentColor" /><path d="M6 12h10M6 17h7" stroke="#fff" strokeWidth="2" strokeLinecap="round" /><circle cx="21" cy="5" r="4.200" fill="#8e8e93" stroke="#fff" strokeWidth="2" /></svg>
      </button>
    </header>
  );
}

function Ring({ value, color, start }: { value: number; color: string; start: number }) {
  const r = 11.5; const c = 2 * Math.PI * r;
  return (
    <svg className="nx-ring" width="30" height="30" viewBox="0 0 30 30" fill="none" strokeWidth="3.600" strokeLinecap="round" aria-hidden="true">
      <circle cx="15" cy="15" r={r} stroke="#EDEEF1" />
      <circle cx="15" cy="15" r={r} stroke={color} strokeDasharray={`${c * value} ${c}`} transform={`rotate(${start} 15 15)`} />
    </svg>
  );
}

export function StatCard({ x, label, icon, value, ring }: { x: number; label: string; icon: ReactNode; value: ReactNode; ring: { value: number; color: string; start: number } }) {
  return (
    <section className="nx-stat" style={{ left: x }} aria-label={label}>
      <span className="nx-stat__icon" aria-hidden="true">{icon}</span>
      <span className="nx-stat__label">{label}</span>
      <p className="nx-stat__value">{value}</p>
      <Ring {...ring} />
    </section>
  );
}

export const PlaySquare = () => <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden="true"><rect width="22" height="22" rx="6" fill="currentColor" /><path d="M8.500 6.500v9l7.500-4.500-7.500-4.500Z" fill="#fff" /></svg>;
export const BookSquare = () => <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden="true"><path d="M2 4.500C2 3.100 3.100 2 4.500 2H11v18H4.500A2.500 2.500 0 0 1 2 17.500v-13Z" fill="currentColor" /><path d="M11 2h6.500C18.900 2 20 3.100 20 4.500v13a2.500 2.500 0 0 1-2.500 2.500H11V2Z" fill="currentColor" /><path d="M11 2v18" stroke="#fff" strokeWidth="1.800" /></svg>;

const HOME_CENTERS = [47, 118, 189, 263, 337, 408];

/** The week strip. Tap a day, or swipe the strip sideways to move to the next or the previous day. */
export function WeekStrip({ days, selected, onSelect, top = 290, centers = HOME_CENTERS, flat = false, dividers = false }: { days: { day: string; date: number }[]; selected: number; onSelect?: (i: number) => void; top?: number; centers?: number[]; flat?: boolean; dividers?: boolean }) {
  const swipe = useSwipe({ axis: 'x', threshold: 30, flickSpeed: 0.7, onSwipe: (d) => { const i = selected + (d === 'left' ? 1 : -1); if (i >= 0 && i < days.length) onSelect?.(i); } });
  return (
    <div className={`nx-week${flat ? ' nx-week--flat' : ''}`} style={{ top }} role="group" aria-label="This week. Swipe to change the day" {...swipe.bind}>
      {days.map((d, i) => (
        <button type="button" key={d.day} className={`nx-week__day${i === selected ? ' is-on' : ''}`} style={{ left: centers[i] - 30 }} aria-current={i === selected ? 'date' : undefined} aria-label={`${d.day} ${d.date}`} onClick={() => onSelect?.(i)}>
          <span className="nx-week__name">{d.day}</span>
          <span className="nx-week__date">{d.date}</span>
          <span className="nx-week__mark"><Lotus size={flat ? 26 : 28} gradient={i === selected} /></span>
          {dividers && i === selected && <><span className="nx-week__rule nx-week__rule--l" /><span className="nx-week__rule nx-week__rule--r" /></>}
        </button>
      ))}
    </div>
  );
}

/* ---------- felt characters (original SVG: gradient + blurred lights, fuzzy edge) ---------- */
function FeltDefs({ id }: { id: string }) {
  return (
    <defs>
      <filter id={`${id}-fuzz`} x="-10%" y="-10%" width="120%" height="120%">
        <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="4" result="n" />
        <feDisplacementMap in="SourceGraphic" in2="n" scale="3.500" />
      </filter>
      <filter id={`${id}-soft`} x="-40%" y="-40%" width="180%" height="180%"><feGaussianBlur stdDeviation="7" /></filter>
    </defs>
  );
}

function Eyes({ eyes }: { eyes: { x: number; y: number; r: number; dx?: number; dy?: number }[] }) {
  return (
    <g>
      {eyes.map((e, i) => (
        <g key={i}>
          <circle cx={e.x} cy={e.y} r={e.r} fill="#fff" stroke="#00000014" strokeWidth="1" />
          <circle cx={e.x + (e.dx ?? 0)} cy={e.y + (e.dy ?? 0)} r={e.r * 0.46} fill="#16161a" />
          <circle cx={e.x + (e.dx ?? 0) - e.r * 0.15} cy={e.y + (e.dy ?? 0) - e.r * 0.18} r={e.r * 0.14} fill="#fff" />
        </g>
      ))}
    </g>
  );
}

/** Blue felt graduation-cap character. */
export function FeltCap() {
  const id = useId().replace(/:/g, '');
  return (
    <svg className="nx-art nx-art--cap" width="454" height="240" viewBox="0 440 454 240" aria-hidden="true" focusable="false">
      <FeltDefs id={id} />
      <defs>
        <linearGradient id={`${id}-b`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#5CC9F9" /><stop offset="1" stopColor="#2FA3E8" /></linearGradient>
        <clipPath id={`${id}-board`}><path d="M100 500Q104 476 140 472L300 470Q350 474 357 500L355 540Q352 556 330 552L180 522Q110 514 100 500Z" /></clipPath>
        <clipPath id={`${id}-body`}><path d="M160 520H286V622Q286 640 266 640H180Q160 640 160 622Z" /></clipPath>
      </defs>
      <g filter={`url(#${id}-fuzz)`}>
        <g clipPath={`url(#${id}-body)`}>
          <rect x="150" y="510" width="150" height="140" fill={`url(#${id}-b)`} />
          <g filter={`url(#${id}-soft)`}><ellipse cx="200" cy="560" rx="36" ry="30" fill="#8FDDFF" opacity=".55" /><ellipse cx="255" cy="632" rx="40" ry="14" fill="#1F86CF" opacity=".6" /></g>
        </g>
        <ellipse cx="225" cy="622" rx="52" ry="13" fill="#1F86CF" />
        <ellipse cx="225" cy="619" rx="46" ry="9" fill="#2B97E0" />
        <path d="M100 506Q104 492 140 488L300 486Q350 490 357 516L355 556Q352 570 330 566L180 536Q110 528 100 506Z" fill="#2488d6" />
        <g clipPath={`url(#${id}-board)`}>
          <rect x="90" y="460" width="280" height="110" fill={`url(#${id}-b)`} />
          <g filter={`url(#${id}-soft)`}><ellipse cx="200" cy="480" rx="90" ry="14" fill="#9CE3FF" opacity=".7" /><ellipse cx="300" cy="548" rx="60" ry="12" fill="#1F86CF" opacity=".55" /></g>
        </g>
      </g>
      <Eyes eyes={[{ x: 176, y: 556, r: 13, dx: -1, dy: 1 }, { x: 207, y: 555, r: 14, dx: 1, dy: 1 }]} />
      <g stroke="#fff" strokeWidth="2" strokeLinecap="round" opacity=".9">
        <path d="M364 477l7-8M373 513l22-6M374 530l5 4M76 604l33-12M120 659l19-23M94 569l11 5" />
      </g>
    </svg>
  );
}

/** Purple felt bucket character with a handle. */
export function FeltBucket() {
  const id = useId().replace(/:/g, '');
  return (
    <svg className="nx-art nx-art--bucket" width="454" height="260" viewBox="0 160 454 260" aria-hidden="true" focusable="false">
      <FeltDefs id={id} />
      <defs>
        <linearGradient id={`${id}-p`} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#B792F6" /><stop offset="1" stopColor="#8B5BE0" /></linearGradient>
        <clipPath id={`${id}-lid`}><rect x="157" y="212" width="147" height="62" rx="30" /></clipPath>
        <clipPath id={`${id}-body`}><path d="M172 268H286L268 392Q266 404 252 404H208Q194 404 192 392Z" /></clipPath>
      </defs>
      <g transform="rotate(-12 230 300)" filter={`url(#${id}-fuzz)`}>
        <path d="M206 224C200 168 266 166 274 224" fill="none" stroke={`url(#${id}-p)`} strokeWidth="22" strokeLinecap="round" />
        <g clipPath={`url(#${id}-body)`}>
          <rect x="160" y="260" width="140" height="150" fill={`url(#${id}-p)`} />
          <g filter={`url(#${id}-soft)`}><ellipse cx="210" cy="320" rx="30" ry="40" fill="#CDB1FA" opacity=".6" /><ellipse cx="262" cy="396" rx="36" ry="14" fill="#6E3FC4" opacity=".6" /></g>
        </g>
        <g clipPath={`url(#${id}-lid)`}>
          <rect x="150" y="205" width="160" height="76" fill={`url(#${id}-p)`} />
          <g filter={`url(#${id}-soft)`}><ellipse cx="205" cy="226" rx="40" ry="10" fill="#D4BCFB" opacity=".75" /><ellipse cx="270" cy="270" rx="40" ry="8" fill="#6E3FC4" opacity=".5" /></g>
        </g>
      </g>
      <Eyes eyes={[{ x: 181, y: 308, r: 14, dx: 1, dy: -2 }, { x: 213, y: 316, r: 14, dx: 1, dy: -2 }]} />
    </svg>
  );
}

/** Orange felt camera character (course image). */
export function FeltCamera() {
  const id = useId().replace(/:/g, '');
  return (
    <svg className="nx-art nx-art--camera" width="188" height="177" viewBox="24 633 188 177" aria-hidden="true" focusable="false">
      <FeltDefs id={id} />
      <defs>
        <linearGradient id={`${id}-o`} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#F7B448" /><stop offset="1" stopColor="#E58420" /></linearGradient>
        <clipPath id={`${id}-b`}><rect x="57" y="684" width="118" height="88" rx="22" /><rect x="96" y="672" width="50" height="34" rx="14" /><circle cx="152" cy="684" r="12" /></clipPath>
      </defs>
      <g filter={`url(#${id}-fuzz)`}>
        <g clipPath={`url(#${id}-b)`}>
          <rect x="50" y="660" width="140" height="120" fill={`url(#${id}-o)`} />
          <g filter={`url(#${id}-soft)`}><ellipse cx="90" cy="696" rx="26" ry="12" fill="#FFD27E" opacity=".7" /><ellipse cx="150" cy="768" rx="34" ry="10" fill="#C96A10" opacity=".55" /></g>
        </g>
        <ellipse cx="115" cy="731" rx="22" ry="31" fill="#F8D8B4" />
        <ellipse cx="115" cy="725" rx="18" ry="24" fill="#FBE7CB" />
      </g>
      <Eyes eyes={[{ x: 100, y: 698, r: 9 }, { x: 119, y: 700, r: 9 }]} />
    </svg>
  );
}

/** Green felt character (course image). */
export function FeltBlob() {
  const id = useId().replace(/:/g, '');
  return (
    <svg className="nx-art nx-art--blob" width="189" height="177" viewBox="240 633 189 177" aria-hidden="true" focusable="false">
      <FeltDefs id={id} />
      <defs>
        <linearGradient id={`${id}-g`} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#82E34C" /><stop offset="1" stopColor="#46BC1F" /></linearGradient>
        <clipPath id={`${id}-b`}><path d="M286 684Q300 676 340 680L384 692Q398 704 394 722L388 756Q382 774 360 772L304 770Q282 766 280 740Z" /><circle cx="348" cy="716" r="30" /></clipPath>
      </defs>
      <g filter={`url(#${id}-fuzz)`}>
        <g clipPath={`url(#${id}-b)`}>
          <rect x="270" y="670" width="140" height="115" fill={`url(#${id}-g)`} />
          <g filter={`url(#${id}-soft)`}><ellipse cx="310" cy="696" rx="30" ry="12" fill="#B8F58A" opacity=".7" /><ellipse cx="360" cy="768" rx="40" ry="10" fill="#2F9A12" opacity=".55" /></g>
        </g>
        <circle cx="350" cy="716" r="20" fill="#8FB36D" opacity=".55" />
      </g>
      <Eyes eyes={[{ x: 306, y: 697, r: 8, dy: 1 }, { x: 322, y: 692, r: 8, dy: 1 }]} />
    </svg>
  );
}

/* ---------- home hero and courses cards ---------- */
export function HeroCard() {
  return (
    <section className="nx-hero" aria-label="Learning routine">
      <FeltCap />
      <h2 className="nx-hero__title">Create a consistent<br />learning routine</h2>
      <button type="button" className="nx-hero__btn">Register Now</button>
    </section>
  );
}

export function SuggestedCard() {
  const [playing, setPlaying] = useState(false);
  return (
    <section className="nx-sug" aria-label="Suggested lesson">
      <span className="nx-sug__chip">Lesson 34</span>
      <FeltBucket />
      <div className="nx-sug__panel">
        <h3 className="nx-sug__title">Mastering The Art<br />Of Handcrafted</h3>
        <button type="button" className="nx-sug__play" aria-label={playing ? 'Pause lesson' : 'Play lesson'} aria-pressed={playing} onClick={() => setPlaying((p) => !p)}>{playing ? <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden="true"><rect x="4.500" y="3.500" width="4.500" height="15" rx="1.500" fill="currentColor" /><rect x="13" y="3.500" width="4.500" height="15" rx="1.500" fill="currentColor" /></svg> : <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden="true"><path d="M6 3.500v15l13-7.500L6 3.500Z" fill="currentColor" strokeLinejoin="round" stroke="currentColor" strokeWidth="2" /></svg>}</button>
      </div>
    </section>
  );
}

/** A course card. Press and hold to save it for later. */
export function CourseCard({ x, tone, topic, title, children }: { x: number; tone: 'peach' | 'mint'; topic: string; title: string; children: ReactNode }) {
  const [saved, setSaved] = useState(false);
  const lp = useLongPress(() => setSaved((v) => !v), 480);
  return (
    <article className="nx-course" style={{ left: x }} data-saved={saved || undefined} data-pressing={lp.pressing || undefined} aria-label={`${topic}: ${title}${saved ? ', saved' : ''}. Press and hold to save`} {...lp.bind}>
      {saved && <span className="nx-saved">Saved</span>}
      <div className={`nx-course__img nx-course__img--${tone}`}>{children}</div>
      <p className="nx-course__topic">{topic}</p>
      <h3 className="nx-course__title">{title}</h3>
    </article>
  );
}

/* ---------- today / daily activity ---------- */
/** Orange felt trophy character with two handles, a stem and a base. */
export function FeltTrophy() {
  const id = useId().replace(/:/g, '');
  return (
    <svg className="nx-art nx-art--trophy" width="454" height="340" viewBox="0 120 454 340" aria-hidden="true" focusable="false">
      <FeltDefs id={id} />
      <defs>
        <linearGradient id={`${id}-o`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#F3AE4A" /><stop offset="1" stopColor="#E58F2C" /></linearGradient>
        <linearGradient id={`${id}-s`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#F4B766" /><stop offset="1" stopColor="#F6CB92" /></linearGradient>
      </defs>
      <g filter={`url(#${id}-fuzz)`}>
        <path d="M150 172C118 166 100 196 108 232C116 268 150 290 176 296L180 280C158 270 134 250 130 224C128 204 136 196 150 198Z" fill="#E99A36" />
        <path d="M318 188C350 184 372 208 364 244C358 276 330 296 300 300L296 284C318 276 340 262 342 238C344 220 336 214 322 214Z" fill="#E99A36" />
        <rect x="203" y="298" width="54" height="58" rx="14" fill={`url(#${id}-s)`} />
        <path d="M156 408Q150 360 190 350L270 350Q312 358 300 408Q298 424 270 424L186 424Q160 424 156 408Z" fill={`url(#${id}-s)`} />
        <ellipse cx="228" cy="352" rx="42" ry="9" fill="#F7D2A0" />
        <path d="M142 165Q232 148 326 165L322 232Q318 292 262 312L204 312Q146 292 142 232Z" fill={`url(#${id}-o)`} />
        <g filter={`url(#${id}-soft)`}><ellipse cx="190" cy="200" rx="30" ry="40" fill="#F8C777" opacity=".5" /><ellipse cx="270" cy="296" rx="40" ry="14" fill="#C9701A" opacity=".5" /></g>
        <ellipse cx="234" cy="166" rx="88" ry="12" fill="#D98825" />
        <ellipse cx="234" cy="167" rx="78" ry="8" fill="#E8A247" />
      </g>
      <Eyes eyes={[{ x: 187, y: 217, r: 18, dx: -3, dy: -4 }, { x: 228, y: 222, r: 17, dx: -2, dy: -4 }]} />
      <circle cx="180" cy="292" r="3.200" fill="#fff" /><circle cx="186" cy="283" r="2.200" fill="#fff" />
      <g stroke="#D9953F" strokeWidth="2.200" strokeLinecap="round" opacity=".85"><path d="M378 291l25 12M352 326l19 29M321 337l1 11" /></g>
    </svg>
  );
}

/** Purple felt X character; drawn in the card's own coordinates (428x400). */
export function FeltX() {
  const id = useId().replace(/:/g, '');
  return (
    <svg className="nx-art nx-art--x" width="428" height="400" viewBox="0 0 428 400" aria-hidden="true" focusable="false">
      <FeltDefs id={id} />
      <defs>
        <linearGradient id={`${id}-p`} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#B27DF0" /><stop offset="1" stopColor="#8349D6" /></linearGradient>
      </defs>
      <g filter={`url(#${id}-fuzz)`}>
        <rect x="179" y="42" width="76" height="236" rx="38" transform="rotate(-36 217 160)" fill={`url(#${id}-p)`} />
        <rect x="179" y="45" width="76" height="230" rx="38" transform="rotate(42 217 160)" fill={`url(#${id}-p)`} />
        <g filter={`url(#${id}-soft)`}><ellipse cx="196" cy="116" rx="26" ry="14" fill="#C9A4F6" opacity=".6" /><ellipse cx="262" cy="236" rx="20" ry="16" fill="#6A32BE" opacity=".5" /></g>
      </g>
      <Eyes eyes={[{ x: 188, y: 149, r: 13, dx: 1, dy: 1 }, { x: 219, y: 155, r: 12, dx: 1, dy: 1 }]} />
    </svg>
  );
}

/** Green felt V-shaped character; drawn in the card's own coordinates (428x400). */
export function FeltV() {
  const id = useId().replace(/:/g, '');
  return (
    <svg className="nx-art nx-art--x" width="428" height="400" viewBox="0 0 428 400" aria-hidden="true" focusable="false">
      <FeltDefs id={id} />
      <defs>
        <linearGradient id={`${id}-g`} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#8FE04F" /><stop offset="1" stopColor="#5CC62A" /></linearGradient>
      </defs>
      <g filter={`url(#${id}-fuzz)`}>
        <path d="M117 96Q114 66 148 62Q182 60 198 82L220 112Q230 122 244 112L286 72Q310 54 332 68Q350 84 338 110L262 194Q232 220 198 198L136 138Q118 120 117 96Z" fill={`url(#${id}-g)`} />
        <g filter={`url(#${id}-soft)`}><ellipse cx="160" cy="84" rx="26" ry="12" fill="#C2F595" opacity=".6" /><ellipse cx="290" cy="180" rx="30" ry="14" fill="#3E9A16" opacity=".45" /></g>
      </g>
      <Eyes eyes={[{ x: 205, y: 129, r: 11, dy: 1 }, { x: 238, y: 139, r: 11, dy: 1 }]} />
    </svg>
  );
}

const Party = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true"><path d="M2 18 6 6l8 8-12 4Z" fill="#F2A33A" /><path d="M6 6 14 14" stroke="#D9772A" strokeWidth="1.500" /><circle cx="14" cy="4" r="1.300" fill="#E0568A" /><circle cx="17" cy="9" r="1.200" fill="#5B8DEF" /><circle cx="10" cy="2.500" r="1" fill="#6CC36A" /></svg>
);

export function TrophyHero() {
  return (
    <section className="nx-trophy" aria-label="Challenge">
      <div className="nx-peach" aria-hidden="true" />
      <FeltTrophy />
      <span className="nx-trophy__pill"><Party />Challenge!</span>
      <h2 className="nx-trophy__title">Focusing on two key<br />challenges</h2>
    </section>
  );
}

/** Challenge card: a pill, a felt character and a white panel (title plus a round action button). */
/** A challenge card. Press and hold to join it. */
export function ChallengeCard({ top, tone, chip, art, title, arrow = false }: { top: number; tone: 'lavender' | 'green'; chip: string; art: ReactNode; title?: ReactNode; arrow?: boolean }) {
  const [joined, setJoined] = useState(false);
  const lp = useLongPress(() => setJoined((v) => !v), 480);
  return (
    <section className={`nx-sug nx-sug--${tone}`} style={{ top }} aria-label={`${chip}${joined ? ', joined' : ''}. Press and hold to join`} data-saved={joined || undefined} data-pressing={lp.pressing || undefined} {...lp.bind}>
      <span className="nx-sug__chip nx-sug__chip--pill">{joined ? 'Joined' : chip}</span>
      {art}
      {title && (
        <div className="nx-sug__panel">
          <h3 className="nx-sug__title nx-sug__title--sm">{title}</h3>
          <button type="button" className="nx-sug__play" aria-label="Open">
            {arrow && <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.800" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 11h14M12 5l6 6-6 6" /></svg>}
          </button>
        </div>
      )}
    </section>
  );
}
