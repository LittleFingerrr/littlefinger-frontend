import { UserDetailsCard } from '../user-details-card';
import { PaymentStatsCard } from '../payment-stats-card';

export function DetailsTab() {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* User Details Card */}
            <UserDetailsCard />

            {/* Payment Statistics Card */}
            <PaymentStatsCard />
        </div>
    );
}
