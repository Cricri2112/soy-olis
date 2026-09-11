import { useEffect, useState } from 'react';
import { listarProductosVisibles } from '../data/productosApi.js';

// Carga los productos visibles al montar la página.
// Devuelve la lista más los estados de carga y error para mostrarlos en pantalla.
export function useCatalogo() {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    listarProductosVisibles()
      .then(setProductos)
      .catch(setError)
      .finally(() => setCargando(false));
  }, []);

  return { productos, cargando, error };
}
