import { PhoneFrame } from '../PhoneFrame';
import { Cast, MoimoiCanvas, MoimoiHomeBar, MoimoiStatusBar, SignInPanel, Wordmark } from '../Moimoi';

/** "moimoi sign in": a heavy wordmark over six round characters, then a warm panel with Google and Apple sign-in buttons. */
export function MoimoiSignInExample() {
  return (
    <PhoneFrame bare height={692}>
      <MoimoiCanvas>
        <Cast />
        <Wordmark />
        <MoimoiStatusBar />
        <SignInPanel />
        <MoimoiHomeBar />
      </MoimoiCanvas>
    </PhoneFrame>
  );
}
