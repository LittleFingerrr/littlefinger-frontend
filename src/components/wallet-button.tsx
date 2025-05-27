"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { WalletModal } from "@/components/wallet-modal"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LogOut, Settings, User } from "lucide-react"
import { useAccount, useDisconnect } from "@starknet-react/core"
import { useRouter } from "next/navigation"

export function WalletButton() {
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false)
  const { address, isConnected, isConnecting } = useAccount()
  const { disconnect } = useDisconnect()
  const router = useRouter()

  const handleConnect = () => {
    if (isConnected) {
      return
    }
    setIsWalletModalOpen(true)
  }

  const handleDisconnect = () => {
    disconnect()
    // Redirect to home/registration page on disconnect
    router.push("/")
    // Clear any local storage related to the wallet
    localStorage.removeItem("walletConnected")
  }

  const truncateAddress = (addr: string | undefined) => {
    if (!addr) return ""
    return `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`
  }

  return (
    <>
      {isConnected && address ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2 h-9 px-3">
              <Avatar className="h-5 w-5">
                <AvatarImage src={`https://api.dicebear.com/7.x/identicon/svg?seed=${address}`} alt="Wallet" />
                <AvatarFallback>W</AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium">{truncateAddress(address)}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Wallet</DropdownMenuLabel>
            <DropdownMenuItem className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="flex items-center gap-2 text-red-600" onClick={handleDisconnect}>
              <LogOut className="h-4 w-4" />
              <span>Disconnect</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Button onClick={handleConnect} className="bg-blue-600 hover:bg-blue-700" disabled={isConnecting}>
          {isConnecting ? "Connecting..." : "Connect Wallet"}
        </Button>
      )}

      <WalletModal open={isWalletModalOpen} onOpenChange={setIsWalletModalOpen} />
    </>
  )
}
