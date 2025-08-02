'use client';

import { useMemo, useState } from 'react';
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

    //   console.log(members)
    console.log('addy', ContractAddresses);

    const { data: transactionHistory, isLoading: transactionHistoryLoading } = useReadContract({
        abi: VAULTABI,
        address: contractAddressToHex(ContractAddresses?.[1]),
        functionName: 'get_transaction_history',
        args: [],
        watch: true,
    });

    // Mock data for vault
    // const vaultStatus = 'Active and Operational';
    // const transactions = [
    //     {
    //         id: 1,
    //         type: 'Deposit',
    //         amount: '+$50,000.00',
    //         status: 'Success',
    //         date: 'May 31, 2024',
    //     },
    //     {
    //         id: 2,
    //         type: 'Withdrawal',
    //         amount: '-$10,000.00',
    //         status: 'Success',
    //         date: 'May 31, 2024',
    //     },
    //     {
    //         id: 3,
    //         type: 'Payout',
    //         amount: '-$18,000.00',
    //         status: 'Success',
    //         date: 'Apr 31, 2024',
    //     },
    // ];

    const parsedTxHistory = transactionHistory?.map((tx, index) => {
        const type = tx.transaction_type.activeVariant();
        console.log(type);
        const amount = Number(tx.amount) / 1e18;
        console.log(amount);
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

    const finalStatus = (contractVaultStatus as any as CairoCustomEnum)?.activeVariant();

    const { contract } = useContract({
        abi: COREABI,
        address: contractAddressToHex(ContractAddresses?.[0]),
    });

    const paymentCall = useMemo(() => {
        if (!contract || !user) return;

        return [contract.populate('schedule_payout', [])];
    }, [contract, user]);

    const { sendAsync: sendPayment } = useSendTransaction({ calls: paymentCall });

    const handlePayment = async () => {
        setIsPaying(true);

        try {
            console.log('Sending Payment');
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

    return (
        <div className="min-h-screen bg-black text-white">
            <div className="p-6 space-y-8">
                <div className="grid gap-6 md:grid-cols-2">
                    <Card className="bg-[#131313A6] border-none p-4 relative overflow-hidden">
                        <div
                            className="absolute bottom-0 right-16 -mb-8 w-60 h-32 
               bg-gradient-to-t from-[#F3A42C4D] to-transparent 
               rounded-full blur-2xl pointer-events-none"
                            style={{ filter: 'blur(32px)' }}
                        />

                        <CardHeader className=" relative z-10">
                            <CardTitle className="text-xl font-bold text-white">
                                Total Balance
                            </CardTitle>
                        </CardHeader>

                        <CardContent className="relative z-10 pt-6 ml-12 pb-10">
                            <div className="flex items-center space-x-4">
                                <div className=" border-2 border-white px-2 py-3 rounded-lg backdrop-blur-sm">
                                    <Image src={icon1} alt="icon1" className="h-7 w-7 text-white" />
                                </div>

                                <div className="flex flex-col">
                                    <span className="text-3xl font-bold">
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

                    <Card className="bg-[#131313A6] border-none p-4 relative overflow-hidden">
                        <div
                            className="absolute bottom-0 right-16 -mb-8 w-60 h-32 
               bg-gradient-to-t from-[#F3A42C4D] to-transparent 
               rounded-full blur-2xl pointer-events-none"
                            style={{ filter: 'blur(32px)' }}
                        />

                        <CardHeader className="pb-4">
                            <CardTitle className="text-lg font-medium text-white">
                                Vault Status
                            </CardTitle>
                        </CardHeader>

                        <CardContent className="relative z-10 pt-6 ml-12 pb-10">
                            <div className="flex items-center space-x-4">
                                <div className="">
                                    <Image src={icon2} alt="icon2" className=" text-white" />
                                </div>
                                <span className="text-2xl font-bold text-white tracking-tight">
                                    {finalStatus}
                                </span>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-4">
                    <Button
                        className="bg-[#9C7924] hover:bg-yellow-700 text-black font-medium px-10 py-6 rounded-full"
                        onClick={() => setIsDepositOpen(true)}
                    >
                        Deposit Funds
                    </Button>
                    <Button
                        className="bg-[#5EF25021] hover:bg-green-700 text-[#45FF01] font-medium px-10 py-6 rounded-full"
                        onClick={() => setIsWithdrawOpen(true)}
                    >
                        Withdraw Funds
                    </Button>
                    <Button
                        className="bg-[#FF828421] hover:bg-red-900 text-[#FF8284] font-medium px-10 py-6 rounded-full"
                        onClick={() => setIsFreezeOpen(true)}
                    >
                        Unfreeze
                    </Button>
                    <Button
                        className="bg-[#FFFFFF21] hover:bg-gray-600 text-white font-medium px-10 py-6 rounded-full"
                        onClick={() => {}}
                        disabled={false}
                    >
                        Payout
                    </Button>
                </div>

                {/* Transaction History */}
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-white">Transactions History</h2>

                    {/* Filter Buttons */}
                    <div className="flex gap-4">
                        <Button className="bg-[#FFFFFF21]  hover:bg-gray-600 text-white px-10 py-5 rounded-full">
                            Filter by type
                        </Button>
                        <Button className="bg-[#FFFFFF21]  hover:bg-gray-600 text-white px-10 py-5 rounded-full">
                            Date range
                        </Button>
                    </div>

                    {/* Transaction Table */}
                    <div className="bg-[#131313A6] border-none p-6 relative overflow-hidden rounded-lg border border-gray-800">
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
                                <TableRow className="border-gray-800 hover:bg-gray-800/50">
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
                                    const isPositive = transaction.type.toLowerCase() === 'deposit';
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
            <FreezeModal open={isFreezeOpen} onOpenChange={setIsFreezeOpen} />
        </div>
    );
}
