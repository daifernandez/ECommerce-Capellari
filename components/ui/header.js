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

const navigation = [
  { name: "Marketplace", href: "/" },
  { name: "Compania", href: "/about" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartItems, setCartItems] = useState(0);
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

  const profileButton = () => {
    if (user?.logged === false) {
      return (
        <Link
          href="/admin"
          className="text-sm font-semibold leading-6 text-gray-900"
        >
          <UserIcon className="h-6 w-6 mx-3" aria-hidden="true" />{" "}
        </Link>
      );
    }

    return (
      <div className="flex gap-x-2">
        <button
          type="button"
          onClick={() => router.push("/admin")}
          className="block px-2 py-1 text-sm leading-6 text-gray-900"
        >
          <Cog6ToothIcon className="h-6 w-6" />
        </button>
        <button
          type="button"
          onClick={logOut}
          className="block px-2 py-1 text-sm leading-6 text-gray-900 mr-2"
        >
          <ArrowLeftOnRectangleIcon className="h-6 w-6" />
        </button>
      </div>
    );
  };

  return (
    <header className="bg-white">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Capellari</span>
            {/* Agregar logo de Capellari */}
            logo de Capellari
          </Link>
        </div>

        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`${
                pathname === item.href ? " underline underline-offset-8" : ""
              } text-sm leading-6 font-semibold text-gray-900`}
            >
              {item.name}
            </Link>
          ))}
        </div>
        <div className="flex flex-1 justify-end gap-x-2">
          <Link
            href="/carrito"
            className="flex items-center text-sm font-semibold leading-2 text-gray-900"
          >
            <ShoppingCartIcon
              className="h-6 w-6 mr-1 mx-3"
              aria-hidden="true"
            />

            {/* Agregar número para la cantidad de pedidos en el carrito */}
            <span className="bg-slate-700 text-white rounded-full px-2 py-1">
              {totalItemsInCart(cart)}
            </span>
          </Link>
          {profileButton()}
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="h-6 w-6 mx-3" aria-hidden="true" />
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
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Capellari</span>
              {/* logo de la empresa */}
            </Link>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`${
                      pathname === item.href
                        ? "underline underline-offset-8"
                        : ""
                    } -mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7  hover:bg-gray-50'
                `}
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
