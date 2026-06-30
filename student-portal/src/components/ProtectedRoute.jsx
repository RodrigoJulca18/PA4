// ============================================================
// ProtectedRoute (Usuario 1)
// Protege rutas privadas: muestra un loader mientras se verifica la
// sesion y redirige a /login si el usuario no esta autenticado.
// Acepta un rol requerido opcional (requiredRole): si el usuario
// autenticado no tiene ese rol, se le redirige al catalogo de cursos.
// ============================================================

import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.js';
import Loader from './Loader.jsx';

export default function ProtectedRoute({ children, requiredRole }) {
  const { isAuthenticated, user, loading } = useAuth();
  const location = useLocation();

  // Mientras se ejecuta el bootstrap (verificacion del token) mostramos
  // un indicador de carga para evitar redirecciones prematuras.
  if (loading) {
    return <Loader text="Verificando sesion..." />;
  }

  if (!isAuthenticated) {
    // Guardamos la ruta original para poder volver tras iniciar sesion.
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  // Si se exige un rol concreto y el usuario no lo cumple, lo enviamos al
  // catalogo de cursos. Si el rol no viene en el perfil, se trata como
  // 'student' por defecto.
  if (requiredRole) {
    const role = user?.role || 'student';
    if (role !== requiredRole) {
      return <Navigate to="/cursos" replace />;
    }
  }

  return children;
}
