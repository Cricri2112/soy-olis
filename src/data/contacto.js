// Datos de contacto y textos fijos de la tienda.

// Número de WhatsApp con código de país, sin "+", espacios ni guiones.
// Viene de la variable VITE_WHATSAPP_NUMBER (.env.local o Vercel).
export const WHATSAPP_NUMERO = import.meta.env.VITE_WHATSAPP_NUMBER || '';
export const INSTAGRAM_USUARIO = 'soyolis.uy';
export const INSTAGRAM_URL = `https://instagram.com/${INSTAGRAM_USUARIO}`;
export const UBICACION = 'Young, Río Negro · Montevideo';

// Textos que se muestran en la ficha de cada producto.
export const TEXTO_ENTREGA = 'Montevideo · envíos a todo el país';
export const TEXTO_CAMBIOS = 'Hasta 10 días con etiqueta';
