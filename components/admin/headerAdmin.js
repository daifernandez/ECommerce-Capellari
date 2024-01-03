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
      <>
        <button
          type="button"
          onClick={() => router.push("/admin")}
          className="block px-3 py-1 text-sm leading-6 text-gray-900 hover:text-slate-600 mr-2"
        >
          <Cog6ToothIcon className="h-6 w-6" />
        </button>
        <button
          type="button"
          onClick={logOut}
          className="block px-3 py-1 text-sm leading-6 text-gray-900 hover:text-slate-600 mr-2"
        >
          <ArrowLeftOnRectangleIcon className="h-6 w-6" />
        </button>
      </>
    );
  };

  return (
    <header className="bg-white">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-18"
        aria-label="Global"
      >
        <div className="flex flex-3 justify-center"></div>
        <a href="/" className="-m-1.5 p-1.5">
          <Image
            src="/capellariLogo.svg"
            alt="logo"
            width={150}
            height={25}
            priority
          />
        </a>
        <div className="flex flex-1 justify-end" />
        {pathname !== "/admin" && (
          <div className="flex gap-x-2">{secondaryButtons()}</div>
        )}
      </nav>
    </header>
  );
}
