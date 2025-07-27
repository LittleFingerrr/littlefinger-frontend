"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAccount } from "@starknet-react/core";
import { Sidebar } from "@/components/sidebar/index";
import { Header } from "@/components/header";
import { ContractPairProvider, useContractPair } from "./ContractPairContext";
import { OrganizationNotFound } from "@/components/OrganizationNotFound";
import { RefreshCw } from 'lucide-react';

// Main content component that uses the context
const DashboardContent = ({ children }: { children: React.ReactNode }) => {
  const { isLoading, hasOrganization, error, refetch } = useContractPair();
  const { isConnected } = useAccount();
  const router = useRouter();


  const handleConnectWallet = () => {
    console.log('Connect wallet clicked - handled by existing component');
  };

  const handleRetry = () => {
    console.log('Retry clicked');
    refetch();
  };

  const handleGoHome = () => {
    router.replace('/');
  };

  if (!isConnected) {
    return (
      <OrganizationNotFound
        message="Please connect your wallet to access the dashboard"
        isWalletConnected={false}
        onConnectWallet={handleConnectWallet}
        onGoHome={handleGoHome}
      />
    );
  }

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

  if (hasOrganization) {
    return <>{children}</>;
  }

  return (
    <OrganizationNotFound
      message={error || "No organization found for this address"}
      isWalletConnected={true}
      onRetry={handleRetry}
      onGoHome={handleGoHome}
    />
  );
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isCollapsed, setCollapsed] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <ContractPairProvider>
      <div className="flex min-h-screen w-full bg-secondary">
        <Sidebar
          isCollapsed={isCollapsed}
          isMobileMenuOpen={isMobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
        />
        <div
          className={`
            flex h-screen flex-col w-full transition-all duration-300 overflow-hidden ease-in-out relative
            ${!isCollapsed ? "lg:ml-64" : "lg:ml-20"}
          `}
        >
          <div className="absolute w-[10%] h-48 -top-12 -right-12 bg-primary-glow rounded-[5.53125rem] blur-[3.125rem]" />
          <Header
            onMenuClick={() => setMobileMenuOpen(true)}
            onToggleCollapse={() => setCollapsed(!isCollapsed)}
            isCollapsed={isCollapsed}
          />
          <main className="flex-grow p-6 overflow-y-auto scrollbar-hide">
            <DashboardContent>
              {children}
            </DashboardContent>
          </main>
        </div>
      </div>
    </ContractPairProvider>
  );
}