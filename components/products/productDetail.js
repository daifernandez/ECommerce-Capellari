import { mockData } from "@/data/products";
import Image from "next/image";
import QtySelector from "./qtySelector";
import BackButton from "../ui/backbutton";

export default function ProductDetail({ slug }) {
  const item = mockData.find((e) => e.slug === slug);

  return (
    <div className="max-w-4xl m-auto my-20">
      <BackButton className="text-sm mb-6" />
      <section className="flex gap-6 my-20">
        <div className="relative basis-1/2">
          <Image
            src={`/imgs/products/${item.image}`}
            alt={item.title}
            width={860}
            height={860}
            className="object-contain my-8"
          />
        </div>
        <div className="basis-1/2">
          <h2 className="text-2xl font-semibold border-b border-gray-200 pb-4 mb-4">
            {item.title}
          </h2>
          <p className="text-gray-600">{item.rating}</p>
          <p className="text-gray-600 font-medium">{item.brand}</p>
          <p className="text-4xl text-end text-slate-500">{item.price}</p>

          <QtySelector item={item} />
        </div>
      </section>
      <section className="mt-12">
        <h3 className="text-xl font-semibold border-b border-gray-200 pb-4 my-4">
          Descripcion
        </h3>
        {/* Mejorar la descripcion */}
        <p className="text-gray-600">{item.description}</p>
      </section>
    </div>
  );
}
