import Link from 'next/link';
import { ShoppingBagIcon } from '@heroicons/react/24/outline';

export default function NoProducts({ searchTerm }) {
  return (
    <div className="bg-white px-6 py-16 sm:py-24 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <div className="flex justify-center mb-6">
          <ShoppingBagIcon 
            className="h-24 w-24 text-gray-400 animate-bounce" 
            aria-hidden="true" 
          />
        </div>

        <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          {searchTerm 
            ? `No se encontraron resultados para "${searchTerm}"`
            : "No hay productos disponibles"}
        </h2>
        
        <p className="mt-4 text-lg leading-8 text-gray-600">
          {searchTerm 
            ? "Intenta con otros términos de búsqueda"
            : "Por el momento no encontramos productos en esta categoría."}
        </p>

        <div className="mt-10">
          <Link
            href="/productos"
            className="rounded-md bg-navy-900 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-navy-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy-900 transition-colors duration-200"
          >
            Ver todas las categorías
          </Link>
        </div>
      </div>
    </div>
  );
}
