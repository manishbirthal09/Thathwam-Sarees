import { createContext, useContext, useState, useEffect, useCallback } from "react";
import api from "../api/axios";

const CartContext = createContext();


function getCartId() {
  let cartId = localStorage.getItem("cartId");
  if (!cartId) {
    cartId = crypto.randomUUID();
    localStorage.setItem("cartId", cartId);
  }
  return cartId;
}

export function CartProvider({ children }) {
  const [cart, setCart] = useState({ items: [] });
  const [loading, setLoading] = useState(true);
  const cartId = getCartId();

  const fetchCart = useCallback(async () => {
    setLoading(true);
    const { data } = await api.get(`/cart/${cartId}`);
    setCart(data);
    setLoading(false);
  }, [cartId]);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const addToCart = async (productId, quantity = 1) => {
    const { data } = await api.post(`/cart/${cartId}/add`, { productId, quantity });
    setCart(data);
  };

  const updateQuantity = async (productId, quantity) => {
    const { data } = await api.put(`/cart/${cartId}/update`, { productId, quantity });
    setCart(data);
  };

  const removeFromCart = async (productId) => {
    const { data } = await api.delete(`/cart/${cartId}/remove/${productId}`);
    setCart(data);
  };

  const itemCount = cart.items.reduce((sum, i) => sum + i.quantity, 0);
  const totalAmount = cart.items.reduce(
    (sum, i) => sum + (i.product?.discountPrice || i.product?.price || 0) * i.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{ cart, loading, addToCart, updateQuantity, removeFromCart, itemCount, totalAmount, cartId }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);