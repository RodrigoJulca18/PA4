// ============================================================
// Catálogo "/cursos"  ->  ESTRATEGIA: SSG con REVALIDACIÓN (ISR)
// ------------------------------------------------------------
// La página obtiene los cursos desde la API y se genera de forma estática,
// pero se REVALIDA periódicamente (Incremental Static Regeneration).
//
// `export const revalidate = 60` indica a Next.js que regenere esta página
// en segundo plano como máximo cada 60 segundos. Así combinamos la velocidad
// de una página estática con datos relativamente frescos.
//
// Tolerancia a fallos: getCourses() usa try/catch + datos locales (fallback),
// por lo que aunque la API esté caída durante el build, la página se genera.
// ============================================================
import { getCourses } from '@/lib/api';
import CourseCard from '@/components/CourseCard';

// ISR: revalida el contenido estático cada 60 segundos.
export const revalidate = 60;

export const metadata = {
  title: 'Catálogo de cursos',
  description:
    'Consulta todos los cursos de la oferta académica: categorías, créditos, horarios y cupos disponibles.',
};

export default async function CursosPage() {
  // Obtención de datos (con fallback automático ante fallos de la API).
  const cursos = await getCourses();

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <header className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
          Catálogo de cursos
        </h1>
        <p className="mt-3 text-lg text-neutral-600">
          {cursos.length} cursos disponibles en nuestra oferta académica.
        </p>
      </header>

      {cursos.length === 0 ? (
        <p className="rounded-2xl border border-neutral-200 bg-white p-8 text-center text-neutral-600 shadow-card">
          No hay cursos disponibles en este momento. Vuelve más tarde.
        </p>
      ) : (
        <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cursos.map((curso) => (
            <CourseCard key={curso.id} course={curso} />
          ))}
        </section>
      )}
    </div>
  );
}
