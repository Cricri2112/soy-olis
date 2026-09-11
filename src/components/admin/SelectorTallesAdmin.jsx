import { useState } from 'react';
import './SelectorTallesAdmin.css';

const TALLES_COMUNES = ['XS', 'S', 'M', 'L', 'XL', 'Único'];

// Chips para elegir varios talles, más un campo para escribir uno distinto.
// - elegidos: lista de talles del producto
// - alCambiar: recibe la lista nueva
function SelectorTallesAdmin({ elegidos, alCambiar }) {
  const [otro, setOtro] = useState('');

  // Los talles que no están en la lista común (por ejemplo "38") también se muestran como chips
  const opciones = [...TALLES_COMUNES, ...elegidos.filter((t) => !TALLES_COMUNES.includes(t))];

  function alternar(talle) {
    if (elegidos.includes(talle)) alCambiar(elegidos.filter((t) => t !== talle));
    else alCambiar([...elegidos, talle]);
  }

  function agregarOtro() {
    const talle = otro.trim();
    if (talle && !elegidos.includes(talle)) alCambiar([...elegidos, talle]);
    setOtro('');
  }

  // Enter en el campo "otro" agrega el talle sin enviar el formulario
  function alTeclear(evento) {
    if (evento.key === 'Enter') {
      evento.preventDefault();
      agregarOtro();
    }
  }

  return (
    <div className="talles-admin">
      <div className="talles-admin-lista">
        {opciones.map((talle) => (
          <button
            key={talle}
            type="button"
            onClick={() => alternar(talle)}
            className={elegidos.includes(talle) ? 'chip chip-activo' : 'chip'}
          >
            {talle}
          </button>
        ))}
      </div>
      <div className="talles-admin-otro">
        <input
          type="text"
          value={otro}
          onChange={(e) => setOtro(e.target.value)}
          onKeyDown={alTeclear}
          placeholder="Otro talle (ej. 38)"
          className="campo-entrada"
        />
        <button type="button" onClick={agregarOtro} className="chip">
          Agregar
        </button>
      </div>
    </div>
  );
}

export default SelectorTallesAdmin;
