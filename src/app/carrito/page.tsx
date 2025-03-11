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
    getTotalPrice 
  } = useCartStore()

  return (
    <div className="container mx-auto py-10 pt-[60px]">
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
              <p className="text-2xl font-bold">
                {new Intl.NumberFormat('es-MX', {
                  style: 'currency',
                  currency: 'MXN'
                }).format(getTotalPrice())}
              </p>
            </div>
            <Button size="lg">Proceder al Pago</Button>
          </CardFooter>
        </Card>
      )}
    </div>
  )
}

