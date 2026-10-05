import { PhoneFrame } from '../PhoneFrame';
import { BookSquare, HeroCard, NexusCanvas, NexusHeader, NexusHomeBar, NexusStatusBar, NexusTabs, PlaySquare, StatCard, WeekStrip } from '../Nexus';

const days = [
  { day: 'Mon', date: 22 },
  { day: 'Tue', date: 23 },
  { day: 'Wed', date: 24 },
  { day: 'Thu', date: 25 },
  { day: 'Fri', date: 26 },
  { day: 'Sat', date: 27 },
];

/** "Nexus Home": header, two stat cards, a week strip, the felt-cap hero card and the tab bar. */
export function NexusHomeExample() {
  return (
    <PhoneFrame bare height={692}>
      <NexusCanvas>
        <NexusStatusBar />
        <NexusHeader />
        <StatCard x={20} label="Enrollment" icon={<PlaySquare />} value={<>86 <small>Video</small></>} ring={{ value: 0.3, color: '#58b95a', start: -100 }} />
        <StatCard x={236} label="Lesson Done" icon={<BookSquare />} value={<>8<small>h</small> 35<small>m</small></>} ring={{ value: 0.72, color: '#2b9be3', start: -40 }} />
        <WeekStrip days={days} selected={3} />
        <HeroCard />
        <NexusTabs active="home" />
        <NexusHomeBar />
      </NexusCanvas>
    </PhoneFrame>
  );
}
