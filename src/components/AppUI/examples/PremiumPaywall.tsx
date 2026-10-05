import { PaywallFlow } from '../PaywallFlow';

/** "Level Up with Premium": pick a plan, start the trial, or restore purchases (opens the Restoring screen). */
export function PremiumPaywallExample() {
  return <PaywallFlow initial="paywall" />;
}
