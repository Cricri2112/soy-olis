import { Link } from 'react-router-dom';
import FotoPrenda from './FotoPrenda.jsx';
import { formatearPrecio } from '../utils/precio.js';
import { esNuevo } from '../utils/catalogo.js';
import './ProductoCard.css';

// Tarjeta de un producto en una grilla.
// conEtiquetas: en el catálogo se muestra además la marca "Nuevo".
function ProductoCard({ producto, conEtiquetas = false }) {
  return (
    <Link to={`/producto/${producto.slug}`} className="card">
      <div className="card-foto">
        <FotoPrenda foto={producto.fotos[0]?.url} etiqueta={producto.nombre} zoomAlPasar />
        {conEtiquetas && esNuevo(producto) && <span className="card-etiqueta">Nuevo</span>}
      </div>
      <div className="card-texto">
        <div className="card-nombre">{producto.nombre}</div>
        <div className="card-detalle">
          <span>{formatearPrecio(producto.precio)}</span>
        </div>
      </div>
    </Link>
  );
}

export default ProductoCard;
