import { useId, useState } from 'react';
import './SegmentedControl.css';

export interface SegmentedOption { value: string; label: string }

export interface SegmentedControlProps {
  options: SegmentedOption[];
  /** Accessible name for the group. */
  label: string;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
}

/** Radio group styled as a pill switcher. Native radios give arrow-key navigation for free. */
export function SegmentedControl({ options, label, value, defaultValue, onChange }: SegmentedControlProps) {
  const name = useId();
  const [inner, setInner] = useState(defaultValue ?? options[0]?.value);
  const current = value ?? inner;
  return (
    <div role="radiogroup" aria-label={label} className="ui-segmented">
      {options.map((o) => (
        <label key={o.value} className="ui-segmented__item">
          <input
            type="radio" name={name} value={o.value} checked={current === o.value}
            onChange={() => { setInner(o.value); onChange?.(o.value); }}
          />
          <span>{o.label}</span>
        </label>
      ))}
    </div>
  );
}
