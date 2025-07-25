"use client"

import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs"
import {
  Table,
  TableHeader,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/ui/table"
import { Card, CardContent } from "@/components/ui/card"
import { ConnectWalletBtn } from "@/components/dashboard/ConnectWalletBtn"
import { CreditCard, BarChart2, User } from "lucide-react"

const rows = [
  { status: "Active", role: "Member", date: "May 31, 2024", color: "text-green-500" },
  { status: "Suspended", role: "Member", date: "June 2, 2024", color: "text-yellow-400" },
  { status: "Removed", role: "Member", date: "June 12, 2024", color: "text-red-500" },
]

export default function MemberProfile() {
  return (
    <main className="min-h-screen bg-black px-4 sm:px-6 md:px-8 pt-6 pb-16 text-white space-y-10">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold">Organization 001</h1>
        <ConnectWalletBtn />
      </div>

      {/* Tabs */}
      <Tabs defaultValue="status" className="w-full max-w-5xl ">
        <TabsList className="flex flex-wrap justify-start gap-4 sm:gap-6 md:gap-10 w-full">
          {[
            { value: "payment", label: "My Payment", icon: CreditCard },
            { value: "status", label: "My Status", icon: BarChart2 },
            { value: "details", label: "My Details", icon: User },
          ].map(({ value, label, icon: Icon }) => (
            <TabsTrigger
              key={value}
              value={value}
              className="
                flex items-center gap-2 w-full sm:w-auto justify-center py-3 px-6 rounded-[1rem] border
                text-sm sm:text-base font-medium
                bg-[#2A2A2A]/60 border-white/25
                data-[state=active]:bg-[#3E3E3E]/70
                data-[state=active]:border-white data-[state=active]:shadow-inner
                data-[state=inactive]:text-gray-400
              "
            >
              <Icon size={18} />
              {label}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* Payment */}
        <TabsContent value="payment" className="pt-10 sm:pt-12 text-gray-400 text-center">
          Payment information coming soon…
        </TabsContent>

        {/* Status */}
        <TabsContent value="status" className="pt-10 sm:pt-12">
          <Card className="bg-black border-0 shadow-none">
            <CardContent className="overflow-x-auto p-0">
              <div className="min-w-[600px]">
                <Table>
                  <TableHeader>
                    <TableRow className="border-b border-[#3F3F3F] text-gray-300 text-left">
                      <TableHead className="pl-6 text-sm">Status</TableHead>
                      <TableHead className="text-sm">Role</TableHead>
                      <TableHead className="text-sm">Date of Initialization</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody className="[&_tr]:border-0">
                    {rows.map(({ status, role, date, color }) => (
                      <TableRow key={status}>
                        <TableCell className={`py-6 pl-6 font-semibold ${color}`}>
                          {status}
                        </TableCell>
                        <TableCell className="py-6 font-semibold">{role}</TableCell>
                        <TableCell className="py-6 font-semibold">{date}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Details */}
        <TabsContent value="details" className="pt-10 sm:pt-12 text-gray-400 text-center">
          Details content coming soon…
        </TabsContent>
      </Tabs>
    </main>
  )
}
