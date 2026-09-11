// El slug es el nombre del producto convertido en texto apto para URL:
// "Body Crema Ñandú" -> "body-crema-nandu". Se usa en /producto/:slug.
export function generarSlug(texto) {
  return texto
    .normalize('NFD') // separa cada letra de su acento
    .replace(/[̀-ͯ]/g, '') // y borra los acentos
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-') // todo lo que no sea letra o número pasa a guion
    .replace(/^-+|-+$/g, ''); // sin guiones al principio ni al final
}
