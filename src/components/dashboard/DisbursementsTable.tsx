import React from 'react';
import { Disbursement } from '@/hooks/useDashboardMetrics';
import { ArrowUpRightIcon } from 'lucide-react';
import { contractAddressToHex, shortenAddress } from '@/lib/utils';

interface DisbursementsTableProps {
  disbursements: Disbursement[];
}

const getTransactionTypeColor = (type: string) => {
  if (!type) return 'text-gray-400';
  
  switch (type.toUpperCase()) {
    case 'PAYMENT':
      return 'text-green-400';
    case 'DEPOSIT':
      return 'text-blue-400';
    case 'WITHDRAWAL':
      return 'text-red-400';
    case 'BONUS_ALLOCATION':
      return 'text-yellow-400';
    default:
      return 'text-gray-400';
  }
};

export default function DisbursementsTable({ disbursements }: DisbursementsTableProps) {
  const explorerUrl = process.env.NEXT_PUBLIC_EXPLORER_URL || 'https://sepolia.voyager.online/';
  return (
    <div className="relative rounded-lg overflow-hidden" style={{ backgroundColor: '#131313A6' }}>
      {/* Multiple glow effects */}
      <div className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full blur-xl" style={{ background: 'radial-gradient(circle, #F3A42C 0%, transparent 70%)' }}></div>
      <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full blur-xl" style={{ background: 'radial-gradient(circle, #F3A42C 0%, transparent 70%)' }}></div>
      <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full blur-xl" style={{ background: 'radial-gradient(circle, #F3A42C 0%, transparent 70%)' }}></div>
      
      {/* Content */}
      <div className="relative z-10">
        <div className="px-6 py-4">
          <h2 className="text-xl font-bold text-white">Recent Disbursement</h2>
        </div>
        
        {/* Fixed Header */}
        <div className="px-6 py-3 overflow-x-auto">
          <div className="min-w-[900px]">
            <div className="grid grid-cols-6 gap-4 text-xs font-medium text-white uppercase tracking-wider">
              <div>Date</div>
              <div>Type</div>
              <div>Amount</div>
              <div>Recipients</div>
              <div>Status</div>
              <div>Actions</div>
            </div>
          </div>
        </div>
        
        {/* Scrollable Data */}
        <div className="overflow-y-auto table-scroll" style={{ maxHeight: 'calc(100vh - 405px)' }}>
          <div className="px-6 overflow-x-auto">
            <div className="min-w-[900px]">
              {disbursements.length > 0 ? (
                disbursements.map((disbursement, index) => (
                  <div key={index} className="grid grid-cols-6 gap-4 py-4">
                    <div className="text-sm text-white">{disbursement.date}</div>
                    <div className={`text-sm font-medium ${getTransactionTypeColor(disbursement.type)}`}>
                      {disbursement.type}
                    </div>
                    <div className="text-sm text-white">{disbursement.amount}</div>
                    <div className="text-sm text-white">{shortenAddress(disbursement.recipients)}</div>
                    <div>
                      <span 
                        className="inline-flex px-3 py-1 text-xs font-medium rounded-full text-white"
                        style={{ backgroundColor: '#6B4F3B' }}
                      >
                        {disbursement.status}
                      </span>
                    </div>
                    <div>
                      <button onClick={() => window.open(`${explorerUrl}tx/${contractAddressToHex(disbursement.txHash)}`, '_blank')} className="text-sm flex items-center gap-2 text-white hover:text-gray-300 transition-colors">
                        View Details <ArrowUpRightIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-8 text-center">
                  <div className="text-gray-400 text-sm">No transactions found</div>
                  <div className="text-gray-500 text-xs mt-1">Transaction history will appear here</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 