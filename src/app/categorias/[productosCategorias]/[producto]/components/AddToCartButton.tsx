'use client'

import { useState } from 'react'
import { ShoppingCart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import useCartStore from '@/contexts/useCartStore'
import { toast } from 'sonner' // Asumiendo que usas toast para notificaciones

interface SizeQuantity {
  size: string
  quantity: number
}

interface AddToCartButtonProps {
  id: string
  name: string
  price: number
  sku: string
  image: string
  color: string
  sizesWithQuantities: SizeQuantity[]
}

export default function AddToCartButton({
  id,
  name,
  price,
  sku,
  image,
  color,
  sizesWithQuantities
}: AddToCartButtonProps) {
  const [isLoading, setIsLoading] = useState(false)
  const { addItem } = useCartStore()

  const handleAddToCart = () => {
    setIsLoading(true)
    
    try {
      // No hay productos seleccionados
      if (sizesWithQuantities.length === 0) {
        toast.error('Por favor selecciona al menos una talla y cantidad')
        return
      }
      
      // Añadir cada talla con su cantidad como un item separado
      sizesWithQuantities.forEach(({ size, quantity }) => {
        const productId = `${id}-${size}`
        
        // Crear objeto de producto para el carrito
        const cartItem = {
          id: productId,
          SKU: sku,
          name: `${name} - ${color} / ${size}`,
          price,
          quantity,
          image
        }
        
        console.log('Añadiendo al carrito:', cartItem);
        
        // Añadir al carrito
        addItem(cartItem)
      })
      
      // Mostrar mensaje de éxito con el número total de productos
      const totalItems = sizesWithQuantities.reduce((sum, { quantity }) => sum + quantity, 0)
      toast.success(`${totalItems} productos agregados a la cotización`)
    } catch (error) {
      console.error('Error al agregar productos:', error)
      toast.error('No se pudieron agregar los productos')
    } finally {
      setIsLoading(false)
    }
  }

  // Calcular el total de productos seleccionados
  const totalQuantity = sizesWithQuantities.reduce((sum, { quantity }) => sum + quantity, 0)
  const hasItems = totalQuantity > 0

  return (
    <Button 
      size="lg" 
      className="w-full" 
      onClick={handleAddToCart}
      disabled={isLoading || !hasItems}
    >
      <ShoppingCart className="mr-2 h-5 w-5" />
      {isLoading ? 'Agregando...' : hasItems 
        ? `Agregar ${totalQuantity} a cotización` 
        : 'Selecciona cantidades'}
    </Button>
  )
} 