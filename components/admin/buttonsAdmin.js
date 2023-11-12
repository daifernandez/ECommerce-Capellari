export default function ButtonsAdmin() {
  return (
    <div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
      <button
        type="button"
        className="text-sm font-semibold leading-6 text-gray-900"
      >
        Cancelar
      </button>
      <button
        type="submit"
        className="rounded-md bg-slate-700 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-slate-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-600"
      >
        Guardar
      </button>
    </div>
  );
}
