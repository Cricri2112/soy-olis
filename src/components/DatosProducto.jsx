import { TEXTO_ENTREGA, TEXTO_CAMBIOS } from '../data/contacto.js';
import './DatosProducto.css';

// Tabla chica con material, entrega y cambios.
function DatosProducto({ material }) {
  return (
    <div className="datos">
      <FilaDato nombre="Material" valor={material} />
      <FilaDato nombre="Entrega" valor={TEXTO_ENTREGA} />
      <FilaDato nombre="Cambios" valor={TEXTO_CAMBIOS} />
    </div>
  );
}

function FilaDato({ nombre, valor }) {
  return (
    <div className="datos-fila">
      <span className="datos-nombre">{nombre}</span>
      <span className="datos-valor">{valor}</span>
    </div>
  );
}

export default DatosProducto;
