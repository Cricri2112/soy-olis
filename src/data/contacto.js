// Datos de contacto y textos fijos de la tienda.
// El número de WhatsApp va con código de país y sin "+", espacios ni guiones.
// Ejemplo Uruguay: 598 + 9 dígitos del celular sin el 0 inicial.

export const WHATSAPP_NUMERO = '59895532454'; // TODO: poner el número real
export const INSTAGRAM_USUARIO = 'soyolis.uy';
export const UBICACION = 'Young, Río Negro · Montevideo';

// Textos que se muestran en la ficha de cada producto.
export const TEXTO_ENTREGA = 'Montevideo · envíos a todo el país';
export const TEXTO_CAMBIOS = 'Hasta 10 días con etiqueta';

// Arma el link de WhatsApp. Si se pasa un mensaje, va prearmado en el chat.
export function linkWhatsApp(mensaje) {
  const base = `https://wa.me/${WHATSAPP_NUMERO}`;
  if (!mensaje) return base;
  return `${base}?text=${encodeURIComponent(mensaje)}`;
}

export const linkInstagram = `https://instagram.com/${INSTAGRAM_USUARIO}`;
