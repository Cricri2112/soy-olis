import { supabase } from '../lib/supabase.js';

// Bucket de Supabase Storage donde viven las fotos de las prendas.
export const BUCKET_FOTOS = 'productos';

// Convierte la ruta guardada en la tabla `fotos` en una URL pública para el <img>.
export function urlPublica(ruta) {
  return supabase.storage.from(BUCKET_FOTOS).getPublicUrl(ruta).data.publicUrl;
}
