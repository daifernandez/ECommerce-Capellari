import { Inter } from "next/font/google";
import "tailwindcss/tailwind.css";
import HeaderAdmin from "@/components/admin/headerAdmin";
import Footer from "@/components/ui/footer";

const inter = Inter({ subsets: ["latin"] });

export default function AdminLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <HeaderAdmin />
        {children}
        <Footer />
      </body>
    </html>
  );
}
