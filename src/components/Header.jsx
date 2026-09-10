import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
  return (
    <header className="header">
      <Link to="/" className="header-logo">soy Olis</Link>
      <nav>
        <Link to="/catalogo" className="header-link">Catálogo</Link>
      </nav>
    </header>
  );
}

export default Header;
