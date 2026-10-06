import { useId } from 'react';

/* Own artwork for the moodboard: pressed flowers, a framed sprig, a cat from above, a latte, a shell,
   two flower photos and the shape sticker sheet. Everything is drawn as SVG; no image files. */

export type ArtId = 'flowers' | 'frame' | 'cat' | 'coffee' | 'shell' | 'bleeding' | 'blossom';

const U = (id: string, n: string) => `${n}${id}`;

export function Art({ id }: { id: ArtId }) {
  const uid = useId().replace(/:/g, '');
  switch (id) {
    case 'flowers':
      return (
        <svg viewBox="0 0 105 135" width="100%" height="100%" aria-hidden="true" focusable="false">
          <defs>
            <linearGradient id={U(uid, 'p')} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#5c6fb8" /><stop offset="1" stopColor="#8f7ac4" /></linearGradient>
            <linearGradient id={U(uid, 'q')} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#9db0e0" /><stop offset="1" stopColor="#6a5ca8" /></linearGradient>
            <filter id={U(uid, 's')} x="-20%" y="-20%" width="140%" height="140%"><feDropShadow dx="1.500" dy="3" stdDeviation="2" floodColor="#4a3f35" floodOpacity=".35" /></filter>
          </defs>
          <g filter={`url(#${U(uid, 's')})`}>
            <path d="M52 132c-4-30-8-52-4-78M52 100c-12-4-22-14-30-28M54 88c10-6 20-8 30-14" stroke="#6f7a55" strokeWidth="2.200" fill="none" strokeLinecap="round" />
            <g transform="translate(30 38)"><g fill={`url(#${U(uid, 'p')})`} opacity=".92"><ellipse cx="0" cy="-17" rx="11" ry="17" /><ellipse cx="16" cy="-6" rx="11" ry="16" transform="rotate(72 16 -6)" /><ellipse cx="10" cy="14" rx="11" ry="16" transform="rotate(144 10 14)" /><ellipse cx="-12" cy="12" rx="11" ry="16" transform="rotate(216 -12 12)" /><ellipse cx="-17" cy="-8" rx="11" ry="16" transform="rotate(288 -17 -8)" /></g><circle r="5" fill="#e7d9a8" /></g>
            <g transform="translate(66 28)"><g fill={`url(#${U(uid, 'q')})`}><ellipse cx="0" cy="-12" rx="8" ry="13" /><ellipse cx="12" cy="-3" rx="8" ry="12" transform="rotate(72 12 -3)" /><ellipse cx="7" cy="10" rx="8" ry="12" transform="rotate(144 7 10)" /><ellipse cx="-8" cy="9" rx="8" ry="12" transform="rotate(216 -8 9)" /><ellipse cx="-12" cy="-4" rx="8" ry="12" transform="rotate(288 -12 -4)" /></g><circle r="4" fill="#efe3b8" /></g>
            <g transform="translate(40 80)" fill={`url(#${U(uid, 'p')})`} opacity=".9"><ellipse cx="0" cy="-10" rx="7" ry="10" /><ellipse cx="9" cy="-2" rx="7" ry="9" transform="rotate(72 9 -2)" /><ellipse cx="4" cy="8" rx="7" ry="9" transform="rotate(144 4 8)" /><ellipse cx="-6" cy="7" rx="7" ry="9" transform="rotate(216 -6 7)" /></g>
            <path d="M62 100c8-14 22-20 34-14-4 14-18 22-34 14Z" fill="#59605d" opacity=".9" /><path d="M62 100c10-6 20-10 32-14" stroke="#7b837f" strokeWidth="1" fill="none" />
          </g>
        </svg>
      );
    case 'frame':
      return (
        <svg viewBox="0 0 140 140" width="100%" height="100%" aria-hidden="true" focusable="false">
          <defs><pattern id={U(uid, 'l')} width="4" height="4" patternUnits="userSpaceOnUse"><path d="M0 0h4M0 2h4" stroke="#c9c8c6" strokeWidth=".5" /></pattern></defs>
          <rect width="140" height="140" fill="#cfcecc" /><rect width="140" height="140" fill={`url(#${U(uid, 'l')})`} opacity=".7" />
          <path d="M0 0c40 20 80 18 140 8v20c-50 12-100 12-140-4Z" fill="#e5e4e2" opacity=".6" />
          <rect x="24" y="18" width="92" height="108" rx="2" fill="#4a3b34" /><rect x="29" y="23" width="82" height="98" fill="#f7f6f3" /><rect x="35" y="29" width="70" height="86" fill="#efeee9" />
          <path d="M70 108c-2-24 0-44 4-62" stroke="#7c8b4a" strokeWidth="1.600" fill="none" /><g fill="#d9d36a"><ellipse cx="73" cy="52" rx="4" ry="7" transform="rotate(16 73 52)" /><ellipse cx="69" cy="64" rx="4" ry="7" transform="rotate(-18 69 64)" /><ellipse cx="76" cy="44" rx="3" ry="5" transform="rotate(26 76 44)" /></g><path d="M70 90c-8-4-12-10-12-16 8 2 12 8 12 16Z" fill="#98a85a" />
        </svg>
      );
    case 'cat':
      return (
        <svg viewBox="0 0 100 100" width="100%" height="100%" aria-hidden="true" focusable="false">
          <defs><radialGradient id={U(uid, 'f')} cx=".4" cy=".35" r=".7"><stop offset="0" stopColor="#2a2a2c" /><stop offset="1" stopColor="#0c0c0d" /></radialGradient><filter id={U(uid, 's')} x="-20%" y="-20%" width="140%" height="150%"><feDropShadow dx="0" dy="3" stdDeviation="3" floodColor="#000" floodOpacity=".3" /></filter></defs>
          <g filter={`url(#${U(uid, 's')})`}>
            <circle cx="50" cy="52" r="46" fill={`url(#${U(uid, 'f')})`} />
            <path d="M18 24 26 6l14 14Z M82 24 74 6 60 20Z" fill="#141415" /><path d="M24 20 27 12l7 7ZM76 20 73 12l-7 7Z" fill="#3a2b2b" />
            <ellipse cx="34" cy="46" rx="8" ry="6" fill="#bfd06a" /><ellipse cx="66" cy="46" rx="8" ry="6" fill="#bfd06a" /><ellipse cx="34" cy="46" rx="2.600" ry="5" fill="#0a0a0a" /><ellipse cx="66" cy="46" rx="2.600" ry="5" fill="#0a0a0a" />
            <path d="M46 56h8l-4 5Z" fill="#3b2a2a" /><path d="M50 61v4M44 66c3 2 4 2 6-1 2 3 3 3 6 1" stroke="#555" strokeWidth="1" fill="none" /><circle cx="50" cy="18" r="2.600" fill="#e9e9e4" />
            <g stroke="#cfcfd4" strokeWidth=".6" opacity=".8"><path d="M20 60 4 56M20 64 6 66M80 60 96 56M80 64 94 66" /></g>
          </g>
        </svg>
      );
    case 'coffee':
      return (
        <svg viewBox="0 0 80 80" width="100%" height="100%" aria-hidden="true" focusable="false">
          <defs><radialGradient id={U(uid, 'c')} cx=".4" cy=".35" r=".8"><stop offset="0" stopColor="#c39a6a" /><stop offset="1" stopColor="#7a4c2a" /></radialGradient><filter id={U(uid, 's')} x="-20%" y="-20%" width="150%" height="150%"><feDropShadow dx="1" dy="4" stdDeviation="3" floodColor="#3a2a1c" floodOpacity=".45" /></filter></defs>
          <g filter={`url(#${U(uid, 's')})`}><circle cx="40" cy="40" r="38" fill="#6d4a30" /><circle cx="40" cy="40" r="33" fill="#8d6a48" /><circle cx="40" cy="40" r="27" fill="#f3ebe0" /><circle cx="40" cy="40" r="22" fill={`url(#${U(uid, 'c')})`} /></g>
          <path d="M40 54c-10-8-14-12-14-18a6 6 0 0 1 14-2 6 6 0 0 1 14 2c0 6-4 10-14 18Z" fill="#f6ecdd" opacity=".95" /><path d="M40 50c-5-4-8-7-8-10" stroke="#caa77f" strokeWidth="1.200" fill="none" />
        </svg>
      );
    case 'shell':
      return (
        <svg viewBox="0 0 55 62" width="100%" height="100%" aria-hidden="true" focusable="false">
          <defs><linearGradient id={U(uid, 'sh')} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#f4e0cf" /><stop offset="1" stopColor="#c99877" /></linearGradient><filter id={U(uid, 's')} x="-20%" y="-20%" width="150%" height="150%"><feDropShadow dx="1.500" dy="3" stdDeviation="2" floodColor="#5a4636" floodOpacity=".4" /></filter></defs>
          <g filter={`url(#${U(uid, 's')})`}>
            <path d="M28 4c10 6 16 16 20 30 2 8-2 18-12 22-8 3-18 2-24-4C6 46 4 36 8 26 12 14 20 6 28 4Z" fill={`url(#${U(uid, 'sh')})`} />
            <path d="M28 8c4 10 8 22 8 34M18 14c6 10 12 24 14 38M40 18c0 10-2 22-6 32" stroke="#b78864" strokeWidth="1.200" fill="none" opacity=".8" /><path d="M8 28c14-4 28-2 40 6" stroke="#d6a98c" strokeWidth="1.400" fill="none" opacity=".7" />
            <ellipse cx="20" cy="50" rx="10" ry="7" fill="#7e5a45" opacity=".55" />
          </g>
        </svg>
      );
    case 'bleeding':
      return (
        <svg viewBox="0 0 126 97" width="100%" height="100%" aria-hidden="true" focusable="false">
          <defs><linearGradient id={U(uid, 'g')} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#87a14a" /><stop offset="1" stopColor="#3f5f23" /></linearGradient><radialGradient id={U(uid, 'h')} cx=".4" cy=".3" r=".8"><stop offset="0" stopColor="#f28fc9" /><stop offset="1" stopColor="#c03a8e" /></radialGradient></defs>
          <rect width="126" height="97" fill={`url(#${U(uid, 'g')})`} /><circle cx="100" cy="20" r="40" fill="#c4d98a" opacity=".35" /><circle cx="10" cy="90" r="40" fill="#2a431a" opacity=".5" />
          <path d="M6 20C40 4 78 6 112 40" stroke="#7a9a44" strokeWidth="2" fill="none" />
          {[[22, 22], [42, 18], [62, 22], [82, 32], [100, 44]].map(([x, y], i) => (<g key={i} transform={`translate(${x} ${y})`}><path d="M0 0c-9 0-14 8-12 16 3 8 10 12 12 14 2-2 9-6 12-14 2-8-3-16-12-16Z" fill={`url(#${U(uid, 'h')})`} /><path d="M-4 22c-3 8 0 14 4 18 4-4 7-10 4-18Z" fill="#fbe9f3" /></g>))}
        </svg>
      );
    case 'blossom':
    default:
      return (
        <svg viewBox="0 0 126 140" width="100%" height="100%" aria-hidden="true" focusable="false">
          <defs><linearGradient id={U(uid, 'b')} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#f4f2ef" /><stop offset="1" stopColor="#d9dfe3" /></linearGradient></defs>
          <rect width="126" height="140" fill={`url(#${U(uid, 'b')})`} /><circle cx="30" cy="30" r="34" fill="#fff" opacity=".7" /><circle cx="110" cy="110" r="30" fill="#c9d0d8" opacity=".6" />
          <path d="M10 6C30 40 50 70 90 120" stroke="#5d5149" strokeWidth="2.400" fill="none" strokeLinecap="round" /><path d="M40 52c10-2 20 0 30 8M60 84c10-2 20 0 28 6" stroke="#6b5e54" strokeWidth="1.600" fill="none" />
          {[[34, 36], [62, 62], [50, 84], [84, 96], [24, 66], [96, 74]].map(([x, y], i) => (
            <g key={i} transform={`translate(${x} ${y})`}>{[0, 72, 144, 216, 288].map((a) => <ellipse key={a} cx="0" cy="-8" rx="6" ry="9" fill="#fbf6f4" stroke="#e9d7d7" strokeWidth=".6" transform={`rotate(${a})`} />)}<circle r="3" fill="#e8b8c0" /></g>
          ))}
        </svg>
      );
  }
}

/** Shapes of the "A Year of Curiosity" slide: three columns of round and abstract marks. */
export function Shapes() {
  return (
    <svg viewBox="0 0 150 150" width="100%" height="100%" aria-hidden="true" focusable="false">
      <circle cx="26" cy="26" r="22" fill="#f09ab8" /><path d="M26 10 40 26 26 42 12 26Z" fill="#111" /><path d="M26 26 40 26 26 42Z" fill="#4a7ce6" />
      <path d="M76 4a22 22 0 1 1-22 22h22Z" fill="#2f6fdc" />
      <path d="M104 44V30a18 18 0 0 1 36 0v14h-12V30a6 6 0 0 0-12 0v14Z" fill="#ec5a2a" transform="translate(-4 -6)" />
      <circle cx="26" cy="76" r="22" fill="#6a6a6a" /><text x="26" y="86" textAnchor="middle" fontSize="28" fontWeight="800" fill="#fff" fontFamily="var(--font-sans)">?</text>
      <path d="M54 94a22 22 0 0 1 44 0Z" fill="#f0a03a" /><path d="M54 98h44v2H54z" fill="none" /><path d="M54 98a22 22 0 0 0 44 0Z" fill="#f0a03a" />
      <g stroke="#f4a3ba" strokeWidth="9" strokeLinecap="round"><path d="M122 62v30M108 70l28 14M136 70l-28 14" /></g>
      <circle cx="26" cy="124" r="22" fill="#ee4a3a" /><path d="M4 124a22 22 0 0 1 22-22v22Z" fill="#111" /><path d="M26 146a22 22 0 0 1-22-22h22Z" fill="#4a7ce6" />
      <path d="M76 100c2 12 6 16 18 18-12 2-16 6-18 18-2-12-6-16-18-18 12-2 16-6 18-18Z" fill="#3a78d8" />
      <circle cx="122" cy="124" r="22" fill="#8a8a82" /><path d="M104 118c8-4 14-4 20 2s12 6 18 2" stroke="#6b6b64" strokeWidth="3" fill="none" /><path d="M146 120a22 22 0 0 0-22-22v22Z" fill="none" />
      <path d="M104 146V126a22 22 0 0 1 22 20Z" fill="#2f6a3a" />
    </svg>
  );
}
