"use client";
import { useState } from "react";
import Counter from "../ui/counter";
import Button from "../ui/button";
import { useCartContext } from "../context/cartContext";
import { toast, Toaster } from "react-hot-toast";

const QtySelector = ({ item }) => {
  const { addItem, isInCart, cart } = useCartContext();
  const [quantity, setQuantity] = useState(1);

  function countInCart(item, cart) {
    let count = 0;
    for (let i = 0; i < cart.length; i++) {
      if (cart[i].slug === item.slug) {
        count += cart[i].quantity;
      }
    }
    return count;
  }

  const handleAdd = () => {
    const INSUFFICIENT_STOCK_MSG = "No hay stock suficiente";
    const INVALID_QUANTITY_MSG = "No se puede agregar al carrito";
    const EXCESS_QUANTITY_MSG =
      "No se puede agregar más de 2 unidades a tu carrito";
    const SUCCESS_MSG = "Producto agregado al carrito";

    let currentCount = countInCart(item, cart);

    if (isInCart(item, cart) && currentCount + quantity > 2) {
      toast.error(EXCESS_QUANTITY_MSG);
    } else if (quantity < 1) {
      toast.error(INVALID_QUANTITY_MSG);
    } else if (item.inStock < quantity) {
      toast.error(INSUFFICIENT_STOCK_MSG);
    } else if (quantity >= 3) {
      toast.error(EXCESS_QUANTITY_MSG);
    } else {
      addItem(item, quantity);
      toast.success(SUCCESS_MSG);
    }
  };

  return (
    <div className="flex flex-col gap-5 mt-6">
      <Toaster />
      <Counter max={item.inStock} counter={quantity} setCounter={setQuantity} />
      <Button className="w-full hover:bg-blue-600" onClick={handleAdd}>
        Agregar al carrito
      </Button>
    </div>
  );
};

export default QtySelector;
