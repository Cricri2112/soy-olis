import { WHATSAPP_NUMERO } from '../data/contacto.js';
import { formatearPrecio } from './precio.js';

// Arma el link de WhatsApp. Si se pasa un mensaje, va prearmado en el chat.
export function linkWhatsApp(mensaje) {
  const base = `https://wa.me/${WHATSAPP_NUMERO}`;
  if (!mensaje) return base;
  return `${base}?text=${encodeURIComponent(mensaje)}`;
}

// Mensaje para consultar por una prenda. Incluye el talle si la clienta eligió uno.
export function mensajeConsulta(producto, talle) {
  const nombreYPrecio = `${producto.nombre} (${formatearPrecio(producto.precio)})`;

  if (!producto.disponible) {
    return `Hola Olis! Me interesa ${nombreYPrecio}. ¿Cuándo vuelve a estar disponible?`;
  }

  const detalleTalle = talle ? ` en talle ${talle}` : '';
  return `Hola Olis! Quiero consultar por ${producto.nombre}${detalleTalle} (${formatearPrecio(producto.precio)}).`;
}
