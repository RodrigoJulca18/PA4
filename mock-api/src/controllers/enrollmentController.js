// Controlador de inscripciones.
// Todas las rutas requieren autenticacion (req.user proviene del middleware requireAuth).

import {
  listByUser,
  create,
  remove as removeEnrollment,
  listGroupedByUser,
} from '../services/enrollmentService.js';

// GET /api/enrollments
// Respuesta: 200 [Enrollment] (solo las inscripciones del usuario actual)
export function list(req, res) {
  const result = listByUser(req.user.id);
  return res.status(200).json(result);
}

// POST /api/enrollments
// body: { courseId }
// Respuestas: 201 Enrollment | 409 { message } si ya esta inscrito
// Los errores controlados (404/409) se delegan al manejador de errores via next.
export function add(req, res, next) {
  try {
    const { courseId } = req.body || {};
    if (courseId === undefined || courseId === null) {
      return res
        .status(400)
        .json({ message: 'El campo courseId es obligatorio.' });
    }
    const enrollment = create(req.user.id, courseId);
    return res.status(201).json(enrollment);
  } catch (err) {
    return next(err);
  }
}

// DELETE /api/enrollments/:id
// Respuestas: 200 { message } | 404
export function remove(req, res, next) {
  try {
    removeEnrollment(req.user.id, req.params.id);
    return res.status(200).json({ message: 'Inscripcion eliminada correctamente.' });
  } catch (err) {
    return next(err);
  }
}

// GET /api/admin/enrollments (requiere requireAuth + requireAdmin)
// Devuelve todas las inscripciones agrupadas por usuario, incluyendo
// la informacion del usuario y el titulo de cada curso.
// Respuesta: 200 [ { user, enrollments: [ { id, courseId, courseTitle, status, date } ] } ]
export function listAllGrouped(req, res) {
  const result = listGroupedByUser();
  return res.status(200).json(result);
}

export default { list, add, remove, listAllGrouped };
