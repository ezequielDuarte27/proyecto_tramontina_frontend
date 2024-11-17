import { z } from 'zod';

export const MetricsSchema = z.object({
  ingresos_egresos_mensuales: z.array(
    z.object({
      mes: z.string().default(""),
      ingresos: z.number().default(0),
      egresos: z.number().default(0),
    })
  ).default([]), // Array vacío como valor predeterminado
  tasa_crecimiento: z.number().default(0),
  pedidos_totales: z.number().default(0),
  productos_mas_vendidos: z.array(
    z.object({
      nombre: z.string().default(""),
      cantidad: z.number().default(0),
    })
  ).default([]), // Array vacío como valor predeterminado
  pagos_pendientes: z.number().default(0),
  proveedores_activos: z.number().default(0),
  stock_productos: z.number().default(0),
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

// Función para validar los datos, aplicando valores predeterminados
export const validateMetrics = (data: unknown): Metrics => {
  return MetricsSchema.parse(data); // Esto asigna valores predeterminados a los campos faltantes
};


// export const mockMetrics: MetricsAdicionales = {
//   kpis_adicionales: {
//     proveedores_activos: 45,
//     productos_en_stock: 1200,
//     roi: 32.5,
//     pagos_pendientes: 75000,
//   }
// };