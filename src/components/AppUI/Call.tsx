import { useEffect, useState, type HTMLAttributes, type ReactNode } from 'react';
import { useHold, useLongPress, useSwipe } from './gestures';
import { PhoneFrame } from './PhoneFrame';
import './Call.css';

/*
 * In-call screen and its small flow (in call -> keypad, in call -> call ended -> back to the call).
 * Drawn on a 923x1996 canvas scaled to the 320px phone (320 / 923). Coordinates are canvas pixels from the reference image.
 */

const Ico = ({ children, w = 100, h = 100 }: { children: ReactNode; w?: number; h?: number }) => (
  <svg width={w} height={h} viewBox="0 0 100 100" fill="none" aria-hidden="true" focusable="false">{children}</svg>
);

const SpeakerIcon = () => <Ico><path d="M16 38h14l20-17v58L30 62H16Z" fill="currentColor" /><path d="M62 38c5 6 5 18 0 24M72 29c10 12 10 30 0 42M82 21c14 17 14 41 0 58" stroke="currentColor" strokeWidth="6" strokeLinecap="round" /></Ico>;
const FaceTimeIcon = () => <Ico><rect x="10" y="26" width="52" height="48" rx="12" fill="currentColor" /><path d="M68 44l22-14v40L68 56Z" fill="currentColor" /><path d="M30 44c0-6 5-9 10-9s10 3 10 8c0 6-8 6-8 12M42 64v1" stroke="#7a665d" strokeWidth="6" strokeLinecap="round" /></Ico>;
const MuteIcon = () => <Ico><rect x="36" y="14" width="26" height="46" rx="13" fill="currentColor" /><path d="M24 48c0 16 11 26 25 26s25-10 25-26M49 74v14M36 88h26" stroke="currentColor" strokeWidth="6" strokeLinecap="round" /><path d="M18 14 82 86" stroke="#7a665d" strokeWidth="14" strokeLinecap="round" /><path d="M18 14 82 86" stroke="currentColor" strokeWidth="6" strokeLinecap="round" /></Ico>;
const AddIcon = () => <Ico><circle cx="58" cy="38" r="20" stroke="currentColor" strokeWidth="6" /><path d="M24 90c4-18 18-26 34-26s30 8 34 26" stroke="currentColor" strokeWidth="6" strokeLinecap="round" /><circle cx="30" cy="68" r="18" fill="#7a665d" /><circle cx="30" cy="68" r="14" fill="currentColor" /><path d="M30 61v14M23 68h14" stroke="#7a665d" strokeWidth="5" strokeLinecap="round" /></Ico>;
const KeypadIcon = () => <Ico><g fill="currentColor">{[22, 50, 78].flatMap((x) => [14, 38, 62].map((y) => <circle key={`${x}${y}`} cx={x} cy={y} r="7.500" />))}<circle cx="50" cy="86" r="7.500" /></g></Ico>;
const EndIcon = () => <Ico><path d="M50 36c-22 0-36 9-40 20-2 5 0 10 4 12l12 4c4 1 8-1 9-5l2-8c10-3 19-3 26 0l2 8c1 4 5 6 9 5l12-4c4-2 6-7 4-12-4-11-18-20-40-20Z" fill="currentColor" /></Ico>;

function Round({ label, on, onClick, children, disabled, tone = 'glass', className = '', hold, extra }: { label: string; on?: boolean; onClick?: () => void; children: ReactNode; disabled?: boolean; tone?: 'glass' | 'red'; className?: string; hold?: number; extra?: HTMLAttributes<HTMLButtonElement> }) {
  return (
    <button type="button" className={`cl-btn cl-btn--${tone}${on ? ' is-on' : ''} ${className}`} aria-pressed={on === undefined ? undefined : on} disabled={disabled} onClick={onClick}
      data-hold={hold ? '' : undefined} style={hold ? { ['--hold' as string]: hold } : undefined} {...extra}>
      <span className="cl-btn__disc">{children}</span>
      <span className="cl-btn__label">{label}</span>
    </button>
  );
}

function StatusBar() {
  return (
    <div className="cl-status" aria-hidden="true">
      <span className="cl-status__time">11:00</span>
      <span className="cl-status__island">
        <svg width="56" height="46" viewBox="0 0 56 46" fill="none" stroke="#30d158" strokeWidth="6" strokeLinecap="round"><rect x="4" y="12" width="30" height="22" rx="11" transform="rotate(-18 19 23)" /><rect x="22" y="12" width="30" height="22" rx="11" transform="rotate(-18 37 23)" /></svg>
      </span>
      <svg className="cl-status__signal" width="44" height="30" viewBox="0 0 22 14" fill="#fff"><rect x="0" y="9" width="3.600" height="5" rx="1.100" /><rect x="6" y="6.500" width="3.600" height="7.500" rx="1.100" /><rect x="12" y="3.500" width="3.600" height="10.500" rx="1.100" /><rect x="18" y="0" width="3.600" height="14" rx="1.100" /></svg>
      <span className="cl-status__net">5G</span>
      <span className="cl-status__bat"><b>55</b></span>
      <i className="cl-status__dot" />
    </div>
  );
}

function pad(n: number) { return String(n).padStart(2, '0'); }

function Key({ d, l, onType }: { d: string; l: string; onType: (c: string) => void }) {
  const lp = useLongPress(() => onType('+'), 500);
  return (
    <button type="button" className="cl-key" data-pressing={d === '0' && lp.pressing ? '' : undefined} aria-label={d === '0' ? '0, press and hold for plus' : d} onClick={() => onType(d)} {...(d === '0' ? lp.bind : {})}>
      <span className="cl-key__d">{d}</span>
      <span className="cl-key__l">{l}</span>
    </button>
  );
}

type View = 'call' | 'keypad' | 'ended';
const KEYS: [string, string][] = [['1', ''], ['2', 'ABC'], ['3', 'DEF'], ['4', 'GHI'], ['5', 'JKL'], ['6', 'MNO'], ['7', 'PQRS'], ['8', 'TUV'], ['9', 'WXYZ'], ['*', ''], ['0', '+'], ['#', '']];

/**
 * The call screen. Speaker and Mute toggle, the timer runs, Keypad opens a dial pad, End shows "Call Ended" and then returns to the call.
 * Gestures: press and hold End to hang up (a ring fills; a tap only shows the hint), press and hold 0 for +, swipe the keypad down to hide it,
 * and type digits on a real keyboard.
 */
export function CallScreen() {
  const [view, setView] = useState<View>('call');
  const [seconds, setSeconds] = useState(216); // 03:36
  const [speaker, setSpeaker] = useState(true);
  const [muted, setMuted] = useState(false);
  const [typed, setTyped] = useState('');

  // The design bench (?bench=1) freezes the clock so measurements stay stable.
  const frozen = new URLSearchParams(window.location.search).get('bench') === '1';

  useEffect(() => {
    if (view === 'ended' || frozen) return;
    const t = window.setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => window.clearInterval(t);
  }, [view, frozen]);

  useEffect(() => {
    if (view !== 'ended') return;
    const t = window.setTimeout(() => { setSeconds(216); setView('call'); setTyped(''); }, 2600);
    return () => window.clearTimeout(t);
  }, [view]);

  const ended = view === 'ended';
  const [hint, setHint] = useState(false);
  const holdEnd = useHold(() => { setHint(false); setView('ended'); }, 900);
  const swipePad = useSwipe({ axis: 'y', threshold: 70, flickSpeed: 0.7, onSwipe: (d) => { if (d === 'down') setView('call'); } });
  const type = (c: string) => setTyped((t) => (t + c).slice(-14));

  useEffect(() => {
    if (!hint) return;
    const t = window.setTimeout(() => setHint(false), 1800);
    return () => window.clearTimeout(t);
  }, [hint]);

  useEffect(() => {
    if (view !== 'keypad') return;
    const onKey = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      if (/^[0-9*#+]$/.test(e.key)) type(e.key);
      else if (e.key === 'Backspace') setTyped((t) => t.slice(0, -1));
      else if (e.key === 'Escape') setView('call');
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [view]);

  const clock = `${pad(Math.floor(seconds / 60))}:${pad(seconds % 60)}`;

  return (
    <PhoneFrame bare height={692}>
      <div className={`cl${ended ? ' is-ended' : ''}`}>
        <StatusBar />
        <svg className="cl-wave" width="66" height="66" viewBox="0 0 66 66" aria-hidden="true"><g stroke="#fff" strokeWidth="5" strokeLinecap="round"><path d="M6 24v18M16 14v38M26 24v20M36 8v32M46 24v12" /></g><circle cx="52" cy="52" r="13" fill="#fff" /><circle cx="52" cy="52" r="6" fill="#55524f" /></svg>
        <button type="button" className="cl-info" aria-label="Contact info"><span>i</span></button>
        <p className="cl-timer" aria-live="off">{ended ? 'Call Ended' : clock}</p>
        <h1 className="cl-name">Mimi</h1>

        {view === 'keypad' && <p className="cl-typed" aria-label="Typed digits">{typed}</p>}

        {view !== 'keypad' && (
          <div className="cl-grid" key="grid">
            <Round label="Speaker" on={speaker} disabled={ended} onClick={() => setSpeaker((v) => !v)}><SpeakerIcon /></Round>
            <Round label="FaceTime" disabled={ended}><FaceTimeIcon /></Round>
            <Round label="Mute" on={muted} disabled={ended} onClick={() => setMuted((v) => !v)}><MuteIcon /></Round>
            <Round label="Add" disabled={ended}><AddIcon /></Round>
            <Round label="End" tone="red" disabled={ended} hold={holdEnd.progress} onClick={() => setHint(true)} extra={holdEnd.bind}><EndIcon /></Round>
            <Round label="Keypad" disabled={ended} onClick={() => setView('keypad')}><KeypadIcon /></Round>
          </div>
        )}

        {hint && !ended && <p className="cl-hint" role="status">Press and hold End to hang up</p>}

        {view === 'keypad' && (
          <div className="cl-pad" key="pad" {...swipePad.bind}>
            {KEYS.map(([d, l]) => <Key key={d} d={d} l={l} onType={type} />)}
            <Round label="End" tone="red" className="cl-pad__end" onClick={() => setView('ended')}><EndIcon /></Round>
            <button type="button" className="cl-hide" onClick={() => setView('call')}>Hide</button>
          </div>
        )}
        <span className="cl-home" aria-hidden="true" />
      </div>
    </PhoneFrame>
  );
}
