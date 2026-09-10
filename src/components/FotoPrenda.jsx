import './FotoPrenda.css';

// Muestra una foto de la prenda en formato 3:4.
// Si no hay foto todavía, muestra un fondo rayado con una etiqueta.
// - foto: ruta de la imagen (o undefined)
// - posicion: object-position para el recorte (ej. "50% 20%")
// - etiqueta: texto para el placeholder y el alt
// - zoomAlPasar: agranda un poco la foto al pasar el mouse (grillas)
function FotoPrenda({ foto, posicion, etiqueta, zoomAlPasar = false }) {
  return (
    <div className="foto">
      {foto ? (
        <img
          src={foto}
          alt={etiqueta}
          className={zoomAlPasar ? 'foto-img foto-img-zoom' : 'foto-img'}
          style={{ objectPosition: posicion }}
        />
      ) : (
        <div className="foto-placeholder">
          <span className="foto-placeholder-texto">foto · {etiqueta}</span>
        </div>
      )}
    </div>
  );
}

export default FotoPrenda;
