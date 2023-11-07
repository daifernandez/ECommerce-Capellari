"use client";
import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();
  return (
    <button
      onClick={() => router.back()}
      className="text-sm font-semibold leading-7"
    >
      <span aria-hidden="true">&larr;</span> Volver al inicio
    </button>
  );
}
