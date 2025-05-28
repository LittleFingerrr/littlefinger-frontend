"use client"

import { TableCell, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "./ui/button"
import { MoreHorizontal, TrendingUp } from "lucide-react"
import { contractAddressToHex, felt252ToString } from "@/lib/utils"
import { useAccount, useContract, useReadContract, useSendTransaction } from "@starknet-react/core"
import { FACTORYABI } from "@/lib/abi/factory-abi"
import { LITTLEFINGER_FACTORY_ADDRESS } from "@/lib/constants"
import { COREABI } from "@/lib/abi/core-abi"
import { useMemo, useState } from "react"
import { RaisePayModal } from "./raise-pay-modal"

interface MemberTableRowProps {
  member: any
}

export function MemberTableRow({ member }: MemberTableRowProps) {
    const [isRaisePayOpen, setIsRaisePayOpen] = useState(false)

    const { address: user } = useAccount()

    const {data: contractAddresses} = useReadContract({
        abi: FACTORYABI,
        address: LITTLEFINGER_FACTORY_ADDRESS,
        functionName: "get_vault_org_pair",
        args: [user!]
    })

    const { contract } = useContract({
        abi: COREABI,
        address: contractAddressToHex(contractAddresses?.[0]),
    })


    const suspendCalls = useMemo(() => {
        if (!contract || !user) return

        return [
            contract.populate("suspend_member", [member?.id])
        ]
    }, [user, contract])

    const reInStateCalls = useMemo(() => {
        if (!contract || !user) return

        return [
            contract.populate("reinstate_member", [member?.id])
        ]
    }, [user, contract])

    const { sendAsync: suspendMember } = useSendTransaction({ calls: suspendCalls })
    const { sendAsync: reInstateMember } = useSendTransaction({ calls: reInStateCalls })


  const memberName = `${felt252ToString(member?.firstName)} ${felt252ToString(member?.lastName)}`
  const alias = felt252ToString(member?.alias)
  const returnedRole = member?.returnedRole
  const returnedStatus = member?.returnedStatus
  const memberId = member?.id

  const handleRaisePay = () => {
    // console.log("Raising pay for member:", memberId)
    // TODO: Implement raise pay functionality
    // This could open a modal or call a contract function
    setIsRaisePayOpen(true)
  }

  return (
    <>
        <TableRow key={memberId}>
        <TableCell className="font-medium">{memberName}</TableCell>
        <TableCell>{alias}</TableCell>
        <TableCell>{returnedRole}</TableCell>
        <TableCell>{returnedStatus}</TableCell>
        <TableCell>
            <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                <MoreHorizontal className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem>Edit</DropdownMenuItem>
                <DropdownMenuItem className="text-blue-600 flex items-center gap-1.5" onClick={handleRaisePay}>
                <TrendingUp className="h-3.5 w-3.5" />
                Raise Pay
                </DropdownMenuItem>
                {returnedStatus === "ACTIVE" ? (
                <DropdownMenuItem className="text-red-600">Suspend</DropdownMenuItem>
                ) : returnedStatus === "Suspended" ? (
                <DropdownMenuItem className="text-green-600">Reinstate</DropdownMenuItem>
                ) : (
                <DropdownMenuItem className="text-blue-600">Approve</DropdownMenuItem>
                )}
            </DropdownMenuContent>
            </DropdownMenu>
        </TableCell>
        </TableRow>

        <RaisePayModal open={isRaisePayOpen} onOpenChange={setIsRaisePayOpen} member={member} />
    </>
  )
}
