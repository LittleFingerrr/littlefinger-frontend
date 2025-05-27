"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DashboardTopCards } from "@/components/dashboardTopCards"
import { useContracts, useHasOrganization, useOrgAddress, useVaultAddress } from "@/components/contract-provider"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, Plus } from "lucide-react"
import Link from "next/link"
import { useAccount, useConnect, useReadContract } from "@starknet-react/core"
import { VAULTABI } from "@/lib/abi/vault-abi"
import { FACTORYABI } from "@/lib/abi/factory-abi"
import { LITTLEFINGER_FACTORY_ADDRESS } from "@/lib/constants"
import { contractAddressToHex, felt252ToString } from "@/lib/utils"
import { COREABI } from "@/lib/abi/core-abi"

export default function Dashboard() {
  const { addresses, isLoading, error } = useContracts()
  const { hasOrganization } = useHasOrganization()

  const { address } = useAccount()
  const {  } = useConnect()

  const {
      data: contractAddresses,
      // isLoading,
      refetch,
      error: contractError,
    } = useReadContract({
      abi: FACTORYABI,
      address: LITTLEFINGER_FACTORY_ADDRESS,
      functionName: "get_vault_org_pair",
      args: [address!],
      // enabled: !!address && isConnected,
    })

  // Mock data for dashboard
  const recentDisbursements = [
    { id: 1, date: "May 15, 2024", amount: "$18,700.00", recipients: 38, status: "Completed" },
    { id: 2, date: "Apr 15, 2024", amount: "$18,700.00", recipients: 38, status: "Completed" },
    { id: 3, date: "Mar 15, 2024", amount: "$17,500.00", recipients: 35, status: "Completed" },
  ]

  // if (isLoading) {
  //   return (
  //     <div className="space-y-6">
  //       <h1 className="text-2xl font-bold">Dashboard</h1>
  //       <div className="flex items-center justify-center h-64">
  //         <div className="text-center">
  //           <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
  //           <p className="text-muted-foreground">Loading your organization...</p>
  //         </div>
  //       </div>
  //     </div>
  //   )
  // }

  // if (error) {
  //   return (
  //     <div className="space-y-6">
  //       <h1 className="text-2xl font-bold">Dashboard</h1>
  //       <Alert variant="destructive">
  //         <AlertCircle className="h-4 w-4" />
  //         <AlertTitle>Error</AlertTitle>
  //         <AlertDescription>{error}</AlertDescription>
  //       </Alert>
  //     </div>
  //   )
  // }

  // if (!hasOrganization) {
  //   return (
  //     <div className="space-y-6">
  //       <h1 className="text-2xl font-bold">Dashboard</h1>
  //       <Alert>
  //         <AlertCircle className="h-4 w-4" />
  //         <AlertTitle>No Organization Found</AlertTitle>
  //         <AlertDescription>
  //           You haven't created an organization yet. Create one to get started with managing your team and funds.
  //         </AlertDescription>
  //       </Alert>
  //       <Card>
  //         <CardContent className="pt-6">
  //           <div className="text-center space-y-4">
  //             <h3 className="text-lg font-semibold">Get Started</h3>
  //             <p className="text-muted-foreground">
  //               Create your organization to start managing members, schedules, and disbursements.
  //             </p>
  //             <Button asChild className="bg-blue-600 hover:bg-blue-700">
  //               <Link href="/">
  //                 <Plus className="mr-2 h-4 w-4" />
  //                 Create Organization
  //               </Link>
  //             </Button>
  //           </div>
  //         </CardContent>
  //       </Card>
  //     </div>
  //   )
  // }

  const orgAddress = contractAddressToHex(contractAddresses?.[0]);
  const vaultAddress = contractAddressToHex(contractAddresses?.[1]);
  const {
    data: vaultBalance, error: vaultBalanceError
  } = useReadContract({
    abi: VAULTABI,
    address: vaultAddress,
    functionName: "get_balance",
    args: []
  })

  vaultBalance && console.log(Number(BigInt(vaultBalance)))

  const {
    data: members, error: CoreAbiError
  } = useReadContract({
    abi: COREABI,
    address: orgAddress!,
    functionName: "get_members",
    args: []
  })

  console.log((members as Array<any>)?.length);

  const {
    data: disbursementSchedule, error: disbursementScheduleError
  } = useReadContract({
    abi: COREABI,
    address: orgAddress,
    functionName: "get_current_schedule",
    args: []
  })

  console.log(disbursementSchedule)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="text-sm text-muted-foreground">
          <p>Vault: {vaultAddress?.slice(0, 10)}...</p>
          <p>Org: {orgAddress?.slice(0, 10)}...</p>
        </div>
      </div>

      <DashboardTopCards vaultBalance={vaultBalance as number} activeMembers={members?.length as number}/>

      <Card>
        <CardHeader>
          <CardTitle>Recent Disbursements</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Recipients</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentDisbursements.map((disbursement) => (
                <TableRow key={disbursement.id}>
                  <TableCell>{disbursement.date}</TableCell>
                  <TableCell>{disbursement.amount}</TableCell>
                  <TableCell>{disbursement.recipients}</TableCell>
                  <TableCell>
                    <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                      {disbursement.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
