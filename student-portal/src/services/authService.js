// ============================================================
// authService (Usuario 1)
// Capa de modelo: encapsula las llamadas de autenticacion a la API.
// ============================================================

import httpClient from './httpClient.js';

/**
 * Inicia sesion con email y password.
 * @param {{ email: string, password: string }} credentials
 * @returns {Promise<{ token: string, user: { id, name, email } }>}
 */
export async function login(credentials) {
  const { data } = await httpClient.post('/auth/login', credentials);
  return data;
}

/**
 * Obtiene el perfil del usuario autenticado (usa el token Bearer).
 * @returns {Promise<{ id, name, email }>}
 */
export async function getProfile() {
  const { data } = await httpClient.get('/auth/me');
  return data;
}
