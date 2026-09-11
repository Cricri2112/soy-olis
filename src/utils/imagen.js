// Achica y comprime una foto en el navegador antes de subirla.
// Una foto de celular (4000 px, 5 MB) queda en 1600 px y unos 200-400 KB.
// Se usa <canvas>, que viene con el navegador: no hace falta ninguna librería.

const LADO_MAXIMO = 1600;
const CALIDAD_JPEG = 0.85;

// Devuelve un Blob JPEG listo para subir.
export async function comprimirImagen(archivo) {
  const imagen = await cargarImagen(archivo);

  // Si la foto ya es chica no la agrandamos: escala como máximo 1
  const escala = Math.min(1, LADO_MAXIMO / Math.max(imagen.width, imagen.height));
  const lienzo = document.createElement('canvas');
  lienzo.width = Math.round(imagen.width * escala);
  lienzo.height = Math.round(imagen.height * escala);
  lienzo.getContext('2d').drawImage(imagen, 0, 0, lienzo.width, lienzo.height);
  URL.revokeObjectURL(imagen.src);

  return new Promise((resolver, rechazar) => {
    lienzo.toBlob(
      (blob) => (blob ? resolver(blob) : rechazar(new Error('No se pudo procesar la imagen'))),
      'image/jpeg',
      CALIDAD_JPEG
    );
  });
}

function cargarImagen(archivo) {
  return new Promise((resolver, rechazar) => {
    const imagen = new Image();
    imagen.onload = () => resolver(imagen);
    imagen.onerror = () => rechazar(new Error('No se pudo leer la imagen'));
    imagen.src = URL.createObjectURL(archivo);
  });
}
