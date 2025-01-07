import { NextResponse } from "next/server";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../../firebase/config";

export async function GET(_, { params }) {
  const { slug } = await params;
  const docRef = doc(db, "products", slug);
  const docSnap = await getDoc(docRef);

  return NextResponse.json(docSnap.data());
}
