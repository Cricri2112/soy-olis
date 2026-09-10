import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Galeria from '../components/Galeria.jsx';
import SelectorTalles from '../components/SelectorTalles.jsx';
import DatosProducto from '../components/DatosProducto.jsx';
import Relacionados from '../components/Relacionados.jsx';
import BotonWhatsApp from '../components/BotonWhatsApp.jsx';
import { buscarProducto, productosRelacionados } from '../data/productos.js';
import { TEXTO_SIN_STOCK } from '../data/contacto.js';
import { formatearPrecio } from '../utils/precio.js';
import { linkWhatsApp, mensajeConsulta } from '../utils/whatsapp.js';
import './Producto.css';

function Producto() {
  // useParams lee el ":id" de la URL /producto/:id
  const { id } = useParams();
  const producto = buscarProducto(id);

  if (!producto) return <ProductoNoEncontrado />;

  // El "key" hace que React arme la ficha de cero al cambiar de producto,
  // así el talle elegido no queda arrastrado de la prenda anterior.
  return <FichaProducto key={producto.id} producto={producto} />;
}

function FichaProducto({ producto }) {
  // Talle elegido por la clienta (null = todavía no eligió)
  const [talle, setTalle] = useState(null);

  return (
    <main className="producto">
      <Galeria fotos={producto.fotos} posicion={producto.posicionFoto} nombre={producto.nombre} />

      <div className="info">
        <div className="info-encabezado">
          <div className="etiqueta">
            {producto.categoria} · {producto.color}
          </div>
          <h1 className="info-nombre">{producto.nombre}</h1>
          <div className="info-precio">{formatearPrecio(producto.precio)}</div>
        </div>

        <p className="info-descripcion">{producto.descripcion}</p>

        {producto.disponible ? (
          <SelectorTalles
            talles={producto.talles}
            agotados={producto.agotados}
            elegido={talle}
            alElegir={setTalle}
          />
        ) : (
          <p className="info-sin-stock">{TEXTO_SIN_STOCK}</p>
        )}

        <DatosProducto material={producto.material} />
        <Relacionados productos={productosRelacionados(producto)} />
      </div>

      <BotonWhatsApp link={linkWhatsApp(mensajeConsulta(producto, talle))} />
    </main>
  );
}

function ProductoNoEncontrado() {
  return (
    <main className="producto-no-encontrado">
      <p>No encontramos ese producto.</p>
      <Link to="/catalogo" className="producto-no-encontrado-link">Volver al catálogo</Link>
    </main>
  );
}

export default Producto;
