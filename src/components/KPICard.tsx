import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface KPICardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend: number;
}

const KPICard: React.FC<KPICardProps> = ({ title, value, icon, trend }) => {
  const trendColor = trend >= 0 ? 'text-green-500' : 'text-red-500';
  const TrendIcon = trend >= 0 ? ArrowUpRight : ArrowDownRight;

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
        <div className="text-gray-400">{icon}</div>
      </div>
      <div className="flex items-baseline justify-between">
        <p className="text-2xl font-bold">{value}</p>
        <div className={`flex items-center ${trendColor}`}>
          <TrendIcon size={20} />
          <span className="ml-1">{Math.abs(trend)}%</span>
        </div>
      </div>
    </div>
  );
};

export default KPICard;