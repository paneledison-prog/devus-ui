import { PhoneFrame } from '../PhoneFrame';
import { ChallengeCard, FeltV, FeltX, NexusCanvas, NexusStatusBar, WeekStrip } from '../Nexus';

const days = [
  { day: 'Mon', date: 22 },
  { day: 'Tue', date: 23 },
  { day: 'Wed', date: 24 },
  { day: 'Thu', date: 25 },
  { day: 'Fri', date: 26 },
  { day: 'Sat', date: 27 },
];

/** "Nexus Daily activity": a week strip, a 100 Day Challenge card with an action panel, and the top of a second card. No tab bar. */
export function NexusDailyExample() {
  return (
    <PhoneFrame bare height={692}>
      <NexusCanvas dim>
        <NexusStatusBar />
        <h2 className="nx-h2" style={{ top: 80, left: 24, fontSize: 27 }}>Daily activity</h2>
        <WeekStrip days={days} selected={3} top={132} centers={[46, 116, 187, 261, 335, 406]} flat dividers />
        <h2 className="nx-h2" style={{ top: 265 }}>100 Day Challenge</h2>
        <ChallengeCard top={319} tone="lavender" chip="110,732 People" art={<FeltX />} title={<>Applying &lsquo;Into Equations&rsquo;<br />in problem solving</>} arrow />
        <h2 className="nx-h2" style={{ top: 751 }}>Science &amp; Engineering</h2>
        <ChallengeCard top={804} tone="green" chip="8,240 People" art={<FeltV />} />
      </NexusCanvas>
    </PhoneFrame>
  );
}
