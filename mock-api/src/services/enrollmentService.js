// Servicio de inscripciones.
// Maneja el listado por usuario, la creacion (con control de duplicados),
// la eliminacion y la vista de administracion agrupada por usuario.

import { enrollments, getNextEnrollmentId } from '../data/enrollments.js';
import { getById as getCourseById } from './courseService.js';
import { users } from '../data/users.js';

// Lista todas las inscripciones del usuario indicado.
export function listByUser(userId) {
  return enrollments.filter((e) => e.userId === Number(userId));
}

// Crea una nueva inscripcion para el usuario en el curso indicado.
// Lanza errores controlados:
// - 404 si el curso no existe.
// - 409 si el usuario ya esta inscrito en ese curso.
export function create(userId, courseId) {
  const course = getCourseById(courseId);
  if (!course) {
    const error = new Error('El curso indicado no existe.');
    error.status = 404;
    throw error;
  }

  const alreadyEnrolled = enrollments.some(
    (e) => e.userId === Number(userId) && e.courseId === Number(courseId)
  );
  if (alreadyEnrolled) {
    const error = new Error('Ya estas inscrito en este curso.');
    error.status = 409;
    throw error;
  }

  const enrollment = {
    id: getNextEnrollmentId(),
    courseId: Number(courseId),
    userId: Number(userId),
    status: 'PREINSCRITO',
    date: new Date().toISOString(),
  };

  enrollments.push(enrollment);
  return enrollment;
}

// Elimina una inscripcion del usuario por su id.
// Devuelve true si se elimino; lanza 404 si no se encontro.
export function remove(userId, enrollmentId) {
  const index = enrollments.findIndex(
    (e) => e.id === Number(enrollmentId) && e.userId === Number(userId)
  );

  if (index === -1) {
    const error = new Error('No se encontro la inscripcion indicada.');
    error.status = 404;
    throw error;
  }

  enrollments.splice(index, 1);
  return true;
}

// Elimina todas las inscripciones asociadas a un curso.
// Se usa como limpieza cuando un administrador elimina un curso.
// Devuelve la cantidad de inscripciones eliminadas.
export function removeByCourse(courseId) {
  let removed = 0;
  for (let i = enrollments.length - 1; i >= 0; i--) {
    if (enrollments[i].courseId === Number(courseId)) {
      enrollments.splice(i, 1);
      removed++;
    }
  }
  return removed;
}

// Devuelve las inscripciones agrupadas por usuario (vista de administracion).
// Incluye unicamente a los usuarios que tienen al menos una inscripcion.
// Cada inscripcion incorpora el titulo del curso (join con data/courses).
// Forma: [ { user: { id, name, email }, enrollments: [ { id, courseId, courseTitle, status, date } ] } ]
export function listGroupedByUser() {
  return users
    .map((user) => {
      const userEnrollments = enrollments
        .filter((e) => e.userId === user.id)
        .map((e) => {
          const course = getCourseById(e.courseId);
          return {
            id: e.id,
            courseId: e.courseId,
            courseTitle: course ? course.title : null,
            status: e.status,
            date: e.date,
          };
        });

      return {
        user: { id: user.id, name: user.name, email: user.email },
        enrollments: userEnrollments,
      };
    })
    .filter((group) => group.enrollments.length > 0);
}

export default {
  listByUser,
  create,
  remove,
  removeByCourse,
  listGroupedByUser,
};
