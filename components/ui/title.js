import Image from "next/image";
import React from "react";
import Link from "next/link";

export default function Title() {
  return (
    <div className="bg-gray-900">
      <div className="isolate overflow-hidden pt-14 relative">
        <Image
          src={"/fondo.jpg"}
          alt="Electrodomésticos de Capellini"
          width={1920}
          height={1080}
          className={"absolute inset-0 h-full w-full object-cover opacity-25 blur-sm"}
          priority
        />

        <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
        <div className="mx-auto max-w-2xl py-24 sm:py-36 lg:py-44">
          <div className="text-center">
            <Image
              className="mx-auto hover:scale-105 transition-transform duration-300 w-auto h-[120px]"
              src="/capellari.svg"
              alt="title"
              width={350}
              height={350}
              priority
            />
            <p className="mt-6 text-lg font-medium leading-8 text-gray-300">
              Electrodomésticos de alta calidad para tu hogar.
            </p>
            <div className="sm:mb-8 sm:flex sm:justify-center mb-6 mt-8">
              <div className="relative rounded-full px-5 py-2 text-sm leading-6 text-gray-300 ring-1 ring-white/10 hover:ring-yellow-500 transition-all duration-300 hover:scale-105 hover:bg-white/5">
                Descubre la calidad y tradición de Capellari.{" "}
                <Link href="/about" className="font-semibold text-white">
                  <span className="absolute inset-0" aria-hidden="true" />
                  Ver más <span aria-hidden="true">&rarr;</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
