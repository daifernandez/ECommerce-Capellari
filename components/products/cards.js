import Image from "next/image";
import Stars from "../ui/stars";

export default function Cards({ item }) {
  return (
    <>
      <div className="aspect-h-2 aspect-w-3 bg-white-200 sm:aspect-none group-hover:opacity-75 sm:h-96">
        <Image
          alt={item.title}
          src={item.image}
          width={288}
          height={288}
          style={{ objectFit: "contain", width: "100%", height: "100%" }}
          className="object-cover object-center sm:h-full sm:w-full"
        />
      </div>
      <div className="flex flex-1 flex-col space-y-4 p-6">
        <h3 className="text-sm font-medium text-gray-900">
          <span aria-hidden="true" className="absolute inset-0" />
          {item.title}
        </h3>
        <h4 className="text-sm font-medium text-gray-600">
          {item.brand}
          <span className="absolute inset-0" />
        </h4>
        <div className="px-4 border-t border-gray-200 bg-white sm:p-6 justify-start">
          <Stars count={item.rating} />
          <div className="flex flex-1 flex-col justify-end">
            <p className="text-sm text-gray-400 font-medium text-right">
              {item.category}
            </p>
            <p className="text-base text-gray-900 font-bold text-right">
              $ {item.price}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
