"use client";
import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();
  return (
    <button
      onClick={() => router.back()}
      className="group flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors duration-200"
    >
      <span 
        aria-hidden="true" 
        className="inline-block transition-transform duration-200 group-hover:-translate-x-1"
      >
        &larr;
      </span>
      <span className="relative">
        Volver al inicio
        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gray-900 transition-all duration-200 group-hover:w-full"/>
      </span>
    </button>
  );
}
