"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useConnect } from "@starknet-react/core"
import { X } from "lucide-react"

interface WalletModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function WalletModal({ open, onOpenChange }: WalletModalProps) {
  const { connect, connectors } = useConnect()

  const handleConnect = (connector: any) => {
    connect({ connector })
    onOpenChange(false)
  }

  // Map connector IDs to more user-friendly names and icons
  const walletInfo: Record<string, { name: string; icon: string }> = {
    argentX: {
      name: "Argent X",
      icon: "🔶",
    },
    braavos: {
      name: "Braavos",
      icon: "🛡️",
    },
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md p-0 gap-0 bg-black text-white">
        <div className="absolute right-4 top-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onOpenChange(false)}
            className="text-gray-400 hover:text-white hover:bg-transparent"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Button>
        </div>
        <div className="grid grid-cols-2 h-full">
          <div className="p-6 border-r border-gray-800">
            <DialogHeader>
              <DialogTitle className="text-xl text-white mb-4">Connect a Wallet</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-400">Popular</h3>
              <div className="space-y-3">
                {connectors.map((connector) => {
                  const info = walletInfo[connector.id] || { name: connector.id, icon: "📱" }

                  return (
                    <Button
                      key={connector.id}
                      variant="ghost"
                      className="w-full justify-start text-white hover:bg-gray-800"
                      onClick={() => handleConnect(connector)}
                      disabled={!connector.available()}
                    >
                      <span className="mr-2 text-xl">{info.icon}</span>
                      {info.name}
                      {!connector.available() && " (not installed)"}
                    </Button>
                  )
                })}
              </div>
            </div>
          </div>

          <div className="p-6">
            <h2 className="text-xl font-medium mb-6">What is a wallet?</h2>

            <div className="space-y-6">
              <div className="flex items-start gap-3">
                <div className="bg-blue-900 rounded p-2">
                  <Image src="/placeholder.svg?height=24&width=24" alt="Wallet icon" width={24} height={24} />
                </div>
                <div>
                  <h3 className="font-medium mb-1">A home for your digital assets</h3>
                  <p className="text-sm text-gray-400">
                    Wallets are used to send, receive, store, and display digital assets like Starknet tokens and NFTs.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-blue-900 rounded p-2">
                  <Image src="/placeholder.svg?height=24&width=24" alt="Login icon" width={24} height={24} />
                </div>
                <div>
                  <h3 className="font-medium mb-1">A new way to sign-in</h3>
                  <p className="text-sm text-gray-400">
                    Instead of creating new accounts and passwords on every website, just connect your wallet.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
