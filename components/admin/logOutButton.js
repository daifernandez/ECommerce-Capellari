"use client";
import { useAuth } from "../../components/context/authContext";
import { ArrowLeftOnRectangleIcon } from "@heroicons/react/20/solid";

export default function LogOutButton() {
  const { logOut } = useAuth();

  return (
    <button
      type="button"
      onClick={logOut}
      className="flex items-center px-3 py-1 text-sm leading-6 text-gray-900"
    >
      <ArrowLeftOnRectangleIcon className="h-6 w-6" />
      Cerrar sesión
    </button>
  );
}
