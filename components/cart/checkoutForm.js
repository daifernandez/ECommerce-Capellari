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

const paymentMethods = [
  { id: "creditCard", title: "Credit card" },

  { id: "transfer", title: "Transferencia bancaria" },
];

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
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState("paymentMethod");

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
    console.log(name, value);
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

    console.log(value);

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
      console.log(result);
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

  var contentComponentPaymentMethod;
  switch (selectedPaymentMethod) {
    case "paymentMethod":
      contentComponentPaymentMethod = <PaymentMethod />;
      break;
    case "creditCard":
      contentComponentPaymentMethod = <CreditCard />;
      break;

    case "transfer":
      contentComponentPaymentMethod = <Transfer />;
      break;
    default:
      contentComponentPaymentMethod = <CreditCard />;
  }

  return (
    <div className="bg-gray-50">
      <Toaster />
      <div className="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
          Checkout
        </h1>

        <form
          onSubmit={handleSubmit}
          className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16"
        >
          <div className="mt-10">
            <div>
              <h2 className="text-lg font-medium text-gray-900">Informacion</h2>

              <div className="mt-10">
                <label
                  htmlFor="email-address"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <div className="mt-1">
                  <input
                    value={value.email}
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-slate-500 focus:ring-slate-500 sm:text-sm"
                    onChange={handleChange}
                  />
                </div>
                {error && error.email && (
                  <span className="flex items-center text-red-500 pl-3 text-sm mt-2">
                    {error.email}
                  </span>
                )}
              </div>
            </div>

            <div className="mt-10 border-t border-gray-200 pt-10">
              <h2 className="text-lg font-medium text-gray-900">
                Informacion de Envio
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

            <div className="mt-10 border-t border-gray-200 pt-10">
              <RadioGroup
                value={value.deliveryMethod}
                onChange={(e) => {
                  setValue((prevValues) => ({
                    ...prevValues,
                    deliveryMethod: e,
                  }));
                }}
              >
                <RadioGroup.Label className="text-lg font-medium text-gray-900">
                  Método de envío
                </RadioGroup.Label>

                <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                  {deliveryMethods.map((deliveryMethod) => (
                    <RadioGroup.Option
                      key={deliveryMethod.id}
                      value={deliveryMethod.id}
                      name="deliveryMethod"
                      required
                      className={({ checked, active }) =>
                        classNames(
                          checked ? "border-transparent" : "border-gray-300",
                          active ? "ring-2 ring-slate-500" : "",
                          "relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none"
                        )
                      }
                    >
                      {({ checked, active }) => (
                        <>
                          <span className="flex flex-1">
                            <span className="flex flex-col">
                              <RadioGroup.Label
                                as="span"
                                className="block text-sm font-medium text-gray-900"
                              >
                                {deliveryMethod.title}
                              </RadioGroup.Label>
                              <RadioGroup.Description
                                as="span"
                                className="mt-1 flex items-center text-sm text-gray-500"
                              >
                                {deliveryMethod.turnaround}
                              </RadioGroup.Description>
                              <RadioGroup.Description
                                as="span"
                                className="mt-6 text-sm font-medium text-gray-900"
                              >
                                {deliveryMethod.price}
                              </RadioGroup.Description>
                            </span>
                          </span>
                          {checked ? (
                            <CheckCircleIcon
                              className="h-5 w-5 text-slate-600"
                              aria-hidden="true"
                            />
                          ) : null}
                          <span
                            className={classNames(
                              active ? "border" : "border-2",
                              checked
                                ? "border-slate-500"
                                : "border-transparent",
                              "pointer-events-none absolute -inset-px rounded-lg"
                            )}
                            aria-hidden="true"
                          />
                        </>
                      )}
                    </RadioGroup.Option>
                  ))}
                </div>
              </RadioGroup>
            </div>

            {/* Payment */}
            <div className="mt-10 border-t border-gray-200 pt-10">
              <h2 className="text-lg font-medium text-gray-900">Pago</h2>

              <fieldset className="mt-4">
                <legend className="sr-only">Forma de pago</legend>
                <div className="space-y-4 sm:flex sm:items-center sm:space-x-10 sm:space-y-0">
                  {paymentMethods.map((paymentMethod, paymentMethodIdx) => (
                    <div key={paymentMethod.id} className="flex items-center">
                      <input
                        id={paymentMethod.id}
                        name="paymentType"
                        type="radio"
                        required
                        value={paymentMethod.title}
                        // defaultChecked={paymentMethodIdx === 0}
                        className="h-4 w-4 border-gray-300 text-slate-600 focus:ring-slate-500"
                        onChange={(e) => {
                          handleChange(e);
                          setSelectedPaymentMethod(paymentMethod.id);
                        }}
                      />
                      <label
                        htmlFor={paymentMethod.id}
                        className="ml-3 block text-sm font-medium text-gray-700"
                      >
                        {paymentMethod.title}
                      </label>
                    </div>
                  ))}
                </div>
              </fieldset>

              {/* renderiza el content segun paymentMethod */}
              {contentComponentPaymentMethod}
            </div>
          </div>

          {/* Order summary */}
          <div className="mt-10 lg:mt-0">
            <h2 className="text-lg font-medium text-gray-900">
              Datos de la orden
            </h2>

            <div className="mt-4 rounded-lg border border-gray-200 bg-white shadow-sm">
              <h3 className="sr-only">Items en tu carrito</h3>
              <ul role="list" className="divide-y divide-gray-200">
                {cart.map((product) => (
                  <li key={product.slug} className="flex px-4 py-6 sm:px-6">
                    <div className="flex items-center justify-center">
                      <Image
                        src={product.image}
                        alt={product.title}
                        width={100}
                        height={100}
                        className="rounded-md object-cover"
                        style={{ width: "auto", height: "auto" }}
                        priority
                      />
                    </div>

                    <div className="ml-6 flex flex-1 flex-col">
                      <div className="flex">
                        <div className="min-w-0 flex-1">
                          <h4 className="text-sm">
                            <a
                              href={product.href}
                              className="font-medium text-gray-700 hover:text-gray-800"
                            >
                              {product.title}
                            </a>
                          </h4>
                          <p className="mt-1 text-sm text-gray-500">
                            {product.brand}
                          </p>
                          <p className="mt-1 text-sm text-gray-500">
                            {product.category}
                          </p>
                        </div>

                        {/* <div className="ml-4 flow-root flex-shrink-0">
                          <button
                            type="button"
                            className="-m-2.5 flex items-center justify-center bg-white p-2.5 text-gray-400 hover:text-gray-500"
                          >
                            <span className="sr-only">Eliminar</span>
                            <TrashIcon className="h-5 w-5" aria-hidden="true" />
                          </button>
                        </div> */}
                      </div>

                      <div className="flex flex-1 items-end justify-between pt-2">
                        <p className="mt-1 text-sm font-medium text-gray-900">
                          ${product.price}
                        </p>

                        <div className="ml-4">
                          <label htmlFor="quantity" className="sr-only">
                            Cantidad
                          </label>

                          <option defaultValue={product.quantity}>
                            {product.quantity}
                          </option>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <dl className="space-y-6 border-t border-gray-200 px-4 py-6 sm:px-6">
                <div className="flex items-center justify-between">
                  <dt className="text-sm">Subtotal</dt>
                  <dd className="text-sm font-medium text-gray-900">
                    ${totalPrice()}
                  </dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-sm">Costo de envio</dt>
                  {/* colocar el costo del metodo de envio seleccionado */}
                  <dd className="text-sm font-medium text-gray-900">
                    ${deliveryMethodFromId(value.deliveryMethod).price}
                  </dd>
                </div>
                {/* <div className="flex items-center justify-between">
                  <dt className="text-sm">Taxes</dt>
                  <dd className="text-sm font-medium text-gray-900">$5.52</dd>
                </div> */}
                <div className="flex items-center justify-between border-t border-gray-200 pt-6">
                  <dt className="text-base font-medium">Total</dt>
                  {/* colocar el costo total sumando los taxes y el costo del metodo de envio */}
                  <dd className="text-base font-medium text-gray-900">
                    ${" "}
                    {totalPrice() +
                      Number(deliveryMethodFromId(value.deliveryMethod).price)}
                  </dd>
                </div>
              </dl>

              <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                <button
                  type="submit"
                  className="w-full rounded-md border border-transparent bg-slate-800 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                >
                  Confirmar orden
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
