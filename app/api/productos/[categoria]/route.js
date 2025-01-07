import { NextResponse } from "next/server";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../../firebase/config";

export async function GET(request, { params }) {
  const { categoria } = await params;
  const productosRef = collection(db, "products");

  const q =
    categoria === "todos"
      ? productosRef
      : query(productosRef, where("category", "==", categoria));

  const productosSnapshot = await getDocs(q);
  const docs = productosSnapshot.docs.map((doc) => doc.data());
  return NextResponse.json(docs);
}
