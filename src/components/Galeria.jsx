import { useRef, useState } from 'react';
import FotoPrenda from './FotoPrenda.jsx';
import './Galeria.css';

// Galería de fotos del detalle. En el celular se desliza con el dedo;
// con mouse se usan las flechas o los indicadores de abajo.
// Si no hay fotos, muestra un placeholder.
function Galeria({ fotos, nombre }) {
  const [fotoActual, setFotoActual] = useState(0);
  const contenedor = useRef(null);

  const fotosAMostrar = fotos.length > 0 ? fotos : [undefined];
  const hayVarias = fotosAMostrar.length > 1;

  // Al deslizar, calcula qué foto quedó a la vista según el scroll horizontal
  function alDeslizar(evento) {
    const elemento = evento.currentTarget;
    setFotoActual(Math.round(elemento.scrollLeft / elemento.clientWidth));
  }

  // Lleva el scroll hasta la foto pedida (los indicadores y las flechas usan esto)
  function irA(indice) {
    const elemento = contenedor.current;
    elemento.scrollTo({ left: indice * elemento.clientWidth, behavior: 'smooth' });
  }

  return (
    <div className="galeria">
      <div className="galeria-marco">
        <div ref={contenedor} className="galeria-fotos" onScroll={alDeslizar}>
          {fotosAMostrar.map((foto, indice) => (
            <div key={indice} className="galeria-foto">
              <FotoPrenda foto={foto} etiqueta={nombre} cargaInmediata={indice === 0} />
            </div>
          ))}
        </div>

        {hayVarias && (
          <>
            <button
              type="button"
              onClick={() => irA(fotoActual - 1)}
              disabled={fotoActual === 0}
              aria-label="Foto anterior"
              className="galeria-flecha galeria-flecha-izquierda"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={() => irA(fotoActual + 1)}
              disabled={fotoActual === fotosAMostrar.length - 1}
              aria-label="Foto siguiente"
              className="galeria-flecha galeria-flecha-derecha"
            >
              ›
            </button>
          </>
        )}
      </div>

      {hayVarias && (
        <div className="galeria-puntos">
          {fotosAMostrar.map((_, indice) => (
            <button
              key={indice}
              type="button"
              onClick={() => irA(indice)}
              aria-label={`Ver foto ${indice + 1}`}
              className={indice === fotoActual ? 'galeria-punto galeria-punto-activo' : 'galeria-punto'}
            ></button>
          ))}
        </div>
      )}
    </div>
  );
}

export default Galeria;
