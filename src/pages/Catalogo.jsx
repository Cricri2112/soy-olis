import { useState } from 'react';
import productos, { categorias } from '../data/productos.js';
import ProductoCard from '../components/ProductoCard.jsx';
import './Catalogo.css';

function Catalogo() {
  // Categoría elegida en los filtros. "Todo" muestra todos los productos.
  const [filtro, setFiltro] = useState('Todo');

  const filtrados =
    filtro === 'Todo' ? productos : productos.filter((producto) => producto.categoria === filtro);

  const cantidad = filtrados.length;

  return (
    <main className="catalogo">
      <div className="catalogo-encabezado">
        <h1 className="catalogo-titulo">Catálogo</h1>
        <div className="catalogo-cantidad">
          {cantidad} {cantidad === 1 ? 'prenda' : 'prendas'}
        </div>
      </div>

      <div className="catalogo-filtros">
        {categorias.map((categoria) => (
          <button
            key={categoria}
            type="button"
            onClick={() => setFiltro(categoria)}
            className={categoria === filtro ? 'filtro filtro-activo' : 'filtro'}
          >
            {categoria}
          </button>
        ))}
      </div>

      <div className="catalogo-grilla">
        {filtrados.map((producto) => (
          <ProductoCard key={producto.id} producto={producto} conEtiquetas />
        ))}
      </div>
    </main>
  );
}

export default Catalogo;
