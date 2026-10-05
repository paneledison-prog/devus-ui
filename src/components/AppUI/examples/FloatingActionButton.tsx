import { PhoneFrame } from '../PhoneFrame';
import { AppBar } from '../AppBar';
import { Fab } from '../Fab';

/** Round floating action buttons: extended with a label, and dark. */
export function FloatingActionButtonExample() {
  return (
    <PhoneFrame>
      <AppBar title="Inbox" large />
      <div style={{ marginTop: 'auto', paddingBottom: 26, display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 10 }}>
        <Fab label="New chat" />
        <Fab tone="dark" />
      </div>
    </PhoneFrame>
  );
}
