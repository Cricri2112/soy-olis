import './SelectorTalles.css';

// Botones para elegir talle. Los agotados se ven tachados y no se pueden elegir.
// - talles: todos los talles de la prenda
// - agotados: talles sin stock
// - elegido: talle seleccionado (null si todavía no eligió)
// - alElegir: función que recibe el talle elegido
function SelectorTalles({ talles, agotados, elegido, alElegir }) {
  return (
    <div className="talles">
      <div className="talles-encabezado">
        <div className="etiqueta">Talle</div>
        <div className="talles-ayuda">{elegido ? `Elegiste ${elegido}` : 'Elegí tu talle'}</div>
      </div>
      <div className="talles-lista">
        {talles.map((talle) => (
          <BotonTalle
            key={talle}
            talle={talle}
            agotado={agotados.includes(talle)}
            elegido={talle === elegido}
            alElegir={alElegir}
          />
        ))}
      </div>
    </div>
  );
}

function BotonTalle({ talle, agotado, elegido, alElegir }) {
  let clase = 'talle';
  if (agotado) clase += ' talle-agotado';
  if (elegido) clase += ' talle-elegido';

  return (
    <button type="button" disabled={agotado} onClick={() => alElegir(talle)} className={clase}>
      {talle}
    </button>
  );
}

export default SelectorTalles;
