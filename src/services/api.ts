import axios from 'axios';
import { Metrics, MetricsSchema } from '../types/metrics';

const API_BASE_URL = 'http://127.0.0.1:8000/indicadores_combinados/';
const UPDATE_TASA_CRECIMIENTO_URL = 'http://127.0.0.1:8000/actualizar_tasacrecimiento/';

export const fetchMetrics = async (): Promise<Metrics> => {
  const response = await axios.get(API_BASE_URL);
  console.log(response.data);
  return MetricsSchema.parse(response.data);
};

export const updateTasaCrecimiento = async (): Promise<void> => {
  try {
    await axios.post(UPDATE_TASA_CRECIMIENTO_URL);
    console.log('Tasa de crecimiento actualizada correctamente');
  } catch (error) {
    console.error('Error al actualizar la tasa de crecimiento:', error);
    throw error;
  }
};
