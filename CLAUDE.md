# soy Olis — Web de catálogo

Web de una marca uruguaya de moda femenina (básicos elevados, prendas versátiles y combinables), emprendimiento en etapa inicial. La usuaria principal (Camila) administra todo desde el celular.

## Etapa 1 (en curso): catálogo dinámico + panel admin

- El catálogo se lee desde **Supabase** (tablas `productos`, `producto_talles`, `fotos`; bucket `productos`). La v1 estática (`src/data/productos.js`) ya no existe.
- Vistas públicas: **Home** (identidad + "Lo esencial" con los destacados), **Catálogo** (grilla, filtros por categoría solo si hay más de una) y **Detalle** (`/producto/:slug`: fotos, nombre, precio, talles, "Combiná con" y botón "Consultar por WhatsApp").
- Panel admin bajo `/admin`, en la misma app: login con email + contraseña de Supabase Auth, lista con toggle visible/oculto, alta/edición (fotos, nombre, precio, talles obligatorios; descripción, categoría y destacado opcionales), fotos desde el celular, eliminar.
- **Fuera de alcance**: carrito, pagos, stock (Etapa 2, columna `stock` en `producto_talles`), roles, reportes, registro público de usuarios, recuperación de contraseña.
- **No tocar el esquema de la base ni las políticas RLS** sin consultar. Si el modelo bloquea algo, frenar y preguntar.
- "Nuevo" en el catálogo = creado hace menos de 30 días. "Lo esencial" = `destacado = true`, o los 4 más recientes si no hay ninguno.

## Etapa futura: relaciones entre productos

Hoy "Combiná con" muestra 3 productos cualquiera (`productosRelacionados` en `src/utils/catalogo.js`). La idea para más adelante es relacionar prendas de verdad: una tabla `producto_relacionados (producto_id, relacionado_id)` cargada desde el admin (por ejemplo, "este body combina con este pantalón y este blazer"), y que el detalle muestre esas. Cuando se haga, solo cambia esa función y el admin.

## Stack

- React + Vite, en **JavaScript** (no TypeScript).
- `react-router-dom` para las rutas y `@supabase/supabase-js` para datos, auth y storage. Son las únicas librerías extra aprobadas. La compresión de fotos se hace con `<canvas>` del navegador, sin librería.
- Variables de entorno (ver `.env.example`): `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, `VITE_WHATSAPP_NUMBER`. Local en `.env.local` (ignorado por git), en producción en Vercel.
- Deploy en Vercel (capa gratuita). El proyecto Vite vive en la raíz del repo; `vercel.json` redirige todas las rutas a `index.html` para que el router funcione al recargar.
- Sin otras librerías adicionales salvo necesidad clara y justificada. Preferir CSS simple (CSS modules o archivo global) antes que frameworks de estilos, salvo que el handoff de diseño indique otra cosa.

## Estructura del código

- `src/pages/`: una vista por archivo (Home, Catalogo, Producto), cada una con su `.jsx` y su `.css`. Una página arma la vista combinando componentes; la lógica de cada pieza vive en el componente.
- `src/pages/admin/`: vistas del panel (Login, Productos, ...). `admin.css` tiene los estilos compartidos del panel: campos y botones de 52 px de alto, letra de 16 px para que iOS no haga zoom.
- `src/components/`: piezas reutilizables, cada una con su `.jsx` y su `.css` al lado (Header, ProductoCard, FotoPrenda, Galeria, SelectorTalles, DatosProducto, Relacionados, BotonWhatsApp, FiltrosCategoria, ScrollArriba). `LayoutPublico` envuelve el sitio con el header de la marca; `RutaProtegida` redirige al login si no hay sesión.
- `src/components/admin/`: piezas del panel (`LayoutAdmin` con la barra superior y el botón Salir, `FilaProducto` con el interruptor visible/oculto).
- Rutas: públicas bajo `LayoutPublico`; `/admin/login` libre; todo lo demás bajo `/admin` cuelga de `RutaProtegida` y `LayoutAdmin` (ver `App.jsx`).
- `src/lib/supabase.js`: el único cliente de Supabase. Todo acceso a la base pasa por acá.
- `src/data/`: acceso a datos, sin React. `productosApi.js` y `fotosApi.js` consultan Supabase y devuelven productos "normalizados" (talles ordenados, fotos como URLs). `authApi.js` envuelve Supabase Auth. `contacto.js` tiene los textos fijos de la tienda.
- `src/hooks/`: hooks que cargan datos y exponen `cargando` / `error` (`useCatalogo`, `useSesion`, `useProductosAdmin`). Después de guardar un cambio, el panel actualiza la lista en memoria con `setProductos` en vez de volver a consultar.
- `src/utils/`: funciones puras y chicas (`precio.js`, `whatsapp.js`, `catalogo.js`).
- `public/productos/`: fotos de las prendas en `.webp`, generadas con `npm run fotos` desde `fotos-originales/` (carpeta ignorada por git). `public/logo.svg`: logo de la marca. `public/hero.webp`: foto de portada de la Home (1600 px de ancho).
- `scripts/`: herramientas de desarrollo que se corren con `npm run`. No forman parte de la web.
- `design/`: handoff de Claude Design (fuente de verdad de la UI). No es código de la app: no se importa desde `src/` y está excluido del lint. Ver `design/README.md`.

## Fotos

- Nunca subir originales de cámara al repo. Van a `fotos-originales/` y se convierten con `npm run fotos` (WebP, 900×1200, calidad 80).
- Nombre de archivo = id del producto + número: `body-crema-1.webp`, `body-crema-2.webp`.
- Las fotos de grillas cargan con `loading="lazy"`; solo la primera foto de la galería del detalle y la portada de la Home cargan de inmediato.

## Seguridad

Reglas que aplican hoy y a todo desarrollo futuro (gestión, usuarios, pagos):

- **Nada secreto en el repo ni en el código del sitio.** Todo lo que está en `src/` y `public/` es público. Claves privadas, tokens y contraseñas van en variables de entorno del servidor (Vercel o Supabase), nunca en un archivo versionado. Si se necesita una clave en el navegador, solo puede ser una clave pensada para ser pública (como la `anon` de Supabase).
- **Headers de seguridad en `vercel.json`**: CSP estricta (`script-src 'self'`, sin scripts inline ni de terceros), HSTS, `X-Frame-Options: DENY`, `nosniff`, `Referrer-Policy` y `Permissions-Policy`. Al agregar un recurso externo (fuente, imagen, API), sumarlo a la CSP explícitamente. Nunca aflojar `script-src`.
- **Sin scripts inline** en `index.html` ni en componentes. Vite ya genera todo en `/assets/`. Los estilos inline (`style={{ }}`) están permitidos solo para valores que vienen de datos, como el recorte de fotos.
- **Links externos** con `target="_blank"` llevan siempre `rel="noreferrer"`.
- **Dependencias**: correr `npm audit` antes de cada release y mantener Dependabot activo. No agregar paquetes sin revisar qué hacen y quién los mantiene.
- **Cuando exista base de datos (Supabase)**: RLS activado en todas las tablas y buckets desde el primer día. Lectura pública solo en lo que es público (productos, fotos); escritura solo para usuarios con rol admin. La clave `service_role` jamás sale del servidor.
- **Cuando existan usuarios**: usar el auth de Supabase, no un login propio. Validar siempre en el servidor o en la base, nunca confiar en lo que manda el navegador.
- **Cuando existan pagos**: usar un proveedor (Mercado Pago) y nunca tocar datos de tarjeta. Las claves del proveedor viven en una función del lado servidor. Los webhooks se validan con la firma del proveedor.
- **Cuentas**: 2FA en GitHub y Vercel. `main` protegida: solo entra por PR.

## Reglas de diseño

- **Mobile-first obligatorio**: casi todo el tráfico viene de Instagram en celular. Diseñar y probar primero en viewport móvil (~390px); desktop es secundario.
- Estética: minimalista, femenina, elegante. Paleta de neutros: beige, crema, chocolate, marrón, negro, gris, blanco, rosa viejo. Serif en títulos.
- Las fotos de las prendas son las protagonistas: el diseño no compite con ellas.
- La UI definitiva viene de un handoff de Claude Design: implementarla fiel a ese diseño, no inventar variantes propias.

## Reglas de código

- **Código simple y legible**: el dueño del repo es estudiante de Analista en TI y quiere poder leer y entender todo el código. Evitar abstracciones innecesarias, patrones avanzados o "magia". Ante la duda, la versión más simple.
- **Un componente por archivo**, con su CSS al lado y el mismo nombre. Si un componente pasa de unas 80 líneas o hace más de una cosa, partirlo.
- **Cada función hace una sola cosa** y su nombre dice cuál (`filtrarPorCategoria`, `mensajeConsulta`). Sin efectos escondidos.
- **Datos, lógica y vista separados**: `data/` no sabe de React, `utils/` son funciones puras, los componentes reciben todo por props.
- Nombres en **español**, descriptivos y consistentes (`producto`, `talle`, `alElegir`). Sin abreviaturas.
- Clases CSS prefijadas por componente (`.card-foto`, `.talle-agotado`) para que no choquen entre archivos.
- Comentar solo lo que no sea obvio leyendo el código: el porqué, no el qué.
- Sin dependencias nuevas en el sitio sin justificarlo antes. Las herramientas de desarrollo (como `sharp` para las fotos) van en `devDependencies`.

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
