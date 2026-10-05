import type { ReactNode } from 'react';
import './AppUI.css';

function StatusIcons() {
  return (
    <span className="app-phone__icons" aria-hidden="true">
      <svg width="16" height="10" viewBox="0 0 16 10" fill="currentColor"><rect x="0" y="6" width="3" height="4" rx="1" /><rect x="4.3" y="4" width="3" height="6" rx="1" /><rect x="8.6" y="2" width="3" height="8" rx="1" /><rect x="12.9" y="0" width="3" height="10" rx="1" /></svg>
      <svg width="15" height="11" viewBox="0 0 24 18" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><path d="M2 6.5a14 14 0 0 1 20 0" /><path d="M6 11a8.5 8.5 0 0 1 12 0" /><circle cx="12" cy="15.5" r="1.6" fill="currentColor" stroke="none" /></svg>
      <svg width="24" height="12" viewBox="0 0 26 12" fill="none"><rect x="0.5" y="0.5" width="22" height="11" rx="3.5" stroke="currentColor" opacity=".4" /><rect x="2" y="2" width="19" height="8" rx="2.2" fill="currentColor" /><rect x="23.5" y="4" width="2" height="4" rx="1" fill="currentColor" opacity=".4" /></svg>
    </span>
  );
}

/** Phone viewport used to show mobile-style elements in context. Outer size 320x660 px (classic iPhone ratio 2.06), borderless with a 30px radius. */
export function PhoneFrame({ children, hero = false }: { children: ReactNode; /** Blue gradient behind the status bar and the top of the screen (white status text). */ hero?: boolean }) {
  return (
    <div className={`app-phone${hero ? ' app-phone--hero' : ''}`}>
      <div className="app-phone__screen">
        <div className="app-phone__status" aria-hidden="true"><span>9:41</span><StatusIcons /></div>
        <div className="app-phone__body">{children}</div>
        <span className="app-phone__home" aria-hidden="true" />
      </div>
    </div>
  );
}
