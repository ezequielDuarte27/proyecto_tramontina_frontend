import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface GraficoProps {
  titulo: string;
  tipo: 'barras' | 'pie';
  data: any[];
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

// Ajustamos la función de formato
const formatoGuaranies = (valor: number) => {
  if (valor === 0) return 'Gs 0';
  return `Gs ${valor}`;
};

const Grafico: React.FC<GraficoProps> = ({ titulo, tipo, data }) => {
  if (tipo === 'barras') {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">{titulo}</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="mes" />

             {/* Aseguramos que el eje Y tenga el formato correcto */}
             <YAxis tickFormatter={(value: number) => formatoGuaranies(value)} />
            
            {/* El tooltip también debe formatear correctamente los valores */}
            <Tooltip formatter={(value: number) => `Gs ${value.toLocaleString()}`} />

            {/* <YAxis tickFormatter={formatoGuaranies} />
            <Tooltip formatter={formatoGuaranies} /> */}
            <Legend />
            <Bar dataKey="ingresos" fill="#8884d8" name="Ingresos" />
            <Bar dataKey="egresos" fill="#82ca9d" name="Gastos" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  } else if (tipo === 'pie') {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">{titulo}</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={100}
              fill="#8884d8"
              dataKey="cantidad"
              nameKey="nombre"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => `${value} unidades`} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    );
  }

  return null;
};

export default Grafico;