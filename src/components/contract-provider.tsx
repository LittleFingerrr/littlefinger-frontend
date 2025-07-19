"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { useAccount, useReadContract } from "@starknet-react/core"
import { FACTORYABI } from "@/lib/abi/factory-abi"
import { LITTLEFINGER_FACTORY_ADDRESS } from "@/lib/constants"
import { contractAddressToHex } from "@/lib/utils"

interface ContractAddresses {
  vaultAddress: string | null
  orgAddress: string | null
}

interface ContractContextType {
  addresses: ContractAddresses
  isLoading: boolean
  error: string | null
  refetch: () => void
  clearAddresses: () => void
}

const ContractContext = createContext<ContractContextType>({
  addresses: { vaultAddress: null, orgAddress: null },
  isLoading: false,
  error: null,
  refetch: () => {},
  clearAddresses: () => {},
})

export function ContractProvider({ children }: { children: React.ReactNode }) {
  const { address, isConnected } = useAccount()
  const [addresses, setAddresses] = useState<ContractAddresses>({
    vaultAddress: null,
    orgAddress: null,
  })
  const [error, setError] = useState<string | null>(null)

  // Read contract addresses from the factory
  const {
    data: contractAddresses,
    isLoading,
    refetch,
    error: contractError,
  } = useReadContract({
    abi: FACTORYABI,
    address: LITTLEFINGER_FACTORY_ADDRESS,
    functionName: "get_vault_org_pair",
    args: [address!],
    enabled: !!address && isConnected,
  })

  // console.log(contractAddresses)

  // Load addresses from localStorage on mount
  useEffect(() => {
    if (!isConnected || !address) {
      // Clear addresses when wallet is disconnected
      setAddresses({ vaultAddress: null, orgAddress: null })
      localStorage.removeItem("contractAddresses")
      return
    }

    // Try to load from localStorage first
    const stored = localStorage.getItem(`contractAddresses_${address}`)
    if (stored) {
      try {
        const parsedAddresses = JSON.parse(stored)
        setAddresses(parsedAddresses)
      } catch (err) {
        console.error("Error parsing stored contract addresses:", err)
        localStorage.removeItem(`contractAddresses_${address}`)
      }
    }
  }, [address, isConnected])

  // Update addresses when contract data is fetched
  useEffect(() => {
    if (contractAddresses && Array.isArray(contractAddresses) && contractAddresses.length >= 2) {
      try {
        const vaultAddress = contractAddressToHex(contractAddresses[0])
        const orgAddress = contractAddressToHex(contractAddresses[1])

        const newAddresses = {
          vaultAddress: vaultAddress || null,
          orgAddress: orgAddress || null,
        }

        setAddresses(newAddresses)
        setError(null)

        // Persist to localStorage with user address as key
        if (address) {
          localStorage.setItem(`contractAddresses_${address}`, JSON.stringify(newAddresses))
        }

        console.log("Contract addresses updated:", newAddresses)
      } catch (err) {
        console.error("Error processing contract addresses:", err)
        setError("Failed to process contract addresses")
      }
    } else if (contractAddresses !== undefined) {
      // Contract call succeeded but no addresses found (user hasn't created organization yet)
      setAddresses({ vaultAddress: null, orgAddress: null })
      setError(null)
    }
  }, [contractAddresses, address])

  // Handle contract errors
  useEffect(() => {
    if (contractError) {
      setError(contractError.message || "Failed to fetch contract addresses")
    }
  }, [contractError])

  const clearAddresses = () => {
    setAddresses({ vaultAddress: null, orgAddress: null })
    setError(null)
    if (address) {
      localStorage.removeItem(`contractAddresses_${address}`)
    }
  }

  const contextValue: ContractContextType = {
    addresses,
    isLoading,
    error,
    refetch,
    clearAddresses,
  }

  return <ContractContext.Provider value={contextValue}>{children}</ContractContext.Provider>
}

export const useContracts = () => {
  const context = useContext(ContractContext)
  if (!context) {
    throw new Error("useContracts must be used within a ContractProvider")
  }
  return context
}

// Helper hooks for specific addresses
export const useVaultAddress = () => {
  const { addresses } = useContracts()
  return addresses.vaultAddress
}

export const useOrgAddress = () => {
  const { addresses } = useContracts()
  return addresses.orgAddress
}

// Helper hook to check if user has created an organization
export const useHasOrganization = () => {
  const { addresses, isLoading } = useContracts()
  return {
    hasOrganization: !!(addresses.vaultAddress && addresses.orgAddress),
    isLoading,
  }
}
