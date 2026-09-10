import { Link } from 'react-router-dom';
import ProductoCard from '../components/ProductoCard.jsx';
import { productosDestacados } from '../data/productos.js';
import { INSTAGRAM_USUARIO, UBICACION, linkInstagram, linkWhatsApp } from '../data/contacto.js';
import './Home.css';

function Home() {
  return (
    <main className="home">
      {/* Portada con foto a pantalla completa */}
      <section className="hero">
        <img
          src="/productos/chaleco-sastrero-crema.jpg"
          alt="Chaleco sastrero crema"
          className="hero-foto"
        />
        <div className="hero-sombra"></div>
        <div className="hero-texto">
          <div className="hero-eyebrow">Básico · Clásico · Atemporal</div>
          <h1 className="hero-titulo">
            No necesitás más ropa.
            <br />
            <em>Necesitás prendas que combinen entre sí.</em>
          </h1>
          <div className="hero-botones">
            <Link to="/catalogo" className="hero-boton">Ver catálogo</Link>
            <a href={linkInstagram} target="_blank" rel="noreferrer" className="hero-boton-borde">
              @{INSTAGRAM_USUARIO}
            </a>
          </div>
        </div>
      </section>

      {/* Presentación de la marca */}
      <section className="intro">
        <div className="intro-logo">
          <img src="/logo.svg" alt="Olis" />
        </div>
        <p className="intro-frase">
          Pocas prendas, bien elegidas. Cada una pensada para combinar con las demás.
        </p>
        <p className="intro-texto">
          Bodys, pantalones sastreros, blazers, chalecos y abrigos en tonos neutros. Diseñados en
          Uruguay.
        </p>
      </section>

      {/* Productos destacados */}
      <section className="esencial">
        <div className="esencial-encabezado">
          <h2 className="esencial-titulo">Lo esencial</h2>
          <Link to="/catalogo" className="esencial-ver-todo">Ver todo</Link>
        </div>
        <div className="esencial-grilla">
          {productosDestacados().map((producto) => (
            <ProductoCard key={producto.id} producto={producto} />
          ))}
        </div>
      </section>

      {/* Cómo comprar */}
      <section className="comprar">
        <div className="comprar-eyebrow">Cómo comprar</div>
        <p className="comprar-texto">
          Elegís la prenda, nos escribís por WhatsApp y coordinamos entrega o envío a todo el país.
        </p>
        <a href={linkWhatsApp()} target="_blank" rel="noreferrer" className="comprar-boton">
          Escribinos →
        </a>
      </section>

      <footer className="pie">
        <div className="pie-marca">soy Olis.</div>
        <div>{UBICACION}</div>
        <div>@{INSTAGRAM_USUARIO}</div>
      </footer>
    </main>
  );
}

export default Home;
