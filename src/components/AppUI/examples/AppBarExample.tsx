import { PhoneFrame } from '../PhoneFrame';
import { AppBar } from '../AppBar';
import { SunIcon } from '../icons';

/** Both app bar styles: centered title with a back button, and the large greeting. */
export function AppBarExample() {
  return (
    <PhoneFrame>
      <AppBar title="Details" onBack={() => {}} />
      <AppBar title="Hey, Ada" subtitle="Let's make progress today!" large action={<SunIcon />} />
    </PhoneFrame>
  );
}
