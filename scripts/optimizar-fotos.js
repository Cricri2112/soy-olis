// Convierte las fotos de fotos-originales/ en WebP livianas para la web.
//
// Uso:
//   1. Copiá las fotos originales (jpg, jpeg o png) en fotos-originales/
//      con el nombre final, por ejemplo: body-crema-1.jpg
//   2. Corré: npm run fotos
//   3. Las versiones optimizadas quedan en public/productos/ como .webp
//
// Cada foto se recorta a proporción 3:4 (la que usa el diseño) y se
// reduce a 900 x 1200 píxeles. Pesa entre 60 y 120 KB.

import { readdir, mkdir, stat } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const CARPETA_ORIGEN = 'fotos-originales';
const CARPETA_DESTINO = 'public/productos';
const ANCHO = 900;
const ALTO = 1200;
const CALIDAD = 80;
const EXTENSIONES_VALIDAS = ['.jpg', '.jpeg', '.png'];

async function listarFotosOriginales() {
  const archivos = await readdir(CARPETA_ORIGEN);
  return archivos.filter((archivo) =>
    EXTENSIONES_VALIDAS.includes(path.extname(archivo).toLowerCase())
  );
}

async function optimizarFoto(archivo) {
  const origen = path.join(CARPETA_ORIGEN, archivo);
  const nombreSinExtension = path.parse(archivo).name;
  const destino = path.join(CARPETA_DESTINO, `${nombreSinExtension}.webp`);

  await sharp(origen)
    .rotate() // respeta la orientación guardada por la cámara
    .resize(ANCHO, ALTO, { fit: 'cover', position: 'attention' })
    .webp({ quality: CALIDAD })
    .toFile(destino);

  const { size } = await stat(destino);
  console.log(`${archivo} -> ${destino} (${Math.round(size / 1024)} KB)`);
}

async function main() {
  // Crea las dos carpetas si no existen (fotos-originales/ no se sube a git)
  await mkdir(CARPETA_ORIGEN, { recursive: true });
  await mkdir(CARPETA_DESTINO, { recursive: true });
  const fotos = await listarFotosOriginales();

  if (fotos.length === 0) {
    console.log(`No hay fotos en ${CARPETA_ORIGEN}/. Copiá ahí las originales y volvé a correr.`);
    return;
  }

  for (const foto of fotos) {
    await optimizarFoto(foto);
  }
  console.log(`Listo: ${fotos.length} foto(s) optimizada(s).`);
}

main();
