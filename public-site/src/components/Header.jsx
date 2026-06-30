'use client';

// Encabezado público con navegación responsiva.
// Incluye los enlaces del módulo público (Inicio, Cursos) y un botón que
// dirige al "Portal del estudiante" (módulo autenticado en otro origen).
// En móvil muestra un menú hamburguesa (solo presentacional, vía useState).
import { useState } from 'react';
import Link from 'next/link';
import { GraduationCap, Home, BookOpen, Menu, X } from 'lucide-react';

// URL del portal del estudiante (aplicación autenticada, otro usuario del grupo).
const PORTAL_ESTUDIANTE_URL = 'http://localhost:5173';

// Enlaces internos de navegación del sitio.
const navLinks = [
  { href: '/', label: 'Inicio', icon: Home },
  { href: '/cursos', label: 'Cursos', icon: BookOpen },
];

export default function Header() {
  // Estado del menú móvil (abierto/cerrado).
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-neutral-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Marca / logo del sitio */}
        <Link
          href="/"
          className="flex items-center gap-2.5"
          onClick={() => setOpen(false)}
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-black text-white shadow-card">
            <GraduationCap className="h-5 w-5" aria-hidden="true" />
          </span>
          <span className="text-lg font-semibold tracking-tight text-neutral-900">
            Oferta Académica
          </span>
        </Link>

        {/* Navegación principal (escritorio) */}
        <nav
          className="hidden items-center gap-1 md:flex"
          aria-label="Navegación principal"
        >
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-neutral-600 transition hover:bg-neutral-100 hover:text-neutral-900"
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
                {link.label}
              </Link>
            );
          })}
          <a
            href={PORTAL_ESTUDIANTE_URL}
            className="ml-2 inline-flex items-center rounded-lg bg-black px-4 py-2 text-sm font-semibold text-white shadow-card transition hover:bg-neutral-800"
            rel="noopener noreferrer"
          >
            Portal del estudiante
          </a>
        </nav>

        {/* Botón hamburguesa (móvil) */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex items-center justify-center rounded-lg p-2 text-neutral-600 transition hover:bg-neutral-100 hover:text-neutral-900 md:hidden"
          aria-label="Abrir menú de navegación"
          aria-expanded={open}
        >
          {open ? (
            <X className="h-6 w-6" aria-hidden="true" />
          ) : (
            <Menu className="h-6 w-6" aria-hidden="true" />
          )}
        </button>
      </div>

      {/* Panel desplegable (móvil) */}
      {open && (
        <div className="border-t border-neutral-200 bg-white md:hidden">
          <nav
            className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-3 sm:px-6"
            aria-label="Navegación móvil"
          >
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-base font-medium text-neutral-700 transition hover:bg-neutral-100 hover:text-neutral-900"
                >
                  <Icon className="h-5 w-5" aria-hidden="true" />
                  {link.label}
                </Link>
              );
            })}
            <a
              href={PORTAL_ESTUDIANTE_URL}
              onClick={() => setOpen(false)}
              className="mt-1 inline-flex items-center justify-center rounded-lg bg-black px-4 py-2.5 text-base font-semibold text-white shadow-card transition hover:bg-neutral-800"
              rel="noopener noreferrer"
            >
              Portal del estudiante
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
