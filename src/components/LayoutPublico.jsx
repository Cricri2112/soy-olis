import { Outlet } from 'react-router-dom';
import Header from './Header.jsx';

// Envoltorio de las vistas públicas: el header de la marca arriba y la página abajo.
function LayoutPublico() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default LayoutPublico;
