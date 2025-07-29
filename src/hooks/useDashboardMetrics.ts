import { useState, useEffect } from 'react';
import { useContract } from '@starknet-react/core';
import { useContractPair } from '@/app/(organization)/dashboard/ContractPairContext';
import { VAULTABI } from '@/lib/abi/vault-abi';
import { COREABI } from '@/lib/abi/core-abi';
import { uint256 } from 'starknet';
import { contractAddressToHex, getTokenNameFromAddress } from '@/lib/utils';


export interface DashboardMetrics {
  totalVaultBalance: string;
  nextPayoutDate: string;
  activeMembers: string;
}

export interface Disbursement {
  date: string;
  amount: string;
  recipients: string;
  status: 'completed' | 'pending' | 'failed';
  txHash?: string;
  type: string;
  token: string;
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

      // Fetch disbursement history from vault
      let disbursementHistory: Disbursement[] = [];
      try {
        const transactionHistory = await vaultContract.get_transaction_history();
        
        
        disbursementHistory = transactionHistory.map((tx: any) => {
          const amount = typeof tx.amount === 'object' ? 
            uint256.uint256ToBN(tx.amount) : BigInt(tx.amount);
          const amountInEth = (Number(amount) / 1e18).toFixed(2);
          
          const tokenName = getTokenNameFromAddress(contractAddressToHex(tx.token));
          
          let transactionType = 'Unknown';
          if (tx.transaction_type) {
            if (tx.transaction_type.variant) {
              const variant = tx.transaction_type.variant;
              if (variant.DEPOSIT !== undefined) {
                transactionType = 'DEPOSIT';
              } else if (variant.WITHDRAWAL !== undefined) {
                transactionType = 'WITHDRAWAL';
              } else if (variant.PAYMENT !== undefined) {
                transactionType = 'PAYMENT';
              } else if (variant.BONUS_ALLOCATION !== undefined) {
                transactionType = 'BONUS_ALLOCATION';
              }
            } else if (typeof tx.transaction_type === 'string') {
              transactionType = tx.transaction_type;
            } else if (tx.transaction_type.PAYMENT !== undefined) {
              transactionType = 'PAYMENT';
            } else if (tx.transaction_type.DEPOSIT !== undefined) {
              transactionType = 'DEPOSIT';
            } else if (tx.transaction_type.WITHDRAWAL !== undefined) {
              transactionType = 'WITHDRAWAL';
            } else if (tx.transaction_type.BONUS_ALLOCATION !== undefined) {
              transactionType = 'BONUS_ALLOCATION';
            } else if (Object.keys(tx.transaction_type).length === 0) {
              transactionType = 'PAYMENT'; 
            }
          }
          
          return {
            date: new Date(Number(tx.timestamp) * 1000).toLocaleString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit'
            }),
            amount: `${amountInEth} ${tokenName}`,
            recipients: '1', //this should be added to the contract return value
            status: 'completed' as const,
            txHash: tx.tx_hash,
            type: transactionType,
            token: tokenName
          };
        }).slice(0, 10);
      } catch (error) {
        console.log('Error fetching transaction history:', error);
      }

      setMetrics({
        totalVaultBalance: `${balanceInEth} ETH`,
        nextPayoutDate,
        activeMembers
      });

      setDisbursements(disbursementHistory);
    } catch (error) {
      console.error('Error fetching dashboard metrics:', error);
      setError('Failed to fetch dashboard metrics');
      setMetrics({
        totalVaultBalance: 'NaN',
        nextPayoutDate: 'NaN',
        activeMembers: 'NaN'
      });
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