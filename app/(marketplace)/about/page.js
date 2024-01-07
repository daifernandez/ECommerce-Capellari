import BackButton from "@/components/ui/backbutton";
import Image from "next/image";

export const metadata = {
  title: "Sobre Nosotros || Capellari",
  description: "Conoce nuestra historia y nuestros clientes.",
};

const timeline = [
  {
    name: "Nacimiento",
    description:
      "Fundada en 1929, Capellari es una empresa familiar. Naciendo una pequeña tienda en el corazón de la ciudad de Puerto Montt, en Chile.",
    date: "1929",
    dateTime: "2021-08",
  },
  {
    name: "Expansión",
    description:
      "En 1950, abrimos nuestra segunda tienda en la ciudad de Osorno, en Chile. Esto nos permitio en 1980, abrir nuestra tercera tienda en la ciudad de Valdivia, en Chile, como tambien, nuestra primera tienda en la ciudad de Bariloche, en Argentina.",
    date: "1950-1990",
    dateTime: "2021-09",
  },

  {
    name: "Crecimiento",
    description:
      "Pensamos la idea de llevar nuestra empresa al mundo digital para poder llegar a más personas y brindarles un mejor servicio.",
    date: "2019",
    dateTime: "",
  },
  {
    name: "Actualidad",
    description:
      "Un viaje hacia la transformacion. Hoy en día, contamos con una gran variedad de productos, y con una amplia red de distribución en todo el país. Sumando nuestra atencion web, para que puedas comprar desde la comodidad de tu casa.",
    date: "Dec 2022",
    dateTime: "2022-12",
  },
];

export default function About() {
  return (
    <>
      <main className="isolate">
        {/* Hero section */}
        <div className="relative isolate -z-10 overflow-hidden bg-gradient-to-b from-slate-100/20 pt-14">
          <div
            className="absolute inset-y-0 right-1/2 -z-10 -mr-96 w-[200%] origin-top-right skew-x-[-30deg] bg-white shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-50 sm:-mr-80 lg:-mr-96"
            aria-hidden="true"
          />
          <div className="mx-auto max-w-7xl px-6 py-32 sm:py-40 lg:px-8">
            <div className="mx-auto max-w-2xl lg:mx-0 lg:grid lg:max-w-none lg:grid-cols-2 lg:gap-x-16 lg:gap-y-6 xl:grid-cols-1 xl:grid-rows-1 xl:gap-x-8">
              <h1 className="max-w-2xl text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl lg:col-span-2 xl:col-auto">
                Somos una empresa con historia.
              </h1>
              <div className="mt-6 max-w-xl lg:mt-0 xl:col-end-1 xl:row-start-1">
                <p className="text-lg leading-8 text-gray-600">
                  Capellari tiene una rica historia que se remonta a 1929. Desde
                  entonces, nos hemos destacado en la venta de electrodomésticos
                  de alta calidad. Durante décadas, nuestra familia ha mantenido
                  un firme compromiso de ofrecer productos confiables y
                  eficientes a nuestros clientes. Nuestra pasión por la
                  innovación nos ha llevado a estar a la vanguardia de la
                  tecnología, ofreciendo los últimos avances en
                  electrodomésticos para hacer la vida cotidiana más fácil y
                  cómoda.
                </p>
                <p className="mt-6 text-base leading-7 text-gray-600">
                  En Capellari, nuestra historia está marcada por décadas de
                  experiencia y compromiso en ofrecer electrodomésticos de
                  calidad respaldados por una tradición familiar. Estamos
                  orgullosos de nuestra herencia y esperamos seguir brindando lo
                  mejor a nuestros clientes en el futuro.
                </p>
              </div>
              <Image
                src={"/family.jpg"}
                alt="Capellini familia"
                width={1920}
                height={1080}
                className="mt-10 aspect-[5/7] w-full max-w-lg rounded-2xl object-cover sm:mt-16 lg:mt-0 lg:max-w-none xl:row-span-2 xl:row-end-2 xl:mt-36"
                priority
              />
            </div>
          </div>
          <div className="absolute inset-x-0 bottom-0 -z-10 h-24 bg-gradient-to-t from-white sm:h-32" />
        </div>
        {/* Timeline section */}
        <div className="mx-auto -mt-8 max-w-7xl px-6 lg:px-8">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-8 overflow-hidden lg:mx-0 lg:max-w-none lg:grid-cols-4">
            {timeline.map((item) => (
              <div key={item.name}>
                <time
                  dateTime={item.dateTime}
                  className="flex items-center text-sm font-semibold leading-6 text-slate-500"
                >
                  <svg
                    viewBox="0 0 4 4"
                    className="mr-4 h-1 w-1 flex-none"
                    aria-hidden="true"
                  >
                    <circle cx={2} cy={2} r={2} fill="currentColor" />
                  </svg>
                  {item.date}
                  <div
                    className="absolute -ml-2 h-px w-screen -translate-x-full bg-gray-900/10 sm:-ml-4 lg:static lg:-mr-6 lg:ml-8 lg:w-auto lg:flex-auto lg:translate-x-0"
                    aria-hidden="true"
                  />
                </time>
                <p className="mt-6 text-lg font-semibold leading-8 tracking-tight text-gray-900">
                  {item.name}
                </p>
                <p className="mt-1 text-base leading-7 text-gray-600">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
        {/* Logo cloud */}
        <div className="mx-auto mt-32 max-w-7xl sm:mt-40 sm:px-6 lg:px-8">
          <div className="relative isolate overflow-hidden bg-gray-900 px-6 py-24 text-center shadow-2xl sm:rounded-3xl sm:px-16">
            <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Marcas que confían en nosotros
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-300">
              Ofrecemos una selección insuperable de las marcas líderes en el
              mercado, proporcionándote una amplia gama de productos para
              elegir.
            </p>

            <div className="flex mx-auto mt-20 max-w-lg grid-cols-4 items-center gap-x-8 gap-y-12 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 sm:gap-y-14 lg:max-w-4xl lg:grid-cols-5">
              <Image
                className="col-span-2 max-h-12 w-full object-contain lg:col-span-1 shadow-lg"
                src={"/whirlpool.png"}
                alt="whirlpool"
                width={400}
                height={400}
                style={{ filter: "drop-shadow(0 0 10px white)" }}
                priority
              />
              <Image
                className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
                src={"/lg.png"}
                alt="lg"
                width={400}
                height={400}
                style={{ filter: "drop-shadow(0 0 10px white)" }}
                priority
              />
              <Image
                className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
                src={"/samsung.png"}
                alt="samsung"
                width={400}
                height={400}
                style={{ filter: "drop-shadow(0 0 10px white)" }}
                priority
              />

              <Image
                className="col-span-2 max-h-12 w-full object-contain lg:col-span-1 "
                src={"/bosch.png"}
                alt="bosch"
                width={700}
                height={700}
                style={{ filter: "drop-shadow(0 0 10px white)" }}
                priority
              />
            </div>
            <div
              className="absolute -top-24 right-0 -z-10 transform-gpu blur-3xl"
              aria-hidden="true"
            >
              <div
                className="aspect-[1404/767] w-[87.75rem] bg-gradient-to-r from-[#80caff] to-[#262448] opacity-25"
                style={{
                  clipPath:
                    "polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)",
                }}
              />
            </div>
          </div>
        </div>
        {/* Content section */}
        <div className="mt-32 mb-32 overflow-hidden sm:mt-40">
          <div className="mx-auto max-w-7xl px-6 lg:flex lg:px-8">
            <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-12 gap-y-16 lg:mx-0 lg:min-w-full lg:max-w-none lg:flex-none lg:gap-y-8">
              <div className="lg:col-end-1 lg:w-full lg:max-w-lg lg:pb-8">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                  Nuestros Clientes
                </h2>
                <p className="mt-6 text-xl leading-8 text-gray-600">
                  En Capellari, nuestros clientes son más que una prioridad, son
                  el corazón de nuestra empresa. Dedicamos todo nuestro esfuerzo
                  en proporcionarles un servicio excepcional y ofrecerles los
                  productos de la más alta calidad.
                </p>
                <p className="mt-6 text-base leading-7 text-gray-600">
                  Nuestro objetivo es brindarles una experiencia de compra sin
                  igual, para que puedan encontrar los electrodomésticos que
                  mejor se adapten a sus necesidades.
                </p>
                <div className="mt-10 flex items-center justify-center gap-x-6">
                  <BackButton />
                </div>
              </div>
              <div className="flex flex-wrap items-start justify-end gap-6 sm:gap-8 lg:contents">
                <div className="w-0 flex-auto lg:ml-auto lg:w-auto lg:flex-none lg:self-end">
                  <Image
                    src={"/clientes.jpg"}
                    alt="Capellini clientes"
                    width={1920}
                    height={1080}
                    className="aspect-[7/5] w-[37rem] max-w-none rounded-2xl bg-gray-50 object-cover"
                    priority
                  />
                </div>
                <div className="contents lg:col-span-2 lg:col-end-2 lg:ml-auto lg:flex lg:w-[37rem] lg:items-start lg:justify-end lg:gap-x-8">
                  <div className="order-first flex w-64 flex-none justify-end self-end lg:w-auto">
                    <Image
                      src={"/clientes2.jpg"}
                      alt="Capellini clientes"
                      width={1920}
                      height={1080}
                      className="aspect-[4/3] w-[24rem] max-w-none flex-none rounded-2xl bg-gray-50 object-cover"
                      priority
                    />
                  </div>
                  <div className="flex w-96 flex-auto justify-end lg:w-auto lg:flex-none">
                    <Image
                      src={"/clientes3.jpg"}
                      alt="Capellini clientes"
                      width={1920}
                      height={1080}
                      className="aspect-[7/5] w-[37rem] max-w-none flex-none rounded-2xl bg-gray-50 object-cover"
                      priority
                    />
                  </div>
                  <div className="hidden sm:block sm:w-0 sm:flex-auto lg:w-auto lg:flex-none">
                    <Image
                      src={"/clientes1.jpg"}
                      alt="Capellini clientes"
                      width={1920}
                      height={1080}
                      className="aspect-[4/3] w-[24rem] max-w-none rounded-2xl bg-gray-50 object-cover"
                      priority
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>{" "}
      </main>
    </>
  );
}
