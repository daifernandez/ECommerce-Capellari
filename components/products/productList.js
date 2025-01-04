import NoProducts from "./noProducts";
import PaginatedProducts from "./paginatedProducts";

export default async function ProductsList({ categoria }) {
  const items = await fetch(
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

  if (items === undefined || items.length === 0) {
    return <NoProducts />;
  }

  return <PaginatedProducts items={items} />;
}
