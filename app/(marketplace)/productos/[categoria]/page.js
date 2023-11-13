import CategoriesMenu from "@/components/products/categoriesMenu";
import NavbarCategory from "@/components/products/navbarCategory";
import ProductsList from "@/components/products/productList";
import Search from "@/components/ui/search";

export async function generateMetadata({ params, serchParams }, parent) {
  return {
    title: `Capellari - ${params.categoria}`,
  };
}

export default function Products({ params }) {
  const categoria = params ? params.categoria : "todos";

  return (
    <main className="mx-auto max-w-2xl px-4 lg:max-w-7xl lg:px-8">
      <div className="border-b border-gray-200 pb-10 pt-24">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900">
          Marketplace
        </h1>
        <Search />
      </div>
      <NavbarCategory categoria={categoria} />
      <div className="flex flex-col lg:flex-row">
        <div className="lg:w-1/4">
          <CategoriesMenu />
        </div>
        <div className="lg:w-3/4">
          <ProductsList categoria={categoria} />
        </div>
      </div>
    </main>
  );
}
