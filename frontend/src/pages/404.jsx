import { Link, useNavigate } from 'react-router-dom';

function Error404() {
  const navigate = useNavigate();

  return (
    <section className="error-404-container">
      <div className="error-404-card">
        <div className="error-404-disc"></div>
        <h1 className="error-404-code">404</h1>
        <h2>Pista no encontrada</h2>
        <p>
          La página que buscás no existe o la dirección es incorrecta.
        </p>
        <div className="error-404-actions">
          <Link to="/" className="btn-primary-lg">
            Volver al Catálogo
          </Link>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="btn-secondary-sm"
          >
            Página Anterior
          </button>
        </div>
      </div>
    </section>
  );
}

export default Error404;