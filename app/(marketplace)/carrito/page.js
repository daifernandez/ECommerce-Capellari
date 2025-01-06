"use client";
// Description: Contiene la página del carrito de compras
import { CheckIcon, ClockIcon, TrashIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { useCartContext } from "../../../components/context/cartContext";
import Image from "next/image";
import EmptyCart from "@/components/products/emptyCart";
import { toast, Toaster } from "react-hot-toast";

export default function Carrito() {
  const { cart, setCart, totalPrice, removeFromCart } = useCartContext();

  const updateQuantity = (product, newQuantity) => {
    const updatedCart = cart.map(item => {
      if(item.slug === product.slug) {
        return {...item, quantity: parseInt(newQuantity)}
      }
      return item
    });
    setCart(updatedCart);
  }
  
  return (
    <div className="bg-white">
      <Toaster />
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:px-0">
        <form className="mt-12">
          <section aria-labelledby="cart-heading">
            <h2 id="cart-heading" className="sr-only">
              Productos en tu carrito
            </h2>
            {cart && cart.length === 0 ? (
              <EmptyCart />
            ) : (
              <div>
                <h1 className="text-center text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-14">
                  Carrito de Compras
                </h1>

                <ul
                  role="list"
                  className="divide-y divide-gray-200 border-b border-t border-gray-200"
                >
                  {cart &&
                    cart.map((product) => (
                      <li key={product.slug} className="flex py-6 hover:bg-gray-50 rounded-lg transition-colors p-4">
                        <div className="flex-shrink-0 bg-white p-2 rounded-md">
                          <Image
                            src={product.image}
                            alt={product.title}
                            width={200}
                            height={200}
                            className="w-24 h-24 rounded-md object-center object-cover sm:w-48 sm:h-48"
                            style={{ objectFit: "contain" }}
                            priority
                          />
                        </div>

                        <div className="ml-4 flex flex-1 flex-col sm:ml-6">
                          <div className="flex flex-col space-y-2">
                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
                              <div className="flex-1">
                                <h4 className="text-lg font-medium text-gray-900 mb-1">
                                  {product.title}
                                </h4>
                                <p className="text-sm text-gray-500">
                                  Marca: {product.brand}
                                </p>
                              </div>
                              <div className="mt-2 sm:mt-0 sm:ml-4">
                                <p className="text-lg font-semibold text-slate-900">
                                  ${product.price}
                                </p>
                              </div>
                            </div>

                            <div className="mt-4 flex items-center">
                              <label htmlFor={`quantity-${product.slug}`} className="mr-3 text-sm text-gray-600">
                                Cantidad:
                              </label>
                              <select
                                id={`quantity-${product.slug}`}
                                value={product.quantity}
                                onChange={(e) => {
                                  updateQuantity(product, e.target.value);
                                  toast.success("Cantidad actualizada");
                                }}
                                className="rounded-md border border-gray-300 text-sm py-1.5 px-3 min-w-[65px] focus:ring-1 focus:ring-slate-400 focus:border-slate-400 cursor-pointer bg-white"
                              >
                                {[...Array(10)].map((_, i) => (
                                  <option key={i + 1} value={i + 1}>
                                    {i + 1}
                                  </option>
                                ))}
                              </select>
                            </div>

                            <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4">
                              <p className="flex items-center space-x-2 text-sm text-gray-700">
                                {product.inStock > 0 ? (
                                  <span className="flex items-center text-green-600">
                                    <CheckIcon className="h-5 w-5 flex-shrink-0 mr-1" />
                                    En Stock
                                  </span>
                                ) : (
                                  <span className="flex items-center text-yellow-600">
                                    <ClockIcon className="h-5 w-5 flex-shrink-0 mr-1" />
                                    Envío en 4 meses
                                  </span>
                                )}
                              </p>
                              <button
                                onClick={() => {
                                  removeFromCart(product);
                                  toast.success("Producto eliminado del carrito");
                                }}
                                type="button"
                                className="p-2 text-red-500 hover:text-red-600 transition-all duration-200 ease-in-out rounded-full hover:bg-red-50 border border-transparent hover:border-red-200 hover:scale-110"
                                title="Eliminar producto"
                              >
                                <TrashIcon className="h-5 w-5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                </ul>
              </div>
            )}{" "}
          </section>
          {/* Orden */}
          {cart && cart.length === 0 ? null : (
            <section aria-labelledby="summary-heading" className="mt-10 bg-gray-50 rounded-lg px-4 py-6">
              <h2 id="summary-heading" className="text-lg font-medium text-gray-900">
                Resumen del pedido
              </h2>

              <dl className="mt-6 space-y-4">
                <div className="flex items-center justify-between">
                  <dt className="text-sm text-gray-600">Subtotal</dt>
                  <dd className="text-sm font-medium text-gray-900">$ {totalPrice()}</dd>
                </div>
                <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                  <dt className="text-base font-medium text-gray-900">Total del pedido</dt>
                  <dd className="text-base font-medium text-gray-900">$ {totalPrice()}</dd>
                </div>
              </dl>

              <Link href="/carrito/checkout" className="mt-6 w-full block">
                <button className="w-full rounded-md border border-transparent bg-slate-800 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 focus:ring-offset-gray-50 transition-colors">
                  Proceder al pago
                </button>
              </Link>
            </section>
          )}{" "}
        </form>
      </div>
    </div>
  );
}
