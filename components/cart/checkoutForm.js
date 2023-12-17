"use client";
import { useState } from "react";
import { RadioGroup } from "@headlessui/react";
import { CheckCircleIcon, TrashIcon } from "@heroicons/react/20/solid";
import { useCartContext } from "@/components/context/cartContext";
import Image from "next/image";
import { db } from "@/firebase/config";
import { setDoc, doc, Timestamp } from "firebase/firestore";
import CreditCard from "@/components/cart/creditCard";
import Transfer from "@/components/cart/transfer";
import PaymentMethod from "@/components/cart/paymentMethod";
import { toast, Toaster } from "react-hot-toast";

const deliveryMethods = [
  {
    id: 1,
    title: "Normal",
    turnaround: "4–10 dias hábiles",
    price: "$5.00",
  },
  { id: 2, title: "Express", turnaround: "2–5 dias hábiles", price: "$16.00" },
];
const paymentMethods = [
  { id: "creditCard", title: "Credit card" },

  { id: "transfer", title: "Transferencia bancaria" },
];

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

export default function CheckoutForm({ totalPrice }) {
  const { cart } = useCartContext();
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
    paymentType: "",
    cardNumber: "",
    nameOnCard: "",
    expirationDate: "",
    cvc: "",
  });

  const [selectedDeliveryMethod, setSelectedDeliveryMethod] = useState(
    deliveryMethods[0]
  );
  const [error, setError] = useState({});

  const validations = {
    email: (value) => {
      if (!value.email) {
        return "El correo electrónico es requerido";
      } else if (!/\S+@\S+\.com/.test(value.email)) {
        return "El correo electrónico debe contener '@' y '.com'";
      }
      return null;
    },
    firstName: (value) => {
      if (!value.firstName) {
        return (error.firstName = "El nombre es requerido");
      } else if (!/^[a-zA-Z]*$/.test(value.firstName)) {
        return (error.firstName =
          "Por favor ingrese un nombre válido sin números ni caracteres especiales");
      }
      return null;
    },
    lastName: (value) => {
      if (!value.lastName) {
        return (error.lastName = "El apellido es requerido");
      } else if (!/^[a-zA-Z]*$/.test(value.lastName)) {
        return (error.lastName =
          "Por favor ingrese un apellido válido sin números ni caracteres especiales");
      }
      return null;
    },
    address: (values) => {
      if (!values.address) {
        return (error.address = "La dirección es requerida");
      } else if (!/^[a-zA-Z0-9\s]*$/.test(values.address)) {
        return (error.address =
          "La dirección solo debe contener letras, números y espacios");
      }
      return null;
    },
    apartment: (values) => {
      if (!values.apartment) {
        return (error.apartment = "El número de apartamento es requerido");
      } else if (!/^[a-zA-Z0-9\s]*$/.test(values.apartment)) {
        return (error.apartment =
          "El número de apartamento solo debe contener letras, números y espacios");
      }
      return null;
    },
    city: (value) => {
      if (!value.city) {
        return (error.city = "La ciudad es requerida");
      } else if (!/^[a-zA-Z]*$/.test(value.city)) {
        return (error.city =
          "Por favor ingrese una ciudad válida sin números ni caracteres especiales");
      }
      return null;
    },
    country: (value) => {
      if (!value.country) {
        return (error.country = "El país es requerido");
      } else if (!/^[a-zA-Z]*$/.test(value.country)) {
        return (error.country =
          "Por favor ingrese un país válido sin números ni caracteres especiales");
      }
      return null;
    },
    region: (value) => {
      if (!value.region) {
        return (error.region = "La región es requerida");
      } else if (!/^[a-zA-Z]*$/.test(value.region)) {
        return (error.region =
          "Por favor ingrese una región válida sin números ni caracteres especiales");
      }
      return null;
    },
    postalCode: (value) => {
      if (!value.postalCode) {
        return (error.postalCode = "El código postal es requerido");
      } else if (!/^[0-9]*$/.test(value.postalCode)) {
        return (error.postalCode =
          "Por favor ingrese un código postal válido sin letras ni caracteres especiales");
      }
    },
    phone: (value) => {
      if (!value.phone) {
        return (error.phone = "El número de teléfono es requerido");
      } else if (!/^[0-9]*$/.test(value.phone)) {
        return (error.phone =
          "Por favor ingrese un número de teléfono válido sin letras ni caracteres especiales");
      }
      return null;
    },
    paymentType: (value) => {
      if (!value.paymentType) {
        return (error.paymentType = "El tipo de pago es requerido");
      } else if (!/^[a-zA-Z]*$/.test(value.paymentType)) {
        return (error.paymentType =
          "Por favor ingrese un tipo de pago válido sin números ni caracteres especiales");
      }
      return null;
    },
    cardNumber: (value) => {
      if (!value.cardNumber) {
        return (error.cardNumber = "El número de tarjeta es requerido");
      } else if (!/^[0-9]*$/.test(value.cardNumber)) {
        return (error.cardNumber =
          "Por favor ingrese un número de tarjeta válido sin letras ni caracteres especiales");
      }
    },
    nameOnCard: (value) => {
      if (!value.nameOnCard) {
        return (error.nameOnCard = "El nombre en la tarjeta es requerido");
      } else if (!/^[a-zA-Z]*$/.test(value.nameOnCard)) {
        return (error.nameOnCard =
          "Por favor ingrese un nombre válido sin números ni caracteres especiales");
      }
      return null;
    },
    expirationDate: (value) => {
      if (!value.expirationDate) {
        return (error.expirationDate = "La fecha de expiración es requerida");
      } else if (!/^(0[1-9]|1[0-2])\/([0-9]{2})$/.test(values.expirationDate)) {
        return (error.expirationDate =
          "Por favor ingrese una fecha de expiración válida en formato MM/AA sin letras ni caracteres especiales");
      }
      return null;
    },
    cvc: (value) => {
      if (!value.cvc) {
        return (error.cvc = "El código de seguridad es requerido");
      } else if (!/^[0-9]{3,4}$/.test(values.cvc)) {
        error.cvc =
          "Por favor ingrese un código de seguridad válido de tres o cuatro dígitos numéricos sin espacios ni caracteres especiales";
      }
      return null;
    },
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const validate = validations[name];
    let errorMessage = validate ? validate({ [name]: value }) : null;

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
      const error = validations[key] ? validations[key](value[key]) : null;
      if (error) {
        acc[key] = error;
      }
      return acc;
    }, {});

    if (Object.keys(errors).length > 0) {
      setError(errors);
      toast.error("Por favor, corrija los errores");
      return;
    }

    const toastId = toast.loading("Actualizando producto...");
    try {
      const result = await createOrder(value, cart);
      console.log(result);
      toast.success("Orden creada con éxito"),
        {
          id: toastId,
        };
    } catch (error) {
      toast
        .error("Error procesar la orden", {
          id: toastId,
        })
        .console.error("Error: ", error);
    }
  };

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
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-slate-500 focus:ring-slate-500 sm:text-sm"
                      onChange={handleChange}
                    >
                      {/* opciones */}
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
                value={selectedDeliveryMethod}
                onChange={setSelectedDeliveryMethod}
              >
                <RadioGroup.Label className="text-lg font-medium text-gray-900">
                  Método de envío
                </RadioGroup.Label>

                <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                  {deliveryMethods.map((deliveryMethod) => (
                    <RadioGroup.Option
                      key={deliveryMethod.id}
                      value={deliveryMethod}
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
                        name="payment-type"
                        type="radio"
                        // defaultChecked={paymentMethodIdx === 0}
                        className="h-4 w-4 border-gray-300 text-slate-600 focus:ring-slate-500"
                        onChange={() =>
                          setSelectedPaymentMethod(paymentMethod.id)
                        }
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
                          {product.price}
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
                    ${totalPrice}
                    {console.log(`rendering ${totalPrice}`)}
                  </dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-sm">Costo de envio</dt>
                  <dd className="text-sm font-medium text-gray-900">$5.00</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-sm">Taxes</dt>
                  <dd className="text-sm font-medium text-gray-900">$5.52</dd>
                </div>
                <div className="flex items-center justify-between border-t border-gray-200 pt-6">
                  <dt className="text-base font-medium">Total</dt>
                  <dd className="text-base font-medium text-gray-900">
                    $75.52
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
