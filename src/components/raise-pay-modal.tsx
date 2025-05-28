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
import { contractAddressToHex, felt252ToString } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"
import { TrendingUp, User, DollarSign } from "lucide-react"
import { COREABI } from "@/lib/abi/core-abi"

interface RaisePayModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  member: any
}

export function RaisePayModal({ open, onOpenChange, member }: RaisePayModalProps) {
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

  const { contract } = useContract(
    {
        abi: COREABI,
        address: contractAddressToHex(ContractAddresses?.[0]),
    }
  )

    const updatePayCalls = useMemo(() => {
        const isValid = amount !== "" && !Number.isNaN(amount)

        if (!isValid || !contract || !user) return

        return [
            contract.populate("update_member_base_pay", [member?.id, Number(amount)])
        ]
    }, [contract, user])

    const { sendAsync: updatePay } = useSendTransaction({ calls: updatePayCalls })    

  // Get member details
  const memberName = member ? `${felt252ToString(member?.firstName)} ${felt252ToString(member?.lastName)}` : ""
  const memberAlias = member ? felt252ToString(member?.alias) : ""
  const memberRole = member?.returnedRole || ""
  const currentBasePay = member?.basePay || 0 // Assuming basePay is available in member data

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    // Only allow numbers and decimal point
    if (value === "" || /^\d*\.?\d*$/.test(value)) {
      setAmount(value)
    }
  }

  // Calculate new base pay
  const newBasePay = Number.parseFloat(currentBasePay.toString()) + (Number.parseFloat(amount) || 0)
  const percentageIncrease =
    currentBasePay > 0 ? ((Number.parseFloat(amount) || 0) / Number.parseFloat(currentBasePay.toString())) * 100 : 0

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

    if (!contract) {
      toast({
        title: "Contract Not Found",
        description: "Unable to connect to organization contract",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)
    try {
      // Convert new pay to the appropriate format for the contract
      await updatePay();

      // Call the update member base pay function on the contract

      // Execute the transaction
      console.log("Updating member base pay:", {
        memberId: member?.id,
        memberName,
        currentPay: currentBasePay,
        newPay: newBasePay,
        increase: amount,
        // call,
      })

      toast({
        title: "Pay Raise Initiated",
        description: `Updating ${memberName}'s base pay to ${newBasePay.toFixed(4)} ETH`,
      })

      // Reset form and close modal
      setAmount("")
      onOpenChange(false)
    } catch (error) {
      console.error("Error updating member base pay:", error)
      toast({
        title: "Pay Update Failed",
        description: "There was an error updating the member's base pay. Please try again.",
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

  if (!member) return null

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-green-600" />
            Raise Pay
          </DialogTitle>
        </DialogHeader>

        {/* Member Info Section */}
        <div className="rounded-lg bg-blue-50 p-4 border border-blue-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="rounded-full bg-blue-100 p-2">
              <User className="h-4 w-4 text-blue-600" />
            </div>
            <div>
              <h3 className="font-medium text-blue-900">{memberName}</h3>
              <p className="text-sm text-blue-700">
                {memberAlias} • {memberRole}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <DollarSign className="h-4 w-4 text-blue-600" />
            <span className="text-blue-800">
              Current Base Pay:{" "}
              <span className="font-medium">{Number.parseFloat(currentBasePay.toString()).toFixed(4)} ETH</span>
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="amount">Increase Amount (ETH)*</Label>
            <div className="relative">
              <Input
                id="amount"
                name="amount"
                type="text"
                value={amount}
                onChange={handleAmountChange}
                placeholder="0.1"
                className="pr-12"
                required
                disabled={isSubmitting}
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">ETH</span>
            </div>
          </div>

          {/* Pay Calculation Summary */}
          {amount && Number.parseFloat(amount) > 0 && (
            <div className="rounded-lg bg-green-50 p-4 border border-green-200">
              <h4 className="font-medium text-green-900 mb-2">Pay Adjustment Summary</h4>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-green-700">Current Base Pay:</span>
                  <span className="font-medium">{Number.parseFloat(currentBasePay.toString()).toFixed(4)} ETH</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-green-700">Increase Amount:</span>
                  <span className="font-medium text-green-600">+{Number.parseFloat(amount).toFixed(4)} ETH</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-green-700">Percentage Increase:</span>
                  <span className="font-medium text-green-600">+{percentageIncrease.toFixed(2)}%</span>
                </div>
                <hr className="border-green-200" />
                <div className="flex justify-between font-medium">
                  <span className="text-green-800">New Base Pay:</span>
                  <span className="text-green-800">{newBasePay.toFixed(4)} ETH</span>
                </div>
              </div>
            </div>
          )}

          <DialogFooter className="mt-6">
            <Button type="button" variant="outline" onClick={handleClose} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-green-600 hover:bg-green-700"
              disabled={!amount || Number.parseFloat(amount) <= 0 || isSubmitting}
            >
              {isSubmitting ? "Processing..." : "Confirm Pay Raise"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
