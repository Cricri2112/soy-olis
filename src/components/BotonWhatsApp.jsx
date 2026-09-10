import './BotonWhatsApp.css';

// Botón fijo al pie de la pantalla que abre WhatsApp con un mensaje prearmado.
function BotonWhatsApp({ link }) {
  return (
    <div className="cta">
      <div className="cta-contenido">
        <a href={link} target="_blank" rel="noreferrer" className="cta-boton">
          <span className="cta-punto"></span>
          Consultar por WhatsApp
        </a>
      </div>
    </div>
  );
}

export default BotonWhatsApp;
