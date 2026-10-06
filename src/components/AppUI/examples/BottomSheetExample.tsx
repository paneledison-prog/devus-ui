import { useState } from 'react';
import { PhoneFrame } from '../PhoneFrame';
import { AppBar } from '../AppBar';
import { BottomSheet } from '../BottomSheet';
import { ListRow } from '../ListRow';
import { Button } from '../../Button/Button';

/** Sheet that slides up from the bottom: handle, title, rows and stacked actions. Drag the handle, swipe down or flick to dismiss. */
export function BottomSheetExample() {
  const [open, setOpen] = useState(true);
  return (
    <PhoneFrame>
      <AppBar title="Projects" large />
      {open ? (
        <BottomSheet
          title="Share project" onDismiss={() => setOpen(false)}
          footer={<><Button onClick={() => setOpen(false)}>Copy link</Button><Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button></>}
        >
          <ListRow title="Message" onClick={() => setOpen(false)} />
          <ListRow title="Email" onClick={() => setOpen(false)} />
        </BottomSheet>
      ) : (
        <div style={{ marginTop: 'auto', paddingBottom: 28 }}><Button size="lg" onClick={() => setOpen(true)}>Share project</Button></div>
      )}
    </PhoneFrame>
  );
}
