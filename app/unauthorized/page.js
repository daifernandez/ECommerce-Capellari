export default function Unauthorized() {
  return (
    <div className="bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-base font-semibold leading-7 text-slate-500">
          Lo sentimos, no tienes permisos para acceder a esta página.
        </p>
        <h2 className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
          Acceso denegado
        </h2>
        <p className="mt-6 text-lg leading-8 text-gray-600">
          Por favor, contacta con el administrador del sistema para solicitar
          acceso en caso de ser necesario.
        </p>
      </div>
    </div>
  );
}
