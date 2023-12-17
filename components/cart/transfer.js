export default function Transfer() {
  const transferencia = {
    destinatario: "Capellari",
    cbu: "1234567891234567891234",
    alias: "capellari",
    banco: "Banco Patagonia",
  };

  return (
    <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md flex items-center space-x-4 mt-10 mb-10">
      <div>
        <div className="mt-4">
          <p className="block text-sm font-medium text-gray-700 mb-2">
            Nombre del destinatario: {transferencia.destinatario}
          </p>
          <p className="block text-sm font-medium text-gray-700">
            CBU: {transferencia.cbu}
          </p>
          <p className="block text-sm font-medium text-gray-700">
            Alias: {transferencia.alias}
          </p>
          <p className="block text-sm font-medium text-gray-700">
            Banco: {transferencia.banco}
          </p>
        </div>
      </div>
    </div>
  );
}
