import { PhoneFrame } from '../PhoneFrame';
import { ClayFlower, PayCanvas, PayHomeBar, PayStatusBar, PlanCard, type Plan } from '../Paywall';

const annual: Plan = { id: 'annual', name: 'Annual', perYear: '$35.99 /year', price: '$2.99/month', selected: true };
const monthly: Plan = { id: 'monthly', name: 'Monthly', perYear: '$59.99/year', price: '$5.99/month' };

/** "Restoring Purchases": plan cards scattered mid-motion above a clay flower ring, a title, a subtitle and a spinner ring. */
export function RestoringPurchasesExample() {
  return (
    <PhoneFrame bare height={696}>
      <PayCanvas tone="restoring">
        <button type="button" className="pw__back" aria-label="Back">
          <svg width="14" height="22" viewBox="0 0 14 22" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M11 2 3 11l8 9" /></svg>
        </button>
        <PlanCard x={314} y={282} rotate={-8} text="$4.99/month" />
        <PlanCard x={79} y={186} rotate={7.6} text="$5.99/month" />
        <PlanCard plan={monthly} x={321} y={305} rotate={-15} />
        <PlanCard plan={annual} x={225} y={261} rotate={1.5} />
        <ClayFlower />
        <h1 className="pw__title pw__title--restoring">Restoring Purchases</h1>
        <p className="pw__sub pw__sub--restoring">Just a sec &mdash; restoring<br />what&rsquo;s yours</p>
        <svg className="pw-spinner" width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" role="status" aria-label="Restoring purchases">
          <circle cx="20" cy="20" r="15" strokeDasharray="78 16" transform="rotate(-100 20 20)" />
        </svg>
        <PayStatusBar />
        <PayHomeBar />
      </PayCanvas>
    </PhoneFrame>
  );
}
