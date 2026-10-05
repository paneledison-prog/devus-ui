import { useEffect, useRef, useState } from 'react';
import { PhoneFrame } from '../PhoneFrame';
import {
  BalanceHero, BillList, BoltIcon, CardIcon, ChartIcon, ConfirmPaymentSheet, DropIcon, FinanceFlow, FinanceHeader, FinanceScroll, FinanceTabs, HomeSolid,
  NegotiatorCard, PaymentSentModal, QuickActions, WifiIcon, type Bill,
} from '../Finance';
import { GearIcon } from '../icons';

const bills: Bill[] = [
  { id: 'internet', name: 'Internet – FiberLink', payee: 'FiberLink', due: 'Due Sep 18 · 2 days left', amount: '$10.99', icon: <WifiIcon />, tone: 'blue', urgent: true },
  { id: 'power', name: 'Electricity – PowerGrid', payee: 'PowerGrid', due: 'Due Sep 18 · 2 days left', amount: '$120.75', icon: <BoltIcon />, tone: 'amber', urgent: true },
  { id: 'water', name: 'Water – AquaPure', payee: 'AquaPure', due: 'Due Sep 22 · 6 days left', amount: '$45.00', icon: <DropIcon />, tone: 'sky' },
];

const tabs = [
  { id: 'home', label: 'Home', icon: <HomeSolid /> },
  { id: 'cards', label: 'Cards', icon: <CardIcon /> },
  { id: 'analytics', label: 'Analytics', icon: <ChartIcon /> },
  { id: 'settings', label: 'Settings', icon: <GearIcon /> },
];

const START_BALANCE = 124892.65;
const usd = (n: number) => `$${n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
const cents = (amount: string) => Math.round(parseFloat(amount.replace(/[$,]/g, '')) * 100) / 100;

type Step = 'home' | 'confirm' | 'sent';

/**
 * Banking home as a three-step flow: Home -> Confirm payment (bottom sheet over the dimmed screen) -> Payment sent (modal) -> Home.
 * Pressing a bill opens its confirmation; confirming marks it paid and lowers the balance.
 */
export function FinanceDashboardExample() {
  const [step, setStep] = useState<Step>('home');
  const [openId, setOpenId] = useState<string | null>(null);
  const [paid, setPaid] = useState<string[]>([]);
  const [busy, setBusy] = useState(false);
  const timer = useRef(0);
  const lastOpened = useRef<string | null>(null);
  const flow = useRef<HTMLDivElement>(null);
  const bill = bills.find((b) => b.id === openId);
  const balance = START_BALANCE - bills.filter((b) => paid.includes(b.id)).reduce((sum, b) => sum + cents(b.amount), 0);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const open = (id: string) => { lastOpened.current = id; setOpenId(id); setStep('confirm'); };
  const backHome = () => { window.clearTimeout(timer.current); setBusy(false); setStep('home'); };
  const confirm = () => {
    if (!openId) return;
    setBusy(true);
    timer.current = window.setTimeout(() => { setBusy(false); setPaid((p) => (p.includes(openId) ? p : [...p, openId])); setStep('sent'); }, 900);
  };

  // Escape closes the sheet or the success card.
  useEffect(() => {
    if (step === 'home') return;
    // preventDefault keeps a surrounding native <dialog> (the library preview) from closing on the same keypress.
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') { e.preventDefault(); backHome(); } };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [step]);

  // Return focus to the bill that opened the flow.
  useEffect(() => {
    if (step === 'home' && lastOpened.current) {
      const row = flow.current?.querySelector<HTMLButtonElement>(`[data-bill="${lastOpened.current}"]`);
      // A paid row is disabled, so focus the active filter instead.
      (row && !row.disabled ? row : flow.current?.querySelector<HTMLElement>('.fin-filter [aria-pressed="true"]'))?.focus({ preventScroll: true });
    }
  }, [step]);

  return (
    <PhoneFrame hero>
      <FinanceFlow ref={flow}>
        <div className="fin-flow__home" inert={step !== 'home'}>
          <FinanceScroll>
            <FinanceHeader name="Ethan Carter" initials="EC" />
            <BalanceHero amount={usd(balance)} change="+8.42%" changeAmount="+$9,684.20" />
            <QuickActions />
            <NegotiatorCard>We found a way to cut your fiber internet bill by <strong>$12/month</strong> without changing your speed.</NegotiatorCard>
            <BillList bills={bills} onOpen={open} paidIds={paid} />
          </FinanceScroll>
          <FinanceTabs items={tabs} />
        </div>
        {step === 'confirm' && bill && <ConfirmPaymentSheet bill={bill} from="Nimbus checking …4821" busy={busy} onConfirm={confirm} onClose={backHome} />}
        {step === 'sent' && bill && <PaymentSentModal payee={bill.payee ?? bill.name} onDone={backHome} />}
      </FinanceFlow>
    </PhoneFrame>
  );
}
