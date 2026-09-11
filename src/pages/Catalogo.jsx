import { useState } from 'react';
import ProductoCard from '../components/ProductoCard.jsx';
import FiltrosCategoria from '../components/FiltrosCategoria.jsx';
import MensajeEstado from '../components/MensajeEstado.jsx';
import { useCatalogo } from '../hooks/useCatalogo.js';
import { categoriasDe, filtrarPorCategoria } from '../utils/catalogo.js';
import './Catalogo.css';

function Catalogo() {
  const { productos, cargando, error } = useCatalogo();

  // Categoría elegida en los filtros. "Todo" muestra todos los productos.
  const [filtro, setFiltro] = useState('Todo');

  const categorias = categoriasDe(productos);
  const filtrados = filtrarPorCategoria(productos, filtro);

  // Si todas las prendas son de la misma categoría, los filtros no aportan nada
  const hayVariasCategorias = categorias.length > 2;

  return (
    <main className="catalogo">
      <div className="catalogo-encabezado">
        <h1 className="catalogo-titulo">Catálogo</h1>
        {!cargando && !error && (
          <div className="catalogo-cantidad">{textoCantidad(filtrados.length)}</div>
        )}
      </div>

      {hayVariasCategorias && (
        <FiltrosCategoria categorias={categorias} activa={filtro} alElegir={setFiltro} />
      )}

      <MensajeEstado cargando={cargando} error={error} vacio={filtrados.length === 0} />

      <div className="catalogo-grilla">
        {filtrados.map((producto) => (
          <ProductoCard key={producto.id} producto={producto} conEtiquetas />
        ))}
      </div>
    </main>
  );
}

function textoCantidad(cantidad) {
  return `${cantidad} ${cantidad === 1 ? 'prenda' : 'prendas'}`;
}

export default Catalogo;
