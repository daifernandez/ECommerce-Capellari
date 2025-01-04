"use client";

import CategoriesMenu from "@/components/products/categoriesMenu";
import Title from "@/components/ui/title";
import Search from "@/components/ui/search";
import ProductsList from "@/components/products/productList";

export default function ProductosPage({ searchParams }) {
  const searchTerm = searchParams?.search || ''

  return (
    <div className="container mx-auto px-4">
      <Title>Productos</Title>
      <div className="mb-6">
        <Search />
      </div>
      <div className="flex flex-col lg:flex-row gap-6">
        <aside className="lg:w-1/4">
          <CategoriesMenu />
        </aside>
        <section className="lg:w-3/4">
          <ProductsList searchTerm={searchTerm} />
        </section>
      </div>
    </div>
  )
} 
