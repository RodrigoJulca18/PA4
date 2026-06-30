// Tarjeta reutilizable de curso.
// Muestra imagen (next/image), categoría, título, créditos y un enlace
// "Ver más" hacia el detalle dinámico /cursos/[id].
import Image from 'next/image';
import Link from 'next/link';
import { Clock, User, Award, ArrowRight } from 'lucide-react';

/**
 * @param {Object} props
 * @param {Object} props.course - curso con la forma del contrato Course
 */
export default function CourseCard({ course }) {
  const {
    id,
    title,
    description,
    category,
    credits,
    instructor,
    imageUrl,
    capacity,
    enrolled,
  } = course;

  // Cupos disponibles (defensivo ante valores faltantes).
  const disponibles = Math.max((capacity ?? 0) - (enrolled ?? 0), 0);

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-card transition hover:-translate-y-1 hover:shadow-md">
      {/* Imagen del curso */}
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={imageUrl}
          alt={`Imagen del curso ${title}`}
          fill
          sizes="(max-width: 600px) 100vw, 320px"
          className="rounded-t-2xl object-cover transition duration-300 group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 inline-flex items-center rounded-full bg-neutral-100 px-2.5 py-1 text-xs font-medium text-neutral-800 backdrop-blur">
          {category}
        </span>
      </div>

      {/* Cuerpo */}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-semibold text-neutral-900">{title}</h3>
        <p className="mt-2 line-clamp-2 text-sm text-neutral-600">
          {description}
        </p>

        <div className="mt-4 flex items-center justify-between text-sm text-neutral-700">
          <span className="inline-flex items-center gap-1.5">
            <Award className="h-4 w-4 text-neutral-500" aria-hidden="true" />
            {credits} créditos
          </span>
          <span className="inline-flex items-center gap-1.5 text-neutral-600">
            <Clock className="h-4 w-4 text-neutral-500" aria-hidden="true" />
            {disponibles} cupos
          </span>
        </div>

        <p className="mt-2 inline-flex items-center gap-1.5 text-sm text-neutral-600">
          <User className="h-4 w-4 text-neutral-500" aria-hidden="true" />
          {instructor}
        </p>

        <Link
          href={`/cursos/${id}`}
          className="mt-5 inline-flex items-center justify-center gap-2 rounded-lg bg-black px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-neutral-800"
        >
          Ver más
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
