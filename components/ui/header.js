"use client";

import { useState } from "react";
import { Dialog } from "@headlessui/react";
import {
  Bars3Icon,
  ShoppingCartIcon,
  UserIcon,
  XMarkIcon,
  ArrowLeftOnRectangleIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCartContext } from "../../components/context/cartContext";
import { useAuth } from "../context/authContext";
import HeaderAdmin from "../admin/headerAdmin";
import { useRouter } from "next/navigation";
import Image from "next/image";

const navigation = [
  { name: "Compania", href: "/about" },
  { name: "Marketplace", href: "/productos", scroll: true },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { cart } = useCartContext();
  const { user, logOut } = useAuth();
  const router = useRouter();

  const totalItemsInCart = (cart) => {
    let totalItems = 0;
    cart.forEach((item) => {
      totalItems += item.quantity;
    });
    return totalItems;
  };

  if (user?.isAdmin === true) {
    return <HeaderAdmin />;
  }

  const handleLogout = () => {
    const button = document.querySelector('#logout-button');
    const icon = button.querySelector('svg');
    
    button.classList.add('animate-logout');
    icon.classList.add('animate-logout-icon');
    
    setTimeout(() => {
      logOut();
    }, 500);
  };

  const profileButton = () => {
    if (user?.logged === false) {
      return (
        <Link
          href="/admin"
          className="flex items-center text-sm font-semibold leading-6 text-gray-600 hover:text-navy-900 transition-all duration-300 hover:-translate-y-0.5 focus:-translate-y-0.5 focus:outline-none p-2 rounded-full hover:bg-gray-100/80"
        >
          <UserIcon className="h-6 w-6 transition-transform hover:scale-110" aria-hidden="true" />
        </Link>
      );
    }

    return (
      <div className="flex items-center">
        <div className="flex items-center gap-x-1 border-r border-gray-200 pr-4 mr-4">
          <button
            type="button"
            onClick={() => router.push("/admin")}
            className="text-gray-600 hover:text-navy-900 transition-all duration-300 hover:-translate-y-0.5 focus:-translate-y-0.5 p-2.5 rounded-full hover:bg-gray-100/80 focus:outline-none focus:ring-2 focus:ring-navy-900/20 group"
            title="Configuración"
          >
            <Cog6ToothIcon className="h-6 w-6 transition-transform group-hover:rotate-90" />
          </button>
          <button
            id="logout-button"
            type="button"
            onClick={handleLogout}
            className="text-gray-600 hover:text-navy-900 transition-all duration-500 hover:-translate-y-0.5 focus:-translate-y-0.5 p-2.5 rounded-full hover:bg-gray-100/80 focus:outline-none focus:ring-2 focus:ring-navy-900/20 group overflow-hidden
            [&.animate-logout]:translate-x-2 [&.animate-logout]:opacity-0"
            title="Cerrar sesión"
          >
            <ArrowLeftOnRectangleIcon 
              className="h-6 w-6 transition-all duration-500 ease-in-out group-hover:-translate-x-1
              [&.animate-logout-icon]:translate-x-5 [&.animate-logout-icon]:rotate-45" 
              aria-hidden="true"
            />
          </button>
        </div>
      </div>
    );
  };

  return (
    <header className="bg-white/95 backdrop-blur-sm shadow-sm sticky top-0 z-50 transition-all duration-300">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-3 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <Link 
            href="/" 
            className="-m-1.5 p-1.5 transition-all duration-300 hover:scale-105 focus:scale-105 focus:outline-none"
          >
            <Image
              src="/capellariLogo.svg"
              alt="logo"
              width={150}
              height={150}
              className="w-auto h-[42px] drop-shadow-sm"
              priority
            />
          </Link>
        </div>

        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={(e) => {
                if (item.scroll) {
                  e.preventDefault();
                  const productsSection = document.getElementById('productos');
                  if (productsSection) {
                    productsSection.scrollIntoView({ 
                      behavior: 'smooth',
                      block: 'start'
                    });
                  } else if (pathname !== '/') {
                    router.push('/#productos');
                  }
                }
              }}
              className={`${
                pathname === item.href 
                  ? "text-navy-900 font-bold" 
                  : "text-gray-600 hover:text-navy-900"
              } text-sm font-semibold leading-6 transition-all duration-300 hover:-translate-y-0.5 focus:-translate-y-0.5 cursor-pointer relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-navy-900 after:left-0 after:bottom-0 after:transition-all after:duration-300 hover:after:w-full focus:after:w-full focus:outline-none`}
            >
              {item.name}
            </Link>
          ))}
        </div>
        <div className="flex flex-1 justify-end items-center">
          <Link
            href="/carrito"
            className="group flex items-center text-gray-600 hover:text-navy-900 transition-all duration-300 hover:-translate-y-0.5 focus:-translate-y-0.5 focus:outline-none relative p-2.5 rounded-full hover:bg-gray-100/80 mr-2"
          >
            <div className="relative">
              <ShoppingCartIcon className="h-6 w-6 transition-transform group-hover:scale-110" aria-hidden="true" />
              {totalItemsInCart(cart) > 0 && (
                <span className="absolute -top-2 -right-2 bg-navy-900 text-white text-xs font-medium rounded-full h-5 w-5 flex items-center justify-center shadow-sm group-hover:animate-bounce">
                  {totalItemsInCart(cart)}
                </span>
              )}
            </div>
          </Link>
          {profileButton()}
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-full p-2.5 text-gray-600 hover:text-navy-900 transition-all duration-300 hover:bg-gray-100/80 focus:outline-none focus:ring-2 focus:ring-navy-900/20"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Abrir menú</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
        </div>
      </nav>
      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-10 bg-black/20 backdrop-blur-sm transition-opacity" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white/95 backdrop-blur-sm px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10 shadow-xl transition-transform duration-300">
          <div className="flex items-center justify-between">
            <Link 
              href="/" 
              className="-m-1.5 p-1.5 transition-all duration-300 hover:scale-105 focus:scale-105 focus:outline-none"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Capellari</span>
              <Image
                src="/capellariLogo.svg"
                alt="logo"
                width={150}
                height={150}
                className="w-auto h-[42px] drop-shadow-sm"
                priority
              />
            </Link>
            <button
              type="button"
              className="-m-2.5 rounded-full p-2.5 text-gray-600 hover:text-navy-900 transition-all duration-300 hover:bg-gray-100/80 focus:outline-none focus:ring-2 focus:ring-navy-900/20"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Cerrar menú</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/20">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`${
                      pathname === item.href
                        ? "text-navy-900 bg-gray-100/80"
                        : "text-gray-600 hover:text-navy-900 hover:bg-gray-50"
                    } -mx-3 block rounded-lg px-4 py-3 text-base font-semibold leading-7 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-navy-900/20`}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
}
