import { useId, type ReactNode } from 'react';
import './Widgets.css';
import guitarist from './assets/guitarist.jpg';
import portrait from './assets/portrait.jpg';
import streetMap from './assets/street-map.svg';

/* Six 305x360 glance widgets. The photos and the street map are generated assets (see assets/README.md). */

function Tile({ children, label, className = '' }: { children: ReactNode; label: string; className?: string }) {
  return <section className={`wg ${className}`} aria-label={label}>{children}</section>;
}

/** Music player: cover photo, title, artist and transport controls. */
export function MusicWidget({ title = 'What you need', artist = 'Don Toliver', playing = true }: { title?: string; artist?: string; playing?: boolean }) {
  return (
    <Tile label="Now playing">
      <img className="wg__photo" src={guitarist} alt="" style={{ objectPosition: '45% 55%' }} />
      <h3 className="wg__title">{title}</h3>
      <p className="wg__sub">{artist}</p>
      <button type="button" className="wg__skip wg__skip--back" aria-label="Previous track">
        <svg width="42" height="24" viewBox="0 0 42 24" fill="currentColor" aria-hidden="true"><path d="M20 2v20L3 12 20 2Z" /><path d="M40 2v20L23 12 40 2Z" /></svg>
      </button>
      <button type="button" className="wg__round wg__round--blue" aria-label={playing ? 'Pause' : 'Play'}>
        <svg width="26" height="28" viewBox="0 0 26 28" fill="#fff" aria-hidden="true"><rect x="3" y="2" width="7" height="24" rx="2.500" /><rect x="16" y="2" width="7" height="24" rx="2.500" /></svg>
      </button>
      <button type="button" className="wg__skip wg__skip--next" aria-label="Next track">
        <svg width="42" height="24" viewBox="0 0 42 24" fill="currentColor" aria-hidden="true"><path d="M2 2v20l17-10L2 2Z" /><path d="M22 2v20l17-10L22 2Z" /></svg>
      </button>
    </Tile>
  );
}

/** Navigation: a street map with a route, the current position and a distance pill. */
export function NavigationWidget({ distance = '416 m', street = 'Kottayam' }: { distance?: string; street?: string }) {
  return (
    <Tile label="Navigation" className="wg--map">
      <img className="wg__map" src={streetMap} alt="" />
      <svg className="wg__route" width="305" height="360" viewBox="0 0 305 360" fill="none" aria-hidden="true">
        <path d="M167 0v76" stroke="#2b85e8" strokeWidth="7" strokeLinecap="round" opacity=".9" />
        <path d="M97 100c-6 14 8 22 10 36 3 16 15 22 15 28 0 10-20 8-20 20 0 14 18 12 20 30 1 8 7 18 7 26" stroke="#2b85e8" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M0-20 15 16 0 9-15 16Z" transform="translate(139 264) rotate(-28)" fill="#2b85e8" stroke="#fff" strokeWidth="1.500" strokeLinejoin="round" />
      </svg>
      <div className="wg__pill">
        <span className="wg__runner" aria-hidden="true">
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="#1d6fcb" strokeWidth="2.400" strokeLinecap="round" strokeLinejoin="round"><circle cx="16.500" cy="6" r="2.400" fill="#1d6fcb" stroke="none" /><path d="m10 24 3.500-5.500-3-3 3-6 5 3.500 3.500-1M13.500 18.500 17 21l1 3.500M12 11l-4 3" /></svg>
        </span>
        <span className="wg__dist">{distance}</span>
        <span className="wg__street">{street}</span>
        <svg className="wg__up" width="22" height="24" viewBox="0 0 22 24" fill="none" stroke="#1d6fcb" strokeWidth="2.400" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M11 21V4M4 10.500 11 3.500l7 7" /></svg>
      </div>
    </Tile>
  );
}

/** Incoming call: caller photo, name, status, accept and decline. */
export function CallWidget({ name = 'Jason Lambert', status = 'Incoming Call' }: { name?: string; status?: string }) {
  return (
    <Tile label="Incoming call">
      <img className="wg__photo" src={portrait} alt="" style={{ objectPosition: '50% 24%' }} />
      <h3 className="wg__title">{name}</h3>
      <p className="wg__sub">{status}</p>
      <button type="button" className="wg__round wg__round--green wg__round--accept" aria-label="Accept call">
        <svg width="28" height="28" viewBox="0 0 28 28" fill="#fff" aria-hidden="true"><path d="M8.600 4.500c.8-.8 2-.7 2.700.2l2 2.800c.6.800.5 1.900-.2 2.600l-1 1c1.200 2.400 3 4.300 5.500 5.700l1.100-1c.7-.7 1.800-.8 2.600-.2l2.700 2c.9.700 1 1.900.2 2.700l-1.300 1.300c-1.100 1.100-2.700 1.500-4.200 1C12.500 21.800 7 16.300 4.800 10.300c-.5-1.500-.1-3.100 1-4.200l2.800-1.600Z" transform="translate(0 -1) scale(.98)" /></svg>
      </button>
      <button type="button" className="wg__round wg__round--red wg__round--decline" aria-label="Decline call">
        <svg width="30" height="18" viewBox="0 0 30 18" fill="#e5322d" aria-hidden="true"><path d="M15 3c-4.500 0-8 1.200-10.500 3.200-.9.800-1 2.100-.3 3l1.400 1.700c.7.800 1.800 1 2.700.4l2.500-1.500c.6-.4.900-1 .8-1.700l-.1-1c1.500-.5 3.100-.5 4.600 0l-.1 1c-.1.700.2 1.300.8 1.700l2.500 1.500c.9.600 2 .4 2.700-.4l1.400-1.700c.7-.9.600-2.200-.3-3C23 4.200 19.500 3 15 3Z" /></svg>
      </button>
    </Tile>
  );
}

/** Heart rate: the reading and a filled line chart. */
export function HeartRateWidget({ bpm = 92 }: { bpm?: number }) {
  const id = useId().replace(/:/g, '');
  const line = 'M6 255C30 240 45 262 58 278c14 14 28 2 40-20 8-14 16-24 24-18 14 10 22 38 38 36 10-2 14-16 22-36 8-20 16-52 26-52 10 0 14 32 22 54 8 20 18 22 26 4 8-18 14-34 24-28 8 6 12 8 20 6V360H6Z';
  const stroke = line.replace(/V360H6Z$/, '');
  return (
    <Tile label="Heart rate" className="wg--chart">
      <p className="wg__big" style={{ top: 94 }}>{bpm}</p>
      <p className="wg__unit">BPM</p>
      <svg className="wg__chart" width="293" height="354" viewBox="6 0 293 354" aria-hidden="true">
        <defs><linearGradient id={`${id}-f`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#FBB98A" /><stop offset="1" stopColor="#FEEBDC" /></linearGradient></defs>
        <path d={line} fill={`url(#${id}-f)`} />
        <path d={stroke} fill="none" stroke="#E8821E" strokeWidth="3.200" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </Tile>
  );
}

/** Progress ring: a date, the percentage inside a ring and a caption. */
export function ProgressRingWidget({ percent = 60, date = 'JUL 26', caption = 'TRACK PROGRESS' }: { percent?: number; date?: string; caption?: string }) {
  const r = 82; const c = 2 * Math.PI * r;
  return (
    <Tile label="Progress" className="wg--ring">
      <p className="wg__date">{date}</p>
      <svg className="wg__ringsvg" width="210" height="210" viewBox="0 0 210 210" fill="none" aria-hidden="true">
        <circle cx="105" cy="105" r="98" stroke="#F1F1F3" strokeWidth="2" />
        <circle cx="105" cy="105" r={r} stroke="#F4F4F6" strokeWidth="11" />
        <circle cx="105" cy="105" r={r} stroke="#2D8CF0" strokeWidth="11" strokeLinecap="round" strokeDasharray={`${(c * percent) / 100} ${c}`} transform="rotate(-70 105 105)" />
      </svg>
      <p className="wg__percent">{percent}%</p>
      <p className="wg__caption">{caption}</p>
    </Tile>
  );
}

/** Alarm: page dots, the time and a snooze / stop slider with the alarm button in the middle. */
export function AlarmWidget({ time = '7:30 AM' }: { time?: string }) {
  return (
    <Tile label="Alarm">
      <div className="wg__dots" aria-hidden="true"><i className="is-on" /><i /><i /></div>
      <p className="wg__time">{time}</p>
      <div className="wg__track">
        <span className="wg__snooze">Snooze</span>
        <span className="wg__stop">Stop</span>
        <button type="button" className="wg__round wg__round--blue wg__alarm" aria-label="Alarm">
          <svg width="30" height="30" viewBox="0 0 30 30" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="15" cy="16.500" r="9" /><path d="M15 11.500v5l3 2M5 8l4-3.500M25 8l-4-3.500" /></svg>
        </button>
      </div>
    </Tile>
  );
}
