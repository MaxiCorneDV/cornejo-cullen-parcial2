import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function VinylCard({ vinyl }) {
  const { addToCart } = useCart();

  return (
    <article className="vinyl-card">
      <div className="vinyl-image-wrapper">
        <img src={vinyl.coverUrl} alt={vinyl.title} className="vinyl-image" loading="lazy" />
        <span className="vinyl-genre-badge">{vinyl.genre}</span>
      </div>

      <div className="vinyl-body">
        <div className="vinyl-meta">
          <span className="vinyl-artist">{vinyl.artist}</span>
          <span className="vinyl-year">{vinyl.year}</span>
        </div>

        <h3 className="vinyl-title">{vinyl.title}</h3>
        <p className="vinyl-format">{vinyl.format || 'LP 12" 180g'}</p>

        <div className="vinyl-footer">
          <span className="vinyl-price">${Number(vinyl.price).toLocaleString('es-AR')}</span>
          <div className="vinyl-actions">
            <Link to={`/vinyl/${vinyl._id}`} className="btn-secondary-sm">
              Detalle
            </Link>
            <button onClick={() => addToCart(vinyl)} className="btn-primary-sm">
              + Carrito
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

export default VinylCard;
