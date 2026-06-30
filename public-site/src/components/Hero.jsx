// Sección "hero" de la página de inicio (landing).
// Imagen de fondo monocromática con superposición oscura y texto blanco.
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

// URL del portal del estudiante (aplicación autenticada, otro origen).
const PORTAL_ESTUDIANTE_URL = 'http://localhost:5173';

// Imagen de fondo del hero (verificada, vía CSS background-image).
const HERO_BG =
  'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1920&q=80';

export default function Hero() {
  return (
    <section
      className="relative flex min-h-[80vh] items-center overflow-hidden bg-neutral-900 bg-cover bg-center"
      style={{ backgroundImage: `url(${HERO_BG})` }}
    >
      {/* Superposición oscura para legibilidad del texto blanco */}
      <div className="absolute inset-0 bg-black/60" aria-hidden="true" />

      <div className="relative mx-auto w-full max-w-7xl px-4 py-24 sm:px-6 sm:py-28 lg:px-8 lg:py-32">
        <div className="max-w-3xl">
          <span className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-neutral-200">
            Instituto San Ignacio de Loyola
          </span>

          <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
            Gestión de Cursos e Inscripciones
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-neutral-200">
            Explora nuestro catálogo público de cursos universitarios en
            tecnología, datos e infraestructura. Consulta horarios, créditos y
            cupos disponibles sin necesidad de iniciar sesión.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/cursos"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-6 py-3 text-base font-semibold text-black shadow-card transition hover:bg-neutral-100"
            >
              Ver cursos
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </Link>
            <a
              href={PORTAL_ESTUDIANTE_URL}
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-lg border border-white/40 bg-transparent px-6 py-3 text-base font-semibold text-white transition hover:bg-white/10"
            >
              Portal del estudiante
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
