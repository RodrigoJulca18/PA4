// ============================================================
// courseService (Usuario 2) - capa de modelo
// Llamadas a la API relacionadas con cursos.
// ============================================================

import httpClient from './httpClient.js';
import { normalizeCourse } from '../models/types.js';

/**
 * Obtiene la lista de cursos. Acepta filtros opcionales.
 * @param {{ search?: string, category?: string }} [params]
 * @returns {Promise<import('../models/types.js').Course[]>}
 */
export async function getCourses(params = {}) {
  // Eliminamos parametros vacios para no ensuciar la query string.
  const query = {};
  if (params.search) query.search = params.search;
  if (params.category) query.category = params.category;

  const { data } = await httpClient.get('/courses', { params: query });
  return Array.isArray(data) ? data.map(normalizeCourse) : [];
}

/**
 * Obtiene el detalle de un curso por su id.
 * @param {string} id
 * @returns {Promise<import('../models/types.js').Course>}
 */
export async function getCourseById(id) {
  const { data } = await httpClient.get(`/courses/${id}`);
  return normalizeCourse(data);
}
