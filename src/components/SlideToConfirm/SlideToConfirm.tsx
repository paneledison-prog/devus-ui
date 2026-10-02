import { useState } from 'react';
import './SlideToConfirm.css';

export interface SlideToConfirmProps {
  label?: string;
  confirmedLabel?: string;
  onConfirm?: () => void;
}

/** Drag (or use arrow keys) all the way to the end to confirm. Built on a native range input. */
export function SlideToConfirm({ label = 'Slide to confirm', confirmedLabel = 'Confirmed', onConfirm }: SlideToConfirmProps) {
  const [value, setValue] = useState(0);
  const [done, setDone] = useState(false);

  const reset = () => { if (!done) setValue(0); };

  return (
    <div className="ui-slide" data-done={done} style={{ ['--p' as string]: `${value}%` }}>
      <span className="ui-slide__label" aria-hidden="true">{done ? `${confirmedLabel} ✓` : label}</span>
      <input
        type="range" min={0} max={100} step={1} value={done ? 100 : value} disabled={done} aria-label={label}
        aria-valuetext={done ? confirmedLabel : `${value}%`}
        onChange={(e) => {
          const v = Number(e.target.value);
          setValue(v);
          if (v >= 100) { setDone(true); onConfirm?.(); }
        }}
        onPointerUp={reset} onBlur={reset}
      />
    </div>
  );
}
