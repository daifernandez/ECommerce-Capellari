import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase/config";

export const getProducts = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "products"));
    const products = [];
    querySnapshot.forEach((doc) => {
      products.push({ ...doc.data(), id: doc.id });
    });
    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}; 
