"use client";
import { useState } from "react";

export default function HeaderAdmin() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
      </nav>
    </header>
  );
}
