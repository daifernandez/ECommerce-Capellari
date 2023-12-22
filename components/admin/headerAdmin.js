"use client";
import { useState } from "react";
import { useAuth } from "../context/authContext";
import { useRouter, usePathname } from "next/navigation";

export default function HeaderAdmin() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { logOut } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const secondaryButtons = () => {
    return (
      <>
        <button
          type="button"
          onClick={() => router.push("/admin")}
          className="block px-3 py-1 text-sm leading-6 text-gray-900"
        >
          Panel Admin
        </button>
        <button
          type="button"
          onClick={logOut}
          className="block px-3 py-1 text-sm leading-6 text-gray-900 mr-2"
        >
          Cerrar sesión
        </button>
      </>
    );
  };

  return (
    <header className="bg-white">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex flex-1 justify-center"></div>
        <a href="#" className="-m-1.5 p-1.5">
          <span className="sr-only">Logo de Capellari </span>
          {/*imagen de logo */}
          logo capellari
        </a>
        <div className="flex flex-1 justify-end" />
        {pathname !== "/admin" && (
          <div className="hidden lg:flex lg:gap-x-12">{secondaryButtons()}</div>
        )}
      </nav>
    </header>
  );
}
