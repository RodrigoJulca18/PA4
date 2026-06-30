// ============================================================
// SearchBar (Usuario 2)
// Controles de busqueda por texto y filtro por categoria.
// Es un componente controlado: el estado vive en la pagina padre.
// ============================================================

import { Search } from 'lucide-react';

export default function SearchBar({
  search,
  category,
  categories = [],
  onSearchChange,
  onCategoryChange,
}) {
  return (
    <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end">
      {/* Campo de busqueda con icono de lupa */}
      <div className="flex flex-1 flex-col gap-1.5">
        <label
          htmlFor="search-course"
          className="text-sm font-medium text-neutral-700"
        >
          Buscar curso
        </label>
        <div className="relative">
          <span
            className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-neutral-400"
            aria-hidden="true"
          >
            <Search className="h-5 w-5" />
          </span>
          <input
            id="search-course"
            type="search"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Ej. Programacion, Calculo..."
            className="w-full rounded-lg border border-neutral-300 py-2.5 pl-10 pr-3 text-neutral-900 placeholder:text-neutral-400 transition focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900 focus:outline-none"
          />
        </div>
      </div>

      {/* Filtro por categoria */}
      <div className="flex flex-col gap-1.5 sm:w-56">
        <label
          htmlFor="category-filter"
          className="text-sm font-medium text-neutral-700"
        >
          Categoria
        </label>
        <select
          id="category-filter"
          value={category}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="w-full rounded-lg border border-neutral-300 px-3 py-2.5 text-neutral-900 transition focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900 focus:outline-none"
        >
          <option value="">Todas las categorias</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
