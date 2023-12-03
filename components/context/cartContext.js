"use client";

import { createContext, useContext, useState } from "react";

const cartContext = createContext();

export function useCartContext() {
  return useContext(cartContext);
}

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  console.log("Carrito:", cart);

  const addToCart = (item) => {
    setCart([...cart, item]);
  };

  const isInCart = (item, cart) => {
    // Verificar si tiene más de dos productos con el mismo slug en el carrito
    return cart.some((cartItem) => cartItem.slug === item.slug);
  };

  return (
    <cartContext.Provider value={{ cart, setCart, addToCart, isInCart }}>
      {children}
    </cartContext.Provider>
  );
};
