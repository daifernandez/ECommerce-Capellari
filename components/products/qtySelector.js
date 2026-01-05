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
    <div className="space-y-8">
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-4">
          <div className="flex items-center bg-white rounded-lg border border-gray-200 p-0.5">
            <button
              onClick={handleSubtract}
              className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-50 transition-all text-gray-400 hover:text-navy-900 disabled:opacity-20"
              aria-label="Reducir cantidad"
              disabled={quantity <= 1}
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M20 12H4"></path>
              </svg>
            </button>
            
            <input
              type="number"
              value={quantity}
              onChange={(e) => {
                const val = Math.max(1, Number(e.target.value));
                setQuantity(val);
              }}
              className="w-10 border-0 bg-transparent text-center text-gray-900 font-medium text-sm focus:outline-none focus:ring-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              min="1"
            />
            
            <button
              onClick={handleAdd}
              className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-50 transition-all text-gray-400 hover:text-navy-900"
              aria-label="Aumentar cantidad"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M12 4v16m8-8H4"></path>
              </svg>
            </button>
          </div>
          
          <div className="flex flex-col">
            <span className={`text-[11px] font-semibold ${item.inStock > 0 ? 'text-gray-600' : 'text-red-500'}`}>
              {item.inStock > 0 ? `${item.inStock} disponibles` : 'Sin stock'}
            </span>
          </div>
        </div>

        <Button 
          onClick={handleAddToCart}
          className="w-full sm:w-auto px-8 py-3 bg-navy-900 hover:bg-navy-800 text-white rounded-lg transition-all active:scale-95 flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-widest"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
          </svg>
          Agregar al carrito
        </Button>
      </div>

      <div className="flex items-center gap-6 pt-6 border-t border-gray-100">
        <div className="flex items-center gap-2 text-gray-400">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
          <span className="text-[10px] font-medium uppercase tracking-tight">Compra Protegida</span>
        </div>
        <div className="flex items-center gap-2 text-gray-400">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
          <span className="text-[10px] font-medium uppercase tracking-tight">Devolución Simple</span>
        </div>
      </div>
    </div>
  );
}
