import type { ReactNode } from 'react';
import './Badge.css';

export interface BadgeProps {
  tone?: 'default' | 'accent' | 'success' | 'warning' | 'danger';
  children: ReactNode;
}

export function Badge({ tone = 'default', children }: BadgeProps) {
  return <span className={`ui-badge ui-badge--${tone}`}>{children}</span>;
}
