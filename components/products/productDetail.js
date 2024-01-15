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
      <div className="max-w-4xl m-auto my-20">
        <BackButton className="text-sm mb-6" />
        <section className="flex gap-6 my-20">
          <div className="relative basis-1/2">
            <Image
              priority={true}
              src={item.image}
              alt={"imagen del producto"}
              width={860}
              height={860}
              className="object-contain my-8"
            />
          </div>
          <div
            className="basis-1/2"
            style={{
              padding: "20px",
              backgroundColor: "#f8f9fa",
              borderRadius: "10px",
            }}
          >
            <h2
              className="text-2xl font-semibold border-b border-gray-200 pb-4 mb-4"
              style={{ color: "#343a40" }}
            >
              {item.title}
            </h2>
            <Stars count={item.rating} />
            <p
              className="text-gray-600 font-medium"
              style={{ fontSize: "18px" }}
            >
              {item.brand}
            </p>
            <p
              className="text-4xl text-end text-slate-500 mt-4"
              style={{ fontWeight: "bold" }}
            >
              ${item.price}
            </p>

            <QtySelector item={item} />
          </div>
        </section>
        <section className="mt-12">
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h2 className="text-lg leading-6 font-medium text-gray-900">
                Detalles del producto
              </h2>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Información detallada sobre el producto.
              </p>
            </div>
            <div className="border-t border-gray-200">
              <dl>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Descripción
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {item.description}
                  </dd>
                </div>
                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Categoría
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {item.category}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </section>
        {/* mostrar productos relacionados con la misma categoria */}
        <section className="mt-12">
          <div className="px-4 py-5 sm:px-6">
            <h2 className="text-lg leading-6 font-medium text-gray-900 ">
              Productos relacionados
            </h2>
            <p className="mt-1 max-w-2xl text-sm text-gray-500 mb-12">
              {item.category}
            </p>
            <ProductsList categoria={item.category} />
          </div>
        </section>
      </div>
    );
  }
}
