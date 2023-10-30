import Title from "../components/ui/title";
import Header from "../components/ui/header";
import Footer from "../components/ui/footer";
import Products from "@/components/ui/products";

export const metadata = {
  title: "Coderhouse Next App || Daiana Fernandez",
  description:
    "Pagina de aplicacion Next.Js creada por Daiana Fernandez para Coderhouse S.R.L - Ecommerce de electrodomésticos, Capellari",
};

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Title />
        <Products />
      </main>
      <Footer />
    </>
  );
}
