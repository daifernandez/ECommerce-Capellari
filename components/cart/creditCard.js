"use client";
import { useState } from "react";
import Image from "next/image";

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
    <div className="p-8 max-w-md mx-auto bg-white rounded-xl shadow-lg mt-10 mb-10">
      <div className="mb-8 relative">
        <div className="w-full h-56 bg-gradient-to-r from-gray-700 to-gray-900 rounded-xl p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-b from-transparent to-gray-800/50 rounded-full transform translate-x-1/2 -translate-y-1/2"></div>
          
          <div className="w-12 h-10 bg-yellow-500/80 rounded-md mb-4"></div>

          <div className="text-white font-mono text-2xl tracking-wider mb-4">
            {card.number 
              ? card.number.match(/.{1,4}/g)?.join(' ') || '•••• •••• •••• ••••'
              : '•••• •••• •••• ••••'
            }
          </div>

          <div className="flex justify-between items-end">
            <div>
              <div className="text-gray-300 text-xs mb-1">Titular de la tarjeta</div>
              <div className="text-white font-mono tracking-wider">
                {card.nameOnCard || 'NOMBRE APELLIDO'}
              </div>
            </div>

            <div className="text-right">
              <div className="text-gray-300 text-xs mb-1">Válida hasta</div>
              <div className="text-white font-mono tracking-wider">
                {card.expirationDate || 'MM/AA'}
              </div>
            </div>
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-gray-800 mb-6">Información de Pago</h2>
      <div className="space-y-6">
        <div>
          <label
            htmlFor="number"
            className="block text-sm font-semibold text-gray-700 mb-2"
          >
            Número de tarjeta
          </label>
          <div className="relative">
            <input
              type="text"
              id="number"
              name="number"
              value={card.number}
              className="block w-full pl-4 pr-12 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-slate-500 focus:border-transparent transition duration-150 ease-in-out"
              onChange={handleInputChange}
              placeholder="1234 5678 9012 3456"
              maxLength="16"
            />
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
            </span>
          </div>
          {error.number && (
            <div className="text-red-500 text-sm mt-1">{error.number}</div>
          )}
        </div>

        <div>
          <label
            htmlFor="name-on-card"
            className="block text-sm font-semibold text-gray-700 mb-2"
          >
            Nombre en la tarjeta
          </label>
          <input
            type="text"
            id="nameOnCard"
            name="nameOnCard"
            value={card.nameOnCard}
            className="block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-slate-500 focus:border-transparent transition duration-150 ease-in-out"
            onChange={handleInputChange}
            placeholder="NOMBRE APELLIDO"
          />
          {error.nameOnCard && (
            <div className="text-red-500 text-sm mt-1">{error.nameOnCard}</div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="expirationDate"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Fecha de vencimiento
            </label>
            <input
              type="text"
              name="expirationDate"
              id="expirationDate"
              value={card.expirationDate}
              className="block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-slate-500 focus:border-transparent transition duration-150 ease-in-out"
              onChange={handleInputChange}
              placeholder="MM/AA"
            />
            {error.expirationDate && (
              <div className="text-red-500 text-sm mt-1">{error.expirationDate}</div>
            )}
          </div>

          <div>
            <label
              htmlFor="cvc"
              className="block text-sm font-semibold text-gray-700 mb-2 flex items-center"
            >
              CVC
              <span className="ml-1 text-gray-400 hover:text-gray-500 cursor-help">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </span>
            </label>
            <input
              type="text"
              name="cvc"
              id="cvc"
              value={card.cvc}
              className="block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-slate-500 focus:border-transparent transition duration-150 ease-in-out"
              onChange={handleInputChange}
              placeholder="123"
              maxLength="4"
            />
            {error.cvc && (
              <div className="text-red-500 text-sm mt-1">{error.cvc}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
