// ============================================================
// Página de Inicio "/"  ->  ESTRATEGIA: ESTÁTICA (SSG)
// ------------------------------------------------------------
// Esta landing no consume datos dinámicos, por lo que Next.js la genera
// como página estática en tiempo de build (Static Site Generation).
// Forzamos explícitamente el comportamiento estático con la directiva
// `dynamic = 'force-static'` para evidenciar la estrategia en la evaluación.
// ============================================================
import Link from 'next/link';
import {
  BookOpen,
  GraduationCap,
  ShieldCheck,
  LayoutGrid,
  ArrowRight,
  Search,
  ClipboardList,
  CheckCircle2,
} from 'lucide-react';
import Hero from '@/components/Hero';

// Renderizado estático explícito (SSG).
export const dynamic = 'force-static';

// Imagen de fondo de la banda CTA (verificada, vía CSS background-image).
const CTA_BG =
  'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?auto=format&fit=crop&w=1920&q=80';

// Beneficios/destacados de la oferta académica (contenido estático).
const destacados = [
  {
    icon: BookOpen,
    title: 'Catálogo actualizado',
    text: 'Programas diseñados por docentes expertos con reconocimiento académico.',
  },
  {
    icon: GraduationCap,
    title: 'Docentes expertos',
    text: 'Aprende de profesionales con amplia experiencia en la industria.',
  },
  {
    icon: ShieldCheck,
    title: 'Acceso seguro',
    text: 'Gestiona tus inscripciones desde el portal del estudiante con total seguridad.',
  },
  {
    icon: LayoutGrid,
    title: 'Inscripción simple',
    text: 'Consulta horarios, créditos y cupos, e inscríbete en pocos pasos.',
  },
];

// Pasos del proceso (cómo funciona).
const pasos = [
  {
    icon: Search,
    title: 'Explora el catálogo',
    text: 'Revisa la oferta académica completa, sin necesidad de iniciar sesión.',
  },
  {
    icon: ClipboardList,
    title: 'Consulta el detalle',
    text: 'Verifica horarios, créditos, docentes y cupos disponibles de cada curso.',
  },
  {
    icon: CheckCircle2,
    title: 'Inscríbete en el portal',
    text: 'Completa tu inscripción de forma segura desde el portal del estudiante.',
  },
];

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* Sección de destacados */}
      <section
        id="destacados"
        className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8"
      >
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-neutral-900">
            ¿Por qué estudiar con nosotros?
          </h2>
          <p className="mt-3 text-lg text-neutral-600">
            Una oferta académica moderna, accesible y orientada al futuro.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {destacados.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-card transition hover:shadow-md"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-black text-white">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <h3 className="mt-5 text-lg font-semibold text-neutral-900">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-600">
                  {item.text}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Cómo funciona (pasos numerados) */}
      <section className="border-y border-neutral-200 bg-neutral-50">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-neutral-900">
              ¿Cómo funciona?
            </h2>
            <p className="mt-3 text-lg text-neutral-600">
              Del catálogo a tu inscripción en tres simples pasos.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {pasos.map((paso, index) => {
              const Icon = paso.icon;
              return (
                <div
                  key={paso.title}
                  className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-card"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-black text-white">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <span className="text-sm font-semibold uppercase tracking-widest text-neutral-400">
                      Paso {index + 1}
                    </span>
                  </div>
                  <h3 className="mt-5 text-lg font-semibold text-neutral-900">
                    {paso.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-neutral-600">
                    {paso.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Llamado a la acción (CTA) con imagen de fondo */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div
          className="relative overflow-hidden rounded-3xl bg-neutral-900 bg-cover bg-center px-8 py-16 sm:px-12 sm:py-20"
          style={{ backgroundImage: `url(${CTA_BG})` }}
        >
          <div className="absolute inset-0 bg-black/60" aria-hidden="true" />
          <div className="relative flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                Explora todos los cursos disponibles
              </h2>
              <p className="mt-2 max-w-xl text-neutral-200">
                Revisa el catálogo completo con horarios, créditos y cupos.
              </p>
            </div>
            <Link
              href="/cursos"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-white px-6 py-3 text-base font-semibold text-black shadow-card transition hover:bg-neutral-100"
            >
              Explorar cursos
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
