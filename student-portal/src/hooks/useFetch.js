// ============================================================
// useFetch (Usuario 2) - capa de controlador
// Hook generico para consumir datos asincronos.
// Devuelve { data, loading, error, refetch } y maneja el ciclo de vida
// para evitar actualizaciones de estado tras desmontar el componente.
// ============================================================

import { useState, useEffect, useCallback, useRef } from 'react';

/**
 * @template T
 * @param {() => Promise<T>} fetcher  Funcion que ejecuta la peticion.
 * @param {Array<any>} [deps]         Dependencias que disparan el refetch.
 * @returns {{ data: T|null, loading: boolean, error: string|null, refetch: () => void }}
 */
export function useFetch(fetcher, deps = []) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const isMounted = useRef(true);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetcher();
      if (isMounted.current) setData(result);
    } catch (err) {
      if (isMounted.current) {
        const message =
          err.response?.data?.message ||
          err.message ||
          'Ocurrio un error al cargar los datos.';
        setError(message);
      }
    } finally {
      if (isMounted.current) setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  useEffect(() => {
    isMounted.current = true;
    load();
    return () => {
      isMounted.current = false;
    };
  }, [load]);

  return { data, loading, error, refetch: load };
}
