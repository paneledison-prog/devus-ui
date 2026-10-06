import type { ReactNode } from 'react';
import { useSwipe } from './gestures';
import './AppUI.css';

export interface BottomSheetProps {
  title: string;
  children?: ReactNode;
  footer?: ReactNode;
  /** Called when the sheet is dragged or flicked down. Without it the sheet springs back. */
  onDismiss?: () => void;
}

/** Bottom sheet panel with a drag handle: drag it, swipe it down or flick it to dismiss. Mount it inside your own overlay/dialog. */
export function BottomSheet({ title, children, footer, onDismiss }: BottomSheetProps) {
  const { bind, offset, dragging } = useSwipe({
    axis: 'y', follow: true, threshold: 96, flickSpeed: 0.7, ignore: 'button, input, a',
    onSwipe: (dir) => { if (dir === 'down') onDismiss?.(); },
  });
  const y = offset.y > 0 ? offset.y : offset.y * 0.12;
  return (
    <section
      className="app-sheet" aria-label={title} data-dragging={dragging || undefined}
      style={{ transform: y ? `translateY(${y}px)` : undefined }} {...bind}
    >
      <span className="app-sheet__grabber" aria-hidden="true" />
      <h3 className="app-sheet__title">{title}</h3>
      <div className="app-sheet__body">{children}</div>
      {footer && <div className="app-sheet__footer">{footer}</div>}
    </section>
  );
}
