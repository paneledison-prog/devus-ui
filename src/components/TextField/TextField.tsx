import { forwardRef, useId, type InputHTMLAttributes } from 'react';
import './TextField.css';

export interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  description?: string;
  errorMessage?: string;
}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(function TextField(
  { label, description, errorMessage, id, className, ...rest },
  ref,
) {
  const auto = useId();
  const inputId = id ?? auto;
  const invalid = Boolean(errorMessage);
  const helpId = `${inputId}-help`;
  return (
    <div className={['ui-field', className].filter(Boolean).join(' ')} data-invalid={invalid}>
      {label && <label className="ui-field__label" htmlFor={inputId}>{label}</label>}
      <input
        ref={ref} id={inputId} className="ui-field__input"
        aria-invalid={invalid || undefined}
        aria-describedby={invalid || description ? helpId : undefined}
        {...rest}
      />
      {invalid
        ? <span id={helpId} className="ui-field__error">{errorMessage}</span>
        : description && <span id={helpId} className="ui-field__description">{description}</span>}
    </div>
  );
});
