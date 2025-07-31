"use client";

import React from 'react';
import MetricCard from './MetricCard';
import DisbursementsTable from './DisbursementsTable';

import { useDashboardMetrics } from '@/hooks/useDashboardMetrics';

export default function Dashboard() {
  const { metrics, disbursements, isLoading, error } = useDashboardMetrics();
  
  const realMetrics = [
    {
      title: "Total Vault Balance",
      value: metrics.totalVaultBalance,
      icon: "wallet"
    },
    {
      title: "Next Payout Date",
      value: metrics.nextPayoutDate,
      icon: "clock"
    },
    {
      title: "Active Members",
      value: metrics.activeMembers,
      icon: "users"
    }
  ];

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {realMetrics.map((metric) => (
            <MetricCard key={metric.title} metric={metric} />
          ))}
        </div>
        <div className="text-center py-8">
          <div className="text-gray-400">Loading disbursement data...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {realMetrics.map((metric) => (
            <MetricCard key={metric.title} metric={metric} />
          ))}
        </div>
        <div className="text-center py-8">
          <div className="text-red-400">Error loading disbursement data: {error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {realMetrics.map((metric) => (
          <MetricCard key={metric.title} metric={metric} />
        ))}
      </div>

      {/* Disbursements Table */}
      <DisbursementsTable disbursements={disbursements} />
    </div>
  );
} 