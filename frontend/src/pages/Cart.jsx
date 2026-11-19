import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function Cart() {
  const { cart, updateQuantity, removeFromCart, clearCart, totalPrice } = useCart();
  const [purchased, setPurchased] = useState(false);

  const handleCheckout = () => {
    setPurchased(true);
    clearCart();
  };

  if (purchased) {
    return (
      <div className="empty-state">
        <h2>🎉 ¡Gracias por tu compra!</h2>
        <p>Tu pedido de discos de vinilo está siendo preparado para envío.</p>
        <Link to="/" className="btn-primary-sm" onClick={() => setPurchased(false)}>
          Seguir viendo discos
        </Link>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="empty-state">
        <h2>Tu carrito está vacío</h2>
        <p>Explorá nuestro catálogo de 12 vinilos clásicos y sumá tus favoritos.</p>
        <Link to="/" className="btn-primary-sm">
          Ir al Catálogo
        </Link>
      </div>
    );
  }

  return (
    <section className="cart-page">
      <h1>Carrito de Compras</h1>

      <div className="cart-list">
        {cart.map((item) => (
          <div key={item._id} className="cart-item">
            <img src={item.coverUrl} alt={item.title} className="cart-item-img" />
            <div className="cart-item-info">
              <h3>{item.title}</h3>
              <p>
                {item.artist} ({item.year})
              </p>
              <span className="cart-unit-price">
                ${Number(item.price).toLocaleString('es-AR')} c/u
              </span>
            </div>

            <div className="cart-qty-controls">
              <button onClick={() => updateQuantity(item._id, -1)}>-</button>
              <span>{item.quantity}</span>
              <button onClick={() => updateQuantity(item._id, 1)}>+</button>
            </div>

            <div className="cart-item-subtotal">
              ${Number(item.price * item.quantity).toLocaleString('es-AR')}
            </div>

            <button onClick={() => removeFromCart(item._id)} className="btn-danger-sm">
              Eliminar
            </button>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <div>
          <button onClick={clearCart} className="btn-outline-sm">
            Vaciar Carrito
          </button>
        </div>
        <div className="cart-total-box">
          <h3>Total: ${Number(totalPrice).toLocaleString('es-AR')}</h3>
          <button onClick={handleCheckout} className="btn-primary-lg">
            Finalizar Compra
          </button>
        </div>
      </div>
    </section>
  );
}

export default Cart;
