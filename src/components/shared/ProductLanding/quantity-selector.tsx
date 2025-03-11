"use client"

import type React from "react"

import { useState } from "react"
import { Minus, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface QuantitySelectorProps {
  initialValue?: number
  min?: number
  max?: number
  onChange?: (quantity: number) => void
}

export default function QuantitySelector({
  initialValue = 1,
  min = 1,
  max = 999,
  onChange
}: QuantitySelectorProps) {
  const [quantity, setQuantity] = useState(initialValue)

  const handleDecrease = () => {
    if (quantity > min) {
      const newQuantity = quantity - 1
      setQuantity(newQuantity)
      onChange?.(newQuantity)
    }
  }

  const handleIncrease = () => {
    if (quantity < max) {
      const newQuantity = quantity + 1
      setQuantity(newQuantity)
      onChange?.(newQuantity)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10)
    
    // Si es un número válido y está dentro del rango
    if (!isNaN(value) && value >= min && value <= max) {
      setQuantity(value)
      onChange?.(value)
    }
  }

  return (
    <div className="space-y-2">
      {/* <Label htmlFor="quantity">Cantidad</Label> */}
      <div className="flex items-center">
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 rounded-r-none"
          onClick={handleDecrease}
          disabled={quantity <= min}
        >
          <Minus className="h-3 w-3" />
          <span className="sr-only">Decrease quantity</span>
        </Button>
        <Input
          id="quantity"
          type="number"
          min={min}
          max={max}
          className="h-8 w-14 rounded-none border-x-0 text-center [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          value={quantity}
          onChange={handleChange}
        />
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 rounded-l-none"
          onClick={handleIncrease}
          disabled={quantity >= max}
        >
          <Plus className="h-3 w-3" />
          <span className="sr-only">Increase quantity</span>
        </Button>
      </div>
    </div>
  )
}

