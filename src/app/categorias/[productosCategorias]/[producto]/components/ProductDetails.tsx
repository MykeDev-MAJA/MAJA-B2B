'use client'

import { useState, useMemo } from 'react'
import { Heart, Share2, Truck, Headset } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Dialog } from '@/components/shared/Dialog/Dialog'
import Customizer from './Customizer'
import QuantitySelector from '@/components/shared/ProductLanding/quantity-selector'
import AddToCartButton from './AddToCartButton'
import { useUserStore } from '@/contexts/useUserContext'


interface ProductDetailsProps {
  productName: string
  price: number
  sku: string
}

interface ColorOption {
  name: string
  value: string
  hex: string
}

interface SizeQuantity {
  size: string
  quantity: number
}

const SIZES = ["EECH","ECH", "CH", "M", "G", "EG", "EEG"]
const COLORS: ColorOption[] = [
  { name: "Azul", value: "azul", hex: "#385861" },
  { name: "Rojo", value: "rojo", hex: "#dc2626" },
  { name: "Verde", value: "verde", hex: "#B4A681" },
  // { name: "Amarillo", value: "amarillo", hex: "#f59e0b" },
  { name: "Blanco", value: "blanco", hex: "#ffffff" },
  { name: "Negro", value: "negro", hex: "#000000" },
  { name: "Gris", value: "gris", hex: "#808080" },
  
]

export default function ProductDetails({ productName, price, sku }: ProductDetailsProps) {
  const isAuthenticated = useUserStore((state) => state.isAuthenticated)
  const [selectedColor, setSelectedColor] = useState<string>(COLORS[0].value)
  const [resetCounter, setResetCounter] = useState(0)
  // Instead of a single size, we now keep track of quantity for each size
  const [sizeQuantities, setSizeQuantities] = useState<SizeQuantity[]>(
    SIZES.map(size => ({ size, quantity: 0 }))
  )

  // Calculate total quantity of all sizes
  const totalQuantity = useMemo(() => {
    return sizeQuantities.reduce((sum, { quantity }) => sum + quantity, 0)
  }, [sizeQuantities])

  // Handle quantity change for a specific size
  const handleQuantityChange = (size: string, newQuantity: number) => {
    setSizeQuantities(prev => 
      prev.map(item => 
        item.size === size ? { ...item, quantity: newQuantity } : item
      )
    )
  }

  const handleReset = () => {
    setSizeQuantities(SIZES.map(size => ({ size, quantity: 0 })))
    setResetCounter(prev => prev + 1)
  }

  // Handle color change
  const handleColorChange = (color: string) => {
    setSelectedColor(color)
    console.log("Color actualizado a:", color) // Para debugging
  }

  // Filter sizes with quantity > 0 for cart
  const sizesForCart = useMemo(() => {
    return sizeQuantities.filter(item => item.quantity > 0)
  }, [sizeQuantities])

 

  return (
    <div className="flex flex-col gap-6">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Badge variant="outline" className="text-xs font-medium">
            En stock
          </Badge>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="rounded-full">
              <Heart className="h-5 w-5" />
              <span className="sr-only">Añadir a favoritos</span>
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Share2 className="h-5 w-5" />
              <span className="sr-only">Compartir producto</span>
            </Button>
          </div>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">{productName.toUpperCase()}</h1>
        <p className="text-xl sm:text-2xl font-normal text-primary">
          {new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(price)}
        </p>
        <div className="flex mt-6 justify-between">
          <p className="text-sm font-extralight">SKU: {sku}</p>
          <div className="flex items-center">
            <Truck className="h-4 w-4 mr-2" />
            <p className="text-sm font-normal">Envio gratis</p>
          </div>
        </div>
      </div>

      <div className="prose prose-sm max-w-none">
        <p>
          Prenda de alta calidad diseñada para ofrecer comodidad y estilo. Fabricada con materiales premium que
          garantizan durabilidad y un ajuste perfecto para cualquier ocasión.
        </p>
      </div>

      {/* Selector de colores */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-medium">Color</h3>
          <span className="text-sm text-muted-foreground">
            {COLORS.find(c => c.value === selectedColor)?.name || 'Azul'}
          </span>
        </div>
        <RadioGroup 
          value={selectedColor} 
          onValueChange={handleColorChange} 
          className="flex flex-wrap gap-2"
        >
          {COLORS.map((color) => (
            <div key={color.value} className="flex items-center">
              <RadioGroupItem value={color.value} id={`color-${color.value}`} className="peer sr-only" />
              <Label
                htmlFor={`color-${color.value}`}
                className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-full border-2 
                          ring-offset-background peer-data-[state=checked]:border-primary"
              >
                <span
                  className="h-4 w-4 rounded-full"
                  style={{ backgroundColor: color.hex }}
                  aria-label={color.name}
                />
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      {/* Selector de tallas con cantidades */}
      <div className="bg-white dark:bg-gray-950 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 flex items-center justify-between border-b border-gray-100 dark:border-gray-800">
        <h3 className="font-medium text-sm">Tallas y cantidades</h3>
        <Dialog
          trigger={
            <Button variant="ghost" size="sm" className="text-xs font-medium text-primary hover:bg-primary/5">
              Guía de bordado
            </Button>
          }
          title="Guía de bordado"
        >
          <Customizer />
        </Dialog>
      </div>

      {/* Size Grid */}
      <div className="p-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {SIZES.map((size) => (
            <div
              key={size}
              className="flex items-center justify-between p-2.5 rounded-lg border border-black-600 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
            >
              <div className="flex items-center space-x-2">
                <div className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-200 dark:bg-gray-800">
                  <span className="text-[0.625rem] font-medium">{size}</span>
                </div>
                {isAuthenticated && <span className="text-xs font-medium">Stock {Math.floor(Math.random() * (300 - 10 + 1)) + 10}</span>}
              </div>
              <QuantitySelector
                initialValue={sizeQuantities.find((sq) => sq.size === size)?.quantity || 0}
                min={0}
                onChange={(quantity) => handleQuantityChange(size, quantity)}
                resetValue={resetCounter}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="px-4 py-3 bg-gray-50 dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800">
        <div className="flex justify-between items-center">
          {totalQuantity > 0 ? (
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-xs font-medium text-primary hover:bg-primary/5"
              onClick={handleReset}
            >
              Resetear formulario
            </Button>
          ) : (
            <Button 
            variant="ghost" 
            size="sm" 
            className="text-xs font-light text-primary hover:bg-transparent"
          >
            Selecciona cantidades
          </Button>
          )}
          <div className="flex items-center space-x-1.5">
            <span className="text-xs text-gray-500 dark:text-gray-400">Total:</span>
            <span className="text-sm font-semibold">{totalQuantity} {totalQuantity === 1 ? 'unidad' : 'unidades'}</span>
          </div>
        </div>
      </div>
    </div>

      {/* Botones de acción */}
      <div className="pt-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <AddToCartButton 
            id={`${sku}-${productName}-multiple`}
            name={productName}
            price={price}
            sku={sku}
            image={`/images/Producto/${selectedColor}.webp`}
            color={selectedColor}
            sizesWithQuantities={sizesForCart}
          />
          <Button size="lg" variant="outline" className="w-full flex items-center justify-center">
            <span className="mr-2">
              <Headset className="h-5 w-5" />
            </span>
            Contactar a un asesor
          </Button>
        </div>
      </div>

   
    </div>
  )
} 