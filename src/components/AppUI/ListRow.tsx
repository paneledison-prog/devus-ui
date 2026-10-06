import { useState, type ReactNode } from 'react';
import { useSwipe } from './gestures';
import { ChevronRight } from './icons';
import './AppUI.css';

export interface ListRowProps {
  icon?: ReactNode;
  title: string;
  value?: string;
  /** Trailing element; pass `false` to hide the chevron. */
  trailing?: ReactNode | false;
  onClick?: () => void;
  /** Swipe the row left to reveal a Delete action. */
  onDelete?: () => void;
}

export function ListRow({ icon, title, value, trailing, onClick, onDelete }: ListRowProps) {
  const [open, setOpen] = useState(false);
  const { bind, offset, dragging } = useSwipe({
    axis: 'x', follow: true, threshold: 40, ignore: 'input, [role="switch"], .app-row__delete',
    onSwipe: (dir) => { if (dir === 'left') setOpen(true); if (dir === 'right') setOpen(false); },
  });
  const body = (
    <>
      {icon && <span className="app-row__icon">{icon}</span>}
      <span className="app-row__title">{title}</span>
      {value && <span className="app-row__value">{value}</span>}
      {trailing === undefined ? <span className="app-row__chev"><ChevronRight /></span> : trailing || null}
    </>
  );
  const row = onClick
    ? <button type="button" className="app-row" onClick={() => { if (open) setOpen(false); else onClick(); }}>{body}</button>
    : <div className="app-row">{body}</div>;
  if (!onDelete) return row;
  const x = Math.max(-96, Math.min(0, (open ? -88 : 0) + offset.x));
  return (
    <div className="app-row-swipe" {...bind}>
      <button type="button" className="app-row__delete" aria-label={`Delete ${title}`} tabIndex={open ? 0 : -1} onClick={onDelete}>Delete</button>
      <div className="app-row-swipe__slide" data-dragging={dragging || undefined} style={{ transform: `translateX(${x}px)` }}>{row}</div>
    </div>
  );
}

/** Inset grouped list: rounded card with hairline dividers between rows. */
export function ListGroup({ label, children }: { label?: string; children: ReactNode }) {
  return <div role="group" aria-label={label} className="app-group">{children}</div>;
}
