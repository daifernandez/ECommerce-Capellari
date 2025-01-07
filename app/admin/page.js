"use client";

import { Fragment, useState, Suspense } from "react";
import { Dialog, Menu, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  FolderIcon,
  UsersIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import dynamic from 'next/dynamic';
import Welcome from "@/components/admin/welcome";
import LogOutButton from "@/components/admin/logOutButton";
import Image from "next/image";
import Link from "next/link";

// Importación directa del componente
import AdminTable from "@/components/admin/adminTable";

// Solo AddProducts será dinámico
const AddProducts = dynamic(() => import('@/components/admin/addProducts'), {
  loading: () => <p className="text-center text-slate-500 text-sm mt-4 animate-pulse">Cargando formulario...</p>
});

const navigation = [
  {
    name: "Agregar Productos",
    icon: FolderIcon,
    current: false,
    content: "AddProducts",
    description: "Añadir nuevos productos al catálogo",
    bgColor: "bg-gradient-to-br from-emerald-50 to-emerald-100/50",
    hoverBg: "hover:from-emerald-100/80 hover:to-emerald-100/60",
    iconColor: "text-emerald-600",
  },
  {
    name: "Editar Productos",
    icon: UsersIcon,
    current: false,
    content: "AdminTable",
    description: "Gestionar productos existentes",
    bgColor: "bg-gradient-to-br from-blue-50 to-blue-100/50",
    hoverBg: "hover:from-blue-100/80 hover:to-blue-100/60",
    iconColor: "text-blue-600",
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Admin() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [content, setContent] = useState("Welcome");
  const [isLoading, setIsLoading] = useState(false);

  const handleContentChange = (newContent) => {
    setIsLoading(true);
    setContent(newContent);
    setTimeout(() => setIsLoading(false), 100);
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        </div>
      );
    }

    switch (content) {
      case "AddProducts":
        return <AddProducts />;
      case "AdminTable":
        return <AdminTable />;
      default:
        return <Welcome />;
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-50 lg:hidden"
            onClose={setSidebarOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-900/80" />
            </Transition.Child>

            <div className="fixed inset-0 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                      <button
                        type="button"
                        className="-m-2.5 p-2.5"
                        onClick={() => setSidebarOpen(false)}
                      >
                        <span className="sr-only">Close sidebar</span>
                        <XMarkIcon
                          className="h-6 w-6 text-white"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </Transition.Child>
                  {/* Sidebar */}
                  <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-4">
                    <div className="flex h-16 shrink-0 items-center">
                      {/* Imagen de la compania */}
                    </div>
                    <nav className="flex flex-1 flex-col">
                      <ul role="list" className="flex flex-1 flex-col gap-y-7">
                        <li>
                          <ul role="list" className="-mx-2 space-y-1">
                            {navigation.map((item) => (
                              <li key={item.name}>
                                <a
                                  className={classNames(
                                    item.current
                                      ? "bg-gray-50 text-slate-600"
                                      : "text-gray-700 hover:text-slate-600 hover:bg-gray-50",
                                    "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                                  )}
                                  onClick={
                                    item.name == "Agregar Productos"
                                      ? handleContentChange.bind(null, "AddProducts")
                                      : handleContentChange.bind(null, "AdminTable")
                                  }
                                >
                                  <item.icon
                                    className={classNames(
                                      item.current
                                        ? "text-slate-600"
                                        : "text-gray-400 group-hover:text-slate-600",
                                      "h-6 w-6 shrink-0"
                                    )}
                                    aria-hidden="true"
                                  />
                                  {item.name}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-64 lg:flex-col">
          {/* Sidebar */}
          <div className="flex grow flex-col gap-y-4 overflow-y-auto border-r border-gray-200 bg-white px-6 pb-6 transition-all duration-300 ease-in-out">
            <div className="flex h-16 shrink-0 items-center mt-6 mb-4">
              <Link href="/" className="group transition-all duration-300 hover:scale-105">
                <div style={{ position: 'relative', width: '200px', height: '45px' }}>
                  <Image
                    src="/capellariLogo.svg"
                    alt="logo"
                    fill
                    sizes="200px"
                    style={{ objectFit: 'contain' }}
                    priority
                    className="transition-opacity duration-300 group-hover:opacity-80"
                  />
                </div>
              </Link>
            </div>
            <nav className="flex flex-1 flex-col">
              <ul role="list" className="flex flex-1 flex-col gap-y-3">
                <li>
                  <ul role="list" className="space-y-3">
                    {navigation.map((item) => (
                      <li key={item.name}>
                        <a
                          className={classNames(
                            content === item.content
                              ? `${item.bgColor} ${item.iconColor} shadow-md`
                              : `text-gray-700 hover:bg-gray-50/80 ${item.hoverBg}`,
                            "group flex flex-col gap-y-1 rounded-xl p-4 text-sm leading-6 transition-all duration-300 hover:shadow-sm relative overflow-hidden cursor-pointer",
                            "before:absolute before:inset-0 before:rounded-xl before:transition-opacity before:duration-300",
                            content === item.content
                              ? "before:bg-gradient-to-r before:from-white/50 before:to-transparent before:opacity-100"
                              : "before:opacity-0"
                          )}
                          onClick={() => {
                            handleContentChange(item.content);
                            navigation.forEach(nav => nav.current = nav.name === item.name);
                          }}
                        >
                          <div className="flex items-center gap-x-3 relative z-10">
                            <item.icon
                              className={classNames(
                                content === item.content
                                  ? `${item.iconColor} scale-110`
                                  : `${item.iconColor} group-hover:scale-110`,
                                "h-6 w-6 shrink-0 transition-all duration-300"
                              )}
                              aria-hidden="true"
                            />
                            <span className={classNames(
                              "font-semibold transition-all duration-300",
                              content === item.content ? "text-slate-800" : "text-slate-600"
                            )}>
                              {item.name}
                            </span>
                          </div>
                          <p className={classNames(
                            "text-xs ml-9 relative z-10 transition-all duration-300",
                            content === item.content ? "text-slate-600" : "text-slate-500"
                          )}>
                            {item.description}
                          </p>
                          {content === item.content && (
                            <div className="absolute inset-y-0 right-0 w-1.5 bg-gradient-to-b from-slate-400 to-slate-300 rounded-l-full" />
                          )}
                        </a>
                      </li>
                    ))}
                  </ul>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <div className="lg:pl-64">
          <div className="sticky top-0 z-40">
            <div className="flex h-16 items-center gap-x-4 border-b border-gray-200 bg-white/90 px-6 backdrop-blur-sm sm:px-8 lg:px-10">
              <button
                type="button"
                className="-m-2.5 p-2.5 text-gray-700 lg:hidden hover:bg-gray-50 rounded-xl transition-all duration-200 hover:shadow-sm active:scale-95"
                onClick={() => setSidebarOpen(true)}
              >
                <span className="sr-only">Open sidebar</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </button>

              <div className="h-6 w-px bg-gray-200 lg:hidden" aria-hidden="true" />

              <div className="flex flex-1 justify-end">
                {/* Perfil actualizado */}
                <Menu as="div" className="relative">
                  <Menu.Button className="flex items-center p-2.5 rounded-xl transition-all duration-200 hover:bg-gradient-to-br from-slate-50 to-slate-100/50 hover:shadow-sm active:scale-95 group">
                    <span className="sr-only">Abrir menu de usuario</span>
                    <div className="flex items-center gap-4">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-100 to-indigo-200 ring-2 ring-indigo-100 group-hover:ring-indigo-200 transition-all duration-200">
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          viewBox="0 0 24 24" 
                          fill="currentColor" 
                          className="w-5 h-5 text-indigo-600 group-hover:scale-110 transition-transform duration-200"
                        >
                          <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold text-slate-800 group-hover:text-indigo-600 transition-colors duration-200">
                          Capellari
                        </span>
                        <span className="text-xs font-medium text-slate-500 group-hover:text-slate-600">
                          Administrador
                        </span>
                      </div>
                      <ChevronDownIcon
                        className="ml-1 h-5 w-5 text-slate-400 transition-all duration-200 group-hover:text-indigo-500 group-hover:rotate-180"
                        aria-hidden="true"
                      />
                    </div>
                  </Menu.Button>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-150"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-3 w-64 origin-top-right rounded-xl bg-white py-3 shadow-lg ring-1 ring-gray-900/5 focus:outline-none divide-y divide-gray-100">
                      <div className="px-4 py-2.5">
                        <p className="text-sm text-slate-500">Conectado como</p>
                        <p className="truncate text-sm font-semibold text-indigo-600">capellariAdmin@gmail.com</p>
                      </div>
                      <div className="py-1.5">
                        <LogOutButton />
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <main className="py-8">
            <div className="mx-auto px-6 sm:px-8 lg:px-10">
              {renderContent()}
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
