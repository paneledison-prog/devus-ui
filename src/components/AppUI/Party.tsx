import { useState, type ReactElement } from 'react';
import { PhoneFrame } from './PhoneFrame';
import { useScrub, useSwipe } from './gestures';
import './Party.css';
import bg from './assets/party/bg.jpg';
import memoji from './assets/party/memoji.jpg';

/*
 * Housewarming party invitation, drawn on a 517x1126 canvas scaled to the 320px phone (320 / 517).
 * Coordinates are canvas pixels taken from the reference image. The photo and the avatar are generated image assets.
 */

type Rsvp = 'going' | 'not' | 'maybe';

const Check = () => <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden="true"><circle cx="11" cy="11" r="10" fill="currentColor" /><path d="m6.200 11.200 3.200 3.200 6.200-6.600" fill="none" stroke="#fff" strokeWidth="2.200" strokeLinecap="round" strokeLinejoin="round" /></svg>;
const Cross = () => <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden="true"><circle cx="11" cy="11" r="10" fill="currentColor" /><path d="m7.600 7.600 6.800 6.800M14.400 7.600l-6.800 6.800" stroke="#fff" strokeWidth="2.200" strokeLinecap="round" /></svg>;
const Question = () => <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden="true"><circle cx="11" cy="11" r="10" fill="currentColor" /><path d="M8.400 8.600c0-1.700 1.200-2.600 2.700-2.600s2.600.9 2.600 2.300c0 1.800-2.200 1.900-2.200 3.500" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" /><circle cx="11.300" cy="15.400" r="1.200" fill="#fff" /></svg>;

const options: { id: Rsvp; label: string; icon: ReactElement; tone: string }[] = [
  { id: 'going', label: 'Going', icon: <Check />, tone: '#1fa34a' },
  { id: 'not', label: 'Not Going', icon: <Cross />, tone: '#e5484d' },
  { id: 'maybe', label: 'Maybe', icon: <Question />, tone: '#d9962b' },
];
const lefts = [0, 147, 304];
const widths = [147, 157, 157];

/**
 * The invitation. The RSVP control is live: Going, Not Going and Maybe slide a white pill under the choice.
 * Gestures: slide a finger along the RSVP bar to choose, swipe the invitation down (or tap close) to dismiss it.
 */
export function PartyInvite() {
  const [rsvp, setRsvp] = useState<Rsvp>('going');
  const [open, setOpen] = useState(true);
  const idx = options.findIndex((o) => o.id === rsvp);
  const slide = useScrub((f) => setRsvp(f < 0.319 ? 'going' : f < 0.659 ? 'not' : 'maybe'));
  const swipe = useSwipe({ axis: 'y', threshold: 110, flickSpeed: 0.8, ignore: '.pt-rsvp', onSwipe: (d) => { if (d === 'down') setOpen(false); } });
  if (!open) {
    return (
      <PhoneFrame bare height={697} tone="light">
        <div className="pt-closed"><p>Invitation closed</p><button type="button" onClick={() => setOpen(true)}>Open the invitation</button></div>
      </PhoneFrame>
    );
  }
  return (
    <PhoneFrame bare height={697} tone="light">
      <div className="pt" {...swipe.bind}>
        <img className="pt-bg" src={bg} alt="" />
        <div className="pt-shade" aria-hidden="true" />
        <button type="button" className="pt-round pt-round--close" aria-label="Close" onClick={() => setOpen(false)}><svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="#fff" strokeWidth="2.400" strokeLinecap="round" aria-hidden="true"><path d="m4 4 14 14M18 4 4 18" /></svg></button>
        <button type="button" className="pt-round pt-round--more" aria-label="More"><svg width="26" height="6" viewBox="0 0 26 6" fill="#fff" aria-hidden="true"><circle cx="3" cy="3" r="2.800" /><circle cx="13" cy="3" r="2.800" /><circle cx="23" cy="3" r="2.800" /></svg></button>

        <h1 className="pt-title">Housewarming<br />Party</h1>
        <p className="pt-when">19 September, 12 pm<br />1559 Audubon Ave<br />New York, NY</p>

        <div className="pt-rsvp" role="radiogroup" aria-label="Your RSVP" data-sliding={slide.active || undefined} {...slide.bind}>
          <span className="pt-rsvp__pill" aria-hidden="true" style={{ left: lefts[idx], width: widths[idx] }} />
          <span className="pt-rsvp__rule" aria-hidden="true" style={{ opacity: idx === 1 || idx === 2 ? 0 : 1, left: 334 }} />
          {options.map((o, i) => (
            <button key={o.id} type="button" role="radio" aria-checked={rsvp === o.id} className={`pt-rsvp__opt${rsvp === o.id ? ' is-on' : ''}`} style={{ left: lefts[i], width: widths[i], color: rsvp === o.id ? o.tone : undefined }} onClick={() => setRsvp(o.id)} onKeyDown={(e) => { if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') { e.preventDefault(); setRsvp(options[(i + (e.key === 'ArrowRight' ? 1 : 2)) % 3].id); } }}>
              <span className="pt-rsvp__icon" style={{ color: rsvp === o.id ? o.tone : 'rgb(255 255 255 / .55)' }}>{o.icon}</span>
              <span>{o.label}</span>
            </button>
          ))}
        </div>

        <section className="pt-card" aria-label="Hosted by Andre Lorico">
          <img className="pt-card__avatar" src={memoji} alt="" />
          <p className="pt-card__host">Hosted by Andre Lorico</p>
          <p className="pt-card__lead">We&rsquo;ve just moved to New York!<br />And warmer weather means<br />housewarming!</p>
          <p className="pt-card__more">We&rsquo;ll have light refreshments, drinks and<br />BBQing in the evening. Stop by to hang<br />out, catch up and friends meet friends!</p>
        </section>

        <button type="button" className="pt-scroll">Scroll Down to see full post<svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="11" fill="currentColor" /><path d="m7.500 9.500 4.500 4 4.500-4M7.500 13.500l4.500 4 4.500-4" fill="none" stroke="#1c3a3c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg></button>
        <span className="pt-home" aria-hidden="true" />
      </div>
    </PhoneFrame>
  );
}
