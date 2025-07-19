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
import { contractAddressToHex, felt252ToString, getUint256FromDecimal } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"
import { TrendingUp, User, DollarSign } from "lucide-react"
import { COREABI } from "@/lib/abi/core-abi"

interface RaisePayModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  member: any,
  id: any
}

export function RaisePayModal({ open, onOpenChange, member, id }: RaisePayModalProps) {
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

  const { data: memberBasePay } = useReadContract(
    user 
    ? {
      abi: COREABI,
      address: contractAddressToHex(ContractAddresses?.[0]),
      functionName: "get_member_base_pay",
      args: [id],
    } : ({} as any)
  );
  // console.log(memberBasePay)


  const { contract } = useContract(
    {
        abi: COREABI,
        address: contractAddressToHex(ContractAddresses?.[0]),
    }
  )

    const calls = useMemo(() => {
        const isValid = amount !== "" && !Number.isNaN(amount);

        if (!contract || !isValid) return

        const id = Number(member?.id)

        const amountInU256 = getUint256FromDecimal(amount);

        return [
            contract.populate("update_member_base_pay", [id, amountInU256])
        ]
    }, [amount, user, contract])

    const { sendAsync } = useSendTransaction({ calls })    

  // Get member details
  const memberName = member ? `${felt252ToString(member?.firstName)} ${felt252ToString(member?.lastName)}` : ""
  const memberAlias = member ? felt252ToString(member?.alias) : ""
  const memberRole = member?.returnedRole || ""
//   const currentBasePay = member?.basePay || 0 // Assuming basePay is available in member data

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    // Only allow numbers and decimal point
    if (value === "" || /^\d*\.?\d*$/.test(value)) {
      setAmount(value)
    }
  }

  const handlePay = async () => {
    try {
        await sendAsync();
    } catch (err) {
        console.error(err)
    }
  }

  const handleClose = () => {
    if (!isSubmitting) {
      setAmount("")
      onOpenChange(false)
    }
  }

//   if (!member) return null

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
              Current Base Pay: {Number(memberBasePay) || ""}
              {/* <span className="font-medium">{Number.parseFloat(currentBasePay.toString()).toFixed(4)} ETH</span> */}
            </span>
          </div>
        </div>

        <form className="space-y-4" onSubmit={handlePay}>
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
                {/* <div className="flex justify-between">
                  <span className="text-green-700">Current Base Pay:</span>
                  <span className="font-medium">{Number.parseFloat(currentBasePay.toString()).toFixed(4)} STRK</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-green-700">Increase Amount:</span>
                  <span className="font-medium text-green-600">+{Number.parseFloat(amount).toFixed(4)} STRK</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-green-700">Percentage Increase:</span>
                  <span className="font-medium text-green-600">+{percentageIncrease.toFixed(2)}%</span>
                </div> */}
                {/* <hr className="border-green-200" />
                <div className="flex justify-between font-medium">
                  <span className="text-green-800">New Base Pay:</span>
                  <span className="text-green-800">{newBasePay.toFixed(4)} ETH</span>
                </div> */}
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
            //   onClick={handlePay}
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
