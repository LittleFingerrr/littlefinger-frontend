'use client';

import React, {
    createContext,
    useContext,
    useState,
    useEffect,
    ReactNode,
    useMemo,
    useCallback,
} from 'react';
import { useContract, useProvider, useAccount } from '@starknet-react/core';
import { useRouter } from 'next/navigation';
import { LITTLEFINGER_FACTORY_ADDRESS } from '@/lib/constants';
import { FACTORYABI } from '@/lib/abi/factory-abi';
import { contractAddressToHex } from '@/lib/utils';

interface ContractPair {
    vaultAddress: `0x${string}`;
    orgCoreAddress: `0x${string}`;
}

interface ContractPairContextType {
    contractPair: ContractPair;
    isLoading: boolean;
    error: string | null;
    refetch: () => void;
    hasOrganization: boolean;
}

const ContractPairContext = createContext<ContractPairContextType | undefined>(undefined);

interface ContractPairProviderProps {
    children: ReactNode;
}

export const ContractPairProvider: React.FC<ContractPairProviderProps> = ({ children }) => {
    const [contractPair, setContractPair] = useState<ContractPair>({
        vaultAddress: '0x0' as `0x${string}`,
        orgCoreAddress: '0x0' as `0x${string}`,
    });
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const router = useRouter();

    const { address: userAddress, isConnected: isWalletConnected } = useAccount();

    const { provider } = useProvider();
    const { contract: factoryContract } = useContract({
        abi: FACTORYABI,
        address: LITTLEFINGER_FACTORY_ADDRESS,
    });

    const hasOrganization = useMemo(() => {
        return (
            contractPair.vaultAddress !== '0x0' &&
            contractPair.orgCoreAddress !== '0x0' &&
            contractPair.vaultAddress !== '0x' &&
            contractPair.orgCoreAddress !== '0x'
        );
    }, [contractPair.vaultAddress, contractPair.orgCoreAddress]);

    const fetchContracts = useCallback(async () => {
        console.log('fetchContracts called:', {
            isWalletConnected,
            userAddress: !!userAddress,
            factoryContract: !!factoryContract,
            userAddressValue: userAddress,
        });

        if (!isWalletConnected || !userAddress) {
            console.log('Wallet not connected or no address, resetting state');
            setContractPair({
                vaultAddress: '0x0' as `0x${string}`,
                orgCoreAddress: '0x0' as `0x${string}`,
            });
            setIsLoading(false);
            setError(null);
            return;
        }

        if (!factoryContract) {
            console.log('Factory contract not ready');
            setIsLoading(true);
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            console.log('Fetching contract pair for address:', userAddress);
            console.log('Factory address:', LITTLEFINGER_FACTORY_ADDRESS);

            const result = await factoryContract.get_vault_org_pair(userAddress);

            console.log('Factory contract result:', result);

            const orgCoreAddress = contractAddressToHex(result[0]);
            const vaultAddress = contractAddressToHex(result[1]);

            console.log('Parsed addresses:', { vaultAddress, orgCoreAddress });

            if (
                vaultAddress === '0x0' ||
                orgCoreAddress === '0x0' ||
                vaultAddress === '0x' ||
                orgCoreAddress === '0x'
            ) {
                console.log('No organization found, redirecting to home');
                setContractPair({
                    vaultAddress: '0x0' as `0x${string}`,
                    orgCoreAddress: '0x0' as `0x${string}`,
                });
                setError('No organization found for this address');
                setIsLoading(false);

                setTimeout(() => {
                    router.replace('/');
                }, 1000);
                return;
            }

            console.log('Organization found, setting contract pair');
            setContractPair({
                vaultAddress,
                orgCoreAddress,
            });
            setError(null);
        } catch (err) {
            console.error('Error fetching contract pair:', err);

            let errorMessage = 'No organization found for this address';
            let shouldRedirect = false;

            if (err instanceof Error) {
                if (
                    err.message.includes('Contract not found') ||
                    err.message.includes('Entry point not found')
                ) {
                    errorMessage = 'Factory contract not accessible';
                    shouldRedirect = false;
                } else if (
                    err.message.includes('No organization found') ||
                    err.message.includes('0x0')
                ) {
                    errorMessage = 'No organization found for this address';
                    shouldRedirect = true;
                } else {
                    errorMessage = err.message;
                    shouldRedirect =
                        errorMessage.toLowerCase().includes('not found') ||
                        errorMessage.toLowerCase().includes('no organization');
                }
            }

            setError(errorMessage);
            setContractPair({
                vaultAddress: '0x0' as `0x${string}`,
                orgCoreAddress: '0x0' as `0x${string}`,
            });

            if (shouldRedirect) {
                console.log('No organization found (error), redirecting to home');
                setTimeout(() => {
                    router.replace('/');
                }, 1000);
            }
        } finally {
            setIsLoading(false);
        }
    }, [userAddress, isWalletConnected, factoryContract, router]);

    useEffect(() => {
        if (isWalletConnected && userAddress && factoryContract) {
            fetchContracts();
        }
    }, [fetchContracts, isWalletConnected, userAddress, factoryContract]);

    const contextValue: ContractPairContextType = useMemo(
        () => ({
            contractPair,
            isLoading,
            error,
            refetch: fetchContracts,
            hasOrganization,
        }),
        [contractPair, isLoading, error, fetchContracts, hasOrganization]
    );

    return (
        <ContractPairContext.Provider value={contextValue}>{children}</ContractPairContext.Provider>
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
