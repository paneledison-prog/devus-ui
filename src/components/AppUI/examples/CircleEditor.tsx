import { PhoneFrame } from '../PhoneFrame';
import { CircleEditorScreen } from '../Stickers';

/** "Circle editor": drag the stickers on the circle, delete them, add the selected pack's sticker, tap the circle to play. */
export function CircleEditorExample() {
  return (
    <PhoneFrame bare height={692}>
      <CircleEditorScreen />
    </PhoneFrame>
  );
}
