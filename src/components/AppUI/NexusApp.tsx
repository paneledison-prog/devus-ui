import { useState } from 'react';
import { PhoneFrame } from './PhoneFrame';
import { BookSquare, ChallengeCard, CourseCard, FeltBlob, FeltCamera, FeltV, FeltX, HeroCard, NexusCanvas, NexusHeader, NexusHomeBar, NexusStatusBar, NexusTabs, PlaySquare, StatCard, SuggestedCard, TrophyHero, WeekStrip, type NexusTab } from './Nexus';

const days = [
  { day: 'Mon', date: 22 },
  { day: 'Tue', date: 23 },
  { day: 'Wed', date: 24 },
  { day: 'Thu', date: 25 },
  { day: 'Fri', date: 26 },
  { day: 'Sat', date: 27 },
];

function HomeScreen({ onTab }: { onTab: (t: NexusTab) => void }) {
  const [day, setDay] = useState(3);
  return (
    <NexusCanvas>
      <NexusStatusBar />
      <NexusHeader />
      <StatCard x={20} label="Enrollment" icon={<PlaySquare />} value={<>86 <small>Video</small></>} ring={{ value: 0.3, color: '#58b95a', start: -100 }} />
      <StatCard x={236} label="Lesson Done" icon={<BookSquare />} value={<>8<small>h</small> 35<small>m</small></>} ring={{ value: 0.72, color: '#2b9be3', start: -40 }} />
      <WeekStrip days={days} selected={day} onSelect={setDay} />
      <HeroCard />
      <NexusTabs active="home" onSelect={onTab} />
      <NexusHomeBar />
    </NexusCanvas>
  );
}

function CoursesScreen({ onTab }: { onTab: (t: NexusTab) => void }) {
  return (
    <NexusCanvas>
      <NexusStatusBar />
      <h2 className="nx-h2" style={{ top: 87 }}>Suggested for you</h2>
      <SuggestedCard />
      <h2 className="nx-h2" style={{ top: 575 }}>Learn by doing</h2>
      <CourseCard x={20} tone="peach" topic="Photography" title="Nature And Wildlife"><FeltCamera /></CourseCard>
      <CourseCard x={236} tone="mint" topic="Financial" title="Debt Management"><FeltBlob /></CourseCard>
      <NexusTabs active="courses" onSelect={onTab} />
      <NexusHomeBar />
    </NexusCanvas>
  );
}

function TodayScreen({ onTab }: { onTab: (t: NexusTab) => void }) {
  const [day, setDay] = useState(3);
  return (
    <NexusCanvas dim>
      <TrophyHero />
      <NexusStatusBar />
      <NexusHeader />
      <WeekStrip days={days} selected={day} onSelect={setDay} top={581} centers={[40, 111, 182, 256, 330, 401]} flat />
      <h2 className="nx-h2" style={{ top: 713, fontSize: 27 }}>100 day challenge</h2>
      <ChallengeCard top={767} tone="lavender" chip="110,732 People" art={<FeltX />} />
      <NexusTabs active="today" onSelect={onTab} />
      <NexusHomeBar />
    </NexusCanvas>
  );
}

/** The Nexus tab bar is live: Home, Courses and Today switch between the three screens. The week strips select a day. */
export function NexusApp({ initial }: { initial: NexusTab }) {
  const [tab, setTab] = useState<NexusTab>(initial);
  return (
    <PhoneFrame bare height={692}>
      <div className="nx-screen" key={tab}>
        {tab === 'home' && <HomeScreen onTab={setTab} />}
        {tab === 'courses' && <CoursesScreen onTab={setTab} />}
        {tab === 'today' && <TodayScreen onTab={setTab} />}
      </div>
    </PhoneFrame>
  );
}

/** Daily activity: no tab bar; the week strip selects a day and the arrow button is pressable. */
export function NexusDailyScreen() {
  const [day, setDay] = useState(3);
  return (
    <PhoneFrame bare height={692}>
      <NexusCanvas dim>
        <NexusStatusBar />
        <h2 className="nx-h2" style={{ top: 80, left: 24, fontSize: 27 }}>Daily activity</h2>
        <WeekStrip days={days} selected={day} onSelect={setDay} top={132} centers={[46, 116, 187, 261, 335, 406]} flat dividers />
        <h2 className="nx-h2" style={{ top: 265 }}>100 Day Challenge</h2>
        <ChallengeCard top={319} tone="lavender" chip="110,732 People" art={<FeltX />} title={<>Applying &lsquo;Into Equations&rsquo;<br />in problem solving</>} arrow />
        <h2 className="nx-h2" style={{ top: 751 }}>Science &amp; Engineering</h2>
        <ChallengeCard top={804} tone="green" chip="8,240 People" art={<FeltV />} />
      </NexusCanvas>
    </PhoneFrame>
  );
}
