// Servicio de autenticacion.
// Encapsula la logica de validacion de credenciales y el manejo de tokens JWT.

import jwt from 'jsonwebtoken';
import { config } from '../config/env.js';
import { users } from '../data/users.js';

// Quita el campo password de un usuario antes de devolverlo al cliente.
function stripPassword(user) {
  if (!user) return null;
  const { password, ...safeUser } = user;
  return safeUser;
}

// Valida email y contrasena contra los datos semilla.
// Devuelve el usuario (sin password) si las credenciales son correctas, o null si no.
export function validateCredentials(email, password) {
  const user = users.find(
    (u) => u.email === email && u.password === password
  );
  return user ? stripPassword(user) : null;
}

// Firma un token JWT con el id del usuario como subject.
// El token expira segun TOKEN_EXPIRES_IN (por defecto 2h).
export function signToken(user) {
  return jwt.sign(
    { sub: user.id, email: user.email, name: user.name, role: user.role },
    config.JWT_SECRET,
    { expiresIn: config.TOKEN_EXPIRES_IN }
  );
}

// Verifica un token JWT. Lanza una excepcion si es invalido o expiro.
export function verifyToken(token) {
  return jwt.verify(token, config.JWT_SECRET);
}

// Obtiene un usuario por id, devolviendolo sin la contrasena.
export function getUserById(id) {
  const user = users.find((u) => u.id === Number(id));
  return stripPassword(user);
}

export default {
  validateCredentials,
  signToken,
  verifyToken,
  getUserById,
};
