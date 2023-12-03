"use client";

import { createContext, useContext, useState } from "react";

const cartContext = createContext();

export function useCartContext() {
  return useContext(cartContext);
}

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  console.log("Carrito:", cart);

  const isInCart = (item, cart) => {
    // Verificar si tiene más de dos productos con el mismo slug en el carrito
    return cart.some((cartItem) => cartItem.slug === item.slug);
  };

  const addItem = (item, quantity) => {
    // Si el producto no esta en el carrito, lo agregamos.
    // Si el producto ya esta en el carrito, aumentamos en la cantidad.
    if (!isInCart(item, cart)) {
      item.quantity = quantity;
      setCart([...cart, item]);
    } else {
      for (let i = 0; i < cart.length; i++) {
        if (cart[i].slug === item.slug) {
          cart[i].quantity += quantity;
        }
      }
      setCart([...cart]);
    }
  };

  return (
    <cartContext.Provider value={{ cart, setCart, addItem, isInCart }}>
      {children}
    </cartContext.Provider>
  );
};
