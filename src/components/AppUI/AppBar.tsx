import type { ReactNode } from 'react';
import { BackIcon } from './icons';
import './AppUI.css';

export interface AppBarProps {
  title: string;
  /** Muted line under a large title (greetings, dates). */
  subtitle?: string;
  /** Large left-aligned title instead of the centered one. */
  large?: boolean;
  onBack?: () => void;
  action?: ReactNode;
}

/** Top app bar with optional back button, trailing action and large title. */
export function AppBar({ title, subtitle, large = false, onBack, action }: AppBarProps) {
  if (large) {
    return (
      <header className="app-bar app-bar--large">
        <div className="app-bar__heading">
          <h2 className="app-bar__large">{title}</h2>
          {subtitle && <p className="app-bar__sub">{subtitle}</p>}
        </div>
        <span className="app-bar__action">{action}</span>
      </header>
    );
  }
  return (
    <header className="app-bar">
      <div className="app-bar__row">
        {onBack ? <button type="button" className="app-bar__btn" aria-label="Back" onClick={onBack}><BackIcon /></button> : <span className="app-bar__btn" />}
        <h2 className="app-bar__title">{title}</h2>
        <span className="app-bar__action">{action}</span>
      </div>
    </header>
  );
}
