import { PhoneFrame } from '../PhoneFrame';
import { ClayCloud, ClayRing, PayCanvas, PayHomeBar, PayStatusBar, PlanRow, UpArrow, type Plan } from '../Paywall';

const plans: Plan[] = [
  { id: 'annual', name: 'Annual', perYear: '$35.99 /year', was: '$69.99', price: '$2.99/month', selected: true },
  { id: 'monthly', name: 'Monthly', perYear: '$59.99/year', price: '$5.99/month' },
];

/** "Level Up with Premium": a sky-blue hero with clay artwork, a restore row, and a white sheet with two plans, a trial button and a terms link. */
export function PremiumPaywallExample() {
  return (
    <PhoneFrame bare height={696}>
      <PayCanvas tone="paywall">
        <div className="pw__hero">
          <ClayCloud />
          <button type="button" className="pw__close" aria-label="Close">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true"><path d="m3 3 10 10M13 3 3 13" /></svg>
          </button>
          <h1 className="pw__title">Level Up<br />with Premium</h1>
          <p className="pw__sub">Because basic just<br />isn&rsquo;t enough.</p>
          <ClayRing />
        </div>
        <div className="pw__strip" />
        <button type="button" className="pw__restore"><span className="pw__restore-icon"><UpArrow /></span>Restore Purchases</button>
        <section className="pw__sheet" aria-label="Plans">
          <PlanRow plan={plans[0]} top={26} />
          <PlanRow plan={plans[1]} top={93} />
          <button type="button" className="pw__cta">Start Free Trial</button>
          <button type="button" className="pw__terms">Terms of Service</button>
        </section>
        <PayStatusBar />
        <PayHomeBar dark />
      </PayCanvas>
    </PhoneFrame>
  );
}
