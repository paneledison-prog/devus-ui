import { useState } from 'react';
import { PhoneFrame } from '../PhoneFrame';
import { AppBar } from '../AppBar';
import { Fab } from '../Fab';
import { useFling } from '../gestures';

/** Round floating action buttons: extended with a label, and dark. Drag them, or flick them to the other side. */
export function FloatingActionButtonExample() {
  const [side, setSide] = useState<'left' | 'right'>('right');
  const fling = useFling({ onFling: (d) => { if (d === 'left') setSide('left'); if (d === 'right') setSide('right'); } });
  return (
    <PhoneFrame>
      <AppBar title="Inbox" large />
      <div style={{ marginTop: 'auto', paddingBottom: 26, display: 'flex', justifyContent: side === 'right' ? 'flex-end' : 'flex-start', alignItems: 'center', gap: 10 }}>
        <div className="app-drag" data-dragging={fling.dragging || undefined} style={{ transform: `translate(${fling.pos.x}px, ${fling.pos.y}px)`, display: 'flex', gap: 10 }} {...fling.bind}>
          <Fab label="New chat" />
          <Fab tone="dark" />
        </div>
      </div>
    </PhoneFrame>
  );
}
