export default function Search() {
  return (
    <div>
      <div className="mt-10">
        <input
          type="producto"
          name="producto"
          id="producto"
          className="block w-80 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-slate-600 sm:text-sm sm:leading-6"
          placeholder="Buscar productos"
        />
      </div>
    </div>
  );
}
