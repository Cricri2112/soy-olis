import { supabase } from '../lib/supabase.js';
import { urlPublica } from './fotosApi.js';
import { ordenarTalles } from '../utils/catalogo.js';

// Consultas a la tabla `productos` (con sus talles y fotos).
// Cada función devuelve productos ya "normalizados" con la forma que usa la UI.

// Columnas que traemos siempre: el producto más sus tablas relacionadas.
const COLUMNAS = '*, producto_talles(talle), fotos(ruta, orden)';

// Productos visibles al público, del más nuevo al más viejo.
export async function listarProductosVisibles() {
  const { data, error } = await supabase
    .from('productos')
    .select(COLUMNAS)
    .eq('visible', true)
    .order('creado_en', { ascending: false });

  if (error) throw error;
  return data.map(normalizarProducto);
}

// Pasa una fila de la base a la forma que usan los componentes.
// - talles: lista de textos ordenada (XS, S, M...)
// - fotos: lista de URLs públicas, según el campo `orden`
function normalizarProducto(fila) {
  const fotosOrdenadas = [...fila.fotos].sort((a, b) => a.orden - b.orden);

  return {
    id: fila.id,
    slug: fila.slug,
    nombre: fila.nombre,
    descripcion: fila.descripcion || '',
    precio: fila.precio,
    categoria: fila.categoria,
    visible: fila.visible,
    destacado: fila.destacado,
    creadoEn: fila.creado_en,
    talles: ordenarTalles(fila.producto_talles.map((t) => t.talle)),
    fotos: fotosOrdenadas.map((foto) => urlPublica(foto.ruta)),
  };
}
