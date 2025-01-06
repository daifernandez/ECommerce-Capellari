"use client";
import { useAuth } from "../../components/context/authContext";
import { ArrowLeftOnRectangleIcon } from "@heroicons/react/20/solid";

export default function LogOutButton() {
  const { logOut } = useAuth();

  return (
    <button
      type="button"
      onClick={logOut}
      className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 
        transition-all duration-200 ease-in-out rounded-lg hover:bg-red-50 
        hover:text-red-600 hover:shadow-md focus:outline-none focus:ring-2 
        focus:ring-red-500 focus:ring-offset-2 active:scale-95"
    >
      <ArrowLeftOnRectangleIcon 
        className="h-5 w-5 transition-transform group-hover:-translate-x-1" 
      />
      Cerrar sesión
    </button>
  );
}
