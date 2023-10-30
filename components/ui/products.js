"use client";

import { useState } from "react";
import Filters from "./filters";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Pagination from "./pagination";
import Search from "./search";

const products = [
  {
    id: 1,
    name: "Nombre del producto",
    marca: "marca del producto",
    href: "#",
    price: "$",
    description:
      "Description of product. Use this note to describe what the product is about.",
    options: "colores, tamaños, etc",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/category-page-02-image-card-01.jpg",
    imageAlt:
      "Eight shirts arranged on table in black, olive, grey, blue, white, red, mustard, and green.",
  },
  {
    id: 2,
    name: "Nombre del producto",
    marca: "marca del producto",
    href: "#",
    price: "$",
    description:
      "Description of product. Use this note to describe what the product is about.",
    options: "colores, tamaños, etc",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/category-page-02-image-card-02.jpg",
    imageAlt: "alt de imagen",
  },
  {
    id: 3,
    name: "Nombre del producto",
    marca: "marca del producto",
    href: "#",
    price: "$",
    description:
      "Description of product. Use this note to describe what the product is about.",
    options: "colores, tamaños, etc",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/category-page-02-image-card-03.jpg",
    imageAlt: "alt de imagen",
  },
  {
    id: 4,
    name: "Nombre del producto",
    marca: "marca del producto",
    href: "#",
    price: "$",
    description:
      "Description of product. Use this note to describe what the product is about.",
    options: "colores, tamaños, etc",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/category-page-02-image-card-04.jpg",
    imageAlt: "alt de imagen",
  },
  {
    id: 5,
    name: "Nombre del producto",
    marca: "marca del producto",
    href: "#",
    price: "$",
    description:
      "Description of product. Use this note to describe what the product is about.",
    options: "colores, tamaños, etc",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/category-page-02-image-card-05.jpg",
    imageAlt: "alt de imagen",
  },
  {
    id: 6,
    name: "Nombre del producto",
    marca: "marca del producto",
    href: "#",
    price: "$",
    description:
      "Description of product. Use this note to describe what the product is about.",

    options: "colores, tamaños, etc",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/category-page-02-image-card-06.jpg",
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Products() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <main className="mx-auto max-w-2xl px-4 lg:max-w-7xl lg:px-8">
      <div className="border-b border-gray-200 pb-10 pt-24">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900">
          Marketplace
        </h1>
        <Search />
      </div>

      <div className="pb-24 pt-12 lg:grid lg:grid-cols-3 lg:gap-x-8 xl:grid-cols-4">
        <Filters />

        <section
          aria-labelledby="product-heading"
          className="mt-6 lg:col-span-2 lg:mt-0 xl:col-span-3"
        >
          <h2 id="product-heading" className="sr-only">
            Productos
          </h2>

          <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:gap-x-8 xl:grid-cols-3">
            {products.map((product) => (
              <div
                key={product.id}
                className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white"
              >
                <div className="aspect-h-4 aspect-w-3 bg-gray-200 sm:aspect-none group-hover:opacity-75 sm:h-96">
                  {/* <img
                  src={product.imageSrc}
                  alt={product.imageAlt}
                  className="h-full w-full object-cover object-center sm:h-full sm:w-full"
                /> */}
                </div>
                <div className="flex flex-1 flex-col space-y-2 p-4">
                  <h3 className="text-sm font-medium text-gray-900">
                    <a href={product.href}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.name}
                    </a>
                  </h3>
                  <h4 className="text-sm font-medium text-gray-600">
                    {" "}
                    <a href={product.href}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.marca}
                    </a>
                  </h4>
                  <p className="text-sm text-gray-500">{product.description}</p>
                  <div className="flex flex-1 flex-col justify-end">
                    <p className="text-sm italic text-gray-500">
                      {product.options}
                    </p>
                    <p className="text-base font-medium text-gray-900">
                      {product.price}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <Pagination />
        </section>
      </div>
    </main>
  );
}
