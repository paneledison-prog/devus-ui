import { PhoneFrame } from '../PhoneFrame';
import { ChallengeCard, FeltX, NexusCanvas, NexusHeader, NexusHomeBar, NexusStatusBar, NexusTabs, TrophyHero, WeekStrip } from '../Nexus';

const days = [
  { day: 'Mon', date: 22 },
  { day: 'Tue', date: 23 },
  { day: 'Wed', date: 24 },
  { day: 'Thu', date: 25 },
  { day: 'Fri', date: 26 },
  { day: 'Sat', date: 27 },
];

/** "Nexus Today": header over a peach trophy scene, a title, a week strip, and the top of a challenge card cut off by the tab bar. */
export function NexusTodayExample() {
  return (
    <PhoneFrame bare height={692}>
      <NexusCanvas dim>
        <TrophyHero />
        <NexusStatusBar />
        <NexusHeader />
        <WeekStrip days={days} selected={3} top={581} centers={[40, 111, 182, 256, 330, 401]} flat />
        <h2 className="nx-h2" style={{ top: 713, fontSize: 27 }}>100 day challenge</h2>
        <ChallengeCard top={767} tone="lavender" chip="110,732 People" art={<FeltX />} />
        <NexusTabs active="today" />
        <NexusHomeBar />
      </NexusCanvas>
    </PhoneFrame>
  );
}
