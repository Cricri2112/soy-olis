// Formatea un número como precio en pesos uruguayos: 2490 -> "$U 2.490"
export function formatearPrecio(precio) {
  return `$U ${precio.toLocaleString('es-UY')}`;
}
