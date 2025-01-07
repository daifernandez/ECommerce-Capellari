import ProductDetail from "@/components/products/productDetail";

export default async function DetailPage({ params }) {
  const { slug } = await params;

  return (
    <main className="container m-auto mt-10">
      <ProductDetail slug={slug} />
    </main>
  );
}
