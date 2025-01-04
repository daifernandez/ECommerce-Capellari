import Title from "../../components/ui/title";
import Products from "./productos/[categoria]/page";

export const metadata = {
  title: "Coderhouse Next App || Daiana Fernandez",
  description:
    "Pagina de aplicacion Next.Js creada por Daiana Fernandez para Coderhouse S.R.L - Ecommerce de electrodomésticos, Capellari",
};

export default function Home() {
  return (
    <main>
      <Title />
      <section id="productos">
        <Products />
      </section>
    </main>
  );
}
