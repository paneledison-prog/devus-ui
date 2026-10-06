import { useEffect, useRef, useState } from 'react';
import { usePull, useSwipe } from './gestures';
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

const ORDER: NexusTab[] = ['home', 'courses', 'today'];

/**
 * The Nexus tab bar is live: Home, Courses and Today switch between the three screens. The week strips select a day.
 * Gestures: swipe a screen left or right to go to the next tab, swipe a week strip to change the day, pull a screen down to refresh,
 * press and hold a course or a challenge card to save or join it.
 */
export function NexusApp({ initial }: { initial: NexusTab }) {
  const [tab, setTab] = useState<NexusTab>(initial);
  const [fresh, setFresh] = useState(false);
  const host = useRef<HTMLDivElement>(null);
  const pull = usePull(host, () => setFresh(true), { threshold: 70, ms: 900 });
  const nav = useSwipe({
    threshold: 70, flickSpeed: 0.8, ignore: '.nx-week',
    onSwipe: (d, { dx, dy }) => {
      if (Math.abs(dx) < Math.abs(dy) * 1.4) return;
      const i = ORDER.indexOf(tab) + (d === 'left' ? 1 : d === 'right' ? -1 : 0);
      if (i >= 0 && i < ORDER.length) setTab(ORDER[i]);
    },
  });
  useEffect(() => { if (!fresh) return; const t = window.setTimeout(() => setFresh(false), 1500); return () => window.clearTimeout(t); }, [fresh]);
  return (
    <PhoneFrame bare height={692}>
      <div className="nx-pull" aria-hidden={!pull.refreshing} style={{ transform: `translateY(${Math.max(0, pull.pull - 36)}px)`, opacity: Math.min(1, pull.progress * 1.2) }}><i className={pull.refreshing ? 'is-spin' : ''} style={pull.refreshing ? undefined : { rotate: `${pull.progress * 300}deg` }} /></div>
      {fresh && <p className="nx-toast" role="status">Up to date</p>}
      <div className="nx-host" ref={host} {...nav.bind}>
        <div className="nx-screen" key={tab}>
          {tab === 'home' && <HomeScreen onTab={setTab} />}
          {tab === 'courses' && <CoursesScreen onTab={setTab} />}
          {tab === 'today' && <TodayScreen onTab={setTab} />}
        </div>
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
