// ============================================================
// AuthContext (Usuario 1) - capa de controlador
// Proveedor que mantiene el estado de la sesion (user, token, loading)
// y expone las acciones login() y logout().
// ============================================================

import { createContext, useState, useEffect, useCallback } from 'react';
import * as authService from '../services/authService.js';
import { getToken, setToken, clearToken } from '../utils/tokenStorage.js';

// El contexto se exporta para que el hook useAuth lo consuma.
export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setTokenState] = useState(getToken());
  // loading=true mientras se verifica si hay una sesion valida al arrancar.
  const [loading, setLoading] = useState(true);

  // Bootstrap: si existe un token al montar, intentamos recuperar el
  // perfil del usuario. Si el token es invalido, limpiamos la sesion.
  useEffect(() => {
    let active = true;

    async function bootstrap() {
      const stored = getToken();
      if (!stored) {
        setLoading(false);
        return;
      }
      try {
        const profile = await authService.getProfile();
        if (active) {
          setUser(profile);
          setTokenState(stored);
        }
      } catch {
        // Token invalido o expirado: limpiamos.
        clearToken();
        if (active) {
          setUser(null);
          setTokenState(null);
        }
      } finally {
        if (active) setLoading(false);
      }
    }

    bootstrap();
    return () => {
      active = false;
    };
  }, []);

  // Inicia sesion: guarda el token y el usuario en el estado global.
  const login = useCallback(async (credentials) => {
    const { token: newToken, user: loggedUser } = await authService.login(
      credentials
    );
    setToken(newToken);
    setTokenState(newToken);
    setUser(loggedUser);
    return loggedUser;
  }, []);

  // Cierra sesion: limpia el token almacenado y el estado.
  const logout = useCallback(() => {
    clearToken();
    setTokenState(null);
    setUser(null);
  }, []);

  const value = {
    user,
    token,
    loading,
    isAuthenticated: Boolean(user && token),
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
