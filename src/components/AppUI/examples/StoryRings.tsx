import { PhoneFrame } from '../PhoneFrame';
import { AppBar } from '../AppBar';
import { StoryRow } from '../StoryRing';
import { appStories } from './data';

/** Avatars with a gradient ring for new stories and a muted ring once seen. */
export function StoryRingsExample() {
  return (
    <PhoneFrame>
      <AppBar title="Friends" large />
      <StoryRow stories={appStories} />
    </PhoneFrame>
  );
}
