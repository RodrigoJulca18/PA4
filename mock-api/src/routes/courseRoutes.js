// Rutas de cursos.
// Las consultas (GET) son publicas; las operaciones de administracion
// (POST, PUT, DELETE) requieren autenticacion y rol de administrador.

import { Router } from 'express';
import {
  list,
  getOne,
  add,
  edit,
  remove,
} from '../controllers/courseController.js';
import { requireAuth, requireAdmin } from '../middleware/auth.js';

const router = Router();

// GET /api/courses -> listado con filtros opcionales ?search= y ?category= (publico)
router.get('/', list);

// GET /api/courses/:id -> detalle de un curso (publico)
router.get('/:id', getOne);

// POST /api/courses -> crear curso (solo administradores)
router.post('/', requireAuth, requireAdmin, add);

// PUT /api/courses/:id -> editar curso (solo administradores)
router.put('/:id', requireAuth, requireAdmin, edit);

// DELETE /api/courses/:id -> eliminar curso (solo administradores)
router.delete('/:id', requireAuth, requireAdmin, remove);

export default router;
