import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Cada vez que cambia la URL, vuelve el scroll al principio de la página.
// Sin esto, al pasar del catálogo al detalle la página quedaría scrolleada.
function ScrollArriba() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default ScrollArriba;
