import { PhoneFrame } from '../PhoneFrame';
import { AppBar } from '../AppBar';
import { WeekStrip } from '../Cards';
import { TabBar } from '../TabBar';
import { Fab } from '../Fab';
import { SunIcon } from '../icons';
import { appDays, appTabs, TaskCard } from './data';

/** Mobile home: greeting app bar, week strip, task card and a floating tab bar with a round action. */
export function HomeScreenExample() {
  return (
    <PhoneFrame>
      <AppBar title="Hey, Ada" subtitle="Let's make progress today!" large action={<SunIcon />} />
      <WeekStrip days={appDays} defaultValue="wed" />
      <TaskCard />
      <TabBar floating items={appTabs} action={<Fab tone="dark" />} />
    </PhoneFrame>
  );
}
