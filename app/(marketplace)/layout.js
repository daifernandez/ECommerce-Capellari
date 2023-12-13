import { Inter } from "next/font/google";
import "tailwindcss/tailwind.css";
import Header from "@/components/ui/header";
import Footer from "@/components/ui/footer";
import { CartProvider } from "@/components/context/cartContext";
import { AuthProvider } from "@/components/context/authContext";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <CartProvider>
            <Header />
            {children}
            <Footer />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
