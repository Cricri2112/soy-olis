import { Navigate, Outlet } from 'react-router-dom';
import { useSesion } from '../hooks/useSesion.js';
import MensajeEstado from './MensajeEstado.jsx';

// Envuelve las rutas de /admin: si no hay sesión, manda al login.
// <Outlet /> es donde React Router dibuja la ruta hija.
function RutaProtegida() {
  const { sesion, cargando } = useSesion();

  if (cargando) return <MensajeEstado cargando />;
  if (!sesion) return <Navigate to="/admin/login" replace />;

  return <Outlet />;
}

export default RutaProtegida;
