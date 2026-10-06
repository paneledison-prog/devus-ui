import type { CSSProperties, HTMLAttributes } from 'react';
import './Skeleton.css';

export interface SkeletonProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'children'> {
  /** Shape of the placeholder. `text` is one line of text height. */
  variant?: 'rect' | 'text' | 'circle';
  width?: number | string;
  height?: number | string;
  /** Cover the whole positioned parent. */
  fill?: boolean;
}

/** A shimmering placeholder shown while content loads. It is decorative: hide it from screen readers and mark the loading region with `aria-busy`. */
export function Skeleton({ variant = 'rect', width, height, fill = false, className, style, ...rest }: SkeletonProps) {
  const size: CSSProperties = { width, height, ...style };
  return (
    <span
      aria-hidden="true"
      className={['ui-skeleton', variant !== 'rect' && `ui-skeleton--${variant}`, fill && 'ui-skeleton--fill', className].filter(Boolean).join(' ')}
      style={size}
      {...rest}
    />
  );
}

/** Several text lines; the last one is shorter. */
export function SkeletonText({ lines = 3, gap = 8 }: { lines?: number; gap?: number }) {
  return (
    <span className="ui-skeleton-lines" style={{ gap }} aria-hidden="true">
      {Array.from({ length: lines }, (_, i) => <Skeleton key={i} variant="text" width={i === lines - 1 && lines > 1 ? '62%' : '100%'} />)}
    </span>
  );
}
