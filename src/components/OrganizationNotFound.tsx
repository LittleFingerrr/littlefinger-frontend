import React from 'react';
import { AlertCircle, RefreshCw, Wallet, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ConnectWallet } from './connect-wallet';

interface OrganizationNotFoundProps {
  onRetry?: () => void;
  onConnectWallet?: () => void;
  onGoHome?: () => void;
  message?: string;
  isWalletConnected?: boolean;
}

export const OrganizationNotFound: React.FC<OrganizationNotFoundProps> = ({
  onRetry,
  onConnectWallet,
  onGoHome,
  message = "No organization found",
  isWalletConnected = false
}) => {
  return (
    <div className="flex items-center justify-center min-h-[400px] p-6">
      <Card className="max-w-md w-full bg-[#131313A6] border-[#967623] rounded-3xl">
        <CardContent className="p-8 text-center">
          <div className="flex justify-center mb-4">
            {!isWalletConnected ? (
              <Wallet className="w-16 h-16  text-[#967623]" />
            ) : (
              <AlertCircle className="w-16 h-16 text-[#967623]" />
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
            {/* Primary action button */}
            {!isWalletConnected && onConnectWallet ? (
              <ConnectWallet className='w-full'/>
            ) : onRetry ? (
              <Button
                onClick={onRetry}
                className="w-full bg-[#967623] hover:bg-[#967623]/80 text-white rounded-3xl"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Try Again
              </Button>
            ) : null}

            {onGoHome && (
              <Button
                onClick={onGoHome}
                variant="outline"
                className="w-full border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white rounded-3xl"
              >
                <Home className="w-4 h-4 mr-2" />
                Go Home
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};