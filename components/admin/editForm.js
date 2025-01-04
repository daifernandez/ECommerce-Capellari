"use client";
import { useState, useEffect } from "react";
import { db, storage } from "@/firebase/config";
import { doc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import CATEGORIES from "@/data/categories";
import Image from "next/image";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { toast, Toaster } from "react-hot-toast";
import validations from "./validations/validations";

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);

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
    if (file) {
      const blob = await file.arrayBuffer();
      const fileBlob = new Blob([blob], { type: file.type });
      const imageUrl = URL.createObjectURL(fileBlob);
      setPreviewUrl(imageUrl);
      setValues({ ...values, image: file.name });
      setFile(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

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

    try {
      await updateProduct(item.slug, values, file);
      toast.success("Producto actualizado");
    } catch (error) {
      toast.error("Error al actualizar el producto");
      console.error("Error updating document: ", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (JSON.stringify(values) !== JSON.stringify(item)) {
        e.preventDefault();
        e.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [values, item]);

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <Toaster position="top-center" />
      
      <nav className="flex mb-8" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-3">
          <li className="inline-flex items-center">
            <Link href="/admin" className="text-gray-700 hover:text-navy-900">
              Admin
            </Link>
          </li>
          <li>
            <div className="flex items-center">
              <span className="mx-2 text-gray-400">/</span>
              <span className="text-gray-500">Editar producto</span>
            </div>
          </li>
        </ol>
      </nav>

      <div className="space-y-12">
        <div className="grid grid-cols-1 gap-x-12 gap-y-8 md:grid-cols-3">
          <div className="px-4 sm:px-0">
            <div className="sticky top-8">
              <h2 className="text-2xl font-bold text-gray-900">
                Editar Producto
              </h2>
              <p className="mt-2 text-sm text-gray-600 mb-8">
                Modificar los datos del producto
              </p>

              <div className="relative group rounded-xl overflow-hidden bg-gray-100">
                <Image
                  src={previewUrl || values.image}
                  alt={values.title}
                  width={500}
                  height={500}
                  className="rounded-xl shadow-md transition-all duration-300 group-hover:scale-105 object-cover"
                  priority
                />
                {previewUrl && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50 transition-opacity opacity-0 group-hover:opacity-100">
                    <button
                      type="button"
                      onClick={() => {
                        setPreviewUrl(null);
                        setFile(null);
                        setValues(prev => ({ ...prev, image: item.image }));
                      }}
                      className="text-white bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-sm font-medium"
                    >
                      Cancelar cambio
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="bg-white shadow-xl ring-1 ring-gray-900/5 rounded-xl md:col-span-2 p-8"
          >
            <div className="space-y-10">
              <div className="border-b border-gray-900/10 pb-10">
                <h3 className="text-lg font-medium text-gray-900 mb-8">
                  Información básica
                </h3>
                <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Título
                    </label>
                    <input
                      value={values.title}
                      required
                      type="text"
                      name="title"
                      className="block w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-navy-900 focus:border-transparent transition-colors"
                      onChange={handleChange}
                    />
                    {error.title && (
                      <p className="mt-2 text-sm text-red-600">{error.title}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Marca
                    </label>
                    <input
                      value={values.brand}
                      required
                      type="text"
                      name="brand"
                      className="block w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-navy-900 focus:border-transparent transition-colors"
                      onChange={handleChange}
                    />
                    {error.brand && (
                      <p className="mt-2 text-sm text-red-600">{error.brand}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Categoría
                    </label>
                    <select
                      value={values.category || ""}
                      required
                      name="category"
                      className="block w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-navy-900 focus:border-transparent transition-colors"
                      onChange={handleChange}
                    >
                      <option value="" disabled>
                        Seleccione una categoría
                      </option>
                      {CATEGORIES.filter((category) => category.id != "todos").map(
                        (category) => (
                          <option key={category.id} value={category.id}>
                            {category.label}
                          </option>
                        )
                      )}
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Imagen
                    </label>
                    <div className="flex items-center gap-4">
                      <p className="flex-1 truncate text-sm text-gray-500">
                        {values.image}
                      </p>
                      <label
                        htmlFor="image"
                        className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-navy-900 hover:text-navy-700 cursor-pointer transition-colors rounded-md hover:bg-gray-50"
                      >
                        <PencilSquareIcon className="w-5 h-5" />
                        <span>Cambiar imagen</span>
                        <input
                          id="image"
                          name="image"
                          type="file"
                          accept="image/*"
                          className="sr-only"
                          onChange={handleImageChange}
                        />
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-b border-gray-900/10 pb-10">
                <h3 className="text-lg font-medium text-gray-900 mb-8">
                  Precios y disponibilidad
                </h3>
                <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Precio
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-gray-500 sm:text-sm">$</span>
                      </div>
                      <input
                        value={values.price}
                        required
                        type="text"
                        name="price"
                        className="block w-full pl-7 rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-navy-900 focus:border-transparent transition-colors"
                        onChange={handleChange}
                      />
                    </div>
                    {error.price && (
                      <p className="mt-2 text-sm text-red-600">{error.price}</p>
                    )}
                  </div>

                  <div className="group relative">
                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                      Stock disponible
                      <span className="text-gray-400 hover:text-gray-600 cursor-help">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </span>
                    </label>
                    <div className="absolute bottom-full mb-2 hidden group-hover:block bg-gray-900 text-white text-xs rounded py-1 px-2">
                      Cantidad disponible para la venta
                    </div>
                    <input
                      value={values.inStock}
                      required
                      type="number"
                      name="inStock"
                      min="0"
                      className="block w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-navy-900 focus:border-transparent transition-colors"
                      onChange={handleChange}
                    />
                    {error.inStock && (
                      <p className="mt-2 text-sm text-red-600">{error.inStock}</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="pb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Descripción
                </label>
                <textarea
                  required
                  rows={4}
                  name="description"
                  value={values.description}
                  onChange={handleChange}
                  className="block w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-navy-900 focus:border-transparent transition-colors resize-none"
                />
                {error.description && (
                  <p className="mt-2 text-sm text-red-600">{error.description}</p>
                )}
                <p className="mt-3 text-sm text-gray-500">
                  Describe el producto con detalle
                </p>
              </div>

              <div className="flex items-center justify-end gap-4 pt-6 border-t border-gray-900/10">
                <Link
                  href="/admin"
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 hover:text-navy-900 transition-colors"
                >
                  Cancelar
                </Link>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`inline-flex items-center px-6 py-2.5 border border-transparent text-sm font-semibold rounded-lg shadow-sm text-white 
                    ${isSubmitting ? 'bg-navy-700 cursor-not-allowed' : 'bg-navy-900 hover:bg-navy-800 hover:-translate-y-0.5'} 
                    transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-navy-900 transform`}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Guardando...
                    </>
                  ) : (
                    'Guardar cambios'
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
