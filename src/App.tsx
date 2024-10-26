import { useEffect, useState } from 'react';
import { BarChart3, DollarSign, TrendingUp, ShoppingCart, Users, Boxes, LineChart, AlertCircle } from 'lucide-react';
import Encabezado from './components/Encabezado';
import TarjetaKPI from './components/TarjetaKPI';
import { MetricCard } from './components/MetricCard';
import Grafico from './components/Grafico';
import { fetchMetrics } from './services/api';
import { Metrics, mockMetrics } from './types/metrics';

function App() {
  const [metrics, setMetrics] = useState<Metrics | null>(null);

  useEffect(() => {
    const loadMetrics = async () => {
      try {
        const data = await fetchMetrics();
        setMetrics(data);
      } catch (error) {
        console.error('Error fetching metrics:', error);
      }
    };

    loadMetrics();
  }, []);

  if (!metrics) {
    return <div>Loading...</div>;
  }

  const ultimoMes = metrics.ingresos_egresos_mensuales[metrics.ingresos_egresos_mensuales.length - 1];
  const ingresosTotales = ultimoMes.ingresos;
  const egresosTotales = ultimoMes.egresos;

  return (
    <div className="min-h-screen bg-gray-100">
      <Encabezado />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Panel de Control de Rendimiento Empresarial de Tramontina</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <TarjetaKPI titulo="Ingresos Totales" valor={`Gs ${ingresosTotales.toLocaleString()}`} icono={<DollarSign />} tendencia={5.2} />
          <TarjetaKPI titulo="Gastos Totales" valor={`Gs ${egresosTotales.toLocaleString()}`} icono={<BarChart3 />} tendencia={-2.1} />
          <TarjetaKPI titulo="Tasa de Crecimiento" valor={`${metrics.tasa_crecimiento.toFixed(2)}%`} icono={<TrendingUp />} tendencia={0.5} />
          <TarjetaKPI titulo="Pedidos Totales" valor={metrics.pedidos_totales.toString()} icono={<ShoppingCart />} tendencia={7.8} />
        </div>

        {/* KPIs Adicionales */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Proveedores Activos"
            value={mockMetrics.kpis_adicionales.proveedores_activos}
            icon={<Users className="text-indigo-600" />}
          />
          <MetricCard
            title="Productos en Stock"
            value={mockMetrics.kpis_adicionales.productos_en_stock}
            icon={<Boxes className="text-cyan-600" />}
          />
          {/* <MetricCard
            title="Retorno de Inversión"
            value={`${mockMetrics.kpis_adicionales.roi}%`}
            icon={<LineChart className="text-emerald-600" />}
          /> */}
          <MetricCard
            title="Pagos Pendientes"
            value={`Gs ${mockMetrics.kpis_adicionales.pagos_pendientes.toLocaleString()}`}
            icon={<AlertCircle className="text-red-600" />}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Grafico titulo="Ingresos vs Gastos" tipo="barras" data={metrics.ingresos_egresos_mensuales} />
          <Grafico titulo="Productos Más Vendidos" tipo="pie" data={metrics.productos_mas_vendidos} />
        </div>
      </main>
    </div>
  );
}

export default App;