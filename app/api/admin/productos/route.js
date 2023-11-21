import { NextResponse } from "next/server";
import { mockData } from "@/data/products";

export async function POST(request) {
  try {
    const { title, description, image, category, price, brand, stock } =
      request.body;
    // Validación de datos
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
    mockData.push({
      ...newProduct,
      slug: newProduct.title.replace(/\s+/g, "-"),
    });
    //guarda el nuevo producto en la base de datos
    await newProduct.save();
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
  const slug = request.nextUrl.query.slug;
  const index = mockData.findIndex((product) => product.slug === slug);

  if (index !== -1) {
    mockData.splice(index, 1);
    return new NextResponse("Producto eliminado exitosamente");
  } else {
    return new NextResponse("Producto no encontrado", { status: 404 });
  }
}

export async function PUT(request) {
  const slug = request.nextUrl.query.slug;
  const index = mockData.findIndex((product) => product.slug === slug);
  const { title, description, image, category, price, brand, stock } =
    await request.json();

  if (index !== -1) {
    mockData[index] = {
      title,
      description,
      image,
      category,
      price,
      brand,
      stock,
    };
    return new NextResponse("Producto actualizado exitosamente");
  } else {
    return new NextResponse("Producto no encontrado", { status: 404 });
  }
}
