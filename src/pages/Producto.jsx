import { useParams, Link } from 'react-router-dom';
import { buscarProducto } from '../data/productos.js';
import { linkWhatsApp } from '../data/contacto.js';
import { formatearPrecio } from '../utils/precio.js';
import './Producto.css';

function Producto() {
  // useParams lee el ":id" de la URL /producto/:id
  const { id } = useParams();
  const producto = buscarProducto(id);

  if (!producto) {
    return (
      <main className="producto producto-no-encontrado">
        <p>No encontramos ese producto.</p>
        <Link to="/catalogo" className="producto-volver">Volver al catálogo</Link>
      </main>
    );
  }

  const mensaje = `Hola! Quiero consultar por: ${producto.nombre}`;

  return (
    <main className="producto">
      <Link to="/catalogo" className="producto-volver">← Catálogo</Link>

      <div className="producto-fotos">
        {producto.fotos.map((foto) => (
          <img key={foto} src={foto} alt={producto.nombre} className="producto-foto" />
        ))}
      </div>

      <div className="producto-info">
        <h1 className="producto-nombre">{producto.nombre}</h1>
        <p className="producto-precio">{formatearPrecio(producto.precio)}</p>
        <p className="producto-descripcion">{producto.descripcion}</p>

        <p className="producto-talles-titulo">Talles disponibles</p>
        <ul className="producto-talles">
          {producto.talles.map((talle) => (
            <li key={talle} className="producto-talle">{talle}</li>
          ))}
        </ul>

        <a
          href={linkWhatsApp(mensaje)}
          target="_blank"
          rel="noreferrer"
          className="producto-whatsapp"
        >
          Consultar por WhatsApp
        </a>
      </div>
    </main>
  );
}

export default Producto;
