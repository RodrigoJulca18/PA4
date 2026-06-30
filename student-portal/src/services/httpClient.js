// ============================================================
// httpClient (Usuario 1)
// Instancia central de axios usada por todos los servicios.
// Incluye interceptores para inyectar el token y manejar el 401.
// ============================================================

import axios from 'axios';
import { getToken, clearToken } from '../utils/tokenStorage.js';

// La URL base se toma de la variable de entorno VITE_API_URL.
const baseURL =
  import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

const httpClient = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor de peticion: inyecta el token Bearer si existe.
httpClient.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor de respuesta: si el backend responde 401 (no autorizado)
// limpiamos la sesion local. La redireccion la maneja la capa de UI
// (AuthContext / ProtectedRoute) al detectar que ya no hay token.
httpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      clearToken();
    }
    return Promise.reject(error);
  }
);

export default httpClient;
