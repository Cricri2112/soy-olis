import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ScrollArriba from './components/ScrollArriba.jsx';
import LayoutPublico from './components/LayoutPublico.jsx';
import RutaProtegida from './components/RutaProtegida.jsx';
import LayoutAdmin from './components/admin/LayoutAdmin.jsx';
import Home from './pages/Home.jsx';
import Catalogo from './pages/Catalogo.jsx';
import Producto from './pages/Producto.jsx';
import Login from './pages/admin/Login.jsx';
import Productos from './pages/admin/Productos.jsx';

function App() {
  return (
    <BrowserRouter>
      <ScrollArriba />
      <Routes>
        {/* Sitio público */}
        <Route element={<LayoutPublico />}>
          <Route path="/" element={<Home />} />
          <Route path="/catalogo" element={<Catalogo />} />
          <Route path="/producto/:slug" element={<Producto />} />
        </Route>

        {/* Panel: todo lo que cuelga de /admin pide sesión, salvo el login */}
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin" element={<RutaProtegida />}>
          <Route element={<LayoutAdmin />}>
            <Route index element={<Productos />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
