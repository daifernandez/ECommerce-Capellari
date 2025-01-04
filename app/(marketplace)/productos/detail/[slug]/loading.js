export default function Loading() {
  return (
    <main className="relative isolate min-h-full bg-white">
      <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
        {/* Esqueleto del producto */}
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-2">
          {/* Esqueleto de la imagen */}
          <div className="aspect-square w-full animate-pulse rounded-xl bg-gray-200"></div>

          {/* Esqueleto de la información */}
          <div className="space-y-8 px-4 sm:px-6">
            {/* Título */}
            <div className="h-8 w-3/4 animate-pulse rounded-lg bg-gray-200"></div>
            
            {/* Precio */}
            <div className="h-10 w-1/3 animate-pulse rounded-lg bg-gray-200"></div>
            
            {/* Descripción */}
            <div className="space-y-3">
              <div className="h-4 w-full animate-pulse rounded bg-gray-200"></div>
              <div className="h-4 w-5/6 animate-pulse rounded bg-gray-200"></div>
              <div className="h-4 w-4/6 animate-pulse rounded bg-gray-200"></div>
            </div>

            {/* Botones */}
            <div className="flex gap-4">
              <div className="h-12 w-1/2 animate-pulse rounded-lg bg-gray-200"></div>
              <div className="h-12 w-1/2 animate-pulse rounded-lg bg-gray-200"></div>
            </div>
          </div>
        </div>

        {/* Mensaje de carga */}
        <div className="mt-8 text-center">
          <div className="flex justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-navy-900 border-t-transparent"></div>
          </div>
          <p className="mt-4 text-sm text-gray-600">
            Cargando detalles del producto...
          </p>
        </div>
      </div>
    </main>
  );
}
