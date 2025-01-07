import CategoriesMenu from "@/components/products/categoriesMenu";
import NavbarCategory from "@/components/products/navbarCategory";
import ProductsList from "@/components/products/productList";
import StreamingList from "@/components/ui/streamingList";
import { Suspense } from "react";

export async function generateMetadata({ params, searchParams }) {
  const p = await params
  const categoria = p?.categoria
  const categoryName = categoria?.charAt(0).toUpperCase() + categoria?.slice(1);
  return {
    title: `Capellari - ${categoryName}`,
    description: `Explora nuestra selección de productos en la categoría ${categoryName}`,
  };
}

export const revalidate = 3600;

export default async function Products({ params }) {
  const p = await params
  const categoria = p?.categoria;
  const categoriaFinal = categoria || "todos";

  return (
    <main className="min-h-screen mx-auto max-w-2xl px-4 lg:max-w-7xl lg:px-8">
      <div className="border-b border-gray-200 pb-8 pt-24">
        <h1 className="text-4xl font-semibold tracking-tight mb-3">
          <span className="bg-gradient-to-r from-blue-900 to-navy-900 bg-clip-text text-transparent">
            Marketplace
          </span>
        </h1>
        <p className="text-base text-gray-600">
          Encuentra los mejores productos en nuestra tienda
        </p>
      </div>
      
      <NavbarCategory categoria={categoriaFinal} />
      
      <div className="flex flex-col lg:flex-row gap-6 py-6">
        <aside className="lg:w-1/4">
          <CategoriesMenu />
        </aside>
        
        <section className="lg:w-3/4">
          <Suspense fallback={<StreamingList />}>
            <ProductsList categoria={categoriaFinal} />
          </Suspense>
        </section>
      </div>
    </main>
  );
}
