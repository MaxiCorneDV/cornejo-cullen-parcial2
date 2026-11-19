import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getVinylById } from '../services/vinylService';
import { useCart } from '../context/CartContext';

function VinylDetail() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [vinyl, setVinyl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        setLoading(true);
        const data = await getVinylById(id);
        setVinyl(data);
      } catch (err) {
        setError(err.message || 'No se pudo cargar el vinilo');
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [id]);

  if (loading) return <div className="loading-state">Cargando disco...</div>;
  if (error || !vinyl) {
    return (
      <div className="empty-state">
        <p>{error || 'Vinilo no encontrado'}</p>
        <Link to="/" className="btn-primary-sm">
          Volver al catálogo
        </Link>
      </div>
    );
  }

  return (
    <section className="detail-container">
      <Link to="/" className="back-link">
        ← Volver al catálogo
      </Link>

      <div className="detail-card">
        <div className="detail-image-col">
          <img src={vinyl.coverUrl} alt={vinyl.title} className="detail-image" />
        </div>

        <div className="detail-info-col">
          <span className="vinyl-genre-badge">{vinyl.genre}</span>
          <h1>{vinyl.title}</h1>
          <h2 className="detail-artist">
            {vinyl.artist} • <span>{vinyl.year}</span>
          </h2>

          <p className="detail-description">{vinyl.description}</p>

          <div className="detail-specs">
            <div>
              <strong>Formato:</strong> {vinyl.format || 'LP 12" 180g'}
            </div>
            <div>
              <strong>Stock disponible:</strong> {vinyl.stock} unidades
            </div>
          </div>

          <div className="detail-purchase">
            <span className="detail-price">${Number(vinyl.price).toLocaleString('es-AR')}</span>
            <button onClick={() => addToCart(vinyl)} className="btn-primary-lg">
              Agregar al Carrito
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default VinylDetail;
