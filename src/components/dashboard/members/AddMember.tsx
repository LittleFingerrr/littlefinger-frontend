"use client"

import React, { useMemo, useState } from 'react';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Plus, Loader2 } from 'lucide-react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { useAccount, useContract, useReadContract, useSendTransaction } from '@starknet-react/core';
import { FACTORYABI } from '@/lib/abi/factory-abi';
import { LITTLEFINGER_FACTORY_ADDRESS } from '@/lib/constants';
import { contractAddressToHex } from '@/lib/utils';
import { COREABI } from '@/lib/abi/core-abi';

const AddMember = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        alias: '',
        role: '',
        walletAddress: ''
    });

    const { address: user } = useAccount();

    const { data: contractAddresses } = useReadContract({
        abi: FACTORYABI,
        address: LITTLEFINGER_FACTORY_ADDRESS,
        functionName: "get_vault_org_pair",
        args: [user!]
    });

    const orgAddress = contractAddresses ? contractAddressToHex(contractAddresses[0]) : undefined;

    const { contract } = useContract({
        abi: COREABI,
        address: orgAddress,
    });

    const calls = useMemo(() => {
        const inputIsValid = 
            formData.firstName !== "" && 
            formData.lastName !== "" && 
            formData.alias !== "" && 
            formData.role !== "" && 
            formData.walletAddress !== "" && 
            contract;

        if (!inputIsValid) return undefined;

        let roleValue: number;
        switch (formData.role) {
            case 'admin':
                roleValue = 0;
                break;
            case 'member':
                roleValue = 1;
                break;
            case 'viewer':
                roleValue = 2;
                break;
            default:
                roleValue = 1;
        }

        try {
            return [
                contract.populate("add_member", [
                    formData.firstName,
                    formData.lastName,
                    formData.alias,
                    roleValue,
                    formData.walletAddress
                ])
            ];
        } catch (error) {
            console.error('Error preparing add member transaction:', error);
            return undefined;
        }
    }, [formData, contract]);

    const {
        sendAsync,
        isPending
    } = useSendTransaction({
        calls
    });

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!calls) return;

        try {
            await sendAsync();
            
            setFormData({
                firstName: '',
                lastName: '',
                alias: '',
                role: '',
                walletAddress: ''
            });
            setIsOpen(false);

        } catch (error) {
            console.error('Add member transaction failed:', error);
        }
    };

    const handleCancel = () => {
        setFormData({
            firstName: '',
            lastName: '',
            alias: '',
            role: '',
            walletAddress: ''
        });
        setIsOpen(false);
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button
                    className="bg-regal-gold hover:bg-regal-gold/60 rounded-[0.5rem] text-white font-normal text-sm sm:text-base px-3 py-2 sm:px-4 sm:py-2"
                    variant={'outline'}
                >
                    <Plus size={20} className="sm:size-6" /> 
                    <span className="ml-1 sm:ml-2">Add Members</span>
                </Button>
            </DialogTrigger>
            <DialogContent className="w-[95vw] sm:max-w-[425px] bg-regal-black border border-white/35 sm:rounded-xl mx-auto">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle className="text-white mb-4">Add Member</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 sm:gap-5 max-h-[60vh] sm:max-h-[65vh] overflow-y-auto pr-2">
                        <div className="grid gap-2 sm:gap-3">
                            <Label htmlFor="name-1" className="text-white">First Name</Label>
                            <Input
                                id="name-1"
                                name="first_name"
                                value={formData.firstName}
                                onChange={(e) => handleInputChange('firstName', e.target.value)}
                                className="bg-transparent border border-white/25 rounded-xl text-white placeholder:text-gray-400 focus:border-white/50"
                                disabled={isPending}
                            />
                        </div>
                        <div className="grid gap-2 sm:gap-3">
                            <Label htmlFor="name-2" className="text-white">Last Name</Label>
                            <Input
                                id="name-2"
                                name="last_name"
                                value={formData.lastName}
                                onChange={(e) => handleInputChange('lastName', e.target.value)}
                                className="bg-transparent border border-white/25 rounded-xl text-white placeholder:text-gray-400 focus:border-white/50"
                                disabled={isPending}
                            />
                        </div>
                        <div className="grid gap-2 sm:gap-3">
                            <Label htmlFor="username-1" className="text-white">Alias/Username</Label>
                            <Input
                                id="username-1"
                                name="username"
                                value={formData.alias}
                                onChange={(e) => handleInputChange('alias', e.target.value)}
                                className="bg-transparent border border-white/25 rounded-xl text-white placeholder:text-gray-400 focus:border-white/50"
                                disabled={isPending}
                            />
                        </div>
                        <div className="grid gap-2 sm:gap-3">
                            <Label htmlFor="wallet-address" className="text-white">Wallet Address</Label>
                            <Input
                                id="wallet-address"
                                name="wallet_address"
                                value={formData.walletAddress}
                                onChange={(e) => handleInputChange('walletAddress', e.target.value)}
                                className="bg-transparent border border-white/25 rounded-xl text-white placeholder:text-gray-400 focus:border-white/50 font-mono text-xs sm:text-sm"
                                disabled={isPending}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="role-1" className="text-white text-sm">
                                Role*
                            </Label>
                            <Select 
                                value={formData.role} 
                                onValueChange={(value: string) => handleInputChange('role', value)}
                                disabled={isPending}
                            >
                                <SelectTrigger className="bg-transparent border border-white/25 rounded-xl text-white focus:border-white/50">
                                    <SelectValue
                                        placeholder="Select a role"
                                        className="text-gray-400"
                                    />
                                </SelectTrigger>
                                <SelectContent className="bg-regal-black border border-white/25 rounded-xl">
                                    <SelectItem
                                        value="admin"
                                        className="text-white hover:bg-white/10"
                                    >
                                        Admin
                                    </SelectItem>
                                    <SelectItem
                                        value="member"
                                        className="text-white hover:bg-white/10"
                                    >
                                        Member
                                    </SelectItem>
                                    <SelectItem
                                        value="viewer"
                                        className="text-white hover:bg-white/10"
                                    >
                                        Viewer
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <DialogFooter className="flex flex-row gap-x-4 pt-4">
                        <DialogClose asChild>
                            <Button 
                                className="flex-1 rounded-[0.5rem] border-white/25 text-white hover:bg-white/10" 
                                variant="outline"
                                type="button"
                                onClick={handleCancel}
                                disabled={isPending}
                            >
                                Cancel
                            </Button>
                        </DialogClose>
                        <Button 
                            className="flex-1 rounded-[0.5rem] bg-regal-brown hover:bg-regal-brown/80 text-white disabled:opacity-50" 
                            type="submit"
                            disabled={isPending || !calls}
                        >
                            {isPending ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Adding...
                                </>
                            ) : (
                                'Add Member'
                            )}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default AddMember;