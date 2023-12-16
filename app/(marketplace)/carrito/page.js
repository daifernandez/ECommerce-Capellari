"use client";
// Description: Contiene la página del carrito de compras
import { CheckIcon, ClockIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { useCartContext } from "../../../components/context/cartContext";
import Image from "next/image";
import EmptyCart from "@/components/products/emptyCart";
import { toast, Toaster } from "react-hot-toast";


export default function Carrito() {
  const { cart, setCart } = useCartContext();

  const removeFromCart = (product) => {
    if (product.quantity > 1) {
      for (let i = 0; i < cart.length; i++) {
        if (cart[i].slug === product.slug) {
          cart[i].quantity -= 1;
        }
      }
      setCart([...cart]);
    } else {
      const newCart = cart.filter((item) => item.slug !== product.slug);
      setCart(newCart);
    }
    toast.success("Producto eliminado del carrito");
  };

  const totalPrice = cart.reduce((acc, item) => {
    const price = parseFloat(item.price);
    if (isNaN(price) || isNaN(item.quantity)) {
      console.error("Error: Precio o cantidad no válidos");
      return acc;
    } else {
      const totalItemPrice = price * item.quantity;
      return acc + totalItemPrice;
    }
  }, 0);

  const totalPriceString = totalPrice.toString();

  return (
    <div className="bg-white">
      <Toaster />
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:px-0">
        <form className="mt-12">
          <section aria-labelledby="cart-heading">
            <h2 id="cart-heading" className="sr-only">
              Productos en tu carrito
              {console.log(cart)}
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
                      <li key={product.slug} className="flex py-6">
                        <div className="flex-shrink-0">
                          <Image
                            src={product.image}
                            alt={product.title}
                            width={200}
                            height={200}
                            className="w-24 h-24 rounded-md object-center object-cover sm:w-48 sm:h-48"
                            style={{ objectFit: "contain" }}
                          />
                        </div>

                        <div className="ml-4 flex flex-1 flex-col sm:ml-6">
                          <div>
                            <div className="flex justify-between">
                              <h4 className="text-sm">
                                <p className="font-medium text-gray-700 hover:text-gray-800">
                                  {product.title}
                                </p>
                              </h4>
                              <p className="ml-4 text-sm font-medium text-gray-900">
                                {`$${product.price}`}
                              </p>
                            </div>
                            <p className="mt-1 text-sm text-gray-500">
                              {product.brand}
                            </p>
                            <p className="mt-4 text-sm text-gray-500">
                              Cantidad seleccionada
                            </p>
                            <p className="mt-1 text-sm text-gray-500">
                              {product.quantity}
                            </p>
                          </div>

                          <div className="mt-4 flex flex-1 items-end justify-between">
                            <p className="flex items-center space-x-2 text-sm text-gray-700">
                              {product.inStock > 0 ? (
                                <CheckIcon
                                  className="h-5 w-5 flex-shrink-0 text-green-500"
                                  aria-hidden="true"
                                />
                              ) : (
                                <ClockIcon
                                  className="h-5 w-5 flex-shrink-0 text-gray-300"
                                  aria-hidden="true"
                                />
                              )}
                              <span>
                                {product.inStock > 1
                                  ? "En Stock"
                                  : `Se enviará en 4 meses cuando haya stock`}
                              </span>
                            </p>
                            <div className="ml-4">
                              <button
                                onClick={() => removeFromCart(product)}
                                type="button"
                                className="text-sm font-medium text-blue-600 hover:text-blue-500"
                              >
                                <span>Eliminar</span>
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
            <section aria-labelledby="summary-heading" className="mt-10">
              <h2 id="summary-heading" className="sr-only">
                Resumen del pedido
              </h2>

              <div>
                <dl className="space-y-4">
                  <div className="flex items-center justify-between">
                    <dt className="text-base font-medium text-gray-900">
                      Subtotal
                    </dt>
                    <dd className="ml-4 text-base font-medium text-gray-900">
                      $ {totalPrice}
                    </dd>
                  </div>
                </dl>
                <p className="mt-1 text-sm text-gray-500">
                  Solo costo de productos
                </p>
              </div>

              <button
                type="submit"
                className="w-full rounded-md border border-transparent bg-slate-800 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                onClick={() => {
                  localStorage.setItem("totalPrice", totalPrice);
                  {console.log(
                    `estoy enviando el valor de totalPrice ${totalPrice}`
                  )}
                }}
              >
                <Link href="/carrito/checkout">Checkout</Link>
                
              </button>

              <div className="mt-6 text-center text-sm">
                <p>
                  o{" "}
                  <Link
                    href="/"
                    className="font-medium text-blue-600 hover:text-blue-500"
                  >
                    Continuar comprando
                    <span aria-hidden="true"> &rarr;</span>
                  </Link>
                </p>
              </div>
            </section>
          )}{" "}
        </form>
      </div>
    </div>
  );
}
