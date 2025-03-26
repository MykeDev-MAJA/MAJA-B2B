"use client"

import React, { useState, useEffect } from "react"
import { Minus, Plus, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface QuantitySelectorProps {
  initialValue?: number
  min?: number
  max?: number
  onChange?: (quantity: number) => void
  resetValue?: number
}

export default function QuantitySelector({
  initialValue = 1,
  min = 1,
  max = 999,
  onChange,
  resetValue
}: QuantitySelectorProps) {
  const [quantity, setQuantity] = useState(initialValue)
  const [inputValue, setInputValue] = useState(initialValue.toString())
  const [isFocused, setIsFocused] = useState(false)

  // Reset effect when resetValue changes
  useEffect(() => {
    if (resetValue !== undefined && quantity !== 0) {
      setQuantity(0)
      setInputValue("0")
      onChange?.(0)
    }
  }, [resetValue])

  const handleDecrease = () => {
    if (quantity > min) {
      const newQuantity = quantity - 1
      setQuantity(newQuantity)
      setInputValue(newQuantity.toString())
      onChange?.(newQuantity)
    }
  }

  const handleIncrease = () => {
    if (quantity < max) {
      const newQuantity = quantity + 1
      setQuantity(newQuantity)
      setInputValue(newQuantity.toString())
      onChange?.(newQuantity)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setInputValue(value)
    
    const numValue = parseInt(value, 10)
    // Si es un número válido y está dentro del rango
    if (!isNaN(numValue) && numValue >= min && numValue <= max) {
      setQuantity(numValue)
      onChange?.(numValue)
    }
  }

  const handleFocus = () => {
    setIsFocused(true)
    if (inputValue === "0") {
      setInputValue("")
    }
  }

  const handleBlur = () => {
    setIsFocused(false)
    if (inputValue === "" || isNaN(parseInt(inputValue, 10))) {
      setInputValue("0")
      setQuantity(0)
      onChange?.(0)
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
          {quantity === 1 ? (
            <Trash2 className="h-3 w-3" />
          ) : (
            <Minus className="h-3 w-3" />
          )}
          <span className="sr-only">
            {quantity === 1 ? "Remove item" : "Decrease quantity"}
          </span>
        </Button>
        <Input
          id="quantity"
          type="number"
          min={min}
          max={max}
          className="h-8 w-14 rounded-none border-x-0 text-center [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          value={isFocused && inputValue === "" ? "" : inputValue}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
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

