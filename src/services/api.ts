import axios from 'axios';
import { Metrics, MetricsSchema } from '../types/metrics';

const API_BASE_URL = 'http://127.0.0.1:8000/indicadores_combinados/';
const UPDATE_TASA_CRECIMIENTO_URL = 'http://127.0.0.1:8000/actualizar_tasacrecimiento/';

export const client = axios.create({
  baseURL: "http://127.0.0.1:8000"
});

export interface LoginData {
  email: string;
  password: string;
}

export const authApi = {
  login: (data: LoginData) => {
    // Simulación de respuesta del backend
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (data.email === "user@tramontina.com" && data.password === "password123") {
          resolve({ message: "Login exitoso", user: { id: 1, email: data.email } });
        } else {
          reject(new Error("Credenciales inválidas"));
        }
      }, 1000); // Simula 1 segundo de tiempo de respuesta
    });
  },

  logout: () => client.post("/api/logout", { withCredentials: true }),
  
  getCurrentUser: () => {
    // Simula una solicitud para obtener al usuario actual
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ id: 1, email: "user@tramontina.com" });
      }, 500); // Simula 0.5 segundos de tiempo de respuesta
    });
  },
};

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
