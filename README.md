# soy Olis

Web de catálogo de **soy Olis**, marca uruguaya de moda femenina. React + Vite en el frontend, Supabase como base de datos, autenticación y almacenamiento de fotos. Deploy en Vercel.

- Sitio público: `/`, `/catalogo`, `/producto/:slug`.
- Panel de administración: `/admin` (requiere usuario de Supabase Auth).

## Correr el proyecto en tu máquina

```bash
npm install
cp .env.example .env.local   # completar con los valores de tu proyecto de Supabase
npm run dev
```

Otros comandos:

- `npm run build`: genera la versión de producción en `dist/`.
- `npm run preview`: sirve la carpeta `dist/` para probarla.
- `npm run lint`: revisa el código con oxlint.

## Variables de entorno

Las tres son obligatorias. Sin ellas la app no arranca y muestra un error claro en consola.

| Variable | Dónde conseguirla |
|---|---|
| `VITE_SUPABASE_URL` | Supabase → Project Settings → API → Project URL |
| `VITE_SUPABASE_ANON_KEY` | Supabase → Project Settings → API Keys → clave *publishable* (`sb_publishable_...`) |
| `VITE_WHATSAPP_NUMBER` | Número de la tienda con código de país, sin `+` ni espacios (ej. `598XXXXXXXX`) |

Las dos de Supabase son públicas por diseño: el acceso real lo controlan las políticas RLS de la base. La clave `service_role` **nunca** va en este proyecto.

## Configurar Supabase

El proyecto espera este esquema (ya creado; no se modifica sin consultar):

- Tablas `productos`, `producto_talles` y `fotos` en el esquema `public`, con RLS: el rol `anon` solo lee (y de `productos` solo los `visible = true`); el rol `authenticated` puede todo.
- Bucket `productos` público para lectura, 5 MB máximo, solo JPG/PNG/WebP. Solo autenticados suben y borran.
- Auth con email + contraseña. No hay registro público ni recuperación de contraseña.

Para crear el usuario admin: Authentication → Users → **Add user** → email y contraseña, con **Auto Confirm User** marcado.

## Deploy en Vercel

1. Importar el repo en Vercel. Detecta Vite solo; no hay que cambiar nada del build.
2. En **Settings → Environment Variables** cargar las tres variables de arriba para Production (y Preview si querés probar ramas).
3. Deploy. `vercel.json` ya trae las redirecciones para que las rutas funcionen al recargar y los headers de seguridad (CSP incluida).

Si el sitio publicado aparece en blanco, casi siempre falta alguna variable de entorno: mirá la consola del navegador.

## Cargar una prenda

Desde el celular, en `/admin`:

1. **+ Nuevo**.
2. **Agregar fotos**: elegí una o varias de la galería. Se achican y comprimen solas antes de subir. La primera es la principal; con las flechas se ordenan.
3. Nombre, precio y talles. Descripción, categoría, destacado y dirección son opcionales, en "Más opciones".
4. **Publicar**. Ya está en el catálogo.

Para sacar algo del sitio sin borrarlo, usá el interruptor de la lista. Para borrarlo del todo, abrilo y tocá "Eliminar producto".

## Estructura

```
src/
  main.jsx            Arranque de React
  App.jsx             Rutas públicas y del panel
  index.css           Estilos globales, paleta y fuentes
  lib/supabase.js     El único cliente de Supabase
  data/               Acceso a datos: productosApi, fotosApi, authApi, contacto
  hooks/              useCatalogo, useSesion, useProductosAdmin
  utils/              Funciones puras: precio, whatsapp, catalogo, slug, imagen
  pages/              Home, Catalogo, Producto y pages/admin (Login, Productos, EditarProducto)
  components/         Piezas del sitio público y components/admin para el panel
public/
  hero.webp           Portada de la Home
  logo.svg            Logo de la marca
design/               Handoff de Claude Design (referencia visual, no se importa)
```

Más detalle sobre decisiones y reglas de código en `CLAUDE.md`.
