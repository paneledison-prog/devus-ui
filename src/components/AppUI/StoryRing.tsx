import { useRef, useState } from 'react';
import { Avatar } from '../Avatar/Avatar';
import { portraitFor } from '../Avatar/portraits';
import { useLongPress, usePanScroll } from './gestures';
import './AppUI.css';

export interface Story { name: string; initials: string; seen?: boolean; /** Portrait; defaults to a face picked from the name. */ src?: string }

function StoryItem({ s, seen, onSeen, onUnseen }: { s: Story; seen: boolean; onSeen: () => void; onUnseen: () => void }) {
  const lp = useLongPress(onUnseen, 480);
  return (
    <li>
      <button
        type="button" className="app-story" data-seen={seen} data-pressing={lp.pressing || undefined}
        aria-label={`${s.name}${seen ? '' : ', new story'}. Press and hold to mark as new`}
        onClick={onSeen} {...lp.bind}
      >
        <span className="app-story__ring"><Avatar src={s.src ?? portraitFor(s.name)} fallback={s.initials} /></span>
        <span className="app-story__name">{s.name}</span>
      </button>
    </li>
  );
}

/** Horizontal row of avatars with a gradient ring (unseen) or a muted ring (seen). Pan the row, tap a story to view it, press and hold to mark it new again. */
export function StoryRow({ stories }: { stories: Story[] }) {
  const ref = useRef<HTMLUListElement>(null);
  const pan = usePanScroll(ref, 'x');
  const [seen, setSeen] = useState<Record<string, boolean>>(() => Object.fromEntries(stories.map((s) => [s.name, !!s.seen])));
  const set = (n: string, v: boolean) => setSeen((o) => ({ ...o, [n]: v }));
  return (
    <ul ref={ref} className="app-stories" aria-label="Stories" {...pan}>
      {stories.map((s) => <StoryItem key={s.name} s={s} seen={seen[s.name]} onSeen={() => set(s.name, true)} onUnseen={() => set(s.name, false)} />)}
    </ul>
  );
}
