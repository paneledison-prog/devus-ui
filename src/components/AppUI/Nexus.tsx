import { useId, type ReactNode } from 'react';
import './Nexus.css';

/*
 * "Nexus" learning-app screens, drawn on a 454x982 canvas that is scaled to the 320px phone (320 / 454).
 * All coordinates are in canvas pixels taken from the reference image.
 */

export function NexusCanvas({ children }: { children: ReactNode }) {
  return <div className="nx">{children}</div>;
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
export function NexusTabs({ active }: { active: 'home' | 'courses' }) {
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
        <button key={t.id} type="button" className="nx-tabs__item" aria-current={t.id === active ? 'page' : undefined} style={{ left: [50, 138, 227, 315, 404][i] - 44 }}>
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

export function WeekStrip({ days, selected }: { days: { day: string; date: number }[]; selected: number }) {
  return (
    <div className="nx-week" role="group" aria-label="This week">
      {days.map((d, i) => (
        <div key={d.day} className={`nx-week__day${i === selected ? ' is-on' : ''}`} style={{ left: 47 + i * 72 - 30 }} aria-current={i === selected ? 'date' : undefined}>
          <span className="nx-week__name">{d.day}</span>
          <span className="nx-week__date">{d.date}</span>
          <span className="nx-week__mark"><Lotus size={28} gradient={i === selected} /></span>
        </div>
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
  return (
    <section className="nx-sug" aria-label="Suggested lesson">
      <span className="nx-sug__chip">Lesson 34</span>
      <FeltBucket />
      <div className="nx-sug__panel">
        <h3 className="nx-sug__title">Mastering The Art<br />Of Handcrafted</h3>
        <button type="button" className="nx-sug__play" aria-label="Play lesson"><svg width="22" height="22" viewBox="0 0 22 22" aria-hidden="true"><path d="M6 3.500v15l13-7.500L6 3.500Z" fill="currentColor" strokeLinejoin="round" stroke="currentColor" strokeWidth="2" /></svg></button>
      </div>
    </section>
  );
}

export function CourseCard({ x, tone, topic, title, children }: { x: number; tone: 'peach' | 'mint'; topic: string; title: string; children: ReactNode }) {
  return (
    <article className="nx-course" style={{ left: x }}>
      <div className={`nx-course__img nx-course__img--${tone}`}>{children}</div>
      <p className="nx-course__topic">{topic}</p>
      <h3 className="nx-course__title">{title}</h3>
    </article>
  );
}
