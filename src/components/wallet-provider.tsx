"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"

interface WalletContextType {
  connected: boolean
  address: string
  organizationName: string
  connect: (provider: string) => void
  disconnect: () => void
}

// Change the WalletContext declaration to export it
export const WalletContext = createContext<WalletContextType>({
  connected: false,
  address: "",
  organizationName: "Acme Corp",
  connect: () => {},
  disconnect: () => {},
})

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [connected, setConnected] = useState(false)
  const [address, setAddress] = useState("0x06c0...c39df")
  const [organizationName, setOrganizationName] = useState("Acme Corp")
  const router = useRouter()
  const pathname = usePathname()

  // Check if wallet was previously connected
  useEffect(() => {
    const savedWalletState = localStorage.getItem("walletConnected")
    if (savedWalletState === "true") {
      setConnected(true)

      // If on registration page and already connected, redirect to dashboard
      if (pathname === "/" && connected) {
        router.push("/dashboard")
      }
    }
  }, [pathname, connected, router])

  const connect = (provider: string) => {
    // In a real app, this would connect to the actual wallet provider
    console.log(`Connecting to ${provider}...`)
    setConnected(true)
    localStorage.setItem("walletConnected", "true")

    // If on registration page, redirect to dashboard after connecting
    if (pathname === "/") {
      router.push("/dashboard")
    }
  }

  const disconnect = () => {
    setConnected(false)
    localStorage.removeItem("walletConnected")

    // Redirect to home/registration page on disconnect
    router.push("/")
  }

  return (
    <WalletContext.Provider
      value={{
        connected,
        address,
        organizationName,
        connect,
        disconnect,
      }}
    >
      {children}
    </WalletContext.Provider>
  )
}

export const useWallet = () => useContext(WalletContext)
