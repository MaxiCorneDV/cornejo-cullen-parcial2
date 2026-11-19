import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { getVinyls } from '../services/vinylService';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('vinyl_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('vinyl_cart', JSON.stringify(cart));
  }, [cart]);

  const syncCart = useCallback(async () => {
    try {
      const latestVinyls = await getVinyls();
      const vinylMap = new Map(latestVinyls.map((v) => [v._id, v]));

      setCart((prev) => {
        if (prev.length === 0) return prev;
        let hasChanges = false;

        const updated = prev
          .map((item) => {
            const fresh = vinylMap.get(item._id);
            // Si el disco fue eliminado del catálogo, lo quitamos del carrito
            if (!fresh) {
              hasChanges = true;
              return null;
            }
            // Si cambió el precio, título, portada o stock en la DB, actualizamos el ítem
            if (
              fresh.price !== item.price ||
              fresh.title !== item.title ||
              fresh.artist !== item.artist ||
              fresh.coverUrl !== item.coverUrl ||
              fresh.stock !== item.stock
            ) {
              hasChanges = true;
              return {
                ...item,
                title: fresh.title,
                artist: fresh.artist,
                year: fresh.year,
                price: fresh.price,
                stock: fresh.stock,
                coverUrl: fresh.coverUrl,
                format: fresh.format
              };
            }
            return item;
          })
          .filter(Boolean);

        return hasChanges ? updated : prev;
      });
    } catch (error) {
      console.error('Error al sincronizar el carrito:', error);
    }
  }, []);

  // Sincroniza al cargar o recargar la aplicación
  useEffect(() => {
    syncCart();
  }, [syncCart]);

  const addToCart = (vinyl) => {
    setCart((prev) => {
      const exists = prev.find((item) => item._id === vinyl._id);
      if (exists) {
        return prev.map((item) =>
          item._id === vinyl._id
            ? { ...item, ...vinyl, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...vinyl, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item._id !== id));
  };

  const updateQuantity = (id, amount) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item._id === id ? { ...item, quantity: Math.max(0, item.quantity + amount) } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const clearCart = () => setCart([]);

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        syncCart,
        totalItems,
        totalPrice
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);