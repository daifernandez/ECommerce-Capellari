"use client";

import { useState } from "react";
import Counter from "../ui/counter";
import Button from "../ui/button";
import { useCartContext } from "../context/cartContext";

const QtySelector = ({ item }) => {
  const { addToCart, isInCart } = useCartContext();
  const [quantity, setQuantity] = useState(1);

  const handleAdd = () => {
    const INSUFFICIENT_STOCK_MSG = "No hay stock suficiente";
    const INVALID_QUANTITY_MSG = "No se puede agregar al carrito";
    const EXCESS_QUANTITY_MSG = "No se puede agregar más de 2 unidades";
    const SUCCESS_MSG = "Producto agregado al carrito";
    const ALREADY_IN_CART_MSG = "El producto ya está en el carrito";

    if (isInCart(item)) {
      alert(ALREADY_IN_CART_MSG);
    } else if (quantity < 1) {
      alert(INVALID_QUANTITY_MSG);
    } else if (item.inStock < quantity) {
      alert(INSUFFICIENT_STOCK_MSG);
    } else if (quantity >= 3) {
      alert(EXCESS_QUANTITY_MSG);
    } else {
      addToCart({ ...item, quantity });
      console.log(item);
      alert(SUCCESS_MSG);
    }
  };

  return (
    <div className="flex flex-col gap-5 mt-6">
      <Counter max={item.inStock} counter={quantity} setCounter={setQuantity} />
      <Button className="w-full hover:bg-blue-600" onClick={handleAdd}>
        Agregar al carrito
      </Button>
    </div>
  );
};

export default QtySelector;
