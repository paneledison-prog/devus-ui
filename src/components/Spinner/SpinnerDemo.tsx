import { useEffect, useRef, useState } from 'react';
import { Button } from '../Button/Button';
import { Spinner } from './Spinner';

type Phase = 'idle' | 'loading' | 'done';

/** Interactive Spinner demo: press the button to run a fake save. */
export function SpinnerDemo() {
  const [phase, setPhase] = useState<Phase>('idle');
  const timer = useRef<number>(0);
  useEffect(() => () => window.clearTimeout(timer.current), []);

  const run = () => {
    if (phase === 'loading') return;
    setPhase('loading');
    timer.current = window.setTimeout(() => {
      setPhase('done');
      timer.current = window.setTimeout(() => setPhase('idle'), 1600);
    }, 1800);
  };

  return (
    <div style={{ display: 'grid', justifyItems: 'center', gap: 16 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <Spinner size="sm" /><Spinner size="md" /><Spinner size="lg" />
      </div>
      <Button
        variant="secondary"
        onClick={run}
        aria-busy={phase === 'loading'}
        startContent={phase === 'loading' ? <Spinner size="sm" label="Saving" /> : undefined}
      >
        {phase === 'loading' ? 'Saving…' : phase === 'done' ? 'Saved ✓' : 'Save changes'}
      </Button>
    </div>
  );
}
