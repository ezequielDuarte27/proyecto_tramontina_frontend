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
});

export type Metrics = z.infer<typeof MetricsSchema>;