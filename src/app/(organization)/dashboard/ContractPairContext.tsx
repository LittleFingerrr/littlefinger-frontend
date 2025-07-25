"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useContract, useProvider } from '@starknet-react/core';
import { LITTLEFINGER_FACTORY_ADDRESS } from '@/lib/constants';
import { FACTORYABI } from '@/lib/abi/factory-abi';

interface ContractPair {
  vaultAddress: string;
  orgCoreAddress: string;
}

interface ContractPairContextType {
  contractPair: ContractPair;
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

const ContractPairContext = createContext<ContractPairContextType | undefined>(undefined);

interface ContractPairProviderProps {
  children: ReactNode;
  userAddress?: string;
  isWalletConnected: boolean;
}

export const ContractPairProvider: React.FC<ContractPairProviderProps> = ({
  children,
  userAddress,
  isWalletConnected
}) => {
  const [contractPair, setContractPair] = useState<ContractPair>({
    vaultAddress: "",
    orgCoreAddress: ""
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const { provider } = useProvider();
  const { contract: factoryContract } = useContract({
    abi: FACTORYABI,
    address: LITTLEFINGER_FACTORY_ADDRESS,
  });

  const fetchContracts = async () => {
    if (!isWalletConnected || !userAddress || !factoryContract) {
      setContractPair({ vaultAddress: "", orgCoreAddress: "" });
      setIsLoading(false);
      setError(null);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      console.log('Fetching contract pair for address:', userAddress);
      console.log('Factory address:', LITTLEFINGER_FACTORY_ADDRESS);

      const result = await factoryContract.get_vault_org_pair(userAddress);
      
      console.log('Factory contract result:', result);

      const vaultAddress = result[0].toString();
      const orgCoreAddress = result[1].toString();

      console.log('Parsed addresses:', { vaultAddress, orgCoreAddress });

      if (vaultAddress === "0x0" || orgCoreAddress === "0x0" || vaultAddress === "0" || orgCoreAddress === "0") {
        throw new Error("No organization found for this address");
      }

      setContractPair({
        vaultAddress,
        orgCoreAddress
      });
    } catch (err) {
      console.error("Error fetching contract pair:", err);
      
      if (err instanceof Error) {
        if (err.message.includes('Contract not found') || err.message.includes('Entry point not found')) {
          setError("Factory contract not accessible");
        } else {
          setError(`No organization found: ${err.message}`);
        }
      } else {
        setError("No organization found for this address");
      }
      
      setContractPair({ vaultAddress: "", orgCoreAddress: "" });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchContracts();
  }, [userAddress, isWalletConnected, factoryContract]);

  const contextValue: ContractPairContextType = {
    contractPair,
    isLoading,
    error,
    refetch: fetchContracts
  };

  return (
    <ContractPairContext.Provider value={contextValue}>
      {children}
    </ContractPairContext.Provider>
  );
};

export const useContractPair = (): ContractPairContextType => {
  const context = useContext(ContractPairContext);
  if (!context) {
    throw new Error('useContractPair must be used within a ContractPairProvider');
  }
  return context;
};

export { ContractPairContext };