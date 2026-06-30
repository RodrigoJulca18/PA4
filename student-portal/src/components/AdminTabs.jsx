// ============================================================
// AdminTabs
// Sub-navegacion del modulo de administracion: dos pestanas con estado
// activo (Cursos / Inscripciones).
// ============================================================

import { NavLink } from 'react-router-dom';
import { BookOpen, Users } from 'lucide-react';

const tabClass = ({ isActive }) =>
  `inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition ${
    isActive
      ? 'bg-black text-white'
      : 'border border-neutral-300 text-neutral-700 hover:bg-neutral-50'
  }`;

export default function AdminTabs() {
  return (
    <div className="mb-8 flex flex-wrap items-center gap-2">
      <NavLink to="/admin/cursos" className={tabClass}>
        <BookOpen className="h-4 w-4" aria-hidden="true" />
        Cursos
      </NavLink>
      <NavLink to="/admin/inscripciones" className={tabClass}>
        <Users className="h-4 w-4" aria-hidden="true" />
        Inscripciones
      </NavLink>
    </div>
  );
}
