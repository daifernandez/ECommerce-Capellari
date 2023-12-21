"use client";
import { useState } from "react";

export default function CreditCard() {
  const [card, setCard] = useState({
    number: "",
    nameOnCard: "",
    expirationDate: "",
    cvc: "",
    focus: "",
  });

  const [error, setError] = useState({
    number: "",
    nameOnCard: "",
    expirationDate: "",
    cvc: "",
  });

  const validations = {
    number: (number) => {
      if (!number) {
        return "El número de tarjeta es requerido";
      } else if (!/^[0-9]*$/.test(number)) {
        return "Por favor ingrese un número de tarjeta válido sin letras ni caracteres especiales";
      }
    },
    nameOnCard: (nameOnCard) => {
      if (!nameOnCard) {
        return "El nombre en la tarjeta es requerido";
      } else if (!/^[a-zA-Z ]*$/.test(nameOnCard)) {
        return "Por favor ingrese un nombre válido sin números ni caracteres especiales";
      }
      return null;
    },
    expirationDate: (expirationDate) => {
      if (!expirationDate) {
        return "La fecha de expiración es requerida";
      } else if (!/^(0[1-9]|1[0-2])\/([0-9]{2})$/.test(expirationDate)) {
        return "Por favor ingrese una fecha de expiración válida en formato MM/AA sin letras ni caracteres especiales";
      }
      return null;
    },
    cvc: (cvc) => {
      if (!cvc) {
        return "El código de seguridad es requerido";
      } else if (!/^[0-9]{3,4}$/.test(cvc)) {
        return "Por favor ingrese un código de seguridad válido de tres o cuatro dígitos numéricos sin espacios ni caracteres especiales";
      }
      return null;
    },
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let errorMessage = validations[name](value);

    setError((prev) => {
      if (errorMessage) {
        return { ...prev, [name]: errorMessage };
      } else {
        const { [name]: _, ...rest } = prev;
        return rest;
      }
    });
    setCard((card) => ({
      ...card,
      [name]: value,
    }));
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
              id="number"
              name="number"
              value={card.number}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-slate-500 focus:ring-slate-500 sm:text-sm"
              onChange={handleInputChange}
            />
          </div>
          {error.number && (
            <div className="text-red-500 text-xs mt-1">{error.number}</div>
          )}
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
              id="nameOnCard"
              name="nameOnCard"
              value={card.nameOnCard}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-slate-500 focus:ring-slate-500 sm:text-sm"
              onChange={handleInputChange}
            />
          </div>
          {error.nameOnCard && (
            <div
              className="text-red-500 text-xs mt-1
            "
            >
              {error.nameOnCard}
            </div>
          )}
        </div>

        <div className="col-span-3">
          <label
            htmlFor="expiry"
            className="block text-sm font-medium text-gray-700"
          >
            Fecha de vencimiento (MM/AA)
          </label>
          <div className="mt-1">
            <input
              type="text"
              name="expirationDate"
              id="expiringDate"
              value={card.expirationDate}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-slate-500 focus:ring-slate-500 sm:text-sm"
              onChange={handleInputChange}
            />
          </div>
          {error.expirationDate && (
            <div className="text-red-500 text-xs mt-1">
              {error.expirationDate}
            </div>
          )}
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
              value={card.cvc}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-slate-500 focus:ring-slate-500 sm:text-sm"
              onChange={handleInputChange}
            />
          </div>
          {error.cvc && (
            <div className="text-red-500 text-xs mt-1">{error.cvc}</div>
          )}
        </div>
      </div>
    </div>
  );
}
