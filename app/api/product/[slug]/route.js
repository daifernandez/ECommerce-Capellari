import { NextResponse } from "next/server";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../../firebase/config";

export async function GET(_, { params }) {
  const { slug } = params;
  const docRef = doc(db, "products", slug);
  const docSnap = await getDoc(docRef);

  return NextResponse.json(docSnap.data());
}

// export async function DELETE(slug) {
//   const docRef = doc(db, "products", slug);
//   await docRef.delete();
//   return NextResponse.redirect("/admin/productos");
// }

// export async function PATCH(slug, body) {
//   const docRef = doc(db, "products", slug);
//   await docRef.update(body);
//   return NextResponse.redirect("/admin/productos");
// }

// export async function POST(_, body) {
//   const docRef = doc(db, "products", body.slug);
//   await docRef.set(body);
//   return NextResponse.redirect("/admin/productos");
// }
