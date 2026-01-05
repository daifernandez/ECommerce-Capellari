import Image from "next/image";
import QtySelector from "./qtySelector";
import BackButton from "../ui/backbutton";
import Stars from "../ui/stars";
import ProductsList from "./productList";

export default async function ProductDetail({ slug }) {
  const item = await fetch(
    `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/product/${slug}`,
    {
      next: {
        revalidate: 300,
      },
    }
  ).then((res) => res.json());

  if (!item) {
    return <div>Producto no encontrado</div>;
  } else {
    return (
      <div className="max-w-7xl m-auto px-4 sm:px-6 lg:px-8 my-16">
        <BackButton className="text-sm mb-16 text-gray-500 hover:text-navy-900 transition-colors duration-200" />
        
        <section className="flex flex-col lg:flex-row gap-12 mb-20">
          <div className="lg:basis-1/2 xl:basis-3/5">
            <div className="relative group bg-white rounded-2xl border border-gray-100 p-8 transition-all duration-300 aspect-square flex items-center justify-center">
              <Image
                priority={true}
                src={item.image}
                alt={`Imagen de ${item.title}`}
                width={500}
                height={500}
                className="object-contain mix-blend-multiply transition-transform duration-500 max-h-[75%]"
              />
            </div>
          </div>

          <div className="lg:basis-1/2 xl:basis-2/5 flex flex-col justify-start pt-4">
            <div className="space-y-4">
              <p className="text-[10px] font-bold text-blue-600 tracking-[0.2em] uppercase">
                {item.category}
              </p>
              <h1 className="text-2xl font-medium text-navy-900 leading-tight">
                {item.title}
              </h1>
              <div className="flex items-center gap-3">
                <p className="text-sm text-gray-400 font-medium">
                  {item.brand}
                </p>
                <div className="h-3 w-px bg-gray-200" />
                <Stars count={item.rating} />
                <span className="text-xs text-gray-400">(5.0)</span>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-gray-100">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-semibold text-navy-900">
                  ${item.price.toLocaleString()}
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-2 flex items-center gap-2">
                Envío gratuito a todo el país
              </p>
            </div>

            <div className="mt-8">
              <QtySelector item={item} />
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-12 mt-32 mb-32">
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h3 className="text-lg font-medium text-navy-900 mb-4">
                Descripción
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {item.description}
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-8 pt-8 border-t border-gray-100">
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-2">
                  Categoría
                </h4>
                <p className="text-navy-900">{item.category}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-2">
                  Marca
                </h4>
                <p className="text-navy-900">{item.brand}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-32">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-2xl font-light text-navy-900">
                Productos relacionados
              </h2>
              <p className="text-gray-500 mt-2">
                Más productos en {item.category}
              </p>
            </div>
          </div>
          <div className="relative">
            <ProductsList categoria={item.category} showPagination={false} />
          </div>
        </section>
      </div>
    );
  }
}
