
export default function StreamingList() {
  return (
    <>
      <main className="relative isolate min-h-full">
        <div className="mx-auto max-w-7xl px-6 py-32 text-center sm:py-40 lg:px-8">
          <p className="text-base font-semibold leading-8">Cargando...</p>

          <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-5xl">
            Por favor espera
          </h1>
          <p className="mt-4 text-base sm:mt-6">
            Estamos cargando los productos
          </p>
        </div>
      </main>
    </>
  );
}
