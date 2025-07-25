import React from 'react';
import { useContractPair } from './ContractPairContext'; // Adjust path as needed
import { OrganizationNotFound } from '@/components/OrganizationNotFound';
import { RefreshCw } from 'lucide-react';

interface DashboardContentWrapperProps {
  children: React.ReactNode;
  userAddress?: string;
  isWalletConnected: boolean;
  onConnectWallet?: () => void;
}

const DashboardContentWrapper: React.FC<DashboardContentWrapperProps> = ({
  children,
  userAddress,
  isWalletConnected,
  onConnectWallet
}) => {
  const { contractPair, isLoading, error, refetch } = useContractPair();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 animate-spin text-blue-500 mx-auto mb-4" />
          <p className="text-gray-400">Loading organization contracts...</p>
        </div>
      </div>
    );
  }

  if (error || (!contractPair.vaultAddress && !contractPair.orgCoreAddress)) {
    return (
      <OrganizationNotFound
        message={error || "No organization found"}
        onRetry={refetch}
        onConnectWallet={onConnectWallet}
        isWalletConnected={isWalletConnected}
      />
    );
  }

  return <>{children}</>;
};

export default DashboardContentWrapper;