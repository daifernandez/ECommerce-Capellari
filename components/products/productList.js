import NoProducts from "./noProducts";
import PaginatedProducts from "./paginatedProducts";

export default async function ProductsList({ categoria, searchTerm }) {
  try {
    const baseUrl = process.env.NODE_ENV === 'production'
      ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
      : 'http://localhost:3000';

    let items = await fetch(
      `${baseUrl}/api/productos/${categoria || 'todos'}`,
      {
        cache: "no-store",
        next: {
          tags: ["productos"],
        },
      }
    ).then((res) => res.json());

    // Filtrar productos si hay un término de búsqueda
    if (searchTerm) {
      items = items.filter(item => 
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.brand.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (!items || items.length === 0) {
      return <NoProducts searchTerm={searchTerm} />;
    }

    return <PaginatedProducts items={items} />;
  } catch (error) {
    console.error('Error fetching products:', error);
    return <NoProducts searchTerm={searchTerm} />;
  }
}
