import { useEffect, useState } from 'react';
import { listarTodosLosProductos } from '../data/productosApi.js';

// Carga todos los productos (visibles y ocultos) para el panel.
// Devuelve también `setProductos` para que la lista se actualice en pantalla
// después de un cambio, sin volver a consultar la base.
export function useProductosAdmin() {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    listarTodosLosProductos()
      .then(setProductos)
      .catch(setError)
      .finally(() => setCargando(false));
  }, []);

  return { productos, setProductos, cargando, error };
}
