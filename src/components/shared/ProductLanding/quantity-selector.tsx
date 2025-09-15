"use client"

import React, { useState, useEffect } from "react"
import { Minus, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface QuantitySelectorProps {
  initialValue?: number
  min?: number
  max?: number
  onChange?: (quantity: number) => void
  resetValue?: number
}

const QuantitySelector = ({
  initialValue = 0,
  min = 0,
  max = 999,
  onChange,
  resetValue
}: QuantitySelectorProps) => {
  const [quantity, setQuantity] = useState(initialValue)
  const [inputValue, setInputValue] = useState(initialValue.toString())
  const [isFocused, setIsFocused] = useState(false)

  // Sync with initialValue changes
  useEffect(() => {
    setQuantity(initialValue)
    setInputValue(initialValue.toString())
  }, [initialValue])

  // Reset effect when resetValue changes
  useEffect(() => {
    if (resetValue !== undefined) {
      setQuantity(0)
      setInputValue("0")
      onChange?.(0)
    }
  }, [resetValue])

  const updateQuantity = (newQuantity: number) => {
    // Clamp value between min and max
    const clampedQuantity = Math.max(min, Math.min(max, newQuantity))
    setQuantity(clampedQuantity)
    setInputValue(clampedQuantity.toString())
    onChange?.(clampedQuantity)
  }

  const handleDecrease = () => {
    updateQuantity(quantity - 1)
  }

  const handleIncrease = () => {
    updateQuantity(quantity + 1)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setInputValue(value)
    
    // Allow empty input while typing
    if (value === "") {
      setQuantity(0)
      onChange?.(0)
      return
    }

    const numValue = parseInt(value, 10)
    if (!isNaN(numValue)) {
      const clampedQuantity = Math.max(min, Math.min(max, numValue))
      setQuantity(clampedQuantity)
      onChange?.(clampedQuantity)
    }
  }

  const handleFocus = () => {
    setIsFocused(true)
    // Clear input if value is 0
    if (quantity === 0) {
      setInputValue("")
    }
  }

  const handleBlur = () => {
    setIsFocused(false)
    // If input is empty, set to 0
    if (inputValue === "" || isNaN(parseInt(inputValue, 10))) {
      setInputValue("0")
      setQuantity(0)
      onChange?.(0)
    } else {
      // Update display value to match actual quantity
      setInputValue(quantity.toString())
    }
  }

  return (
    <div className="space-y-2">
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
          type="number"
          min={min}
          max={max}
          className="h-8 w-14 rounded-none border-x-0 text-center [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          value={inputValue}
          onChange={handleInputChange}
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

export default QuantitySelector

