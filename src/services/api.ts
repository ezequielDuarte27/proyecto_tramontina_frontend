import axios from 'axios';
import { Metrics, MetricsSchema } from '../types/metrics';

const API_BASE_URL = 'http://127.0.0.1:8000/indicadores_combinados/';

export const fetchMetrics = async (): Promise<Metrics> => {
  const response = await axios.get(API_BASE_URL);
  console.log(response.data);
  return MetricsSchema.parse(response.data);
};