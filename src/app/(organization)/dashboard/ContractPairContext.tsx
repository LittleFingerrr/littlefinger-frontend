"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Provider, Contract, RpcProvider } from 'starknet';
import { LITTLEFINGER_FACTORY_ADDRESS } from '@/lib/constants';
import { FACTORYABI } from '@/lib/abi/factory-abi';
import { fetchContractPairFromFactory } from '../../../lib/contractUtils';

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

const getProvider = () => {
  return new RpcProvider({ 
    nodeUrl: 'https://starknet-mainnet.public.blastapi.io' 
  });
};

const fetchContractPair = async (userAddress: string): Promise<ContractPair> => {
  try {
    const provider = getProvider();
    const factoryContract = new Contract(FACTORYABI, LITTLEFINGER_FACTORY_ADDRESS, provider);
    const result = await factoryContract.get_vault_org_pair(userAddress);
    const vaultAddress = result[0].toString();
    const orgCoreAddress = result[1].toString();
    if (vaultAddress === "0x0" || orgCoreAddress === "0x0" || vaultAddress === "0" || orgCoreAddress === "0") {
      throw new Error("No organization found for this address");
    }
    return {
      vaultAddress,
      orgCoreAddress
    };
  } catch (error) {
    console.error("Error fetching contract pair:", error);
    if (error instanceof Error) {
      throw new Error(`No organization found: ${error.message}`);
    }
    throw new Error("No organization found for this address");
  }
};

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

  const fetchContracts = async () => {
    if (!isWalletConnected || !userAddress) {
      setContractPair({ vaultAddress: "", orgCoreAddress: "" });
      setIsLoading(false);
      setError(null);
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchContractPairFromFactory(userAddress);
      setContractPair(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "No organization found");
      setContractPair({ vaultAddress: "", orgCoreAddress: "" });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchContracts();
  }, [userAddress, isWalletConnected]);

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