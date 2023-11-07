import { mockData } from "@/data/products";
import ProductCard from "./productCard";
import Pagination from "../ui/pagination";

export default function ProductsList({ categoria }) {
  const items =
    categoria === "Todos"
      ? mockData
      : mockData.filter((item) => item.type === categoria);

  return (
    <div className="mb-20">
      <section className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:gap-x-8 xl:grid-cols-3">
        {items.map((item) => (
          <ProductCard key={item.slug} item={item} />
        ))}{" "}
      </section>
      <Pagination />
    </div>
  );
}
