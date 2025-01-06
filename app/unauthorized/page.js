'use client';
import { useRouter } from 'next/navigation';
import { ArrowLeftIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';

export default function Unauthorized() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-gray-50">
      <div className="max-w-2xl px-8 py-16 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 mx-4 border border-gray-100">
        <div className="text-center">
          {/* Ícono más sutil */}
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-50 mb-8">
            <ExclamationCircleIcon className="h-8 w-8 text-red-400" />
          </div>

          <p className="text-base font-medium text-red-500 mb-3">
            Lo sentimos, no tienes permisos para acceder a esta página.
          </p>
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">
            Acceso denegado
          </h2>
          <p className="text-base leading-relaxed text-gray-600 mb-10 max-w-lg mx-auto">
            Por favor, contacta con el administrador del sistema para solicitar
            acceso en caso de ser necesario.
          </p>

          {/* Botón más sutil */}
          <button
            onClick={() => router.push('/')}
            className="group inline-flex items-center px-5 py-2.5 border border-gray-200 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 hover:text-navy-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 transition-all duration-200 ease-in-out"
          >
            <ArrowLeftIcon className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform duration-200" />
            Volver a la página principal
          </button>

          {/* Texto de soporte más sutil */}
          <p className="mt-8 text-sm text-gray-400 font-light">
            Si crees que esto es un error, por favor{' '}
            <a href="#" className="text-navy-500 hover:text-navy-600 underline-offset-4 hover:underline">
              contacta con soporte técnico
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
