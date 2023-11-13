import { Inter } from "next/font/google";
import "tailwindcss/tailwind.css";
import Header from "@/components/ui/header";
import Footer from "@/components/ui/footer";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
