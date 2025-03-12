"use client"

import Image from "next/image"
import { Minus, Plus, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import useCartStore from "@/contexts/useCartStore"
import Link from "next/link"

export default function CartPage() {
  const { 
    items, 
    updateQuantity, 
    removeItem, 
    getTotalPrice,
    getTotalItems
  } = useCartStore()

  // Calcular descuento basado en la cantidad total de productos
  const totalItems = getTotalItems()
  const subtotal = getTotalPrice()
  
  // Función para calcular el descuento actual
  const getDiscount = (totalItems: number) => {
    if (totalItems >= 500) return 0.35
    if (totalItems >= 200) return 0.30
    if (totalItems >= 100) return 0.25
    if (totalItems >= 50) return 0.20
    if (totalItems >= 15) return 0.15
    return 0
  }
  
  // Función para calcular el siguiente nivel de descuento
  const getNextDiscountThreshold = (totalItems: number) => {
    if (totalItems < 15) return { threshold: 15, discount: 0.15 }
    if (totalItems < 50) return { threshold: 50, discount: 0.20 }
    if (totalItems < 100) return { threshold: 100, discount: 0.25 }
    if (totalItems < 200) return { threshold: 200, discount: 0.30 }
    if (totalItems < 500) return { threshold: 500, discount: 0.35 }
    return null // Ya tienes el máximo descuento
  }
  
  const currentDiscount = getDiscount(totalItems)
  const discountedTotal = subtotal * (1 - currentDiscount)
  const nextDiscountInfo = getNextDiscountThreshold(totalItems)

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Mi Carrito de Compras</h1>

      {items.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-muted-foreground">Tu carrito está vacío</p>
          <Link href="/">
          <Button className="mt-4">Continuar Comprando</Button>
          </Link>
        
        </div>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Productos en tu carrito</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex items-center space-x-4">
                  <div className="relative h-20 w-20 overflow-hidden rounded-md">
                    <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                  </div>

                  <div className="flex-1">
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-sm text-muted-foreground">SKU: {item.SKU}</p>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="w-24 text-right">
                    <div className="font-medium">
                      {new Intl.NumberFormat('es-MX', {
                        style: 'currency',
                        currency: 'MXN'
                      }).format(item.price)}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {new Intl.NumberFormat('es-MX', {
                        style: 'currency',
                        currency: 'MXN'
                      }).format(item.price * item.quantity)}
                    </div>
                  </div>

                  <Button variant="ghost" size="icon" className="text-destructive" onClick={() => removeItem(item.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
          <Separator />
          <CardFooter className="flex justify-between p-6">
            <div>
              <p className="text-muted-foreground">Subtotal</p>
              {currentDiscount > 0 ? (
                <>
                  <p className="text-lg line-through text-muted-foreground">
                    {new Intl.NumberFormat('es-MX', {
                      style: 'currency',
                      currency: 'MXN'
                    }).format(subtotal)}
                  </p>
                  <div className="flex items-center gap-2">
                    <p className="text-2xl font-bold text-green-600">
                      {new Intl.NumberFormat('es-MX', {
                        style: 'currency',
                        currency: 'MXN'
                      }).format(discountedTotal)}
                    </p>
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                      {(currentDiscount * 100).toFixed(0)}% descuento
                    </span>
                  </div>
                </>
              ) : (
                <p className="text-2xl font-bold">
                  {new Intl.NumberFormat('es-MX', {
                    style: 'currency',
                    currency: 'MXN'
                  }).format(subtotal)}
                </p>
              )}
              
              {nextDiscountInfo && (
                <p className="text-sm text-blue-600 mt-1">
                  {nextDiscountInfo.threshold - totalItems} productos más para obtener un 
                  {' '}{(nextDiscountInfo.discount * 100).toFixed(0)}% de descuento
                </p>
              )}
            </div>
            <Button size="lg">Proceder al Pago</Button>
          </CardFooter>
        </Card>
      )}
      
      {/* {items.length > 0 && (
        <div className="mt-6 text-sm text-muted-foreground">
          <p>Descuentos por volumen:</p>
          <ul className="list-disc pl-5 mt-2">
            <li className={totalItems >= 15 ? "font-medium" : ""}>15-49 productos: 15% de descuento</li>
            <li className={totalItems >= 50 && totalItems < 100 ? "font-medium" : ""}>50-99 productos: 20% de descuento</li>
            <li className={totalItems >= 100 && totalItems < 200 ? "font-medium" : ""}>100-199 productos: 25% de descuento</li>
            <li className={totalItems >= 200 && totalItems < 500 ? "font-medium" : ""}>200-499 productos: 30% de descuento</li>
            <li className={totalItems >= 500 ? "font-medium" : ""}>500+ productos: 35% de descuento</li>
          </ul>
        </div>
      )} */}
    </div>
  )
}

