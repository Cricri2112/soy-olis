import { useState } from 'react';
import FotoPrenda from './FotoPrenda.jsx';
import './Galeria.css';

// Galería de fotos del detalle: se desliza de costado y muestra
// un indicador con la foto actual. Si no hay fotos, muestra un placeholder.
function Galeria({ fotos, posicion, nombre }) {
  const [fotoActual, setFotoActual] = useState(0);

  const fotosAMostrar = fotos.length > 0 ? fotos : [undefined];

  // Al deslizar, calcula qué foto quedó a la vista según el scroll horizontal
  function alDeslizar(evento) {
    const contenedor = evento.currentTarget;
    setFotoActual(Math.round(contenedor.scrollLeft / contenedor.clientWidth));
  }

  return (
    <div className="galeria">
      <div className="galeria-fotos" onScroll={alDeslizar}>
        {fotosAMostrar.map((foto, indice) => (
          <div key={indice} className="galeria-foto">
            <FotoPrenda
              foto={foto}
              posicion={posicion}
              etiqueta={nombre}
              cargaInmediata={indice === 0}
            />
          </div>
        ))}
      </div>
      <div className="galeria-puntos">
        {fotosAMostrar.map((_, indice) => (
          <span
            key={indice}
            className={indice === fotoActual ? 'galeria-punto galeria-punto-activo' : 'galeria-punto'}
          ></span>
        ))}
      </div>
    </div>
  );
}

export default Galeria;
