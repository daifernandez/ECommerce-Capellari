import { NextResponse } from "next/server";
import { mockData } from "@/data/products";

export async function POST(request) {
  try {
    const { title, description, image, category, price, brand, stock } =
      await request.json();
    // Validaacion de datos
    if (
      !title ||
      !description ||
      !image ||
      !category ||
      !price ||
      !brand ||
      !stock
    ) {
      return NextResponse.json(
        { error: "Todos los campos son requeridos" },
        400
      );
    }
    // Crear un nuevo producto
    const newProduct = {
      title,
      description,
      image,
      category,
      price,
      brand,
      stock,
    };
    // Añadir el nuevo producto a la lista de productos
    productos.push({ mockData });
    return NextResponse.json({ message: "Producto creado exitosamente" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Hubo un error al procesar tu solicitud" },
      500
    );
  }
}

export async function DELETE(request) {
  try {
    const { id } = await request.json();

    // Validación de datos
    if (!id) {
      return NextResponse.json(
        { error: "El ID del producto es requerido" },
        400
      );
    }

    // Verificar si el producto existe
    const product = mockData.find((product) => product.id === id);
    if (!product) {
      return NextResponse.json({ error: "Producto no encontrado" }, 404);
    }

    // Eliminar producto
    product = mockData.filter((product) => product.id !== id);

    return NextResponse.json({ message: "Producto eliminado exitosamente" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Hubo un error al procesar tu solicitud" },
      500
    );
  }
}

export async function PUT(request) {
  try {
    const { id, data } = await request.body.json();
    let product = mockData.find((product) => product.id === id);

    if (!product) {
      return NextResponse.json({ error: "Producto no encontrado" }, 404);
    }

    // Actualizar producto
    product = { ...product, ...data };
    return NextResponse.json({ message: "Producto actualizado exitosamente" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Hubo un error al procesar tu solicitud" },
      500
    );
  }
}
