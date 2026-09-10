import { Link } from 'react-router-dom';
import FotoPrenda from './FotoPrenda.jsx';
import { formatearPrecio } from '../utils/precio.js';
import './ProductoCard.css';

// Tarjeta de un producto en una grilla.
// conEtiquetas: en el catálogo se muestran además "Nuevo" / "Sin stock" y el color.
function ProductoCard({ producto, conEtiquetas = false }) {
  return (
    <Link to={`/producto/${producto.id}`} className="card">
      <div className="card-foto">
        <FotoPrenda
          foto={producto.fotos[0]}
          posicion={producto.posicionFoto}
          etiqueta={producto.nombre}
          zoomAlPasar
        />
        {conEtiquetas && <EtiquetaCard producto={producto} />}
      </div>
      <div className="card-texto">
        <div className="card-nombre">{producto.nombre}</div>
        <div className="card-detalle">
          <span>{formatearPrecio(producto.precio)}</span>
          {conEtiquetas && <span className="card-color">{producto.color}</span>}
        </div>
      </div>
    </Link>
  );
}

// Etiqueta chica sobre la foto. "Sin stock" tiene prioridad sobre "Nuevo".
function EtiquetaCard({ producto }) {
  if (!producto.disponible) return <span className="card-etiqueta">Sin stock</span>;
  if (producto.nuevo) return <span className="card-etiqueta">Nuevo</span>;
  return null;
}

export default ProductoCard;
