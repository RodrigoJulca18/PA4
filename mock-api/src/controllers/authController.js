// Controlador de autenticacion.
// Traduce las peticiones HTTP en llamadas al servicio de autenticacion.

import {
  validateCredentials,
  signToken,
  getUserById,
} from '../services/authService.js';

// POST /api/auth/login
// body: { email, password }
// Respuestas: 200 { token, user } | 401 { message }
export function login(req, res) {
  const { email, password } = req.body || {};

  if (!email || !password) {
    return res
      .status(401)
      .json({ message: 'Email y contrasena son obligatorios.' });
  }

  const user = validateCredentials(email, password);
  if (!user) {
    return res.status(401).json({ message: 'Credenciales invalidas.' });
  }

  const token = signToken(user);
  return res.status(200).json({
    token,
    user: { id: user.id, name: user.name, email: user.email, role: user.role },
  });
}

// GET /api/auth/me
// header: Authorization: Bearer <token>
// Respuestas: 200 { id, name, email, role } | 401
// El middleware requireAuth ya valido el token y adjunto req.user.
export function me(req, res) {
  const user = getUserById(req.user.id);
  if (!user) {
    return res.status(401).json({ message: 'Usuario no encontrado.' });
  }
  return res.status(200).json({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  });
}

export default { login, me };
