import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";

export default function SearchAdmin() {
  return (
    <form className="relative flex flex-1 mb-8" action="#" method="GET">
      <label htmlFor="search-field" className="sr-only">
        Buscar
      </label>
      <MagnifyingGlassIcon
        className="pointer-events-none absolute inset-y-0 left-3 h-full w-5 text-gray-400"
        aria-hidden="true"
      />
      <input
        id="search-field"
        className="block h-12 w-full rounded-lg border border-gray-200 bg-white py-2 pl-11 pr-4 
        text-gray-900 placeholder:text-gray-500 focus:border-navy-900 focus:outline-none 
        focus:ring-2 focus:ring-navy-500/20 sm:text-sm transition-colors"
        placeholder="Buscar productos..."
        type="search"
        name="search"
      />
    </form>
  );
}
