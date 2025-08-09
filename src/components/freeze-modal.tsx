'use client';

import type React from 'react';
import { useMemo, useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { AlertTriangle, Shield } from 'lucide-react';
import { useAccount, useContract, useReadContract, useSendTransaction } from '@starknet-react/core';
import { FACTORYABI } from '@/lib/abi/factory-abi';
import { LITTLEFINGER_FACTORY_ADDRESS } from '@/lib/constants';
import { VAULTABI } from '@/lib/abi/vault-abi';
import { contractAddressToHex } from '@/lib/utils';

interface FreezeModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    vaultStatus: string;
}

export function FreezeModal({ open, onOpenChange, vaultStatus }: FreezeModalProps) {
    const [reason, setReason] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { address: user } = useAccount();
    const { toast } = useToast();

    const isVaultActive = vaultStatus === 'VAULTRESUMED';

    const { data: ContractAddresses } = useReadContract(
        user
            ? {
                  abi: FACTORYABI,
                  address: LITTLEFINGER_FACTORY_ADDRESS,
                  functionName: 'get_vault_org_pair',
                  args: [user!],
                  watch: true,
              }
            : ({} as any)
    );

    const { contract } = useContract({
        abi: VAULTABI,
        address: contractAddressToHex(ContractAddresses?.[1]),
    });

    const freezeCalls = useMemo(() => {
        if (!contract) return;
        return [contract.populate('emergency_freeze', [])];
    }, [contract]);

    const unfreezeCalls = useMemo(() => {
        if (!contract) return;
        return [contract.populate('unfreeze_vault', [])];
    }, [contract]);

    const { sendAsync: FreezeAsync } = useSendTransaction({ calls: freezeCalls });
    const { sendAsync: unFreezeAsync } = useSendTransaction({ calls: unfreezeCalls });

    const handleReasonChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setReason(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!reason.trim()) {
            toast({
                title: 'Reason Required',
                description: 'Please provide a reason before proceeding.',
                variant: 'destructive',
            });
            return;
        }

        if (!contract) {
            toast({
                title: 'Contract Not Found',
                description: 'Unable to connect to vault contract.',
                variant: 'destructive',
            });
            return;
        }

        setIsSubmitting(true);
        try {
            if (isVaultActive) {
                console.log('Emergency freezing vault:', { reason });
                await FreezeAsync();
            } else {
                console.log('Unfreezing vault:', { reason });
                await unFreezeAsync();
            }

            toast({
                title: isVaultActive ? 'Emergency Freeze Initiated' : 'Vault Unfrozen',
                description: isVaultActive
                    ? 'Vault has been frozen. All transactions are now suspended.'
                    : 'Vault operations have resumed.',
            });

            setReason('');
            onOpenChange(false);
        } catch (error) {
            console.error('Transaction error:', error);
            toast({
                title: 'Transaction Failed',
                description: 'There was an error. Please try again.',
                variant: 'destructive',
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleClose = () => {
        if (!isSubmitting) {
            setReason('');
            onOpenChange(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle
                        className={`flex items-center gap-2 ${
                            isVaultActive ? 'text-red-600' : 'text-green-600'
                        }`}
                    >
                        <Shield className="h-5 w-5" />
                        {isVaultActive ? 'Emergency Freeze Vault' : 'Unfreeze Vault'}
                    </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div
                        className={`rounded-lg p-4 border ${
                            isVaultActive
                                ? 'bg-red-50 border-red-200'
                                : 'bg-green-50 border-green-200'
                        }`}
                    >
                        <div className="flex items-start gap-3">
                            <AlertTriangle
                                className={`h-5 w-5 mt-0.5 ${
                                    isVaultActive ? 'text-red-600' : 'text-green-600'
                                }`}
                            />
                            <div
                                className={`text-sm ${
                                    isVaultActive ? 'text-red-800' : 'text-green-800'
                                }`}
                            >
                                <p className="font-medium mb-2">
                                    {isVaultActive
                                        ? 'Critical Action Warning'
                                        : 'Resume Vault Operations'}
                                </p>
                                <ul className="space-y-1 text-xs">
                                    {isVaultActive ? (
                                        <>
                                            <li>
                                                • This will immediately freeze all vault operations
                                            </li>
                                            <li>
                                                • No deposits, withdrawals, or payments will be
                                                possible
                                            </li>
                                            <li>
                                                • Only authorized administrators can unfreeze the
                                                vault
                                            </li>
                                            <li>
                                                • This action should only be used in emergency
                                                situations
                                            </li>
                                        </>
                                    ) : (
                                        <>
                                            <li>
                                                • Vault operations will resume after this action
                                            </li>
                                            <li>
                                                • Deposits, withdrawals, and payments will be
                                                re-enabled
                                            </li>
                                            <li>• Ensure the vault is safe before unfreezing</li>
                                        </>
                                    )}
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="reason">
                            {isVaultActive
                                ? 'Reason for Emergency Freeze*'
                                : 'Reason for Unfreezing*'}
                        </Label>
                        <Textarea
                            id="reason"
                            name="reason"
                            value={reason}
                            onChange={handleReasonChange}
                            placeholder={
                                isVaultActive
                                    ? 'Describe the emergency situation requiring vault freeze...'
                                    : 'Explain why the vault can now be safely resumed...'
                            }
                            rows={4}
                            required
                            disabled={isSubmitting}
                            className="resize-none"
                        />
                        <p className="text-xs text-muted-foreground">
                            This reason will be logged and visible to all administrators
                        </p>
                    </div>

                    <div className="rounded-lg p-3 border">
                        <div className="text-sm">
                            <p className="font-medium mb-1">
                                {isVaultActive ? 'After freezing:' : 'After unfreezing:'}
                            </p>
                            <p className="text-muted-foreground text-xs">
                                {isVaultActive
                                    ? 'Contact your system administrator or use the admin panel to unfreeze the vault when the emergency is resolved.'
                                    : 'Vault functions will return to normal. Monitor activity as needed.'}
                            </p>
                        </div>
                    </div>

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
                            variant={isVaultActive ? 'destructive' : 'default'}
                            disabled={!reason.trim() || isSubmitting}
                            className={
                                isVaultActive
                                    ? 'bg-red-600 hover:bg-red-700'
                                    : 'bg-green-600 hover:bg-green-700'
                            }
                        >
                            {isSubmitting
                                ? isVaultActive
                                    ? 'Freezing...'
                                    : 'Unfreezing...'
                                : isVaultActive
                                  ? 'Emergency Freeze'
                                  : 'Unfreeze Vault'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
