import { Link } from 'react-router-dom';
import { INSTAGRAM_USUARIO } from '../data/contacto.js';
import './Home.css';

function Home() {
  return (
    <main className="home">
      <h1 className="home-titulo">soy Olis</h1>
      <p className="home-lema">Básico, clásico y atemporal</p>
      <p className="home-texto">
        Básicos elevados. Prendas versátiles y combinables, pensadas para durar.
      </p>
      <Link to="/catalogo" className="home-boton">Ver catálogo</Link>
      <a
        href={`https://instagram.com/${INSTAGRAM_USUARIO}`}
        target="_blank"
        rel="noreferrer"
        className="home-instagram"
      >
        @{INSTAGRAM_USUARIO}
      </a>
    </main>
  );
}

export default Home;
