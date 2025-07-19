"use client"
import { WalletButton } from "@/components/wallet-button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAccount, useReadContract } from "@starknet-react/core"
import { COREABI } from "@/lib/abi/core-abi"
import { FACTORYABI } from "@/lib/abi/factory-abi"
import { LITTLEFINGER_FACTORY_ADDRESS } from "@/lib/constants"
import { contractAddressToHex } from "@/lib/utils"

export function Header() {
  const { isConnected, address: user } = useAccount()
  
  const { data: ContractAddresses } = useReadContract(
      user
        ? {
            abi: FACTORYABI,
            address: LITTLEFINGER_FACTORY_ADDRESS,
            functionName: "get_vault_org_pair",
            args: [user!],
            watch: true,
          }
        : ({} as any),
    )
  
  const { data: Org_Info, isLoading: OrgInfoLoading } = useReadContract({
    abi: COREABI,
    address: contractAddressToHex(ContractAddresses?.[0]),
    functionName: "get_organization_details",
    args: [],
    watch: true
  })

  console.log(Org_Info);

  const organizationName = Org_Info?.name;

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <div className="flex flex-1 items-center justify-end">
        <div className="flex items-center gap-4">
          {isConnected && (
            <div className="hidden md:flex items-center gap-2">
              <span className="text-sm font-medium">{organizationName}</span>
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg?height=32&width=32" alt={organizationName} />
                <AvatarFallback>{organizationName?.charAt(0)}</AvatarFallback>
              </Avatar>
            </div>
          )}
          <WalletButton />
        </div>
      </div>
    </header>
  )
}
