import React from 'react'
import ProductPage from './components/Server/ProductPage'
const page = ({params}: {params: {productos: string}}) => {
  return (  
    <div className='min-h-[calc(100vh-60px)]'>
      <ProductPage params={params} />
    </div>
  )
}

export default page