import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import './Button.css';

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'outline' | 'ghost' | 'danger' | 'dangerSoft';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Square button holding only an icon. Provide aria-label. */
  iconOnly?: boolean;
  startContent?: ReactNode;
  endContent?: ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = 'primary', size = 'md', iconOnly = false, startContent, endContent, className, children, type = 'button', ...rest },
  ref,
) {
  const cls = ['ui-button', `ui-button--${variant}`, `ui-button--${size}`, iconOnly && 'ui-button--icon-only', className]
    .filter(Boolean).join(' ');
  return (
    <button ref={ref} type={type} className={cls} {...rest}>
      {startContent}
      {children}
      {endContent}
    </button>
  );
});
