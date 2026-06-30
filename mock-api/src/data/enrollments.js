// Almacenamiento en memoria de las inscripciones.
// Es un arreglo MUTABLE: los servicios agregan y eliminan elementos en tiempo de ejecucion.
// Al reiniciar el servidor los datos vuelven a su estado inicial (mock).
//
// Forma de cada inscripcion:
// { id, courseId, userId, status: "PREINSCRITO" | "INSCRITO", date }
//
// Se incluyen inscripciones semilla para que la vista de administracion no este vacia.
// Todos los courseId referencian cursos existentes en data/courses.js.

export const enrollments = [
  // Usuario 1 (Estudiante Demo): una inscripcion confirmada y una preinscripcion.
  {
    id: 1,
    courseId: 1,
    userId: 1,
    status: 'INSCRITO',
    date: '2026-03-10T14:00:00.000Z',
  },
  {
    id: 2,
    courseId: 5,
    userId: 1,
    status: 'PREINSCRITO',
    date: '2026-03-12T16:30:00.000Z',
  },
  // Usuario 2 (Maria Torres): una inscripcion confirmada.
  {
    id: 3,
    courseId: 2,
    userId: 2,
    status: 'INSCRITO',
    date: '2026-03-15T09:15:00.000Z',
  },
];

// Contador para generar identificadores unicos de inscripcion.
// Arranca despues del mayor id semilla para evitar colisiones.
let nextId = enrollments.reduce((max, e) => Math.max(max, e.id), 0) + 1;

// Devuelve el siguiente id disponible e incrementa el contador.
export function getNextEnrollmentId() {
  return nextId++;
}

export default enrollments;
