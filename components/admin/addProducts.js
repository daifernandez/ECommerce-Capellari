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
import validations from "./validations/validations";

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
  const [activeTab, setActiveTab] = useState(0);
  const [progress, setProgress] = useState(0);

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

  const generateSlug = (title) => {
    const slug = title
      .toLowerCase()
      .replace(/[^\w ]+/g, '')
      .replace(/ +/g, '-');
    setValue(prev => ({...prev, slug}));
  };

  const calculateProgress = () => {
    const fields = ['title', 'description', 'image', 'category', 'price', 'brand', 'inStock'];
    const filledFields = fields.filter(field => value[field]).length;
    return Math.round((filledFields / fields.length) * 100);
  };

  const validateImage = (file) => {
    const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
    const maxSize = 10 * 1024 * 1024; // 10MB

    if (!validTypes.includes(file.type)) {
      toast.error('Formato de imagen no válido');
      return false;
    }

    if (file.size > maxSize) {
      toast.error('La imagen excede el tamaño máximo de 10MB');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validar todos los campos requeridos
    const requiredFields = ['title', 'description', 'price', 'category', 'image'];
    const missingFields = requiredFields.filter(field => !value[field]);
    
    if (missingFields.length > 0) {
      toast.error(`Campos requeridos faltantes: ${missingFields.join(', ')}`);
      return;
    }

    const toastId = toast.loading("Creando producto...");
    
    try {
      if (file && !validateImage(file)) {
        toast.dismiss(toastId);
        return;
      }
      
      await createProduct(value, file);
      toast.success("Producto creado exitosamente", { id: toastId });
      resetForm();
    } catch (error) {
      console.error("Error al crear el producto:", error);
      toast.error(error.message || "Error al crear el producto", { id: toastId });
    }
  };

  const resetForm = () => {
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
    setFile(null);
    setError({});
    setActiveTab(0);
  };

  return (
    <div className="space-y-10 divide-y divide-gray-900/10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="grid grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-3">
        <div className="px-4 sm:px-0">
          <h2 className="text-2xl font-bold leading-7 text-navy-900">
            Agregar Nuevo Producto
          </h2>
          <p className="mt-3 text-sm leading-6 text-gray-600">
            Complete todos los campos para agregar un nuevo producto al catálogo.
          </p>
        </div>

        <div className="bg-white shadow-lg ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex" aria-label="Tabs">
              {['Información del producto', 'Vista previa'].map((tab, index) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(index)}
                  className={`${
                    activeTab === index
                      ? 'border-slate-500 text-slate-600'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  } whitespace-nowrap border-b-2 py-4 px-6 text-sm font-medium flex-1 text-center`}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>
          
          <div className="p-6">
            {activeTab === 0 && (
              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-6">Información básica</h3>
                  <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-4">
                      <label className="block text-sm font-medium leading-6 text-gray-900">
                        Titulo
                      </label>
                      <div className="mt-2">
                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-slate-600 sm:max-w-md hover:ring-slate-400 transition-all">
                          <input
                            value={value.title}
                            required
                            type="text"
                            name="title"
                            id="title"
                            className="block flex-1 border-0 bg-transparent py-2 pl-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                            placeholder="Nombre del producto"
                            onChange={(e) => handleChange(e)}
                          />
                        </div>
                        {error && error.title && (
                          <span className="flex items-center text-red-500 text-sm mt-2 bg-red-50 p-2 rounded-md">
                            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
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
                        <div className="flex rounded-md shadow-sm">
                          <input
                            value={value.slug}
                            required
                            type="text"
                            name="slug"
                            id="slug"
                            className="block flex-1 rounded-l-md border-0 py-2 pl-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-slate-600 sm:text-sm sm:leading-6"
                            placeholder="identificador-del-producto"
                            onChange={handleChange}
                          />
                          <button
                            type="button"
                            onClick={() => generateSlug(value.title)}
                            className="relative -ml-px inline-flex items-center gap-x-1.5 rounded-r-md px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                          >
                            Generar
                          </button>
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
                      <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10 hover:border-slate-400 transition-all cursor-pointer">
                        {value.image ? (
                          <div className="flex flex-col items-center justify-center">
                            <div className="relative group">
                              <Image
                                src={value.image}
                                alt="Imagen"
                                width={500}
                                height={300}
                                className="rounded-xl shadow-md transition-all duration-300 group-hover:opacity-75"
                                priority
                              />
                              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <div className="flex gap-3">
                                  <button
                                    onClick={() => setValue({ ...value, image: "" })}
                                    className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
                                  >
                                    <TrashIcon className="w-5 h-5" />
                                  </button>
                                  <label
                                    htmlFor="image"
                                    className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition-colors cursor-pointer"
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

                <div className="border-t border-gray-200 pt-8">
                  <h3 className="text-lg font-medium text-gray-900 mb-6">Detalles del producto</h3>
                  <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
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
                          className="block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-slate-600 hover:ring-slate-400 transition-all sm:max-w-xs sm:text-sm sm:leading-6"
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
                        <div className="relative rounded-md shadow-sm">
                          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <span className="text-gray-500 sm:text-sm">$</span>
                          </div>
                          <input
                            value={value.price}
                            required
                            type="text"
                            name="price"
                            id="price"
                            className="block w-full rounded-md border-0 py-2 pl-7 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-slate-600 hover:ring-slate-400 transition-all sm:text-sm sm:leading-6"
                            onChange={handleChange}
                          />
                        </div>
                        {error && error.price && (
                          <span className="flex items-center text-red-500 text-sm mt-2 bg-red-50 p-2 rounded-md">
                            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                            {error.price}
                          </span>
                        )}
                      </div>
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
                        <div className="relative rounded-md shadow-sm">
                          <input
                            value={value.inStock}
                            required
                            type="number"
                            name="inStock"
                            id="inStock"
                            min="0"
                            className="block w-full rounded-md border-0 py-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-slate-600 hover:ring-slate-400 transition-all sm:text-sm sm:leading-6"
                            onChange={handleChange}
                          />
                        </div>
                        {error && error.inStock && (
                          <span className="flex items-center text-red-500 text-sm mt-2 bg-red-50 p-2 rounded-md">
                            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                            {error.inStock}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium leading-6 text-gray-900">
                        Rating
                      </label>
                      <div className="mt-2">
                        <div className="relative rounded-md shadow-sm">
                          <input
                            value={value.rating}
                            required
                            type="number"
                            name="rating"
                            id="rating"
                            min="1"
                            max="5"
                            step="0.1"
                            className="block w-full rounded-md border-0 py-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-slate-600 hover:ring-slate-400 transition-all sm:text-sm sm:leading-6"
                            onChange={handleChange}
                          />
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                            <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          </div>
                        </div>
                        {error && error.rating && (
                          <span className="flex items-center text-red-500 text-sm mt-2 bg-red-50 p-2 rounded-md">
                            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                            {error.rating}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-end gap-x-6 border-t border-gray-900/10 pt-4">
                  <button
                    type="button"
                    className="text-sm font-semibold leading-6 text-gray-900 hover:text-gray-700 transition-colors"
                    onClick={resetForm}
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    onClick={handleSubmit}
                    className="rounded-md bg-slate-600 px-6 py-2 text-sm font-semibold text-white shadow-sm hover:bg-slate-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-600 transition-colors"
                  >
                    Guardar producto
                  </button>
                </div>
              </div>
            )}

            {activeTab === 1 && (
              <div className="col-span-full bg-gray-50 p-6 rounded-lg">
                <h3 className="text-sm font-medium text-gray-900 mb-4">Vista previa del producto</h3>
                <div className="flex flex-col md:flex-row gap-8">
                  {value.image ? (
                    <div className="md:basis-2/5">
                      <div className="relative group bg-gradient-to-b from-gray-50 to-white rounded-xl p-4 transition-all duration-300 hover:shadow-lg">
                        <Image
                          src={value.image}
                          alt="Vista previa"
                          width={400}
                          height={400}
                          className="object-contain mix-blend-multiply hover:scale-102 transition-transform duration-500"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="md:basis-2/5 bg-gray-100 rounded-xl p-8 flex items-center justify-center">
                      <PhotoIcon className="h-20 w-20 text-gray-300" />
                    </div>
                  )}
                  
                  <div className="md:basis-3/5 space-y-6">
                    <div className="space-y-4">
                      <p className="text-sm font-medium text-navy-900 tracking-wide uppercase">
                        {value.category || 'Categoría'}
                      </p>
                      <h2 className="text-2xl font-light text-navy-900 leading-tight">
                        {value.title || 'Título del producto'}
                      </h2>
                      <div className="flex items-center gap-4">
                        <p className="text-lg text-gray-600 font-medium">
                          {value.brand || 'Marca'}
                        </p>
                        <span className="text-gray-300">|</span>
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              className={`h-5 w-5 ${
                                i < value.rating ? 'text-yellow-400' : 'text-gray-200'
                              }`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-gray-100">
                      <p className="text-3xl font-light text-navy-900">
                        ${value.price ? parseFloat(value.price).toLocaleString() : '0.00'}
                      </p>
                      <p className="text-sm text-gray-500 mt-2">
                        Stock disponible: {value.inStock || 0} unidades
                      </p>
                    </div>

                    <div className="pt-4">
                      <h3 className="text-sm font-medium text-gray-900 mb-2">
                        Descripción
                      </h3>
                      <p className="text-gray-600 leading-relaxed line-clamp-3">
                        {value.description || 'Descripción del producto'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Toaster position="top-center" />
    </div>
  );
}
