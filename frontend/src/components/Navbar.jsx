import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { getVinyls } from '../services/vinylService';

function Navbar() {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const { totalItems } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  const [inStockCount, setInStockCount] = useState(0);

  useEffect(() => {
    const fetchStockCount = async () => {
      try {
        const vinyls = await getVinyls();
        const available = vinyls.filter((v) => Number(v.stock) > 0).length;
        setInStockCount(available);
      } catch (error) {
        console.error('Error al cargar el contador de vinilos:', error);
      }
    };

    fetchStockCount();
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          <span className="brand-disc"></span>
          <span>Yukari <strong>Records</strong></span>
        </Link>

        <nav className="navbar-links">
          <Link to="/">Catálogo ({inStockCount})</Link>
          {isAuthenticated && isAdmin && (
            <Link to="/admin" className="admin-link">
              Panel Admin CRUD
            </Link>
          )}
          <Link to="/cart" className="cart-link">
            🛒 Carrito <span className="cart-badge">{totalItems}</span>
          </Link>

          {isAuthenticated ? (
            <div className="user-menu">
              <Link to="/profile" className="user-greeting profile-nav-link" title="Ver mi perfil">
                Bienvenido: {user?.name} ({isAdmin ? 'Admin' : 'Usuario'})
              </Link>
              <button onClick={handleLogout} className="btn-outline-sm">
                Salir
              </button>
            </div>
          ) : (
            <div className="auth-buttons">
              <Link to="/login" className="btn-outline-sm">
                Ingresar
              </Link>
              <Link to="/register" className="btn-primary-sm">
                Registrarse
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Navbar;