import { useState } from 'react';
import { Link } from 'react-router-dom';
import FotoPrenda from '../FotoPrenda.jsx';
import { formatearPrecio } from '../../utils/precio.js';
import './FilaProducto.css';

// Una fila de la lista del panel: foto, nombre, precio y el interruptor visible/oculto.
// alAlternarVisible recibe el producto y hace el cambio en la base.
function FilaProducto({ producto, alAlternarVisible }) {
  const [guardando, setGuardando] = useState(false);

  async function alternar() {
    setGuardando(true);
    await alAlternarVisible(producto);
    setGuardando(false);
  }

  return (
    <li className={producto.visible ? 'fila' : 'fila fila-oculta'}>
      {/* Tocar la foto o el texto abre la edición */}
      <Link to={`/admin/${producto.id}`} className="fila-foto">
        <FotoPrenda foto={producto.fotos[0]} etiqueta={producto.nombre} />
      </Link>

      <Link to={`/admin/${producto.id}`} className="fila-texto">
        <div className="fila-nombre">{producto.nombre}</div>
        <div className="fila-precio">{formatearPrecio(producto.precio)}</div>
        <div className="fila-estado">{producto.visible ? 'Visible en el sitio' : 'Oculto'}</div>
      </Link>

      <button
        type="button"
        role="switch"
        aria-checked={producto.visible}
        aria-label={producto.visible ? 'Ocultar del sitio' : 'Mostrar en el sitio'}
        disabled={guardando}
        onClick={alternar}
        className="interruptor"
      >
        <span className="interruptor-bola"></span>
      </button>
    </li>
  );
}

export default FilaProducto;
