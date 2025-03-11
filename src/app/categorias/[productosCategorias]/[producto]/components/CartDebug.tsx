'use client'

import useCartStore from '@/contexts/useCartStore'

export default function CartDebug() {
  const items = useCartStore(state => state.items)
  const totalItems = useCartStore(state => state.getTotalItems())
  const totalPrice = useCartStore(state => state.getTotalPrice())
  
  return (
    <div className="p-4 mt-8 border rounded-md bg-gray-50">
      <h3 className="text-lg font-semibold mb-2">Debug: Estado del Carrito</h3>
      <p>Total de items: {totalItems}</p>
      <p>Precio total: {new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(totalPrice)}</p>
      <details>
        <summary className="cursor-pointer text-sm text-blue-600 mt-2">Ver contenido del carrito</summary>
        <pre className="mt-2 p-2 bg-gray-100 rounded text-xs overflow-auto">
          {JSON.stringify(items, null, 2)}
        </pre>
      </details>
    </div>
  )
} 