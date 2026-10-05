import { useState, type ReactElement } from 'react';
import { PhoneFrame } from './PhoneFrame';
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

/** The invitation. The RSVP control is live: Going, Not Going and Maybe slide a white pill under the choice. */
export function PartyInvite() {
  const [rsvp, setRsvp] = useState<Rsvp>('going');
  const idx = options.findIndex((o) => o.id === rsvp);
  return (
    <PhoneFrame bare height={697}>
      <div className="pt">
        <img className="pt-bg" src={bg} alt="" />
        <div className="pt-shade" aria-hidden="true" />
        <div className="pt-status" aria-hidden="true">
          <span className="pt-status__time">9:41</span>
          <span className="pt-status__island" />
          <svg className="pt-status__signal" width="30" height="20" viewBox="0 0 22 14" fill="currentColor"><rect x="0" y="9" width="3.600" height="5" rx="1.100" /><rect x="6" y="6.500" width="3.600" height="7.500" rx="1.100" /><rect x="12" y="3.500" width="3.600" height="10.500" rx="1.100" /><rect x="18" y="0" width="3.600" height="14" rx="1.100" /></svg>
          <svg className="pt-status__wifi" width="28" height="21" viewBox="0 0 24 18" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><path d="M2 6.500a14 14 0 0 1 20 0" /><path d="M6 11a8.500 8.500 0 0 1 12 0" /><circle cx="12" cy="15.400" r="1.800" fill="currentColor" stroke="none" /></svg>
          <svg className="pt-status__battery" width="42" height="20" viewBox="0 0 32 14" fill="none"><rect x="0.500" y="0.500" width="27" height="13" rx="4" stroke="currentColor" opacity=".4" /><rect x="2.500" y="2.500" width="23" height="9" rx="2.400" fill="currentColor" /><rect x="29" y="4.500" width="2.200" height="5" rx="1.100" fill="currentColor" opacity=".45" /></svg>
        </div>
        <button type="button" className="pt-round pt-round--close" aria-label="Close"><svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="#fff" strokeWidth="2.400" strokeLinecap="round" aria-hidden="true"><path d="m4 4 14 14M18 4 4 18" /></svg></button>
        <button type="button" className="pt-round pt-round--more" aria-label="More"><svg width="26" height="6" viewBox="0 0 26 6" fill="#fff" aria-hidden="true"><circle cx="3" cy="3" r="2.800" /><circle cx="13" cy="3" r="2.800" /><circle cx="23" cy="3" r="2.800" /></svg></button>

        <h1 className="pt-title">Housewarming<br />Party</h1>
        <p className="pt-when">19 September, 12 pm<br />1559 Audubon Ave<br />New York, NY</p>

        <div className="pt-rsvp" role="radiogroup" aria-label="Your RSVP">
          <span className="pt-rsvp__pill" aria-hidden="true" style={{ left: lefts[idx], width: widths[idx] }} />
          <span className="pt-rsvp__rule" aria-hidden="true" style={{ opacity: idx === 1 || idx === 2 ? 0 : 1, left: 334 }} />
          {options.map((o, i) => (
            <button key={o.id} type="button" role="radio" aria-checked={rsvp === o.id} className={`pt-rsvp__opt${rsvp === o.id ? ' is-on' : ''}`} style={{ left: lefts[i], width: widths[i], color: rsvp === o.id ? o.tone : undefined }} onClick={() => setRsvp(o.id)}>
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
