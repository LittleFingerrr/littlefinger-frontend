"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CheckCircle2, DollarSign } from "lucide-react"
import { PayMemberModal } from "@/components/pay-member-modal"

export default function VaultPage() {
  const [isPayMemberOpen, setIsPayMemberOpen] = useState(false)

  // Mock data for vault
  const vaultBalance = "$150,000.00"
  const vaultStatus = "Active & Operational"

  const transactions = [
    { id: 1, type: "Deposit", amount: "+$50,000.00", status: "Success", date: "May 15, 2024" },
    { id: 2, type: "Withdrawal", amount: "-$10,000.00", status: "Success", date: "May 10, 2024" },
    { id: 3, type: "Payout", amount: "-$18,700.00", status: "Success", date: "Apr 15, 2024" },
  ]

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Vault</h1>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <div className="mr-4 rounded-full bg-blue-100 p-2">
                <DollarSign className="h-6 w-6 text-blue-600" />
              </div>
              <span className="text-3xl font-bold">{vaultBalance}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Vault Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <div className="mr-4 rounded-full bg-green-100 p-2">
                <CheckCircle2 className="h-6 w-6 text-green-600" />
              </div>
              <span className="text-xl font-bold text-green-700">{vaultStatus}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-wrap gap-4">
        <Button className="bg-blue-600 hover:bg-blue-700">Deposit Funds</Button>
        <Button variant="outline">Withdraw Funds</Button>
        <Button variant="outline" className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700">
          Emergency Freeze
        </Button>
        <Button variant="outline" onClick={() => setIsPayMemberOpen(true)}>
          Pay Member
        </Button>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Transaction History</h2>

        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <Button variant="outline">Filter by type</Button>
          <Button variant="outline">Date range</Button>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Transaction</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Details</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell className="font-medium">{transaction.type}</TableCell>
                  <TableCell className={transaction.amount.startsWith("+") ? "text-green-600" : "text-red-600"}>
                    {transaction.amount}
                  </TableCell>
                  <TableCell>
                    <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                      {transaction.status}
                    </span>
                  </TableCell>
                  <TableCell>{transaction.date}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="flex items-center justify-between mt-4">
          <p className="text-sm text-muted-foreground">Showing 1-3 of 24 transactions</p>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" className="h-8 w-8 p-0">
              1
            </Button>
            <Button variant="outline" size="sm" className="h-8 w-8 p-0">
              2
            </Button>
            <Button variant="outline" size="sm" className="h-8 w-8 p-0">
              3
            </Button>
          </div>
        </div>
      </div>

      <PayMemberModal open={isPayMemberOpen} onOpenChange={setIsPayMemberOpen} />
    </div>
  )
}
