"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DepositModal } from "../../../components/deposit-modal";
import { WithdrawModal } from "../../../components/withdraw-modal";
import { FreezeModal } from "../../../components/freeze-modal";
import Image from "next/image";
import icon1 from "../../../../public/icon1.svg";
import icon2 from "../../../../public/icon2.svg";

export default function VaultPage() {
  const [isDepositOpen, setIsDepositOpen] = useState(false);
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);
  const [isFreezeOpen, setIsFreezeOpen] = useState(false);
  const [isPaying, setIsPaying] = useState(false);

  // Mock data for vault
  const vaultStatus = "Active and Operational";
  const transactions = [
    {
      id: 1,
      type: "Deposit",
      amount: "+$50,000.00",
      status: "Success",
      date: "May 31, 2024",
    },
    {
      id: 2,
      type: "Withdrawal",
      amount: "-$10,000.00",
      status: "Success",
      date: "May 31, 2024",
    },
    {
      id: 3,
      type: "Payout",
      amount: "-$18,000.00",
      status: "Success",
      date: "Apr 31, 2024",
    },
  ];

  // Format the contract balance for display
  const formatBalance = (balance: any) => {
    if (!balance) return "0.00";
    // Convert from wei to ETH (assuming 18 decimals)
    const balanceInEth = Number(balance) / 1e18;
    return balanceInEth.toFixed(2);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="md:p-6 space-y-8">
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="bg-[#131313A6] border-none md:p-4 h-[146px] relative overflow-hidden">
            <div
              className="absolute bottom-0 right-16 -mb-8 w-60 h-32 
               bg-gradient-to-t from-[#F3A42C4D] to-transparent 
               rounded-full blur-2xl pointer-events-none"
              style={{ filter: "blur(32px)" }}
            />

            <CardHeader className=" relative z-10">
              <CardTitle className="md:text-xl font-semibold md:font-bold text-white text-base font-Unbounded">
                Total Balance
              </CardTitle>
            </CardHeader>

            <CardContent className="relative z-10 md:pt-6 md:ml-12 md:pb-10 pb-0">
              <div className="flex items-center space-x-4 ml-4">
                <div className=" border-2 border-white px-2 py-3 rounded-sm md:rounded-lg backdrop-blur-sm">
                  <Image
                    src={icon1}
                    alt="icon1"
                    className="h-[15px] w-[20px] md:h-7 md:w-7 text-white"
                  />
                </div>

                <div className="flex flex-col">
                  <span className="text-2xl font-bold text-white tracking-tight">
                    {`0.00 STRK`}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#131313A6] border-none md:p-4 h-[146px] relative overflow-hidden">
            <div
              className="absolute bottom-0 right-16 -mb-8 w-60 h-32 
               bg-gradient-to-t from-[#F3A42C4D] to-transparent 
               rounded-full blur-2xl pointer-events-none"
              style={{ filter: "blur(32px)" }}
            />

            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-medium text-white font-Unbounded">
                Vault Status
              </CardTitle>
            </CardHeader>

            <CardContent className="relative z-10 md:pt-6 md:ml-12 md:pb-10 pb-0">
              <div className="flex items-center space-x-4 ml-4">
                <div className="h-[48px] w-[48px]">
                  <Image src={icon2} alt="icon2" className=" text-white h-[40px] w-[40px]" />
                </div>
                <span className="text-2xl font-extrabold md:font-bold text-white tracking-tight">
                  {vaultStatus}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex md:flex-wrap gap-4">
          <Button
            className="bg-[#9C7924] hover:bg-yellow-700 text-white font-medium px-10 py-6 rounded-full"
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
          <h2 className="text-2xl font-bold text-white">
            Transactions History
          </h2>

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
              style={{ filter: "blur(32px)" }}
            />

            <div
              className="absolute top-0 left-72 -mt-16 w-60 h-32 
               bg-gradient-to-t from-[#F3A42C4D] to-transparent 
               rounded-full blur-2xl pointer-events-none"
              style={{ filter: "blur(32px)" }}
            />

            <Table className="border-separate justify-start font-Unbounded">
              <TableHeader>
                <TableRow className="border-gray-800 hover:bg-gray-800/50">
                  <TableHead className="text-gray-300 font-normal text-sm md:text-base font-Unbounded">
                    Transaction
                  </TableHead>
                  <TableHead className="text-gray-300 font-normal text-sm md:text-base font-Unbounded pl-14">
                    Amount
                  </TableHead>
                  <TableHead className="text-gray-300 font-normal text-sm md:text-base font-Unbounded pl-14">
                    Status
                  </TableHead>
                  <TableHead className="text-gray-300 font-normal text-sm md:text-base font-Unbounded pl-14">
                    Date
                  </TableHead>
                  <TableHead className="text-gray-300 font-normal text-sm md:text-base font-Unbounded pl-14">
                    Details
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {transactions.map((transaction) => (
                  <TableRow
                    key={transaction.id}
                    className="border-gray-800 p-4 hover:bg-gray-800/30 text-[13px]"
                  >
                    <TableCell className="font-bold py-5  md:text-base text-white">
                      {transaction.type}
                    </TableCell>
                    <TableCell
                      className={
                        (transaction.amount.startsWith("+")
                          ? "text-green-400 font-bold text-base"
                          : "text-red-400 font-bold text-base") + " pl-14"
                      }
                    >
                      {transaction.amount}
                    </TableCell>
                    <TableCell className="pl-14">
                      <span className="text-white font-bold text-base">
                        {transaction.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-gray-300 pl-14">
                      {transaction.date}
                    </TableCell>
                    <TableCell className="pl-14">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-gray-300 hover:text-white hover:bg-gray-800 font-bold text-base "
                      >
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <div className="flex flex-col space-y-4 md:items-center md:justify-between">
            <p className="text-xs md:text-sm text-white justify-start">Showing 1-5 of 0 members</p>
            <div className="flex items-center md:space-x-2 space-x-4 justify-end">
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
