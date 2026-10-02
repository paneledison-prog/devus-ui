import { useId } from 'react';

export interface LogoProps {
  /** Pixel size of the square mark. */
  size?: number;
  className?: string;
}

/** The Devus UI mark: a gradient tile with a bold "D" and a faint stacked layer behind it. */
export function Logo({ size = 28, className }: LogoProps) {
  const id = useId();
  const bg = `${id}-bg`;
  const shine = `${id}-shine`;
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={bg} x1="4" y1="2" x2="28" y2="30" gradientUnits="userSpaceOnUse">
          <stop stopColor="#4DB2FF" />
          <stop offset=".55" stopColor="#0485F7" />
          <stop offset="1" stopColor="#0A52C9" />
        </linearGradient>
        <linearGradient id={shine} x1="16" y1="0" x2="16" y2="16" gradientUnits="userSpaceOnUse">
          <stop stopColor="#fff" stopOpacity=".28" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect width="32" height="32" rx="9" fill={`url(#${bg})`} />
      <rect width="32" height="16" rx="9" fill={`url(#${shine})`} />
      <path d="M11.5 4.5H18a9 9 0 0 1 0 18h-6.5z" fill="#fff" fillOpacity=".35" />
      <path fillRule="evenodd" clipRule="evenodd" d="M8.5 8H15a9 9 0 0 1 0 18H8.5V8Zm4 4v10H15a5 5 0 0 0 0-10h-2.5Z" fill="#fff" />
    </svg>
  );
}
