// ============================================================
// CourseForm
// Formulario controlado reutilizable para crear y editar cursos.
// Props:
//   initialValues : valores iniciales del curso (para edicion)
//   onSubmit      : (data) => void  recibe los datos validados
//   onCancel      : () => void      cierra el formulario
//   submitting    : boolean         estado de envio (deshabilita botones)
// ============================================================

import { useState } from 'react';
import Input from './Input.jsx';
import Button from './Button.jsx';

// Valores por defecto para un curso nuevo.
const EMPTY = {
  title: '',
  description: '',
  category: '',
  credits: '',
  instructor: '',
  schedule: '',
  capacity: '',
  imageUrl: '',
};

export default function CourseForm({
  initialValues,
  onSubmit,
  onCancel,
  submitting = false,
}) {
  const [form, setForm] = useState({ ...EMPTY, ...(initialValues || {}) });
  const [errors, setErrors] = useState({});

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  // Validacion de los campos obligatorios.
  function validate() {
    const next = {};
    if (!form.title.trim()) next.title = 'El titulo es obligatorio.';
    if (!form.description.trim())
      next.description = 'La descripcion es obligatoria.';
    if (!form.category.trim()) next.category = 'La categoria es obligatoria.';
    if (!form.instructor.trim())
      next.instructor = 'El instructor es obligatorio.';
    if (!form.schedule.trim()) next.schedule = 'El horario es obligatorio.';

    if (form.credits === '' || form.credits === null) {
      next.credits = 'Los creditos son obligatorios.';
    } else if (Number(form.credits) < 0) {
      next.credits = 'Los creditos no pueden ser negativos.';
    }

    if (form.capacity === '' || form.capacity === null) {
      next.capacity = 'La capacidad es obligatoria.';
    } else if (Number(form.capacity) < 0) {
      next.capacity = 'La capacidad no puede ser negativa.';
    }

    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;

    // Normalizamos los numericos antes de entregar los datos.
    onSubmit({
      title: form.title.trim(),
      description: form.description.trim(),
      category: form.category.trim(),
      credits: Number(form.credits),
      instructor: form.instructor.trim(),
      schedule: form.schedule.trim(),
      capacity: Number(form.capacity),
      imageUrl: form.imageUrl.trim(),
    });
  }

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit} noValidate>
      <Input
        label="Titulo"
        name="title"
        value={form.title}
        onChange={handleChange}
        placeholder="Ej. Programacion I"
        error={errors.title}
      />

      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="course-description"
          className="text-sm font-medium text-neutral-700"
        >
          Descripcion
        </label>
        <textarea
          id="course-description"
          name="description"
          value={form.description}
          onChange={handleChange}
          rows={3}
          placeholder="Breve descripcion del curso"
          className="w-full rounded-lg border border-neutral-300 px-3 py-2.5 text-neutral-900 placeholder:text-neutral-400 transition focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900 focus:outline-none"
          aria-invalid={Boolean(errors.description)}
        />
        {errors.description && (
          <span className="text-sm text-red-600">{errors.description}</span>
        )}
      </div>

      <Input
        label="Categoria"
        name="category"
        value={form.category}
        onChange={handleChange}
        placeholder="Ej. Ingenieria"
        error={errors.category}
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input
          label="Creditos"
          type="number"
          name="credits"
          value={form.credits}
          onChange={handleChange}
          min="0"
          placeholder="0"
          error={errors.credits}
        />
        <Input
          label="Capacidad (cupos)"
          type="number"
          name="capacity"
          value={form.capacity}
          onChange={handleChange}
          min="0"
          placeholder="0"
          error={errors.capacity}
        />
      </div>

      <Input
        label="Instructor"
        name="instructor"
        value={form.instructor}
        onChange={handleChange}
        placeholder="Nombre del instructor"
        error={errors.instructor}
      />

      <Input
        label="Horario"
        name="schedule"
        value={form.schedule}
        onChange={handleChange}
        placeholder="Ej. Lun y Mie 18:00-20:00"
        error={errors.schedule}
      />

      <Input
        label="URL de imagen (opcional)"
        name="imageUrl"
        value={form.imageUrl}
        onChange={handleChange}
        placeholder="https://..."
      />

      <div className="mt-2 flex items-center justify-end gap-3">
        <Button variant="outline" onClick={onCancel} disabled={submitting}>
          Cancelar
        </Button>
        <Button type="submit" variant="primary" loading={submitting}>
          Guardar
        </Button>
      </div>
    </form>
  );
}
