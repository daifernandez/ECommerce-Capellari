import CategoriesMenu from "@/components/products/categoriesMenu";
import Title from "@/components/ui/title";
import Search from "@/components/ui/search";

export default function ProductosPage() {
  const handleSearch = (searchTerm) => {
    // Implementar la lógica de búsqueda aquí
    console.log('Buscando:', searchTerm)
  }

  return (
    <div className="container mx-auto px-4">
      <Title>Productos</Title>
      <div className="mb-6">
        <Search onSearch={handleSearch} />
      </div>
      <CategoriesMenu />
    </div>
  )
} 
