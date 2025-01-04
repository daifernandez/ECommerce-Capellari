"use client";
import { useState } from "react";
import { RadioGroup } from "@headlessui/react";
import { CheckCircleIcon, TrashIcon } from "@heroicons/react/20/solid";
import { useCartContext } from "@/components/context/cartContext";
import Image from "next/image";
import { db } from "@/firebase/config";
import { setDoc, doc, updateDoc, Timestamp } from "firebase/firestore";
import CreditCard from "@/components/cart/creditCard";
import Transfer from "@/components/cart/transfer";
import PaymentMethod from "@/components/cart/paymentMethod";

import { toast, Toaster } from "react-hot-toast";
import Link from "next/link";
import deliveryMethods from "@/data/deliveryMethods";
import { useRouter, usePathname, useSearchParams } from "next/navigation";


const deliveryMethodFromId = (id) => {
  return deliveryMethods.find((deliveryMethod) => deliveryMethod.id === id);
};

// agregarle un modal para uqe se muestre un mensaje de exito y agradecimiento por la compra
const createOrder = async (values, items) => {
  const order = {
    client: values,
    items: items.map((item) => ({
      title: item.title,
      price: item.price,
      slug: item.slug,
      quantity: item.quantity,
      brand: item.brand,
      // evaluar estos dos items
      category: item.category,
      image: item.image,
    })),
    date: new Date().toISOString(),
  };

  const docId = Timestamp.fromDate(new Date()).toMillis();
  const orderRef = doc(db, "orders", String(docId));
  await setDoc(orderRef, order);

  return docId;
};

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function CheckoutForm() {
  const router = useRouter();
  const { cart, totalPrice } = useCartContext();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");

  const [value, setValue] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    apartment: "",
    city: "",
    country: "",
    region: "",
    postalCode: "",
    phone: "",
    deliveryMethod: 1,
    paymentType: "",
  });

  const [error, setError] = useState({});

  const validations = {
    email: (email) => {
      if (!email) {
        return "El correo electrónico es requerido";
      } else if (
        !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)
      ) {
        return "El correo electrónico debe contener '@' y '.com'";
      }
      return null;
    },
    firstName: (firstName) => {
      if (!firstName) {
        return "El nombre es requerido";
      } else if (!/^[a-zA-Z]*$/.test(firstName)) {
        return "Por favor ingrese un nombre válido sin números ni caracteres especiales";
      }
      return null;
    },
    lastName: (lastName) => {
      if (!lastName) {
        return "El apellido es requerido";
      } else if (!/^[a-zA-Z]*$/.test(lastName)) {
        return "Por favor ingrese un apellido válido sin números ni caracteres especiales";
      }
      return null;
    },
    address: (address) => {
      if (!address) {
        return "La dirección es requerida";
      } else if (!/^[a-zA-Z0-9\s]*$/.test(address)) {
        return "La dirección solo debe contener letras, números y espacios";
      }
      return null;
    },
    apartment: (apartment) => {
      if (!apartment) {
        return "El número de apartamento es requerido";
      } else if (!/^[a-zA-Z0-9\s]*$/.test(apartment)) {
        return "El número de apartamento solo debe contener letras, números y espacios";
      }
      return null;
    },
    city: (city) => {
      if (!city) {
        return (city = "La ciudad es requerida");
      } else if (!/^[a-zA-Z ]*$/.test(city)) {
        return "Por favor ingrese una ciudad válida sin números ni caracteres especiales";
      }
      return null;
    },
    country: (country) => {
      if (!country) {
        return "El país es requerido";
      } else if (!/^[a-zA-Z]*$/.test(country)) {
        return "Por favor ingrese un país válido sin números ni caracteres especiales";
      }
      return null;
    },
    region: (region) => {
      if (!region) {
        return "La región es requerida";
      } else if (!/^[a-zA-Z]*$/.test(region)) {
        return "Por favor ingrese una región válida sin números ni caracteres especiales";
      }
      return null;
    },
    postalCode: (postalCode) => {
      if (!postalCode) {
        return "El código postal es requerido";
      } else if (!/^[0-9]*$/.test(postalCode)) {
        return "Por favor ingrese un código postal válido sin letras ni caracteres especiales";
      }
      return null;
    },
    phone: (phone) => {
      if (!phone) {
        return "El número de teléfono es requerido";
      } else if (!/^[0-9]*$/.test(phone)) {
        return "Por favor ingrese un número de teléfono válido sin letras ni caracteres especiales";
      }
      return null;
    },
    paymentType: (paymentType) => {
      if (!paymentType) {
        return "El tipo de pago es requerido";
      }
      return null;
    },
    deliveryMethod: (deliveryMethod) => {
      if (!deliveryMethod) {
        return "El método de envío es requerido";
      }
      return null;
    },
  };

  const handleChange = (e) => {
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

    setValue((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


    const errors = Object.keys(value).reduce((acc, key) => {
      let errorMessage = validations[key](value[key]);
      if (errorMessage) {
        acc[key] = errorMessage;
      }
      return acc;
    }, {});

    if (Object.keys(errors).length > 0) {
      setError(errors);
      toast.error("Por favor, corrija los errores");
      return;
    }

    try {
      // aca deberia ir la integracion con el pago con tarjeta de credito
      const result = await createOrder(value, cart);
      toast.success("Orden creada con éxito");
      for (const product of cart) {
        updatProductStock(product.slug, product.inStock - product.quantity);
      }
      router.push("/carrito/checkout/success?orderId=" + result);
    } catch (error) {
      toast.error("Error procesar la orden");
      console.error("Error: ", error);
    }
  };

  function updatProductStock(docId, newStock) {
    const docRef = doc(db, "products", docId);
    updateDoc(docRef, {
      inStock: newStock,
    });
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <Toaster />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto lg:max-w-none mb-12">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-8">
            Finalizar Compra
          </h1>

          <div className="mb-8">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <div className="flex items-center text-slate-800">
                  <span className="h-6 w-6 flex items-center justify-center rounded-full border-2 border-slate-800">
                    1
                  </span>
                  <span className="ml-2 text-sm font-medium">Información</span>
                </div>
                <div className="mx-4 h-0.5 w-16 bg-slate-200"></div>
                <div className="flex items-center text-gray-400">
                  <span className="h-6 w-6 flex items-center justify-center rounded-full border-2 border-gray-300">
                    2
                  </span>
                  <span className="ml-2 text-sm font-medium">Envío</span>
                </div>
                <div className="mx-4 h-0.5 w-16 bg-slate-200"></div>
                <div className="flex items-center text-gray-400">
                  <span className="h-6 w-6 flex items-center justify-center rounded-full border-2 border-gray-300">
                    3
                  </span>
                  <span className="ml-2 text-sm font-medium">Pago</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="lg:grid lg:grid-cols-12 lg:gap-x-12">
          <div className="lg:col-span-7">
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                  Información Personal
                </h2>

                <div className="mt-10">
                  <label
                    htmlFor="email-address"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <div className="mt-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                    </div>
                    <input
                      value={value.email}
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-slate-500 focus:ring-slate-500 sm:text-sm hover:border-gray-400 transition-colors"
                      onChange={handleChange}
                    />
                  </div>
                  {error && error.email && (
                    <span className="flex items-center text-red-500 text-sm mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {error.email}
                    </span>
                  )}
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                  Información de Envío
                </h2>

                <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                  <div>
                    <label
                      htmlFor="firstName"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Nombre
                    </label>
                    <div className="mt-1">
                      <input
                        value={value.firstName}
                        type="text"
                        id="firstName"
                        name="firstName"
                        required
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-slate-500 focus:ring-slate-500 sm:text-sm"
                        onChange={handleChange}
                      />
                    </div>
                    {error && error.firstName && (
                      <span className="flex items-center text-red-500 pl-3 text-sm mt-2">
                        {error.firstName}
                      </span>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="lastName"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Apellido
                    </label>
                    <div className="mt-1">
                      <input
                        value={value.lastName}
                        type="text"
                        id="lastName"
                        name="lastName"
                        required
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-slate-500 focus:ring-slate-500 sm:text-sm"
                        onChange={handleChange}
                      />
                    </div>
                    {error && error.lastName && (
                      <span className="flex items-center text-red-500 pl-3 text-sm mt-2">
                        {error.lastName}
                      </span>
                    )}
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="address"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Dirección
                    </label>
                    <div className="mt-1">
                      <input
                        value={value.address}
                        type="text"
                        name="address"
                        id="address"
                        required
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-slate-500 focus:ring-slate-500 sm:text-sm"
                        onChange={handleChange}
                      />
                    </div>
                    {error && error.address && (
                      <span className="flex items-center text-red-500 pl-3 text-sm mt-2">
                        {error.address}
                      </span>
                    )}
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="apartment"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Número de Apartamento, casa, etc.
                    </label>
                    <div className="mt-1">
                      <input
                        value={value.apartment}
                        type="text"
                        name="apartment"
                        id="apartment"
                        required
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-slate-500 focus:ring-slate-500 sm:text-sm"
                        onChange={handleChange}
                      />
                    </div>
                    {error && error.apartment && (
                      <span className="flex items-center text-red-500 pl-3 text-sm mt-2">
                        {error.apartment}
                      </span>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="city"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Ciudad
                    </label>
                    <div className="mt-1">
                      <input
                        value={value.city}
                        type="text"
                        name="city"
                        id="city"
                        required
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-slate-500 focus:ring-slate-500 sm:text-sm"
                        onChange={handleChange}
                      />
                    </div>
                    {error && error.city && (
                      <span className="flex items-center text-red-500 pl-3 text-sm mt-2">
                        {error.city}
                      </span>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="country"
                      className="block text-sm font-medium text-gray-700"
                    >
                      País
                    </label>
                    <div className="mt-1">
                      <select
                        value={value.country}
                        id="country"
                        name="country"
                        // required
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-slate-500 focus:ring-slate-500 sm:text-sm"
                        onChange={handleChange}
                      >
                        <option value="" disabled>
                          Seleccionar país
                        </option>
                        <option value="Argentina">Argentina</option>
                        <option value="Bolivia">Bolivia</option>
                        <option value="Brasil">Brasil</option>
                        <option value="Chile">Chile</option>
                        <option value="Paraguay">Paraguay</option>
                        <option value="Uruguay">Uruguay</option>
                      </select>
                    </div>
                    {error && error.country && (
                      <span className="flex items-center text-red-500 pl-3 text-sm mt-2">
                        {error.country}
                      </span>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="region"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Region / Provincia
                    </label>
                    <div className="mt-1">
                      <input
                        value={value.region}
                        type="text"
                        name="region"
                        id="region"
                        required
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-slate-500 focus:ring-slate-500 sm:text-sm"
                        onChange={handleChange}
                      />
                    </div>
                    {error && error.region && (
                      <span className="flex items-center text-red-500 pl-3 text-sm mt-2">
                        {error.region}
                      </span>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="postalCode"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Código Postal
                    </label>
                    <div className="mt-1">
                      <input
                        value={value.postalCode}
                        type="text"
                        name="postalCode"
                        id="postalCode"
                        required
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-slate-500 focus:ring-slate-500 sm:text-sm"
                        onChange={handleChange}
                      />
                    </div>
                    {error && error.postalCode && (
                      <span className="flex items-center text-red-500 pl-3 text-sm mt-2">
                        {error.postalCode}
                      </span>
                    )}
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Número de teléfono
                    </label>
                    <div className="mt-1">
                      <input
                        value={value.phone}
                        type="text"
                        name="phone"
                        id="phone"
                        required
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-slate-500 focus:ring-slate-500 sm:text-sm"
                        onChange={handleChange}
                      />
                    </div>
                    {error && error.phone && (
                      <span className="flex items-center text-red-500 pl-3 text-sm mt-2">
                        {error.phone}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Método de Pago */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                  Método de Pago
                </h2>
                <PaymentMethod 
                  selectedMethod={selectedPaymentMethod}
                  onMethodSelect={(method) => {
                    setSelectedPaymentMethod(method);
                    setValue(prev => ({ ...prev, paymentType: method }));
                  }}
                />
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 mt-10 lg:mt-0">
            <div className="sticky top-6">
              <div className="bg-white rounded-lg shadow-sm border border-gray-100">
                <div className="p-6 border-b border-gray-100">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Resumen del Pedido
                  </h2>
                </div>

                {/* Lista de productos */}
                <div className="divide-y divide-gray-100 max-h-[400px] overflow-y-auto">
                  {cart.map((product) => (
                    <div key={product.slug} className="p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0">
                          <Image
                            src={product.image}
                            alt={product.title}
                            width={80}
                            height={80}
                            className="rounded-md object-cover"
                            style={{ width: "auto", height: "auto" }}
                            priority
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {product.title}
                          </p>
                          <p className="text-sm text-gray-500">
                            {product.brand} • {product.category}
                          </p>
                          <div className="mt-2 flex items-center justify-between">
                            <p className="text-sm font-medium text-gray-900">
                              ${product.price}
                            </p>
                            <p className="text-sm text-gray-500">
                              Cantidad: {product.quantity}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Totales */}
                <div className="p-6 bg-gray-50 border-t border-gray-100">
                  <div className="space-y-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Subtotal</span>
                      <span className="font-medium">${totalPrice()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Envío</span>
                      <span className="font-medium">
                        ${deliveryMethodFromId(value.deliveryMethod).price}
                      </span>
                    </div>
                    <div className="pt-3 border-t border-gray-200">
                      <div className="flex justify-between">
                        <span className="text-base font-medium">Total</span>
                        <span className="text-base font-medium">
                          ${totalPrice() + Number(deliveryMethodFromId(value.deliveryMethod).price)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Botón de confirmar */}
                <div className="p-6 border-t border-gray-100">
                  <button
                    type="submit"
                    className="w-full rounded-md bg-slate-800 px-6 py-4 text-base font-medium text-white transition-all duration-200 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 transform hover:-translate-y-0.5"
                  >
                    <span className="flex items-center justify-center">
                      <span>Confirmar Pedido</span>
                      <svg className="ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
