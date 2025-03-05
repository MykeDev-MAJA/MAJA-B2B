import React from 'react'
import ProductCard from '../shared/ProductCard/ProductCard'
export const Products = () => {
  return (
    <div id="productsSeccion" className="min-h-screen flex flex-col items-center py-8">
      <h1 className="text-4xl font-bold">Nuestros Productos</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pt-8">
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </div>
    </div>
  )
}
