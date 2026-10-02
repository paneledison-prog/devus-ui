import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { PlusIcon } from './icons';
import './AppUI.css';

export interface FabProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  icon?: ReactNode;
  /** When set the button becomes an extended FAB with a text label. */
  label?: string;
  tone?: 'accent' | 'dark';
}

export function Fab({ icon = <PlusIcon />, label, tone = 'accent', className, ...rest }: FabProps) {
  return (
    <button
      type="button" aria-label={label ? undefined : 'Create'}
      className={['app-fab', `app-fab--${tone}`, label && 'app-fab--extended', className].filter(Boolean).join(' ')} {...rest}
    >
      {icon}
      {label && <span>{label}</span>}
    </button>
  );
}
