import { Link } from 'react-router-dom';
import FotoPrenda from './FotoPrenda.jsx';
import './Relacionados.css';

// Sección "Combiná con": hasta 3 prendas relacionadas.
function Relacionados({ productos }) {
  if (productos.length === 0) return null;

  return (
    <div className="combina">
      <h2 className="combina-titulo">Combiná con</h2>
      <div className="combina-grilla">
        {productos.map((producto) => (
          <Link key={producto.id} to={`/producto/${producto.slug}`} className="combina-card">
            <FotoPrenda foto={producto.fotos[0]?.url} etiqueta={producto.nombre} />
            <div className="combina-nombre">{producto.nombre}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Relacionados;
