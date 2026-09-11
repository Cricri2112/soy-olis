import { useState } from 'react';
import { comprimirImagen } from '../../utils/imagen.js';
import './FotosAdmin.css';

// Fotos del producto en el formulario: agregar desde el celular, ver, reordenar y quitar.
// Nada se sube acá: las fotos nuevas quedan en memoria y se suben al guardar el formulario.
// - fotos: lista ordenada. Cada una es guardada ({ id, ruta, url }) o nueva ({ nueva: true, archivo, nombre, url }).
// - alCambiar: recibe la lista nueva
function FotosAdmin({ fotos, alCambiar }) {
  const [preparando, setPreparando] = useState(false);
  const [error, setError] = useState('');

  async function agregar(evento) {
    const archivos = [...evento.target.files];
    evento.target.value = ''; // permite volver a elegir el mismo archivo
    if (archivos.length === 0) return;

    setError('');
    setPreparando(true);
    try {
      const nuevas = [];
      for (const archivo of archivos) {
        const comprimida = await comprimirImagen(archivo);
        nuevas.push({
          nueva: true,
          clave: `nueva-${Date.now()}-${nuevas.length}`,
          archivo: comprimida,
          nombre: archivo.name,
          url: URL.createObjectURL(comprimida),
        });
      }
      alCambiar([...fotos, ...nuevas]);
    } catch {
      setError('No pudimos leer alguna de las fotos. Probá con otra.');
    }
    setPreparando(false);
  }

  function quitar(indice) {
    alCambiar(fotos.filter((_, i) => i !== indice));
  }

  // Intercambia la foto con la vecina de arriba (-1) o de abajo (+1)
  function mover(indice, direccion) {
    const destino = indice + direccion;
    if (destino < 0 || destino >= fotos.length) return;
    const lista = [...fotos];
    [lista[indice], lista[destino]] = [lista[destino], lista[indice]];
    alCambiar(lista);
  }

  return (
    <div className="fotos-admin">
      <div className="fotos-admin-grilla">
        {fotos.map((foto, indice) => (
          <div key={foto.clave ?? foto.id} className="fotos-admin-item">
            <img src={foto.url} alt="" className="fotos-admin-img" />
            {indice === 0 && <span className="fotos-admin-principal">Principal</span>}
            <div className="fotos-admin-acciones">
              <button type="button" onClick={() => mover(indice, -1)} disabled={indice === 0} aria-label="Mover antes">
                ←
              </button>
              <button type="button" onClick={() => quitar(indice)} aria-label="Quitar foto">
                ✕
              </button>
              <button type="button" onClick={() => mover(indice, 1)} disabled={indice === fotos.length - 1} aria-label="Mover después">
                →
              </button>
            </div>
          </div>
        ))}

        <label className={preparando ? 'fotos-admin-agregar fotos-admin-agregar-ocupado' : 'fotos-admin-agregar'}>
          <input type="file" accept="image/*" multiple onChange={agregar} disabled={preparando} />
          <span className="fotos-admin-agregar-mas">+</span>
          <span>{preparando ? 'Preparando...' : 'Agregar fotos'}</span>
        </label>
      </div>

      {error && <p className="mensaje-error">{error}</p>}
      <p className="campo-ayuda">La primera foto es la que se ve en el catálogo. Podés ordenarlas con las flechas.</p>
    </div>
  );
}

export default FotosAdmin;
