// ============================================================
// Detalle "/cursos/[id]"  ->  RUTA DINÁMICA con SSG DINÁMICO
// ------------------------------------------------------------
// ESTRATEGIA DE RENDERIZADO:
//
// 1) generateStaticParams(): pre-genera estáticamente (SSG) una página por
//    cada curso conocido en tiempo de build. Devuelve la lista de { id }.
//
// 2) dynamicParams = true: si llega un id que NO se pre-generó (por ejemplo,
//    un curso nuevo creado después del build), Next.js lo renderiza BAJO
//    DEMANDA (fallback a renderizado dinámico) en lugar de devolver 404.
//
// 3) revalidate = 60: las páginas pre-generadas se revalidan vía ISR.
//
// 4) Tolerancia a fallos: getCourseById() y getCourses() usan try/catch con
//    datos locales (fallback), de modo que el build nunca falla aunque la API
//    esté apagada. Si el curso no existe en ningún lado, mostramos notFound().
// ============================================================
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, User, Clock, Award, Users } from 'lucide-react';
import { getCourses, getCourseById } from '@/lib/api';

// URL del portal del estudiante (aplicación autenticada, otro origen).
const PORTAL_ESTUDIANTE_URL = 'http://localhost:5173';

// ISR para las páginas pre-generadas.
export const revalidate = 60;

// Permite renderizar dinámicamente ids no pre-generados (fallback dinámico).
export const dynamicParams = true;

// Pre-generación estática de parámetros (un id por curso conocido).
export async function generateStaticParams() {
  const cursos = await getCourses();
  return cursos.map((curso) => ({ id: String(curso.id) }));
}

// Metadatos dinámicos por curso (SEO).
export async function generateMetadata({ params }) {
  const curso = await getCourseById(params.id);

  if (!curso) {
    return { title: 'Curso no encontrado' };
  }

  return {
    title: curso.title,
    description: curso.description,
  };
}

export default async function CursoDetallePage({ params }) {
  const curso = await getCourseById(params.id);

  // Si no existe el curso (ni en API ni en fallback) -> 404.
  if (!curso) {
    notFound();
  }

  const {
    title,
    description,
    category,
    credits,
    instructor,
    schedule,
    capacity,
    enrolled,
    imageUrl,
  } = curso;

  const disponibles = Math.max((capacity ?? 0) - (enrolled ?? 0), 0);
  const porcentajeOcupacion =
    capacity > 0 ? Math.round(((enrolled ?? 0) / capacity) * 100) : 0;

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Migas de pan / navegación de regreso */}
      <nav className="mb-8" aria-label="Ruta de navegación">
        <Link
          href="/cursos"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-neutral-600 transition hover:text-neutral-900"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Volver al catálogo
        </Link>
      </nav>

      <article className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Imagen del curso */}
        <div className="relative aspect-video overflow-hidden rounded-2xl border border-neutral-200 shadow-card lg:aspect-[4/3]">
          <Image
            src={imageUrl}
            alt={`Imagen del curso ${title}`}
            fill
            sizes="(max-width: 1024px) 100vw, 520px"
            className="object-cover"
            priority
          />
        </div>

        {/* Información principal */}
        <div>
          <span className="inline-flex items-center rounded-full bg-neutral-100 px-2.5 py-1 text-xs font-medium text-neutral-800">
            {category}
          </span>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
            {title}
          </h1>
          <p className="mt-2 inline-flex items-center gap-1.5 text-neutral-600">
            <User className="h-4 w-4 text-neutral-500" aria-hidden="true" />
            Impartido por {instructor}
          </p>
          <p className="mt-5 leading-relaxed text-neutral-600">{description}</p>

          {/* Panel de datos del curso */}
          <div className="mt-8 rounded-2xl border border-neutral-200 bg-white p-6 shadow-card">
            <ul className="grid grid-cols-2 gap-x-6 gap-y-5">
              <li className="flex flex-col">
                <span className="inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-neutral-500">
                  <Award className="h-4 w-4" aria-hidden="true" />
                  Créditos
                </span>
                <span className="mt-1 font-semibold text-neutral-900">
                  {credits}
                </span>
              </li>
              <li className="flex flex-col">
                <span className="inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-neutral-500">
                  <Clock className="h-4 w-4" aria-hidden="true" />
                  Horario
                </span>
                <span className="mt-1 font-semibold text-neutral-900">
                  {schedule}
                </span>
              </li>
              <li className="flex flex-col">
                <span className="inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-neutral-500">
                  <Users className="h-4 w-4" aria-hidden="true" />
                  Capacidad
                </span>
                <span className="mt-1 font-semibold text-neutral-900">
                  {capacity}
                </span>
              </li>
              <li className="flex flex-col">
                <span className="inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-neutral-500">
                  <Users className="h-4 w-4" aria-hidden="true" />
                  Cupos disponibles
                </span>
                <span className="mt-1 font-semibold text-neutral-900">
                  {disponibles}
                </span>
              </li>
            </ul>

            {/* Barra de ocupación */}
            <div className="mt-6">
              <div className="flex items-center justify-between text-sm font-medium text-neutral-600">
                <span>Ocupación</span>
                <span>{porcentajeOcupacion}%</span>
              </div>
              <div className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-neutral-100">
                <div
                  className="h-full rounded-full bg-black transition-all"
                  style={{ width: `${porcentajeOcupacion}%` }}
                />
              </div>
            </div>
          </div>

          {/* Llamado a la acción hacia el portal */}
          <a
            href={PORTAL_ESTUDIANTE_URL}
            rel="noopener noreferrer"
            className="mt-6 inline-flex w-full items-center justify-center rounded-lg bg-black px-6 py-3 text-base font-semibold text-white shadow-card transition hover:bg-neutral-800 sm:w-auto"
          >
            Inscríbete en el portal
          </a>

          <p className="mt-4 text-sm text-neutral-500">
            La inscripción se realiza desde el portal del estudiante. Este
            módulo es solo de consulta pública.
          </p>
        </div>
      </article>
    </div>
  );
}
