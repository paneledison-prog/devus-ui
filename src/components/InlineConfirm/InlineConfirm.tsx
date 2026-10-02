import { useEffect, useState } from 'react';
import { Button } from '../Button/Button';

export interface InlineConfirmProps {
  label?: string;
  onConfirm?: () => void;
}

/** Destructive action that asks "Sure?" in place instead of opening a dialog. Reverts after 4 seconds. */
export function InlineConfirm({ label = 'Delete', onConfirm }: InlineConfirmProps) {
  const [asking, setAsking] = useState(false);

  useEffect(() => {
    if (!asking) return;
    const t = window.setTimeout(() => setAsking(false), 4000);
    return () => window.clearTimeout(t);
  }, [asking]);

  if (!asking) {
    return <Button variant="dangerSoft" onClick={() => setAsking(true)}>{label}</Button>;
  }
  return (
    <span role="group" aria-label={`Confirm ${label.toLowerCase()}`} style={{ display: 'inline-flex', gap: 8 }}>
      <Button variant="danger" autoFocus onClick={() => { setAsking(false); onConfirm?.(); }}>Sure?</Button>
      <Button variant="ghost" onClick={() => setAsking(false)}>Cancel</Button>
    </span>
  );
}
