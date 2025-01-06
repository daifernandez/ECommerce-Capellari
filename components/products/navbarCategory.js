import { HomeIcon, ChevronRightIcon, ShoppingBagIcon } from "@heroicons/react/24/outline";
import Link from 'next/link';

export default function NavbarCategory({ categoria }) {
  return (
    <nav
      className="sticky top-0 z-10 flex border-b border-gray-200 bg-white/90 backdrop-blur-sm mb-10 shadow-sm transition-all duration-300 hover:shadow-md"
      aria-label="Breadcrumb"
    >
      <ol
        role="list"
        className="mx-auto flex w-full max-w-screen-xl items-center space-x-4 px-4 sm:px-6 lg:px-8 py-3"
      >
        <li className="flex">
          <Link 
            href="/" 
            className="flex items-center group"
          >
            <div className="text-gray-600 group-hover:text-navy-600 transition-colors duration-200">
              <HomeIcon
                className="h-5 w-5 flex-shrink-0"
                aria-hidden="true"
              />
              <span className="sr-only">Inicio</span>
            </div>
            <span className="hidden md:block ml-2 text-sm font-medium text-gray-600 group-hover:text-navy-600 transition-colors duration-200">
              Inicio
            </span>
          </Link>
        </li>

        <li className="flex">
          <Link 
            href="/" 
            className="flex items-center group"
          >
            <div className="flex items-center">
              <ChevronRightIcon 
                className="h-5 w-5 flex-shrink-0 text-gray-400"
                aria-hidden="true"
              />
              <div className="flex items-center ml-4 text-gray-600 group-hover:text-navy-600 transition-colors duration-200">
                <ShoppingBagIcon className="h-5 w-5 flex-shrink-0 mr-2" />
                <span className="text-sm font-medium">Productos</span>
              </div>
            </div>
          </Link>
        </li>

        <li key={categoria} className="flex overflow-hidden">
          <div className="flex items-center">
            <ChevronRightIcon 
              className="h-5 w-5 flex-shrink-0 text-gray-400"
              aria-hidden="true"
            />
            <Link
              href={`/productos/${categoria}`}
              className="group ml-4 text-sm font-medium text-gray-600 hover:text-navy-600 transition-colors duration-200 capitalize max-w-[200px] sm:max-w-xs"
            >
              <span className="block truncate group-hover:underline">
                {categoria}
              </span>
            </Link>
          </div>
        </li>
      </ol>
    </nav>
  );
}
