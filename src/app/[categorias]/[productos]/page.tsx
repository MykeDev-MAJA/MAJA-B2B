import React from 'react'
import ProductPage from './components/Server/ProductPage'

// Using Next.js App Router convention for page components
export default async function Page({ params }: { params: { productos: string, categorias: string } }) {
  return (
    <div className='min-h-[calc(100vh-60px)]'>
      <ProductPage params={params} />
    </div>
  )
}