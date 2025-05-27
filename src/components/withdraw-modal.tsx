"use client"

import type React from "react"

import { useMemo, useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { useAccount, useContract, useReadContract, useSendTransaction } from "@starknet-react/core"
import { FACTORYABI } from "@/lib/abi/factory-abi"
import { LITTLEFINGER_FACTORY_ADDRESS } from "@/lib/constants"
import { VAULTABI } from "@/lib/abi/vault-abi"
import { contractAddressToHex } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"
import { AlertTriangle } from "lucide-react"

interface WithdrawModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function WithdrawModal({ open, onOpenChange }: WithdrawModalProps) {
  const [amount, setAmount] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { address: user } = useAccount()
  const { toast } = useToast()

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

  const { data: contractVaultBalance } = useReadContract(
    user
      ? {
          abi: VAULTABI,
          address: contractAddressToHex(ContractAddresses?.[1]),
          functionName: "get_balance",
          args: [],
          watch: true,
        }
      : ({} as any),
  )

  const { contract } = useContract(
    {
        abi: VAULTABI,
        address: contractAddressToHex(ContractAddresses?.[1]),
    }
  )

  const calls = useMemo(() => {
    const isValid = amount !== "" && !Number.isNaN(amount);

    if (!isValid || !contract) return

    return [
        contract.populate("withdraw_funds", [Number(amount)])
    ]
  }, [amount, user])

  const { sendAsync } = useSendTransaction({ calls })

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    // Only allow numbers and decimal point
    if (value === "" || /^\d*\.?\d*$/.test(value)) {
      setAmount(value)
    }
  }

  const formatBalance = (balance: any) => {
    if (!balance) return 0
    return Number(balance) / 1e18
  }

  const availableBalance = Number(contractVaultBalance)
  const withdrawAmount = Number.parseFloat(amount) || 0
  const isInsufficientFunds = withdrawAmount > availableBalance

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!amount || Number.parseFloat(amount) <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid amount greater than 0",
        variant: "destructive",
      })
      return
    }

    if (isInsufficientFunds) {
      toast({
        title: "Insufficient Funds",
        description: "Withdrawal amount exceeds available balance",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)
    try {
      // Convert amount to the appropriate format for the contract
      const amountInWei = (Number.parseFloat(amount) * 1e18).toString()

      // Call the withdraw function on the contract

      // Execute the transaction
      console.log("Withdrawing:", { amount, amountInWei })

      await sendAsync();
      toast({
        title: "Withdrawal Initiated",
        description: `Withdrawing ${amount} ETH from vault`,
      })
      // Reset form and close modal
      setAmount("")
      onOpenChange(false)
    } catch (error) {
      console.error("Error withdrawing funds:", error)
      toast({
        title: "Withdrawal Failed",
        description: "There was an error processing your withdrawal. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    if (!isSubmitting) {
      setAmount("")
      onOpenChange(false)
    }
  }

  const handleMaxClick = () => {
    setAmount(availableBalance.toString())
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Withdraw Funds</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="amount">Amount*</Label>
            <div className="relative">
              <Input
                id="amount"
                name="amount"
                type="text"
                value={amount}
                onChange={handleAmountChange}
                placeholder="0.00"
                className="pr-20"
                required
                disabled={isSubmitting}
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="h-6 px-2 text-xs"
                  onClick={handleMaxClick}
                  disabled={isSubmitting}
                >
                  MAX
                </Button>
                <span className="text-sm text-muted-foreground">ETH</span>
              </div>
            </div>
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Available balance: {availableBalance.toFixed(4)} ETH</span>
              {isInsufficientFunds && (
                <span className="text-red-500 flex items-center gap-1">
                  <AlertTriangle className="h-3 w-3" />
                  Insufficient funds
                </span>
              )}
            </div>
          </div>

          {amount && Number.parseFloat(amount) > 0 && (
            <div className="rounded-lg bg-orange-50 p-3 border border-orange-200">
              <div className="flex justify-between text-sm">
                <span>Withdrawal Amount:</span>
                <span className="font-medium">{amount} ETH</span>
              </div>
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Gas Fee:</span>
                <span>~0.001 ETH</span>
              </div>
              <hr className="my-2" />
              <div className="flex justify-between text-sm font-medium">
                <span>You will receive:</span>
                <span>~{(Number.parseFloat(amount) - 0.001).toFixed(3)} ETH</span>
              </div>
            </div>
          )}

          <div className="rounded-lg bg-yellow-50 p-3 border border-yellow-200">
            <div className="flex items-start gap-2">
              <AlertTriangle className="h-4 w-4 text-yellow-600 mt-0.5" />
              <div className="text-sm text-yellow-800">
                <p className="font-medium">Important Notice</p>
                <p>Withdrawals are irreversible. Please ensure the amount is correct before proceeding.</p>
              </div>
            </div>
          </div>

          <DialogFooter className="mt-6">
            <Button type="button" variant="outline" onClick={handleClose} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button
              type="submit"
              variant="destructive"
              disabled={!amount || Number.parseFloat(amount) <= 0 || isInsufficientFunds || isSubmitting}
            >
              {isSubmitting ? "Processing..." : "Withdraw Funds"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
