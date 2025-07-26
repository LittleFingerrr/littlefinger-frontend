"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PaymentTab } from "./tabs/payment-tab"
import { DetailsTab } from "./tabs/details-tab"
import { StatusTab } from "./tabs/status-tab"
import { CreditCard, User, Activity } from "lucide-react"

export function DashboardContent() {
  return (
    <div className="p-6">
      <Tabs defaultValue="payment" className="w-full">
        {/* Tab Navigation */}
        <TabsList className="grid w-full max-w-lg grid-cols-3 bg-transparent p-1 mb-8 gap-2">
          <TabsTrigger
            value="payment"
            className="flex items-center space-x-2 bg-gray-800 text-gray-400 data-[state=active]:bg-gray-700 data-[state=active]:text-white rounded-lg px-4 py-3 border border-gray-700"
          >
            <CreditCard className="w-4 h-4" />
            <span>My Payment</span>
          </TabsTrigger>
          <TabsTrigger
            value="status"
            className="flex items-center space-x-2 bg-gray-800 text-gray-400 data-[state=active]:bg-gray-700 data-[state=active]:text-white rounded-lg px-4 py-3 border border-gray-700"
          >
            <Activity className="w-4 h-4" />
            <span>My Status</span>
          </TabsTrigger>
          <TabsTrigger
            value="details"
            className="flex items-center space-x-2 bg-gray-800 text-gray-400 data-[state=active]:bg-gray-700 data-[state=active]:text-white rounded-lg px-4 py-3 border border-gray-700"
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
  )
}
