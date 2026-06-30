// ============================================================
// useAuth (Usuario 1)
// Hook que consume el AuthContext y valida que se use dentro del provider.
// ============================================================

import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext.jsx';

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error('useAuth debe usarse dentro de un <AuthProvider>.');
  }
  return context;
}
