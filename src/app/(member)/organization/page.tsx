import { DashboardContent } from '@/components/organization-dashboard/dashboard-content';
import { DashboardHeader } from '@/components/organization-dashboard/dashboard-header';

export default function DashboardPage() {
    return (
        <>
            {/* Header with Organization Selector and Connect Wallet */}
            <DashboardHeader />

            {/* Main Dashboard Content */}
            <main className="flex-1 overflow-auto">
                <DashboardContent />
            </main>
        </>
    );
}
