import React from 'react';

interface ChartProps {
  title: string;
}

const Chart: React.FC<ChartProps> = ({ title }) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold text-gray-700 mb-4">{title}</h3>
      <div className="h-64 flex items-center justify-center bg-gray-100 rounded">
        <p className="text-gray-500">Chart placeholder</p>
      </div>
    </div>
  );
};

export default Chart;