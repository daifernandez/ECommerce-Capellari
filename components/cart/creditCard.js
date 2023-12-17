"use client";
import { useState } from "react";

export default function CreditCard() {
  const [card, setCard] = useState({
    number: "",
    name: "",
    expiry: "",
    cvc: "",
    focus: "",
  });

  const handleInputChange = (e) => {
    setCard({
      ...card,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="p-6 max-w-sm mx-auto bg-white rounded-3xl shadow-md flex items-center space-x-4 mt-10 mb-10">
      <div className="mt-6 grid grid-cols-4 gap-x-4 gap-y-6">
        <div className="col-span-4">
          <label
            htmlFor="card-number"
            className="block text-sm font-medium text-gray-700"
          >
            Número de tarjeta
          </label>
          <div className="mt-1">
            <input
              type="text"
              id="card-number"
              name="card-number"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-slate-500 focus:ring-slate-500 sm:text-sm"
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="col-span-4">
          <label
            htmlFor="name-on-card"
            className="block text-sm font-medium text-gray-700"
          >
            Nombre en la tarjeta
          </label>
          <div className="mt-1">
            <input
              type="text"
              id="name-on-card"
              name="name-on-card"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-slate-500 focus:ring-slate-500 sm:text-sm"
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="col-span-3">
          <label
            htmlFor="expiration-date"
            className="block text-sm font-medium text-gray-700"
          >
            Fecha de vencimiento (MM/AA)
          </label>
          <div className="mt-1">
            <input
              type="text"
              name="expiration-date"
              id="expiration-date"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-slate-500 focus:ring-slate-500 sm:text-sm"
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="cvc"
            className="block text-sm font-medium text-gray-700"
          >
            CVC
          </label>
          <div className="mt-1">
            <input
              type="text"
              name="cvc"
              id="cvc"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-slate-500 focus:ring-slate-500 sm:text-sm"
              onChange={handleInputChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
