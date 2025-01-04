"use client";
import { useState } from "react";
import { useAuth } from "../context/authContext";
import { useRouter, usePathname } from "next/navigation";
import { Cog6ToothIcon } from "@heroicons/react/24/outline";
import { ArrowLeftOnRectangleIcon } from "@heroicons/react/20/solid";
import Image from "next/image";

export default function HeaderAdmin() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { logOut } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const secondaryButtons = () => {
    return (
      <div className="flex items-center space-x-4">
        <button
          type="button"
          onClick={() => router.push("/admin")}
          className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md transition-colors duration-200"
        >
          <Cog6ToothIcon className="h-5 w-5 mr-2" />
          <span>Panel</span>
        </button>
        <button
          type="button"
          onClick={logOut}
          className="flex items-center px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-md transition-colors duration-200"
        >
          <ArrowLeftOnRectangleIcon className="h-5 w-5 mr-2" />
          <span>Salir</span>
        </button>
      </div>
    );
  };

  return (
    <header className="bg-white shadow-sm">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8"
        aria-label="Global"
      >
        <div className="flex flex-1">
          <a href="/" className="flex items-center">
            <Image
              src="/capellariLogo.svg"
              alt="logo"
              width={130}
              height={22}
              priority
              className="hover:opacity-80 transition-opacity duration-200"
            />
          </a>
        </div>
        {pathname !== "/admin" && (
          <div className="flex items-center">{secondaryButtons()}</div>
        )}
      </nav>
    </header>
  );
}
