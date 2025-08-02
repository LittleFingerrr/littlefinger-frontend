'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PaymentTab } from './tabs/payment-tab';
import { DetailsTab } from './tabs/details-tab';
import { StatusTab } from './tabs/status-tab';
import { CreditCard, User, Activity } from 'lucide-react';

export function DashboardContent() {
    return (
        <div className="p-6">
            <Tabs defaultValue="payment" className="w-full">
                {/* Tab Navigation */}
                <TabsList className="grid w-full max-w-lg grid-cols-3 bg-transparent p-1 mb-8 gap-2">
                    <TabsTrigger
                        value="payment"
                        className="flex items-center space-x-2 bg-[#131313A6] text-gray-400 data-[state=active]:text-white data-[state=active]:bg-[#1a1a1aA6] hover:bg-[#1a1a1aA6] rounded-lg px-4 py-3 border border-gray-700 transition-all duration-200"
                    >
                        <CreditCard className="w-4 h-4" />
                        <span>My Payment</span>
                    </TabsTrigger>
                    <TabsTrigger
                        value="status"
                        className="flex items-center space-x-2 bg-[#131313A6] text-gray-400 data-[state=active]:text-white data-[state=active]:bg-[#1a1a1aA6] hover:bg-[#1a1a1aA6] rounded-lg px-4 py-3 border border-gray-700 transition-all duration-200"
                    >
                        <Activity className="w-4 h-4" />
                        <span>My Status</span>
                    </TabsTrigger>
                    <TabsTrigger
                        value="details"
                        className="flex items-center space-x-2 bg-[#131313A6] text-gray-400 data-[state=active]:text-white data-[state=active]:bg-[#1a1a1aA6] hover:bg-[#1a1a1aA6] rounded-lg px-4 py-3 border border-gray-700 transition-all duration-200"
                    >
                        <User className="w-4 h-4" />
                        <span>My Details</span>
                    </TabsTrigger>
                </TabsList>

                {/* Tab Content */}
                <TabsContent value="payment" className="mt-0">
                    <PaymentTab />
                </TabsContent>

                <TabsContent value="status" className="mt-0">
                    <StatusTab />
                </TabsContent>

                <TabsContent value="details" className="mt-0">
                    <DetailsTab />
                </TabsContent>
            </Tabs>
        </div>
    );
}
