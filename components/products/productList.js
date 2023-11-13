import { mockData } from "@/data/products";
import ProductCard from "./productCard";
import Pagination from "../ui/pagination";
import NoProducts from "./noProducts";

export default function ProductsList({ categoria }) {
  console.log(categoria);
  const items =
    categoria === "todos"
      ? mockData
      : mockData.filter((item) => item.category === categoria);

  if (items.length === 0) {
    return <NoProducts />;
  } else {
    return (
      <div className="mb-20">
        <section className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:gap-x-8 xl:grid-cols-3">
          {items.map((item) => {
            return <ProductCard key={item.slug} item={item} />;
          })}{" "}
        </section>
        <Pagination />
      </div>
    );
  }
}
