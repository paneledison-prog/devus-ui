import { forwardRef, type InputHTMLAttributes } from 'react';
import './Switch.css';

export interface SwitchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
}

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(function Switch({ label, ...rest }, ref) {
  return (
    <label className="ui-switch">
      <input ref={ref} type="checkbox" role="switch" {...rest} />
      {label}
    </label>
  );
});
