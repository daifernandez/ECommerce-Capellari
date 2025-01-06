export default function StreamingList() {
  return (
    <main className="relative isolate min-h-full">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="flex flex-col items-center justify-center">
          {/* Animación de carga */}
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-navy-900 mb-8"></div>
          
          <h1 className="text-3xl font-bold tracking-tight text-navy-900 sm:text-5xl">
            Cargando productos
          </h1>
          
          {/* Animación de puntos suspensivos */}
          <div className="mt-4 flex space-x-1 text-navy-900 text-2xl font-bold">
            <span className="animate-bounce delay-100">.</span>
            <span className="animate-bounce delay-200">.</span>
            <span className="animate-bounce delay-300">.</span>
          </div>
          
          <p className="mt-6 text-base text-navy-600 sm:mt-8">
            Estamos preparando todo para ti
          </p>
          
          {/* Barra de progreso animada */}
          <div className="w-64 h-2 bg-navy-100 rounded-full mt-8 overflow-hidden">
            <div className="h-full bg-navy-900 rounded-full animate-loading-bar"></div>
          </div>
        </div>
      </div>
    </main>
  );
}
