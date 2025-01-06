"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import CATEGORIES from "@/data/categories";

export default function CategoriesMenu() {
  const pathName = usePathname();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  // Filtrar categorías basado en el término de búsqueda
  const filteredCategories = CATEGORIES.filter((category) =>
    category.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <aside className="flex flex-col gap-3 mt-8 mb-8 lg:pr-8 lg:border-r lg:border-navy-100">
      {/* Título del menú */}
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Categorías</h2>

      {/* Buscador */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Buscar categoría..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 rounded-lg border border-navy-200 focus:outline-none focus:ring-2 focus:ring-navy-500"
        />
      </div>

      {/* Botón del menú móvil mejorado */}
      <div className="lg:hidden">
        <button
          onClick={toggleMobileMenu}
          className="w-full flex items-center justify-between px-4 py-2 bg-white rounded-lg shadow-sm border border-navy-200 hover:bg-navy-50"
        >
          <span className="text-navy-900">Categorías</span>
          <svg
            className={`h-5 w-5 transition-transform duration-200 ${
              isMobileMenuOpen ? 'rotate-180' : ''
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
      </div>

      {/* Menú de categorías mejorado */}
      <div
        className={`${
          isMobileMenuOpen ? 'block' : 'hidden'
        } lg:block transition-all duration-200 ease-in-out`}
      >
        <div className="flex flex-col gap-2">
          {filteredCategories.map((link) => (
            <Link
              key={link.label}
              href={`/productos/${link.id}`}
              className={`
                px-4 py-2 rounded-lg transition-all duration-200
                ${
                  pathName === `/productos/${link.id}`
                    ? 'bg-navy-900 text-white font-medium'
                    : 'text-navy-600 hover:bg-navy-100'
                }
              `}
            >
              {link.label}
            </Link>
          ))}
          {filteredCategories.length === 0 && (
            <p className="text-gray-500 text-center py-2">
              No se encontraron categorías
            </p>
          )}
        </div>
      </div>
    </aside>
  );
}
