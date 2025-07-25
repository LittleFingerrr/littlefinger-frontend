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

/* dummy rows */
const rows = [
  { status: "Active",    role: "Member", date: "May 31, 2024",  color: "text-green-400" },
  { status: "Suspended", role: "Member", date: "June 2, 2024", color: "text-yellow-400" },
  { status: "Removed",   role: "Member", date: "June 12, 2024", color: "text-red-500"  },
]

export default function MemberProfile() {
  return (
    <main className="min-h-screen bg-regal-black px-8 pt-6 pb-16 text-white space-y-10">
      {/* Header */}
      <div className="flex items-start justify-between">
        <h1 className="text-2xl font-semibold">Organization 001</h1>
        <ConnectWalletBtn />
      </div>

      {/* Tabs */}
      <Tabs defaultValue="status" className="w-full max-w-[980px] mx-auto">
        <TabsList className="flex gap-10 justify-center">
          {[
            { value: "payment", label: "My Payment", icon: CreditCard },
            { value: "status",  label: "My Status",  icon: BarChart2 },
            { value: "details", label: "My Details", icon: User      },
          ].map(({ value, label, icon: Icon }) => (
            <TabsTrigger
              key={value}
              value={value}
              className="
                flex items-center gap-3 w-56 justify-center py-3 rounded-[1rem] border
                text-base font-medium
                bg-[#2A2A2A]/60 border-white/25
                data-[state=active]:bg-[#3E3E3E]/70
                data-[state=active]:border-white data-[state=active]:shadow-inner
                data-[state=inactive]:text-gray-400
              "
            >
              <Icon size={20} />
              {label}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* My Payment placeholder */}
        <TabsContent value="payment" className="pt-12 text-gray-400">
          Payment information coming soon…
        </TabsContent>

        {/* My Status table */}
        <TabsContent value="status" className="pt-12">
          <Card className="bg-black border-0 shadow-none">
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="border-b border-[#3F3F3F] text-gray-300 text-left">
                    <TableHead className="pl-8">Status</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Date of initialization</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody className="[&_tr]:border-0">
                  {rows.map(({ status, role, date, color }) => (
                    <TableRow key={status}>
                      <TableCell className={`py-6 pl-8 font-semibold ${color}`}>{status}</TableCell>
                      <TableCell className="py-6 font-semibold">{role}</TableCell>
                      <TableCell className="py-6 font-semibold">{date}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* My Details placeholder */}
        <TabsContent value="details" className="pt-12 text-gray-400">
          Details content coming soon…
        </TabsContent>
      </Tabs>
    </main>
  )
}
