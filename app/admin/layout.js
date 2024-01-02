"use client";
import { Inter } from "next/font/google";
import "tailwindcss/tailwind.css";
import { useAuth } from "@/components/context/authContext";
import Unauthorized from "../unauthorized/page";

const inter = Inter({ subsets: ["latin"] });

export default function AdminLayout({ children, login }) {
  const { user } = useAuth();
  if (user.logged && !user.isAdmin) {
    return <Unauthorized />;
  }
  return <>{user.logged ? children : login}</>;
}
