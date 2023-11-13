"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Links = [
  { label: "Todos", href: "/productos/todos" },
  { label: "Smart TV", href: "/productos/smart-tv" },
  { label: "Lavarropas", href: "/productos/lavarropas" },
  { label: "Cocinas", href: "/productos/cocinas" },
  { label: "Refrigeracion", href: "/productos/refrigeracion" },
  { label: "Aspiradoras", href: "/productos/aspiradoras" },
  { label: "Hornos", href: "/productos/hornos" },
  { label: "Microondas", href: "/productos/microondas" },
  { label: "Climatizacion", href: "/productos/climatizacion" },
];

export default function CategoriesMenu() {
  const pathName = usePathname();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false); 

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <aside className="flex flex-col gap-3 mt-8 mb-8">
      {/* Mobile Menu Button */}
      <div className="lg:hidden">
        <button
          onClick={toggleMobileMenu}
          className="text-gray-600 hover:text-gray-800 focus:outline-none focus:text-gray-800 transition duration-150 ease-in-out"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            ></path>
          </svg>
        </button>
      </div>

      {/* Links */}
      <div
        className={`lg:flex lg:flex-col lg:gap-3 ${
          isMobileMenuOpen
            ? "lg:absolute lg:top-0 lg:left-0 lg:w-full"
            : "hidden"
        }`}
      >
        {Links.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className={`${
              pathName === link.href ? "font-semibold border-b " : ""
            } py-2 lg:py-0 lg:px-2 block lg:inline-block`}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </aside>
  );
}
