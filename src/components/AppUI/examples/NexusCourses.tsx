import { PhoneFrame } from '../PhoneFrame';
import { CourseCard, FeltBlob, FeltCamera, NexusCanvas, NexusHomeBar, NexusStatusBar, NexusTabs, SuggestedCard } from '../Nexus';

/** "Nexus Courses": a suggested-lesson card, two course cards cut off by the tab bar. */
export function NexusCoursesExample() {
  return (
    <PhoneFrame bare height={692}>
      <NexusCanvas>
        <NexusStatusBar />
        <h2 className="nx-h2" style={{ top: 87 }}>Suggested for you</h2>
        <SuggestedCard />
        <h2 className="nx-h2" style={{ top: 575 }}>Learn by doing</h2>
        <CourseCard x={20} tone="peach" topic="Photography" title="Nature And Wildlife"><FeltCamera /></CourseCard>
        <CourseCard x={236} tone="mint" topic="Financial" title="Debt Management"><FeltBlob /></CourseCard>
        <NexusTabs active="courses" />
        <NexusHomeBar />
      </NexusCanvas>
    </PhoneFrame>
  );
}
