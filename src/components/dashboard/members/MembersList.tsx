"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

const members = [
    {
        firstName: "Okorie",
        lastName: "Wilfred",
        alias: "OWK50G",
        role: "Owner",
        wallet: "0x1234567890abcdef1234567890abcdef12345678",
        status: true,
    },
    {
        firstName: "Doe",
        lastName: "John",
        alias: "JD1234",
        role: "Member",
        wallet: "0xabcdef1234567890abcdef1234567890abcdef12",
        status: false,
    },
    {
        firstName: "Jane",
        lastName: "Smith",
        alias: "JS9876",
        role: "Admin",
        wallet: "0x7890abcdef1234567890abcdef1234567890abcd",
        status: true,
    },
]

const MembersList = () => {
  return (
    <div className='space-y-6'>
        <div className="flex w-full items-center gap-2">
            <Input className="h-10 rounded-[0.5rem]" placeholder="Search Members..." />
            <Button className="rounded-[0.5rem] bg-white/15 font-normal text-base" size={'lg'} variant="outline">
                Filter by Role
            </Button>
        </div>
        <div>
            <Table>
                <TableHeader>
                    <TableRow className='border border-white/25 rounded-lg hover:bg-regal-black'>
                        <TableHead className="text-white">Name</TableHead>
                        <TableHead className="text-white">Alias</TableHead>
                        <TableHead className="text-white">Role</TableHead>
                        <TableHead className="text-white">Status</TableHead>
                        <TableHead className="text-right text-white">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {members.map((member) => (
                    <TableRow key={member.wallet}>
                        <TableCell className="font-medium">{member.firstName +' '+ member.lastName}</TableCell>
                        <TableCell>{member.alias}</TableCell>
                        <TableCell>{member.role}</TableCell>
                        <TableCell>{member.status ? '✅' : '❌'}</TableCell>
                        <TableCell className="text-right">archive</TableCell>
                    </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
        <div className='w-full flex flex-col md:flex-row justify-between items-center mt-4'>
            <p className='font-normal text-sm'>Showing 1 - 5 of {members.length} members</p>
            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious href="#" />
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink href="#">1</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink href='#'>2</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink href="#">3</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationEllipsis />
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationNext href="#" />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    </div>
  )
}

export default MembersList
