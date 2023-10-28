import Title from "../components/ui/title";
import Header from "../components/ui/header";
import Footer from "../components/ui/footer";

export const metadata = {
  title: "Coderhouse Next App || Daiana Fernandez",
  description:
    "Pagina de aplicacion Next.Js creada por Daiana Fernandez para Coderhouse S.R.L - Ecommerce de electrodomésticos, Capellari",
};

export default function Home() {
  return (
    <>
      <Header />
      <main className="bg-gray-900">
        <Title />
      </main>
      <Footer />
    </>
  );
}
