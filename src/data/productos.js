// Catálogo de productos (versión 1, hardcodeado).
// Más adelante este archivo se reemplaza por una consulta a Supabase.
//
// Cada producto tiene:
// - id: texto único, se usa en la URL (/producto/:id)
// - nombre, descripcion
// - precio: número en pesos uruguayos
// - talles: lista de talles disponibles
// - fotos: rutas a imágenes dentro de /public

const productos = [
  {
    id: 'remera-basica-crema',
    nombre: 'Remera básica crema',
    descripcion: 'Remera de algodón peinado, calce relajado. La base de cualquier look.',
    precio: 1290,
    talles: ['S', 'M', 'L'],
    fotos: ['/productos/remera-basica-crema.svg'],
  },
  {
    id: 'camisa-lino-beige',
    nombre: 'Camisa de lino beige',
    descripcion: 'Camisa amplia de lino, ideal para usar suelta o anudada.',
    precio: 2490,
    talles: ['S', 'M', 'L', 'XL'],
    fotos: ['/productos/camisa-lino-beige.svg'],
  },
  {
    id: 'pantalon-sastrero-chocolate',
    nombre: 'Pantalón sastrero chocolate',
    descripcion: 'Tiro alto, pierna recta. Combina con todo.',
    precio: 3190,
    talles: ['S', 'M', 'L'],
    fotos: ['/productos/pantalon-sastrero-chocolate.svg'],
  },
  {
    id: 'vestido-midi-negro',
    nombre: 'Vestido midi negro',
    descripcion: 'Vestido largo midi con breteles finos. De día o de noche.',
    precio: 3590,
    talles: ['S', 'M'],
    fotos: ['/productos/vestido-midi-negro.svg'],
  },
  {
    id: 'sweater-rosa-viejo',
    nombre: 'Sweater rosa viejo',
    descripcion: 'Tejido suave, cuello redondo. Abrigado sin perder liviandad.',
    precio: 2890,
    talles: ['M', 'L'],
    fotos: ['/productos/sweater-rosa-viejo.svg'],
  },
  {
    id: 'falda-plisada-gris',
    nombre: 'Falda plisada gris',
    descripcion: 'Falda midi plisada con cintura elastizada.',
    precio: 2390,
    talles: ['S', 'M', 'L'],
    fotos: ['/productos/falda-plisada-gris.svg'],
  },
];

export default productos;

// Busca un producto por su id. Devuelve undefined si no existe.
export function buscarProducto(id) {
  return productos.find((producto) => producto.id === id);
}
