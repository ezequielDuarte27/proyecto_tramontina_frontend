import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface TarjetaKPIProps {
  titulo: string;
  valor: string;
  icono: React.ReactNode;
  tendencia: number;
}

const TarjetaKPI: React.FC<TarjetaKPIProps> = ({ titulo, valor, icono, tendencia }) => {
  const colorTendencia = tendencia >= 0 ? 'text-green-500' : 'text-red-500';
  const IconoTendencia = tendencia >= 0 ? ArrowUpRight : ArrowDownRight;

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-700">{titulo}</h3>
        <div className="text-gray-400">{icono}</div>
      </div>
      <div className="flex items-baseline justify-between">
        <p className="text-2xl font-bold">{valor}</p>
        <div className={`flex items-center ${colorTendencia}`}>
          <IconoTendencia size={20} />
          <span className="ml-1">{Math.abs(tendencia)}%</span>
        </div>
      </div>
    </div>
  );
};

export default TarjetaKPI;