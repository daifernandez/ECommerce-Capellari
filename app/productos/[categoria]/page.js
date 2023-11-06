export async function generateMetadata({ params, serchParams }, parent) {
  return {
    title: `Capellari - ${params.categoria}`,
  };
}

export default function Productos({ params }) {
  console.log(params);
  return (
    <div>
      <h1>Productos:</h1>
      {params.categoria}
    </div>
  );
}
