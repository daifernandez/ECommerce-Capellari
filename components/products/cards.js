import Image from "next/image";
import Stars from "../ui/stars";

export default function Cards({ item }) {
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md">
      <div className="relative aspect-square overflow-hidden bg-gray-50">
        <Image
          alt={item.title}
          src={item.image}
          width={288}
          height={288}
          style={{ objectFit: "contain" }}
          className="h-full w-full transition-transform duration-300 group-hover:scale-105"
          priority
        />
      </div>

      <div className="flex flex-1 flex-col p-4">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-xs font-medium text-gray-600">{item.brand}</span>
          <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs text-gray-600">
            {item.category}
          </span>
        </div>

        <h3 className="mb-3 text-sm font-medium text-gray-900 line-clamp-2">
          {item.title}
        </h3>

        <div className="mt-auto flex items-center justify-between">
          <Stars count={item.rating} />
          <p className="text-lg font-bold text-gray-900">
            ${isNaN(item.price) ? '0.00' : Number(item.price).toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
}
