import { supabase } from '../lib/supabase.js';
import { generarSlug } from '../utils/slug.js';

// Fotos de las prendas: el archivo vive en Supabase Storage (bucket `productos`)
// y la tabla `fotos` guarda la ruta y el orden de cada una.

export const BUCKET_FOTOS = 'productos';

// Convierte la ruta guardada en la tabla `fotos` en una URL pública para el <img>.
export function urlPublica(ruta) {
  return supabase.storage.from(BUCKET_FOTOS).getPublicUrl(ruta).data.publicUrl;
}

// Sube un archivo al bucket y registra la foto. Devuelve la foto guardada.
// Ruta en el bucket: {producto_id}/{timestamp}-{nombre}.jpg
export async function subirFoto(productoId, archivo, nombreOriginal, orden) {
  const ruta = `${productoId}/${Date.now()}-${nombreDeArchivo(nombreOriginal)}`;

  const { error: errorSubida } = await supabase.storage
    .from(BUCKET_FOTOS)
    .upload(ruta, archivo, { contentType: 'image/jpeg' });
  if (errorSubida) throw errorSubida;

  const { data, error } = await supabase
    .from('fotos')
    .insert({ producto_id: productoId, ruta, orden })
    .select('id')
    .single();
  if (error) throw error;

  return { id: data.id, ruta, url: urlPublica(ruta) };
}

// Borra la foto de la tabla y el archivo del bucket.
export async function borrarFoto(foto) {
  const { error } = await supabase.from('fotos').delete().eq('id', foto.id);
  if (error) throw error;
  await borrarArchivos([foto.ruta]);
}

// Borra del bucket todos los archivos de un producto (se usa al eliminar el producto).
export async function borrarArchivosDelProducto(productoId) {
  const { data, error } = await supabase.storage.from(BUCKET_FOTOS).list(productoId);
  if (error) throw error;
  if (data.length === 0) return;
  await borrarArchivos(data.map((archivo) => `${productoId}/${archivo.name}`));
}

// Guarda el orden según la posición en la lista (1, 2, 3...).
export async function guardarOrden(fotos) {
  for (const [indice, foto] of fotos.entries()) {
    const { error } = await supabase.from('fotos').update({ orden: indice + 1 }).eq('id', foto.id);
    if (error) throw error;
  }
}

// Deja las fotos del producto como quedaron en el formulario:
// borra las quitadas, sube las nuevas y guarda el orden final.
// `lista` mezcla fotos guardadas ({ id, ruta, url }) y nuevas ({ nueva: true, archivo, nombre }).
export async function sincronizarFotos(productoId, lista, borradas) {
  for (const foto of borradas) {
    await borrarFoto(foto);
  }

  const finales = [];
  for (const [indice, item] of lista.entries()) {
    if (item.nueva) finales.push(await subirFoto(productoId, item.archivo, item.nombre, indice + 1));
    else finales.push(item);
  }

  await guardarOrden(finales);
}

async function borrarArchivos(rutas) {
  const { error } = await supabase.storage.from(BUCKET_FOTOS).remove(rutas);
  if (error) throw error;
}

// "IMG_1234.HEIC" -> "img-1234.jpg". Siempre .jpg porque comprimimos a JPEG.
function nombreDeArchivo(nombreOriginal) {
  const sinExtension = nombreOriginal.replace(/\.[^.]+$/, '');
  return `${generarSlug(sinExtension) || 'foto'}.jpg`;
}
