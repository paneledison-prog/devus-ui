import { PaywallFlow } from '../PaywallFlow';

/** "Restoring Purchases": the spinner turns; the back chevron returns to the paywall. */
export function RestoringPurchasesExample() {
  return <PaywallFlow initial="restoring" />;
}
