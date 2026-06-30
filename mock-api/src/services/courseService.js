// Servicio de cursos.
// Provee el listado con filtros opcionales, la obtencion por id
// y las operaciones de administracion (alta, edicion y baja).

import { courses } from '../data/courses.js';
import { removeByCourse } from './enrollmentService.js';

// Devuelve todos los cursos, aplicando filtros opcionales de busqueda y categoria.
// - search: texto que se busca en el titulo y la descripcion (sin distinguir mayusculas).
// - category: categoria exacta (sin distinguir mayusculas).
export function getAll({ search, category } = {}) {
  let result = [...courses];

  if (search) {
    const term = search.toLowerCase();
    result = result.filter(
      (c) =>
        c.title.toLowerCase().includes(term) ||
        c.description.toLowerCase().includes(term)
    );
  }

  if (category) {
    const cat = category.toLowerCase();
    result = result.filter((c) => c.category.toLowerCase() === cat);
  }

  return result;
}

// Devuelve un curso por id, o null si no existe.
export function getById(id) {
  return courses.find((c) => c.id === Number(id)) || null;
}

// Campos obligatorios para crear un curso (operacion de administracion).
const REQUIRED_FIELDS = ['title', 'category', 'credits', 'instructor', 'capacity'];

// Crea un nuevo curso (solo administradores).
// Valida los campos obligatorios y lanza 400 si falta alguno.
// El id se genera como max(ids existentes) + 1 y enrolled inicia en 0.
export function create(data = {}) {
  const missing = REQUIRED_FIELDS.filter(
    (field) => data[field] === undefined || data[field] === null || data[field] === ''
  );
  if (missing.length > 0) {
    const error = new Error(
      `Faltan campos obligatorios: ${missing.join(', ')}.`
    );
    error.status = 400;
    throw error;
  }

  const newId = courses.reduce((max, c) => Math.max(max, c.id), 0) + 1;

  const course = {
    id: newId,
    title: data.title,
    description: data.description || '',
    category: data.category,
    credits: data.credits,
    instructor: data.instructor,
    schedule: data.schedule || '',
    capacity: data.capacity,
    enrolled: 0,
    imageUrl: data.imageUrl || `https://picsum.photos/seed/${newId}/600/400`,
  };

  courses.push(course);
  return course;
}

// Actualiza parcialmente un curso existente (solo administradores).
// Fusiona los campos provistos sobre el curso actual (incluida la capacidad/cupos).
// El id nunca se modifica. Lanza 404 si el curso no existe.
export function update(id, data = {}) {
  const course = courses.find((c) => c.id === Number(id));
  if (!course) {
    const error = new Error('Curso no encontrado.');
    error.status = 404;
    throw error;
  }

  const editableFields = [
    'title',
    'description',
    'category',
    'credits',
    'instructor',
    'schedule',
    'capacity',
    'imageUrl',
  ];

  for (const field of editableFields) {
    if (data[field] !== undefined) {
      course[field] = data[field];
    }
  }

  return course;
}

// Elimina un curso por id (solo administradores).
// Tambien elimina las inscripciones asociadas para no dejar registros huerfanos.
// Lanza 404 si el curso no existe.
export function remove(id) {
  const index = courses.findIndex((c) => c.id === Number(id));
  if (index === -1) {
    const error = new Error('Curso no encontrado.');
    error.status = 404;
    throw error;
  }

  courses.splice(index, 1);
  // Limpieza de inscripciones asociadas al curso eliminado.
  removeByCourse(id);
  return true;
}

export default {
  getAll,
  getById,
  create,
  update,
  remove,
};
