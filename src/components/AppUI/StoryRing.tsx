import { Avatar } from '../Avatar/Avatar';
import './AppUI.css';

export interface Story { name: string; initials: string; seen?: boolean }

/** Horizontal row of avatars with a gradient ring (unseen) or a muted ring (seen). */
export function StoryRow({ stories }: { stories: Story[] }) {
  return (
    <ul className="app-stories" aria-label="Stories">
      {stories.map((s) => (
        <li key={s.name}>
          <button type="button" className="app-story" data-seen={s.seen ?? false} aria-label={`${s.name}${s.seen ? '' : ', new story'}`}>
            <span className="app-story__ring"><Avatar fallback={s.initials} /></span>
            <span className="app-story__name">{s.name}</span>
          </button>
        </li>
      ))}
    </ul>
  );
}
