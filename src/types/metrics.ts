import { z } from 'zod';

export const MetricsSchema = z.object({
  ingresos_egresos_mensuales: z.array(
    z.object({
      mes: z.string(),
      ingresos: z.number(),
      egresos: z.number(),
    })
  ),
  tasa_crecimiento: z.number(),
  pedidos_totales: z.number(),
  productos_mas_vendidos: z.array(
    z.object({
      nombre: z.string(),
      cantidad: z.number(),
    })
  ),
  pagos_pendientes: z.number(),
  proveedores_activos: z.number(),
  stock_productos: z.number()
});


// export const MetricsAdicionales = z.object({
//   kpis_adicionales: z.object({
//     proveedores_activos: z.number(),
//     productos_en_stock: z.number(),
//     roi: z.number(),
//     pagos_pendientes: z.number(),
//   }),
// })

export type Metrics = z.infer<typeof MetricsSchema>;
// export type MetricsAdicionales = z.infer<typeof MetricsAdicionales>;


// export const mockMetrics: MetricsAdicionales = {
//   kpis_adicionales: {
//     proveedores_activos: 45,
//     productos_en_stock: 1200,
//     roi: 32.5,
//     pagos_pendientes: 75000,
//   }
// };