import { useEffect, useState } from 'react';
import { BarChart3, DollarSign, TrendingUp, ShoppingCart, Users, Boxes, AlertCircle } from 'lucide-react';
import Encabezado from './components/Encabezado';
import TarjetaKPI from './components/TarjetaKPI';
import { MetricCard } from './components/MetricCard';
import Grafico from './components/Grafico';
import { fetchMetrics, updateTasaCrecimiento } from './services/api';
import { Metrics, validateMetrics } from './types/metrics';

function App() {
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [loading, setLoading] = useState<boolean>(false); // Estado para manejar la carga

  const loadMetrics = async () => {
    setLoading(true); // Activar indicador de carga
    try {
      await updateTasaCrecimiento(); // Llamar al nuevo endpoint antes de cargar métricas
      const data = await fetchMetrics();
      const validatedMetrics = validateMetrics(data); // Validar y aplicar valores predeterminados
      setMetrics(validatedMetrics);
    } catch (error) {
      console.error('Error fetching metrics:', error);
    } finally {
      setLoading(false); // Desactivar indicador de carga
    }
  };

  // Cargar datos al montar el componente
  useEffect(() => {
    loadMetrics();
  }, []);

  if (!metrics) {
    return <div>Loading...</div>;
  }

  // Verifica que ingresos_egresos_mensuales tenga al menos un elemento antes de acceder a él
  const ultimoMes = metrics.ingresos_egresos_mensuales?.[metrics.ingresos_egresos_mensuales.length - 1] || { ingresos: 0, egresos: 0 };
  const ingresosTotales = ultimoMes.ingresos ?? 0; // Usa valor predeterminado de 0 si es undefined
  const egresosTotales = ultimoMes.egresos ?? 0; // Usa valor predeterminado de 0 si es undefined

  return (
    <div className="min-h-screen bg-gray-100">
      <Encabezado />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Panel de Control de Rendimiento Empresarial de Tramontina</h1>

        {/* Botón para refrescar los datos */}
        <div className="mb-8 text-right">
          <button
            onClick={loadMetrics}
            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
            disabled={loading} // Desactiva el botón mientras se cargan datos
          >
            {loading ? 'Cargando...' : 'Refrescar Datos'}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <TarjetaKPI titulo="Ingresos Totales" valor={`Gs ${ingresosTotales.toLocaleString()}`} icono={<DollarSign />} tendencia={5.2} />
          <TarjetaKPI titulo="Gastos Totales" valor={`Gs ${egresosTotales.toLocaleString()}`} icono={<BarChart3 />} tendencia={-2.1} />
          <TarjetaKPI titulo="Tasa de Crecimiento" valor={`${metrics.tasa_crecimiento.toFixed(2)}%`} icono={<TrendingUp />} tendencia={0.5} />
          <TarjetaKPI titulo="Pedidos Totales" valor={metrics.pedidos_totales.toString()} icono={<ShoppingCart />} tendencia={7.8} />
        </div>

        {/* KPIs Adicionales */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <MetricCard
            title="Proveedores Activos"
            value={metrics.proveedores_activos}
            icon={<Users className="text-indigo-600" />}
          />
          <MetricCard
            title="Productos en Stock"
            value={metrics.stock_productos}
            icon={<Boxes className="text-cyan-600" />}
          />
          <MetricCard
            title="Pagos Pendientes"
            value={`Gs ${metrics.pagos_pendientes}`}
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
