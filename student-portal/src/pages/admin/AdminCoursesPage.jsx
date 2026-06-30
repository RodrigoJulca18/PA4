// ============================================================
// AdminCoursesPage (modulo de administracion) - ruta PROTEGIDA (admin)
// Gestion de cursos: crear, editar (incluida la capacidad / cupos) y
// eliminar. Lista los cursos en una tabla con sus cupos ocupados.
// ============================================================

import { useState, useCallback } from 'react';
import { Plus, Pencil, Trash2, BookOpen } from 'lucide-react';
import { getCourses } from '../../services/courseService.js';
import {
  createCourse,
  updateCourse,
  deleteCourse,
} from '../../services/adminService.js';
import { useFetch } from '../../hooks/useFetch.js';
import { useAlert } from '../../hooks/useAlert.js';
import Loader from '../../components/Loader.jsx';
import ErrorMessage from '../../components/ErrorMessage.jsx';
import Button from '../../components/Button.jsx';
import Modal from '../../components/Modal.jsx';
import CourseForm from '../../components/CourseForm.jsx';
import AdminTabs from '../../components/AdminTabs.jsx';

export default function AdminCoursesPage() {
  const { notify, confirm } = useAlert();
  const {
    data: courses,
    loading,
    error,
    refetch,
  } = useFetch(() => getCourses(), []);

  // Estado del modal de formulario. editing = curso en edicion (o null para crear).
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  // id del curso que se esta eliminando (para el estado del boton).
  const [deletingId, setDeletingId] = useState(null);

  function openCreate() {
    setEditing(null);
    setFormOpen(true);
  }

  function openEdit(course) {
    setEditing(course);
    setFormOpen(true);
  }

  function closeForm() {
    if (submitting) return;
    setFormOpen(false);
    setEditing(null);
  }

  const handleSubmit = useCallback(
    async (data) => {
      setSubmitting(true);
      try {
        if (editing) {
          await updateCourse(editing.id, data);
          notify({
            type: 'success',
            title: 'Curso actualizado',
            message: 'Los cambios del curso se guardaron correctamente.',
          });
        } else {
          await createCourse(data);
          notify({
            type: 'success',
            title: 'Curso creado',
            message: 'El nuevo curso se creo correctamente.',
          });
        }
        setFormOpen(false);
        setEditing(null);
        await refetch();
      } catch (err) {
        notify({
          type: 'error',
          title: 'No se pudo guardar',
          message:
            err.response?.data?.message ||
            'No se pudo guardar el curso. Intentalo de nuevo.',
        });
      } finally {
        setSubmitting(false);
      }
    },
    [editing, notify, refetch]
  );

  const handleDelete = useCallback(
    async (course) => {
      const ok = await confirm({
        title: 'Eliminar curso',
        message: `Estas seguro de que deseas eliminar el curso "${course.title}"? Esta accion no se puede deshacer.`,
        confirmText: 'Eliminar',
        cancelText: 'Cancelar',
        danger: true,
      });
      if (!ok) return;

      setDeletingId(course.id);
      try {
        await deleteCourse(course.id);
        await refetch();
        notify({
          type: 'success',
          title: 'Curso eliminado',
          message: 'El curso se elimino correctamente.',
        });
      } catch (err) {
        notify({
          type: 'error',
          title: 'No se pudo eliminar',
          message:
            err.response?.data?.message ||
            'No se pudo eliminar el curso. Intentalo de nuevo.',
        });
      } finally {
        setDeletingId(null);
      }
    },
    [confirm, notify, refetch]
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      <AdminTabs />

      <header className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-neutral-900">
            Gestion de cursos
          </h1>
          <p className="mt-1 text-neutral-600">
            Crea, edita y elimina cursos, y modifica sus cupos.
          </p>
        </div>
        <Button variant="primary" onClick={openCreate}>
          <Plus className="h-4 w-4" aria-hidden="true" />
          Nuevo curso
        </Button>
      </header>

      {loading && <Loader text="Cargando cursos..." />}

      {!loading && error && <ErrorMessage message={error} onRetry={refetch} />}

      {!loading && !error && courses && courses.length === 0 && (
        <div className="rounded-2xl bg-white px-6 py-16 text-center shadow-card ring-1 ring-neutral-200">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-neutral-100 text-neutral-500">
            <BookOpen className="h-6 w-6" aria-hidden="true" />
          </div>
          <h3 className="mt-4 text-lg font-semibold text-neutral-900">
            Aun no hay cursos
          </h3>
          <p className="mt-1 text-neutral-600">
            Crea el primer curso con el boton "Nuevo curso".
          </p>
        </div>
      )}

      {!loading && !error && courses && courses.length > 0 && (
        <div className="overflow-hidden rounded-2xl bg-white shadow-card ring-1 ring-neutral-200">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-neutral-200 text-sm">
              <thead className="bg-neutral-50 text-left text-xs uppercase tracking-wide text-neutral-500">
                <tr>
                  <th className="px-4 py-3 font-medium">Titulo</th>
                  <th className="px-4 py-3 font-medium">Categoria</th>
                  <th className="px-4 py-3 font-medium">Creditos</th>
                  <th className="px-4 py-3 font-medium">Instructor</th>
                  <th className="px-4 py-3 font-medium">Cupos</th>
                  <th className="px-4 py-3 text-right font-medium">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {courses.map((course) => (
                  <tr key={course.id} className="hover:bg-neutral-50">
                    <td className="px-4 py-3 font-medium text-neutral-900">
                      {course.title}
                    </td>
                    <td className="px-4 py-3 text-neutral-600">
                      {course.category}
                    </td>
                    <td className="px-4 py-3 text-neutral-600">
                      {course.credits}
                    </td>
                    <td className="px-4 py-3 text-neutral-600">
                      {course.instructor}
                    </td>
                    <td className="px-4 py-3 text-neutral-600">
                      <span className="inline-flex rounded-full bg-neutral-100 px-2.5 py-1 text-xs font-medium text-neutral-800">
                        {course.enrolled} / {course.capacity}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="outline"
                          onClick={() => openEdit(course)}
                        >
                          <Pencil className="h-4 w-4" aria-hidden="true" />
                          Editar
                        </Button>
                        <Button
                          variant="danger"
                          loading={deletingId === course.id}
                          onClick={() => handleDelete(course)}
                        >
                          <Trash2 className="h-4 w-4" aria-hidden="true" />
                          Eliminar
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <Modal
        open={formOpen}
        onClose={closeForm}
        title={editing ? 'Editar curso' : 'Nuevo curso'}
      >
        <CourseForm
          initialValues={editing || undefined}
          onSubmit={handleSubmit}
          onCancel={closeForm}
          submitting={submitting}
        />
      </Modal>
    </div>
  );
}
