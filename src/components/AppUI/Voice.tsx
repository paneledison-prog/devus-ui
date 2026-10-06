import { useEffect, useRef, useState, type ReactNode } from 'react';
import { useHold, useLongPress, usePull, useSwipe } from './gestures';
import { PhoneFrame } from './PhoneFrame';
import './Voice.css';
import stage from './assets/voice/stage.jpg';
import woman from './assets/voice/woman.jpg';
import michael from './assets/voice/michael.jpg';
import pip from './assets/voice/pip.jpg';
import cliff from './assets/voice/cliff.jpg';
import chun from './assets/voice/chun.jpg';
import james from './assets/voice/james.jpg';
import imani from './assets/voice/imani.jpg';
import erica from './assets/voice/erica.jpg';
import frank from './assets/voice/frank.jpg';
import cj from './assets/voice/cj.jpg';
import tess from './assets/voice/tess.jpg';
import max from './assets/voice/dog.jpg';
import curly from './assets/voice/curly.jpg';
import fashion from './assets/voice/fashion.jpg';

/*
 * Voice: a live audio-and-video rooms app as one flow of eight screens
 * Home -> Live room -> Participants -> Chat, Home -> Teaser, Universe, Creator Card, Your voice.
 * Canvas 390x843 scaled to the 320px phone (320 / 390). The portraits are stand-ins generated earlier with Stitch
 * (generated with the Stitch MCP to match the poster).
 */

type Screen = 'home' | 'room' | 'people' | 'chat' | 'teaser' | 'universe' | 'card' | 'voice';

const Spark = ({ s = 14 }: { s?: number }) => <svg width={s} height={s} viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M8 0c.6 4.500 3.500 7.400 8 8-4.500.6-7.400 3.500-8 8-.6-4.500-3.500-7.400-8-8 4.500-.6 7.400-3.500 8-8Z" /></svg>;
const Visa = () => <span className="vc-visa" aria-hidden="true"><i /><b>VISA</b></span>;
const Cam = () => <svg width="22" height="16" viewBox="0 0 22 16" fill="currentColor" aria-hidden="true"><rect x="1" y="1" width="14" height="14" rx="4" /><path d="m17 6 4-3v10l-4-3V6Z" /></svg>;
const Mic = ({ off = false }: { off?: boolean }) => <svg width="16" height="20" viewBox="0 0 16 20" fill="none" stroke="currentColor" strokeWidth="1.800" strokeLinecap="round" aria-hidden="true"><rect x="5" y="1" width="6" height="11" rx="3" fill="currentColor" /><path d="M2 9c0 4 2.500 6.500 6 6.500S14 13 14 9M8 15.500V19" />{off && <path d="m2 2 12 16" strokeWidth="2.400" />}</svg>;
const Hand = () => <svg width="22" height="24" viewBox="0 0 22 24" fill="currentColor" aria-hidden="true"><path d="M6 12V5a1.500 1.500 0 0 1 3 0v6V3a1.500 1.500 0 0 1 3 0v8V4a1.500 1.500 0 0 1 3 0v8V7a1.500 1.500 0 0 1 3 0v8c0 4-3 8-7 8-3 0-5-2-6.500-5L2 13a1.500 1.500 0 0 1 2.500-1.500L6 14v-2Z" /></svg>;
const Bubble = () => <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor" aria-hidden="true"><path d="M3 2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H9l-4 3v-3H3a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Z" /></svg>;
const Info = () => <svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="1.200" aria-hidden="true"><circle cx="6.500" cy="6.500" r="5.500" /><path d="M6.500 6v3.500M6.500 3.800v.4" strokeLinecap="round" /></svg>;
const Chevron = () => <svg width="14" height="8" viewBox="0 0 14 8" fill="none" stroke="currentColor" strokeWidth="1.800" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m1 1 6 6 6-6" /></svg>;

function Status({ time }: { time: string }) {
  return (
    <div className="vc-status" aria-hidden="true">
      <span className="vc-status__time">{time}<svg width="9" height="9" viewBox="0 0 10 10" fill="currentColor"><path d="M1 5 9 1 5 9V5H1Z" /></svg></span>
      <span className="vc-status__island" />
      <svg className="vc-status__signal" width="19" height="12" viewBox="0 0 22 14" fill="currentColor"><rect x="0" y="9" width="3.600" height="5" rx="1.100" /><rect x="6" y="6.500" width="3.600" height="7.500" rx="1.100" /><rect x="12" y="3.500" width="3.600" height="10.500" rx="1.100" /><rect x="18" y="0" width="3.600" height="14" rx="1.100" /></svg>
      <span className="vc-status__net">5G</span>
      <svg className="vc-status__battery" width="24" height="12" viewBox="0 0 32 14" fill="none"><rect x="0.500" y="0.500" width="27" height="13" rx="4" stroke="currentColor" opacity=".4" /><rect x="2.500" y="2.500" width="23" height="9" rx="2.400" fill="currentColor" /></svg>
    </div>
  );
}

/** A sheet-style screen: grab handle at the top (tap to go back), status bar and content. */
function Sheet({ time, children, onBack, className = '' }: { time: string; children: ReactNode; onBack: () => void; className?: string }) {
  return (
    <div className={`vc-sheet ${className}`}>
      <Status time={time} />
      <button type="button" className="vc-grab" aria-label="Back" onClick={onBack} />
      {children}
    </div>
  );
}

const StageArt = () => <img className="vc-stage" src={stage} alt="" draggable={false} />;

function Avatar({ src, name, dot, hand }: { src: string; name: string; dot?: boolean; hand?: boolean }) {
  return <span className="vc-av"><img src={src} alt="" /><small>{name}{dot && <i />}</small>{hand && <b aria-hidden="true">&#9995;</b>}</span>;
}

/** A feed row that is hidden when swiped sideways. */
function FeedRow({ className, onGone, children }: { className?: string; onGone: () => void; children: ReactNode }) {
  const { bind, offset, dragging } = useSwipe({ axis: 'x', follow: true, threshold: 70, flickSpeed: 0.8, onSwipe: (d) => { if (d === 'left' || d === 'right') onGone(); } });
  return (
    <li className={className} data-dragging={dragging || undefined} style={{ transform: offset.x ? `translateX(${offset.x / 0.82}px)` : undefined, opacity: 1 - Math.min(0.7, Math.abs(offset.x) / 260) }} {...bind}>{children}</li>
  );
}

/* ---------- 1. home ---------- */
function Home({ go }: { go: (s: Screen) => void }) {
  const [tab, setTab] = useState<'universe' | 'room'>('room');
  const [gone, setGone] = useState<number[]>([]);
  const [bump, setBump] = useState(0);
  const host = useRef<HTMLDivElement>(null);
  const pull = usePull(host, () => setBump((b) => b + 1), { threshold: 60, ms: 900 });
  const hide = (i: number) => setGone((g) => [...g, i]);
  return (
    <div className="vc-home" ref={host}>
      <div className="vc-pull" aria-hidden={!pull.refreshing} style={{ transform: `translateY(${Math.max(0, pull.pull - 36)}px)`, opacity: Math.min(1, pull.progress * 1.2) }}><i className={pull.refreshing ? 'is-spin' : ''} style={pull.refreshing ? undefined : { rotate: `${pull.progress * 300}deg` }} /></div>
      <Status time="11:02" />
      <div className="vc-top">
        <button type="button" className="vc-top__me" onClick={() => go('chat')} aria-label="Messages, 9"><img src={tess} alt="" /><span>9 <Bubble /></span></button>
        <button type="button" className="vc-top__visa" onClick={() => go('card')} aria-label="Creator card"><Visa /></button>
        <img className="vc-top__av" src={imani} alt="" />
        <button type="button" className="vc-ring" onClick={() => go('voice')} aria-label="Your voice, 219"><svg width="44" height="44" viewBox="0 0 44 44" fill="none"><circle cx="22" cy="22" r="19" stroke="#3a3a3a" strokeWidth="4" /><path d="M22 3a19 19 0 1 1-16 29" stroke="#a6e22e" strokeWidth="4" strokeLinecap="round" /></svg><b>219</b></button>
      </div>
      <div className="vc-cards">
        <button type="button" className="vc-card vc-card--music" onClick={() => go('room')}><StageArt /><span className="vc-card__logo"><i />MUSIC</span></button>
        <button type="button" className="vc-card vc-card--yellow" onClick={() => go('teaser')}><img src={woman} alt="" /><span className="vc-card__tag"><Spark s={9} /> VOICE SS22</span><b>Behind the<br />Scenes</b></button>
      </div>
      <ul className="vc-feed" aria-label="Rooms. Swipe a row sideways to hide it">
        {!gone.includes(0) && <FeedRow onGone={() => hide(0)}><button type="button" onClick={() => go('room')}><img src={frank} alt="" /><span className="vc-live">LIVE</span><span className="vc-meta">{2 + bump * 3} <i /></span><b>Moxie Marlinspike Show</b><em>{7 + bump}</em></button></FeedRow>}
        {!gone.includes(1) && <FeedRow onGone={() => hide(1)}><button type="button" onClick={() => go('room')}><img src={cj} alt="" /><span className="vc-live">LIVE</span><span className="vc-meta">{12 + bump * 5} <i /></span><b>Town Hall: celebrating the Learn DAO launch</b></button></FeedRow>}
        {!gone.includes(2) && <FeedRow onGone={() => hide(2)}><button type="button" onClick={() => go('teaser')}><img className="vc-pinkav" src={max} alt="" /><small>Tomorrow, 8:30am</small><b>Can I help you?</b><em>{18 + bump}</em></button></FeedRow>}
        {!gone.includes(3) && <FeedRow className="vc-faded" onGone={() => hide(3)}><button type="button"><img src={james} alt="" /><small>January 29, 4pm</small><b>5 minutes with Griffin</b></button></FeedRow>}
        {gone.length > 0 && <li className="vc-undo"><button type="button" onClick={() => setGone([])}>Show hidden rooms ({gone.length})</button></li>}
      </ul>
      <div className="vc-switch" role="tablist">
        <button type="button" role="tab" aria-selected={tab === 'universe'} className={tab === 'universe' ? 'is-on' : ''} onClick={() => { setTab('universe'); go('universe'); }}><Spark s={15} /> Universe</button>
        <button type="button" role="tab" aria-selected={tab === 'room'} className={tab === 'room' ? 'is-on' : ''} onClick={() => setTab('room')}><Cam /> Room</button>
      </div>
    </div>
  );
}

/* ---------- 2. live room ---------- */
function BottomPills({ go, active, count = 112, raised, onRaise }: { go: (s: Screen) => void; active: 'hand' | 'avatar'; count?: number; raised?: boolean; onRaise?: () => void }) {
  const held = useRef(false);
  const hold = useHold(() => { held.current = true; onRaise?.(); }, 700);
  return (
    <div className="vc-pills">
      <button type="button" className={`vc-pill${active === 'avatar' ? ' is-white' : ''}`} onClick={() => go('people')}><img src={frank} alt="" />{count}</button>
      <button type="button" className="vc-pill" onClick={() => go('chat')}><Bubble />{count === 112 ? 71 : 11}</button>
      <button
        type="button" className={`vc-pill vc-pill--hand${active === 'hand' || raised ? ' is-white' : ''}`} aria-label={raised ? 'Hand raised. Tap to see participants' : 'Raise hand: press and hold. Tap to see participants'}
        data-hold={hold.holding ? '' : undefined} style={{ ['--hold' as string]: hold.progress }}
        onClick={() => { if (held.current) { held.current = false; return; } go('people'); }}
        {...(onRaise ? { ...hold.bind, onPointerDown: (e: React.PointerEvent<Element>) => { held.current = false; hold.bind.onPointerDown(e); } } : {})}
      ><Hand />{raised ? 3 : count === 112 ? '' : 2}</button>
    </div>
  );
}
function Controls({ go }: { go: (s: Screen) => void }) {
  const [cam, setCam] = useState(true);
  const [mic, setMic] = useState(true);
  return (
    <div className="vc-controls">
      <button type="button" aria-label="Flip camera"><svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M18 8A8 8 0 0 0 4 7M4 14a8 8 0 0 0 14 1M3 3v5h5M19 19v-5h-5" /></svg></button>
      <button type="button" aria-label={cam ? 'Turn camera off' : 'Turn camera on'} aria-pressed={cam} className={cam ? '' : 'is-off'} onClick={() => setCam((v) => !v)}><Cam /></button>
      <button type="button" aria-label={mic ? 'Mute' : 'Unmute'} aria-pressed={mic} className={mic ? '' : 'is-off'} onClick={() => setMic((v) => !v)}><Mic off={!mic} /></button>
      <button type="button" aria-label="Invite"><svg width="24" height="20" viewBox="0 0 24 20" fill="currentColor" aria-hidden="true"><circle cx="9" cy="6" r="4.500" /><path d="M1 19c.5-5 4-7 8-7s7.500 2 8 7Z" /><path d="M20 4v8M16 8h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg></button>
      <button type="button" className="vc-controls__down" aria-label="Leave room" onClick={() => go('home')}><svg width="16" height="18" viewBox="0 0 16 18" fill="none" stroke="#111" strokeWidth="2.400" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M8 2v12M2 9l6 6 6-6" /></svg></button>
    </div>
  );
}
function Room({ go }: { go: (s: Screen) => void }) {
  const [raised, setRaised] = useState(false);
  useEffect(() => { if (!raised) return; const t = window.setTimeout(() => setRaised(false), 4000); return () => window.clearTimeout(t); }, [raised]);
  return (
    <div className="vc-room">
      <img className="vc-room__bg" src={michael} alt="" />
      <Status time="12:07" />
      <img className="vc-room__pip" src={pip} alt="" />
      <p className="vc-room__who"><span className="vc-live">LIVE</span> Michael <Spark s={16} /></p>
      <Controls go={go} />
      <BottomPills go={go} active="hand" raised={raised} onRaise={() => setRaised(true)} />
      {raised && <p className="vc-toast vc-toast--hand" role="status">Hand raised, the host will see it</p>}
    </div>
  );
}

/* ---------- 3. teaser ---------- */
function Teaser({ go }: { go: (s: Screen) => void }) {
  const [more, setMore] = useState(false);
  return (
    <Sheet time="9:12" onBack={() => go('home')} className="vc-teaser">
      <img className="vc-teaser__img" src={cliff} alt="" />
      <span className="vc-teaser__tag"><i />VOICE<br />SS22</span>
      <h1>Inside:<br />Cliff Notez</h1>
      <p className="vc-teaser__row"><span><Cam /> Every Mon, 10am</span><span><svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" aria-hidden="true"><circle cx="6" cy="6" r="6" /><path d="M4.800 3.500v5l4-2.500-4-2.500Z" fill="#555" /></svg> Teaser</span></p>
      <p className="vc-teaser__txt">{more ? "Calling all Yogis! On this episode of Inside Voices, I'm speaking with award-winning teacher Cliff Notez about practice, patience and finding your own voice." : "Calling all Yogis! On this episode of Inside Voices, I'm speaking with award-win…"} <button type="button" aria-label={more ? 'Show less' : 'Show more'} aria-expanded={more} onClick={() => setMore((v) => !v)}><Chevron /></button></p>
      <button type="button" className="vc-wide"><svg width="14" height="18" viewBox="0 0 14 18" fill="currentColor" aria-hidden="true"><path d="M7 0c1 4 6 5 6 11a6 6 0 0 1-12 0c0-3 2-4 3-6 1 2 2 2 2 0 .5-2 0-3 1-5Z" /></svg> Sold out</button>
    </Sheet>
  );
}

/* ---------- 4. participants ---------- */
function People({ go }: { go: (s: Screen) => void }) {
  const [mic, setMic] = useState(true);
  const [hand, setHand] = useState(false);
  return (
    <div className="vc-people">
      <Status time="7:22" />
      <button type="button" className="vc-grab" aria-label="Back to the room" onClick={() => go('room')} />
      <p className="vc-reward">REWARD <Spark s={8} />0.1 for every <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor" aria-hidden="true"><circle cx="5" cy="3" r="2.500" /><path d="M0 10c.5-3 2.500-4 5-4s4.500 1 5 4Z" /></svg><span className="vc-reward__bar"><i /></span></p>
      <div className="vc-tiles"><div className="vc-tile"><img src={chun} alt="" /><b>Chun</b></div><div className="vc-tile"><img src={james} alt="" /><span className="vc-tile__mic"><Mic off /></span><b>James <Spark s={12} /></b></div></div>
      <div className="vc-grid">
        <Avatar src={imani} name="Imani" dot /><Avatar src={erica} name="Erica" dot /><Avatar src={frank} name="Frank" dot />
        <Avatar src={cj} name="CJ" dot /><Avatar src={tess} name="Tess" hand /><Avatar src={max} name="Max" />
      </div>
      <div className="vc-controls vc-controls--low">
        <button type="button" aria-label="Flip camera"><svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M18 8A8 8 0 0 0 4 7M4 14a8 8 0 0 0 14 1M3 3v5h5M19 19v-5h-5" /></svg></button>
        <button type="button" aria-label="Camera"><Cam /></button>
        <button type="button" aria-label={mic ? 'Mute' : 'Unmute'} aria-pressed={mic} className={mic ? '' : 'is-off'} onClick={() => setMic((v) => !v)}><Mic off={!mic} /></button>
        <button type="button" aria-label="Invite"><svg width="24" height="20" viewBox="0 0 24 20" fill="currentColor" aria-hidden="true"><circle cx="9" cy="6" r="4.500" /><path d="M1 19c.5-5 4-7 8-7s7.500 2 8 7Z" /></svg></button>
        <button type="button" className="vc-controls__down" aria-label="Back to the room" onClick={() => go('room')}><svg width="16" height="18" viewBox="0 0 16 18" fill="none" stroke="#111" strokeWidth="2.400" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M8 2v12M2 9l6 6 6-6" /></svg></button>
      </div>
      <div className="vc-pills">
        <button type="button" className="vc-pill is-white" onClick={() => go('room')}><img src={frank} alt="" />72</button>
        <button type="button" className="vc-pill" onClick={() => go('chat')}><Bubble />11</button>
        <button type="button" className={`vc-pill${hand ? ' is-white' : ''}`} aria-pressed={hand} onClick={() => setHand((v) => !v)}><Hand />{hand ? 3 : 2}</button>
      </div>
    </div>
  );
}

/* ---------- 5. universe ---------- */
function Universe({ go }: { go: (s: Screen) => void }) {
  const [sel, setSel] = useState<string>('free');
  const opts: [string, string, ReactNode][] = [
    ['free', 'Free', <svg key="f" width="22" height="22" viewBox="0 0 22 22" fill="currentColor" aria-hidden="true"><path d="M4 18C4 9 10 4 20 3c-1 10-6 15-14 15M4 18l8-8" stroke="#111" strokeWidth="1.600" /></svg>],
    ['paid', 'Paid', <svg key="p" width="24" height="18" viewBox="0 0 24 18" fill="none" stroke="currentColor" strokeWidth="1.800" aria-hidden="true"><rect x="1" y="2" width="22" height="14" rx="3" /><circle cx="12" cy="9" r="3" /></svg>],
    ['nft', 'NFT', <svg key="n" width="22" height="24" viewBox="0 0 22 24" aria-hidden="true"><path d="M11 1 2 6v12l9 5 9-5V6l-9-5Z" fill="#6ee06a" /><path d="M11 1v22M2 6l18 12" stroke="#ff9f2a" strokeWidth="1.600" /></svg>],
    ['other', 'Other', <svg key="o" width="22" height="22" viewBox="0 0 22 22" fill="currentColor" aria-hidden="true"><path d="M8 3v12.500a3 3 0 1 1-2-2.800V5l12-2v10.500a3 3 0 1 1-2-2.800V4.500L8 5.800" /></svg>],
  ];
  return (
    <Sheet time="10:42" onBack={() => go('home')} className="vc-universe">
      <span className="vc-universe__spark"><Spark s={30} /><Spark s={12} /></span>
      <h1>Your<br />Universe</h1>
      <p>A series of live rooms and community safeguarded with anything you&rsquo;d like</p>
      <p className="vc-universe__start">Start small, expand &infin;</p>
      <div className="vc-opts" role="radiogroup" aria-label="Room type">
        {opts.map(([id, label, icon]) => <button key={id} type="button" role="radio" aria-checked={sel === id} className={`vc-opt vc-opt--${id}${sel === id ? ' is-on' : ''}`} onClick={() => setSel(id)}>{icon}{label}</button>)}
      </div>
    </Sheet>
  );
}

/** A chat bubble: press and hold to react with a thumbs up. */
function LBubble({ className = '', children }: { className?: string; children: ReactNode }) {
  const [liked, setLiked] = useState(false);
  const lp = useLongPress(() => setLiked((v) => !v), 450);
  return <p className={`vc-bubble ${className}`} data-pressing={lp.pressing || undefined} {...lp.bind}>{children}{liked && <span className="vc-liked" aria-label="Liked">&#128077;</span>}</p>;
}

/* ---------- 6. chat ---------- */
function Chat({ go }: { go: (s: Screen) => void }) {
  const [text, setText] = useState('');
  const [msgs, setMsgs] = useState<string[]>([]);
  const [liked, setLiked] = useState(false);
  const send = () => { if (text.trim()) { setMsgs((m) => [...m, text.trim()]); setText(''); } };
  return (
    <div className="vc-chat">
      <img className="vc-chat__bg" src={curly} alt="" />
      <Status time="4:41" />
      <img className="vc-room__pip vc-chat__pip" src={fashion} alt="" />
      <button type="button" className="vc-grab" aria-label="Back to the room" onClick={() => go('room')} />
      <div className="vc-chat__panel">
        <div className="vc-chat__tabs"><button type="button" aria-label="Notifications"><svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.600" aria-hidden="true"><path d="M3 14h12l-1.500-2V8a4.500 4.500 0 0 0-9 0v4L3 14Z" /></svg></button><button type="button">&#128204; Mu&ntilde;eca: Here is a li&hellip;</button><button type="button"><Spark s={10} /> Reward</button></div>
        <div className="vc-chat__list">
          <p className="vc-msg-meta"><img src={cj} alt="" /><b>Mu&ntilde;eca Diaz</b> 3:02pm</p>
          <LBubble>Today&rsquo;s show was fantastic!</LBubble>
          <LBubble>Let&rsquo;s do this more often <small>&#10003;&#10003; 3:07pm</small></LBubble>
          <p className="vc-bubble vc-bubble--dim">Totally <button type="button" className={`vc-react${liked ? ' is-on' : ''}`} aria-pressed={liked} aria-label="React" onClick={() => setLiked((v) => !v)}>&#128077;</button></p>
          <LBubble className="vc-bubble--dim">It&rsquo;s great connecting</LBubble>
          <p className="vc-msg-meta"><img src={frank} alt="" /><b>Markus Sandler</b> 3:12pm</p>
          <LBubble>Does anyone know these creators? They&rsquo;d be dope guests</LBubble>
          <span className="vc-chat__imgs"><img src={cliff} alt="" /><img src={imani} alt="" /></span>
          {msgs.map((m, i) => <p key={i} className="vc-bubble vc-bubble--me">{m}</p>)}
        </div>
        <button type="button" className="vc-chat__down" aria-label="Back to the room" onClick={() => go('room')}><svg width="18" height="12" viewBox="0 0 18 12" fill="none" stroke="#fff" strokeWidth="2.400" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m2 2 7 7 7-7" /></svg></button>
        <form className="vc-chat__input" onSubmit={(e) => { e.preventDefault(); send(); }}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#999" strokeWidth="1.600" strokeLinecap="round" aria-hidden="true"><path d="m15 9-6 6a3.500 3.500 0 0 1-5-5l7-7a2.300 2.300 0 0 1 3.300 3.300l-6.500 6.500a1.100 1.100 0 0 1-1.600-1.600L11 6" /></svg>
          <input value={text} onChange={(e) => setText(e.target.value)} placeholder="Send a message" aria-label="Message" />
        </form>
      </div>
    </div>
  );
}

/* ---------- 7. creator card ---------- */
function Card({ go }: { go: (s: Screen) => void }) {
  const [instant, setInstant] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  useEffect(() => { if (!toast) return; const t = window.setTimeout(() => setToast(null), 1600); return () => window.clearTimeout(t); }, [toast]);
  return (
    <Sheet time="7:22" onBack={() => go('home')} className="vc-cardscr">
      <div className="vc-creator">
        <b>Creator Card</b><small>&middot;&middot;&middot;&middot; 6876</small>
        <span className="vc-creator__wave"><svg width="20" height="14" viewBox="0 0 20 14" fill="#fff" aria-hidden="true"><rect x="1" y="4" width="2" height="6" rx="1" /><rect x="5" y="1" width="2" height="12" rx="1" /><rect x="9" y="3" width="2" height="8" rx="1" /><rect x="13" y="0" width="2" height="14" rx="1" /><rect x="17" y="4" width="2" height="6" rx="1" /></svg></span>
        <strong>$812.17</strong><span className="vc-creator__debit">debit<i>VISA</i></span>
      </div>
      <div className="vc-instant"><span>Instant payouts<small>5% fee apply <Info /></small></span><button type="button" role="switch" aria-checked={instant} aria-label="Instant payouts" className={`vc-sw${instant ? ' is-on' : ''}`} onClick={() => setInstant((v) => !v)}><i /></button></div>
      <div className="vc-payouts"><span>$12,233.12<small>Total payouts</small></span><span>$72.10<small>Is on the way <Info /></small></span></div>
      <button type="button" className="vc-wide vc-wide--black" onClick={() => setToast('Added to Apple Wallet')}><span className="vc-wallet" aria-hidden="true" /> Add to Apple Wallet</button>
      <button type="button" className="vc-wide" onClick={() => setToast('Opening settings')}>Withdraw &amp; Settings</button>
      {toast && <p className="vc-toast" role="status">{toast}</p>}
    </Sheet>
  );
}

/* ---------- 8. your voice ---------- */
function VoiceStats({ go }: { go: (s: Screen) => void }) {
  return (
    <Sheet time="12:24" onBack={() => go('home')} className="vc-voice">
      <p className="vc-voice__top">YOU&rsquo;RE IN THE TOP 40%</p>
      <div className="vc-gauge"><svg width="190" height="190" viewBox="0 0 190 190" fill="none"><defs><linearGradient id="vcg" x1="0" y1="1" x2="1" y2="0"><stop offset="0" stopColor="#7fe33a" /><stop offset="1" stopColor="#e8ff3a" /></linearGradient></defs><circle cx="95" cy="95" r="82" stroke="#3a3a3c" strokeWidth="18" /><path d="M20 126A82 82 0 0 1 130 22" stroke="url(#vcg)" strokeWidth="18" strokeLinecap="round" /></svg><b>1.6K</b><small><Spark s={11} /> VOICES</small></div>
      <h1>Your voice</h1>
      <p className="vc-voice__txt">Build your reputation and wealth by earning Voices. The more powerful your voice is, the more influence you have on the future of Learn.</p>
      <p className="vc-voice__how">How to earn Voices <Info /></p>
      <p className="vc-voice__rate"><b><Spark s={11} />VOICE</b><span>&#9679; 0.23% Today</span></p>
      <button type="button" className="vc-sell" onClick={() => go('card')}><svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#fff" strokeWidth="1.600" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M2 12l4-5 3 3 5-7M10 3h4v4" /></svg> Sell some voices<Visa /></button>
    </Sheet>
  );
}

const BACK: Partial<Record<Screen, Screen>> = { room: 'home', people: 'room', chat: 'room', teaser: 'home', universe: 'home', card: 'home', voice: 'home' };

/**
 * The Voice app: Home opens rooms, the teaser, the creator card and your stats; rooms lead to participants and chat; sheets close with their handle.
 * Gestures: swipe any screen down to go back, swipe Home left for the Universe, pull Home down to refresh, swipe a feed row sideways to hide it,
 * press and hold the hand in a room to raise it, press and hold a chat message to react.
 */
export function VoiceFlow({ initial = 'home' }: { initial?: Screen }) {
  const [screen, setScreen] = useState<Screen>(initial);
  const nav = useSwipe({
    threshold: 90, flickSpeed: 0.9, ignore: 'input, .vc-chat__list, .vc-feed',
    onSwipe: (d, { dx, dy }) => {
      if (d === 'down' && Math.abs(dy) > Math.abs(dx) * 1.5) { const b = BACK[screen]; if (b) setScreen(b); }
      if (d === 'left' && screen === 'home' && Math.abs(dx) > Math.abs(dy) * 1.5) setScreen('universe');
    },
  });
  return (
    <PhoneFrame bare height={692}>
      <div className="vc" {...nav.bind}>
        <div className="vc-swap" key={screen}>
          {screen === 'home' && <Home go={setScreen} />}
          {screen === 'room' && <Room go={setScreen} />}
          {screen === 'people' && <People go={setScreen} />}
          {screen === 'chat' && <Chat go={setScreen} />}
          {screen === 'teaser' && <Teaser go={setScreen} />}
          {screen === 'universe' && <Universe go={setScreen} />}
          {screen === 'card' && <Card go={setScreen} />}
          {screen === 'voice' && <VoiceStats go={setScreen} />}
        </div>
        <span className="vc-home-bar" aria-hidden="true" />
      </div>
    </PhoneFrame>
  );
}
