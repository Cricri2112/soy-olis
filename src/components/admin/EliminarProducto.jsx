import { useState } from 'react';
import './EliminarProducto.css';

// Botón "Eliminar producto" con confirmación en el lugar (sin ventanas emergentes).
// - nombre: para mostrarlo en la pregunta
// - alConfirmar: hace el borrado; si falla, lanza error
function EliminarProducto({ nombre, alConfirmar }) {
  const [confirmando, setConfirmando] = useState(false);
  const [eliminando, setEliminando] = useState(false);
  const [error, setError] = useState('');

  async function eliminar() {
    setError('');
    setEliminando(true);
    try {
      await alConfirmar();
    } catch {
      setError('No pudimos eliminar el producto. Probá de nuevo.');
      setEliminando(false);
    }
  }

  if (!confirmando) {
    return (
      <button type="button" onClick={() => setConfirmando(true)} className="eliminar-boton">
        Eliminar producto
      </button>
    );
  }

  return (
    <div className="eliminar-confirmacion">
      <p className="eliminar-pregunta">
        ¿Eliminar "{nombre}"? Se borran también sus fotos. No se puede deshacer.
      </p>
      {error && <p className="mensaje-error">{error}</p>}
      <div className="eliminar-acciones">
        <button type="button" onClick={() => setConfirmando(false)} disabled={eliminando} className="eliminar-cancelar">
          Cancelar
        </button>
        <button type="button" onClick={eliminar} disabled={eliminando} className="eliminar-confirmar">
          {eliminando ? 'Eliminando...' : 'Sí, eliminar'}
        </button>
      </div>
    </div>
  );
}

export default EliminarProducto;
