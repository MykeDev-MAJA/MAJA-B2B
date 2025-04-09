import React from 'react'
import { ServerProducts } from '@/components/Home/ServerProducts'
import Image from 'next/image'
// PAGINA DE PRODUCTOS SEGUN CATEGORIA

const ProductosCategorias = async (props: {
  params: Promise<{ productosCategorias: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) => {
  const params = await props.params;
  const { productosCategorias } = params;

  return (
    <>
    <div className='relative max-w-screen flex justify-center items-center h-28'>
      <div className='absolute inset-0 w-full h-full'>
        <div className='absolute inset-0 bg-black/50 z-10'></div>
        <Image 
        width={1000}
        height={1000}
          src={`/images/Categorias/${productosCategorias}.jpg`}
          alt={`Categoría ${productosCategorias}`}
          className='w-full h-full object-cover'
        />
      </div>
      <h1 className='relative z-20 text-white text-4xl font-semibold capitalize'>{productosCategorias.toUpperCase()}</h1>
    </div>
    <ServerProducts filterCategory={productosCategorias} />
    </>
  );
}

ProductosCategorias.displayName = 'ProductosCategorias';
export default ProductosCategorias;

export const generateMetadata = async (props: {
  params: Promise<{ productosCategorias: string }>
}) => {
  const params = await props.params;
  const { productosCategorias } = params;
  
  return {
    title: `Productos - ${productosCategorias}`,
    description: `Listado de productos en la categoría ${productosCategorias}`,
  };
}
