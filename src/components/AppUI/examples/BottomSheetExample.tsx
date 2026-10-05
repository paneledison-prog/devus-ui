import { PhoneFrame } from '../PhoneFrame';
import { AppBar } from '../AppBar';
import { BottomSheet } from '../BottomSheet';
import { ListRow } from '../ListRow';
import { Button } from '../../Button/Button';

/** Sheet that slides up from the bottom: handle, title, rows and stacked actions. */
export function BottomSheetExample() {
  return (
    <PhoneFrame>
      <AppBar title="Projects" large />
      <BottomSheet title="Share project" footer={<><Button>Copy link</Button><Button variant="ghost">Cancel</Button></>}>
        <ListRow title="Message" />
        <ListRow title="Email" />
      </BottomSheet>
    </PhoneFrame>
  );
}
