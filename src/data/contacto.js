// Datos de contacto de la marca.
// El número de WhatsApp va con código de país y sin "+", espacios ni guiones.
// Ejemplo Uruguay: 598 + 9 dígitos del celular sin el 0 inicial.

export const WHATSAPP_NUMERO = '59899000000'; // TODO: poner el número real
export const INSTAGRAM_USUARIO = 'soyolis.uy';

// Arma el link de WhatsApp con un mensaje prearmado.
export function linkWhatsApp(mensaje) {
  return `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(mensaje)}`;
}
