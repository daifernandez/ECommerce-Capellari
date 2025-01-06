import { 
  ClipboardDocumentListIcon, 
  UserCircleIcon,
  CogIcon
} from '@heroicons/react/24/outline';

export default function Welcome() {
  return (
    <div className="bg-gradient-to-b from-white to-navy-50/30 px-6 py-16 sm:py-24 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <div className="flex justify-center mb-6">
          <UserCircleIcon className="h-16 w-16 text-navy-700" />
        </div>
        <p className="text-base font-semibold leading-7 text-navy-600">
          Panel de Administrador
        </p>
        <h2 className="mt-2 text-4xl font-bold tracking-tight text-navy-900 sm:text-6xl">
          Bienvenido
        </h2>
        <p className="mt-6 text-lg leading-8 text-navy-600">
          Estas son las funciones disponibles en tu panel de administración
        </p>
      </div>

      <div className="mt-16 mx-auto max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-navy-100">
            <ClipboardDocumentListIcon className="h-8 w-8 text-navy-700 mb-4" />
            <h3 className="text-xl font-semibold text-navy-900 mb-2">Agregar Productos</h3>
            <p className="text-navy-600">En la sección de agregar productos podrás:</p>
            <ul className="mt-3 space-y-2 text-navy-600 list-disc list-inside">
              <li>Subir imágenes del producto</li>
              <li>Establecer precios y stock</li>
              <li>Definir categorías y etiquetas</li>
              <li>Añadir descripciones detalladas</li>
            </ul>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-navy-100">
            <CogIcon className="h-8 w-8 text-navy-700 mb-4" />
            <h3 className="text-xl font-semibold text-navy-900 mb-2">Gestión de Productos</h3>
            <p className="text-navy-600">En la sección de gestión podrás:</p>
            <ul className="mt-3 space-y-2 text-navy-600 list-disc list-inside">
              <li>Ver todos tus productos listados</li>
              <li>Actualizar información existente</li>
              <li>Gestionar el inventario</li>
              <li>Eliminar productos obsoletos</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-navy-600">
            Utiliza la barra de navegación superior para acceder a cada sección
          </p>
        </div>
      </div>
    </div>
  );
}
