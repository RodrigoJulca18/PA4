// ============================================================
// CourseDetailPage (Usuario 2)
// Muestra la informacion completa de un curso. Si el usuario esta
// autenticado permite inscribirse (enroll) y refleja el estado.
// ============================================================

import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { getCourseById } from '../services/courseService.js';
import { enroll } from '../services/enrollmentService.js';
import { useFetch } from '../hooks/useFetch.js';
import { useAuth } from '../hooks/useAuth.js';
import { useAlert } from '../hooks/useAlert.js';
import { hasAvailableSeats } from '../models/types.js';
import Loader from '../components/Loader.jsx';
import ErrorMessage from '../components/ErrorMessage.jsx';
import Button from '../components/Button.jsx';

export default function CourseDetailPage() {
  const { id } = useParams();
  const { isAuthenticated } = useAuth();
  const { notify } = useAlert();

  const {
    data: course,
    loading,
    error,
    refetch,
  } = useFetch(() => getCourseById(id), [id]);

  // Estado local del proceso de inscripcion.
  const [enrolling, setEnrolling] = useState(false);

  async function handleEnroll() {
    setEnrolling(true);
    try {
      const enrollment = await enroll(course.id);
      notify({
        type: 'success',
        title: 'Inscripcion registrada',
        message: `Tu inscripcion se registro con estado: ${enrollment.status}.`,
      });
    } catch (err) {
      notify({
        type: 'error',
        title: 'No se pudo inscribir',
        message:
          err.response?.data?.message ||
          'No se pudo completar la inscripcion. Intentalo de nuevo.',
      });
    } finally {
      setEnrolling(false);
    }
  }

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Loader text="Cargando curso..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <ErrorMessage message={error} onRetry={refetch} />
      </div>
    );
  }

  const seatsAvailable = hasAvailableSeats(course);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      <Link
        to="/cursos"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-neutral-500 transition hover:text-neutral-900"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        Volver al catalogo
      </Link>

      <div className="mt-5 grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Columna principal: imagen e informacion */}
        <div className="lg:col-span-2">
          <img
            className="aspect-video w-full rounded-2xl object-cover shadow-card ring-1 ring-neutral-200"
            src={course.imageUrl}
            alt={`Imagen del curso ${course.title}`}
          />

          <div className="mt-6 flex flex-wrap items-start justify-between gap-3">
            <h1 className="text-3xl font-bold tracking-tight text-neutral-900">
              {course.title}
            </h1>
            <span className="inline-flex rounded-full bg-neutral-100 px-2.5 py-1 text-xs font-medium text-neutral-800">
              {course.category}
            </span>
          </div>

          <p className="mt-3 leading-relaxed text-neutral-600">
            {course.description}
          </p>

          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div className="rounded-xl bg-white p-4 shadow-card ring-1 ring-neutral-200">
              <div className="text-xs uppercase tracking-wide text-neutral-400">
                Instructor
              </div>
              <div className="mt-1 font-semibold text-neutral-900">
                {course.instructor}
              </div>
            </div>
            <div className="rounded-xl bg-white p-4 shadow-card ring-1 ring-neutral-200">
              <div className="text-xs uppercase tracking-wide text-neutral-400">
                Creditos
              </div>
              <div className="mt-1 font-semibold text-neutral-900">
                {course.credits}
              </div>
            </div>
            <div className="rounded-xl bg-white p-4 shadow-card ring-1 ring-neutral-200">
              <div className="text-xs uppercase tracking-wide text-neutral-400">
                Horario
              </div>
              <div className="mt-1 font-semibold text-neutral-900">
                {course.schedule}
              </div>
            </div>
            <div className="rounded-xl bg-white p-4 shadow-card ring-1 ring-neutral-200">
              <div className="text-xs uppercase tracking-wide text-neutral-400">
                Cupos
              </div>
              <div className="mt-1 font-semibold text-neutral-900">
                {course.enrolled} / {course.capacity}
              </div>
            </div>
          </div>
        </div>

        {/* Columna lateral: panel de inscripcion (depende de la sesion) */}
        <div className="lg:col-span-1">
          <div className="rounded-2xl bg-white p-6 shadow-card ring-1 ring-neutral-200 lg:sticky lg:top-24">
            <h2 className="text-lg font-semibold text-neutral-900">
              Inscripcion
            </h2>

            <div className="mt-4 flex flex-col gap-4">
              {!isAuthenticated && (
                <p className="text-sm text-neutral-500">
                  <Link
                    to="/login"
                    className="font-medium text-neutral-900 hover:underline"
                  >
                    Inicia sesion
                  </Link>{' '}
                  para inscribirte en este curso.
                </p>
              )}

              {isAuthenticated && (
                <>
                  {!seatsAvailable && (
                    <span className="inline-flex w-fit rounded-full bg-amber-100 px-2.5 py-1 text-xs font-medium text-amber-700">
                      Sin cupos disponibles
                    </span>
                  )}

                  <Button
                    variant="primary"
                    onClick={handleEnroll}
                    loading={enrolling}
                    disabled={!seatsAvailable}
                    block
                  >
                    Inscribirme
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
