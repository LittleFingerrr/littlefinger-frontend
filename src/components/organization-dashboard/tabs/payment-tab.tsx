import { BalanceCards } from '../balance-cards';
import { PaymentTable } from '../payment-table';

export function PaymentTab() {
    return (
        <div className="space-y-8">
            {/* Balance Cards Section */}
            <BalanceCards />

            {/* Payment Table Section */}
            <PaymentTable />
        </div>
    );
}
