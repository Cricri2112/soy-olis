# soy Olis — Web de catálogo

Web de una marca uruguaya de moda femenina (básicos elevados, prendas versátiles y combinables), emprendimiento en etapa inicial. Este repo contiene la **versión 1**: una web de catálogo estática.

## Alcance de la versión 1 (cerrado)

- Web **estática**, sin backend: los productos van hardcodeados en `src/data/productos.js`, pensado para reemplazarse fácil por Supabase más adelante.
- Tres vistas:
  1. **Home**: identidad de marca y acceso al catálogo.
  2. **Catálogo**: grilla de productos con foto, nombre y precio.
  3. **Detalle de producto**: fotos, nombre, precio, talles disponibles y botón destacado "Consultar por WhatsApp" (link `wa.me` prearmado con el nombre del producto).
- **Fuera de alcance** (no implementar aunque parezca útil): carrito, pagos online, login, panel de administración, reportes, integración con Supabase.

## Stack

- React + Vite, en **JavaScript** (no TypeScript).
- `react-router-dom` para las rutas (`/`, `/catalogo`, `/producto/:id`). Es la única librería extra aprobada.
- Deploy en Vercel (capa gratuita). El proyecto Vite vive en la raíz del repo; `vercel.json` redirige todas las rutas a `index.html` para que el router funcione al recargar.
- Sin otras librerías adicionales salvo necesidad clara y justificada. Preferir CSS simple (CSS modules o archivo global) antes que frameworks de estilos, salvo que el handoff de diseño indique otra cosa.

## Estructura del código

- `src/pages/`: una carpeta por vista (Home, Catalogo, Producto), cada una con su `.jsx` y su `.css`.
- `src/components/`: piezas reutilizables (Header, ProductoCard).
- `src/data/`: `productos.js` (catálogo) y `contacto.js` (número de WhatsApp e Instagram).
- `src/utils/`: funciones chicas de ayuda (formateo de precio).
- `public/productos/`: fotos de las prendas.
- CSS plano, un archivo por componente, con clases prefijadas por componente (`.card-foto`, `.home-titulo`) para evitar choques de nombres.

## Reglas de diseño

- **Mobile-first obligatorio**: casi todo el tráfico viene de Instagram en celular. Diseñar y probar primero en viewport móvil (~390px); desktop es secundario.
- Estética: minimalista, femenina, elegante. Paleta de neutros: beige, crema, chocolate, marrón, negro, gris, blanco, rosa viejo. Serif en títulos.
- Las fotos de las prendas son las protagonistas: el diseño no compite con ellas.
- La UI definitiva viene de un handoff de Claude Design: implementarla fiel a ese diseño, no inventar variantes propias.

## Reglas de código

- **Código simple y legible**: el dueño del repo es estudiante de Analista en TI y quiere poder leer y entender todo el código. Evitar abstracciones innecesarias, patrones avanzados o "magia". Ante la duda, la versión más simple.
- Componentes chicos y con nombres claros, en español o inglés pero consistentes.
- Comentar solo lo que no sea obvio leyendo el código.

## Verificación obligatoria antes de reportar como terminado

Antes de dar por terminada **cualquier** tarea:

1. `npm run build` debe pasar sin errores.
2. `npm run dev` debe levantar la app sin errores en consola.
3. Verificar que las tres vistas cargan y la navegación entre ellas funciona.
4. Verificar el layout en viewport móvil.

Si algo falla, arreglarlo antes de reportar. **Nunca decir que algo está listo sin haberlo verificado.**

## Tests

- En esta versión (catálogo estático) **no** escribir suite de tests: no hay lógica de negocio que lo justifique.
- Los tests formales se incorporan recién en la fase de gestión (stock, ventas, login), cuando exista lógica real que proteger.

## Flujo de trabajo

- Para tareas no triviales, mostrar primero el plan y esperar confirmación antes de escribir código.
- Commits chicos y descriptivos, uno por cambio coherente.
- Si una tarea pedida contradice el alcance de la versión 1, señalarlo antes de hacerla.
