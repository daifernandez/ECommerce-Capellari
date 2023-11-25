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

  const isInCart = (item) => {
    return cart.some((cartItem) => cartItem.id === item.id);
  };

  return (
    <cartContext.Provider value={{ cart, addToCart, isInCart }}>
      {children}
    </cartContext.Provider>
  );
};
