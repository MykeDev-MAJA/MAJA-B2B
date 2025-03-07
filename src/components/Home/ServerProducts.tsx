import React from 'react';
import { getProducts, Product, ColorOption } from '@/lib/products';
import ProductCard from '../shared/ProductCard/ProductCard';

export async function ServerProducts() {
  // Fetch products data from the JSON file
  const products = await getProducts();

  return (
    <div id="productsSeccion" className="min-h-screen flex flex-col items-center py-8 px-8">
      <h1 className="text-4xl font-bold">Nuestros Productos</h1>

      {/* COMPONENTE REACTIVO PARA MOSTRAR CATEGORIAS */}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pt-8">
        {Object.entries(products).flatMap(([category, categoryProducts]) => {
          return categoryProducts.flatMap((product: Product) => {
            if (product.agrupado) {
              return <ProductCard key={`${category}-${product.id}`} product={product} />;
            } else {
              return product.colors.map((color: ColorOption) => (
                <ProductCard
                  key={`${category}-${product.id}-${color.name}`}
                  product={{
                    ...product,
                    colors: [color],
                    name: `${product.name}`,
                  }}
                />
              ));
            }
          });
        })}
      </div>
    </div>
  );
} 