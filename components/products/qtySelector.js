"use client";
import { useState } from "react";
import { useCartContext } from "../context/cartContext";
import Button from "../ui/button";

export default function QtySelector({ item }) {
  const { addItem } = useCartContext();
  const [quantity, setQuantity] = useState(1);

  const handleAdd = () => {
    setQuantity(prev => prev + 1);
  };

  const handleSubtract = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const handleAddToCart = () => {
    addItem(item, quantity);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-6">
        <div className="flex items-center">
          <button
            onClick={handleSubtract}
            className="w-10 h-10 flex items-center justify-center rounded-l-lg border border-r-0 border-gray-200 hover:bg-gray-50 transition-colors"
            aria-label="Reducir cantidad"
          >
            <svg className="w-4 h-4 text-gray-600" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M20 12H4"></path>
            </svg>
          </button>
          
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="w-16 h-10 border-y border-gray-200 text-center text-gray-900 text-lg focus:outline-none focus:ring-0"
            min="1"
          />
          
          <button
            onClick={handleAdd}
            className="w-10 h-10 flex items-center justify-center rounded-r-lg border border-l-0 border-gray-200 hover:bg-gray-50 transition-colors"
            aria-label="Aumentar cantidad"
          >
            <svg className="w-4 h-4 text-gray-600" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M12 4v16m8-8H4"></path>
            </svg>
          </button>
        </div>
        
        <span className="text-sm text-gray-500">
          {item.stock} unidades disponibles
        </span>
      </div>

      <div className="flex flex-col gap-3">
        <Button 
          onClick={handleAddToCart}
          className="w-full text-[15px]"
        >
          <svg className="w-5 h-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
          </svg>
          Agregar al carrito
        </Button>

        <button
          className="w-full bg-gray-50 text-navy-900 py-3.5 px-6 rounded-xl border border-gray-200 
            hover:bg-gray-100 active:bg-gray-200 active:scale-[0.98] transition-all duration-200 
            flex items-center justify-center gap-2 font-medium shadow-sm hover:shadow"
        >
          <svg className="w-5 h-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
          </svg>
          Agregar a favoritos
        </button>
      </div>

      <div className="border-t border-gray-100 pt-6">
        <div className="flex items-center gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-gray-400" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M5 13l4 4L19 7"></path>
            </svg>
            Envío seguro
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-gray-400" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
            </svg>
            Garantía de devolución
          </div>
        </div>
      </div>
    </div>
  );
}
