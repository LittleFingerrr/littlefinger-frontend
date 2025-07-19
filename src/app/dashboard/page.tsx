"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DashboardTopCards } from "@/components/dashboardTopCards"
import { useAccount, useConnect, useReadContract } from "@starknet-react/core"
import { VAULTABI } from "@/lib/abi/vault-abi"
import { FACTORYABI } from "@/lib/abi/factory-abi"
import { LITTLEFINGER_FACTORY_ADDRESS } from "@/lib/constants"
import { contractAddressToHex, felt252ToString, shortenAddress } from "@/lib/utils"
import { COREABI } from "@/lib/abi/core-abi"
import { CopyIcon } from "lucide-react"
import CopyButton from "@/components/copy-button"

export default function Dashboard() {
  const { address: user } = useAccount()
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
      args: [user!],
      // enabled: !!address && isConnected,
    })
    
  const recentDisbursements = [
    { id: 1, date: "May 15, 2024", amount: "$18,700.00", recipients: 38, status: "Completed" },
    { id: 2, date: "Apr 15, 2024", amount: "$18,700.00", recipients: 38, status: "Completed" },
    { id: 3, date: "Mar 15, 2024", amount: "$17,500.00", recipients: 35, status: "Completed" },
  ]

  const orgAddress = contractAddressToHex(contractAddresses?.[0]);
  const vaultAddress = contractAddressToHex(contractAddresses?.[1]);
  const {
    data: vaultBalance, error: vaultBalanceError
  } = useReadContract(
    user ? {
    abi: VAULTABI,
    address: vaultAddress,
    functionName: "get_balance",
    args: []
  } : ({} as any))

  vaultBalance && console.log(Number(vaultBalance))

  const {
    data: members, error: CoreAbiError
  } = useReadContract(
    user ? {
    abi: COREABI,
    address: orgAddress!,
    functionName: "get_members",
    args: []
  } : ({} as any))

  // console.log((members as Array<any>)?.length);

  const {
    data: disbursementSchedule, error: disbursementScheduleError
  } = useReadContract(
    user ? {
    abi: COREABI,
    address: orgAddress,
    functionName: "get_current_schedule",
    args: []
  } : {} as any)

  const lastExecution = disbursementSchedule?.last_execution;
  const interval = disbursementSchedule?.interval;
  const nextPayoutDate = (Number(interval)) / 86400;
  console.log(nextPayoutDate)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="text-sm text-muted-foreground flex flex-col gap-3">
          <p className="flex items-center gap-3 justify-normal">
            Vault Address: {shortenAddress(vaultAddress)}
            <CopyButton copyText={vaultAddress} className="text-xs"/>
          </p>
          <p className="flex items-center gap-3 justify-normal">
            Org Address: {shortenAddress(orgAddress)}
            <CopyButton copyText={orgAddress} className="" />
          </p>
        </div>
      </div>

      <DashboardTopCards vaultBalance={(Number?.(vaultBalance) / 10 ** 18).toFixed(3)} activeMembers={Number(members?.length.toString())} nextPayoutDate={`${nextPayoutDate.toString()} Days`}/>

      {/* History */}
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
              {[].length > 0 ? [].map((_, index) => (
                <TableRow key={index}>
                  {/* <TableCell>{disbursement.date}</TableCell>
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
                  </TableCell> */}
                </TableRow>
              )) : 
                <div className="text-center mt-6 font-semibold uppercase">
                  No recent disbursements
                </div>
              }
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
