import { useState } from 'react';
import FilaProducto from '../../components/admin/FilaProducto.jsx';
import MensajeEstado from '../../components/MensajeEstado.jsx';
import { useProductosAdmin } from '../../hooks/useProductosAdmin.js';
import { cambiarVisible } from '../../data/productosApi.js';
import './Productos.css';

function Productos() {
  const { productos, setProductos, cargando, error } = useProductosAdmin();
  const [errorGuardado, setErrorGuardado] = useState('');

  async function alternarVisible(producto) {
    setErrorGuardado('');
    try {
      await cambiarVisible(producto.id, !producto.visible);
      // Actualiza solo ese producto en la lista que ya está en pantalla
      setProductos((lista) =>
        lista.map((p) => (p.id === producto.id ? { ...p, visible: !p.visible } : p))
      );
    } catch {
      setErrorGuardado(`No pudimos guardar el cambio en "${producto.nombre}". Probá de nuevo.`);
    }
  }

  return (
    <main className="admin-contenido">
      <h1 className="admin-titulo">Productos</h1>

      {errorGuardado && <p className="mensaje-error">{errorGuardado}</p>}

      <MensajeEstado
        cargando={cargando}
        error={error}
        vacio={productos.length === 0}
        textoVacio="Todavía no cargaste ningún producto."
      />

      <ul className="productos-lista">
        {productos.map((producto) => (
          <FilaProducto key={producto.id} producto={producto} alAlternarVisible={alternarVisible} />
        ))}
      </ul>
    </main>
  );
}

export default Productos;
