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
  const { deleteItem } = useCartContext();

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
    <div className="flex flex-col">
      <Toaster />
      {/* <SearchAdmin /> */}
      <div className="flex justify-between items-center my-4 mb-8">
        <h2 className="text-2xl font-semibold">Productos</h2>
      </div>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Imagen</th>
            <th className="py-2 px-4 border-b">Titulo</th>
            <th className="py-2 px-4 border-b">Categoria</th>
            <th className="py-2 px-4 border-b">Precio</th>
            <th className="py-2 px-4 border-b">Stock</th>
            <th className="py-2 px-4 border-b">Marca</th>
            <th className="py-2 px-4 border-b">Slug</th>
            <th className="py-2 px-4 border-b"></th>
          </tr>
        </thead>
        <tbody>
          {products &&
            products.map((appliance, index) => (
              <tr
                key={index}
                className={(index + 1) % 2 === 0 ? "bg-gray-100" : ""}
              >
                <td className="py-2 px-4 border-b">
                  <Image
                    src={appliance.image}
                    alt={appliance.title}
                    width={100}
                    height={100}
                    className="object-contain my-8"
                    priority
                  />
                </td>
                <td className="py-2 px-4 border-b">{appliance.title}</td>
                <td className="py-2 px-4 border-b">{appliance.category}</td>
                <td className="py-2 px-4 border-b">${appliance.price}</td>
                <td className="py-2 px-4 border-b">{appliance.inStock}</td>
                <td className="py-2 px-4 border-b">{appliance.brand}</td>
                <td className="py-2 px-4 border-b">{appliance.slug}</td>

                <td className="py-3 px-6 border-b">
                  <div className="flex items-center justify-center space-x-1">
                    <Link href={`/admin/edit/${appliance.slug}`}>
                      {" "}
                      <button className="bg-slate-500 text-white px-3 py-1  rounded">
                        <PencilSquareIcon className="w-5 h-5" />{" "}
                      </button>
                    </Link>

                    <button
                      className="bg-red-500 text-white px-3 py-1  rounded"
                      onClick={() => openModal(appliance.slug)}
                    >
                      <TrashIcon className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>{" "}
      {/* <AdminPagination /> */}
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
