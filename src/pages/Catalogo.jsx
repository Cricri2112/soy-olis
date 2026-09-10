import { useState } from 'react';
import productos, { categorias } from '../data/productos.js';
import ProductoCard from '../components/ProductoCard.jsx';
import FiltrosCategoria from '../components/FiltrosCategoria.jsx';
import './Catalogo.css';

function Catalogo() {
  // Categoría elegida en los filtros. "Todo" muestra todos los productos.
  const [filtro, setFiltro] = useState('Todo');

  const filtrados = filtrarPorCategoria(productos, filtro);

  return (
    <main className="catalogo">
      <div className="catalogo-encabezado">
        <h1 className="catalogo-titulo">Catálogo</h1>
        <div className="catalogo-cantidad">{textoCantidad(filtrados.length)}</div>
      </div>

      <FiltrosCategoria categorias={categorias} activa={filtro} alElegir={setFiltro} />

      <div className="catalogo-grilla">
        {filtrados.map((producto) => (
          <ProductoCard key={producto.id} producto={producto} conEtiquetas />
        ))}
      </div>
    </main>
  );
}

function filtrarPorCategoria(lista, categoria) {
  if (categoria === 'Todo') return lista;
  return lista.filter((producto) => producto.categoria === categoria);
}

function textoCantidad(cantidad) {
  return `${cantidad} ${cantidad === 1 ? 'prenda' : 'prendas'}`;
}

export default Catalogo;
