// Funciones puras sobre la lista de productos ya cargada. No consultan la base.

const DIAS_NUEVO = 30;
const ORDEN_TALLES = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'Único'];

// Un producto es "nuevo" durante sus primeros 30 días.
export function esNuevo(producto) {
  const milisegundosPorDia = 24 * 60 * 60 * 1000;
  const diasDesdeCreacion = (Date.now() - new Date(producto.creadoEn)) / milisegundosPorDia;
  return diasDesdeCreacion <= DIAS_NUEVO;
}

// Ordena talles con el orden habitual. Los que no están en la lista van al final.
export function ordenarTalles(talles) {
  return [...talles].sort((a, b) => posicionTalle(a) - posicionTalle(b));
}

function posicionTalle(talle) {
  const posicion = ORDEN_TALLES.indexOf(talle);
  return posicion === -1 ? ORDEN_TALLES.length : posicion;
}

// Para "Lo esencial" en la Home: los destacados, o los 4 más recientes si no hay ninguno.
export function productosDestacados(productos) {
  const destacados = productos.filter((producto) => producto.destacado);
  return destacados.length > 0 ? destacados : productos.slice(0, 4);
}

// Para "Combiná con": hasta 3 productos distintos al actual.
// Etapa futura: reemplazar por relaciones reales cargadas desde el admin (ver CLAUDE.md).
export function productosRelacionados(productos, actual) {
  return productos.filter((producto) => producto.id !== actual.id).slice(0, 3);
}

// Categorías que existen hoy en el catálogo, con "Todo" adelante.
export function categoriasDe(productos) {
  const unicas = [...new Set(productos.map((producto) => producto.categoria))];
  return ['Todo', ...unicas];
}

export function filtrarPorCategoria(productos, categoria) {
  if (categoria === 'Todo') return productos;
  return productos.filter((producto) => producto.categoria === categoria);
}
