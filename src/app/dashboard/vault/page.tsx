"use client"

import { useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CheckCircle2, DollarSign } from "lucide-react"
import { PayMemberModal } from "@/components/pay-member-modal"
import { DepositModal } from "@/components/deposit-modal"
import { WithdrawModal } from "@/components/withdraw-modal"
import { FreezeModal } from "@/components/freeze-modal"
import { useAccount, useContract, useReadContract, useSendTransaction } from "@starknet-react/core"
import { FACTORYABI } from "@/lib/abi/factory-abi"
import { LITTLEFINGER_FACTORY_ADDRESS, STARKGATE_STRK_ADDRESS } from "@/lib/constants"
import { VAULTABI } from "@/lib/abi/vault-abi"
import { contractAddressToHex } from "@/lib/utils"
import { COREABI } from "@/lib/abi/core-abi"
import { CairoCustomEnum } from "starknet"
import { ERC20ABI } from "@/lib/abi/token-abi"

export default function VaultPage() {
  const [isPayMemberOpen, setIsPayMemberOpen] = useState(false)
  const [isDepositOpen, setIsDepositOpen] = useState(false)
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false)
  const [isFreezeOpen, setIsFreezeOpen] = useState(false)
  const [isPaying, setIsPaying] = useState(false);

  const { address: user } = useAccount()

  const { data: ContractAddresses } = useReadContract(
    user
      ? {
          abi: FACTORYABI,
          address: LITTLEFINGER_FACTORY_ADDRESS,
          functionName: "get_vault_org_pair",
          args: [user!],
          watch: true,
        }
      : ({} as any),
  )

  const { data: contractVaultBalance, isLoading: vaultBalanceIsLoading } = useReadContract(
    user
      ? {
          abi: ERC20ABI,
          address: STARKGATE_STRK_ADDRESS,
          functionName: "balance_of",
          args: [contractAddressToHex(ContractAddresses?.[1])],
          watch: true,
        }
      : ({} as any),
  )

  const { data: contractVaultStatus, isLoading: vaultStatusIsLoading } = useReadContract(
    user?
        {
          abi: VAULTABI,
          address: contractAddressToHex(ContractAddresses?.[1]),
          functionName: "get_vault_status",
          args: [],
          watch: true,
        }
    : ({} as any)
  )
  // @ts-expect-error CairoEnum Problem
  const pseudoVaultStatus: CairoCustomEnum = contractVaultStatus;
  const finalStatus = pseudoVaultStatus?.activeVariant();
  console.log(finalStatus)

  const { contract } = useContract({
    abi: COREABI,
    address: contractAddressToHex(ContractAddresses?.[0]),
  })

  const paymentCall = useMemo(() => {
    if (!contract || !user) return

    return [
      contract.populate("schedule_payout", [])
    ]
  }, [contract, user])

  const { sendAsync: sendPayment } = useSendTransaction({ calls: paymentCall })

  const handlePayment = async () => {
    setIsPaying(true);

    try {
      console.log("Sending Payment");
      await sendPayment();
    } catch(err) {
      console.log(err)
    } finally {
      setIsPaying(false);
    }
  }

  // Mock data for vault
  const vaultStatus = "Active & Operational"

  const transactions = [
    { id: 1, type: "Deposit", amount: "+$50,000.00", status: "Success", date: "May 15, 2024" },
    { id: 2, type: "Withdrawal", amount: "-$10,000.00", status: "Success", date: "May 10, 2024" },
    { id: 3, type: "Payout", amount: "-$18,700.00", status: "Success", date: "Apr 15, 2024" },
  ]

  // Format the contract balance for display
  const formatBalance = (balance: any) => {
    if (!balance) return "0.00"
    // Convert from wei to ETH (assuming 18 decimals)
    const balanceInEth = Number(balance) / 1e18
    return balanceInEth.toFixed(4)
  }

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
              <div className="flex flex-col">
                <span className="text-3xl font-bold">
                  {vaultBalanceIsLoading ? "Loading..." : `${formatBalance(contractVaultBalance)} STRK`}
                </span>
                {contractVaultBalance && (
                  <span className="text-sm text-muted-foreground">Raw: {Number(contractVaultBalance).toString()}</span>
                )}
              </div>
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
        <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => setIsDepositOpen(true)}>
          Deposit Funds
        </Button>
        <Button variant="outline" onClick={() => setIsWithdrawOpen(true)}>
          Withdraw Funds
        </Button>
        <Button
          variant="outline"
          className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700"
          onClick={() => setIsFreezeOpen(true)}
        >
          {finalStatus == "VAULTRESUMED" ? "Emergency Freeze" : "Unfreeze"}
        </Button>
        <Button variant="outline" onClick={handlePayment} disabled={isPaying}>
          Payout
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

      {/* All Modals */}
      {/* <PayMemberModal open={isPayMemberOpen} onOpenChange={setIsPayMemberOpen} /> */}
      <DepositModal open={isDepositOpen} onOpenChange={setIsDepositOpen} />
      <WithdrawModal open={isWithdrawOpen} onOpenChange={setIsWithdrawOpen} />
      <FreezeModal open={isFreezeOpen} onOpenChange={setIsFreezeOpen} vaultStatus={finalStatus}/>
    </div>
  )
}
