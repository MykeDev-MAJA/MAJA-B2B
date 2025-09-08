"use client"

import { useState } from "react"
import { Plus, Minus } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// Assuming these components exist in your project
const Customizer = () => <div>Customizer Content</div>
const SIZES = ["XS", "S", "M", "L", "XL", "XXL"]

interface SizeQuantity {
  size: string
  quantity: number
}

export default function SizeSelector() {
  // Mock state and handlers (replace with your actual implementation)
  const [sizeQuantities, setSizeQuantities] = useState<SizeQuantity[]>([])

  const handleQuantityChange = (size: string, quantity: number) => {
    const newSizeQuantities = [...sizeQuantities]
    const index = newSizeQuantities.findIndex((sq) => sq.size === size)

    if (index >= 0) {
      newSizeQuantities[index].quantity = quantity
    } else {
      newSizeQuantities.push({ size, quantity })
    }

    setSizeQuantities(newSizeQuantities)
  }

  const totalQuantity = sizeQuantities.reduce((sum, sq) => sum + sq.quantity, 0)

  // QuantitySelector component
  const QuantitySelector = ({
    initialValue,
    min,
    onChange,
  }: { initialValue: number; min: number; onChange: (quantity: number) => void }) => {
    const [value, setValue] = useState(initialValue)

    const handleChange = (newValue: number) => {
      if (newValue >= min) {
        setValue(newValue)
        onChange(newValue)
      }
    }

    return (
      <div className="flex items-center">
        <Button
          variant="outline"
          size="icon"
          className="h-7 w-7 rounded-full"
          onClick={() => handleChange(value - 1)}
          disabled={value <= min}
        >
          <Minus className="h-3 w-3" />
          <span className="sr-only">Decrease</span>
        </Button>
        <span className="w-8 text-center font-medium text-sm">{value}</span>
        <Button variant="outline" size="icon" className="h-7 w-7 rounded-full" onClick={() => handleChange(value + 1)}>
          <Plus className="h-3 w-3" />
          <span className="sr-only">Increase</span>
        </Button>
      </div>
    )
  }

  return (
    <Card className="shadow-sm">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-medium">Tallas y cantidades</h3>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="ghost" size="sm" className="h-7 text-xs text-primary p-0">
                Guía de bordado
              </Button>
            </DialogTrigger>
            <DialogContent title="Guía de bordado">
              <DialogHeader>
              </DialogHeader>
              <Customizer />
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {SIZES.map((size) => (
            <div
              key={size}
              className="flex items-center justify-between p-2 rounded-lg border bg-background hover:bg-muted/10"
            >
              <Badge variant="outline" className="font-medium px-2 h-6 text-xs">
                {size}
              </Badge>
              <QuantitySelector
                initialValue={sizeQuantities.find((sq) => sq.size === size)?.quantity || 0}
                min={0}
                onChange={(quantity) => handleQuantityChange(size, quantity)}
              />
            </div>
          ))}
        </div>

        <div className="mt-3 flex justify-end items-center gap-1">
          <span className="text-xs text-muted-foreground">Total:</span>
          <Badge variant="secondary" className="text-xs font-medium">
            {totalQuantity} unidades
          </Badge>
        </div>
      </CardContent>
    </Card>
  )
}

