import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "./ui/button"
import { MoreHorizontal } from "lucide-react"
import { CairoCustomEnum } from "starknet"
import { felt252ToString } from "@/lib/utils"
import { MemberTableRow } from "./member-table-row"

export function MemberTable({members}: {
    members: any[]
}){
    return (
        <div className="rounded-md border">
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
                {members?.map((member) => {
                    console.log(member)
                    const memberName = `${felt252ToString(member?.firstName)} ${felt252ToString(member?.lastName)}`
                    const alias = felt252ToString(member?.alias)
                    const returnedRole = member?.returnedRole
                    const returnedStatus = member?.returnedStatus
                    // console.log(member?.id)
                    
                    return(
                        <MemberTableRow key={member?.id} member={member} />
                )})}
            </TableBody>
            </Table>
        </div>
    )
}