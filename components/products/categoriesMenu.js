"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Links = [
  { label: "Todos", href: "/productos/todos" },
  { label: "Smart TV", href: "/productos/smart-tv" },
  { label: "Heladeras", href: "/productos/heladeras" },
  { label: "Lavarropas", href: "/productos/lavarropas" },
  { label: "Cocinas", href: "/productos/cocinas" },
  { label: "Refrigeracion", href: "/productos/refrigeracion" },
  { label: "Aspiradoras", href: "/productos/aspiradoras" },
  { label: "Hornos", href: "/productos/hornos" },
  { label: "Microondas", href: "/productos/microondas" },
  { label: "Ventilacion", href: "/productos/ventilacion" },
];

export default function CategoriesMenu() {
  const pathName = usePathname();

  return (
    <aside className="flex flex-col gap-3 mt-8 mb-8">
      {Links.map((link) => (
        <Link
          key={link.label}
          href={link.href}
          className={`${
            pathName === link.href ? "font-semibold border-b " : ""
          } py-2`}
        >
          {link.label}
        </Link>
      ))}
    </aside>
  );
}
