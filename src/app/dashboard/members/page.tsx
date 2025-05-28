"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { AddMemberModal } from "@/components/add-member-modal"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Plus, UserPlus } from "lucide-react"
import { MemberTable } from "@/components/member-table"
import { useAccount, useReadContract } from "@starknet-react/core"
import { FACTORYABI } from "@/lib/abi/factory-abi"
import { LITTLEFINGER_FACTORY_ADDRESS } from "@/lib/constants"
import { COREABI } from "@/lib/abi/core-abi"
import { contractAddressToHex, felt252ToString } from "@/lib/utils"
import { CairoCustomEnum, uint256 } from "starknet"

export default function MembersPage() {
  const [isAddMemberOpen, setIsAddMemberOpen] = useState(false)

  // Mock data for members
  const members = [
    { id: 1, name: "Alice Smith", alias: "alice_s", role: "Admin", status: "Active" },
    { id: 2, name: "Bob Johnson", alias: "bob_dev", role: "Developer", status: "Active" },
    { id: 3, name: "Charlie Brown", alias: "c_brown", role: "Finance", status: "Active" },
    { id: 4, name: "Dana White", alias: "dana_w", role: "Marketing", status: "Suspended" },
    { id: 5, name: "Eva Green", alias: "eva_ux", role: "Design", status: "Pending" },
  ]

  const { address: user } = useAccount()

  const { data: ContractAddresses } = useReadContract({
    abi: FACTORYABI,
    address: LITTLEFINGER_FACTORY_ADDRESS,
    functionName: "get_vault_org_pair",
    args: [user!]
  })

  const {
    data: members_from_contract
  } = useReadContract(
    user ? {
    abi: COREABI,
    address: contractAddressToHex(ContractAddresses?.[0]),
    functionName: "get_members",
    args: []
  } : ({} as any))

  // const members = members_from_contract as Array<any>;
  const safeMembersFromContract = Array.isArray(members_from_contract) ? members_from_contract : [];
  // console.log(members)
  // const membersFromContractToMembers = (fromContract: any[]) => {
  //   let members = [];
  //   fromContract.forEach(() => {})
  // }
  console.log(safeMembersFromContract)
  const formattedMembers = () => safeMembersFromContract.map((member, i) => {
    const firstName = member?.fname;
    const lastName = member?.lname;
    const alias = member?.alias;
    const id = Number(uint256.uint256ToBN(member?.id));
    console.log(id)

    const role: CairoCustomEnum = member?.role;
    const returnedRole = role.activeVariant();

    const status: CairoCustomEnum = member?.status;
    const returnedStatus = status.activeVariant();

    return {
      firstName, lastName, alias, returnedRole, returnedStatus, id
    }
  })
  console.log(formattedMembers())

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Members</h1>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <Button onClick={() => setIsAddMemberOpen(true)} className="bg-blue-600 hover:bg-blue-700">
          <Plus className="mr-2 h-4 w-4" /> Add Member
        </Button>
        <Button variant="outline">
          <UserPlus className="mr-2 h-4 w-4" /> Invite Member
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <Input placeholder="Search members..." className="w-full" />
        </div>
        <Button variant="outline">Filter by Role</Button>
      </div>

      {/* <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Alias</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {members.map((member) => (
              <TableRow key={member.id}>
                <TableCell className="font-medium">{member.name}</TableCell>
                <TableCell>{member.alias}</TableCell>
                <TableCell>{member.role}</TableCell>
                <TableCell>
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      member.status === "Active"
                        ? "bg-green-100 text-green-800"
                        : member.status === "Suspended"
                          ? "bg-red-100 text-red-800"
                          : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {member.status}
                  </span>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      {member.status === "Active" ? (
                        <DropdownMenuItem className="text-red-600">Suspend</DropdownMenuItem>
                      ) : member.status === "Suspended" ? (
                        <DropdownMenuItem className="text-green-600">Reinstate</DropdownMenuItem>
                      ) : (
                        <DropdownMenuItem className="text-blue-600">Approve</DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div> */}

      <MemberTable members={formattedMembers()}/>

      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">Showing 1-5 of {formattedMembers().length} members</p>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" className="h-8 w-8 p-0">
            1
          </Button>
          <Button variant="outline" size="sm" className="h-8 w-8 p-0">
            2
          </Button>
          <Button variant="outline" size="sm" className="h-8 w-8 p-0">
            3
          </Button>
        </div>
      </div>

      <AddMemberModal open={isAddMemberOpen} onOpenChange={setIsAddMemberOpen} />
    </div>
  )
}
