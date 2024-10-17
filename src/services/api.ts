import axios from 'axios';
import { Metrics, MetricsSchema } from '../types/metrics';

const API_BASE_URL = 'http://localhost:8000/api';

export const fetchMetrics = async (): Promise<Metrics> => {
  const response = await axios.get(`${API_BASE_URL}/metricas/`);
  return MetricsSchema.parse(response.data);
};