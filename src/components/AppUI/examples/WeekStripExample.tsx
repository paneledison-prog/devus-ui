import { PhoneFrame } from '../PhoneFrame';
import { AppBar } from '../AppBar';
import { WeekStrip } from '../Cards';
import { appDays } from './data';

/** Horizontal day picker. */
export function WeekStripExample() {
  return (
    <PhoneFrame>
      <AppBar title="Schedule" large />
      <WeekStrip days={appDays} defaultValue="wed" />
    </PhoneFrame>
  );
}
