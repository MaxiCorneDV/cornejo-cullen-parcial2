import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

function Profile() {
  const { user, isAdmin, logout } = useAuth();
  const { totalItems } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const formattedDate = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString('es-AR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    : 'Miembro activo';

  return (
    <section className="profile-container">
      <div className="profile-card">
        <div className="profile-header">
          <div className="profile-avatar">
            {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
          </div>
          <div className="profile-title-box">
            <span className={`role-badge ${isAdmin ? 'role-admin' : 'role-user'}`}>
              {isAdmin ? 'Administrador' : 'Usuario Registrado'}
            </span>
            <h1>{user?.name}</h1>
            <p className="profile-email">{user?.email}</p>
          </div>
        </div>

        <div className="profile-details-grid">
          <div className="profile-detail-item">
            <span className="detail-label">Nombre completo</span>
            <span className="detail-value">{user?.name}</span>
          </div>

          <div className="profile-detail-item">
            <span className="detail-label">Correo electrónico</span>
            <span className="detail-value">{user?.email}</span>
          </div>

          <div className="profile-detail-item">
            <span className="detail-label">Rol de cuenta</span>
            <span className="detail-value">{isAdmin ? 'Admin (Acceso CRUD)' : 'Cliente'}</span>
          </div>

          <div className="profile-detail-item">
            <span className="detail-label">Miembro desde</span>
            <span className="detail-value">{formattedDate}</span>
          </div>
        </div>

        <div className="profile-actions">
          <Link to="/" className="btn-primary-sm">
            Explorar Catálogo
          </Link>
          <Link to="/cart" className="btn-secondary-sm">
            Mi Carrito ({totalItems})
          </Link>
          {isAdmin && (
            <Link to="/admin" className="btn-secondary-sm">
              Panel Admin CRUD
            </Link>
          )}
          <button type="button" onClick={handleLogout} className="btn-danger-sm">
            Cerrar Sesión
          </button>
        </div>
      </div>
    </section>
  );
}

export default Profile;