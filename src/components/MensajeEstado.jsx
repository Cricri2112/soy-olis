import './MensajeEstado.css';

// Mensaje centrado para los estados de una consulta: cargando, error o sin resultados.
// Devuelve null si no hay nada que mostrar (hay datos).
function MensajeEstado({ cargando, error, vacio, textoVacio = 'Todavía no hay prendas cargadas.' }) {
  if (cargando) return <p className="estado">Cargando...</p>;
  if (error) return <p className="estado estado-error">No pudimos cargar el catálogo. Probá de nuevo en un rato.</p>;
  if (vacio) return <p className="estado">{textoVacio}</p>;
  return null;
}

export default MensajeEstado;
