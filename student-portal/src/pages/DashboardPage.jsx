// ============================================================
// DashboardPage (Usuario 2) - ruta PROTEGIDA
// Saluda al usuario y lista sus inscripciones con la informacion del
// curso. Permite cancelar (unenroll). Maneja carga, error y vacio.
// ============================================================

import { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Trash2 } from 'lucide-react';
import { getMyEnrollments, unenroll } from '../services/enrollmentService.js';
import { getCourseById } from '../services/courseService.js';
import { useFetch } from '../hooks/useFetch.js';
import { useAuth } from '../hooks/useAuth.js';
import { useAlert } from '../hooks/useAlert.js';
import Loader from '../components/Loader.jsx';
import ErrorMessage from '../components/ErrorMessage.jsx';
import Button from '../components/Button.jsx';

// Combina cada inscripcion con los datos de su curso. Asi el dashboard
// puede mostrar titulo, creditos, etc., y no solo el id del curso.
async function loadEnrollmentsWithCourses() {
  const enrollments = await getMyEnrollments();
  const detailed = await Promise.all(
    enrollments.map(async (enrollment) => {
      try {
        const course = await getCourseById(enrollment.courseId);
        return { ...enrollment, course };
      } catch {
        // Si falla un curso puntual, mostramos la inscripcion igual.
        return { ...enrollment, course: null };
      }
    })
  );
  return detailed;
}

export default function DashboardPage() {
  const { user } = useAuth();
  const { confirm, notify } = useAlert();
  const {
    data: enrollments,
    loading,
    error,
    refetch,
  } = useFetch(loadEnrollmentsWithCourses, []);

  // id de la inscripcion que se esta cancelando (para el estado del boton).
  const [removingId, setRemovingId] = useState(null);

  const handleUnenroll = useCallback(
    async (enrollmentId) => {
      const ok = await confirm({
        title: 'Cancelar inscripcion',
        message:
          'Estas seguro de que deseas cancelar esta inscripcion? Esta accion no se puede deshacer.',
        confirmText: 'Cancelar inscripcion',
        cancelText: 'Volver',
        danger: true,
      });
      if (!ok) return;

      setRemovingId(enrollmentId);
      try {
        await unenroll(enrollmentId);
        await refetch();
        notify({
          type: 'success',
          title: 'Inscripcion cancelada',
          message: 'La inscripcion se cancelo correctamente.',
        });
      } catch (err) {
        notify({
          type: 'error',
          title: 'No se pudo cancelar',
          message:
            err.response?.data?.message ||
            'No se pudo cancelar la inscripcion. Intentalo de nuevo.',
        });
      } finally {
        setRemovingId(null);
      }
    },
    [confirm, notify, refetch]
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-neutral-900">
          Hola, {user?.name}
        </h1>
        <p className="mt-1 text-neutral-600">
          Estas son tus inscripciones actuales.
        </p>
      </header>

      {loading && <Loader text="Cargando tus inscripciones..." />}

      {!loading && error && <ErrorMessage message={error} onRetry={refetch} />}

      {!loading && !error && enrollments && enrollments.length === 0 && (
        <div className="rounded-2xl bg-white px-6 py-16 text-center shadow-card ring-1 ring-neutral-200">
          <h3 className="text-lg font-semibold text-neutral-900">
            Aun no tienes inscripciones
          </h3>
          <p className="mt-1 text-neutral-600">
            Visita el catalogo de cursos para inscribirte.
          </p>
          <div className="mt-6 flex justify-center">
            <Link to="/cursos">
              <Button variant="primary">Ir al catalogo</Button>
            </Link>
          </div>
        </div>
      )}

      {!loading && !error && enrollments && enrollments.length > 0 && (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {enrollments.map((item) => (
            <div
              key={item.id}
              className="flex flex-col gap-4 rounded-2xl bg-white p-5 shadow-card ring-1 ring-neutral-200 transition hover:shadow-md sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="min-w-0">
                <h3 className="truncate text-base font-semibold text-neutral-900">
                  {item.course ? (
                    <Link
                      to={`/cursos/${item.courseId}`}
                      className="hover:underline"
                    >
                      {item.course.title}
                    </Link>
                  ) : (
                    'Curso no disponible'
                  )}
                </h3>
                <p className="mt-0.5 text-sm text-neutral-500">
                  {item.course
                    ? `${item.course.credits} creditos - ${item.course.instructor}`
                    : `ID: ${item.courseId}`}
                </p>
                <span
                  className={`mt-2 inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                    item.status === 'INSCRITO'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-amber-100 text-amber-700'
                  }`}
                >
                  {item.status}
                </span>
              </div>

              <Button
                variant="danger"
                loading={removingId === item.id}
                onClick={() => handleUnenroll(item.id)}
              >
                <Trash2 className="h-4 w-4" aria-hidden="true" />
                Cancelar
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
