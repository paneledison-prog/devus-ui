import { PhoneFrame } from '../PhoneFrame';
import { Avatars, FomoCanvas, FomoHomeBar, FomoStatusBar, Logo, Rays, Welcome } from '../Fomo';

/** "Fomo welcome": a dark green field of round meme avatars on rays around the FOMO logo, then a welcome title and two sign-in buttons. */
export function FomoWelcomeExample() {
  return (
    <PhoneFrame bare height={692}>
      <FomoCanvas>
        <Rays />
        <Avatars />
        <Logo />
        <FomoStatusBar />
        <Welcome />
        <FomoHomeBar />
      </FomoCanvas>
    </PhoneFrame>
  );
}
