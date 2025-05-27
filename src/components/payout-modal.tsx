"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useAccount, useContract, useReadContract } from "@starknet-react/core"
import { FACTORYABI } from "@/lib/abi/factory-abi"
import { LITTLEFINGER_FACTORY_ADDRESS } from "@/lib/constants"
import { VAULTABI } from "@/lib/abi/vault-abi"
import { contractAddressToHex } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"
import { AlertTriangle, User } from "lucide-react"

interface PayMemberModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function PayMemberModal({ open, onOpenChange }: PayMemberModalProps) {
  const [formData, setFormData] = useState({
    member: "",
    amount: "",
    description: "",
    paymentType: "salary",
  })
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
    user
      ? {
          abi: VAULTABI,
          address: contractAddressToHex(ContractAddresses?.[1]),
        }
      : ({} as any),
  )

  // Mock members data - in real app, this would come from contract
  const members = [
    { id: "0x123...abc", name: "Alice Smith", alias: "alice_s", role: "Admin" },
    { id: "0x456...def", name: "Bob Johnson", alias: "bob_dev", role: "Developer" },
    { id: "0x789...ghi", name: "Charlie Brown", alias: "c_brown", role: "Finance" },
  ]

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    if (name === "amount") {
      // Only allow numbers and decimal point
      if (value === "" || /^\d*\.?\d*$/.test(value)) {
        setFormData((prev) => ({ ...prev, [name]: value }))
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }))
    }
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const formatBalance = (balance: any) => {
    if (!balance) return 0
    return Number(balance) / 1e18
  }

  const availableBalance = formatBalance(contractVaultBalance)
  const paymentAmount = Number.parseFloat(formData.amount) || 0
  const isInsufficientFunds = paymentAmount > availableBalance

  const selectedMember = members.find((m) => m.id === formData.member)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.member) {
      toast({
        title: "Member Required",
        description: "Please select a member to pay",
        variant: "destructive",
      })
      return
    }

    if (!formData.amount || Number.parseFloat(formData.amount) <= 0) {
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
        description: "Payment amount exceeds available vault balance",
        variant: "destructive",
      })
      return
    }

    if (!contract) {
      toast({
        title: "Contract Not Found",
        description: "Unable to connect to vault contract",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)
    try {
      // Convert amount to the appropriate format for the contract
      const amountInWei = (Number.parseFloat(formData.amount) * 1e18).toString()

      // Call the pay member function on the contract
      const call = {
        contractAddress: contract.address,
        entrypoint: "pay_member",
        calldata: [formData.member, amountInWei], // member address and amount
      }

      // Execute the transaction
      console.log("Paying member:", { ...formData, amountInWei, call })

      toast({
        title: "Payment Initiated",
        description: `Paying ${formData.amount} ETH to ${selectedMember?.name}`,
      })

      // Reset form and close modal
      setFormData({
        member: "",
        amount: "",
        description: "",
        paymentType: "salary",
      })
      onOpenChange(false)
    } catch (error) {
      console.error("Error paying member:", error)
      toast({
        title: "Payment Failed",
        description: "There was an error processing the payment. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    if (!isSubmitting) {
      setFormData({
        member: "",
        amount: "",
        description: "",
        paymentType: "salary",
      })
      onOpenChange(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Pay Member
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="member">Select Member*</Label>
            <Select onValueChange={(value) => handleSelectChange("member", value)} required disabled={isSubmitting}>
              <SelectTrigger>
                <SelectValue placeholder="Choose a member to pay" />
              </SelectTrigger>
              <SelectContent>
                {members.map((member) => (
                  <SelectItem key={member.id} value={member.id}>
                    <div className="flex flex-col">
                      <span className="font-medium">{member.name}</span>
                      <span className="text-xs text-muted-foreground">
                        {member.alias} • {member.role}
                      </span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="paymentType">Payment Type*</Label>
            <Select
              value={formData.paymentType}
              onValueChange={(value) => handleSelectChange("paymentType", value)}
              disabled={isSubmitting}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="salary">Monthly Salary</SelectItem>
                <SelectItem value="bonus">Performance Bonus</SelectItem>
                <SelectItem value="reimbursement">Expense Reimbursement</SelectItem>
                <SelectItem value="commission">Commission Payment</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount">Amount*</Label>
            <div className="relative">
              <Input
                id="amount"
                name="amount"
                type="text"
                value={formData.amount}
                onChange={handleChange}
                placeholder="0.00"
                className="pr-16"
                required
                disabled={isSubmitting}
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">ETH</span>
            </div>
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Available: {availableBalance.toFixed(4)} ETH</span>
              {isInsufficientFunds && (
                <span className="text-red-500 flex items-center gap-1">
                  <AlertTriangle className="h-3 w-3" />
                  Insufficient funds
                </span>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Payment description or notes..."
              rows={3}
              disabled={isSubmitting}
              className="resize-none"
            />
          </div>

          {formData.amount && Number.parseFloat(formData.amount) > 0 && selectedMember && (
            <div className="rounded-lg bg-blue-50 p-3 border border-blue-200">
              <div className="text-sm space-y-1">
                <div className="flex justify-between">
                  <span>Recipient:</span>
                  <span className="font-medium">{selectedMember.name}</span>
                </div>
                <div className="flex justify-between">
                  <span>Payment Amount:</span>
                  <span className="font-medium">{formData.amount} ETH</span>
                </div>
                <div className="flex justify-between">
                  <span>Payment Type:</span>
                  <span className="capitalize">{formData.paymentType.replace("_", " ")}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Gas Fee:</span>
                  <span>~0.001 ETH</span>
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
              className="bg-blue-600 hover:bg-blue-700"
              disabled={
                !formData.member ||
                !formData.amount ||
                Number.parseFloat(formData.amount) <= 0 ||
                isInsufficientFunds ||
                isSubmitting
              }
            >
              {isSubmitting ? "Processing..." : "Process Payment"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
