"use client"

import type React from "react"

import { useMemo, useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { useAccount, useContract, useReadContract, useSendTransaction } from "@starknet-react/core"
import { FACTORYABI } from "@/lib/abi/factory-abi"
import { LITTLEFINGER_FACTORY_ADDRESS, STARKGATE_STRK_ADDRESS } from "@/lib/constants"
import { VAULTABI } from "@/lib/abi/vault-abi"
import { contractAddressToHex, getUint256FromDecimal } from "@/lib/utils"
import { toast } from "@/hooks/use-toast"
import { ERC20ABI } from "@/lib/abi/token-abi"

interface DepositModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function DepositModal({ open, onOpenChange }: DepositModalProps) {
  const [amount, setAmount] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { address: user } = useAccount()

  const { data: ContractAddresses } = useReadContract(
    user
      ? {
          abi: FACTORYABI,
          address: LITTLEFINGER_FACTORY_ADDRESS,
          functionName: "get_vault_org_pair",
          args: [user],
          watch: true,
        }
      : ({} as any),
  )

  const { contract: VaultContract } = useContract(
    {
        abi: VAULTABI,
        address: contractAddressToHex(ContractAddresses?.[1]),
    }
  )

  const { contract: ERC20Contract } = useContract({
    abi: ERC20ABI,
    address: STARKGATE_STRK_ADDRESS,
  })

  const VaultCalls = useMemo(() => {
    const isValid = amount !== "" && !Number.isNaN(amount)

    if (!isValid || !VaultContract) return

    const amountInU256 = getUint256FromDecimal(amount);

    return VaultContract.populate("deposit_funds", [amountInU256, user!])
  }, [amount, user])

  const erc20Calls = useMemo(() => {
    const isValid = amount !== "" && !Number.isNaN(amount)
    if (!ERC20Contract || !isValid) return

    const amountInU256 = getUint256FromDecimal(amount);

    return ERC20Contract.populate("approve", [contractAddressToHex(ContractAddresses?.[1]), amountInU256])
  }, [amount, user])

  const {
    sendAsync, isPending
  } = useSendTransaction(
    erc20Calls && VaultCalls ? {
    calls: [
      erc20Calls!,
      VaultCalls!
    ]
  }: ({} as any))

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    // Only allow numbers and decimal point
    if (value === "" || /^\d*\.?\d*$/.test(value)) {
      setAmount(value)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
        console.log(erc20Calls, VaultCalls);
        await sendAsync();
        handleClose();
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

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Deposit Funds</DialogTitle>
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
                className="pr-16"
                required
                disabled={isSubmitting}
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">STRK</span>
            </div>
            <p className="text-xs text-muted-foreground">Enter the amount you want to deposit to the vault</p>
          </div>

          {amount && Number.parseFloat(amount) > 0 && (
            <div className="rounded-lg bg-blue-50 p-3">
              <div className="flex justify-between text-sm">
                <span>Deposit Amount:</span>
                <span className="font-medium">{amount} STRK</span>
              </div>
              {/* <div className="flex justify-between text-sm text-muted-foreground">
                <span>Gas Fee:</span>
                <span>~0.001 STRK</span>
              </div> */}
              <hr className="my-2" />
              <div className="flex justify-between text-sm font-medium">
                <span>Total:</span>
                <span>~{(Number.parseFloat(amount) + 0.001).toFixed(3)} STRK</span>
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
              disabled={!amount || Number.parseFloat(amount) <= 0 || isSubmitting}
            >
              {isSubmitting ? "Processing..." : "Deposit Funds"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
