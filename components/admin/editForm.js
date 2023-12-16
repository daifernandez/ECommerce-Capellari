"use client";
import { useState } from "react";
import { db, storage } from "@/firebase/config";
import { doc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import CATEGORIES from "@/data/categories";
import Image from "next/image";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { toast, Toaster } from "react-hot-toast";

const updateProduct = async (slug, values, file) => {
  let fileURL = values.image;

  if (file) {
    const storageRef = ref(storage, values.slug);
    const fileSnapshot = await uploadBytes(storageRef, file);
    fileURL = await getDownloadURL(fileSnapshot.ref);
  }

  const docRef = doc(db, "products", slug);
  return updateDoc(docRef, {
    title: values.title,
    brand: values.brand,
    description: values.description,
    inStock: Number(values.inStock),
    price: Number(values.price),
    category: values.category,
    image: fileURL,
  }).then(() => {
    toast.success("Producto actualizado");
    console.log("Document successfully updated!");
  });
};

export default function EditForm({ item }) {
  const { title, description, inStock, price, category, image, brand } = item;
  const [values, setValues] = useState({
    title,
    description,
    inStock,
    price,
    image,
    category,
    brand,
  });
  const [file, setFile] = useState(null);
  const [error, setError] = useState({});

  const validations = {
    title: (value) =>
      /^\D+$/.test(value) ? null : "El valor ingresado para title es inválido",

    description: (value) =>
      /\D/.test(value)
        ? null
        : "El valor ingresado para description es inválido",

    brand: (value) =>
      /^\D+$/.test(value) ? null : "El valor ingresado para brand es inválido",

    slug: (value) =>
      /\D/.test(value) ? null : "El valor ingresado para slug es inválido",

    price: (value) => {
      const stringValue = String(value);
      return !isNaN(Number(stringValue.replace(",", "."))) &&
        Number(stringValue.replace(",", ".")) >= 0
        ? null
        : "El valor ingresado para price es inválido";
    },

    inStock: (value) => {
      const inStockValue = parseInt(value);
      return !isNaN(inStockValue) && inStockValue > 0
        ? null
        : "El valor ingresado para inStock es inválido";
    },

    rating: (value) => {
      const ratingValue = parseInt(value);
      return !isNaN(ratingValue) && ratingValue >= 1 && ratingValue <= 5
        ? null
        : "El valor ingresado para rating es inválido";
    },
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const validate = validations[name];
    const errorMessage = validate ? validate(value) : null;

    setError((prev) => {
      if (errorMessage) {
        return { ...prev, [name]: errorMessage };
      } else {
        const { [name]: _, ...rest } = prev; // Elimina la entrada de error correspondiente
        return rest;
      }
    });

    setValues((prevValue) => ({ ...prevValue, [name]: value }));
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    const blob = await file.arrayBuffer();
    const fileBlob = new Blob([blob], { type: file.type });
    const imageUrl = URL.createObjectURL(fileBlob);
    setValues({ ...values, image: imageUrl });
    setFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = Object.keys(values).reduce((acc, key) => {
      const error = validations[key] ? validations[key](values[key]) : null;
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
      await updateProduct(item.slug, values, file);
      toast.success("Producto actualizado"),
        {
          id: toastId,
        };
    } catch (error) {
      toast
        .error("Error al actualizar el producto", {
          id: toastId,
        })
        .console.error("Error updating document: ", error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-10 sm:px-6 lg:px-8">
      <Toaster />
      <div className="space-y-10 divide-y divide-gray-900/10">
        <Link
          href="/admin"
          className="flex justify-center items-center px-4 py-2 text-sm font-medium"
        >
          Volver al menú principal
        </Link>
        <div className="grid grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-3">
          <div className="px-4 sm:px-0">
            <h2 className="text-base font-semibold leading-7 text-gray-900 mt-10">
              Editar Producto
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600 mb-20">
              Modificar los datos del producto
            </p>

            {/* imagen actual del producto */}
            <div className="flex flex-col items-center  h-full">
              <Image
                src={values.image}
                alt={values.title}
                width={500}
                height={500}
                className="rounded"
                name="image"
                id="image"
              />
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2 px-4 py-6 sm:p-8"
          >
            <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Titulo
                </label>
                <div className="mt-2">
                  <div className="mb-5 flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-slate-600 sm:max-w-md">
                    <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm"></span>
                    <input
                      value={values.title}
                      required
                      type="text"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      onChange={(e) => handleChange(e)}
                      name="title"
                      id="title"
                    />
                  </div>
                  {error && error.title && (
                    <span className="flex items-center text-red-500 pl-3 text-sm mt-2">
                      {error.title}
                    </span>
                  )}
                </div>
              </div>

              <div className="sm:col-span-4">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Marca
                </label>
                <div className="mt-2 mb-5">
                  <input
                    value={values.brand}
                    required
                    type="text"
                    name="brand"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-slate-600 sm:text-sm sm:leading-6"
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                {error && error.brand && (
                  <span className="flex items-center text-red-500 pl-3 text-sm mt-2">
                    {error.brand}
                  </span>
                )}
              </div>

              <div className="sm:col-span-4">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Imagen
                </label>
                <div className="mt-2 mb-5">
                  <p className="block w-full rounded-md border-0 py-1.5 text-slate-900 shadow-sm  placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6">
                    {values.image}
                  </p>
                  <label
                    htmlFor="image"
                    className="flex items-center space-x-1 text-blue-500 cursor-pointer justify-end mt-2"
                  >
                    <PencilSquareIcon className="w-5 h-5" />
                    <span>Cambiar</span>
                    <input
                      id="image"
                      name="image"
                      type="file"
                      className="sr-only"
                      onChange={handleImageChange}
                    />
                  </label>
                </div>
              </div>

              <div className="sm:col-span-4">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Precio
                </label>
                <div className="mt-2 mb-5">
                  <input
                    value={values.price}
                    required
                    type="text"
                    name="price"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-slate-600 sm:text-sm sm:leading-6"
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                {error && error.price && (
                  <span className="flex items-center text-red-500 pl-3 text-sm mt-2">
                    {error.price}
                  </span>
                )}
              </div>

              <div className="sm:col-span-4">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Stock
                </label>
                <div className="mt-2 mb-5">
                  <input
                    value={values.inStock}
                    required
                    type="number"
                    name="inStock"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-slate-600 sm:text-sm sm:leading-6"
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                {error && error.inStock && (
                  <span className="flex items-center text-red-500 pl-3 text-sm mt-2">
                    {error.inStock}
                  </span>
                )}
              </div>

              <div className="sm:col-span-4">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Categoria
                </label>
                <div className="mt-2 mb-5">
                  <select
                    value={values.category || ""}
                    required
                    id="category"
                    name="category"
                    autoComplete="category"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-slate-600 sm:max-w-xs sm:text-sm sm:leading-6"
                    onChange={(e) => handleChange(e)}
                  >
                    <option value="" disabled>
                      Seleccione una categoria
                    </option>
                    {CATEGORIES.filter(
                      (category) => category.id != "todos"
                    ).map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="col-span-full">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Description
                </label>
                <div className="mt-2 mb-5">
                  <textarea
                    required
                    rows={3}
                    name="description"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-slate-600 sm:text-sm sm:leading-6"
                    value={values.description}
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                <p className="mt-3 text-sm leading-6 text-gray-600">
                  Modificar la descripción del producto
                </p>
              </div>
              {error && error.description && (
                <span className="flex items-center text-red-500 pl-3 text-sm mt-2">
                  {error.description}
                </span>
              )}
            </div>

            <div className="flex justify-start mb-10 mt-10">
              <button
                type="submit"
                className="flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-slate-500 hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-600"
              >
                Guardar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
