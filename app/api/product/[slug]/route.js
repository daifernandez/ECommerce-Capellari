import { mockData } from "@/data/products";
import { NextResponse } from "next/server";

const sleep = (timer) => new Promise((resolve) => setTimeout(resolve, timer));

export async function GET(_, { params }) {
  const { slug } = params;

  const data = mockData.find((product) => product.slug === slug);
  await sleep(1000);
  if (!data) {
    return NextResponse.error(new Error("Producto no encontrado"), 404);
  } else {
    console.log(data);
    return NextResponse.json(data);
  }
}
