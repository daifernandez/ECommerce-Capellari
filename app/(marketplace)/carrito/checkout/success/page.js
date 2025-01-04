"use client";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase/config";
import deliveryMethods from "@/data/deliveryMethods";
import { useSearchParams, useRouter } from "next/navigation";
import { useCartContext } from "@/components/context/cartContext";
import toast from "react-hot-toast";

export default function SuccessOrder() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  const [order, setOrder] = useState(null);
  const { clearCart } = useCartContext();
  const router = useRouter();
  const [copied, setCopied] = useState(false);

  const getOrder = async () => {
    const orderRef = doc(db, "orders", orderId);
    const orderSnap = await getDoc(orderRef);
    if (orderSnap.exists()) {
      setOrder(orderSnap.data());
      clearCart();
    } else {
      console.log("No such document!");
    }
  };

  useEffect(() => {
    getOrder();
  }, []);

  const handleCopyTracking = async () => {
    try {
      await navigator.clipboard.writeText('51547878755545848512');
      setCopied(true);
      toast.success('Número de seguimiento copiado');
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error('Error al copiar');
    }
  };

  if (!order) {
    return <div>Loading...</div>;
  }

  const deliveryMethod = deliveryMethods.find(
    (deliveryMethod) => deliveryMethod.id === order.client.deliveryMethod
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="text-center mb-20">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-tr from-green-50 to-green-100 mb-8 animate-fade-in-up shadow-green-100 shadow-lg">
            <svg 
              className="h-12 w-12 text-green-500 animate-check" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2.5} 
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" 
              />
            </svg>
          </div>
          <h1 className="text-5xl font-serif font-medium text-navy-900 mb-6 tracking-tight">
            ¡Gracias por tu compra!
          </h1>
          <p className="text-lg text-slate-600 mb-8 max-w-xl mx-auto">
            Tu orden ha sido recibida y nuestro equipo ya está trabajando en ella
          </p>
          <div className="inline-flex items-center space-x-3 bg-slate-100 px-4 py-2 rounded-full">
            <span className="text-sm font-medium text-slate-700">Orden ID:</span>
            <span className="font-mono text-sm text-slate-600">{orderId}</span>
          </div>
        </div>

        <div className="relative mb-20">
          <div className="absolute inset-0 flex items-center" aria-hidden="true">
            <div className="w-full border-t border-dashed border-slate-200"></div>
          </div>
          <div className="relative flex justify-center">
            <div className="bg-white px-6 py-2 rounded-full shadow-sm border border-slate-100">
              <span className="text-sm font-medium text-slate-700 flex items-center gap-2">
                <svg className="h-4 w-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
                SEGUIMIENTO
              </span>
            </div>
          </div>
          <div className="mt-6">
            <div className="bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden">
              <div className="px-6 py-5 bg-gradient-to-r from-slate-50 via-slate-100/50 to-slate-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-navy-900/10 flex items-center justify-center">
                      <svg className="h-5 w-5 text-navy-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-slate-500 mb-1">Número de seguimiento</p>
                      <p className="font-mono text-lg font-medium text-navy-900 tracking-wider select-all cursor-pointer hover:text-navy-700 transition-colors">
                        51547878755545848512
                      </p>
                    </div>
                  </div>
                  <button 
                    className="p-2 hover:bg-slate-100 rounded-lg transition-colors group"
                    onClick={handleCopyTracking}
                  >
                    <svg className="h-5 w-5 text-slate-400 group-hover:text-slate-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="px-6 py-3 bg-slate-50 border-t border-slate-100">
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Usa este número para rastrear tu pedido en cualquier momento</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
          <div className="px-8 py-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
              <div className="group">
                <h3 className="text-sm font-medium text-slate-700 flex items-center gap-3 mb-6">
                  <div className="p-2 bg-slate-100 rounded-lg group-hover:bg-slate-200 transition-colors">
                    <svg className="h-5 w-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  Dirección de envío
                </h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-[120px,1fr] items-baseline gap-4 text-sm">
                    <span className="text-slate-500">Nombre:</span>
                    <span className="font-medium text-slate-900">
                      {order.client.firstName} {order.client.lastName}
                    </span>
                  </div>
                  <div className="grid grid-cols-[120px,1fr] items-baseline gap-4 text-sm">
                    <span className="text-slate-500">Dirección:</span>
                    <div className="space-y-1">
                      <p className="text-slate-700">{order.client.address}</p>
                      {order.client.apartment && (
                        <p className="text-slate-600">Apto: {order.client.apartment}</p>
                      )}
                    </div>
                  </div>
                  <div className="grid grid-cols-[120px,1fr] items-baseline gap-4 text-sm">
                    <span className="text-slate-500">Ubicación:</span>
                    <span className="text-slate-700">{order.client.city}, {order.client.country}</span>
                  </div>
                  <div className="grid grid-cols-[120px,1fr] items-baseline gap-4 text-sm">
                    <span className="text-slate-500">Código postal:</span>
                    <span className="font-medium text-slate-700">{order.client.postalCode}</span>
                  </div>
                </div>
              </div>

              <div className="group">
                <h3 className="text-sm font-medium text-slate-700 flex items-center gap-3 mb-6">
                  <div className="p-2 bg-slate-100 rounded-lg group-hover:bg-slate-200 transition-colors">
                    <svg className="h-5 w-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  Dirección de facturación
                </h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-[120px,1fr] items-baseline gap-4 text-sm">
                    <span className="text-slate-500">Nombre:</span>
                    <span className="font-medium text-slate-900">
                      {order.client.firstName} {order.client.lastName}
                    </span>
                  </div>
                  <div className="grid grid-cols-[120px,1fr] items-baseline gap-4 text-sm">
                    <span className="text-slate-500">Dirección:</span>
                    <div className="space-y-1">
                      <p className="text-slate-700">{order.client.address}</p>
                      {order.client.apartment && (
                        <p className="text-slate-600">Apto: {order.client.apartment}</p>
                      )}
                    </div>
                  </div>
                  <div className="grid grid-cols-[120px,1fr] items-baseline gap-4 text-sm">
                    <span className="text-slate-500">Ubicación:</span>
                    <span className="text-slate-700">{order.client.city}, {order.client.country}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-slate-100">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
                <div className="group">
                  <h3 className="text-sm font-medium text-slate-700 flex items-center gap-3 mb-6">
                    <div className="p-2 bg-slate-100 rounded-lg group-hover:bg-slate-200 transition-colors">
                      <svg className="h-5 w-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                      </svg>
                    </div>
                    Método de pago
                  </h3>
                  <div className="grid grid-cols-[120px,1fr] items-baseline gap-4 text-sm">
                    <span className="text-slate-500">Tipo:</span>
                    <span className="font-medium text-slate-700">{order.client.paymentType}</span>
                  </div>
                </div>

                <div className="group">
                  <h3 className="text-sm font-medium text-slate-700 flex items-center gap-3 mb-6">
                    <div className="p-2 bg-slate-100 rounded-lg group-hover:bg-slate-200 transition-colors">
                      <svg className="h-5 w-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h8a1 1 0 001-1z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-5 3v5l5 3V7z" />
                      </svg>
                    </div>
                    Método de envío
                  </h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-[120px,1fr] items-baseline gap-4 text-sm">
                      <span className="text-slate-500">Servicio:</span>
                      <span className="font-medium text-slate-700">{deliveryMethod.title}</span>
                    </div>
                    <div className="grid grid-cols-[120px,1fr] items-baseline gap-4 text-sm">
                      <span className="text-slate-500">Tiempo:</span>
                      <span className="text-slate-600">{deliveryMethod.turnaround}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
