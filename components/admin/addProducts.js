"use client";
import { PhotoIcon } from "@heroicons/react/24/solid";
import ButtonsAdmin from "./buttonsAdmin";
import { useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { db, storage } from "../../firebase/config";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import Image from "next/image";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import toast, { Toaster } from "react-hot-toast";
import CATEGORIES from "@/data/categories";

const createProduct = async (values, file) => {
  const storageRef = ref(storage, values.slug);
  //sube el archivo al storage
  const fileSnapshot = await uploadBytesResumable(storageRef, file);
  //obtiene la url del archivo
  const fileURL = await getDownloadURL(fileSnapshot.ref);

  const docRef = doc(db, "products", values.slug);
  return setDoc(docRef, {
    ...values,
    image: fileURL,
  }).then(() => console.log("producto creado exitosamente"));
  // evaluar condicion de producto ya existente
};

export default function AddProducts() {
  const [value, setValue] = useState({
    title: "",
    description: "",
    image: "",
    category: "",
    price: "",
    brand: "",
    inStock: 0,
    rating: 0,
    slug: "",
  });
  const [file, setFile] = useState(null);
  const [error, setError] = useState({});

  const validations = {
    title: (value) =>
      /\D/.test(value) ? null : "El valor ingresado para title es inválido",

    description: (value) =>
      /\D/.test(value)
        ? null
        : "El valor ingresado para description es inválido",

    brand: (value) =>
      /^\D+$/.test(value) ? null : "El valor ingresado para brand es inválido",

    slug: (value) =>
      /\D/.test(value) ? null : "El valor ingresado para slug es inválido",

    price: (value) =>
      !isNaN(Number(value.replace(",", "."))) &&
      Number(value.replace(",", ".")) >= 0
        ? null
        : "El valor ingresado para price es inválido",

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

    if (errorMessage) {
      setError((prev) => ({ ...prev, [name]: errorMessage }));
    } else {
      setError((prev) => ({ ...prev, [name]: null }));
    }

    setValue((prevValue) => ({ ...prevValue, [name]: value }));
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    const blob = await file.arrayBuffer();
    const fileBlob = new Blob([blob], { type: file.type });
    const imageUrl = URL.createObjectURL(fileBlob);
    setValue({ ...value, image: imageUrl });
    setFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!value.title || !value.description || !value.price) {
      toast.error("Por favor, completa todos los campos necesarios.");
      return;
    }

    const toastId = toast.loading("Creando producto...");

    try {
      await createProduct(value, file);
      toast.success("Producto creado exitosamente", {
        id: toastId,
      });

      setValue({
        title: "",
        description: "",
        image: "",
        category: "",
        price: "",
        brand: "",
        inStock: 0,
        rating: 0,
        slug: "",
      });
    } catch (error) {
      toast.error("Hubo un error al crear el producto", {
        id: toastId,
      });
      console.error("Hubo un error al crear el producto:", error);
    }
  };

  return (
    <div className="space-y-10 divide-y divide-gray-900/10">
      <div className="grid grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-3">
        <div className="px-4 sm:px-0">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Producto
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Definir producto a agregar
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2"
        >
          <div className="px-4 py-6 sm:p-8">
            <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Titulo
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-slate-600 sm:max-w-md">
                    <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm"></span>
                    <input
                      value={value.title}
                      required
                      type="text"
                      name="title"
                      id="title"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="Nombre"
                      onChange={(e) => handleChange(e)}
                    />
                  </div>{" "}
                  {error && error.title && (
                    <span className="flex items-center text-red-500 pl-3 text-sm mt-2">
                      {error.title}
                    </span>
                  )}
                </div>
              </div>

              <div className="sm:col-span-4">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Slug
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-slate-600 sm:max-w-md">
                    <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm"></span>
                    <input
                      value={value.slug}
                      required
                      type="text"
                      name="slug"
                      id="slug"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="Identificador del producto"
                      onChange={handleChange}
                    />
                  </div>
                  {error && error.slug && (
                    <span className="flex items-center text-red-500 pl-3 text-sm mt-2">
                      {error.slug}
                    </span>
                  )}
                </div>
              </div>

              <div className="col-span-full">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Description
                </label>
                <div className="mt-2">
                  <textarea
                    required
                    id="description"
                    name="description"
                    rows={3}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-slate-600 sm:text-sm sm:leading-6"
                    value={value.description}
                    onChange={handleChange}
                  />
                </div>
                <p className="mt-3 text-sm leading-6 text-gray-600">
                  Agregar descripción del producto
                </p>
                {error && error.description && (
                  <span className="flex items-center text-red-500 pl-3 text-sm mt-2">
                    {error.description}
                  </span>
                )}
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="cover-photo"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Agregar Imagen
                </label>
                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                  {value.image ? (
                    <div className="flex flex-col items-center justify-center">
                      <Image
                        src={value.image}
                        alt="Imagen"
                        width={500}
                        height={300}
                        className="rounded-xl"
                      />
                      <p className="mt-3 text-sm leading-6 text-gray-500">
                        {value.image}
                      </p>
                      <div className="flex mt-2">
                        <button
                          onClick={() => setValue({ ...value, image: "" })}
                          className="text-red-500 px-2 py-1 rounded mr-2"
                        >
                          <TrashIcon className="w-5 h-5" />
                        </button>
                        <label
                          htmlFor="image"
                          className="inline-block text-blue-500 px-2 py-1 rounded cursor-pointer"
                        >
                          <PencilSquareIcon className="w-5 h-5" />
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
                  ) : (
                    <div className="text-center">
                      <PhotoIcon
                        className="mx-auto h-12 w-12 text-gray-300"
                        aria-hidden="true"
                      />
                      <div className="mt-4 text-sm leading-6 text-gray-600">
                        <label
                          htmlFor="image"
                          className="relative cursor-pointer rounded-md bg-white font-semibold text-slate-800 focus-within:outline-none focus-within:ring-2 focus-within:ring-slate-600 focus-within:ring-offset-2 hover:text-slate-500"
                        >
                          <span>Subir Imagen</span>
                          <input
                            value={value.image || ""}
                            required
                            id="image"
                            name="image"
                            type="file"
                            className="sr-only"
                            onChange={handleImageChange}
                          />
                        </label>
                        {/* <p className="pl-1">o arrastrar</p> */}
                      </div>
                      <p className="text-xs leading-5 text-gray-600">
                        PNG, JPG, GIF hasta 10MB
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="px-4 py-6 sm:p-8">
            <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Categoria
                </label>
                <div className="mt-2">
                  <select
                    value={value.category || ""}
                    required
                    id="category"
                    name="category"
                    autoComplete="category"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-slate-600 sm:max-w-xs sm:text-sm sm:leading-6"
                    onChange={handleChange}
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

              <div className="sm:col-span-2 sm:col-start-1">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Precio
                </label>
                <div className="mt-2">
                  <input
                    value={value.price}
                    required
                    type="text"
                    name="price"
                    id="price"
                    autoComplete="$"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-slate-600 sm:text-sm sm:leading-6"
                    onChange={handleChange}
                  />
                </div>
                {error && error.price && (
                  <span className="flex items-center text-red-500 pl-3 text-sm mt-2">
                    {error.price}
                  </span>
                )}
              </div>

              <div className="sm:col-span-2">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Marca
                </label>
                <div className="mt-2">
                  <input
                    value={value.brand}
                    required
                    type="text"
                    name="brand"
                    id="brand"
                    autoComplete="brand"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-slate-600 sm:text-sm sm:leading-6"
                    onChange={handleChange}
                  />
                </div>
                {error && error.brand && (
                  <span className="flex items-center text-red-500 pl-3 text-sm mt-2">
                    {error.brand}
                  </span>
                )}
              </div>

              <div className="sm:col-span-2">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Stock
                </label>
                <div className="mt-2">
                  <input
                    value={value.inStock}
                    required
                    type="number"
                    name="inStock"
                    id="inStock"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-slate-600 sm:text-sm sm:leading-6"
                    onChange={handleChange}
                  />
                </div>
                {error && error.inStock && (
                  <span className="flex items-center text-red-500 pl-3 text-sm mt-2">
                    {error.inStock}
                  </span>
                )}
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Rating
                </label>
                <div className="mt-2">
                  <input
                    value={value.rating}
                    required
                    type="number"
                    name="rating"
                    id="rating"
                    min="1"
                    max="5"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-slate-600 sm:text-sm sm:leading-6"
                    onChange={handleChange}
                  />
                </div>
                {error && error.rating && (
                  <span className="flex items-center text-red-500 pl-3 text-sm mt-2">
                    {error.rating}
                  </span>
                )}
              </div>
            </div>
          </div>
          <ButtonsAdmin type="submit" />
        </form>
      </div>
      <Toaster />
    </div>
  );
}
