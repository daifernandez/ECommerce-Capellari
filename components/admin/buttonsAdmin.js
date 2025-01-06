export default function ButtonsAdmin() {
  return (
    <div className="flex items-center justify-end gap-x-4 border-t border-gray-900/10 px-6 py-6 sm:px-8">
      <button
        type="button"
        className="rounded-md px-3.5 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-navy-600 focus:ring-offset-2 transition-colors"
      >
        Cancelar
      </button>
      <button
        type="submit"
        className="rounded-md bg-navy-900 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-navy-800 focus:outline-none focus:ring-2 focus:ring-navy-600 focus:ring-offset-2 transition-all duration-200 ease-in-out"
      >
        Guardar
      </button>
    </div>
  );
}
