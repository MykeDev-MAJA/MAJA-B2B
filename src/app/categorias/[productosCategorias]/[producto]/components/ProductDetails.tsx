'use client'

import { useState } from 'react'
import { Heart, Share2 } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Dialog } from '@/components/shared/Dialog/Dialog'
import Customizer from './Customizer'
import QuantitySelector from '@/components/shared/ProductLanding/quantity-selector'
import AddToCartButton from './AddToCartButton'

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

const SIZES = ["ECH", "CH", "M", "G", "EG", "EEG"]
const COLORS: ColorOption[] = [
  { name: "Azul", value: "azul", hex: "#1e40af" },
]

export default function ProductDetails({ productName, price, sku }: ProductDetailsProps) {
  const [selectedColor, setSelectedColor] = useState<string>(COLORS[0].value)
  const [selectedSize, setSelectedSize] = useState<string>("M")
  const [quantity, setQuantity] = useState(1)

  // Esta función se pasará al componente QuantitySelector
  const handleQuantityChange = (newQuantity: number) => {
    setQuantity(newQuantity)
  }

  // Generar ID único para el producto basado en sus características
  const productId = `${sku}-${selectedColor}-${selectedSize}`

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
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">{productName}</h1>
        <p className="text-xl sm:text-2xl font-semibold text-primary">
          {new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(price)}
        </p>
        <p className="text-sm text-muted-foreground">SKU: {sku}</p>
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
          onValueChange={setSelectedColor} 
          className="flex flex-wrap gap-2"
        >
          {COLORS.map((color) => (
            <div key={color.value} className="flex items-center">
              <RadioGroupItem value={color.value} id={`color-${color.value}`} className="peer sr-only" />
              <Label
                htmlFor={`color-${color.value}`}
                className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-full border-2 border-muted 
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

      {/* Selector de tallas */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-medium">Talla</h3>
          <Dialog 
            trigger={<Button variant="link" className="p-0 overflow-auto h-auto text-sm">
              Guía de bordado
            </Button>}
            title="Guía de bordado"
          >
            <Customizer />
          </Dialog>
        </div>
        <RadioGroup 
          value={selectedSize} 
          onValueChange={setSelectedSize} 
          className="flex flex-wrap gap-3"
        >
          {SIZES.map((size) => (
            <div key={size} className="flex items-center">
              <RadioGroupItem value={size} id={`size-${size}`} className="peer sr-only" />
              <Label
                htmlFor={`size-${size}`}
                className="flex h-10 w-14 cursor-pointer items-center justify-center rounded-md border border-muted bg-background 
                          text-sm font-medium ring-offset-background transition-colors hover:bg-muted/80
                          peer-data-[state=checked]:bg-primary peer-data-[state=checked]:text-primary-foreground
                          peer-data-[state=checked]:hover:bg-primary"
              >
                {size}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      {/* Selector de cantidad y botones de acción */}
      <div className="space-y-4 pt-4">
        <div className="flex items-center justify-between">
          <h3 className="font-medium">Cantidad</h3>
        </div>
        <QuantitySelector onChange={handleQuantityChange} initialValue={1} />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <AddToCartButton 
            id={productId}
            name={productName}
            price={price}
            sku={sku}
            image={`/images/Producto/${selectedColor}.webp`}
            color={selectedColor}
            size={selectedSize}
            quantity={quantity}
          />
          <Button size="lg" variant="outline" className="w-full">
            Contactar a un asesor
          </Button>
        </div>
      </div>

      {/* Información adicional */}
      <div className="border-t pt-6 mt-2">
        <Tabs defaultValue="descripcion">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="descripcion">Descripción</TabsTrigger>
            <TabsTrigger value="caracteristicas">Características</TabsTrigger>
            <TabsTrigger value="envio">Envío</TabsTrigger>
          </TabsList>
          <TabsContent value="descripcion" className="pt-4">
            <div className="prose prose-sm max-w-none">
              <p>
                Este producto está diseñado con los más altos estándares de calidad para garantizar durabilidad y
                comodidad. Ideal para uso diario y ocasiones especiales.
              </p>
              <p>
                La tela de alta calidad proporciona una sensación suave al tacto mientras mantiene su forma incluso
                después de múltiples lavados.
              </p>
            </div>
          </TabsContent>
          <TabsContent value="caracteristicas" className="pt-4">
            <ul className="list-disc pl-5 space-y-2 text-sm">
              <li>Material: 100% algodón premium</li>
              <li>Diseño ergonómico para mayor comodidad</li>
              <li>Disponible en múltiples colores</li>
              <li>Lavable a máquina</li>
              <li>Fabricado en México</li>
            </ul>
          </TabsContent>
          <TabsContent value="envio" className="pt-4">
            <div className="prose prose-sm max-w-none">
              <p>Envío disponible a todo México. Los tiempos de entrega varían según la ubicación:</p>
              <ul>
                <li>Ciudad de México: 1-2 días hábiles</li>
                <li>Resto del país: 3-5 días hábiles</li>
              </ul>
              <p>
                Para consultas sobre envíos internacionales, por favor contacte a nuestro equipo de atención al
                cliente.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
} 