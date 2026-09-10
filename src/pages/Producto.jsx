import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import FotoPrenda from '../components/FotoPrenda.jsx';
import { buscarProducto, productosRelacionados } from '../data/productos.js';
import { linkWhatsApp, TEXTO_ENTREGA, TEXTO_CAMBIOS } from '../data/contacto.js';
import { formatearPrecio } from '../utils/precio.js';
import './Producto.css';

function Producto() {
  // useParams lee el ":id" de la URL /producto/:id
  const { id } = useParams();
  const producto = buscarProducto(id);

  if (!producto) {
    return (
      <main className="producto-no-encontrado">
        <p>No encontramos ese producto.</p>
        <Link to="/catalogo" className="producto-no-encontrado-link">Volver al catálogo</Link>
      </main>
    );
  }

  // El "key" hace que React arme la ficha de cero al cambiar de producto,
  // así el talle elegido no queda arrastrado de la prenda anterior.
  return <FichaProducto key={producto.id} producto={producto} />;
}

function FichaProducto({ producto }) {
  // Talle elegido por la clienta (null = todavía no eligió)
  const [talle, setTalle] = useState(null);
  // Foto visible en la galería (índice), para pintar el indicador de abajo
  const [fotoActual, setFotoActual] = useState(0);

  // Si el producto no tiene fotos, la galería muestra un solo placeholder
  const fotos = producto.fotos.length > 0 ? producto.fotos : [undefined];
  const relacionados = productosRelacionados(producto);

  // Al deslizar la galería, calcula qué foto quedó a la vista
  function alDeslizar(evento) {
    const galeria = evento.currentTarget;
    setFotoActual(Math.round(galeria.scrollLeft / galeria.clientWidth));
  }

  const mensaje =
    `Hola Olis! Quiero consultar por ${producto.nombre}` +
    (talle ? ` en talle ${talle}` : '') +
    ` (${formatearPrecio(producto.precio)}).`;

  return (
    <main className="producto">
      {/* Galería de fotos */}
      <div className="galeria">
        <div className="galeria-fotos" onScroll={alDeslizar}>
          {fotos.map((foto, indice) => (
            <div key={indice} className="galeria-foto">
              <FotoPrenda foto={foto} posicion={producto.posicionFoto} etiqueta={producto.nombre} />
            </div>
          ))}
        </div>
        <div className="galeria-puntos">
          {fotos.map((_, indice) => (
            <span
              key={indice}
              className={indice === fotoActual ? 'galeria-punto galeria-punto-activo' : 'galeria-punto'}
            ></span>
          ))}
        </div>
      </div>

      {/* Información del producto */}
      <div className="info">
        <div className="info-encabezado">
          <div className="etiqueta">
            {producto.categoria} · {producto.color}
          </div>
          <h1 className="info-nombre">{producto.nombre}</h1>
          <div className="info-precio">{formatearPrecio(producto.precio)}</div>
        </div>

        <p className="info-descripcion">{producto.descripcion}</p>

        <div className="talles">
          <div className="talles-encabezado">
            <div className="etiqueta">Talle</div>
            <div className="talles-ayuda">{talle ? `Elegiste ${talle}` : 'Elegí tu talle'}</div>
          </div>
          <div className="talles-lista">
            {producto.talles.map((opcion) => {
              const agotado = producto.agotados.includes(opcion);
              let clase = 'talle';
              if (agotado) clase += ' talle-agotado';
              if (opcion === talle) clase += ' talle-elegido';
              return (
                <button
                  key={opcion}
                  type="button"
                  disabled={agotado}
                  onClick={() => setTalle(opcion)}
                  className={clase}
                >
                  {opcion}
                </button>
              );
            })}
          </div>
        </div>

        <div className="datos">
          <div className="datos-fila">
            <span className="datos-nombre">Material</span>
            <span className="datos-valor">{producto.material}</span>
          </div>
          <div className="datos-fila">
            <span className="datos-nombre">Entrega</span>
            <span className="datos-valor">{TEXTO_ENTREGA}</span>
          </div>
          <div className="datos-fila">
            <span className="datos-nombre">Cambios</span>
            <span className="datos-valor">{TEXTO_CAMBIOS}</span>
          </div>
        </div>

        {relacionados.length > 0 && (
          <div className="combina">
            <h2 className="combina-titulo">Combiná con</h2>
            <div className="combina-grilla">
              {relacionados.map((otro) => (
                <Link key={otro.id} to={`/producto/${otro.id}`} className="combina-card">
                  <FotoPrenda foto={otro.fotos[0]} posicion={otro.posicionFoto} etiqueta={otro.nombre} />
                  <div className="combina-nombre">{otro.nombre}</div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Botón fijo abajo */}
      <div className="cta">
        <div className="cta-contenido">
          <a href={linkWhatsApp(mensaje)} target="_blank" rel="noreferrer" className="cta-boton">
            <span className="cta-punto"></span>
            Consultar por WhatsApp
          </a>
        </div>
      </div>
    </main>
  );
}

export default Producto;
