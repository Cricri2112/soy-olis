import { useEffect, useState } from 'react';
import { obtenerSesion, escucharSesion } from '../data/authApi.js';

// Sesión actual del admin. `cargando` es true hasta saber si hay sesión guardada.
export function useSesion() {
  const [sesion, setSesion] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    obtenerSesion().then((sesionGuardada) => {
      setSesion(sesionGuardada);
      setCargando(false);
    });

    // Si la sesión cambia en otra pestaña o vence, nos enteramos acá
    return escucharSesion(setSesion);
  }, []);

  return { sesion, cargando };
}
