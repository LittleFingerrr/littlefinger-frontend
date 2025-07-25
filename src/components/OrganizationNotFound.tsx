import React from 'react';
import { AlertCircle, RefreshCw, Wallet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface OrganizationNotFoundProps {
  onRetry?: () => void;
  onConnectWallet?: () => void;
  message?: string;
  isWalletConnected?: boolean;
}

export const OrganizationNotFound: React.FC<OrganizationNotFoundProps> = ({
  onRetry,
  onConnectWallet,
  message = "No organization found",
  isWalletConnected = false
}) => {
  return (
    <div className="flex items-center justify-center min-h-[400px] p-6">
      <Card className="max-w-md w-full bg-gray-900 border-gray-700">
        <CardContent className="p-8 text-center">
          <div className="flex justify-center mb-4">
            {!isWalletConnected ? (
              <Wallet className="w-16 h-16 text-blue-500" />
            ) : (
              <AlertCircle className="w-16 h-16 text-yellow-500" />
            )}
          </div>
          
          <h3 className="text-xl font-semibold text-white mb-2">
            {!isWalletConnected ? 'Connect Your Wallet' : 'Organization Not Found'}
          </h3>
          
          <p className="text-gray-400 mb-6">
            {!isWalletConnected 
              ? 'Please connect your wallet to access your organization dashboard.'
              : `${message}. Make sure your connected address has access to an organization.`
            }
          </p>
          
          <div className="space-y-3">
            {!isWalletConnected && onConnectWallet ? (
              <Button
                onClick={onConnectWallet}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Wallet className="w-4 h-4 mr-2" />
                Connect Wallet
              </Button>
            ) : onRetry ? (
              <Button
                onClick={onRetry}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Try Again
              </Button>
            ) : null}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
