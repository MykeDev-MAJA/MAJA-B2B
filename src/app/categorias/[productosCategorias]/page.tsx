import React from 'react'
import { ServerProducts } from '@/components/Home/ServerProducts'

// PAGINA DE PRODUCTOS SEGUN CATEGORIA

export default async function Page(props: {
  params: Promise<{ productosCategorias: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const params = await props.params;
  const { productosCategorias } = params;

  return (
    <ServerProducts filterCategory={productosCategorias} />
  );
}

export async function generateMetadata(props: {
  params: Promise<{ productosCategorias: string }>
}) {
  const params = await props.params;
  const { productosCategorias } = params;
  
  return {
    title: `Productos - ${productosCategorias}`,
    description: `Listado de productos en la categoría ${productosCategorias}`,
  };
}
