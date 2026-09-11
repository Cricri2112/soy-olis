import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { iniciarSesion } from '../../data/authApi.js';
import { useSesion } from '../../hooks/useSesion.js';
import MensajeEstado from '../../components/MensajeEstado.jsx';
import './admin.css';
import './Login.css';

function Login() {
  const { sesion, cargando } = useSesion();
  const navegar = useNavigate();

  const [email, setEmail] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [error, setError] = useState('');
  const [enviando, setEnviando] = useState(false);

  if (cargando) return <MensajeEstado cargando />;
  if (sesion) return <Navigate to="/admin" replace />;

  async function enviar(evento) {
    evento.preventDefault();
    setError('');
    setEnviando(true);
    try {
      await iniciarSesion(email.trim(), contrasena);
      navegar('/admin', { replace: true });
    } catch (fallo) {
      setError(mensajeDeError(fallo));
      setEnviando(false);
    }
  }

  return (
    <main className="login">
      <div className="login-marca">soy Olis.</div>
      <p className="etiqueta login-subtitulo">Panel de administración</p>

      <form onSubmit={enviar} className="login-formulario">
        <label className="campo">
          <span className="campo-etiqueta">Email</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="campo-entrada"
            autoComplete="email"
            inputMode="email"
            required
          />
        </label>

        <label className="campo">
          <span className="campo-etiqueta">Contraseña</span>
          <input
            type="password"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
            className="campo-entrada"
            autoComplete="current-password"
            required
          />
        </label>

        {error && <p className="mensaje-error">{error}</p>}

        <button type="submit" disabled={enviando} className="boton-principal">
          {enviando ? 'Entrando...' : 'Entrar'}
        </button>
      </form>
    </main>
  );
}

// Supabase responde en inglés; traducimos el caso común y damos un genérico para el resto.
function mensajeDeError(fallo) {
  if (fallo.message === 'Invalid login credentials') return 'Email o contraseña incorrectos.';
  return 'No pudimos iniciar sesión. Probá de nuevo en un rato.';
}

export default Login;
