"use client";
import Image from "next/image";
import { useEffect, useState, Fragment } from "react";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import AdminPagination from "./adminPagination";
import SearchAdmin from "./searchAdmin";
import { getProducts } from "../../app/api/admin/productos/route";
import Link from "next/link";
import { doc, deleteDoc, getFirestore } from "firebase/firestore";
import { db } from "../../firebase/config";
import { Dialog, Transition } from "@headlessui/react";
import { toast, Toaster } from "react-hot-toast";
import { ref, deleteObject, getStorage } from "firebase/storage";
import { useCartContext } from "../context/cartContext";

const storage = getStorage();

export default function AdminTable() {
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const productsPerPage = 5;
  const { deleteItem } = useCartContext();

  // Filtrar productos basado en el término de búsqueda
  const filteredProducts = products.filter(product => 
    product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.brand.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calcular productos para la página actual usando los productos filtrados
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  // Reset página cuando cambia la búsqueda
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  useEffect(() => {
    getProducts()
      .then((products) => {
        setProducts(products);
      })
      .catch((err) => console.log(err));
  }, []);

  const openModal = (slug) => {
    setProductToDelete(slug);
    setOpen(true);
  };

  async function deleteProductAndImage(slug) {
    try {
      const imageRef = ref(storage, slug);

      await deleteObject(imageRef);
      console.log("Image successfully deleted!");

      await deleteDoc(doc(db, "products", slug));
      console.log("Document successfully deleted!");

      const newProducts = products.filter((product) => product.slug !== slug);
      setProducts(newProducts);

      // saca el producto eliminado del carrito
      deleteItem(slug);

      toast.success("Producto e imagen eliminados correctamente");
    } catch (e) {
      console.error("Error removing document or image: ", e);
      toast.error("Error eliminando el producto o la imagen");
    }
  }

  return (
    <div className="flex flex-col p-6">
      <Toaster />
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-navy-900">Productos</h2>
        <p className="mt-2 text-sm text-gray-600">
          Gestiona el catálogo de productos. Aquí puedes ver, editar y eliminar los productos existentes.
        </p>
      </div>

      {/* Buscador */}
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Buscar..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 pl-10 pr-4 text-navy-900 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-navy-900"
          />
          <svg
            className="absolute left-3 top-2.5 h-5 w-5 text-navy-900"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      {/* Mensaje cuando no hay resultados */}
      {filteredProducts.length === 0 && (
        <div className="text-center py-8 bg-white rounded-lg shadow-md">
          <p className="text-gray-500">No se encontraron productos que coincidan con la búsqueda</p>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Imagen</th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Titulo</th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Categoria</th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Precio</th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Stock</th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Marca</th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Slug</th>
              <th className="py-3 px-4"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {currentProducts.map((appliance, index) => (
              <tr key={index} className="hover:bg-gray-50 transition-colors duration-200">
                <td className="py-4 px-4">
                  <div className="w-20 h-20 relative">
                    <Image
                      src={appliance.image}
                      alt={appliance.title}
                      fill
                      className="object-contain"
                      sizes="80px"
                      priority
                    />
                  </div>
                </td>
                <td className="py-4 px-4 text-sm text-gray-900">{appliance.title}</td>
                <td className="py-4 px-4 text-sm text-gray-600">{appliance.category}</td>
                <td className="py-4 px-4 text-sm font-medium text-gray-900">${appliance.price}</td>
                <td className="py-4 px-4 text-sm text-gray-600">{appliance.inStock}</td>
                <td className="py-4 px-4 text-sm text-gray-600">{appliance.brand}</td>
                <td className="py-4 px-4 text-sm text-gray-600">{appliance.slug}</td>
                <td className="py-4 px-4">
                  <div className="flex items-center justify-end space-x-2">
                    <Link href={`/admin/edit/${appliance.slug}`}>
                      <button className="bg-gray-100 hover:bg-gray-200 text-gray-600 p-2 rounded-lg transition-colors duration-200">
                        <PencilSquareIcon className="w-5 h-5" />
                      </button>
                    </Link>
                    <button
                      className="bg-red-100 hover:bg-red-200 text-red-600 p-2 rounded-lg transition-colors duration-200"
                      onClick={() => openModal(appliance.slug)}
                    >
                      <TrashIcon className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Controles de paginación */}
      <div className="flex items-center justify-between px-4 py-3 bg-white mt-4 rounded-lg shadow-md">
        <div className="flex items-center text-sm text-navy-900">
          <span>
            Mostrando{' '}
            <span className="font-medium">{indexOfFirstProduct + 1}</span>
            {' '}-{' '}
            <span className="font-medium">
              {Math.min(indexOfLastProduct, products.length)}
            </span>{' '}
            de{' '}
            <span className="font-medium">{products.length}</span>
            {' '}productos
          </span>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={`px-3 py-1 rounded-md ${
              currentPage === 1
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-gray-200 text-navy-900 hover:bg-gray-300'
            }`}
          >
            Anterior
          </button>
          
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-3 py-1 rounded-md ${
                currentPage === page
                  ? 'bg-navy-900 text-white'
                  : 'bg-gray-200 text-navy-900 hover:bg-gray-300'
              }`}
            >
              {page}
            </button>
          ))}
          
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className={`px-3 py-1 rounded-md ${
              currentPage === totalPages
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-gray-200 text-navy-900 hover:bg-gray-300'
            }`}
          >
            Siguiente
          </button>
        </div>
      </div>

      <Transition appear show={open} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={setOpen}
        >
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <Dialog.Overlay className="fixed inset-0 bg-gray-200 bg-opacity-75 transition-opacity" />

            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <Dialog.Title
                      as="h3"
                      className="text-lg leading-6 font-medium text-gray-900"
                    >
                      ¿Estás seguro de que quieres eliminar este producto?
                    </Dialog.Title>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => {
                    deleteProductAndImage(productToDelete);
                    setOpen(false);
                  }}
                >
                  Aceptar
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                  onClick={() => {
                    setOpen(false);
                    setProductToDelete(null);
                  }}
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}
