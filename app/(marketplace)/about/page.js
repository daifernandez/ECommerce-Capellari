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
        <div className="relative isolate -z-10 overflow-hidden bg-gradient-to-b from-indigo-50/50 pt-14 transition-all duration-500 animate-fade-in-down">
          <div
            className="absolute inset-y-0 right-1/2 -z-10 -mr-96 w-[200%] origin-top-right skew-x-[-30deg] bg-white shadow-xl shadow-indigo-600/5 ring-1 ring-indigo-50 sm:-mr-80 lg:-mr-96"
            aria-hidden="true"
          />
          <div className="mx-auto max-w-7xl px-6 py-32 sm:py-40 lg:px-8">
            <div className="mx-auto max-w-2xl lg:mx-0 lg:grid lg:max-w-none lg:grid-cols-2 lg:gap-x-16 lg:gap-y-6 xl:grid-cols-1 xl:grid-rows-1 xl:gap-x-8">
              <div className="max-w-2xl lg:col-span-2 xl:col-auto">
                <h2 className="text-base font-semibold leading-7 text-indigo-600">Nuestra Trayectoria</h2>
                <h1 className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                  Somos una empresa con historia.
                </h1>
                <div className="mt-6 h-1 w-20 bg-indigo-600 rounded-full"></div>
              </div>
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
                className="mt-10 aspect-[5/7] w-full max-w-lg rounded-3xl object-cover shadow-2xl ring-1 ring-gray-900/10 sm:mt-16 lg:mt-0 lg:max-w-none xl:row-span-2 xl:row-end-2 xl:mt-36 transition-transform duration-500 hover:scale-[1.02]"
                priority
              />
            </div>
          </div>
          <div className="absolute inset-x-0 bottom-0 -z-10 h-24 bg-gradient-to-t from-white sm:h-32" />
        </div>
        {/* Timeline section - Rediseño Minimalista y Lineal */}
        <div className="relative py-24 sm:py-32 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center mb-20">
              <h2 className="text-sm font-bold tracking-widest text-indigo-600 uppercase">Trayectoria</h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Nuestra Historia</p>
              <div className="mt-4 h-1 w-12 bg-indigo-600 mx-auto rounded-full"></div>
            </div>
            
            <div className="mx-auto grid max-w-2xl grid-cols-1 gap-12 lg:mx-0 lg:max-w-none lg:grid-cols-4">
              {timeline.map((item) => (
                <div 
                  key={item.name} 
                  className="relative pl-8 group transition-all duration-300"
                >
                  <div className="absolute left-0 top-0 bottom-0 w-px bg-gray-100 group-hover:bg-indigo-500 transition-colors duration-500" />
                  <div className="absolute -left-[5px] top-0 h-2.5 w-2.5 rounded-full border-2 border-white bg-gray-300 group-hover:bg-indigo-500 transition-all duration-500 group-hover:scale-125" />
                  
                  <div className="flex flex-col">
                    <time
                      dateTime={item.dateTime}
                      className="text-xs font-bold uppercase tracking-widest text-indigo-500 transition-colors duration-300"
                    >
                      {item.date}
                    </time>
                    <h3 className="mt-4 text-xl font-bold text-gray-900 transition-colors duration-300 group-hover:text-indigo-600">
                      {item.name}
                    </h3>
                    <p className="mt-3 text-base leading-relaxed text-gray-500 font-light">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Logo cloud section - Minimalista */}
        <div className="relative py-24 bg-slate-50/30">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center mb-16">
              <p className="text-sm font-semibold tracking-widest text-gray-400 uppercase">Marcas que confían en nosotros</p>
            </div>
            <div className="mx-auto grid grid-cols-2 items-center gap-x-12 gap-y-12 sm:grid-cols-4 lg:gap-x-20">
              {[
                { src: "/whirlpool.png", alt: "Whirlpool" },
                { src: "/lg.png", alt: "LG" },
                { src: "/samsung.png", alt: "Samsung" },
                { src: "/bosch.png", alt: "Bosch" },
              ].map((brand) => (
                <div key={brand.alt} className="flex justify-center">
                  <Image
                    src={brand.src}
                    alt={brand.alt}
                    width={140}
                    height={70}
                    className="max-h-12 w-auto object-contain opacity-40 grayscale transition-all duration-500 hover:opacity-100 hover:grayscale-0 hover:scale-110"
                    priority
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Stats section - Ultra Minimalista */}
        <div className="py-20 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 border-t border-gray-50 pt-20">
            <dl className="flex flex-wrap justify-center gap-x-12 gap-y-10 sm:gap-x-24">
              {[
                { name: 'Años de experiencia', value: '94+' },
                { name: 'Clientes satisfechos', value: '50k+' },
                { name: 'Productos vendidos', value: '100k+' },
                { name: 'Ciudades alcanzadas', value: '20+' },
              ].map((stat) => (
                <div key={stat.name} className="flex flex-col items-center">
                  <dd className="text-3xl font-extralight tracking-tighter text-gray-900">
                    {stat.value}
                  </dd>
                  <dt className="text-[9px] font-medium uppercase tracking-[0.3em] text-gray-400 mt-2">
                    {stat.name}
                  </dt>
                </div>
              ))}
            </dl>
          </div>
        </div>
        {/* Content section - Nuestros Clientes: Rediseño Final Prolijo y Robusto */}
        <section className="relative py-24 sm:py-32 overflow-hidden bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:items-center lg:gap-x-16">
              
              {/* Bloque de Texto: Elegante y con aire */}
              <div className="max-w-xl">
                <h2 className="text-base font-semibold leading-7 text-indigo-600">Nuestra Comunidad</h2>
                <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                  Confianza que nos impulsa
                </p>
                <div className="mt-6 h-1 w-12 bg-indigo-600 rounded-full"></div>
                
                <div className="mt-10 space-y-8 text-lg leading-8 text-gray-600">
                  <p>
                    En <span className="font-semibold text-gray-900">Capellari</span>, nuestros clientes son más que una prioridad, son
                    el corazón de nuestra empresa. Dedicamos todo nuestro esfuerzo
                    en proporcionarles un servicio excepcional y ofrecerles los
                    productos de la más alta calidad.
                  </p>
                  <p>
                    Nuestro objetivo es brindarles una experiencia de compra sin
                    igual, para que puedan encontrar los electrodomésticos que
                    mejor se adapten a sus necesidades y estilo de vida.
                  </p>
                </div>

                <div className="mt-12 flex items-center gap-x-6">
                  <BackButton />
                </div>
              </div>

              {/* Bloque de Imágenes: Collage "Masonry" prolijo que NO colapsa */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-8">
                <div className="space-y-4 lg:space-y-8">
                  <div className="relative aspect-[4/5] overflow-hidden rounded-3xl shadow-2xl ring-1 ring-gray-900/5">
                    <Image
                      src="/clientes.jpg"
                      alt="Clientes en tienda Capellari"
                      fill
                      className="object-cover transition-transform duration-700 hover:scale-110"
                      priority
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                  <div className="relative aspect-square overflow-hidden rounded-3xl shadow-xl ring-1 ring-gray-900/5">
                    <Image
                      src="/clientes2.jpg"
                      alt="Asesoría personalizada"
                      fill
                      className="object-cover transition-transform duration-700 hover:scale-110"
                      priority
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                </div>
                <div className="space-y-4 lg:space-y-8 lg:pt-20">
                  <div className="relative aspect-square overflow-hidden rounded-3xl shadow-xl ring-1 ring-gray-900/5">
                    <Image
                      src="/clientes3.jpg"
                      alt="Experiencia de compra"
                      fill
                      className="object-cover transition-transform duration-700 hover:scale-110"
                      priority
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                  <div className="relative aspect-[4/5] overflow-hidden rounded-3xl shadow-2xl ring-1 ring-gray-900/5">
                    <Image
                      src="/clientes1.jpg"
                      alt="Satisfacción del cliente"
                      fill
                      className="object-cover transition-transform duration-700 hover:scale-110"
                      priority
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>
      </main>
    </>
  );
}
