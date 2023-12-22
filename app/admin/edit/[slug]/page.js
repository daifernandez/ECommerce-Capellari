import EditForm from "@/components/admin/editForm";

const EditPage = async ({ params }) => {
  const { slug } = params;
  const item = await fetch(`${process.env.NEXT_PUBLIC_VERCEL_URL}/api/product/${slug}`, {
    cache: "no-store",
  }).then((res) => res.json());

  return (
    <div>
      <EditForm item={item} />
    </div>
  );
};

export default EditPage;
