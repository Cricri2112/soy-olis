import './SelectorTalles.css';

// Botones para elegir talle.
// - talles: talles de la prenda
// - elegido: talle seleccionado (null si todavía no eligió)
// - alElegir: función que recibe el talle elegido
function SelectorTalles({ talles, elegido, alElegir }) {
  return (
    <div className="talles">
      <div className="talles-encabezado">
        <div className="etiqueta">Talle</div>
        <div className="talles-ayuda">{elegido ? `Elegiste ${elegido}` : 'Elegí tu talle'}</div>
      </div>
      <div className="talles-lista">
        {talles.map((talle) => (
          <button
            key={talle}
            type="button"
            onClick={() => alElegir(talle)}
            className={talle === elegido ? 'talle talle-elegido' : 'talle'}
          >
            {talle}
          </button>
        ))}
      </div>
    </div>
  );
}

export default SelectorTalles;
