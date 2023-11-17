import { NextResponse } from "next/server";
import { mockData } from "@/data/products";

const sleep = (timer) => new Promise((resolve) => setTimeout(resolve, timer));

export async function GET(request, { params }) {
  const { categoria } = params;
  const data =
    categoria === "todos"
      ? mockData
      : mockData.filter((item) => item.category === categoria);

  await sleep(1000);
  return NextResponse.json(data);
}
