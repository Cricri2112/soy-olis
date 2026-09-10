# Handoff de diseño

Archivos exportados desde Claude Design. Son la referencia visual de la web: el código en `src/` se escribe para copiar este diseño, nunca al revés.

- `Soy Olis.dc.html`: el diseño completo (Home, Catálogo y Detalle) con sus estilos y datos de ejemplo. **Este es el archivo que hay que mirar.**
- `Soy Olis Mobile.dc.html`: envuelve al anterior en un marco de iPhone para previsualizar.
- `Soy Olis Mobile.html`: la misma vista mobile, empaquetada en un solo archivo. Se puede abrir directo en el navegador.
- `ios-frame.jsx` y `support.js`: código auxiliar del marco de iPhone y del formato `.dc.html`. No se usan en la app.
- `assets/`: fotos y logos ya reducidos que usa el diseño.

Nada de esta carpeta se importa desde `src/`. Está excluida del lint.
