import { PhoneFrame } from '../PhoneFrame';
import { AppBar } from '../AppBar';
import { AppCard, TrackSteps } from '../Cards';
import { Button } from '../../Button/Button';
import { appSteps } from './data';

/** Shipment progress: a dot per step, done steps filled and connected. */
export function TrackingStepsExample() {
  return (
    <PhoneFrame>
      <AppBar title="Details" onBack={() => {}} />
      <AppCard label="Shipment">
        <h3 className="app-card__title">PAQ-327-P21</h3>
        <TrackSteps steps={appSteps} />
      </AppCard>
      <Button size="lg">Track shipping</Button>
    </PhoneFrame>
  );
}
