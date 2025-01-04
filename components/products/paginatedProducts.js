'use client';
import { useState } from 'react';
import ProductCard from "./productCard";

export default function PaginatedProducts({ items }) {
  const [paginaActual, setPaginaActual] = useState(1);
  const productosPorPagina = 6;

  // Calcular índices para el slice
  const indexUltimoProducto = paginaActual * productosPorPagina;
  const indexPrimerProducto = indexUltimoProducto - productosPorPagina;
  const productosActuales = items.slice(indexPrimerProducto, indexUltimoProducto);
  const totalPaginas = Math.ceil(items.length / productosPorPagina);

  return (
    <div className="mb-20">
      <section className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:gap-x-8 xl:grid-cols-3">
        {productosActuales.map((item) => (
          <ProductCard key={item.slug} item={item} />
        ))}
      </section>

      {/* Controles de paginación */}
      <div className="flex justify-center mt-8 gap-2">
        <button
          onClick={() => setPaginaActual(Math.max(1, paginaActual - 1))}
          disabled={paginaActual === 1}
          className="px-4 py-2 text-sm font-medium text-navy-600 bg-white border border-navy-200 rounded-md hover:bg-navy-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          ← Anterior
        </button>
        
        <div className="hidden sm:flex gap-1">
          {[...Array(totalPaginas)].map((_, index) => {
            // Mostrar solo algunas páginas para evitar sobrecarga visual
            if (
              index === 0 ||
              index === totalPaginas - 1 ||
              (index >= paginaActual - 2 && index <= paginaActual + 2)
            ) {
              return (
                <button
                  key={index}
                  onClick={() => setPaginaActual(index + 1)}
                  className={`px-4 py-2 text-sm font-medium rounded-md
                    ${paginaActual === index + 1 
                      ? 'bg-navy-900 text-white border border-navy-900' 
                      : 'text-navy-600 bg-white border border-navy-200 hover:bg-navy-50'
                    }`}
                >
                  {index + 1}
                </button>
              );
            } else if (
              index === paginaActual - 3 ||
              index === paginaActual + 3
            ) {
              return <span key={index} className="px-2 py-2 text-navy-400">...</span>;
            }
            return null;
          })}
        </div>

        {/* Indicador móvil */}
        <div className="sm:hidden text-sm text-navy-600">
          <span>Página {paginaActual} de {totalPaginas}</span>
        </div>

        <button
          onClick={() => setPaginaActual(Math.min(totalPaginas, paginaActual + 1))}
          disabled={paginaActual === totalPaginas}
          className="px-4 py-2 text-sm font-medium text-navy-600 bg-white border border-navy-200 rounded-md hover:bg-navy-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Siguiente →
        </button>
      </div>
    </div>
  );
} 
