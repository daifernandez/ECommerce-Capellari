"use client";
import { useAuth } from "../../components/context/authContext";

export default function LogOutButton() {
  const { logOut } = useAuth();

  return (
    <button
      type="button"
      onClick={logOut}
      className="block px-3 py-1 text-sm leading-6 text-gray-900"
    >
      Cerrar sesión
    </button>
  );
}
