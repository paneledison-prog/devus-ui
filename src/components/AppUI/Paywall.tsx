import { useId, type ReactNode } from 'react';
import './Paywall.css';

/*
 * Premium paywall and restoring screens, drawn on a 446x970 canvas that is scaled to the 320px phone.
 * All coordinates are in canvas pixels, taken from the reference image.
 */

/** 446x970 canvas, scaled by CSS zoom to the phone width. */
export function PayCanvas({ children, tone, swipe }: { children: ReactNode; tone: 'paywall' | 'restoring'; swipe?: object }) {
  return <div className={`pw-root pw--${tone}`} {...swipe}>{children}</div>;
}

/** White status bar: time on the left, signal, wifi and battery on the right. */
export function PayStatusBar() {
  return (
    <div className="pw-status" aria-hidden="true">
      <span className="pw-status__time">9:41</span>
      <svg className="pw-status__signal" width="21" height="14" viewBox="0 0 21 14" fill="currentColor"><rect x="0" y="9" width="3.6" height="5" rx="1.2" /><rect x="5.8" y="6.5" width="3.6" height="7.5" rx="1.2" /><rect x="11.6" y="3.5" width="3.6" height="10.5" rx="1.2" /><rect x="17.4" y="0" width="3.6" height="14" rx="1.2" /></svg>
      <svg className="pw-status__wifi" width="22" height="16" viewBox="0 0 24 18" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round"><path d="M2 6.5a14 14 0 0 1 20 0" /><path d="M6 11a8.5 8.5 0 0 1 12 0" /><circle cx="12" cy="15.4" r="1.7" fill="currentColor" stroke="none" /></svg>
      <svg className="pw-status__battery" width="26" height="13" viewBox="0 0 26 13" fill="currentColor"><rect width="26" height="13" rx="4.2" /></svg>
    </div>
  );
}

/** Rounded home indicator bar. */
export function PayHomeBar({ dark = false }: { dark?: boolean }) {
  return <span className={`pw-home${dark ? ' pw-home--dark' : ''}`} aria-hidden="true" />;
}

/* ---------- Clay artwork (own SVG: a vertical gradient with blurred light and shadow blobs, clipped to the shape) ---------- */
interface Light { cx: number; cy: number; rx: number; ry: number; color: string; opacity?: number }

function Clay({ id, vb, clip, hole, base, lights, blur = 9, className }: {
  id: string; vb: [number, number, number, number]; className?: string; blur?: number;
  clip: ReactNode; hole?: ReactNode; base: [string, string]; lights: Light[];
}) {
  const [x, y, w, h] = vb;
  return (
    <svg className={className} width={w} height={h} viewBox={`${x} ${y} ${w} ${h}`} aria-hidden="true" focusable="false">
      <defs>
        <clipPath id={`${id}-c`}>{clip}</clipPath>
        <linearGradient id={`${id}-g`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={base[0]} /><stop offset="1" stopColor={base[1]} /></linearGradient>
        <filter id={`${id}-b`} x="-40%" y="-40%" width="180%" height="180%"><feGaussianBlur stdDeviation={blur} /></filter>
      </defs>
      <g clipPath={`url(#${id}-c)`}>
        <rect x={x} y={y} width={w} height={h} fill={`url(#${id}-g)`} />
        <g filter={`url(#${id}-b)`}>
          {lights.map((l, i) => <ellipse key={i} cx={l.cx} cy={l.cy} rx={l.rx} ry={l.ry} fill={l.color} opacity={l.opacity ?? 0.8} />)}
        </g>
      </g>
      {hole}
    </svg>
  );
}

/** Soft white clay cloud that hangs from the top edge. */
export function ClayCloud() {
  const id = useId().replace(/:/g, '');
  return (
    <Clay
      id={id} className="pw-art pw-art--cloud" vb={[0, 0, 446, 150]} base={['#F2EFEA', '#E0DBD2']} blur={12}
      lights={[
        { cx: 150, cy: 30, rx: 90, ry: 30, color: '#FFFFFF', opacity: 0.7 }, { cx: 292, cy: 28, rx: 90, ry: 28, color: '#FFFFFF', opacity: 0.6 },
        { cx: 150, cy: 138, rx: 60, ry: 14, color: '#C9C2B6', opacity: 0.75 }, { cx: 290, cy: 136, rx: 60, ry: 14, color: '#C9C2B6', opacity: 0.75 },
        { cx: 24, cy: 46, rx: 36, ry: 10, color: '#CFC8BC', opacity: 0.7 }, { cx: 422, cy: 46, rx: 36, ry: 10, color: '#CFC8BC', opacity: 0.7 },
        { cx: 220, cy: 104, rx: 14, ry: 10, color: '#BFB7AB', opacity: 0.5 },
      ]}
      clip={<><ellipse cx="150" cy="70" rx="80" ry="63" /><ellipse cx="290" cy="68" rx="80" ry="63" /><ellipse cx="30" cy="-10" rx="86" ry="60" /><ellipse cx="416" cy="-10" rx="86" ry="60" /><rect x="76" y="-20" width="294" height="62" /></>}
    />
  );
}

/** Blue clay cloud-shaped ring (rounded frame with bumpy edges and a square hole). */
export function ClayRing() {
  const id = useId().replace(/:/g, '');
  return (
    <Clay
      id={id} className="pw-art pw-art--ring" vb={[0, 380, 446, 232]} base={['#58C1FC', '#3FA6EA']} blur={8}
      lights={[
        { cx: 128, cy: 424, rx: 46, ry: 24, color: '#9FE3FF', opacity: 0.95 }, { cx: 258, cy: 422, rx: 44, ry: 22, color: '#9FE3FF', opacity: 0.9 },
        { cx: 46, cy: 505, rx: 24, ry: 18, color: '#92DDFF', opacity: 0.85 }, { cx: 366, cy: 504, rx: 24, ry: 18, color: '#92DDFF', opacity: 0.8 },
        { cx: 222, cy: 490, rx: 130, ry: 14, color: '#7FD3FF', opacity: 0.5 },
        { cx: 222, cy: 440, rx: 10, ry: 30, color: '#3597E2', opacity: 0.55 }, { cx: 98, cy: 480, rx: 16, ry: 14, color: '#3597E2', opacity: 0.5 }, { cx: 342, cy: 478, rx: 16, ry: 14, color: '#3597E2', opacity: 0.5 },
        { cx: 222, cy: 548, rx: 130, ry: 12, color: '#2D8AD4', opacity: 0.45 },
        { cx: 222, cy: 608, rx: 190, ry: 26, color: '#2E8CD6', opacity: 0.6 },
      ]}
      clip={<><circle cx="157" cy="452" r="66" /><circle cx="290" cy="448" r="66" /><circle cx="70" cy="530" r="56" /><circle cx="385" cy="530" r="54" /><rect x="62" y="470" width="326" height="200" rx="60" /></>}
      hole={<><rect x="138" y="525" width="167" height="120" rx="32" fill="#62C5FF" /><rect x="138" y="525" width="167" height="34" rx="28" fill={`url(#${id}-s)`} /><defs><linearGradient id={`${id}-s`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#2D86CF" stopOpacity=".5" /><stop offset="1" stopColor="#2D86CF" stopOpacity="0" /></linearGradient></defs></>}
    />
  );
}

/** Small white clay flower-shaped ring. */
export function ClayFlower() {
  const id = useId().replace(/:/g, '');
  const lobes = Array.from({ length: 10 }, (_, i) => {
    const a = (i * Math.PI) / 5 - Math.PI / 2;
    return <circle key={i} cx={60 + Math.cos(a) * 41} cy={60 + Math.sin(a) * 41} r="15" />;
  });
  return (
    <Clay
      id={id} className="pw-art pw-art--flower" vb={[0, 0, 120, 120]} base={['#F1ECE4', '#D6CEC1']} blur={5}
      lights={[{ cx: 44, cy: 34, rx: 26, ry: 14, color: '#FFFFFF', opacity: 0.95 }, { cx: 78, cy: 40, rx: 18, ry: 10, color: '#FFFFFF', opacity: 0.8 }, { cx: 64, cy: 104, rx: 40, ry: 12, color: '#B6AD9E', opacity: 0.75 }]}
      clip={<><circle cx="60" cy="60" r="42" />{lobes}</>}
      hole={<rect x="38" y="38" width="44" height="44" rx="13" transform="rotate(18 60 60)" fill="#62C5FF" />}
    />
  );
}

/* ---------- Paywall pieces ---------- */
export interface Plan { id: string; name: string; price: string; perYear: string; was?: string; selected?: boolean }

function Radio({ on }: { on: boolean }) {
  return on
    ? <span className="pw-radio pw-radio--on" aria-hidden="true"><svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="m2.4 6.4 2.4 2.4 4.8-5.2" /></svg></span>
    : <span className="pw-radio" aria-hidden="true" />;
}

/** One plan row of the paywall sheet. A radio button: tap to select the plan. */
export function PlanRow({ plan, top, onSelect }: { plan: Plan; top: number; onSelect?: () => void }) {
  return (
    <button type="button" role="radio" aria-checked={!!plan.selected} className="pw-plan" style={{ top }} onClick={onSelect} aria-label={`${plan.name}, ${plan.perYear}${plan.was ? ` instead of ${plan.was}` : ''}, ${plan.price}`}>
      <Radio on={!!plan.selected} />
      <span className="pw-plan__name">{plan.name}</span>
      <span className="pw-plan__sub">{plan.perYear}{plan.was && <s className="pw-plan__was">{plan.was}</s>}</span>
      <span className="pw-plan__price">{plan.price}</span>
    </button>
  );
}

/** A tilted white plan card (used while purchases are being restored). */
export function PlanCard({ plan, x, y, rotate, text, children }: { plan?: Plan; x: number; y: number; rotate: number; text?: string; children?: ReactNode }) {
  return (
    <div className={`pw-card${plan ? '' : ' pw-card--price'}`} style={{ left: x, top: y, transform: `translate(-50%, -50%) rotate(${rotate}deg)` }} aria-hidden="true">
      {plan && (<>
        <Radio on={!!plan.selected} />
        <span className="pw-card__name">{plan.name}</span>
        <span className="pw-card__sub">{plan.perYear}</span>
        <span className="pw-card__price">{plan.price}</span>
      </>)}
      {text && <span className="pw-card__price">{text}</span>}
      {children}
    </div>
  );
}

export const UpArrow = () => <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M6 10V2.4M2.8 5.4 6 2.2l3.2 3.2" /></svg>;
