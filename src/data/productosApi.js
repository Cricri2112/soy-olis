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

// Todos los productos, visibles y ocultos, para el panel.
// Solo funciona con sesión: la política RLS del rol anon no devuelve los ocultos.
export async function listarTodosLosProductos() {
  const { data, error } = await supabase
    .from('productos')
    .select(COLUMNAS)
    .order('creado_en', { ascending: false });

  if (error) throw error;
  return data.map(normalizarProducto);
}

// Un producto por id, con talles y fotos. Devuelve null si no existe.
export async function obtenerProducto(id) {
  const { data, error } = await supabase.from('productos').select(COLUMNAS).eq('id', id).maybeSingle();
  if (error) throw error;
  return data ? normalizarProducto(data) : null;
}

// Muestra u oculta un producto en el sitio público.
export async function cambiarVisible(id, visible) {
  const { error } = await supabase.from('productos').update({ visible }).eq('id', id);
  if (error) throw error;
}

// Crea un producto con sus talles. Devuelve el id nuevo.
// `datos` trae nombre, slug, precio, descripcion, categoria y destacado.
export async function crearProducto(datos, talles) {
  const { data, error } = await supabase.from('productos').insert(datos).select('id').single();
  if (error) throw error;
  await reemplazarTalles(data.id, talles);
  return data.id;
}

// Actualiza los datos de un producto y deja exactamente los talles indicados.
export async function actualizarProducto(id, datos, talles) {
  const { error } = await supabase.from('productos').update(datos).eq('id', id);
  if (error) throw error;
  await reemplazarTalles(id, talles);
}

// Borra los talles que tenía el producto y guarda la lista nueva.
// Es más simple que calcular cuáles agregar y cuáles sacar.
async function reemplazarTalles(productoId, talles) {
  const { error: errorBorrado } = await supabase
    .from('producto_talles')
    .delete()
    .eq('producto_id', productoId);
  if (errorBorrado) throw errorBorrado;

  if (talles.length === 0) return;
  const filas = talles.map((talle) => ({ producto_id: productoId, talle }));
  const { error: errorInsercion } = await supabase.from('producto_talles').insert(filas);
  if (errorInsercion) throw errorInsercion;
}

// Devuelve un slug que no esté usado por otro producto.
// Si "body-crema" ya existe, prueba "body-crema-2", "body-crema-3", etc.
// `idActual` es el producto que se está editando (su propio slug no cuenta como ocupado).
export async function slugDisponible(slugBase, idActual = null) {
  let candidato = slugBase;
  let numero = 2;
  while (await existeSlug(candidato, idActual)) {
    candidato = `${slugBase}-${numero}`;
    numero += 1;
  }
  return candidato;
}

async function existeSlug(slug, idActual) {
  let consulta = supabase.from('productos').select('id').eq('slug', slug);
  if (idActual) consulta = consulta.neq('id', idActual);
  const { data, error } = await consulta;
  if (error) throw error;
  return data.length > 0;
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
