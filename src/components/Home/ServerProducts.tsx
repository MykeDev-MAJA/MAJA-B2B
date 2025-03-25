import React from 'react';
import { getProducts, Product, ColorOption } from '@/lib/products';
import ProductCard from '../shared/ProductCard/ProductCard';
import Link from 'next/link';

interface ServerProductsProps {
  filterCategory?: string; // Parámetro opcional para filtrar por categoría
}

export async function ServerProducts({ filterCategory }: ServerProductsProps = {}) {
  // Fetch products data from the JSON file
  const products = await getProducts();

  // Filtrar categorías si se proporciona filterCategory
  const filteredProducts = filterCategory 
    ? { [filterCategory]: products[filterCategory] || [] } 
    : products;

  return (
    <div id="productsSeccion" className="min-h-screen flex flex-col items-center py-8 px-8">
      <h1 className="text-4xl font-normal">
        {filterCategory ? `${filterCategory.charAt(0).toUpperCase() + filterCategory.slice(1)}` : 'Nuestros Productos'}
      </h1>

      {/* COMPONENTE REACTIVO PARA MOSTRAR CATEGORIAS */}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pt-8">
        {Object.entries(filteredProducts).flatMap(([category, categoryProducts]) => {
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

      {/* {!filterCategory && ( */}
        <Link href={"/categorias"}>
          <button
            className="bg-black text-white mt-8 py-2 px-4 font-semibold cursor-pointer rounded"
          >
            Ver más
          </button>
        </Link>
      {/* )} */}
    </div>
  );
} 