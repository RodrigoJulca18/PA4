// Middleware de autenticacion.
// Lee el token del encabezado Authorization (formato "Bearer <token>"),
// lo verifica y adjunta los datos del usuario a req.user.

import { verifyToken } from '../services/authService.js';

export function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization || '';
  const [scheme, token] = authHeader.split(' ');

  // Verifica que el encabezado tenga el formato esperado.
  if (scheme !== 'Bearer' || !token) {
    return res
      .status(401)
      .json({ message: 'Token de autenticacion no proporcionado.' });
  }

  try {
    const payload = verifyToken(token);
    // El subject (sub) contiene el id del usuario.
    req.user = {
      id: payload.sub,
      email: payload.email,
      name: payload.name,
      role: payload.role,
    };
    return next();
  } catch (err) {
    return res
      .status(401)
      .json({ message: 'Token invalido o expirado.' });
  }
}

// Middleware de autorizacion para administradores.
// Debe ejecutarse SIEMPRE despues de requireAuth (necesita req.user).
// Responde 403 si el usuario autenticado no tiene rol "admin".
export function requireAdmin(req, res, next) {
  if (!req.user || req.user.role !== 'admin') {
    return res
      .status(403)
      .json({ message: 'Acceso restringido a administradores.' });
  }
  return next();
}

export default { requireAuth, requireAdmin };
