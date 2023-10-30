"use client";

import { useState } from "react";
import { PlusIcon } from "@heroicons/react/24/outline";

const filters = [
  {
    id: "category",
    name: "Categoria",
    options: [
      { value: "ofertas", label: "ofertas" },
      { value: "tv", label: "tv" },
      { value: "heladeras", label: "heladeras" },
      { value: "lavarropas", label: "lavarropas" },
      { value: "cocinas", label: "cocinas" },
      { value: "aires", label: "aires" },
      { value: "aspiradoras", label: "aspiradoras" },
      { value: "audio", label: "audio" },
      { value: "hornos", label: "hornos" },
      { value: "microondas", label: "microondas" },
    ],
  },
  {
    id: "Marca",
    name: "Marca",
    options: [
      { value: "marca", label: "marca" },
      { value: "marca1", label: "marca1" },
      { value: "marca3", label: "marca3" },
    ],
  },
  {
    id: "Precio",
    name: "Precio",
    options: [
      { value: "0-100", label: "0-100" },
      { value: "100-200", label: "100-200" },
      { value: "200-300", label: "200-300" },
    ],
  },
  {
    id: "Rating",
    name: "Rating",
    options: [
      { value: "1", label: "1" },
      { value: "2", label: "2" },
      { value: "3", label: "3" },
    ],
  },
];

export default function Filters() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  return (
    <div>
      <aside>
        <h2 className="sr-only">Filters</h2>

        <button
          type="button"
          className="inline-flex items-center lg:hidden"
          onClick={() => setMobileFiltersOpen(true)}
        >
          <span className="text-sm font-medium text-gray-700">Filters</span>
          <PlusIcon
            className="ml-1 h-5 w-5 flex-shrink-0 text-gray-400"
            aria-hidden="true"
          />
        </button>

        <div className="hidden lg:block">
          <form className="space-y-10 divide-y divide-gray-200">
            {filters.map((section, sectionIdx) => (
              <div
                key={section.name}
                className={sectionIdx === 0 ? null : "pt-10"}
              >
                <fieldset>
                  <legend className="block text-sm font-medium text-gray-900">
                    {section.name}
                  </legend>
                  <div className="space-y-3 pt-6">
                    {section.options.map((option, optionIdx) => (
                      <div key={option.value} className="flex items-center">
                        <input
                          id={`${section.id}-${optionIdx}`}
                          name={`${section.id}[]`}
                          defaultValue={option.value}
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                        <label
                          htmlFor={`${section.id}-${optionIdx}`}
                          className="ml-3 text-sm text-gray-600"
                        >
                          {option.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </fieldset>
              </div>
            ))}
          </form>
        </div>
      </aside>
    </div>
  );
}
