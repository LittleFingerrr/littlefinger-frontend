import React from 'react';
import { MetricCard as MetricCardType } from '@/lib/mockData';
import { Wallet, Clock, User } from 'lucide-react';

interface MetricCardProps {
  metric: MetricCardType;
}

const getIcon = (iconName: string) => {
  switch (iconName) {
    case 'wallet':
      return <Wallet className="w-8 h-8 text-white" />;
    case 'clock':
      return <Clock className="w-8 h-8 text-white" />;
    case 'users':
      return <User className="w-8 h-8 text-white" />;
    default:
      return <Wallet className="w-8 h-8 text-white" />;
  }
};

export default function MetricCard({ metric }: MetricCardProps) {
  return (
    <div className="relative rounded-lg p-6 overflow-hidden" style={{ backgroundColor: '#131313A6' }}>
      {/* Glow effect - only bottom-right corner */}
      <div className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full blur-xl" style={{ background: 'radial-gradient(circle, #F3A42C 0%, transparent 70%)' }}></div>
      
      {/* Content */}
      <div className="relative z-10">
        <h3 className="text-white font-bold text-sm mb-4">{metric.title}</h3>
        <div className="flex items-center space-x-3">
          {getIcon(metric.icon)}
          <span className="text-gray-300 text-2xl font-bold">{metric.value}</span>
        </div>
      </div>
    </div>
  );
} 