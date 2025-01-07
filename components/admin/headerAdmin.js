"use client";
import { useState, useEffect } from "react";
import { useAuth } from "../context/authContext";
import { useRouter, usePathname } from "next/navigation";
import { Cog6ToothIcon } from "@heroicons/react/24/outline";
import { ArrowLeftOnRectangleIcon, UserCircleIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import Link from "next/link";

export default function HeaderAdmin() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { logOut, user } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    const button = document.querySelector('#admin-logout-button');
    button.classList.add('animate-logout');
    
    setTimeout(() => {
      logOut();
    }, 500);
  };

  const secondaryButtons = () => {
    return (
      <div className="flex items-center gap-x-4">
        <div className="hidden md:flex items-center px-4 py-2 text-sm text-gray-600 border-r border-gray-200 pr-4">
          <UserCircleIcon className="h-5 w-5 mr-2 text-navy-900" />
          <span>Admin: {user?.email}</span>
        </div>
        <button
          type="button"
          onClick={() => router.push("/admin")}
          className="relative flex items-center px-4 py-2 text-sm font-medium text-gray-600 hover:text-navy-900 hover:bg-gray-100/80 rounded-lg transition-all duration-300 group focus:outline-none focus:ring-2 focus:ring-navy-900/20 active:scale-95"
          title="Panel de administración"
        >
          <Cog6ToothIcon className="h-5 w-5 mr-2.5 transition-transform group-hover:rotate-90" />
          <span>Panel</span>
          {pathname === "/admin" && (
            <span className="absolute -bottom-px left-2 right-2 h-0.5 bg-navy-900 rounded-full"></span>
          )}
        </button>
        <button
          id="admin-logout-button"
          type="button"
          onClick={handleLogout}
          className="flex items-center px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all duration-300 group [&.animate-logout]:translate-x-2 [&.animate-logout]:opacity-0 focus:outline-none focus:ring-2 focus:ring-red-500/20 active:scale-95"
          title="Cerrar sesión"
        >
          <ArrowLeftOnRectangleIcon className="h-5 w-5 mr-2.5 transition-transform group-hover:-translate-x-1" />
          <span>Salir</span>
        </button>
      </div>
    );
  };

  return (
    <header 
      className={`bg-white/95 backdrop-blur-sm sticky top-0 z-50 transition-all duration-300
      ${scrolled ? 'shadow-md' : 'shadow-sm'}`}
    >
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-3 lg:px-8"
        aria-label="Global"
      >
        <div className="flex flex-1">
          <Link 
            href="/" 
            className="flex items-center transition-transform duration-300 hover:scale-105 focus:scale-105 focus:outline-none focus:ring-2 focus:ring-navy-900/20 rounded-lg"
          >
            <Image
              src="/capellariLogo.svg"
              alt="logo"
              width={150}
              height={150}
              priority
              className={`w-auto transition-all duration-300 ${scrolled ? 'h-[38px]' : 'h-[42px]'} drop-shadow-sm`}
            />
          </Link>
        </div>
        {pathname !== "/admin" && (
          <div className="flex items-center">{secondaryButtons()}</div>
        )}
      </nav>
      {scrolled && (
        <div className="h-0.5 bg-gradient-to-r from-transparent via-navy-900/10 to-transparent"></div>
      )}
    </header>
  );
}
