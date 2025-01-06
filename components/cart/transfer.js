import { BuildingLibraryIcon, UserIcon, QrCodeIcon, BanknotesIcon } from '@heroicons/react/24/outline'

export default function Transfer() {
  const transferencia = {
    destinatario: "Capellari",
    cbu: "1234567891234567891234",
    alias: "capellari",
    banco: "Banco Patagonia",
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 mt-8 mb-8 hover:shadow-md transition-shadow duration-300">
      <h3 className="text-lg font-medium mb-4 flex items-center">
        <BanknotesIcon className="h-6 w-6 mr-2 stroke-[1.2]" />
        Datos de Transferencia Bancaria
      </h3>
      
      <div className="space-y-3">
        <div className="group p-2.5 rounded-lg hover:bg-gray-50 transition-colors duration-200">
          <div className="flex items-center space-x-3">
            <div className="w-5 h-5 flex items-center justify-center">
              <UserIcon className="h-4.5 w-4.5 stroke-[1.3]" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-gray-500 mb-0.5">Destinatario</p>
              <p className="font-medium">{transferencia.destinatario}</p>
            </div>
          </div>
        </div>

        <div className="group p-2.5 rounded-lg hover:bg-gray-50 transition-colors duration-200">
          <div className="flex items-center space-x-3">
            <div className="w-5 h-5 flex items-center justify-center">
              <BanknotesIcon className="h-4.5 w-4.5 stroke-[1.3]" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-gray-500 mb-0.5">CBU</p>
              <p className="font-medium font-mono">{transferencia.cbu}</p>
            </div>
          </div>
        </div>

        <div className="group p-2.5 rounded-lg hover:bg-gray-50 transition-colors duration-200">
          <div className="flex items-center space-x-3">
            <div className="w-5 h-5 flex items-center justify-center">
              <QrCodeIcon className="h-4.5 w-4.5 stroke-[1.3]" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-gray-500 mb-0.5">Alias</p>
              <p className="font-medium">{transferencia.alias}</p>
            </div>
          </div>
        </div>

        <div className="group p-2.5 rounded-lg hover:bg-gray-50 transition-colors duration-200">
          <div className="flex items-center space-x-3">
            <div className="w-5 h-5 flex items-center justify-center">
              <BuildingLibraryIcon className="h-4.5 w-4.5 stroke-[1.3]" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-gray-500 mb-0.5">Banco</p>
              <p className="font-medium">{transferencia.banco}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-gray-100">
        <p className="text-sm text-gray-500">
          Una vez realizada la transferencia, envíanos el comprobante por WhatsApp para confirmar tu pedido.
        </p>
      </div>
    </div>
  );
}
