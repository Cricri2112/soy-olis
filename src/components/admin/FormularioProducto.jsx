import { useState } from 'react';
import SelectorTallesAdmin from './SelectorTallesAdmin.jsx';
import { generarSlug } from '../../utils/slug.js';
import './FormularioProducto.css';

// Formulario de alta y edición. Lo obligatorio va arriba: nombre, precio y talles.
// Lo opcional (descripción, categoría, destacado, slug) queda plegado en "Más opciones".
// - inicial: producto a editar, o undefined para uno nuevo
// - alGuardar: recibe { datos, talles } y guarda en la base; si falla, lanza error
// - textoBoton: "Publicar" o "Guardar cambios"
function FormularioProducto({ inicial, alGuardar, textoBoton }) {
  const [nombre, setNombre] = useState(inicial?.nombre ?? '');
  const [precio, setPrecio] = useState(inicial ? String(inicial.precio) : '');
  const [talles, setTalles] = useState(inicial?.talles ?? []);
  const [descripcion, setDescripcion] = useState(inicial?.descripcion ?? '');
  const [categoria, setCategoria] = useState(inicial?.categoria ?? 'prendas');
  const [destacado, setDestacado] = useState(inicial?.destacado ?? false);
  const [slug, setSlug] = useState(inicial?.slug ?? '');
  // Mientras no toquen el slug a mano, se arma solo a partir del nombre
  const [slugManual, setSlugManual] = useState(Boolean(inicial));

  const [error, setError] = useState('');
  const [guardando, setGuardando] = useState(false);

  function alCambiarNombre(valor) {
    setNombre(valor);
    if (!slugManual) setSlug(generarSlug(valor));
  }

  function alCambiarSlug(valor) {
    setSlugManual(true);
    setSlug(generarSlug(valor));
  }

  async function enviar(evento) {
    evento.preventDefault();
    const problema = validar({ nombre, precio, talles });
    if (problema) {
      setError(problema);
      return;
    }

    setError('');
    setGuardando(true);
    try {
      await alGuardar({
        datos: {
          nombre: nombre.trim(),
          slug: slug || generarSlug(nombre) || 'producto',
          precio: Number(precio),
          descripcion: descripcion.trim() || null,
          categoria: categoria.trim() || 'prendas',
          destacado,
        },
        talles,
      });
    } catch {
      setError('No pudimos guardar el producto. Revisá la conexión y probá de nuevo.');
      setGuardando(false);
    }
  }

  return (
    <form onSubmit={enviar} className="formulario">
      <label className="campo">
        <span className="campo-etiqueta">Nombre</span>
        <input
          type="text"
          value={nombre}
          onChange={(e) => alCambiarNombre(e.target.value)}
          className="campo-entrada"
          placeholder="Body crema"
          autoFocus={!inicial}
        />
      </label>

      <label className="campo">
        <span className="campo-etiqueta">Precio en pesos</span>
        <input
          type="number"
          inputMode="numeric"
          min="0"
          step="1"
          value={precio}
          onChange={(e) => setPrecio(e.target.value)}
          className="campo-entrada"
          placeholder="1990"
        />
      </label>

      <div className="campo">
        <span className="campo-etiqueta">Talles</span>
        <SelectorTallesAdmin elegidos={talles} alCambiar={setTalles} />
      </div>

      <details className="formulario-opcionales">
        <summary className="formulario-opcionales-titulo">Más opciones</summary>

        <label className="campo">
          <span className="campo-etiqueta">Descripción</span>
          <textarea
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            className="campo-entrada campo-area"
            rows="4"
          />
        </label>

        <label className="campo">
          <span className="campo-etiqueta">Categoría</span>
          <input
            type="text"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            className="campo-entrada"
          />
        </label>

        <label className="campo campo-fila">
          <input
            type="checkbox"
            checked={destacado}
            onChange={(e) => setDestacado(e.target.checked)}
            className="campo-casilla"
          />
          <span>Destacado en la Home ("Lo esencial")</span>
        </label>

        <label className="campo">
          <span className="campo-etiqueta">Dirección en el sitio</span>
          <input
            type="text"
            value={slug}
            onChange={(e) => alCambiarSlug(e.target.value)}
            className="campo-entrada"
          />
          <span className="campo-ayuda">/producto/{slug || '...'}</span>
        </label>
      </details>

      {error && <p className="mensaje-error">{error}</p>}

      <button type="submit" disabled={guardando} className="boton-principal">
        {guardando ? 'Guardando...' : textoBoton}
      </button>
    </form>
  );
}

// Devuelve el texto del problema, o '' si está todo bien.
function validar({ nombre, precio, talles }) {
  if (!nombre.trim()) return 'Poné un nombre.';
  if (precio === '' || !Number.isInteger(Number(precio)) || Number(precio) < 0) {
    return 'El precio tiene que ser un número entero, sin decimales.';
  }
  if (talles.length === 0) return 'Elegí al menos un talle.';
  return '';
}

export default FormularioProducto;
