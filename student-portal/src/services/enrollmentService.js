// ============================================================
// enrollmentService (Usuario 2) - capa de modelo
// Llamadas a la API relacionadas con inscripciones (requieren token).
// ============================================================

import httpClient from './httpClient.js';

/**
 * Obtiene las inscripciones del usuario autenticado.
 * @returns {Promise<import('../models/types.js').Enrollment[]>}
 */
export async function getMyEnrollments() {
  const { data } = await httpClient.get('/enrollments');
  return Array.isArray(data) ? data : [];
}

/**
 * Inscribe al usuario en un curso.
 * @param {string} courseId
 * @returns {Promise<import('../models/types.js').Enrollment>}
 */
export async function enroll(courseId) {
  const { data } = await httpClient.post('/enrollments', { courseId });
  return data;
}

/**
 * Cancela una inscripcion por su id.
 * @param {string} enrollmentId
 * @returns {Promise<void>}
 */
export async function unenroll(enrollmentId) {
  await httpClient.delete(`/enrollments/${enrollmentId}`);
}
