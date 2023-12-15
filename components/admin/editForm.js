"use client";

import { useState } from "react";
// import Boton from "../ui/Boton";
import { db, storage } from "@/firebase/config";
import { doc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import CATEGORIES from "@/data/categories";

const updateProduct = async (slug, values, file) => {
  let fileURL = values.image;

  if (file) {
    const storageRef = ref(storage, values.slug);
    const fileSnapshot = await uploadBytes(storageRef, file);
    fileURL = await getDownloadURL(fileSnapshot.ref);
  }

  const docRef = doc(db, "productos", slug);
  return updateDoc(docRef, {
    title: values.title,
    description: values.description,
    inStock: Number(values.inStock),
    price: Number(values.price),
    type: values.type,
    image: fileURL,
  }).then(() => console.log("Producto actualizado correctamente"));
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

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await updateProduct(item.slug, values, file);
  };

  return (
    <div className="max-w-7xl mx-auto py-10 sm:px-6 lg:px-8">
      <div className="space-y-10 divide-y divide-gray-900/10">
        <div className="grid grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-3">
          <div className="px-4 sm:px-0">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Editar Producto
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Modificar los datos del producto
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
                    <div className="mb-5 flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-slate-600 sm:max-w-md">
                      <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm"></span>
                      <input
                        value={values.title}
                        required
                        type="text"
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                        onChange={(e) => handleChange(e)}
                      />
                    </div>{" "}
                    <div className="sm:col-span-2">
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
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <label>Imagen: </label>
                    <input
                      type="file"
                      onChange={(e) => setFile(e.target.files[0])}
                      className="p-2 rounded w-full border border-blue-100 block my-4"
                    />
                    <div className="sm:col-span-2 sm:col-start-1">
                      <label className="block text-sm font-medium leading-6 text-gray-900">
                        Precio
                      </label>
                      <div className="mt-2 mb-5">
                        <input
                          value={values.price}
                          required
                          type="text"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-slate-600 sm:text-sm sm:leading-6"
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="sm:col-span-2">
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
                          onChange={handleChange}
                        />
                      </div>
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
                    <div className="col-span-full">
                      <label className="block text-sm font-medium leading-6 text-gray-900">
                        Description
                      </label>
                      <div className="mt-2 mb-5">
                        <textarea
                          required
                          rows={3}
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-slate-600 sm:text-sm sm:leading-6"
                          value={values.description}
                          onChange={handleChange}
                        />
                      </div>
                      <p className="mt-3 text-sm leading-6 text-gray-600">
                        Modificar la descripción del producto
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="bg-slate-500 text-white px-3 py-1 rounded"
            >
              Guardar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
