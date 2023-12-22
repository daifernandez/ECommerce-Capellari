"use client";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase/config";
import deliveryMethods from "@/data/deliveryMethods";
import { useSearchParams } from "next/navigation";
import { useCartContext } from "@/components/context/cartContext";

export default function SuccessOrder() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  console.log(orderId);
  const [order, setOrder] = useState(null);
  const { clearCart } = useCartContext();

  const getOrder = async () => {
    const orderRef = doc(db, "orders", orderId);
    const orderSnap = await getDoc(orderRef);
    if (orderSnap.exists()) {
      setOrder(orderSnap.data());
      console.log("Document data:", orderSnap.data());
      clearCart();
    } else {
      console.log("No such document!");
    }
  };

  useEffect(() => {
    getOrder();
  }, []);

  if (!order) {
    return <div>Loading...</div>;
  }

  const deliveryMethod = deliveryMethods.find(
    (deliveryMethod) => deliveryMethod.id === order.client.deliveryMethod
  );

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="max-w-xl">
          <h1 className="text-base font-medium text-slate-690">
            Gracias por tu compra!
          </h1>
          <p className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
            Tu orden ha sido recibida.
          </p>
          <p className="mt-2 text-base text-gray-500">
            Tu orden #{orderId} se encuentra en proceso de envío.
          </p>

          <dl className="mt-12 text-sm font-medium">
            <dt className="text-gray-900">NÚMERO DE SEGUIMIENTO</dt>
            <dd className="mt-2 text-slate-900">51547878755545848512</dd>
          </dl>
        </div>

        <div className="mt-10 border-t border-gray-200">
          <h2 className="sr-only">Tu orden</h2>

          <div className="sm:ml-40 sm:pl-6">
            <h3 className="sr-only">Your information</h3>

            <dl className="grid grid-cols-2 gap-x-6 py-10 text-sm">
              <div>
                <dt className="font-medium text-gray-900">
                  Dirección de envío
                </dt>
                <dd className="mt-2 text-gray-700">
                  <address className="not-italic">
                    <span className="block">
                      {order.client.firstName} {order.client.lastName}
                    </span>
                    <span className="block">
                      {order.client.address}, {order.client.apartment}
                    </span>
                    <span className="block">
                      {order.client.city}, {order.client.country}
                    </span>

                    <span className="block">cp: {order.client.postalCode}</span>
                  </address>
                </dd>
              </div>
              <div>
                <dt className="font-medium text-gray-900">
                  Dirección de facturación
                </dt>
                <dd className="mt-2 text-gray-700">
                  <address className="not-italic">
                    <span className="block">
                      {order.client.firstName} {order.client.lastName}
                    </span>
                    <span className="block">
                      {order.client.address}, {order.client.apartment}
                    </span>
                    <span className="block">
                      {order.client.city}, {order.client.country}
                    </span>
                  </address>
                </dd>
              </div>
            </dl>

            <h4 className="sr-only">Pago</h4>
            <dl className="grid grid-cols-2 gap-x-6 border-t border-gray-200 py-10 text-sm">
              <div>
                <dt className="font-medium text-gray-900">Método de pago</dt>
                <dd className="mt-2 text-gray-700">
                  <p>{order.client.paymentType}</p>
                </dd>
              </div>
              <div>
                <dt className="font-medium text-gray-900">Método de envio</dt>
                <dd className="mt-2 text-gray-700">
                  <p>{deliveryMethod.title}</p>
                  <p>{deliveryMethod.turnaround}</p>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
