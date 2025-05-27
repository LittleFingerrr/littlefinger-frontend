import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "./ui/button"
import { MoreHorizontal } from "lucide-react"

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
                {members?.map((member) => (
                <TableRow key={member?.id}>
                    <TableCell className="font-medium">{member?.name}</TableCell>
                    <TableCell>{member?.alias}</TableCell>
                    <TableCell>{member?.role}</TableCell>
                    <TableCell>
                    <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        member?.status === "Active"
                            ? "bg-green-100 text-green-800"
                            : member.status === "Suspended"
                            ? "bg-red-100 text-red-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                    >
                        {member?.status}
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
                        {member?.status === "Active" ? (
                            <DropdownMenuItem className="text-red-600">Suspend</DropdownMenuItem>
                        ) : member?.status === "Suspended" ? (
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
        </div>
    )
}