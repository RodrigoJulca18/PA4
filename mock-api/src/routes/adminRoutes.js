// Rutas de administracion.
// Todas requieren autenticacion y rol de administrador.
// Se montan bajo /api/admin desde routes/index.js.

import { Router } from 'express';
import { listAllGrouped } from '../controllers/enrollmentController.js';
import { requireAuth, requireAdmin } from '../middleware/auth.js';

const router = Router();

// Aplica autenticacion y autorizacion de administrador a todo el router.
router.use(requireAuth, requireAdmin);

// GET /api/admin/enrollments -> inscripciones agrupadas por usuario
router.get('/enrollments', listAllGrouped);

export default router;
