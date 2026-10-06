import { useEffect, useState } from 'react';
import { PhoneFrame } from './PhoneFrame';
import { useSwipe } from './gestures';
import { ClayCloud, ClayFlower, ClayRing, PayCanvas, PayHomeBar, PayStatusBar, PlanCard, PlanRow, UpArrow, type Plan } from './Paywall';

type Screen = 'paywall' | 'restoring';
type PlanId = 'annual' | 'monthly';

/**
 * Premium paywall and Restoring purchases as one small flow:
 * choose a plan, start the trial (the button shows a spinner), or tap Restore Purchases to reach the Restoring screen,
 * whose back chevron returns to the paywall.
 * Gestures: swipe the plan sheet left or right to switch plan, swipe the Restoring screen to the right to go back.
 */
export function PaywallFlow({ initial }: { initial: Screen }) {
  const [screen, setScreen] = useState<Screen>(initial);
  const [plan, setPlan] = useState<PlanId>('annual');
  const [busy, setBusy] = useState(false);
  const plans = useSwipe({ axis: 'x', threshold: 36, flickSpeed: 0.7, onSwipe: (d) => setPlan(d === 'left' ? 'monthly' : 'annual') });
  const back = useSwipe({ axis: 'x', threshold: 60, flickSpeed: 0.8, onSwipe: (d) => { if (d === 'right') setScreen('paywall'); } });

  useEffect(() => {
    if (!busy) return;
    const t = window.setTimeout(() => setBusy(false), 1600);
    return () => window.clearTimeout(t);
  }, [busy]);

  const annual: Plan = { id: 'annual', name: 'Annual', perYear: '$35.99 /year', was: '$69.99', price: '$2.99/month', selected: plan === 'annual' };
  const monthly: Plan = { id: 'monthly', name: 'Monthly', perYear: '$59.99/year', price: '$5.99/month', selected: plan === 'monthly' };

  return (
    <PhoneFrame bare height={696}>
      <div className="pw-screen" key={screen}>
        {screen === 'paywall' ? (
          <PayCanvas tone="paywall">
            <div className="pw__hero">
              <ClayCloud />
              <button type="button" className="pw__close" aria-label="Close" onClick={() => setBusy(false)}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#fff" strokeWidth="2.200" strokeLinecap="round" aria-hidden="true"><path d="m3 3 10 10M13 3 3 13" /></svg>
              </button>
              <h1 className="pw__title">Level Up<br />with Premium</h1>
              <p className="pw__sub">Because basic just<br />isn&rsquo;t enough.</p>
              <ClayRing />
            </div>
            <div className="pw__strip" />
            <button type="button" className="pw__restore" onClick={() => setScreen('restoring')}><span className="pw__restore-icon"><UpArrow /></span>Restore Purchases</button>
            <section className="pw__sheet" aria-label="Plans. Swipe to switch plan" role="radiogroup" {...plans.bind}>
              <PlanRow plan={annual} top={26} onSelect={() => setPlan('annual')} />
              <PlanRow plan={monthly} top={93} onSelect={() => setPlan('monthly')} />
              <button type="button" className="pw__cta" aria-busy={busy} disabled={busy} onClick={() => setBusy(true)}>{busy ? <i className="pw-cta-spin" aria-hidden="true" /> : 'Start Free Trial'}</button>
              <button type="button" className="pw__terms">Terms of Service</button>
            </section>
            <PayStatusBar />
            <PayHomeBar dark />
          </PayCanvas>
        ) : (
          <PayCanvas tone="restoring" swipe={back.bind}>
            <button type="button" className="pw__back" aria-label="Back" onClick={() => setScreen('paywall')}>
              <svg width="14" height="22" viewBox="0 0 14 22" fill="none" stroke="#fff" strokeWidth="2.400" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M11 2 3 11l8 9" /></svg>
            </button>
            <PlanCard text="$4.99/month" x={314} y={282} rotate={-8} />
            <PlanCard text="$5.99/month" x={79} y={186} rotate={7.600} />
            <PlanCard plan={monthly} x={321} y={305} rotate={-15} />
            <PlanCard plan={annual} x={225} y={261} rotate={1.500} />
            <ClayFlower />
            <h1 className="pw__title pw__title--restoring">Restoring Purchases</h1>
            <p className="pw__sub pw__sub--restoring">Just a sec &mdash; restoring<br />what&rsquo;s yours</p>
            <svg className="pw-spinner" width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="#fff" strokeWidth="2.600" strokeLinecap="round" role="status" aria-label="Restoring purchases">
              <circle cx="20" cy="20" r="15" stroke="rgb(255 255 255 / .3)" />
              <circle cx="20" cy="20" r="15" strokeDasharray="28 66.2" transform="rotate(-90 20 20)" />
            </svg>
            <PayStatusBar />
            <PayHomeBar />
          </PayCanvas>
        )}
      </div>
    </PhoneFrame>
  );
}
