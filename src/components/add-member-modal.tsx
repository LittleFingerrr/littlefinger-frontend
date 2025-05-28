"use client"

import type React from "react"

import { useMemo, useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAccount, useContract, useReadContract, useSendTransaction } from "@starknet-react/core"
import { FACTORYABI } from "@/lib/abi/factory-abi"
import { LITTLEFINGER_FACTORY_ADDRESS } from "@/lib/constants"
import { contractAddressToHex } from "@/lib/utils"
import { COREABI } from "@/lib/abi/core-abi"
import { CairoCustomEnum } from "starknet"

interface AddMemberModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AddMemberModal({ open, onOpenChange }: AddMemberModalProps) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    alias: "",
    role: "",
    walletAddress: ""
  })

  const { address: user } = useAccount()

  const {data: contractAddresses} = useReadContract({
    abi: FACTORYABI,
    address: LITTLEFINGER_FACTORY_ADDRESS,
    functionName: "get_vault_org_pair",
    args: [user!]
  })

  const orgAddress = contractAddressToHex(contractAddresses?.[0])

  const { contract } = useContract({
    abi: COREABI,
    address: orgAddress,
  })

  const calls = useMemo(() => {
    const inputIsValid = formData.firstName !== "" && formData.lastName !== "" && formData.alias !== "" && formData.role !== "" && formData.walletAddress !== "" && user
    if (!inputIsValid || !contract || !user) return

    const roleValue = 1
    const roleEnum = new CairoCustomEnum({EMPLOYEE: roleValue})

    return [
      contract.populate("add_member", [
        formData.firstName, formData.lastName, formData.alias, roleEnum, formData.walletAddress
      ])
    ]

  }, [formData.firstName, formData.lastName, formData.alias, formData.role, user, formData.walletAddress])

  const {
    sendAsync, data, error, isPending, isError
  } = useSendTransaction({
    calls
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleRoleChange = (value: string) => {
    setFormData((prev) => ({ ...prev, role: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!calls) return
    console.log("Adding member:", formData)
    
    try {
      console.log("Hit the ground running");
      await sendAsync();
      onOpenChange(false)
      console.log("Done, baby!")
    } catch(err) {
      console.error("An error occured: ", err)
    }
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Member</DialogTitle>
        </DialogHeader>
        <form className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name*</Label>
            <Input id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name*</Label>
            <Input id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="alias">Alias/Username*</Label>
            <Input id="alias" name="alias" value={formData.alias} onChange={handleChange} required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="walletAddress">WalletAddress*</Label>
            <Input id="walletAddress" name="walletAddress" value={formData.walletAddress} onChange={handleChange} required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="role">Role*</Label>
            <Select onValueChange={handleRoleChange} required>
              <SelectTrigger>
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="member">Member</SelectItem>
                <SelectItem value="contributor">Contributor</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <DialogFooter className="mt-6">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" onClick={handleSubmit} className="bg-blue-600 hover:bg-blue-700">
              Add Member
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
