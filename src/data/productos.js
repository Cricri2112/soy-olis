// Catálogo de productos (versión 1, hardcodeado).
// Más adelante este archivo se reemplaza por una consulta a Supabase.
//
// Cada producto tiene:
// - id: texto único, se usa en la URL (/producto/:id)
// - nombre, categoria, color, descripcion, material
// - precio: número en pesos uruguayos
// - fotos: rutas a imágenes dentro de /public/productos (se generan con `npm run fotos`).
//   Lista vacía = todavía sin foto. La primera es la que se ve en la grilla.
// - posicionFoto: qué parte de la foto se prioriza al recortarla (object-position)
// - talles: talles que existen para la prenda
// - agotados: talles que hoy no hay en stock (se muestran tachados)
// - nuevo: true muestra la etiqueta "Nuevo" en el catálogo
// - disponible: false cuando la prenda no está en stock en ningún talle.
//   Se sigue mostrando en el catálogo, pero sin selector de talle.

export const categorias = ['Todo', 'Bodys', 'Pantalones', 'Blazers', 'Chalecos', 'Abrigos'];

const productos = [
  {
    id: 'chaleco-lino-blanco',
    nombre: 'Chaleco Lino Blanco',
    categoria: 'Chalecos',
    color: 'Blanco',
    precio: 2490,
    fotos: ['/productos/chaleco-lino-blanco-1.webp'],
    posicionFoto: '50% 20%',
    talles: ['S', 'M', 'L', 'XL'],
    agotados: ['XL'],
    nuevo: true,
    disponible: true,
    material: 'Lino y viscosa',
    descripcion:
      'Chaleco sastrero corto en lino, con botones forrados y pinzas que marcan la cintura. Se usa solo o sobre un body: funciona igual con el short haciendo juego que con un pantalón sastrero.',
  },
  {
    id: 'chaleco-sastrero-crema',
    nombre: 'Chaleco Sastrero Crema',
    categoria: 'Chalecos',
    color: 'Crema',
    precio: 2690,
    fotos: ['/productos/chaleco-sastrero-crema-1.webp'],
    posicionFoto: '50% 35%',
    talles: ['S', 'M', 'L', 'XL'],
    agotados: [],
    nuevo: true,
    disponible: true,
    material: 'Gabardina de tacto seda',
    descripcion:
      'Escote en V profundo y largo a la cadera. La gabardina cae pesada y no se arruga, ideal para llevar de la oficina a la noche sin cambiarse.',
  },
  {
    id: 'conjunto-celeste',
    nombre: 'Conjunto Sastrero Celeste',
    categoria: 'Chalecos',
    color: 'Celeste',
    precio: 4890,
    fotos: ['/productos/conjunto-celeste-1.webp'],
    posicionFoto: '50% 40%',
    talles: ['S', 'M', 'L'],
    agotados: ['S'],
    nuevo: false,
    disponible: true,
    material: 'Gabardina de tacto seda',
    descripcion:
      'Chaleco y short de tiro alto con botones forrados. Cada pieza se vende también por separado: el short combina con cualquier body de la colección.',
  },
  {
    id: 'conjunto-rosa',
    nombre: 'Conjunto Rosa Viejo',
    categoria: 'Chalecos',
    color: 'Rosa',
    precio: 4890,
    fotos: ['/productos/conjunto-rosa-1.webp'],
    posicionFoto: '50% 45%',
    talles: ['S', 'M', 'L', 'XL'],
    agotados: [],
    nuevo: false,
    disponible: true,
    material: 'Gabardina de tacto seda',
    descripcion:
      'Top con un solo botón y falda-short cruzada. Un conjunto liviano para el día, que de noche se transforma con el blazer negro.',
  },
  {
    id: 'body-chocolate',
    nombre: 'Body Chocolate',
    categoria: 'Bodys',
    color: 'Chocolate',
    precio: 1590,
    fotos: [],
    posicionFoto: '50% 50%',
    talles: ['S', 'M', 'L', 'XL'],
    agotados: [],
    nuevo: false,
    disponible: true,
    material: 'Algodón con elastano',
    descripcion:
      'Cuello halter y espalda cerrada. La base de casi todos los looks: va debajo del chaleco, del blazer o solo con el pantalón sastrero.',
  },
  {
    id: 'body-crema',
    nombre: 'Body Crema',
    categoria: 'Bodys',
    color: 'Crema',
    precio: 1590,
    fotos: [],
    posicionFoto: '50% 50%',
    talles: ['S', 'M', 'L', 'XL'],
    agotados: ['S'],
    nuevo: false,
    disponible: true,
    material: 'Algodón con elastano',
    descripcion: 'La misma horma que el chocolate, en crema. Tela con cuerpo, sin transparencias.',
  },
  {
    id: 'pantalon-camel',
    nombre: 'Pantalón Sastrero Camel',
    categoria: 'Pantalones',
    color: 'Camel',
    precio: 2990,
    fotos: [],
    posicionFoto: '50% 50%',
    talles: ['S', 'M', 'L', 'XL'],
    agotados: [],
    nuevo: false,
    disponible: true,
    material: 'Sastrero con caída',
    descripcion:
      'Tiro alto, pierna recta amplia y bolsillos laterales. Largo pensado para usar con zapato plano o taco bajo.',
  },
  {
    id: 'pantalon-negro',
    nombre: 'Pantalón Sastrero Negro',
    categoria: 'Pantalones',
    color: 'Negro',
    precio: 2990,
    fotos: [],
    posicionFoto: '50% 50%',
    talles: ['S', 'M', 'L', 'XL'],
    agotados: [],
    nuevo: false,
    disponible: true,
    material: 'Sastrero con caída',
    descripcion: 'El básico que resuelve todo. Misma horma que el camel.',
  },
  {
    id: 'blazer-negro',
    nombre: 'Blazer Negro',
    categoria: 'Blazers',
    color: 'Negro',
    precio: 4290,
    fotos: [],
    posicionFoto: '50% 50%',
    talles: ['S', 'M', 'L'],
    agotados: [],
    nuevo: false,
    disponible: true,
    material: 'Sastrero con forrería',
    descripcion: 'Corte recto, un botón, hombro marcado apenas. Levanta cualquier prenda de la colección.',
  },
  {
    id: 'blazer-beige',
    nombre: 'Blazer Beige',
    categoria: 'Blazers',
    color: 'Beige',
    precio: 4290,
    fotos: [],
    posicionFoto: '50% 50%',
    talles: ['S', 'M', 'L', 'XL'],
    agotados: ['M'],
    nuevo: false,
    disponible: true,
    material: 'Sastrero con forrería',
    descripcion: 'Versión clara del blazer negro. Combina con todos los tonos neutros de la colección.',
  },
  {
    id: 'abrigo-gris',
    nombre: 'Abrigo Paño Gris',
    categoria: 'Abrigos',
    color: 'Gris',
    precio: 6490,
    fotos: [],
    posicionFoto: '50% 50%',
    talles: ['S', 'M', 'L'],
    agotados: [],
    nuevo: false,
    disponible: true,
    material: 'Paño de lana',
    descripcion: 'Largo a la rodilla, cruzado, sin solapa. Cierra el look de invierno sobre todo lo demás.',
  },
  {
    id: 'abrigo-chocolate',
    nombre: 'Abrigo Paño Chocolate',
    categoria: 'Abrigos',
    color: 'Chocolate',
    precio: 6490,
    fotos: [],
    posicionFoto: '50% 50%',
    talles: ['S', 'M', 'L'],
    agotados: ['L'],
    nuevo: false,
    disponible: true,
    material: 'Paño de lana',
    descripcion: 'El mismo abrigo, en chocolate. Con el body crema y el pantalón camel arma el uniforme de invierno.',
  },
];

export default productos;

// Busca un producto por su id. Devuelve undefined si no existe.
export function buscarProducto(id) {
  return productos.find((producto) => producto.id === id);
}

// Los 4 primeros productos, para la sección "Lo esencial" de la Home.
export function productosDestacados() {
  return productos.slice(0, 4);
}

// Hasta 3 productos de otras categorías, para "Combiná con" en el detalle.
export function productosRelacionados(producto) {
  return productos
    .filter((otro) => otro.id !== producto.id && otro.categoria !== producto.categoria)
    .slice(0, 3);
}
