import { PhoneFrame } from '../PhoneFrame';
import { Pitch, Spheres, WabiCanvas, WabiLogo } from '../Wabi';

/** "Wabi welcome": a cropped screenshot with a cluster of glass spheres holding photos, a plus button, a three-line pitch and two sign-in buttons. */
export function WabiWelcomeExample() {
  return (
    <PhoneFrame bare height={640}>
      <WabiCanvas>
        <WabiLogo />
        <Spheres />
        <Pitch />
      </WabiCanvas>
    </PhoneFrame>
  );
}
