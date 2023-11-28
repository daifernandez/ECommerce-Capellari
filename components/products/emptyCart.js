import Link from "next/link";

export default function EmptyCart() {
  return (
    <div className="flex flex-col items-center justify-center mb-44">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-3xl">
        Tu carrito está vacío
      </h1>
      <div className="mt-4">
        <Link
          href="/"
          className="text-base font-medium text-blue-600
          hover:text-blue-500"
        >
          {" "}
          Buscar productos
        </Link>
      </div>

      <br />

      <p className="mt-4 text-lg text-gray-500">
        Empieza a agregar productos para que aparezcan aquí.
      </p>
    </div>
  );
}
