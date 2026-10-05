import { PhoneFrame } from '../PhoneFrame';
import { AppBar } from '../AppBar';
import { DotsIcon, FinanceScroll, InvoiceActions, InvoiceItems, InvoiceParty, InvoiceSummary } from '../Finance';

/** Invoice screen: number and status, amount and dates, who it was billed to, line items with totals, and two actions. */
export function InvoiceDetailExample() {
  return (
    <PhoneFrame>
      <AppBar title="Invoice detail" onBack={() => {}} action={<DotsIcon />} />
      <FinanceScroll>
        <InvoiceSummary
          number="INV-110450"
          status="Paid"
          amount="$4,950.00"
          dates={[{ label: 'Issued date', value: '24 Aug, 2026' }, { label: 'Due date', value: '7 Sep, 2026' }]}
        />
        <InvoiceParty name="Acme Studio" email="acmestudio@example.com" initials="AS" />
        <InvoiceItems
          lines={[{ description: 'Mobile app development', qty: 1, price: 3000 }, { description: 'Website design', qty: 1, price: 1500 }]}
          taxRate={0.1}
        />
      </FinanceScroll>
      <InvoiceActions />
    </PhoneFrame>
  );
}
