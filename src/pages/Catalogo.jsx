import productos from '../data/productos.js';
import ProductoCard from '../components/ProductoCard.jsx';
import './Catalogo.css';

function Catalogo() {
  return (
    <main className="catalogo">
      <h1 className="catalogo-titulo">Catálogo</h1>
      <div className="catalogo-grilla">
        {productos.map((producto) => (
          <ProductoCard key={producto.id} producto={producto} />
        ))}
      </div>
    </main>
  );
}

export default Catalogo;
