import './Spinner.css';

export interface SpinnerProps { size?: 'sm' | 'md' | 'lg'; label?: string }

export function Spinner({ size = 'md', label = 'Loading' }: SpinnerProps) {
  return <span role="status" aria-label={label} className={`ui-spinner ui-spinner--${size}`} />;
}
