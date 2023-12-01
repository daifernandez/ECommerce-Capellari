import { NextResponse } from "next/server";
import { docs, getDocs, collection } from "firebase/firestore";
import { db } from "../../../../firebase/config";

export async function getProducts() {
  const productsRef = collection(db, "products");
  const productsSnapshot = await getDocs(productsRef);
  const products = productsSnapshot.docs.map((doc) => doc.data());
  return products;
}

