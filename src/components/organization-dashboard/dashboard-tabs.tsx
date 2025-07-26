
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PaymentTab } from "./tabs/payment-tab"
import { DetailsTab } from "./tabs/details-tab"
import { StatusTab } from "./tabs/status-tab"
import { CreditCard, User, Activity } from "lucide-react"

export function DashboardTabs() {
  return (
    <Tabs defaultValue="payment" className="w-full">
      {/* Tab Navigation */}
      <TabsList className="grid w-full max-w-md grid-cols-3 bg-transparent p-1 mb-8">
        <TabsTrigger
          value="payment"
          className="flex items-center space-x-2 bg-gray-800 text-white data-[state=active]:bg-gray-700 data-[state=active]:text-white rounded-lg px-4 py-2"
        >
          <CreditCard className="w-4 h-4" />
          <span>My Payment</span>
        </TabsTrigger>
        <TabsTrigger
          value="status"
          className="flex items-center space-x-2 bg-gray-800 text-white data-[state=active]:bg-gray-700 data-[state=active]:text-white rounded-lg px-4 py-2"
        >
          <Activity className="w-4 h-4" />
          <span>My Status</span>
        </TabsTrigger>
        <TabsTrigger
          value="details"
          className="flex items-center space-x-2 bg-gray-800 text-white data-[state=active]:bg-gray-700 data-[state=active]:text-white rounded-lg px-4 py-2"
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
  )
}
