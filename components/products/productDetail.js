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
        <BackButton className="text-sm mb-8 text-gray-500 hover:text-navy-900 transition-colors duration-200" />
        
        <section className="flex flex-col lg:flex-row gap-12 mb-16">
          <div className="lg:basis-3/5">
            <div className="relative group bg-gradient-to-b from-gray-50 to-white rounded-2xl p-8 transition-all duration-300 hover:shadow-lg">
              <Image
                priority={true}
                src={item.image}
                alt={`Imagen de ${item.title}`}
                width={860}
                height={860}
                className="object-contain mix-blend-multiply hover:scale-102 transition-transform duration-500"
              />
            </div>
          </div>

          <div className="lg:basis-2/5 space-y-8">
            <div className="space-y-4">
              <p className="text-sm font-medium text-navy-900 tracking-wide uppercase">
                {item.category}
              </p>
              <h2 className="text-3xl font-light text-navy-900 leading-tight">
                {item.title}
              </h2>
              <div className="flex items-center gap-4">
                <p className="text-lg text-gray-600 font-medium">
                  {item.brand}
                </p>
                <span className="text-gray-300">|</span>
                <Stars count={item.rating} />
              </div>
            </div>

            <div className="pt-6 border-t border-gray-100">
              <p className="text-4xl font-light text-navy-900">
                ${item.price.toLocaleString()}
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Envío gratuito en pedidos superiores a $999
              </p>
            </div>

            <div className="pt-6">
              <QtySelector item={item} />
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-12 my-16">
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

        <section className="mt-24">
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
            <ProductsList categoria={item.category} />
          </div>
        </section>
      </div>
    );
  }
}
