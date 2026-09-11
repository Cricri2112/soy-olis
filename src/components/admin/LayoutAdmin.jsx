import { Link, Outlet, useNavigate } from 'react-router-dom';
import { cerrarSesion } from '../../data/authApi.js';
import '../../pages/admin/admin.css';
import './LayoutAdmin.css';

// Envoltorio de las vistas del panel: barra superior con salida y la página abajo.
function LayoutAdmin() {
  const navegar = useNavigate();

  async function salir() {
    await cerrarSesion();
    navegar('/admin/login', { replace: true });
  }

  return (
    <div className="admin">
      <header className="admin-barra">
        <Link to="/admin" className="admin-barra-titulo">
          <span className="admin-barra-marca">soy Olis.</span> Panel
        </Link>
        <nav className="admin-barra-acciones">
          <Link to="/" className="admin-barra-link">Ver sitio</Link>
          <button type="button" onClick={salir} className="admin-barra-link">Salir</button>
        </nav>
      </header>
      <Outlet />
    </div>
  );
}

export default LayoutAdmin;
