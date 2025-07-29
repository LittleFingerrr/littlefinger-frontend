"use client"
import { useState, useEffect, useMemo } from 'react'
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
import { useAccount, useReadContract } from '@starknet-react/core'
import { FACTORYABI } from '@/lib/abi/factory-abi'
import { COREABI } from '@/lib/abi/core-abi'
import { LITTLEFINGER_FACTORY_ADDRESS } from '@/lib/constants'
import { contractAddressToHex } from '@/lib/utils'
import { CairoCustomEnum, uint256 } from 'starknet'

interface FormattedMember {
    id: number;
    firstName: string;
    lastName: string;
    alias: string;
    returnedRole: string;
    returnedStatus: string;
}

const MembersList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredMembers, setFilteredMembers] = useState<FormattedMember[]>([]);
  const membersPerPage = 5;

  const { address: user } = useAccount();

  const { data: ContractAddresses } = useReadContract({
    abi: FACTORYABI,
    address: LITTLEFINGER_FACTORY_ADDRESS,
    functionName: "get_vault_org_pair",
    args: user ? [user] : undefined
  });

  const { data: members_from_contract } = useReadContract(
    user && ContractAddresses?.[0] ? {
      abi: COREABI,
      address: contractAddressToHex(ContractAddresses[0]),
      functionName: "get_members",
      args: []
    } : ({} as any)
  );

  const members = useMemo((): FormattedMember[] => {
    const safeMembersFromContract = Array.isArray(members_from_contract) ? members_from_contract : [];
    
    return safeMembersFromContract.map((member, i) => {
      const firstName = member?.fname || '';
      const lastName = member?.lname || '';
      const alias = member?.alias || '';
      const id = member?.id ? Number(uint256.uint256ToBN(member.id)) : i;

      const role: CairoCustomEnum = member?.role;
      const returnedRole = role?.activeVariant() || 'Member';

      const status: CairoCustomEnum = member?.status;
      const returnedStatus = status?.activeVariant() || 'Active';

      return {
        id,
        firstName,
        lastName,
        alias,
        returnedRole,
        returnedStatus
      };
    });
  }, [JSON.stringify(members_from_contract)]);

  useEffect(() => {
    const filtered = members.filter(member => 
      member.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.alias.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.returnedRole.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredMembers(filtered);
    setCurrentPage(1);
  }, [searchTerm, members]);

  const totalPages = Math.ceil(filteredMembers.length / membersPerPage);
  const startIndex = (currentPage - 1) * membersPerPage;
  const endIndex = startIndex + membersPerPage;
  const currentMembers = filteredMembers.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const getRoleStyle = (role: string) => {
    switch (role.toLowerCase()) {
      case 'owner':
        return 'bg-purple-500/20 text-purple-300 border border-purple-500/30';
      case 'admin':
        return 'bg-blue-500/20 text-blue-300 border border-blue-500/30';
      case 'developer':
        return 'bg-green-500/20 text-green-300 border border-green-500/30';
      case 'finance':
        return 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30';
      case 'marketing':
        return 'bg-pink-500/20 text-pink-300 border border-pink-500/30';
      case 'design':
        return 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30';
      default:
        return 'bg-gray-500/20 text-gray-300 border border-gray-500/30';
    }
  };

  const getStatusStyle = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'bg-green-500/20 text-green-300 border border-green-500/30';
      case 'suspended':
        return 'bg-red-500/20 text-red-300 border border-red-500/30';
      case 'pending':
        return 'bg-orange-500/20 text-orange-300 border border-orange-500/30';
      default:
        return 'bg-gray-500/20 text-gray-300 border border-gray-500/30';
    }
  };

  // Loading state
  if (!user) {
    return (
      <div className='space-y-6 font-inter'>
        <div className="flex justify-center items-center h-64">
          <div className="text-white text-lg">Please connect your wallet to view members.</div>
        </div>
      </div>
    );
  }

  return (
    <div className='space-y-8 font-inter'>
        <div className="flex w-full items-center gap-3">
            <Input 
                className="flex-[2] h-11 rounded-xl bg-transparent border border-white/25 text-white placeholder:text-gray-400 text-base px-4" 
                placeholder="Search Members..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button className="flex-1 sm:flex-none sm:w-auto rounded-xl bg-white/15 hover:bg-white/20 text-base py-5 px-6 whitespace-nowrap border border-white/25" variant="outline">
                Filter by Role
            </Button>
        </div>
        
        <div className="rounded-lg border border-white/25 overflow-hidden">
            <Table>
                <TableHeader>
                    <TableRow className='border-b border-white/25 hover:bg-regal-black/50'>
                        <TableHead className="text-white font-semibold text-base py-6 px-6">Name</TableHead>
                        <TableHead className="text-white font-semibold text-base py-6 px-6">Alias</TableHead>
                        <TableHead className="text-white font-semibold text-base py-6 px-6">Role</TableHead>
                        <TableHead className="text-white font-semibold text-base py-6 px-6">Status</TableHead>
                        <TableHead className="text-right text-white font-semibold text-base py-6 px-6">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {currentMembers.length > 0 ? (
                        currentMembers.map((member) => (
                            <TableRow 
                                key={member.id} 
                                className="border-b border-white/10 hover:bg-white/5 transition-colors"
                            >
                                <TableCell className="font-medium text-base py-6 px-6 text-white">
                                    {member.firstName} {member.lastName}
                                </TableCell>
                                <TableCell className="text-base py-6 px-6 text-gray-300">
                                    {member.alias}
                                </TableCell>
                                <TableCell className="text-base py-6 px-6">
                                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getRoleStyle(member.returnedRole)}`}>
                                        {member.returnedRole}
                                    </span>
                                </TableCell>
                                <TableCell className="text-base py-6 px-6">
                                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusStyle(member.returnedStatus)}`}>
                                        {member.returnedStatus}
                                    </span>
                                </TableCell>
                                <TableCell className="text-right py-6 px-6">
                                    <Button 
                                        variant="ghost" 
                                        size="sm"
                                        className="text-gray-400 hover:text-white hover:bg-white/10 text-sm px-3 py-2"
                                    >
                                        Archive
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={5} className="text-center py-12 text-gray-400 text-base">
                                {!ContractAddresses 
                                    ? 'Loading organization data...' 
                                    : searchTerm 
                                    ? 'No members found matching your search.' 
                                    : 'No members found in this organization.'}
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
        
        <div className='w-full flex flex-col md:flex-row justify-between items-center gap-4 pt-4'>
            <p className='font-normal text-base text-gray-300'>
                Showing {currentMembers.length > 0 ? startIndex + 1 : 0} - {Math.min(endIndex, filteredMembers.length)} of {filteredMembers.length} members
            </p>
            
            {totalPages > 1 && (
                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious 
                                href="#" 
                                onClick={(e) => {
                                    e.preventDefault();
                                    if (currentPage > 1) handlePageChange(currentPage - 1);
                                }}
                                className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
                            />
                        </PaginationItem>
                        
                        {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                            const page = i + 1;
                            return (
                                <PaginationItem key={page}>
                                    <PaginationLink 
                                        href="#"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handlePageChange(page);
                                        }}
                                        isActive={currentPage === page}
                                    >
                                        {page}
                                    </PaginationLink>
                                </PaginationItem>
                            );
                        })}
                        
                        {totalPages > 5 && <PaginationEllipsis />}
                        
                        <PaginationItem>
                            <PaginationNext 
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    if (currentPage < totalPages) handlePageChange(currentPage + 1);
                                }}
                                className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}
                            />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            )}
        </div>
    </div>
  )
}

export default MembersList