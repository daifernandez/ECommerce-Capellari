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
    icon: (
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        fill="none" 
        viewBox="0 0 24 24" 
        strokeWidth={1.2} 
        stroke="currentColor" 
        className="w-6 h-6"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z" 
        />
      </svg>
    )
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
        <div className="relative isolate -z-10 overflow-hidden bg-gradient-to-b from-slate-100/20 pt-14 transition-all duration-500 animate-fade-in-down">
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
        <div className="relative py-12 sm:py-16 bg-gradient-to-b from-white to-slate-50/40">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto grid max-w-2xl grid-cols-1 gap-8 overflow-hidden lg:mx-0 lg:max-w-none lg:grid-cols-4">
              {timeline.map((item) => (
                <div 
                  key={item.name} 
                  className="transform transition-all duration-300 hover:scale-105 p-6 rounded-xl bg-white shadow-sm hover:shadow-md border border-gray-100"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-2 rounded-full bg-slate-100 text-slate-600">
                      {item.icon}
                    </div>
                    <time
                      dateTime={item.dateTime}
                      className="text-sm font-semibold leading-6 text-slate-500"
                    >
                      {item.date}
                    </time>
                  </div>
                  <h3 className="mt-4 text-lg font-semibold leading-8 tracking-tight text-gray-900">
                    {item.name}
                  </h3>
                  <p className="mt-2 text-base leading-7 text-gray-600">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Logo cloud section */}
        <div className="relative py-16 sm:py-20">
          <div className="absolute inset-0 bg-white/30 backdrop-blur-sm"></div>
          <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-4xl text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-4">
                Marcas Premium
              </h2>
              <div className="w-24 h-1 bg-slate-900/20 mx-auto rounded-full"></div>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Trabajamos con las marcas más reconocidas del mercado
              </p>
            </div>
            <div className="mx-auto mt-10 grid grid-cols-2 items-center gap-x-8 gap-y-10 sm:grid-cols-4 sm:gap-x-10">
              {[
                { 
                  src: "/whirlpool.png", 
                  alt: "Whirlpool",
                  description: "Innovación y calidad"
                },
                { 
                  src: "/lg.png", 
                  alt: "LG",
                  description: "Tecnología de vanguardia"
                },
                { 
                  src: "/samsung.png", 
                  alt: "Samsung",
                  description: "Diseño inteligente"
                },
                { 
                  src: "/bosch.png", 
                  alt: "Bosch",
                  description: "Ingeniería alemana"
                },
              ].map((brand) => (
                <div 
                  key={brand.alt}
                  className="group relative flex flex-col items-center"
                >
                  <div className="relative h-24 w-full transform transition-all duration-300 group-hover:scale-105">
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white to-gray-50 shadow-sm ring-1 ring-gray-200/50" />
                    <div className="absolute inset-0 flex items-center justify-center p-4">
                      <Image
                        src={brand.src}
                        alt={brand.alt}
                        width={100}
                        height={100}
                        className="h-12 w-auto object-contain transition-all duration-300 group-hover:scale-110"
                        style={{ 
                          filter: "grayscale(100%)",
                        }}
                        priority
                      />
                    </div>
                  </div>
                  <div className="mt-3 text-center">
                    <p className="text-sm font-medium text-gray-900 opacity-0 transform -translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                      {brand.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Stats section */}
        <div className="relative py-16 sm:py-20 bg-gradient-to-b from-slate-50/40 to-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:max-w-none">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-4">
                  Confianza que crece año tras año
                </h2>
                <div className="w-24 h-1 bg-slate-900/20 mx-auto rounded-full"></div>
                <p className="mt-6 text-lg leading-8 text-gray-600">
                  Descubre por qué miles de clientes confían en nosotros
                </p>
              </div>
              <dl className="mt-16 grid grid-cols-1 gap-0.5 overflow-hidden rounded-2xl text-center sm:grid-cols-2 lg:grid-cols-4">
                {[
                  { id: 1, name: 'Años de experiencia', value: '94+' },
                  { id: 2, name: 'Clientes satisfechos', value: '50k+' },
                  { id: 3, name: 'Productos vendidos', value: '100k+' },
                  { id: 4, name: 'Ciudades alcanzadas', value: '20+' },
                ].map((stat) => (
                  <div key={stat.id} className="flex flex-col bg-gray-400/5 p-8">
                    <dt className="text-sm font-semibold leading-6 text-gray-600">{stat.name}</dt>
                    <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900">{stat.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
        {/* Content section - Nuestros Clientes */}
        <div className="relative py-16 sm:py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-white to-slate-50/40"></div>
          <div className="relative mx-auto max-w-7xl px-6 lg:flex lg:px-8">
            <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-12 gap-y-16 lg:mx-0 lg:min-w-full lg:max-w-none lg:flex-none lg:gap-y-8">
              <div className="lg:col-end-1 lg:w-full lg:max-w-lg lg:pb-8">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-4">
                  Nuestros Clientes
                </h2>
                <div className="w-24 h-1 bg-slate-900/20 rounded-full mb-6"></div>
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
                    className="aspect-[7/5] w-[37rem] max-w-none rounded-2xl bg-gray-50 object-cover transition-transform duration-300 hover:scale-105 hover:shadow-xl"
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
        </div>
      </main>
    </>
  );
}
