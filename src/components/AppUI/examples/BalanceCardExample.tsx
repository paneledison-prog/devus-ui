import { PhoneFrame } from '../PhoneFrame';
import { AppBar } from '../AppBar';
import { BalanceCard } from '../Cards';
import { BellIcon } from '../icons';

/** High-contrast dark card with an amount, a primary pill and two secondary actions. */
export function BalanceCardExample() {
  return (
    <PhoneFrame>
      <AppBar title="Hello, Victor" subtitle="12 Palm Groove, Lagos" large action={<BellIcon />} />
      <BalanceCard
        amount="$245.00"
        actions={<><button type="button">New shipping</button><button type="button">Track shipping</button></>}
      />
    </PhoneFrame>
  );
}
