import { useRef, useState, type ClipboardEvent, type KeyboardEvent } from 'react';
import './OtpInput.css';

export interface OtpInputProps {
  length?: number;
  label?: string;
  onComplete?: (code: string) => void;
}

export function OtpInput({ length = 4, label = 'One-time code', onComplete }: OtpInputProps) {
  const [digits, setDigits] = useState<string[]>(() => Array(length).fill(''));
  const refs = useRef<(HTMLInputElement | null)[]>([]);

  const commit = (next: string[]) => {
    setDigits(next);
    if (next.every(Boolean)) onComplete?.(next.join(''));
  };

  const onChange = (i: number, raw: string) => {
    const d = raw.replace(/\D/g, '').slice(-1);
    const next = digits.slice();
    next[i] = d;
    commit(next);
    if (d && i < length - 1) refs.current[i + 1]?.focus();
  };

  const onKeyDown = (i: number, e: KeyboardEvent) => {
    if (e.key === 'Backspace' && !digits[i] && i > 0) refs.current[i - 1]?.focus();
    if (e.key === 'ArrowLeft' && i > 0) refs.current[i - 1]?.focus();
    if (e.key === 'ArrowRight' && i < length - 1) refs.current[i + 1]?.focus();
  };

  const onPaste = (e: ClipboardEvent) => {
    const text = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, length);
    if (!text) return;
    e.preventDefault();
    const next = Array.from({ length }, (_, i) => text[i] ?? '');
    commit(next);
    refs.current[Math.min(text.length, length - 1)]?.focus();
  };

  return (
    <div role="group" aria-label={label} className="ui-otp">
      {digits.map((d, i) => (
        <input
          key={i} ref={(el) => { refs.current[i] = el; }} className="ui-otp__cell"
          inputMode="numeric" autoComplete={i === 0 ? 'one-time-code' : 'off'} maxLength={1}
          aria-label={`Digit ${i + 1} of ${length}`} value={d}
          onChange={(e) => onChange(i, e.target.value)} onKeyDown={(e) => onKeyDown(i, e)} onPaste={onPaste}
        />
      ))}
    </div>
  );
}
