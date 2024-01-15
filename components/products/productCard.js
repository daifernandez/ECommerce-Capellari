import Link from "next/link";
import Cards from "./cards";

export default function ProductCard({ item }) {
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white ">
      <Link href={`/productos/detail/${item.slug}`} className="flex flex-col">
        <Cards item={item} />
      </Link>
    </article>
  );
}
