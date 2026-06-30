// ============================================================
// CoursesPage (Usuario 2)
// Catalogo de cursos con busqueda, filtro por categoria y manejo de
// estados de carga, error y lista vacia.
// ============================================================

import { useState, useMemo } from 'react';
import { getCourses } from '../services/courseService.js';
import { useFetch } from '../hooks/useFetch.js';
import CourseCard from '../components/CourseCard.jsx';
import SearchBar from '../components/SearchBar.jsx';
import Loader from '../components/Loader.jsx';
import ErrorMessage from '../components/ErrorMessage.jsx';

export default function CoursesPage() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');

  // El filtrado por texto se aplica en el cliente sobre el listado
  // completo; la categoria se envia a la API. Pedimos por categoria.
  const {
    data: courses,
    loading,
    error,
    refetch,
  } = useFetch(() => getCourses({ category }), [category]);

  // Categorias unicas derivadas del listado para poblar el filtro.
  const categories = useMemo(() => {
    if (!courses) return [];
    return [...new Set(courses.map((c) => c.category))].sort();
  }, [courses]);

  // Busqueda por texto en el cliente (titulo o instructor).
  const visibleCourses = useMemo(() => {
    if (!courses) return [];
    const term = search.trim().toLowerCase();
    if (!term) return courses;
    return courses.filter(
      (c) =>
        c.title.toLowerCase().includes(term) ||
        c.instructor.toLowerCase().includes(term)
    );
  }, [courses, search]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-neutral-900">
          Catalogo de cursos
        </h1>
        <p className="mt-1 text-neutral-600">
          Explora los cursos disponibles y revisa sus detalles.
        </p>
      </header>

      <SearchBar
        search={search}
        category={category}
        categories={categories}
        onSearchChange={setSearch}
        onCategoryChange={setCategory}
      />

      {loading && <Loader text="Cargando cursos..." />}

      {!loading && error && <ErrorMessage message={error} onRetry={refetch} />}

      {!loading && !error && visibleCourses.length === 0 && (
        <div className="rounded-2xl bg-white px-6 py-16 text-center shadow-card ring-1 ring-neutral-200">
          <h3 className="text-lg font-semibold text-neutral-900">
            No se encontraron cursos
          </h3>
          <p className="mt-1 text-neutral-600">
            Prueba con otros terminos de busqueda o categoria.
          </p>
        </div>
      )}

      {!loading && !error && visibleCourses.length > 0 && (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visibleCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      )}
    </div>
  );
}
