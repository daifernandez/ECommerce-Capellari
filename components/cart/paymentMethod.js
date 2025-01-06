import { useState } from 'react';
import CreditCard from './creditCard';
import Transfer from './transfer';

const PaymentMethod = ({ selectedMethod, onMethodSelect }) => {
  const methods = [
    {
      id: "creditCard",
      title: "Tarjeta de Crédito/Débito",
      description: "Paga de forma segura con tu tarjeta",
      icon: (
        <svg className="w-6 h-6 text-slate-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
        </svg>
      )
    },
    {
      id: "transfer",
      title: "Transferencia Bancaria",
      description: "Transfiere desde tu cuenta bancaria",
      icon: (
        <svg className="w-6 h-6 text-slate-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
        </svg>
      )
    }
  ];

  const handleMethodSelect = (methodId) => {
    if (onMethodSelect) {
      onMethodSelect(methodId);
    }
  };

  return (
    <div className="space-y-4">
      {/* Opciones de pago */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {methods.map((method) => (
          <div
            key={method.id}
            onClick={() => handleMethodSelect(method.id)}
            className={`border rounded-lg transition-all duration-200 cursor-pointer p-4 
              ${selectedMethod === method.id 
                ? 'border-slate-800 bg-slate-50 shadow-sm' 
                : 'border-gray-200 hover:border-slate-300'}`}
          >
            <div className="flex items-center space-x-3">
              <div className="flex items-center h-5">
                <input
                  type="radio"
                  name="payment-method"
                  id={method.id}
                  checked={selectedMethod === method.id}
                  onChange={() => handleMethodSelect(method.id)}
                  className="h-4 w-4 text-slate-800 border-gray-300 focus:ring-slate-800"
                />
              </div>
              <div className="flex-shrink-0">
                {method.icon}
              </div>
              <div className="flex-1 min-w-0">
                <label htmlFor={method.id} className="text-sm font-medium text-gray-900 cursor-pointer">
                  {method.title}
                </label>
                <p className="text-sm text-gray-500">
                  {method.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Componente del método seleccionado */}
      {selectedMethod && (
        <div className="mt-6 border-t border-gray-200 pt-6">
          <h3 className="text-sm font-medium text-gray-900 mb-4">
            Detalles del pago
          </h3>
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            {selectedMethod === "creditCard" && <CreditCard />}
            {selectedMethod === "transfer" && <Transfer />}
          </div>
        </div>
      )}

      {/* Mensaje de seguridad */}
      <div className="mt-6 bg-blue-50 border border-blue-100 rounded-lg p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <svg className="w-5 h-5 text-blue-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z" clipRule="evenodd" />
            </svg>
          </div>
          <p className="ml-3 text-sm text-blue-700">
            Todos los pagos son procesados de forma segura. Tus datos nunca serán compartidos.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethod;
