import type { ReactNode } from 'react';
import './AppUI.css';

export interface BottomSheetProps {
  title: string;
  children?: ReactNode;
  footer?: ReactNode;
}

/** Presentational bottom sheet panel with a drag handle. Mount it inside your own overlay/dialog. */
export function BottomSheet({ title, children, footer }: BottomSheetProps) {
  return (
    <section className="app-sheet" aria-label={title}>
      <span className="app-sheet__grabber" aria-hidden="true" />
      <h3 className="app-sheet__title">{title}</h3>
      <div className="app-sheet__body">{children}</div>
      {footer && <div className="app-sheet__footer">{footer}</div>}
    </section>
  );
}
