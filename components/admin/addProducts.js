"use client";
import { PhotoIcon } from "@heroicons/react/24/solid";
import ButtonsAdmin from "./buttonsAdmin";
import { useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { db, storage } from "../../firebase/config";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import Image from "next/image";
import { redirect } from "next/dist/server/api-utils";

const createProduct = async (values, file) => {
  const storageRef = ref(storage, values.slug);
  //sube el archivo al storage
  const fileSnapshot = await uploadBytesResumable(storageRef, file);
  //obtiene la url del archivo
  const filerURL = await getDownloadURL(fileSnapshot.ref);

  const docRef = doc(db, "products", values.slug);
  return setDoc(docRef, {
    ...values,
    image: filerURL,
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
    slug: "",
  });

  const handleChange = (e) => {
    if (e.target.type === "file") {
      if (e.target.files[0]) {
        const file = e.target.files[0];
        const imageUrl = URL.createObjectURL(file);
        setValue({ ...value, image: imageUrl });
      }
    } else {
      setValue({ ...value, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(value);
    await createProduct(value);
    alert("Producto creado exitosamente");
    redirect("/admin");
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
                      value={value.title || ""}
                      required
                      type="text"
                      name="title"
                      id="title"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="Nombre"
                      onChange={handleChange}
                    />
                  </div>
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
                    defaultValue={value.description}
                    onChange={handleChange}
                  />
                </div>
                <p className="mt-3 text-sm leading-6 text-gray-600">
                  Agregar descripción del producto
                </p>
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
                        alt="imagen"
                        width={200}
                        height={200}
                        className="rounded-xl"
                      />
                      <p className="mt-3 text-sm leading-6 text-gray-600">
                        {value.image}
                      </p>
                      <div className="flex mt-2">
                        <button
                          onClick={() => setValue({ ...value, image: "" })}
                          className="bg-red-500 text-white px-2 py-1 rounded mr-2"
                        >
                          Eliminar
                        </button>
                        <label
                          htmlFor="image"
                          className="inline-block bg-blue-500 text-white px-2 py-1 rounded cursor-pointer"
                        >
                          Modificar
                          <input
                            id="image"
                            name="image"
                            type="file"
                            className="sr-only"
                            onChange={handleChange}
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
                      <div className="mt-4 flex text-sm leading-6 text-gray-600">
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
                            onChange={handleChange}
                          />
                        </label>
                        <p className="pl-1">o arrastrar</p>
                      </div>
                      <p className="text-xs leading-5 text-gray-600">
                        PNG, JPG, GIF up to 10MB
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
                <label
                  htmlFor="country"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Categoria
                </label>
                <div className="mt-2">
                  <select
                    value={value.category}
                    required
                    id="category"
                    name="category"
                    autoComplete="category"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-slate-600 sm:max-w-xs sm:text-sm sm:leading-6"
                    onChange={handleChange}
                  >
                    {/* estas opciones de categorias las deberia sacar de otro lado */}
                    {/* la primera opciion debe ser - */}
                    <option>Refrigeracion</option>
                    <option>Climatizacion</option>
                    <option>Cocinas</option>
                    <option>Smart-TV</option>
                    <option>Lavarropas</option>
                    <option>Aspiradoras</option>
                    <option>Hornos</option>
                    <option>Microondas</option>
                  </select>
                </div>
              </div>

              <div className="sm:col-span-2 sm:col-start-1">
                <label
                  htmlFor="city"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
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
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="region"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
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
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="postal-code"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
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
              </div>
            </div>
          </div>
          <ButtonsAdmin type="submit" />
        </form>
      </div>
    </div>
  );
}
