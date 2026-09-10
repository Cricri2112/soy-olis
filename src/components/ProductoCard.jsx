import { Link } from 'react-router-dom';
import { formatearPrecio } from '../utils/precio.js';
import './ProductoCard.css';

// Tarjeta de un producto en la grilla del catálogo.
function ProductoCard({ producto }) {
  return (
    <Link to={`/producto/${producto.id}`} className="card">
      <img src={producto.fotos[0]} alt={producto.nombre} className="card-foto" />
      <h3 className="card-nombre">{producto.nombre}</h3>
      <p className="card-precio">{formatearPrecio(producto.precio)}</p>
    </Link>
  );
}

export default ProductoCard;
