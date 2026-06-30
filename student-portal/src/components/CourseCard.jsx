// ============================================================
// CourseCard (Usuario 2)
// Tarjeta reutilizable que resume un curso en el catalogo.
// ============================================================

import { Link } from 'react-router-dom';
import { User, GraduationCap } from 'lucide-react';
import Button from './Button.jsx';

export default function CourseCard({ course }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-card ring-1 ring-neutral-200 transition hover:-translate-y-0.5 hover:shadow-md">
      <img
        className="aspect-video w-full rounded-t-2xl object-cover"
        src={course.imageUrl}
        alt={`Imagen del curso ${course.title}`}
        loading="lazy"
      />
      <div className="flex flex-1 flex-col p-5">
        <span className="inline-flex w-fit rounded-full bg-neutral-100 px-2.5 py-1 text-xs font-medium text-neutral-800">
          {course.category}
        </span>

        <h3 className="mt-3 text-lg font-semibold leading-snug text-neutral-900">
          {course.title}
        </h3>

        <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-neutral-500">
          <span className="inline-flex items-center gap-1.5">
            <User className="h-4 w-4" aria-hidden="true" />
            {course.instructor}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <GraduationCap className="h-4 w-4" aria-hidden="true" />
            {course.credits} creditos
          </span>
        </div>

        <div className="mt-5 flex items-center justify-end pt-2">
          <Link to={`/cursos/${course.id}`}>
            <Button variant="outline">Ver detalle</Button>
          </Link>
        </div>
      </div>
    </article>
  );
}
