import Image from "next/image";
import Link from "next/link";

export default function ProductCard({ item }) {
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white ">
      <Link href={`/productos/detail/${item.slug}`} className="flex flex-col">
        <div className="aspect-h-2 aspect-w-3 bg-white-200 sm:aspect-none group-hover:opacity-75 sm:h-96">
          <Image
            alt={item.title}
            src={`/imgs/products/${item.image}`}
            width={288}
            height={288}
            style={{ objectFit: "contain", width: "100%", height: "100%" }}
            className="object-cover object-center sm:h-full sm:w-full"
          />
        </div>
        <div className="flex flex-1 flex-col space-y-2 p-4">
          <h3 className="text-sm font-medium text-gray-900">
            <span aria-hidden="true" className="absolute inset-0" />
            {item.title}
          </h3>
          <h4 className="text-sm font-medium text-gray-600">
            {item.brand}
            <span aria-hidden="true" className="absolute inset-0" />
          </h4>
          <div className="px-4 border-t border-gray-200 bg-white sm:p-6">
            <p className="text-sm text-gray-500">{item.rating}</p>
            <div className="flex flex-1 flex-col justify-end">
              <p className="text-sm italic text-gray-500">{item.category}</p>
              <p className="text-base text-gray-900 font-bold text-right">
                $ {item.price}
              </p>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}
