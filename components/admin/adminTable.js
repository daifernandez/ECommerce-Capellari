"use client";
import Image from "next/image";
import { mockData } from "@/data/products";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import AdminPagination from "./adminPagination";
import SearchAdmin from "./searchAdmin";

export default function AdminTable({ onEdit, onDelete }) {
  const data = mockData;
  return (
    <div className="flex flex-col">
      <SearchAdmin />
      <div className="flex justify-between items-center my-4 mb-8">
        <h2 className="text-2xl font-semibold">Products</h2>
      </div>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Image</th>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Category</th>
            <th className="py-2 px-4 border-b">Price</th>
            <th className="py-2 px-4 border-b">slug</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {mockData.map((appliance, index) => (
            <tr
              key={index}
              className={(index + 1) % 2 === 0 ? "bg-gray-100" : ""}
            >
              {/* ver la imagen */}
              <td className="py-2 px-4 border-b">
                <Image
                  src={`/imgs/products/${appliance.image}`}
                  alt={appliance.title}
                  width={100}
                  height={100}
                  className="object-contain my-8"
                />
              </td>
              <td className="py-2 px-4 border-b">{appliance.title}</td>
              <td className="py-2 px-4 border-b">{appliance.category}</td>
              <td className="py-2 px-4 border-b">{appliance.price}</td>
              <td className="py-2 px-4 border-b">{appliance.slug}</td>
              <td className="py-3 px-6 border-b">
                <div className="flex items-center justify-center space-x-1">
                  <button
                    onClick={() => onEdit(index)}
                    className="bg-slate-500 text-white px-3 py-1  rounded"
                  >
                    <PencilSquareIcon className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => onDelete(index)}
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
