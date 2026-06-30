// Controlador de cursos.
// Expone el listado y el detalle (publicos), ademas de las
// operaciones de administracion (crear, editar y eliminar).

import {
  getAll,
  getById,
  create,
  update,
  remove as removeCourse,
} from '../services/courseService.js';

// GET /api/courses?search=&category=
// Respuesta: 200 [Course]
export function list(req, res) {
  const { search, category } = req.query;
  const result = getAll({ search, category });
  return res.status(200).json(result);
}

// GET /api/courses/:id
// Respuestas: 200 Course | 404 { message }
export function getOne(req, res) {
  const course = getById(req.params.id);
  if (!course) {
    return res.status(404).json({ message: 'Curso no encontrado.' });
  }
  return res.status(200).json(course);
}

// POST /api/courses (requiere requireAuth + requireAdmin)
// body: { title, description, category, credits, instructor, schedule, capacity, imageUrl }
// Respuestas: 201 Course | 400 { message } si faltan campos obligatorios
export function add(req, res, next) {
  try {
    const course = create(req.body || {});
    return res.status(201).json(course);
  } catch (err) {
    return next(err);
  }
}

// PUT /api/courses/:id (requiere requireAuth + requireAdmin)
// body parcial con cualquiera de los campos del curso (incluida capacity).
// Respuestas: 200 Course | 404 { message }
export function edit(req, res, next) {
  try {
    const course = update(req.params.id, req.body || {});
    return res.status(200).json(course);
  } catch (err) {
    return next(err);
  }
}

// DELETE /api/courses/:id (requiere requireAuth + requireAdmin)
// Elimina el curso y sus inscripciones asociadas.
// Respuestas: 200 { message } | 404
export function remove(req, res, next) {
  try {
    removeCourse(req.params.id);
    return res
      .status(200)
      .json({ message: 'Curso eliminado correctamente.' });
  } catch (err) {
    return next(err);
  }
}

export default { list, getOne, add, edit, remove };
