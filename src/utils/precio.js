// Formatea un número como precio en pesos uruguayos: 1290 -> "$ 1.290"
export function formatearPrecio(precio) {
  return `$ ${precio.toLocaleString('es-UY')}`;
}
