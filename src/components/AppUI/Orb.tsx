import { useId, useRef, useState, type ReactNode } from 'react';
import { TiltButton, useLongPress, useSwipe, useTiltAuto } from './gestures';
import { PhoneFrame } from './PhoneFrame';
import './Orb.css';
import hero from './assets/orb/hero.jpg';
import avatar from './assets/orb/avatar.jpg';
import f1 from './assets/orb/f1.jpg';
import f2 from './assets/orb/f2.jpg';
import f3 from './assets/orb/f3.jpg';
import c1 from './assets/orb/c1.jpg';
import c2 from './assets/orb/c2.jpg';
import c3 from './assets/orb/c3.jpg';

/*
 * Orb profile, drawn on a 825x1790 canvas scaled to the 320px phone (320 / 825).
 * Coordinates are canvas pixels taken from the reference image. The photos are generated image assets.
 */

function Status() {
  return (
    <div className="ob-status" aria-hidden="true">
      <span className="ob-status__time">9:41</span>
      <span className="ob-status__island"><i /></span>
      <svg className="ob-status__signal" width="50" height="32" viewBox="0 0 22 14" fill="currentColor"><rect x="0" y="9" width="3.600" height="5" rx="1.100" /><rect x="6" y="6.500" width="3.600" height="7.500" rx="1.100" /><rect x="12" y="3.500" width="3.600" height="10.500" rx="1.100" /><rect x="18" y="0" width="3.600" height="14" rx="1.100" /></svg>
      <svg className="ob-status__wifi" width="46" height="34" viewBox="0 0 24 18" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><path d="M2 6.500a14 14 0 0 1 20 0" /><path d="M6 11a8.500 8.500 0 0 1 12 0" /><circle cx="12" cy="15.400" r="1.800" fill="currentColor" stroke="none" /></svg>
      <svg className="ob-status__battery" width="66" height="30" viewBox="0 0 32 14" fill="none"><rect x="0.500" y="0.500" width="27" height="13" rx="4" stroke="currentColor" opacity=".4" /><rect x="2.500" y="2.500" width="23" height="9" rx="2.400" fill="currentColor" /><rect x="29" y="4.500" width="2.200" height="5" rx="1.100" fill="currentColor" opacity=".45" /></svg>
    </div>
  );
}

function scallop(cx: number, cy: number, r: number, lobes: number, amp: number) {
  const pts: string[] = [];
  const n = lobes * 12;
  for (let i = 0; i <= n; i++) {
    const a = (i / n) * Math.PI * 2;
    const rr = r + amp * Math.sin(a * lobes);
    pts.push(`${i === 0 ? 'M' : 'L'}${(cx + Math.cos(a) * rr).toFixed(1)} ${(cy + Math.sin(a) * rr).toFixed(1)}`);
  }
  return pts.join('') + 'Z';
}

/** The three badges floating over the photo. Each one pops when tapped. */
function Badges() {
  const id = useId().replace(/:/g, '');
  const [pop, setPop] = useState<string | null>(null);
  const b = (name: string) => ({ className: `ob-badge${pop === name ? ' is-pop' : ''}`, onClick: () => setPop(name), onAnimationEnd: () => setPop(null) });
  return (
    <div className="ob-badges">
      <svg width="825" height="620" viewBox="0 0 825 620" aria-hidden="true" focusable="false">
        <defs>
          <linearGradient id={`${id}-f`} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#7e1d4a" /><stop offset=".55" stopColor="#8a3c8e" /><stop offset="1" stopColor="#6a5bd0" /></linearGradient>
          <radialGradient id={`${id}-a`} cx=".45" cy=".4" r=".7"><stop offset="0" stopColor="#4d4d50" /><stop offset="1" stopColor="#8e8e92" /></radialGradient>
          <linearGradient id={`${id}-c`} x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#3b72d8" /><stop offset=".55" stopColor="#7a62c0" /><stop offset="1" stopColor="#ee4a2c" /></linearGradient>
          <linearGradient id={`${id}-fire`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#ff8a1c" /><stop offset="1" stopColor="#ff5a0a" /></linearGradient>
          <filter id={`${id}-sh`} x="-30%" y="-30%" width="160%" height="170%"><feDropShadow dx="0" dy="8" stdDeviation="9" floodColor="#001a40" floodOpacity=".28" /></filter>
        </defs>
        <g {...b('featured')} filter={`url(#${id}-sh)`}>
          <g transform="translate(134 394) rotate(-32)">
            <rect x="-74" y="-74" width="148" height="148" rx="40" fill={`url(#${id}-f)`} stroke="#fff" strokeWidth="6" />
            <g transform="rotate(32)" fill="#c9b8f0"><rect x="-28" y="-8" width="56" height="14" rx="3" /><rect x="-18" y="-24" width="36" height="14" rx="3" /><rect x="-38" y="8" width="76" height="14" rx="3" /></g>
            <g transform="rotate(32)" fill="#3fc4c4"><path d="M-26 -46q26-18 52 0l-10 14h-32Z" /><path d="M-26 46q26 18 52 0l-10-14h-32Z" /></g>
          </g>
        </g>
        <g {...b('artist')} filter={`url(#${id}-sh)`}>
          <path d={scallop(288, 329, 112, 14, 6)} fill={`url(#${id}-a)`} stroke="#fff" strokeWidth="5" />
          <path d="M288 258c10 20 40 34 40 66 0 26-18 48-40 48s-40-22-40-48c0-14 6-24 14-32 2 10 8 14 14 14-4-20 2-34 12-48Z" fill={`url(#${id}-fire)`} />
          <path d="M288 308c6 12 20 18 20 36 0 12-9 22-20 22s-20-10-20-22c0-8 4-14 8-18 2 6 5 8 8 8-2-10 0-18 4-26Z" fill="#ffb347" opacity=".9" />
        </g>
        <g {...b('collector')} filter={`url(#${id}-sh)`}>
          <ellipse cx="674" cy="343" rx="122" ry="68" transform="rotate(-6 674 343)" fill={`url(#${id}-c)`} stroke="#fff" strokeWidth="6" />
          <path d="M690 290 640 350h34l-14 56 54-66h-34Z" transform="translate(0 -8)" fill="none" stroke="#fff" strokeWidth="9" strokeLinejoin="round" />
        </g>
      </svg>
      <span className="ob-badge__label" style={{ left: 131, top: 507 }}>Orb Featured</span>
      <span className="ob-badge__label" style={{ left: 286, top: 465 }}>Top Artist</span>
      <span className="ob-badge__label" style={{ left: 674, top: 448 }}>Top Collector</span>
    </div>
  );
}

const Info = () => <svg width="30" height="30" viewBox="0 0 30 30" fill="none" stroke="currentColor" strokeWidth="2.600" aria-hidden="true"><circle cx="15" cy="15" r="11" /><path d="M15 14v8M15 9.500v1" strokeLinecap="round" /></svg>;
const Globe = () => <svg width="30" height="30" viewBox="0 0 30 30" fill="none" stroke="currentColor" strokeWidth="2.400" aria-hidden="true"><circle cx="15" cy="15" r="11" /><path d="M4 15h22M15 4c5 5 5 17 0 22M15 4c-5 5-5 17 0 22" /></svg>;
const PersonCheck = () => <svg width="52" height="40" viewBox="0 0 52 40" fill="currentColor" aria-hidden="true"><circle cx="18" cy="12" r="9" /><path d="M2 36c1-10 8-14 16-14s15 4 16 14Z" /><path d="m34 20 5 5 11-12" fill="none" stroke="currentColor" strokeWidth="4.500" strokeLinecap="round" strokeLinejoin="round" /></svg>;
const PersonPlus = () => <svg width="52" height="40" viewBox="0 0 52 40" fill="currentColor" aria-hidden="true"><circle cx="18" cy="12" r="9" /><path d="M2 36c1-10 8-14 16-14s15 4 16 14Z" /><path d="M42 10v16M34 18h16" fill="none" stroke="currentColor" strokeWidth="4.500" strokeLinecap="round" /></svg>;

function Chip({ x, w, icon, children }: { x: number; w: number; icon: ReactNode; children: ReactNode }) {
  return <button type="button" className="ob-chip" style={{ left: x, width: w }}>{icon}<span>{children}</span></button>;
}

/**
 * The Orb profile screen. Badges pop, chips and the close/more buttons press, and the Friends button toggles.
 * Gestures: tilt the phone (or move the pointer over it) and the photo and badges drift at different depths;
 * swipe down anywhere (or tap close) to dismiss; press and hold the avatar to enlarge it.
 */
export function OrbProfile() {
  const [friends, setFriends] = useState(true);
  const [open, setOpen] = useState(true);
  const [big, setBig] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const tilt = useTiltAuto(root, open);
  const swipe = useSwipe({ axis: 'y', threshold: 110, flickSpeed: 0.8, ignore: '.ob-avatar, .ob-big', onSwipe: (d) => { if (d === 'down') setOpen(false); } });
  const hold = useLongPress(() => setBig(true), 450);
  if (!open) {
    return (
      <PhoneFrame bare height={694}>
        <div className="ob-closed"><p>Profile closed</p><button type="button" onClick={() => setOpen(true)}>Open Evelyn&rsquo;s profile</button></div>
      </PhoneFrame>
    );
  }
  return (
    <PhoneFrame bare height={694}>
      <div className="ob" ref={root} {...swipe.bind}>
        <img className="ob-hero" src={hero} alt="" />
        <div className="ob-frost" aria-hidden="true"><img src={hero} alt="" /></div>
        <div className="ob-shade" aria-hidden="true" />
        <Status />
        <button type="button" className="ob-round ob-round--close" aria-label="Close" onClick={() => setOpen(false)}><svg width="34" height="34" viewBox="0 0 34 34" fill="none" stroke="#fff" strokeWidth="4" strokeLinecap="round" aria-hidden="true"><path d="m7 7 20 20M27 7 7 27" /></svg></button>
        <button type="button" className="ob-round ob-round--more" aria-label="More"><svg width="40" height="10" viewBox="0 0 40 10" fill="#fff" aria-hidden="true"><circle cx="5" cy="5" r="4.500" /><circle cx="20" cy="5" r="4.500" /><circle cx="35" cy="5" r="4.500" /></svg></button>
        <p className="ob-url">orb.club/@evelynsmith</p>
        <Badges />
        <div
          className="ob-avatar" role="button" tabIndex={0} aria-label="Evelyn Smith. Press and hold to enlarge" data-pressing={hold.pressing || undefined}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setBig(true); } }} {...hold.bind}
        ><img src={avatar} alt="" /></div>
        <h1 className="ob-name">Evelyn Smith</h1>
        <p className="ob-stats"><span>2,425 Followers</span><span>377 Follow</span><span>14 Clubs</span></p>
        <p className="ob-bio">nft artist / visual designer<br />passionate about web3</p>
        <Chip x={163} w={164} icon={<Info />}>ABOUT</Chip>
        <Chip x={339} w={322} icon={<Globe />}>EVELYNSMITH.COM</Chip>
        <div className="ob-people" role="img" aria-label="33 more friends follow">
          <img src={f1} alt="" style={{ left: 0 }} /><img src={f2} alt="" style={{ left: 58 }} /><img src={f3} alt="" style={{ left: 116 }} /><b style={{ left: 164 }}>+33</b>
        </div>
        <p className="ob-cap" style={{ left: 268 }}>friends follow</p>
        <div className="ob-clubs" role="img" aria-label="2 more mutual clubs">
          <img src={c1} alt="" style={{ left: 0 }} /><img src={c2} alt="" style={{ left: 58 }} /><img src={c3} alt="" style={{ left: 116 }} /><b style={{ left: 170 }}>+2</b>
        </div>
        <p className="ob-cap" style={{ left: 562 }}>mutual clubs</p>
        <button type="button" className={`ob-friends${friends ? '' : ' is-add'}`} aria-pressed={friends} onClick={() => setFriends((v) => !v)}>
          {friends ? <PersonCheck /> : <PersonPlus />}<span>{friends ? 'Friends' : 'Add Friend'}</span>
        </button>
        {big && (
          <button type="button" className="ob-big" aria-label="Close the enlarged photo" onClick={() => setBig(false)}><img src={avatar} alt="Evelyn Smith" /></button>
        )}
        <span className="ob-home" aria-hidden="true" />
        <TiltButton tilt={tilt} />
      </div>
    </PhoneFrame>
  );
}
