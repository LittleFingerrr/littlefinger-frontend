"use client";

import type React from "react";

import { useMemo, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  useAccount,
  useContract,
  useReadContract,
  useSendTransaction,
} from "@starknet-react/core";
import { FACTORYABI } from "@/lib/abi/factory-abi";
import { LITTLEFINGER_FACTORY_ADDRESS } from "@/lib/constants";
import { VAULTABI } from "@/lib/abi/vault-abi";
import { contractAddressToHex } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

interface DepositModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DepositModal({ open, onOpenChange }: DepositModalProps) {
  const [amount, setAmount] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { address: user } = useAccount();

  const { data: ContractAddresses } = useReadContract(
    user
      ? {
          abi: FACTORYABI,
          address: LITTLEFINGER_FACTORY_ADDRESS,
          functionName: "get_vault_org_pair",
          args: [user],
          watch: true,
        }
      : ({} as any)
  );

  const { contract } = useContract({
    abi: VAULTABI,
    address: contractAddressToHex(ContractAddresses?.[1]),
  });

  const calls = useMemo(() => {
    const isValid = amount !== "" && !Number.isNaN(amount);

    if (!isValid || !contract || !user) return;

    return [contract?.populate("deposit_funds", [Number(amount), user])];
  }, [amount, user, contract]);

  const { sendAsync, isPending } = useSendTransaction({ calls });

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Only allow numbers and decimal point
    if (value === "" || /^\d*\.?\d*$/.test(value)) {
      setAmount(value);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      console.log(calls);
      await sendAsync();
    } catch (err) {
      console.error(err);
    }
    // if (!amount || Number.parseFloat(amount) <= 0) {
    //   toast({
    //     title: "Invalid Amount",
    //     description: "Please enter a valid amount greater than 0",
    //     variant: "destructive",
    //   })
    //   return
    // }

    // if (!contract) {
    //   toast({
    //     title: "Contract Not Found",
    //     description: "Unable to connect to vault contract",
    //     variant: "destructive",
    //   })
    //   return
    // }

    // setIsSubmitting(true)
    // try {
    //   // Convert amount to the appropriate format for the contract
    //   // Assuming the contract expects the amount in wei or similar format
    //   const amountInWei = (Number.parseFloat(amount) * 1e18).toString()

    //   // Call the deposit function on the contract
    //   const call = {
    //     contractAddress: contract.address,
    //     entrypoint: "deposit",
    //     calldata: [amountInWei],
    //   }

    //   // Execute the transaction
    //   // Note: You'll need to implement the actual transaction execution
    //   // This is a placeholder for the actual contract call
    //   console.log("Depositing:", { amount, amountInWei, call })

    //   toast({
    //     title: "Deposit Initiated",
    //     description: `Depositing ${amount} tokens to vault`,
    //   })

    //   // Reset form and close modal
    //   setAmount("")
    //   onOpenChange(false)
    // } catch (error) {
    //   console.error("Error depositing funds:", error)
    //   toast({
    //     title: "Deposit Failed",
    //     description: "There was an error processing your deposit. Please try again.",
    //     variant: "destructive",
    //   })
    // } finally {
    //   setIsSubmitting(false)
    // }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      setAmount("");
      onOpenChange(false);
    }
  };

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
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                ETH
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              Enter the amount you want to deposit to the vault
            </p>
          </div>

          {amount && Number.parseFloat(amount) > 0 && (
            <div className="rounded-lg bg-blue-50 p-3">
              <div className="flex justify-between text-sm">
                <span>Deposit Amount:</span>
                <span className="font-medium">{amount} ETH</span>
              </div>
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Gas Fee:</span>
                <span>~0.001 ETH</span>
              </div>
              <hr className="my-2" />
              <div className="flex justify-between text-sm font-medium">
                <span>Total:</span>
                <span>
                  ~{(Number.parseFloat(amount) + 0.001).toFixed(3)} ETH
                </span>
              </div>
            </div>
          )}

          <DialogFooter className="mt-6">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700"
              disabled={
                !amount || Number.parseFloat(amount) <= 0 || isSubmitting
              }
            >
              {isSubmitting ? "Processing..." : "Deposit Funds"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
