// ============================================================
// adminService - capa de modelo (requiere token de administrador)
// Llamadas a la API para la gestion de cursos (CRUD) y la consulta de
// inscripciones por usuario. El token Bearer ya lo inyecta httpClient.
// ============================================================

import httpClient from './httpClient.js';
import { normalizeCourse } from '../models/types.js';

/**
 * Crea un nuevo curso.
 * @param {Object} data { title, description, category, credits, instructor, schedule, capacity, imageUrl }
 * @returns {Promise<import('../models/types.js').Course>}
 */
export async function createCourse(data) {
  const { data: created } = await httpClient.post('/courses', data);
  return normalizeCourse(created);
}

/**
 * Actualiza un curso existente (datos parciales, incluida la capacidad).
 * @param {string} id
 * @param {Object} data
 * @returns {Promise<import('../models/types.js').Course>}
 */
export async function updateCourse(id, data) {
  const { data: updated } = await httpClient.put(`/courses/${id}`, data);
  return normalizeCourse(updated);
}

/**
 * Elimina un curso por su id.
 * @param {string} id
 * @returns {Promise<{ message: string }>}
 */
export async function deleteCourse(id) {
  const { data } = await httpClient.delete(`/courses/${id}`);
  return data;
}

/**
 * Obtiene todas las inscripciones agrupadas por usuario.
 * @returns {Promise<Array<{ user: { id, name, email }, enrollments: Array<{ id, courseId, courseTitle, status, date }> }>>}
 */
export async function getAllEnrollments() {
  const { data } = await httpClient.get('/admin/enrollments');
  return Array.isArray(data) ? data : [];
}
