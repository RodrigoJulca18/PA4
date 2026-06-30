// ============================================================
// tokenStorage (Usuario 1)
// Helper responsable del almacenamiento del token JWT.
//
// Decision de diseno / trade-offs:
// Guardamos el token en localStorage bajo una clave con namespace.
// - PRO: simple, persiste entre recargas y es facil de leer desde el
//   interceptor de axios.
// - CONTRA: es accesible desde JavaScript, por lo que es vulnerable a
//   ataques XSS. La alternativa mas segura seria una cookie httpOnly
//   (no accesible desde JS) gestionada por el backend, que mitiga XSS
//   pero requiere proteccion CSRF y control del servidor.
// Para una SPA academica que consume una API por Bearer token,
// localStorage es una opcion aceptable y centralizamos el acceso aqui
// para poder cambiar la estrategia en un unico lugar.
// ============================================================

const TOKEN_KEY = 'student-portal:token';

/** Guarda el token JWT. */
export function setToken(token) {
  if (token) {
    localStorage.setItem(TOKEN_KEY, token);
  }
}

/** Devuelve el token JWT almacenado o null si no existe. */
export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

/** Elimina el token JWT (cierre de sesion / 401). */
export function clearToken() {
  localStorage.removeItem(TOKEN_KEY);
}
