import NoProducts from "./noProducts";
import PaginatedProducts from "./paginatedProducts";

export default async function ProductsList({ categoria, searchTerm }) {
  let items = await fetch(
    `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/productos/${categoria}`,
    {
      cache: "no-store",
      next: {
        tags: ["productos"],
      },
    }
  )
    .then((res) => res.json())
    .catch((err) => console.log(err));

  // Filtrar productos si hay un término de búsqueda
  if (searchTerm) {
    items = items.filter(item => 
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.brand.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }

  if (items === undefined || items.length === 0) {
    return <NoProducts searchTerm={searchTerm} />;
  }

  return <PaginatedProducts items={items} />;
}
