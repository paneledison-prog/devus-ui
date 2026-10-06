import { useEffect, useMemo, useRef, useState } from 'react';
import { PhoneFrame } from './PhoneFrame';
import './Auction.css';
import dogArt from './assets/auction/dog.jpg';
import smokeArt from './assets/auction/dreamy.jpg';
import creatureArt from './assets/auction/sheep.jpg';
import orb from './assets/auction/orb.jpg';
import av2 from './assets/auction/av2.jpg';
import av3 from './assets/nft/ape1.jpg';

/*
 * NFT auction flow: Live Bids -> item detail (one scrolling page with Bids / Offers, sticky actions) -> Place a bid sheet.
 * Canvas 327x703 scaled to the 320px phone (320 / 327). The artwork is generated with the Stitch MCP.
 */

const Back = () => <svg width="10" height="16" viewBox="0 0 10 16" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M8 2 2 8l6 6" /></svg>;
const Heart = ({ on }: { on: boolean }) => <svg width="18" height="17" viewBox="0 0 18 17" fill={on ? '#ff5a6e' : 'none'} stroke={on ? '#ff5a6e' : '#fff'} strokeWidth="1.600" strokeLinejoin="round" aria-hidden="true"><path d="M9 15.500S1.500 11 1.500 5.800A3.800 3.800 0 0 1 9 4.300a3.800 3.800 0 0 1 7.500 1.500C16.500 11 9 15.500 9 15.500Z" /></svg>;
const Bell = () => <svg width="18" height="20" viewBox="0 0 18 20" fill="none" stroke="#fff" strokeWidth="1.600" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 15h12l-1.500-2.500V8a4.500 4.500 0 0 0-9 0v4.500L3 15ZM7.500 17.500a1.800 1.800 0 0 0 3 0" /></svg>;
const Send = () => <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="#fff" strokeWidth="1.600" strokeLinejoin="round" aria-hidden="true"><path d="M3 3v12l12-6L3 3Z" /></svg>;
const Eye = () => <svg width="16" height="12" viewBox="0 0 16 12" fill="none" stroke="currentColor" strokeWidth="1.400" aria-hidden="true"><path d="M1 6s2.500-4.500 7-4.500S15 6 15 6s-2.500 4.500-7 4.500S1 6 1 6Z" /><circle cx="8" cy="6" r="2" fill="currentColor" /></svg>;

function Status() {
  return (
    <div className="au-status" aria-hidden="true">
      <span className="au-status__island" />
    </div>
  );
}

function useCountdown(start: number) {
  const [left, setLeft] = useState(start);
  const frozen = new URLSearchParams(window.location.search).get('bench') === '1';
  useEffect(() => {
    if (frozen) return;
    const t = window.setInterval(() => setLeft((s) => Math.max(0, s - 1)), 1000);
    return () => window.clearInterval(t);
  }, [frozen]);
  const d = Math.floor(left / 86400); const h = Math.floor((left % 86400) / 3600); const m = Math.floor((left % 3600) / 60); const s = left % 60;
  return { d, h, m, s };
}

const START = 1 * 86400 + 15 * 3600 + 27 * 60 + 38;

interface BidRow { id: number; who: string; when: string; price: number; img: string }
const seedBids: BidRow[] = [
  { id: 1, who: 'Shehzad', when: '2 hours ago', price: 0.575, img: orb },
  { id: 2, who: 'Shehzad', when: '2 hours ago', price: 0.575, img: av2 },
  { id: 3, who: 'Shehzad', when: '2 hours ago', price: 0.575, img: av3 },
];

/* ---------- Live bids ---------- */
function Live({ onOpen }: { onOpen: () => void }) {
  const [liked, setLiked] = useState<Record<string, boolean>>({});
  const t = useCountdown(8 * 3600 + 40 * 60 + 20);
  const card = (key: string, tone: 'orange' | 'blue', art: string, artClass: string) => (
    <article key={key} className={`au-card au-card--${tone}`} onClick={onOpen}>
      <img className={`au-card__art ${artClass}`} src={art} alt="" draggable={false} />
      <span className="au-card__time">{String(t.h).padStart(2, '0')}h {String(t.m).padStart(2, '0')}m {String(t.s).padStart(2, '0')}s</span>
      <button type="button" className="au-icon au-icon--a" aria-label="Like" aria-pressed={!!liked[key]} onClick={(e) => { e.stopPropagation(); setLiked((l) => ({ ...l, [key]: !l[key] })); }}><Heart on={!!liked[key]} /></button>
      <button type="button" className="au-icon au-icon--b" aria-label="Open" onClick={(e) => { e.stopPropagation(); onOpen(); }}><Send /></button>
      <div className="au-card__panel">
        <b>Shedd Aquarium</b>
        <span className="au-card__by"><img src={orb} alt="" />Bull will</span>
        <span className="au-card__bid"><small>Current bid</small>1.12 ETH</span>
      </div>
    </article>
  );
  return (
    <div className="au-live">
      <Status />
      <button type="button" className="au-sq au-sq--back" aria-label="Back"><Back /></button>
      <button type="button" className="au-sq au-sq--bell" aria-label="Notifications"><Bell /></button>
      <h1>Live Bids</h1>
      <div className="au-cards">
        {card('a', 'orange', smokeArt, 'au-art--orange')}
        {card('b', 'blue', creatureArt, 'au-art--sheep')}
      </div>
    </div>
  );
}

/* ---------- Detail ---------- */
function Detail({ onBack }: { onBack: () => void }) {
  const t = useCountdown(START);
  const [liked, setLiked] = useState(false);
  const [menu, setMenu] = useState(false);
  const [follow, setFollow] = useState(false);
  const [tab, setTab] = useState<'bids' | 'offers'>('bids');
  const [bids, setBids] = useState<BidRow[]>(seedBids);
  const [sheet, setSheet] = useState(false);
  const [amount, setAmount] = useState(1.2);
  const [toast, setToast] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const next = useRef(10);
  const current = useMemo(() => Math.max(1.12, ...bids.map((b) => b.price)), [bids]);

  useEffect(() => {
    if (!toast) return;
    const id = window.setTimeout(() => setToast(null), 1800);
    return () => window.clearTimeout(id);
  }, [toast]);

  const confirm = () => {
    setBids((l) => [{ id: next.current++, who: 'You', when: 'just now', price: amount, img: av2 }, ...l]);
    setSheet(false);
    setToast(`Bid of ${amount.toFixed(2)} ETH placed`);
  };
  const clock = (
    <span className="au-clock">{t.d}<sub>d</sub> {t.h}<sub>h</sub> {t.m}<sub>m</sub> {t.s}<sub>s</sub></span>
  );

  return (
    <div className="au-detail">
      <div className="au-scroll" onScroll={(e) => setScrolled(e.currentTarget.scrollTop > 160)}>
        <div className="au-hero"><img src={dogArt} alt="" draggable={false} /><div className="au-hero__fade" /></div>
        <div className="au-auction"><span><small>Auction ends in</small>{clock}</span><span className="au-auction__bid"><small>Current bid</small>{current.toFixed(2)} ETH</span></div>
        <h2 className="au-name">Shedd Aquarium</h2>
        <div className="au-tags"><span>Art</span><span>Photography</span></div>
        <div className="au-by"><img src={orb} alt="" /><span><b>Bull will</b><small>4 days ago</small></span><button type="button" className={`au-follow${follow ? ' is-on' : ''}`} aria-pressed={follow} onClick={() => setFollow((v) => !v)}>{follow ? 'Following' : 'Follow'}</button></div>
        <div className="au-views"><span><svg width="18" height="16" viewBox="0 0 18 16" fill="#8a8a8e" aria-hidden="true"><path d="M9 15S1 10.500 1 5.500A4 4 0 0 1 9 4a4 4 0 0 1 8 1.500C17 10.500 9 15 9 15Z" /></svg>342 views</span><span><Eye />342 views</span></div>
        <p className="au-desc">Anduuz is the capital world of GSA Sector 8. The planet is cold and harsh where seasons last an earth year each. Life is only supported on continents near the equator.</p>
        <div className="au-tabs" role="tablist"><button type="button" role="tab" aria-selected={tab === 'bids'} className={tab === 'bids' ? 'is-on' : ''} onClick={() => setTab('bids')}>Bids{tab === 'bids' && <i />}</button><button type="button" role="tab" aria-selected={tab === 'offers'} className={tab === 'offers' ? 'is-on' : ''} onClick={() => setTab('offers')}>Offers{tab === 'offers' && <i />}</button></div>
        <div className="au-list" key={tab}>
          {tab === 'bids' ? bids.map((b) => (
            <div key={b.id} className="au-bid"><img src={b.img} alt="" /><span><b>{b.who}</b><small>{b.when}</small></span><em>{b.price.toFixed(3)} <small>ETH</small></em></div>
          )) : <p className="au-none">No offers yet</p>}
        </div>
        <div className="au-pad" />
      </div>

      <div className="au-topbar">
        <button type="button" className="au-sq" aria-label="Back to live bids" onClick={onBack}><Back /></button>
        <span className="au-topbar__r">
          <button type="button" className="au-circ" aria-label="Like" aria-pressed={liked} onClick={() => setLiked((v) => !v)}><Heart on={liked} /></button>
          <button type="button" className="au-circ" aria-label="More" aria-expanded={menu} onClick={() => setMenu((v) => !v)}><svg width="4" height="16" viewBox="0 0 4 16" fill="#fff" aria-hidden="true"><circle cx="2" cy="2" r="1.800" /><circle cx="2" cy="8" r="1.800" /><circle cx="2" cy="14" r="1.800" /></svg></button>
        </span>
        {menu && <div className="au-menu" role="menu"><button type="button" role="menuitem" onClick={() => { setMenu(false); setToast('Link copied'); }}>Share</button><button type="button" role="menuitem" onClick={() => { setMenu(false); setToast('Reported, thank you'); }}>Report</button></div>}
      </div>

      <div className={`au-actions${scrolled ? ' is-on' : ''}`}>
        <button type="button" className="au-outline" onClick={() => setToast('Purchase request sent')}>Purchase</button>
        <button type="button" className="au-lime" onClick={() => setSheet(true)}>Place a bid</button>
      </div>

      {sheet && (
        <div className="au-sheetwrap" onClick={() => setSheet(false)}>
          <div className="au-sheet" role="dialog" aria-label="Place a bid" onClick={(e) => e.stopPropagation()}>
            <span className="au-sheet__grab" />
            <h3>Place a bid</h3>
            <p>Current bid {current.toFixed(2)} ETH. Your bid must be higher.</p>
            <div className="au-step">
              <button type="button" aria-label="Lower bid" onClick={() => setAmount((a) => Math.max(+(current + 0.01).toFixed(2), +(a - 0.05).toFixed(2)))}>&minus;</button>
              <b>{amount.toFixed(2)} <small>ETH</small></b>
              <button type="button" aria-label="Raise bid" onClick={() => setAmount((a) => +(a + 0.05).toFixed(2))}>+</button>
            </div>
            <button type="button" className="au-lime au-lime--wide" onClick={confirm}>Confirm bid</button>
          </div>
        </div>
      )}
      {toast && <div className="au-toast" role="status">{toast}</div>}
    </div>
  );
}

/** Live Bids opens the item; the item page scrolls, follows, likes, switches Bids / Offers and places a bid. */
export function AuctionFlow({ initial = 'live' }: { initial?: 'live' | 'detail' }) {
  const [screen, setScreen] = useState<'live' | 'detail'>(initial);
  return (
    <PhoneFrame bare height={688}>
      <div className="au">
        <div className="au-swap" key={screen}>
          {screen === 'live' ? <Live onOpen={() => setScreen('detail')} /> : <Detail onBack={() => setScreen('live')} />}
        </div>
        <span className="au-home" aria-hidden="true" />
      </div>
    </PhoneFrame>
  );
}
