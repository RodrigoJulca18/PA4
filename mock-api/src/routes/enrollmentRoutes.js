// Rutas de inscripciones (todas protegidas con requireAuth).

import { Router } from 'express';
import {
  list,
  add,
  remove,
} from '../controllers/enrollmentController.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

// Aplica autenticacion a todas las rutas de este router.
router.use(requireAuth);

// GET /api/enrollments -> inscripciones del usuario actual
router.get('/', list);

// POST /api/enrollments -> crear inscripcion
router.post('/', add);

// DELETE /api/enrollments/:id -> eliminar inscripcion
router.delete('/:id', remove);

export default router;
