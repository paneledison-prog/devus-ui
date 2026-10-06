import { useRef, useState, type ReactNode } from 'react';
import { usePanScroll, useSwipe } from './gestures';
import { PhoneFrame } from './PhoneFrame';
import './Nft.css';
import ape1 from './assets/nft/ape1.jpg';
import ape2 from './assets/nft/ape2.jpg';
import ape3 from './assets/nft/ape3.jpg';
import big from './assets/nft/big-ape.png';

/*
 * NFT search results, drawn on a 517x1126 canvas scaled to the 320px phone (320 / 517).
 * Coordinates are canvas pixels taken from the reference image. The ape pictures are generated image assets.
 */

const Eth = () => <svg width="34" height="44" viewBox="0 0 34 44" fill="#fff" aria-hidden="true"><path d="M17 0 3 22l14 8 14-8L17 0Z" /><path d="M3 26l14 18 14-18-14 8-14-8Z" /></svg>;
const Chevron = ({ c = '#fff' }: { c?: string }) => <svg width="14" height="24" viewBox="0 0 14 24" fill="none" stroke={c} strokeWidth="2.400" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m3 3 9 9-9 9" /></svg>;

const Add = () => <svg width="40" height="34" viewBox="0 0 40 34" fill="none" stroke="currentColor" strokeWidth="2.200" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="15" cy="10" r="7" /><path d="M3 31c1-8 6-11 12-11s11 3 12 11M32 9v10M27 14h10" /></svg>;
const Chat = () => <svg width="38" height="34" viewBox="0 0 38 34" fill="none" stroke="currentColor" strokeWidth="2.200" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M7 3h24a4 4 0 0 1 4 4v14a4 4 0 0 1-4 4H20l-8 6v-6H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4Z" /><path d="M12 11h14M12 17h9" /></svg>;
const Home = () => <svg width="30" height="32" viewBox="0 0 30 32" fill="#fff" aria-hidden="true"><path d="M15 2 3 11a3 3 0 0 0-1 2.300V26a4 4 0 0 0 4 4h18a4 4 0 0 0 4-4V13.300A3 3 0 0 0 27 11L15 2Z" /><rect x="12" y="19" width="6" height="11" rx="2" fill="#7b4be0" /></svg>;
const Chart = () => <svg width="36" height="38" viewBox="0 0 36 38" fill="none" stroke="currentColor" strokeWidth="2.200" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 3v30h28M10 28c4-3 6-10 11-10s5 6 12 3" /></svg>;
const Msg = () => <svg width="38" height="36" viewBox="0 0 38 36" fill="none" stroke="currentColor" strokeWidth="2.200" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M19 3c9 0 16 6 16 14s-7 14-16 14c-2 0-4-.3-6-.9L4 33l3-7c-2-2.600-3-5.600-3-9C4 9 10 3 19 3Z" /><path d="M12 14h14M12 20h9" /></svg>;
const navItems: { id: string; label: string; icon: ReactNode }[] = [
  { id: 'friends', label: 'Add friends', icon: <Add /> },
  { id: 'chats', label: 'Chats', icon: <Chat /> },
  { id: 'home', label: 'Home', icon: <Home /> },
  { id: 'stats', label: 'Stats', icon: <Chart /> },
  { id: 'inbox', label: 'Inbox, 5 new', icon: <Msg /> },
];
const navX = [70, 158, 258, 358, 446];

/**
 * The search results screen. Collections can be selected, the two NFT cards swap places when tapped, the tab bar is live and the field is a real input.
 * Gestures: pan the collections row sideways (drag, it coasts), flick or swipe a card to throw it to the front or back.
 */
export function NftResults() {
  const [query, setQuery] = useState('Solana Monkeys');
  const [pick, setPick] = useState(1);
  const [front, setFront] = useState<'hawaii' | 'apiens'>('hawaii');
  const [tab, setTab] = useState('home');
  const covers = [ape1, ape2, ape3, ape2, ape3, ape1, ape3, ape2];
  const row = useRef<HTMLDivElement>(null);
  const pan = usePanScroll(row, 'x');
  const flickApiens = useSwipe({ threshold: 36, flickSpeed: 0.6, onSwipe: () => setFront((f) => (f === 'apiens' ? 'hawaii' : 'apiens')) });
  const flickHawaii = useSwipe({ threshold: 36, flickSpeed: 0.6, onSwipe: () => setFront((f) => (f === 'hawaii' ? 'apiens' : 'hawaii')) });
  return (
    <PhoneFrame bare height={697} tone="light">
      <div className="nf">
        <div className="nf-glow" aria-hidden="true" />

        <label className="nf-search">
          <input type="search" value={query} onChange={(e) => setQuery(e.target.value)} aria-label="Search collections" spellCheck={false} />
          <svg width="30" height="30" viewBox="0 0 30 30" fill="none" stroke="#fff" strokeWidth="2.400" strokeLinecap="round" aria-hidden="true"><circle cx="13" cy="13" r="9" /><path d="m20 20 7 7" /></svg>
        </label>

        <h2 className="nf-h1">Results</h2>
        <p className="nf-sub" style={{ top: 281 }}>Collections <span className="nf-count">8</span></p>
        <div ref={row} className="nf-avatars" role="radiogroup" aria-label="Collections" {...pan}>
          <div className="nf-avatars__track">
            {covers.map((src, i) => (
              <button key={i} type="button" role="radio" aria-checked={pick === i} className={`nf-av${pick === i ? ' is-on' : ''}`} style={{ left: 26 + i * 100 }} onClick={() => setPick(i)} aria-label={`Collection ${i + 1}`}><img src={src} alt="" style={i > 2 ? { filter: `hue-rotate(${(i - 2) * 38}deg)` } : undefined} /></button>
            ))}
            <button type="button" className="nf-av nf-av--more" style={{ left: 26 + covers.length * 100 }} aria-label="More collections" onClick={() => row.current?.scrollTo({ left: 400, behavior: 'smooth' })}><Chevron /></button>
          </div>
        </div>
        <p className="nf-sub" style={{ top: 491 }}>Top - Seller NFT <span className="nf-count">12</span></p>

        <article className={`nf-card nf-card--apiens ${front === 'apiens' ? 'is-front' : 'is-back'}`} onClick={() => setFront('apiens')} aria-label="Apiens, 5 SOL floor price" {...flickApiens.bind}>
          <p className="nf-card__price">5 SOL</p>
          <p className="nf-card__floor">Floor price</p>
          <span className="nf-card__eth"><Eth /></span>
          <p className="nf-card__title">Apes</p>
          <p className="nf-card__by">Apiens</p>
        </article>
        <article className={`nf-card nf-card--hawaii ${front === 'hawaii' ? 'is-front' : 'is-back'}`} onClick={() => setFront('hawaii')} aria-label="Hawaii by Chill Monkeys, 12 SOL floor price" {...flickHawaii.bind}>
          <p className="nf-card__price">12 SOL</p>
          <p className="nf-card__floor">Floor price</p>
          <span className="nf-card__eth"><Eth /></span>
          <img className="nf-card__ape" src={big} alt="" draggable={false} />
          <p className="nf-card__title nf-card__title--hawaii">Hawaii</p>
          <p className="nf-card__by">Chill Monkeys</p>
          <span className="nf-card__go"><Chevron c="#111" /></span>
        </article>

        <nav className="nf-nav" aria-label="Primary">
          {navItems.map((n, i) => (
            <button key={n.id} type="button" className={`nf-nav__item${tab === n.id ? ' is-on' : ''}`} style={{ left: navX[i] - 26 - 31 }} aria-label={n.label} aria-current={tab === n.id ? 'page' : undefined} onClick={() => setTab(n.id)}>
              {tab === n.id && n.id !== 'home' ? <span className="nf-nav__dot" /> : null}
              {n.id === 'home' && tab !== 'home' ? <svg width="30" height="32" viewBox="0 0 30 32" fill="none" stroke="currentColor" strokeWidth="2.200" strokeLinejoin="round" aria-hidden="true"><path d="M15 3 4 12v14a3 3 0 0 0 3 3h16a3 3 0 0 0 3-3V12L15 3Z" /></svg> : n.icon}
              {n.id === 'inbox' && <b className="nf-nav__badge">5</b>}
            </button>
          ))}
        </nav>
        <span className="nf-home" aria-hidden="true" />
      </div>
    </PhoneFrame>
  );
}
