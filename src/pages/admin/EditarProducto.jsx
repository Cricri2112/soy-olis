import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import FormularioProducto from '../../components/admin/FormularioProducto.jsx';
import EliminarProducto from '../../components/admin/EliminarProducto.jsx';
import MensajeEstado from '../../components/MensajeEstado.jsx';
import {
  obtenerProducto,
  crearProducto,
  actualizarProducto,
  eliminarProducto,
  slugDisponible,
} from '../../data/productosApi.js';
import { sincronizarFotos } from '../../data/fotosApi.js';
import './EditarProducto.css';

// Alta (/admin/nuevo) y edición (/admin/:id) de un producto.
function EditarProducto() {
  const { id } = useParams();
  const navegar = useNavigate();
  const esNuevo = !id;

  const [producto, setProducto] = useState(null);
  const [cargando, setCargando] = useState(!esNuevo);
  const [error, setError] = useState(null);

  // En edición, cargamos el producto antes de mostrar el formulario
  useEffect(() => {
    if (esNuevo) return;
    obtenerProducto(id)
      .then(setProducto)
      .catch(setError)
      .finally(() => setCargando(false));
  }, [id, esNuevo]);

  async function guardar({ datos, talles, fotos, fotosBorradas }) {
    // Si el slug ya está usado por otro producto, le agrega un número
    const datosConSlug = { ...datos, slug: await slugDisponible(datos.slug, id) };

    // Primero el producto (las fotos necesitan su id para la carpeta del bucket)
    let productoId = id;
    if (esNuevo) productoId = await crearProducto(datosConSlug, talles);
    else await actualizarProducto(id, datosConSlug, talles);

    await sincronizarFotos(productoId, fotos, fotosBorradas);
    navegar('/admin');
  }

  async function eliminar() {
    await eliminarProducto(id);
    navegar('/admin');
  }

  if (cargando || error) return <MensajeEstado cargando={cargando} error={error} />;
  if (!esNuevo && !producto) return <MensajeEstado vacio textoVacio="No encontramos ese producto." />;

  return (
    <main className="admin-contenido">
      <Link to="/admin" className="editar-volver">← Productos</Link>
      <h1 className="admin-titulo">{esNuevo ? 'Nuevo producto' : producto.nombre}</h1>

      <FormularioProducto
        inicial={producto ?? undefined}
        alGuardar={guardar}
        textoBoton={esNuevo ? 'Publicar' : 'Guardar cambios'}
      />

      {!esNuevo && <EliminarProducto nombre={producto.nombre} alConfirmar={eliminar} />}
    </main>
  );
}

export default EditarProducto;
