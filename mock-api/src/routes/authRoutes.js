// Rutas de autenticacion.

import { Router } from 'express';
import { login, me } from '../controllers/authController.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

// POST /api/auth/login -> inicio de sesion (publico)
router.post('/login', login);

// GET /api/auth/me -> datos del usuario autenticado (protegido)
router.get('/me', requireAuth, me);

export default router;
