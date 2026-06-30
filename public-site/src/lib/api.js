// Capa de acceso a datos (API de cursos).
//
// Contrato de la API:
//   GET /courses      -> [Course]
//   GET /courses/:id  -> Course
//
// Estrategia de TOLERANCIA A FALLOS:
// La API mock puede estar APAGADA durante `next build` o en runtime. Para que
// la generación estática (SSG/ISR) y el renderizado dinámico NUNCA fallen,
// cada función envuelve el fetch en try/catch y, ante cualquier error
// (red, timeout, status != 2xx, JSON inválido), retorna los datos semilla
// locales definidos en src/lib/fallbackCourses.js.
//
// Estrategia de CACHÉ:
// Usamos las opciones de fetch de Next.js (next.revalidate) para habilitar
// ISR (Incremental Static Regeneration). El catálogo se regenera cada 60s.

import { fallbackCourses } from '@/lib/fallbackCourses';

// URL base: preferimos la variable pública (cliente + servidor), luego la
// privada de servidor y, por último, el valor por defecto local.
const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  process.env.API_URL ||
  'http://localhost:4000/api';

// Ventana de revalidación en segundos para ISR.
const REVALIDATE_SECONDS = 60;

/**
 * Obtiene el listado completo de cursos.
 * En caso de error retorna el seed local (fallbackCourses).
 * @returns {Promise<Array>} lista de cursos
 */
export async function getCourses() {
  try {
    const res = await fetch(`${API_URL}/courses`, {
      // ISR: revalida el caché cada 60 segundos.
      next: { revalidate: REVALIDATE_SECONDS },
    });

    if (!res.ok) {
      throw new Error(`Respuesta no satisfactoria: ${res.status}`);
    }

    const data = await res.json();

    // Validación defensiva: la API debe devolver un arreglo.
    if (!Array.isArray(data)) {
      throw new Error('Formato inesperado: se esperaba un arreglo de cursos.');
    }

    return data;
  } catch (error) {
    // La API está caída o respondió mal -> usamos datos locales.
    console.warn(
      '[api.getCourses] No se pudo consultar la API, usando datos locales (fallback).',
      error?.message,
    );
    return fallbackCourses;
  }
}

/**
 * Obtiene un curso por su id.
 * En caso de error de red/API intenta resolver desde el seed local.
 * @param {string} id identificador del curso
 * @returns {Promise<Object|null>} curso encontrado o null si no existe
 */
export async function getCourseById(id) {
  try {
    const res = await fetch(`${API_URL}/courses/${id}`, {
      // ISR: revalida el caché cada 60 segundos.
      next: { revalidate: REVALIDATE_SECONDS },
    });

    if (!res.ok) {
      throw new Error(`Respuesta no satisfactoria: ${res.status}`);
    }

    const data = await res.json();

    if (!data || !data.id) {
      throw new Error('Curso no encontrado en la respuesta de la API.');
    }

    return data;
  } catch (error) {
    // Fallback: buscamos el curso en los datos locales.
    console.warn(
      `[api.getCourseById] No se pudo consultar la API para id=${id}, usando datos locales (fallback).`,
      error?.message,
    );
    const local = fallbackCourses.find((course) => String(course.id) === String(id));
    return local || null;
  }
}
