import Image from "next/image";
import ProductClient from "../Client/ProductoClient";
import ProductoNoEncontrado from "./ProductoNoEncontrado";
// Mock server data fetching function (simulando búsqueda por nombre de producto)
async function fetchProductData(productName: string) {
  // Aquí simulo una búsqueda, en la vida real esto vendría de una base de datos o API
  const products = {
    "camisa-azul": {
      name: "Camisa Outdoor Equipo Azul",
      price: "$1,299.00 MXN",
      sku: "PRD-12345",
      category: "Ropa / Camisetas",
      imageSrc: "/images/Producto/azul.webp",
      stockBySize: {
        EECH: 5,
        ECH: 8,
        CH: 12,
        M: 15,
        G: 10,
        EG: 7,
        EEG: 4,
        EEEG: 2,
      },
    },

    "camisa-roja": {
        name: "Camisa Outdoor Equipo Roja",
        price: "$1,299.00 MXN",
        sku: "PRD-546433",
        category: "Ropa / Camisetas",
        imageSrc: "/images/Producto/rojo.webp",
        stockBySize: {
          EECH: 90,
          ECH: 80,
          CH: 70,
          M: 60,
          G: 50,
          EG: 40,
          EEG: 30,
          EEEG: 20,
        },
      },
      "camisa-verde": {
        name: "Camisa Outdoor Equipo Verde",
        price: "$1,299.00 MXN",
        sku: "PRD-546433",
        category: "Ropa / Camisetas",
        imageSrc: "/images/Producto/verde.jpg",
        stockBySize: {
          EECH: 100,
          ECH:  0,
          CH: 80,
          M: 560,
          G: 30,
          EG: 0,
          EEG: 40,
          EEEG: 30,
        },
      },
    // Otros productos podrían ir aquí
  };

  return products[productName as keyof typeof products] || {
    name: "Producto no encontrado",
    price: "$0.00 MXN",
    sku: "N/A",
    category: "N/A",
    imageSrc: "/images/placeholder.webp",
    stockBySize: {},
  };
}

interface ProductPageProps {
  params: { productos: string };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const productName = params.productos;
  const productData = await fetchProductData(productName);

  // Check if the product was found
  if (!productData || productData.name === "Producto no encontrado") {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-60px)]">
        <ProductoNoEncontrado />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 h-auto">
      {/* Left side - Full height image */}
      <div className="relative h-[calc(100vh-60px)] md:h-[calc(100vh-60px)]">
        <Image
          src={productData?.imageSrc}
          alt={productData?.name}
          fill
          className="object-contain"
          priority
        />
      </div>

      {/* Right side - Product details */}
      <div className="md:p-8 flex flex-col justify-center">
        <div className="max-w-xl space-y-4">
          {/* Product name */}
          <h1 className="text-3xl md:text-4xl font-bold">{productData?.name}</h1>

          {/* Price */}
          <div className="text-2xl md:text-3xl font-semibold">{productData?.price}</div>

          {/* SKU and Category */}
          <div className="space-y-2 text-muted-foreground">
            <p>
              <span className="font-medium">SKU:</span> {productData?.sku}
            </p>
            <p> 
              <span className="font-medium">Categoría:</span> {productData?.category}
            </p>
          </div>

          {/* Client-side interactive component */}
          <ProductClient stockBySize={productData?.stockBySize} />
          
        </div>
      </div>
    </div>
  );
}