import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Galeria from '../components/Galeria.jsx';
import SelectorTalles from '../components/SelectorTalles.jsx';
import DatosProducto from '../components/DatosProducto.jsx';
import Relacionados from '../components/Relacionados.jsx';
import BotonWhatsApp from '../components/BotonWhatsApp.jsx';
import MensajeEstado from '../components/MensajeEstado.jsx';
import { useCatalogo } from '../hooks/useCatalogo.js';
import { productosRelacionados } from '../utils/catalogo.js';
import { formatearPrecio } from '../utils/precio.js';
import { linkWhatsApp, mensajeConsulta } from '../utils/whatsapp.js';
import './Producto.css';

function Producto() {
  // useParams lee el ":slug" de la URL /producto/:slug
  const { slug } = useParams();
  const { productos, cargando, error } = useCatalogo();

  if (cargando || error) return <MensajeEstado cargando={cargando} error={error} />;

  const producto = productos.find((candidato) => candidato.slug === slug);
  if (!producto) return <ProductoNoEncontrado />;

  // El "key" hace que React arme la ficha de cero al cambiar de producto,
  // así el talle elegido no queda arrastrado de la prenda anterior.
  return (
    <FichaProducto
      key={producto.id}
      producto={producto}
      relacionados={productosRelacionados(productos, producto)}
    />
  );
}

function FichaProducto({ producto, relacionados }) {
  // Talle elegido por la clienta (null = todavía no eligió)
  const [talle, setTalle] = useState(null);

  return (
    <main className="producto">
      <Galeria fotos={producto.fotos} nombre={producto.nombre} />

      <div className="info">
        <div className="info-encabezado">
          <div className="etiqueta">{producto.categoria}</div>
          <h1 className="info-nombre">{producto.nombre}</h1>
          <div className="info-precio">{formatearPrecio(producto.precio)}</div>
        </div>

        {producto.descripcion && <p className="info-descripcion">{producto.descripcion}</p>}

        {producto.talles.length > 0 && (
          <SelectorTalles talles={producto.talles} elegido={talle} alElegir={setTalle} />
        )}

        <DatosProducto />
        <Relacionados productos={relacionados} />
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
