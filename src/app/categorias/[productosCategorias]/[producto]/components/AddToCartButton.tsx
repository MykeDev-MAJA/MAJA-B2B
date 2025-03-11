'use client'

import { useState } from 'react'
import { ShoppingCart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import useCartStore from '@/contexts/useCartStore'
import { toast } from 'sonner' // Asumiendo que usas toast para notificaciones

interface AddToCartButtonProps {
  id: string
  name: string
  price: number
  sku: string
  image: string
  color: string
  size: string
  quantity: number
}

export default function AddToCartButton({
  id,
  name,
  price,
  sku,
  image,
  color,
  size,
  quantity
}: AddToCartButtonProps) {
  const [isLoading, setIsLoading] = useState(false)
  const { addItem } = useCartStore()

  const handleAddToCart = () => {
    setIsLoading(true)
    
    try {
      // Crear objeto de producto para el carrito
      const cartItem = {
        id,
        SKU: sku,
        name: `${name} - ${color} / ${size}`,
        price,
        quantity,
        image
      }
      
      console.log('Añadiendo al carrito:', cartItem);
      
      // Añadir al carrito
      addItem(cartItem)
      
      // Mostrar mensaje de éxito
      toast.success('Producto agregado a la cotización')
    } catch (error) {
      console.error('Error al agregar producto:', error)
      toast.error('No se pudo agregar el producto')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button 
      size="lg" 
      className="w-full" 
      onClick={handleAddToCart}
      disabled={isLoading}
    >
      <ShoppingCart className="mr-2 h-5 w-5" />
      {isLoading ? 'Agregando...' : 'Agregar a cotización'}
    </Button>
  )
} 