"use client";

import { createContext, useContext, useEffect, useState, useRef } from "react";

const cartContext = createContext();

export function useCartContext() {
  return useContext(cartContext);
}

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const localCartFetched = useRef(false);

  useEffect(() => {
    if (!localCartFetched.current) {
      console.log("Buscando cart...");
      const cart = localStorage.getItem("cart");
      if (cart) {
        console.log("Cart found in localStorage");
        setCart(JSON.parse(cart));
      }
      localCartFetched.current = true;
    }
  }, []);

  useEffect(() => {
    if (localCartFetched.current) {
      const prevCart = JSON.parse(localStorage.getItem("cart")) ?? [];
      if (JSON.stringify(prevCart) !== JSON.stringify(cart)) {
        console.log("Guardando carrito en localStorage:");
        localStorage.setItem("cart", JSON.stringify(cart));
      }
    }
  }, [cart]);

  const isInCart = (item, cart) => {
    // Verificar si tiene más de dos productos con el mismo slug en el carrito
    return cart.some((cartItem) => cartItem.slug === item.slug);
  };

  const addItem = (item, quantity) => {
    setCart(currentCart => {
      const existingItem = currentCart.find(cartItem => cartItem.slug === item.slug);
      
      if (existingItem) {
        return currentCart.map(cartItem => 
          cartItem.slug === item.slug 
            ? {...cartItem, quantity: cartItem.quantity + quantity}
            : cartItem
        );
      }
      
      return [...currentCart, {...item, quantity}];
    });
  };

  const totalPrice = () => {
    var price = 0;
    for (const product of cart) {
      price += product.price * product.quantity;
    }

    return price;
  };

  const removeFromCart = (product) => {
    if (product.quantity > 1) {
      for (let i = 0; i < cart.length; i++) {
        if (cart[i].slug === product.slug) {
          cart[i].quantity -= 1;
        }
      }
      setCart([...cart]);
    } else {
      const newCart = cart.filter((item) => item.slug !== product.slug);
      setCart(newCart);
    }
  };

  const deleteItem = (slug) => {
    const newCart = cart.filter((item) => item.slug !== slug);
    setCart(newCart);
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <cartContext.Provider
      value={{
        cart,
        setCart,
        addItem,
        isInCart,
        totalPrice,
        removeFromCart,
        deleteItem,
        clearCart
      }}
    >
      {children}
    </cartContext.Provider>
  );
};
