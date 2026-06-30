// ============================================================
// AdminEnrollmentsPage (modulo de administracion) - ruta PROTEGIDA (admin)
// Inscripciones por usuario: una seccion por usuario con sus datos y la
// lista de cursos en los que esta inscrito.
// ============================================================

import { Users, Mail } from 'lucide-react';
import { getAllEnrollments } from '../../services/adminService.js';
import { useFetch } from '../../hooks/useFetch.js';
import Loader from '../../components/Loader.jsx';
import ErrorMessage from '../../components/ErrorMessage.jsx';
import AdminTabs from '../../components/AdminTabs.jsx';

// Formatea una fecha ISO a una cadena legible (o la devuelve tal cual).
function formatDate(value) {
  if (!value) return '-';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString('es-PE', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

// Clase del badge de estado segun el estado de la inscripcion.
function statusBadgeClass(status) {
  return status === 'INSCRITO'
    ? 'bg-green-100 text-green-700'
    : 'bg-amber-100 text-amber-700';
}

export default function AdminEnrollmentsPage() {
  const {
    data: groups,
    loading,
    error,
    refetch,
  } = useFetch(getAllEnrollments, []);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      <AdminTabs />

      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-neutral-900">
          Inscripciones por usuario
        </h1>
        <p className="mt-1 text-neutral-600">
          Consulta las inscripciones registradas agrupadas por estudiante.
        </p>
      </header>

      {loading && <Loader text="Cargando inscripciones..." />}

      {!loading && error && <ErrorMessage message={error} onRetry={refetch} />}

      {!loading && !error && groups && groups.length === 0 && (
        <div className="rounded-2xl bg-white px-6 py-16 text-center shadow-card ring-1 ring-neutral-200">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-neutral-100 text-neutral-500">
            <Users className="h-6 w-6" aria-hidden="true" />
          </div>
          <h3 className="mt-4 text-lg font-semibold text-neutral-900">
            No hay inscripciones
          </h3>
          <p className="mt-1 text-neutral-600">
            Todavia no se ha registrado ninguna inscripcion.
          </p>
        </div>
      )}

      {!loading && !error && groups && groups.length > 0 && (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {groups.map((group) => (
            <section
              key={group.user.id}
              className="flex flex-col rounded-2xl bg-white shadow-card ring-1 ring-neutral-200"
            >
              <div className="flex items-start justify-between gap-4 border-b border-neutral-200 p-5">
                <div className="min-w-0">
                  <h2 className="truncate text-base font-semibold text-neutral-900">
                    {group.user.name}
                  </h2>
                  <p className="mt-0.5 flex items-center gap-1.5 text-sm text-neutral-500">
                    <Mail className="h-4 w-4 shrink-0" aria-hidden="true" />
                    <span className="truncate">{group.user.email}</span>
                  </p>
                </div>
                <span className="shrink-0 rounded-full bg-neutral-100 px-2.5 py-1 text-xs font-medium text-neutral-800">
                  {group.enrollments.length} inscripcion
                  {group.enrollments.length === 1 ? '' : 'es'}
                </span>
              </div>

              {group.enrollments.length === 0 ? (
                <p className="p-5 text-sm text-neutral-500">
                  Sin inscripciones.
                </p>
              ) : (
                <ul className="divide-y divide-neutral-100">
                  {group.enrollments.map((enrollment) => (
                    <li
                      key={enrollment.id}
                      className="flex flex-wrap items-center justify-between gap-3 p-5"
                    >
                      <div className="min-w-0">
                        <p className="truncate font-medium text-neutral-900">
                          {enrollment.courseTitle}
                        </p>
                        <p className="mt-0.5 text-sm text-neutral-500">
                          {formatDate(enrollment.date)}
                        </p>
                      </div>
                      <span
                        className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ${statusBadgeClass(
                          enrollment.status
                        )}`}
                      >
                        {enrollment.status}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
