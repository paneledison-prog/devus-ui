import { useEffect, useRef, useState, type ReactNode } from 'react';
import { useLongPress, usePanScroll, usePull, useScrub, useSwipe } from './gestures';
import { PhoneFrame } from './PhoneFrame';
import './Music.css';
import cover from './assets/music/cover.jpg';
import art1 from './assets/music/art1.jpg';
import art2 from './assets/music/art2.jpg';
import art3 from './assets/music/art3.jpg';
import art4 from './assets/music/art4.jpg';
import slava from './assets/music/slava.jpg';
import elena from './assets/music/elena.jpg';
import food from './assets/music/food.png';
import shoes from './assets/music/shoes.png';
import chair from './assets/music/chair.png';
import disc from './assets/music/disc.png';
import ring from './assets/music/ring.jpg';
import prism from './assets/music/prism.png';
import cyl from './assets/music/cyl.png';
import ringShape from './assets/music/ring-shape.png';
import spring from './assets/music/spring.png';
import gem from './assets/music/gem.png';

/*
 * Four variants of a dark music-app profile page (Russian UI), each a scrolling page inside the phone.
 * Canvas width 390, scaled to the 320px phone (320 / 390). The pictures are generated image assets.
 */

/* ---------- shared pieces ---------- */
const ZOOM = 0.820513;

/**
 * Every page scrolls. Gestures: scroll or drag the page (mouse drag scrolls too), pull down at the top to refresh,
 * swipe a notification away, press and hold an achievement, drag along the listening bars, slide a switch.
 */
function Shell({ children }: { children: ReactNode }) {
  const sc = useRef<HTMLDivElement>(null);
  const pan = usePanScroll(sc, 'y');
  const [toast, setToast] = useState(false);
  const pull = usePull(sc, () => setToast(true), { threshold: 56, ms: 900 });
  useEffect(() => {
    if (!toast) return;
    const t = window.setTimeout(() => setToast(false), 1500);
    return () => window.clearTimeout(t);
  }, [toast]);
  return (
    <PhoneFrame bare height={692}>
      <div className="ms">
        <div className="ms-status" aria-hidden="true">
          <span className="ms-status__time">6:19</span>
          <span className="ms-status__island" />
          <svg className="ms-status__signal" width="20" height="13" viewBox="0 0 22 14" fill="currentColor"><rect x="0" y="9" width="3.600" height="5" rx="1.100" /><rect x="6" y="6.500" width="3.600" height="7.500" rx="1.100" /><rect x="12" y="3.500" width="3.600" height="10.500" rx="1.100" /><rect x="18" y="0" width="3.600" height="14" rx="1.100" /></svg>
          <svg className="ms-status__wifi" width="18" height="14" viewBox="0 0 24 18" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><path d="M2 6.500a14 14 0 0 1 20 0" /><path d="M6 11a8.500 8.500 0 0 1 12 0" /><circle cx="12" cy="15.400" r="1.800" fill="currentColor" stroke="none" /></svg>
          <svg className="ms-status__battery" width="28" height="13" viewBox="0 0 32 14" fill="none"><rect x="0.500" y="0.500" width="27" height="13" rx="4" stroke="currentColor" opacity=".4" /><rect x="2.500" y="2.500" width="23" height="9" rx="2.400" fill="currentColor" /><rect x="29" y="4.500" width="2.200" height="5" rx="1.100" fill="currentColor" opacity=".45" /></svg>
        </div>
        <div className="ms-pull" aria-hidden={!pull.refreshing} style={{ transform: `translateY(${Math.max(0, pull.pull - 44)}px)`, opacity: Math.min(1, pull.progress * 1.2) }}>
          <i className={pull.refreshing ? 'is-spin' : ''} style={pull.refreshing ? undefined : { rotate: `${pull.progress * 300}deg` }} />
        </div>
        {toast && <p className="ms-toast" role="status">Обновлено</p>}
        <div ref={sc} className="ms-scroll" {...pan}>
          <span className="ms-grab" aria-hidden="true" />
          {children}
        </div>
      </div>
    </PhoneFrame>
  );
}

const Chev = () => <svg width="9" height="14" viewBox="0 0 9 14" fill="none" stroke="currentColor" strokeWidth="1.800" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m2 2 5 5-5 5" /></svg>;

function H({ children, count, chevron = false }: { children: ReactNode; count?: number | string; chevron?: boolean }) {
  return <h2 className="ms-h">{children}{count !== undefined && <span className="ms-count">{count}</span>}{chevron && <Chev />}</h2>;
}

function Toggle({ on, onChange, label }: { on: boolean; onChange: (v: boolean) => void; label: string }) {
  const slide = useSwipe({ axis: 'x', threshold: 8, onSwipe: (d) => { if (d === 'right') onChange(true); if (d === 'left') onChange(false); } });
  return <button type="button" role="switch" aria-checked={on} aria-label={label} className={`ms-toggle${on ? ' is-on' : ''}`} onClick={() => onChange(!on)} {...slide.bind}><i /></button>;
}

/** A row that leaves the list when it is swiped sideways. */
function SwipeAway({ onGone, children }: { onGone: () => void; children: ReactNode }) {
  const { bind, offset, dragging } = useSwipe({ axis: 'x', follow: true, threshold: 70, flickSpeed: 0.8, onSwipe: (d) => { if (d === 'left' || d === 'right') onGone(); } });
  return (
    <div className="ms-away" data-dragging={dragging || undefined} style={{ transform: offset.x ? `translateX(${offset.x / ZOOM}px)` : undefined, opacity: 1 - Math.min(0.7, Math.abs(offset.x) / 260) }} {...bind}>{children}</div>
  );
}

function Avatars({ srcs, size = 24 }: { srcs: string[]; size?: number }) {
  return <span className="ms-avs" aria-hidden="true">{srcs.map((s, i) => <img key={i} src={s} alt="" style={{ width: size, height: size, marginLeft: i ? -size * 0.3 : 0 }} />)}</span>;
}

function Stat({ value, plus, label, avs, className = '' }: { value: string; plus?: string; label: string; avs?: ReactNode; className?: string }) {
  return (
    <button type="button" className={`ms-tile ms-stat ${className}`}>
      {avs}
      <span className="ms-stat__label">{label}</span>
      <span className="ms-stat__value">{value}{plus && <sup>{plus}</sup>}</span>
    </button>
  );
}

/** The three-row "latest" card: a hero release row with check and pause, then two small rows. Rows are tappable. */
function Latest() {
  const [paused, setPaused] = useState(false);
  const [sel, setSel] = useState(0);
  const [gone, setGone] = useState<number[]>([]);
  const away = (i: number) => setGone((g) => [...g, i]);
  if (gone.length === 3) return <div className="ms-latest ms-latest--empty"><span>Нет новых уведомлений</span><button type="button" onClick={() => setGone([])}>Вернуть</button></div>;
  return (
    <div className="ms-latest">
      {!gone.includes(0) && <SwipeAway onGone={() => away(0)}>
      <div className={`ms-latest__hero${sel === 0 ? ' is-sel' : ''}`} onClick={() => setSel(0)}>
        <img src={cover} alt="" />
        <span className="ms-latest__title">ПОСЛЕДНИЙ ГЕРОЙ <b>E</b><small>GSPD</small></span>
        <span className="ms-latest__chk" aria-hidden="true"><svg width="22" height="22" viewBox="0 0 22 22"><circle cx="11" cy="11" r="11" fill="#fff" /><path d="m6.500 11.500 3 3 6-6.500" fill="none" stroke="#111" strokeWidth="2.200" strokeLinecap="round" strokeLinejoin="round" /></svg></span>
        <button type="button" className="ms-latest__pp" aria-label={paused ? 'Play' : 'Pause'} onClick={(e) => { e.stopPropagation(); setPaused((p) => !p); }}>
          {paused ? <svg width="14" height="16" viewBox="0 0 14 16" fill="#fff"><path d="M2 1.500v13L13 8 2 1.500Z" /></svg> : <svg width="14" height="16" viewBox="0 0 14 16" fill="#fff"><rect x="1.500" y="1" width="3.800" height="14" rx="1.200" /><rect x="8.700" y="1" width="3.800" height="14" rx="1.200" /></svg>}
        </button>
        <span className="ms-latest__meta"><img src={art2} alt="" /><em>GSPD</em> · Сингл<i>Только что</i></span>
      </div></SwipeAway>}
      {!gone.includes(1) && <SwipeAway onGone={() => away(1)}><button type="button" className={`ms-latest__row ms-latest__row--navy${sel === 1 ? ' is-sel' : ''}`} onClick={() => setSel(1)}><img src={art4} alt="" /><span>Arca · Сингл</span><i>4 ч</i></button></SwipeAway>}
      {!gone.includes(2) && <SwipeAway onGone={() => away(2)}><button type="button" className={`ms-latest__row ms-latest__row--olive${sel === 2 ? ' is-sel' : ''}`} onClick={() => setSel(2)}><img src={art1} alt="" /><span>Dmitry K · Новый плейлист</span><i>5 ч</i></button></SwipeAway>}
    </div>
  );
}

function Bars({ n = 40, seed = 3 }: { n?: number; seed?: number }) {
  const hs = Array.from({ length: n }, (_, i) => 6 + Math.abs(Math.sin(i * 1.7 + seed) * 18 + Math.cos(i * 0.6 + seed * 2) * 14));
  const [at, setAt] = useState<number | null>(null);
  const scrub = useScrub((f, final) => { setAt(f); if (final) window.setTimeout(() => setAt(null), 900); });
  const lit = at === null ? -1 : Math.round(at * (n - 1));
  return (
    <span className="ms-bars" role="img" aria-label="Часы прослушивания по дням. Проведите по ним пальцем" {...scrub.bind}>
      {hs.map((h, i) => <i key={i} className={i <= lit ? 'is-on' : undefined} style={{ height: h }} />)}
      {at !== null && <b className="ms-bars__read" style={{ left: `${at * 100}%` }}>{Math.round(at * 234)} ч</b>}
    </span>
  );
}

function Hours() {
  return (
    <div className="ms-tile ms-hours">
      <img className="ms-hours__av" src={slava} alt="" />
      <span className="ms-hours__who"><small>Любимый исполнитель</small>SLAVA MARLOW</span>
      <span className="ms-hours__big">234 часа<small>За последний месяц</small></span>
      <Bars />
    </div>
  );
}

const shapes = [prism, gem, cyl, ringShape, spring, ringShape, gem, ringShape, prism, gem, spring, cyl];
const bars = ['#f0a030', '#f0a030', '#f0a030', '#3bb7e8', '#3bb7e8', '#3bb7e8', '#3bb7e8', '#3bb7e8', '#3bb7e8', '#3bb7e8', '#3bb7e8', '#3bb7e8'];
function AchItem({ src, i, sel, onSel, onTip }: { src: string; i: number; sel: boolean; onSel: () => void; onTip: () => void }) {
  const lp = useLongPress(onTip, 450);
  return (
    <button type="button" className={`ms-ach__item${sel ? ' is-sel' : ''}`} data-pressing={lp.pressing || undefined} aria-label={`Достижение ${i + 1}. Нажмите и удерживайте, чтобы узнать подробнее`} onClick={onSel} {...lp.bind}>
      <img src={src} alt="" /><i style={{ background: bars[i] }} />
    </button>
  );
}

function Achievements({ strip = false }: { strip?: boolean }) {
  const [sel, setSel] = useState<number | null>(null);
  const [tip, setTip] = useState<number | null>(null);
  useEffect(() => {
    if (tip === null) return;
    const t = window.setTimeout(() => setTip(null), 2200);
    return () => window.clearTimeout(t);
  }, [tip]);
  return (
    <div className={`ms-tile ms-ach${strip ? ' ms-ach--strip' : ''}`}>
      {(strip ? shapes.slice(0, 4) : shapes).map((s, i) => <AchItem key={i} src={s} i={i} sel={sel === i} onSel={() => setSel(sel === i ? null : i)} onTip={() => { setSel(i); setTip(i); }} />)}
      {tip !== null && <p className="ms-ach__tip" role="status">Достижение {tip + 1} · {tip < 3 ? 'получено' : 'ещё не получено'}</p>}
    </div>
  );
}

function Ctl({ id, on, setOn, children, label }: { id: string; on: string | null; setOn: (s: string | null) => void; children: ReactNode; label: string }) {
  return <button type="button" className={`ms-ctl${on === id ? ' is-on' : ''}`} aria-pressed={on === id} aria-label={label} onClick={() => setOn(on === id ? null : id)}>{children}</button>;
}
const Moon = () => <svg width="22" height="22" viewBox="0 0 22 22" fill="currentColor" aria-hidden="true"><path d="M17 14.500A8 8 0 0 1 8.500 5a8 8 0 1 0 8.500 9.500Z" /></svg>;
const Sun = () => <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.800" strokeLinecap="round" aria-hidden="true"><circle cx="11" cy="11" r="4" /><path d="M11 2v2.500M11 17.500V20M2 11h2.500M17.500 11H20M4.600 4.600l1.800 1.800M15.600 15.600l1.800 1.800M4.600 17.400l1.800-1.800M15.600 6.400l1.800-1.800" /></svg>;
const Inf = () => <svg width="24" height="16" viewBox="0 0 24 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M12 8c-2-3-4-5-6.500-5a5 5 0 0 0 0 10C8 13 10 11 12 8Zm0 0c2 3 4 5 6.500 5a5 5 0 0 0 0-10C16 3 14 5 12 8Z" /></svg>;
const Phones = () => <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.800" strokeLinecap="round" aria-hidden="true"><path d="M3 14v-2a8 8 0 0 1 16 0v2" /><rect x="2.500" y="13" width="4" height="6" rx="1.500" fill="currentColor" /><rect x="15.500" y="13" width="4" height="6" rx="1.500" fill="currentColor" /></svg>;
const EBadge = () => <span className="ms-e" aria-hidden="true">E</span>;

/** The four small round controls (HiFi, loop, moon, sun) plus extras; one can be on at a time. */
function Controls({ ids }: { ids: ('hifi' | 'inf' | 'moon' | 'sun' | 'phones' | 'e')[] }) {
  const [on, setOn] = useState<string | null>('moon');
  const map = { hifi: <span className="ms-hifi">HiFi</span>, inf: <Inf />, moon: <Moon />, sun: <Sun />, phones: <Phones />, e: <EBadge /> };
  const label = { hifi: 'HiFi', inf: 'Повтор', moon: 'Ночной режим', sun: 'Яркость', phones: 'Наушники', e: 'Эквалайзер' };
  return <>{ids.map((id) => <Ctl key={id} id={id} on={on} setOn={setOn} label={label[id]}>{map[id]}</Ctl>)}</>;
}

function Kids() {
  const [on, setOn] = useState(false);
  return (
    <div className="ms-tile ms-kids">
      <span className="ms-kids__ico" aria-hidden="true">E</span>
      <span className="ms-kids__t">Детский режим<small>Не воспроизводить контент 18+</small></span>
      <Toggle on={on} onChange={setOn} label="Детский режим" />
    </div>
  );
}

function Cache() {
  const [mb, setMb] = useState(780);
  const [busy, setBusy] = useState(false);
  useEffect(() => {
    if (!busy) return;
    const t = window.setTimeout(() => { setMb(0); setBusy(false); }, 900);
    return () => window.clearTimeout(t);
  }, [busy]);
  return (
    <>
      <button type="button" className="ms-tile ms-row"><span>Занято кэша<small>{mb} MB</small></span><Chev /></button>
      <button type="button" className="ms-clear" disabled={busy || mb === 0} onClick={() => setBusy(true)}>{busy ? 'Очищаем…' : 'Очистить кэш'}</button>
    </>
  );
}

function Banner({ title, text, img, tone = 'dark' }: { title: string; text: string; img: string; tone?: 'dark' | 'green' }) {
  return (
    <button type="button" className={`ms-tile ms-banner ms-banner--${tone}`}>
      <span><b>{title}</b><small>{text}</small></span>
      <img src={img} alt="" />
    </button>
  );
}

function Profile({ plain = false }: { plain?: boolean }) {
  return (
    <button type="button" className={`ms-tile ms-profile${plain ? ' ms-profile--plain' : ''}`}>
      <img src={elena} alt="" />
      <span className="ms-profile__n">Елена Сахарова<small>Ценитель джаза</small></span>
    </button>
  );
}

const Heads = () => <Avatars srcs={[art1, art3]} size={26} />;

/* ---------- screen 1: compact ---------- */
export function MusicProfileCompact() {
  const [hifi, setHifi] = useState(false);
  return (
    <Shell>
      <div className="ms-row2 ms-row2--top">
        <div className="ms-tile ms-me">
          <span className="ms-me__head"><img src={elena} alt="" />Elena Saharova</span>
          <span className="ms-me__nums"><span><b>1,946</b><sup>+5</sup><small>Подписчиков</small></span><span><b>146</b><small>Плейлистов</small></span></span>
          <Heads />
        </div>
        <div className="ms-col">
          <button type="button" className="ms-pill"><img src={elena} alt="" /><b>653</b><i /></button>
          <button type="button" className="ms-tile ms-add"><span>+</span><small>Добавить витрину</small></button>
        </div>
      </div>
      <H count={8}>Уведомления</H>
      <Latest />
      <div className="ms-tile ms-week">
        <b>За последние 7 дней</b><small>Слушали чаще других</small>
        <span className="ms-week__avs"><img src={art1} alt="" /><img src={art2} alt="" /><img src={art3} alt="" /><img src={art4} alt="" /></span>
      </div>
      <div className="ms-btnrow">
        <button type="button" className={`ms-hifi-btn${hifi ? ' is-on' : ''}`} aria-pressed={hifi} onClick={() => setHifi((v) => !v)}>hifi</button>
        <button type="button" className="ms-gear" aria-label="Настройки"><svg width="26" height="26" viewBox="0 0 26 26" fill="none" stroke="currentColor" strokeWidth="1.800" aria-hidden="true"><circle cx="13" cy="13" r="4" /><path d="M13 2v4M13 20v4M2 13h4M20 13h4M5.200 5.200l2.800 2.800M18 18l2.800 2.800M5.200 20.800 8 18M18 8l2.800-2.800" strokeLinecap="round" /></svg></button>
      </div>
      <div className="ms-ctls"><Controls ids={['moon', 'phones', 'inf', 'e']} /></div>
    </Shell>
  );
}

/* ---------- screen 2: tiles ---------- */
export function MusicProfileTiles() {
  return (
    <Shell>
      <Banner title="Вечер с лапшой" text="Попробуйте приготовить любимое блюдо Чонгука" img={food} />
      <div className="ms-grid">
        <div className="ms-tile ms-who"><img src={elena} alt="" /><b>Елена Сахарова</b><small>Ценитель джаза</small></div>
        <div className="ms-col2">
          <div className="ms-tile ms-id"><img src={art1} alt="" /><span>653</span></div>
          <button type="button" className="ms-tile ms-prime"><b>СберПрайм</b><small>до 23 сен. 2023</small></button>
        </div>
        <Stat value="1 946" plus="+5" label="Подписчики" avs={<Heads />} />
        <Stat value="146" label="Плейлисты" avs={<Avatars srcs={[art2, art4]} size={22} />} />
        <div className="ms-tile ms-invite"><small>+50 за каждого приглашенного друга</small><button type="button">Пригласить</button></div>
        <Stat value="1 184" label="Треки" avs={<Avatars srcs={[cover]} size={26} />} />
      </div>
      <H count={8} chevron>Уведомления</H>
      <Latest />
      <Hours />
      <H count="12/54" chevron>Достижения</H>
      <Achievements />
      <H chevron>Настройки</H>
      <div className="ms-grid">
        <button type="button" className="ms-tile ms-write"><span><svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.600" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m3 15 1-4 8-8 3 3-8 8-4 1Z" /></svg></span>Написать<br />в поддержку</button>
        <div className="ms-tile ms-ctlgrid"><Controls ids={['hifi', 'inf', 'moon', 'sun']} /></div>
      </div>
      <Kids />
    </Shell>
  );
}

/* ---------- screen 3: control center ---------- */
export function MusicProfileCenter() {
  return (
    <Shell>
      <button type="button" className="ms-tile ms-news"><i aria-hidden="true" /><span><b>Новый центр управления</b><small>Пользоваться Звуком стало еще удобнее</small></span><Chev /></button>
      <div className="ms-grid">
        <div className="ms-tile ms-who ms-who--id"><img src={art1} alt="" /><b>Елена С.</b><small>+7 (999) 999-99-99 ›</small></div>
        <div className="ms-tile ms-ctlgrid"><Controls ids={['hifi', 'inf', 'moon', 'sun']} /></div>
        <Stat value="1 946" plus="+5" label="Подписчики" avs={<Heads />} />
        <Stat value="146" label="Плейлисты" avs={<Avatars srcs={[art2, art4]} size={22} />} />
      </div>
      <H count={8} chevron>Уведомления</H>
      <Latest />
      <div className="ms-grid">
        <button type="button" className="ms-tile ms-bonus"><b>919</b><small>Баланс бонусов</small></button>
        <button type="button" className="ms-tile ms-bonus"><b className="ms-b2">СберПрайм</b><small className="ms-link">Подключить</small></button>
      </div>
      <Banner title="Вечер с лапшой" text="Попробуйте приготовить любимое блюдо Чонгука" img={food} />
      <Hours />
      <div className="ms-tile ms-meloman"><span><small>Начинающий меломан</small>Осталось прослушать<br />3/6 треков и награда твоя<a>Слушать</a></span><img src={disc} alt="" /></div>
      <div className="ms-tile ms-seen"><Avatars srcs={[art1, art2, art3]} size={22} /><span className="ms-link">(6)Показать все</span></div>
      <H chevron>Настройки</H>
      <Kids />
      <Cache />
    </Shell>
  );
}

/* ---------- screen 4: banners ---------- */
export function MusicProfileBanners() {
  return (
    <Shell>
      <div className="ms-tile ms-card">
        <div className="ms-card__top"><img src={elena} alt="" /><span><b>Елена Сахарова</b><small>Ценитель джаза</small></span><button type="button" aria-label="Поделиться"><svg width="18" height="20" viewBox="0 0 18 20" fill="none" stroke="currentColor" strokeWidth="1.600" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M9 12V2M5 6l4-4 4 4M3 10v8h12v-8" /></svg></button></div>
        <div className="ms-card__nums">
          <span><small>Подписки</small><b>1 946<sup>+5</sup></b><Heads /></span>
          <span><small>Плейлисты</small><b>146</b><Avatars srcs={[art2, art4]} size={22} /></span>
          <span><small>Треки</small><b>1 184</b><Avatars srcs={[cover]} size={22} /></span>
        </div>
        <button type="button" className="ms-card__invite"><small>+50 за каждого приглашенного друга</small></button>
      </div>
      <div className="ms-grid">
        <button type="button" className="ms-tile ms-sale"><b>Чёрная пятница<br />в Мегамаркете!</b><small>Скидки до 50%</small><img src={shoes} alt="" /></button>
        <button type="button" className="ms-tile ms-sale ms-sale--chair"><small>СберПрайм+ активен<br />до 23 сен. 2023</small><img src={chair} alt="" /></button>
      </div>
      <Hours />
      <H>Новое сегодня</H>
      <Latest />
      <H count="12/54" chevron>Достижения</H>
      <div className="ms-tile ms-glow"><img src={ring} alt="" /><span><b>Настоящий фанат</b><small>Прослушать 100 часов<br />одного исполнителя</small></span></div>
      <H chevron>Настройки</H>
      <button type="button" className="ms-tile ms-row"><span>Ограничение кэша<small>1 GB · 20-30 треков</small></span><Chev /></button>
      <p className="ms-note">Большой кэш позволяет хранить больше треков и эпизодов подкастов, беречь трафик и заряд батареи</p>
      <Cache />
    </Shell>
  );
}
