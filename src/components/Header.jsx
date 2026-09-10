import { Link, useLocation } from 'react-router-dom';
import './Header.css';

function Header() {
  const { pathname } = useLocation();
  const enHome = pathname === '/';
  const enProducto = pathname.startsWith('/producto/');

  // En la Home el header va superpuesto sobre la foto de portada, sin fondo
  return (
    <header className={enHome ? 'header header-sobre-foto' : 'header'}>
      <div className="header-contenido">
        {enHome ? (
          <span className="etiqueta">Montevideo · UY</span>
        ) : (
          <Link to={enProducto ? '/catalogo' : '/'} className="header-volver">
            <span className="header-flecha">←</span>
            {enProducto ? 'Catálogo' : 'Inicio'}
          </Link>
        )}

        <Link to="/" className="header-logo">
          <span className="header-logo-soy">soy</span>
          <span>Olis.</span>
        </Link>

        <Link to="/catalogo" className="header-catalogo">Catálogo</Link>
      </div>
    </header>
  );
}

export default Header;
