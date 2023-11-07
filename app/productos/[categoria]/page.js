import CategoriesMenu from "@/components/products/categoriesMenu";
import ProductsList from "@/components/products/productList";
import Search from "@/components/ui/search";

export async function generateMetadata({ params, serchParams }, parent) {
  return {
    title: `Capellari - ${params.categoria}`,
  };
}

export default function Products({ params }) {
  const categoria = params;
  console.log(categoria);

  return (
    <main className="mx-auto max-w-2xl px-4 lg:max-w-7xl lg:px-8">
      <div className="border-b border-gray-200 pb-10 pt-24">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900">
          Marketplace
        </h1>
        <Search />
      </div>
      <h1 className="text-4xl font-bold tracking-tight text-red-900">
        {categoria}
      </h1>
      <div className="flex flex-col-reverse lg:flex-row">
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
