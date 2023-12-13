"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import AdminPagination from "./adminPagination";
import SearchAdmin from "./searchAdmin";
import { getProducts } from "../../app/api/admin/productos/route";

export default function AdminTable({ OnDelete, OnEdit }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts()
      .then((products) => {
        setProducts(products);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="flex flex-col">
      <SearchAdmin />
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
                    src={item.image}
                    alt={appliance.title}
                    width={100}
                    height={100}
                    className="object-contain my-8"
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
                    <button
                      onClick={() => OnEdit(index)}
                      className="bg-slate-500 text-white px-3 py-1  rounded"
                    >
                      <PencilSquareIcon className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => OnDelete(index)}
                      className="bg-red-500 text-white px-3 py-1  rounded"
                    >
                      <TrashIcon className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>{" "}
      <AdminPagination />
    </div>
  );
}
