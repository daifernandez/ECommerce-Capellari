import Link from "next/link";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";

export default function EmptyCart() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
      <div className="animate-bounce mb-8">
        <ShoppingCartIcon className="h-24 w-24 text-gray-400" />
      </div>
      
      <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-4">
        Tu carrito está vacío
      </h1>

      <p className="text-lg text-gray-500 mb-8 text-center max-w-md">
        Empieza a agregar productos para que aparezcan aquí.
      </p>

      <Link
        href="/"
        className="inline-flex items-center px-6 py-3 text-sm font-semibold
        bg-navy-900 text-white rounded-md hover:bg-navy-800 
        transition-colors duration-200 shadow-sm hover:shadow-md"
      >
        <span>Explorar productos</span>
        <svg
          className="ml-2 h-5 w-5 inline-block"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 8l4 4m0 0l-4 4m4-4H3"
          />
        </svg>
      </Link>
    </div>
  );
}
