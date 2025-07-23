import React from 'react';
import { Disbursement } from '@/lib/mockData';

interface DisbursementsTableProps {
  disbursements: Disbursement[];
}

export default function DisbursementsTable({ disbursements }: DisbursementsTableProps) {
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
          <div className="min-w-[800px]">
            <div className="grid grid-cols-5 gap-4 text-xs font-medium text-white uppercase tracking-wider">
              <div>Date</div>
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
            <div className="min-w-[800px]">
              {disbursements.map((disbursement, index) => (
                <div key={index} className="grid grid-cols-5 gap-4 py-4">
                  <div className="text-sm text-white">{disbursement.date}</div>
                  <div className="text-sm text-white">{disbursement.amount}</div>
                  <div className="text-sm text-white">{disbursement.recipients}</div>
                  <div>
                    <span 
                      className="inline-flex px-3 py-1 text-xs font-medium rounded-full text-white"
                      style={{ backgroundColor: '#6B4F3B' }}
                    >
                      {disbursement.status}
                    </span>
                  </div>
                  <div>
                    <button className="text-sm text-white hover:text-gray-300 transition-colors">
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 