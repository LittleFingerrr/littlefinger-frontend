'use client';

import { useEffect, useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { DepositModal } from '@/components/deposit-modal';
import { WithdrawModal } from '@/components/withdraw-modal';
import { FreezeModal } from '@/components/freeze-modal';
import Image from 'next/image';
import icon1 from '/public/icon1.svg';
import icon2 from '/public/icon2.svg';
import { useAccount, useContract, useReadContract, useSendTransaction } from '@starknet-react/core';
import { contractAddressToHex, felt252ToString } from '@/lib/utils';
import { VAULTABI } from '@/lib/abi/vault-abi';
import { FACTORYABI } from '@/lib/abi/factory-abi';
import { LITTLEFINGER_FACTORY_ADDRESS, STARKGATE_STRK_ADDRESS } from '@/lib/constants';
import { ERC20ABI } from '@/lib/abi/token-abi';
import { COREABI } from '@/lib/abi/core-abi';
import { CairoCustomEnum } from 'starknet';

export default function VaultPage() {
    const [isDepositOpen, setIsDepositOpen] = useState(false);
    const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);
    const [isFreezeOpen, setIsFreezeOpen] = useState(false);
    const [isPaying, setIsPaying] = useState(false);
    const [status, setStatus] = useState('');

    const { address: user } = useAccount();

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

    const { data: contractVaultBalance, isLoading: vaultBalanceIsLoading } = useReadContract(
        user
            ? {
                  abi: ERC20ABI,
                  address: STARKGATE_STRK_ADDRESS,
                  functionName: 'balance_of',
                  args: [contractAddressToHex(ContractAddresses?.[1])],
                  watch: true,
              }
            : ({} as any)
    );

    const { data: contractVaultStatus, isLoading: vaultStatusIsLoading } = useReadContract(
        user
            ? {
                  abi: VAULTABI,
                  address: contractAddressToHex(ContractAddresses?.[1]),
                  functionName: 'get_vault_status',
                  args: [],
                  watch: true,
              }
            : ({} as any)
    );

    const { data: members, isLoading: membersIsLoading } = useReadContract(
        user
            ? {
                  abi: VAULTABI,
                  address: contractAddressToHex(ContractAddresses?.[1]),
                  functionName: 'get_members',
                  args: [],
                  watch: true,
              }
            : ({} as any)
    );

    const { data: transactionHistory, isLoading: transactionHistoryLoading } = useReadContract({
        abi: VAULTABI,
        address: contractAddressToHex(ContractAddresses?.[1]),
        functionName: 'get_transaction_history',
        args: [],
        watch: true,
    });

    const parsedTxHistory = transactionHistory?.map((tx, index) => {
        const type = tx.transaction_type.activeVariant();
        const amount = Number(tx.amount) / 1e18;
        const token = felt252ToString(tx.token);
        const date = new Date(Number(tx.timestamp) * 1000).toDateString();

        return {
            id: index,
            type,
            amount,
            token: 'STRK',
            date,
        };
    });

    const { contract } = useContract({
        abi: COREABI,
        address: contractAddressToHex(ContractAddresses?.[0]),
    });

    const paymentCall = useMemo(() => {
        if (!contract || !user) return;

        return [contract.populate('schedule_payout', [])];
    }, [contract, user]);

    const { sendAsync: sendPayment } = useSendTransaction({ calls: paymentCall });

    const handlePayout = async () => {
        setIsPaying(true);

        try {
            await sendPayment();
        } catch (err) {
            console.log(err);
        } finally {
            setIsPaying(false);
        }
    };

    // Format the contract balance for display
    const formatBalance = (balance: any) => {
        if (!balance) return '0.00';
        // Convert from wei to ETH (assuming 18 decimals)
        const balanceInEth = Number(balance) / 1e18;
        return balanceInEth.toFixed(2);
    };

    useEffect(() => {
        setStatus((contractVaultStatus as any as CairoCustomEnum)?.activeVariant());
    }, [user, contractVaultStatus, vaultStatusIsLoading, isFreezeOpen, setIsFreezeOpen]);

    return (
        <div className="min-h-screen bg-black text-white">
            <div className="sm:p-6 space-y-8">
                <div className="grid gap-5 sm:gap-10 md:grid-cols-2">
                    <Card className="bg-[#131313A6] border-none px-4 sm:py-1 rounded-xl relative overflow-hidden">
                        <div
                            className="absolute bottom-0 right-16 -mb-8 w-60 h-32 
               bg-gradient-to-t from-[#F3A42C4D] to-transparent 
               rounded-full blur-2xl pointer-events-none"
                            style={{ filter: 'blur(32px)' }}
                        />

                        <CardHeader>
                            <CardTitle className="text-[16px] sm:text-xl font-semibold text-white">
                                Total Balance
                            </CardTitle>
                        </CardHeader>

                        <CardContent className="mx-12 my-1 sm:my-3">
                            <div className="flex items-center space-x-4">
                                <div className="border-2 border-white px-2 py-3 rounded-xl backdrop-blur-sm">
                                    <Image
                                        src={icon1}
                                        alt="icon1"
                                        className="h-5 w-5 sm:h-7 sm:w-7 text-white"
                                    />
                                </div>

                                <div className="flex flex-col">
                                    <span className="text-[24px] sm:text-3xl font-bold">
                                        {vaultBalanceIsLoading
                                            ? 'Loading...'
                                            : `${formatBalance(contractVaultBalance)} STRK`}
                                    </span>
                                    {contractVaultBalance && (
                                        <span className="text-sm text-muted-foreground">
                                            Raw: {formatBalance(contractVaultBalance).toString()}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-[#131313A6] border-none px-4 py-1 rounded-xl relative overflow-hidden">
                        <div
                            className="absolute bottom-0 right-16 -mb-8 w-60 h-32 
               bg-gradient-to-t from-[#F3A42C4D] to-transparent 
               rounded-full blur-2xl pointer-events-none"
                            style={{ filter: 'blur(32px)' }}
                        />

                        <CardHeader>
                            <CardTitle className="text-[16px] sm:text-xl font-semibold text-white">
                                Vault Status
                            </CardTitle>
                        </CardHeader>

                        <CardContent className="mx-12 my-1 sm:my-3">
                            <div className="flex items-center space-x-4">
                                <div className="">
                                    <Image
                                        src={icon2}
                                        alt="icon2"
                                        className="h-7 w-7 sm:h-10 sm:w-10 text-white"
                                    />
                                </div>
                                <span className="text-[24px] sm:text-3xl font-bold text-white tracking-tight">
                                    {status}
                                </span>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Action Buttons */}
                <div className="sm:flex sm:flex-wrap gap-4 grid grid-cols-2">
                    <Button
                        className="bg-[#9C7924] hover:bg-yellow-700 text-black font-medium px-10 py-6 rounded-full"
                        onClick={() => setIsDepositOpen(true)}
                        disabled={status == 'VAULTFROZEN'}
                    >
                        Deposit Funds
                    </Button>
                    <Button
                        className="bg-[#5EF25021] hover:bg-green-700 text-[#45FF01] font-medium px-10 py-6 rounded-full"
                        onClick={() => setIsWithdrawOpen(true)}
                        disabled={status == 'VAULTFROZEN'}
                    >
                        Withdraw Funds
                    </Button>
                    <Button
                        className="bg-[#FF828421] hover:bg-red-900 text-[#FF8284] font-medium px-10 py-6 rounded-full"
                        onClick={() => setIsFreezeOpen(true)}
                    >
                        {status == 'VAULTRESUMED' ? 'Freeze' : 'Unfreeze'}
                    </Button>
                    <Button
                        className="bg-[#FFFFFF21] hover:bg-gray-600 text-white font-medium px-10 py-6 rounded-full"
                        onClick={handlePayout}
                        disabled={isPaying || status == 'VAULTFROZEN'}
                    >
                        Payout
                    </Button>
                </div>

                {/* Transaction History */}
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-white">Transactions History</h2>

                    {/* Filter Buttons */}
                    <div className="flex gap-4">
                        <Button className="bg-[#FFFFFF21]  hover:bg-gray-600 text-white px-10 py-5 rounded-full w-full sm:w-fit">
                            Filter by type
                        </Button>
                        <Button className="bg-[#FFFFFF21]  hover:bg-gray-600 text-white px-10 py-5 rounded-full w-full sm:w-fit">
                            Date range
                        </Button>
                    </div>

                    {/* Transaction Table */}
                    <div className="bg-[#131313A6] border-none p-4 sm:p-6 relative overflow-hidden rounded-xl border border-gray-800">
                        <div
                            className="absolute top-0 right-4 -mr-28 -mt-16 w-60 h-32 
               bg-gradient-to-t from-[#F3A42C4D] to-transparent 
               rounded-full blur-2xl pointer-events-none"
                            style={{ filter: 'blur(32px)' }}
                        />

                        <div
                            className="absolute top-0 left-72 -mt-16 w-60 h-32 
               bg-gradient-to-t from-[#F3A42C4D] to-transparent 
               rounded-full blur-2xl pointer-events-none"
                            style={{ filter: 'blur(32px)' }}
                        />

                        <Table>
                            <TableHeader>
                                <TableRow className="border-gray-800 hover:bg-gray-800/50 flex gap-28 sm:table-row">
                                    <TableHead className="text-gray-300 font-bold text-base">
                                        Transaction
                                    </TableHead>
                                    <TableHead className="text-gray-300 font-bold text-base">
                                        Amount
                                    </TableHead>
                                    <TableHead className="text-gray-300 font-bold text-base">
                                        Status
                                    </TableHead>
                                    <TableHead className="text-gray-300 font-bold text-base">
                                        Date
                                    </TableHead>
                                    <TableHead className="text-gray-300 font-bold text-base">
                                        Details
                                    </TableHead>
                                </TableRow>
                            </TableHeader>

                            <TableBody>
                                {parsedTxHistory?.map((transaction) => {
                                    const isPositive =
                                        transaction?.type?.toLowerCase() === 'deposit';
                                    const isNeutral =
                                        transaction.type.toLowerCase() === 'bonus_allocation';
                                    return (
                                        <TableRow key={transaction.id}>
                                            <TableCell className="font-medium">
                                                {transaction.type}
                                            </TableCell>
                                            <TableCell
                                                className={`
                                                    ${
                                                        isPositive
                                                            ? 'text-green-600'
                                                            : isNeutral
                                                              ? ''
                                                              : 'text-red-600'
                                                    }
                                                `}
                                            >
                                                {transaction.amount}
                                            </TableCell>
                                            <TableCell>
                                                <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                                                    {'SUCCESS'}
                                                </span>
                                            </TableCell>
                                            <TableCell>{transaction.date}</TableCell>
                                            <TableCell>
                                                <Button variant="ghost" size="sm">
                                                    View
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </div>

                    {/* Pagination */}
                    <div className="flex space-y-4 items-center justify-between">
                        <p className="text-sm text-white">
                            Showing 1-5 of {!members ? 0 : (members as any)?.length} members
                        </p>
                        <div className="flex items-center space-x-2">
                            <Button
                                size="sm"
                                className="h-10 w-8 p-0 bg-[#FFFFFF21] hover:bg-gray-600 text-white"
                            >
                                1
                            </Button>
                            <Button
                                size="sm"
                                className="h-10 w-8 p-0 bg-[#FFFFFF21] hover:bg-gray-600 text-white"
                            >
                                2
                            </Button>
                            <Button
                                size="sm"
                                className="h-10 w-8 p-0 bg-[#FFFFFF21] hover:bg-gray-600 text-white"
                            >
                                3
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* All Modals */}
            <DepositModal open={isDepositOpen} onOpenChange={setIsDepositOpen} />
            <WithdrawModal open={isWithdrawOpen} onOpenChange={setIsWithdrawOpen} />
            <FreezeModal open={isFreezeOpen} onOpenChange={setIsFreezeOpen} vaultStatus={status} />
        </div>
    );
}
