"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

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

const fetchContractPair = async (userAddress: string): Promise<ContractPair> => {
  try {
    await new Promise(resolve => setTimeout(resolve, 1000)); 
    
    if (userAddress && userAddress.length > 0) {
      return {
        vaultAddress: "0x1234567890abcdef1234567890abcdef12345678",
        orgCoreAddress: "0xabcdef1234567890abcdef1234567890abcdef12"
      };
    }
    
    throw new Error("No organization found for this address");
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Failed to fetch organization contracts");
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
      const data = await fetchContractPair(userAddress);
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