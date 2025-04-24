'use client'

import { useState } from 'react'
import { ShoppingCart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import useCartStore from '@/contexts/useCartStore'
import { toast } from 'sonner'

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

const AddToCartButton = ({
  id,
  name,
  price,
  sku,
  image,
  color,
  sizesWithQuantities
}: AddToCartButtonProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const { addItem } = useCartStore()

  const handleAddToCart = () => {
    setIsLoading(true)
    
    try {
      // No hay productos seleccionados
      if (sizesWithQuantities.length === 0) {
        toast.error('Por favor selecciona al menos una talla y cantidad', {
          dismissible: true
        })
        return
      }
      
      // Añadir cada talla con su cantidad como un item separado
      sizesWithQuantities.forEach(({ size, quantity }) => {
        const productId = `${id}-${size}-${color}`
        
        // Crear objeto de producto para el carrito
        const cartItem = {
          id: productId,
          SKU: sku,
          name: `${name} / ${size} `,
          price,
          quantity,
          image,
          color
        }
        
        console.log('Añadiendo al carrito:', cartItem);
        
        // Añadir al carrito
        addItem(cartItem)
      })
      
      // Mostrar mensaje de éxito con el número total de productos
      const totalItems = sizesWithQuantities.reduce((sum, { quantity }) => sum + quantity, 0)
      toast.success(`${totalItems} ${totalItems === 1 ? 'producto agregado' : 'productos agregados'} a la cotización`, {
        dismissible: true
      })
    } catch (error) {
      console.error('Error al agregar productos:', error)
      toast.error('No se pudieron agregar los productos', {
        dismissible: true
      })
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
      <ShoppingCart className="mr-2 h-5 w-5 mt-18" />
      {isLoading ? 'Agregando...' : hasItems 
        ? `Agregar ${totalQuantity} a cotización` 
        : 'Selecciona cantidades'}
    </Button>
  )
}

AddToCartButton.displayName = 'AddToCartButton'
export default AddToCartButton 