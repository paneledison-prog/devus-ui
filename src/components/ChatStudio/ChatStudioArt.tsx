import { useId } from 'react';

/* Own artwork for the chat studio: portraits, the logo mark and abstract "generated" pictures. SVG only. */

export type PersonId = 'margo' | 'dimitri' | 'kate' | 'wen' | 'alex' | 'me' | 'iris';
interface Look { bg: [string, string]; skin: string; hair: string; top: string; style: 'long' | 'bald' | 'short' | 'cap' | 'bun' | 'dark' }
export const LOOKS: Record<PersonId, Look> = {
  margo: { bg: ['#d8a67f', '#a96f4a'], skin: '#f0c9a8', hair: '#3a2418', top: '#f2f0ea', style: 'long' },
  dimitri: { bg: ['#d9d9d6', '#9d9d9a'], skin: '#8a8a88', hair: '#161616', top: '#1c1c1c', style: 'bald' },
  kate: { bg: ['#4a3a34', '#1d1512'], skin: '#d9a98a', hair: '#1a1210', top: '#2a2420', style: 'short' },
  wen: { bg: ['#8fa86a', '#5e7a42'], skin: '#2a2a2a', hair: '#0f0f0f', top: '#111', style: 'dark' },
  alex: { bg: ['#b8553d', '#7a2c22'], skin: '#e7b693', hair: '#201512', top: '#2b3f5e', style: 'short' },
  me: { bg: ['#c9c2b4', '#8d8678'], skin: '#e5b896', hair: '#4a3626', top: '#d9d4c6', style: 'cap' },
  iris: { bg: ['#e8c7c0', '#c28a82'], skin: '#f1cdb0', hair: '#7a4a2a', top: '#f7f2e8', style: 'bun' },
};

export function Face({ id, size }: { id: PersonId; size: number }) {
  const l = LOOKS[id];
  const u = useId().replace(/:/g, '');
  const hair = {
    long: <path d="M24 56c-6-26 6-40 26-40s32 14 26 40l-8 6c2-14-2-26-18-26s-20 12-18 26Z" fill={l.hair} />,
    bald: <path d="M36 40c2-8 8-12 14-12s12 4 14 12c-5-4-9-5-14-5s-9 1-14 5Z" fill="#303030" opacity=".5" />,
    short: <path d="M31 46c0-18 8-26 19-26s19 8 19 26c-3-9-9-12-19-12s-16 3-19 12Z" fill={l.hair} />,
    cap: <g><path d="M29 44c0-14 9-22 21-22s21 8 21 22Z" fill="#2b2b2b" /><path d="M26 44h40l8 4H26Z" fill="#1c1c1c" /></g>,
    bun: <g fill={l.hair}><circle cx="50" cy="16" r="9" /><path d="M31 46c0-16 8-24 19-24s19 8 19 24c-3-8-9-11-19-11s-16 3-19 11Z" /></g>,
    dark: <path d="M30 48c0-20 8-28 20-28s20 8 20 28c-3-10-9-13-20-13s-17 3-20 13Z" fill={l.hair} />,
  }[l.style];
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden="true" focusable="false" className="cs-face">
      <defs><linearGradient id={`b${u}`} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor={l.bg[0]} /><stop offset="1" stopColor={l.bg[1]} /></linearGradient></defs>
      <rect width="100" height="100" fill={`url(#b${u})`} />
      <path d="M10 100c2-20 16-30 40-30s38 10 40 30Z" fill={l.top} />
      <rect x="43" y="56" width="14" height="16" rx="6" fill={l.skin} />
      <ellipse cx="50" cy="46" rx="17" ry="20" fill={l.skin} />
      {hair}
      <circle cx="43" cy="47" r="1.800" fill="#1a1412" /><circle cx="57" cy="47" r="1.800" fill="#1a1412" />
      <path d="M44 56c3 3 9 3 12 0" stroke="#7a4a3a" strokeWidth="1.600" fill="none" strokeLinecap="round" />
    </svg>
  );
}

/** The logo mark: a black disc with a bowtie "X". */
export function Logo({ size = 34 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 34 34" aria-hidden="true" focusable="false">
      <circle cx="17" cy="17" r="17" fill="currentColor" />
      <path d="M9 11h16l-8 6 8 6H9l8-6Z" fill="var(--cs-logo-ink, #fff)" />
    </svg>
  );
}

export type PicId = 'planet' | 'ink' | 'forest' | 'sand' | 'moon' | 'wave';

/** Abstract pictures used in the stack and the gradient card. */
export function Pic({ id }: { id: PicId }) {
  const u = useId().replace(/:/g, '');
  switch (id) {
    case 'ink':
      return (
        <svg viewBox="0 0 200 238" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
          <defs><linearGradient id={`i${u}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#f4f6f8" /><stop offset="1" stopColor="#b9c2c8" /></linearGradient><filter id={`f${u}`}><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" seed="3" /><feColorMatrix values="0 0 0 0 .05  0 0 0 0 .05  0 0 0 0 .06  0 0 0 -9 5.2" /></filter></defs>
          <rect width="200" height="238" fill={`url(#i${u})`} />
          <g fill="#0b0b0c">
            {Array.from({ length: 260 }, (_, i) => {
              const t = i / 260; const x = 6 + Math.pow(t, 1.4) * 186 + Math.sin(i * 12.9) * 8; const y = 128 - t * 58 + Math.cos(i * 7.3) * (34 - t * 18);
              return <circle key={i} cx={x} cy={y} r={0.5 + ((i * 37) % 10) / 4.5 * (1.2 - t * 0.7)} opacity={0.35 + ((i * 13) % 6) / 9} />;
            })}
            <path d="M0 122c24-10 46-12 70-8 22 4 34-2 48-12-18 14-34 24-60 24-26 0-44 4-58 14Z" opacity=".9" />
          </g>
          <rect width="200" height="238" filter={`url(#f${u})`} opacity=".12" />
        </svg>
      );
    case 'planet':
      return (
        <svg viewBox="0 0 120 150" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
          <defs><radialGradient id={`p${u}`} cx=".35" cy=".3" r=".8"><stop offset="0" stopColor="#4d9bff" /><stop offset="1" stopColor="#0b2a66" /></radialGradient></defs>
          <rect width="120" height="150" fill="#0b1630" /><circle cx="70" cy="90" r="62" fill={`url(#p${u})`} /><circle cx="30" cy="30" r="1.200" fill="#fff" /><circle cx="95" cy="18" r="1" fill="#fff" /><circle cx="14" cy="80" r="1" fill="#fff" />
        </svg>
      );
    case 'forest':
      return <svg viewBox="0 0 120 150" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false"><defs><linearGradient id={`g${u}`} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#4a8a7c" /><stop offset="1" stopColor="#102a28" /></linearGradient></defs><rect width="120" height="150" fill={`url(#g${u})`} /><path d="M0 110c30-30 60-30 120-6v46H0Z" fill="#0d2220" opacity=".7" /><circle cx="90" cy="34" r="16" fill="#cde8df" opacity=".35" /></svg>;
    case 'sand':
      return <svg viewBox="0 0 120 150" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false"><defs><linearGradient id={`s${u}`} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#8a7a6a" /><stop offset="1" stopColor="#3a322c" /></linearGradient></defs><rect width="120" height="150" fill={`url(#s${u})`} /><path d="M0 70c30 10 50-10 120 20v60H0Z" fill="#c4b4a0" opacity=".5" /><path d="M0 100c40-10 70 10 120-6" stroke="#e8dccb" strokeWidth="2" fill="none" opacity=".6" /></svg>;
    case 'moon':
      return (
        <svg viewBox="0 0 120 150" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
          <rect width="120" height="150" fill="#06080a" /><circle cx="60" cy="86" r="26" fill="#050505" stroke="#e8f0ff" strokeWidth="1.600" opacity=".95" /><circle cx="60" cy="86" r="30" fill="none" stroke="#9db6e8" strokeWidth=".8" opacity=".6" />
          <path d="M84 70l24 8-6 12-26-6Z" fill="#cfd8e6" opacity=".7" /><path d="M96 82l6 2" stroke="#e5334d" strokeWidth="3" strokeLinecap="round" />
        </svg>
      );
    case 'wave':
    default:
      return (
        <svg viewBox="0 0 242 147" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
          <defs>
            <linearGradient id={`w${u}`} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#7fe0c0" /><stop offset=".45" stopColor="#f2a78a" /><stop offset=".75" stopColor="#6fb8e8" /><stop offset="1" stopColor="#a8e4d4" /></linearGradient>
            <filter id={`b${u}`} x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="14" /></filter>
          </defs>
          <rect width="242" height="147" fill={`url(#w${u})`} />
          <g filter={`url(#b${u})`} opacity=".9"><circle cx="70" cy="40" r="46" fill="#f4c38a" /><circle cx="190" cy="30" r="44" fill="#f08a64" /><circle cx="40" cy="120" r="44" fill="#a2e8d0" /><circle cx="170" cy="120" r="50" fill="#5fb0e0" /></g>
          <g stroke="#fff" strokeWidth="1.400" opacity=".7">{Array.from({ length: 60 }, (_, i) => { const x = 8 + i * 3.900; const h = 8 + Math.abs(Math.sin(i * 0.5) * 40 + Math.sin(i * 1.3) * 20); return <path key={i} d={`M${x} ${74 - h / 2}v${h}`} />; })}</g>
        </svg>
      );
  }
}
