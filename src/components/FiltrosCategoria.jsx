import './FiltrosCategoria.css';

// Fila de botones para filtrar el catálogo por categoría.
// - categorias: lista de nombres
// - activa: categoría seleccionada
// - alElegir: función que recibe la categoría clickeada
function FiltrosCategoria({ categorias, activa, alElegir }) {
  return (
    <div className="filtros">
      {categorias.map((categoria) => (
        <button
          key={categoria}
          type="button"
          onClick={() => alElegir(categoria)}
          className={categoria === activa ? 'filtro filtro-activo' : 'filtro'}
        >
          {categoria}
        </button>
      ))}
    </div>
  );
}

export default FiltrosCategoria;
