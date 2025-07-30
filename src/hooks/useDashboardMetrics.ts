import { useState, useEffect } from 'react';
import { useContract } from '@starknet-react/core';
import { useContractPair } from '@/app/(organization)/dashboard/ContractPairContext';
import { VAULTABI } from '@/lib/abi/vault-abi';
import { COREABI } from '@/lib/abi/core-abi';
import { uint256 } from 'starknet';


export interface DashboardMetrics {
  totalVaultBalance: string;
  nextPayoutDate: string;
  activeMembers: string;
}

export interface Disbursement {
  date: string;
  type: string;
  amount: string;
  recipients: string;
  status: string;
  txHash?: string;
}

export function useDashboardMetrics() {
  const { contractPair, isLoading: contractLoading } = useContractPair();
  const [metrics, setMetrics] = useState<DashboardMetrics>({
    totalVaultBalance: 'Loading...',
    nextPayoutDate: 'Loading...',
    activeMembers: 'Loading...'
  });
  const [disbursements, setDisbursements] = useState<Disbursement[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { contract: vaultContract } = useContract({
    abi: VAULTABI,
    address: contractPair.vaultAddress ? contractPair.vaultAddress : undefined,
  });

  const { contract: coreContract } = useContract({
    abi: COREABI,
    address: contractPair.orgCoreAddress ? contractPair.orgCoreAddress : undefined,
  });

  const fetchMetrics = async () => {
    if (!vaultContract || !coreContract || contractLoading) {
      return;
    }

    setIsLoading(true);
    setError(null);
    
    try {
      // Fetch vault balance
      const balanceResult = await vaultContract.get_balance();
      const balance = typeof balanceResult === 'object' ? uint256.uint256ToBN(balanceResult) : BigInt(balanceResult);
      const balanceInEth = (Number(balance) / 1e18).toFixed(2);

      // Fetch next payout date
      let nextPayoutDate = 'No payout date';
      try {
        const currentSchedule = await coreContract.get_next_disburse_time();
        nextPayoutDate = new Date(Number(currentSchedule) * 1000).toLocaleDateString();
      } catch (error) {
        console.log('No next disbursement time found');
      }

      // Fetch active members count
      let activeMembers = '0';
      try {
        const totalMembers = await coreContract.get_members();
        activeMembers = totalMembers.length.toString();
      } catch (error) {
        console.log('Error fetching member count:', error);
      }

      // No recent disbursements function available - return empty array
      setDisbursements([]);

      setMetrics({
        totalVaultBalance: `${balanceInEth} ETH`,
        nextPayoutDate,
        activeMembers
      });
    } catch (error) {
      console.error('Error fetching metrics:', error);
      setError('Failed to fetch metrics');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!contractLoading && vaultContract && coreContract) {
      fetchMetrics();
    }
  }, [contractLoading, vaultContract, coreContract]);

  return {
    metrics,
    disbursements,
    isLoading,
    error,
    refetch: fetchMetrics
  };
}