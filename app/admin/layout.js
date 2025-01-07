"use client";
import { Inter } from "next/font/google";
import "tailwindcss/tailwind.css";
import { useAuth } from "@/components/context/authContext";
import Unauthorized from "../unauthorized/page";
import { useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function AdminLayout({ children, login }) {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log("Layout - Estado actual del usuario:", {
      logged: user?.logged,
      isAdmin: user?.isAdmin,
      email: user?.email
    });

    if (user !== undefined) {
      setIsLoading(false);
    }
  }, [user]);

  // Verificación de carga inicial
  if (isLoading) {
    console.log("Layout - Cargando...");
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  // Verificación de usuario no autenticado
  if (!user || !user.logged) {
    console.log("Layout - Usuario no autenticado, mostrando login");
    return <>{login}</>;
  }

  // Verificación de permisos de administrador
  if (!user.isAdmin) {
    console.log("Layout - Usuario no es admin, mostrando página no autorizada");
    return <Unauthorized />;
  }

  // Usuario autenticado y es admin
  return (
    <div className="min-h-screen bg-gray-100">
      <main className={inter.className}>
        {children}
      </main>
    </div>
  );
}
