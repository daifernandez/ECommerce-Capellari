import { Inter } from "next/font/google";
import "tailwindcss/tailwind.css";
import HeaderAdmin from "@/components/admin/headerAdmin";

const inter = Inter({ subsets: ["latin"] });

export default function AdminLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <HeaderAdmin />
        {children}
      </body>
    </html>
  );
}
