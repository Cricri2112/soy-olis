# soy Olis

Web de catálogo de **soy Olis**, marca uruguaya de moda femenina.

Versión 1: catálogo estático (sin backend). Los productos están en `src/data/productos.js`.

## Correr el proyecto

```bash
npm install
npm run dev
```

Otros comandos:

- `npm run build`: genera la versión de producción en `dist/`.
- `npm run preview`: sirve la carpeta `dist/` para probarla.
- `npm run lint`: revisa el código con oxlint.
- `npm run fotos`: convierte las fotos de `fotos-originales/` a WebP livianas en `public/productos/`.

## Cargar una prenda nueva

1. Copiá las fotos originales en `fotos-originales/` (esa carpeta no se sube a git) con el nombre final: `id-del-producto-1.jpg`, `id-del-producto-2.jpg`...
2. Corré `npm run fotos`. Las fotos quedan en `public/productos/` como `.webp`, recortadas a 3:4 y de unos 60 a 120 KB.
3. Agregá el producto en `src/data/productos.js` siguiendo el formato de los que ya están, con las rutas `/productos/id-del-producto-1.webp`.

## Estructura

```
src/
  main.jsx          Arranque de React
  App.jsx           Rutas: /, /catalogo, /producto/:id
  index.css         Estilos globales, paleta y fuentes
  pages/            Una vista por archivo (Home, Catalogo, Producto)
  components/       Piezas reutilizables, cada una con su .jsx y su .css
  data/             productos.js (catálogo) y contacto.js (WhatsApp, Instagram, textos)
  utils/            Funciones chicas: precio.js, whatsapp.js
public/
  productos/        Fotos de las prendas (.webp)
  logo.svg          Logo de la marca
scripts/
  optimizar-fotos.js  Lo que corre `npm run fotos`
design/             Handoff de Claude Design (referencia visual, no se importa)
```

## Stack

React + Vite, JavaScript, CSS plano, `react-router-dom`. Deploy en Vercel.
