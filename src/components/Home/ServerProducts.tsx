import React from 'react';
import { getProducts, Product, ColorOption } from '@/lib/products';
import ProductCard from '../shared/ProductCard/ProductCard';

interface ServerProductsProps {
  filterCategory?: string; // Parámetro opcional para filtrar por categoría
}

export const ServerProducts = async ({ filterCategory }: ServerProductsProps = {}) => {
  // Fetch products data from the JSON file
  const products = await getProducts();

  // Using modern object shorthand and optional chaining
  const filteredProducts = filterCategory 
    ? { [filterCategory]: products[filterCategory] ?? [] } 
    : products;

  return (
    <div id="productsSeccion" className="min-h-screen flex flex-col items-center py-1 pb-8 px-8">
      <h1 className="text-4xl font-normal">
        {filterCategory ? `` : 'NUESTROS PRODUCTOS'}
      </h1>

      {/* COMPONENTE REACTIVO PARA MOSTRAR CATEGORIAS */}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pt-8">
        {Object.entries(filteredProducts).flatMap(([category, categoryProducts]) => 
          categoryProducts.flatMap((product: Product) => 
            product.agrupado 
              ? <ProductCard key={`${category}-${product.id}`} product={product} />
              : product.colors.map((color: ColorOption) => (
                  <ProductCard
                    key={`${category}-${product.id}-${color.name}`}
                    product={{
                      ...product,
                      colors: [color],
                      name: product.name,
                    }}
                  />
                ))
          )
        )}
      </div>

      {/* {!filterCategory && ( */}
        {/* <Link href={"/categorias"}>
          <button
            className="bg-black text-white mt-8 py-2 px-4 font-semibold cursor-pointer rounded"
          >
            Ver más
          </button>
        </Link> */}
      {/* )} */}
    </div>
  );
} 