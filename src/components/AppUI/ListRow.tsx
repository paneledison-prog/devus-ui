import type { ReactNode } from 'react';
import { ChevronRight } from './icons';
import './AppUI.css';

export interface ListRowProps {
  icon?: ReactNode;
  title: string;
  value?: string;
  /** Trailing element; pass `false` to hide the chevron. */
  trailing?: ReactNode | false;
  onClick?: () => void;
}

export function ListRow({ icon, title, value, trailing, onClick }: ListRowProps) {
  const body = (
    <>
      {icon && <span className="app-row__icon">{icon}</span>}
      <span className="app-row__title">{title}</span>
      {value && <span className="app-row__value">{value}</span>}
      {trailing === undefined ? <span className="app-row__chev"><ChevronRight /></span> : trailing || null}
    </>
  );
  return onClick
    ? <button type="button" className="app-row" onClick={onClick}>{body}</button>
    : <div className="app-row">{body}</div>;
}

/** Inset grouped list: rounded card with hairline dividers between rows. */
export function ListGroup({ label, children }: { label?: string; children: ReactNode }) {
  return <div role="group" aria-label={label} className="app-group">{children}</div>;
}
