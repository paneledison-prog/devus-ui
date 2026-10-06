import { useRef, useState } from 'react';
import { PhoneFrame } from '../PhoneFrame';
import { AppBar } from '../AppBar';
import { ListGroup, ListRow } from '../ListRow';
import { SunIcon } from '../icons';

const updates = ['Sprint review notes', 'Design tokens v2', 'Icon audit', 'Release checklist', 'Onboarding copy', 'Accessibility pass', 'Empty states', 'Dark mode QA', 'Motion review', 'Copy edits', 'Beta feedback', 'Store listing', 'Support macros', 'Roadmap sync'];

/** Both app bar styles: centered title with a back button, and the large greeting, which shrinks while the list under it is scrolled. */
export function AppBarExample() {
  const [compact, setCompact] = useState(false);
  const box = useRef<HTMLDivElement>(null);
  return (
    <PhoneFrame>
      <AppBar title="Details" onBack={() => {}} />
      <AppBar title="Hey, Ada" subtitle="Let's make progress today!" large compact={compact} action={<SunIcon />} />
      <div className="app-scrollbox" ref={box} onScroll={(e) => setCompact(e.currentTarget.scrollTop > 12)} tabIndex={0} aria-label="Updates">
        <ListGroup label="Updates">{updates.map((u) => <ListRow key={u} title={u} />)}</ListGroup>
      </div>
    </PhoneFrame>
  );
}
