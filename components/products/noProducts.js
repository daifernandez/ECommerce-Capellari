export default function NoProducts() {
  return (
    <div className="bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-base font-semibold leading-7 text-slate-600">
          Lo sentimos
        </p>
        <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          No hay productos disponibles
        </h2>
        <p className="mt-6 text-lg leading-8 text-gray-600">
          Te invitamos a visitar otras categorías
        </p>
      </div>
    </div>
  );
}
