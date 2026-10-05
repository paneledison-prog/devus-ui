import { PhoneFrame } from '../PhoneFrame';
import { BalanceHero, BillList, BoltIcon, CardIcon, ChartIcon, DropIcon, FinanceHeader, FinanceScroll, FinanceTabs, HomeSolid, NegotiatorCard, QuickActions, WifiIcon, type Bill } from '../Finance';
import { GearIcon } from '../icons';

const bills: Bill[] = [
  { id: 'internet', name: 'Internet – FiberLink', due: 'Due Sep 18 · 2 days left', amount: '$10.99', icon: <WifiIcon />, tone: 'blue', urgent: true },
  { id: 'power', name: 'Electricity – PowerGrid', due: 'Due Sep 18 · 2 days left', amount: '$120.75', icon: <BoltIcon />, tone: 'amber', urgent: true },
  { id: 'water', name: 'Water – AquaPure', due: 'Due Sep 22 · 6 days left', amount: '$45.00', icon: <DropIcon />, tone: 'sky' },
];

const tabs = [
  { id: 'home', label: 'Home', icon: <HomeSolid /> },
  { id: 'cards', label: 'Cards', icon: <CardIcon /> },
  { id: 'analytics', label: 'Analytics', icon: <ChartIcon /> },
  { id: 'settings', label: 'Settings', icon: <GearIcon /> },
];

/** Banking home: balance on a blue hero, quick actions, a savings suggestion, a filterable bill list and a tab bar. */
export function FinanceDashboardExample() {
  return (
    <PhoneFrame hero>
      <FinanceScroll>
        <FinanceHeader name="Ethan Carter" initials="EC" />
        <BalanceHero amount="$124,892.65" change="+8.42%" changeAmount="+$9,684.20" />
        <QuickActions />
        <NegotiatorCard>We found a way to cut your fiber internet bill by <strong>$12/month</strong> without changing your speed.</NegotiatorCard>
        <BillList bills={bills} />
      </FinanceScroll>
      <FinanceTabs items={tabs} />
    </PhoneFrame>
  );
}
