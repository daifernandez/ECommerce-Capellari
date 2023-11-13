import ProductDetail from "@/components/products/productDetail";

export default function DetailPage({ params }) {
  const { slug } = params;

  return (
    <main className="container m-auto mt-10">
      <ProductDetail slug={slug} />
    </main>
  );
}
