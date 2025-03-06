"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/buttonProducto";
import { Label } from "@/components/ui/label";
import { FiMinus, FiPlus } from "react-icons/fi";

interface StockBySize {
  [key: string]: number;
}

interface ProductClientProps {
  stockBySize: StockBySize;
}

export default function ProductClient({ stockBySize }: ProductClientProps) {
  const [selectedSize, setSelectedSize] = useState<string>("EECH");
  const [currentStock, setCurrentStock] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(1);

  // Update current stock when size changes
  useEffect(() => {
    setCurrentStock(stockBySize[selectedSize as keyof typeof stockBySize] || 0);
    setQuantity(1); // Reset quantity when size changes
  }, [selectedSize, stockBySize]);

  // Quantity handlers
  const increaseQuantity = () => {
    if (quantity < currentStock) {
      setQuantity(quantity + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <>
      {/* Size selector */}
      <div className="space-y-4">
        <Label htmlFor="size-selector" className="text-base font-medium">
          Talla
        </Label>
        <div className="flex flex-wrap gap-2">
          {Object.entries(stockBySize).map(([size, stock]) => (
            <Button
              disabled={stock === 0}
              key={size}
              variant={selectedSize === size ? "default" : "outline"}
              onClick={() => setSelectedSize(size)}
              className={`flex justify-center items-center min-w-40 ${stock === 0 ? "opacity-60 bg-gray-200 hover:bg-gray-200" : ""}`}
            >
              <span className="text-xs font-medium">
                {`${size} - ${stock === 0 ? "Sin stock" : `${stock} disponibles`}`}
              </span>
            </Button>
          ))}
        </div>
      </div>

      {/* Quantity selector */}
      <div className="space-y-4">
        <Label className="text-base font-medium">Cantidad</Label>
        <div className="flex items-center">
          <Button
            variant="outline"
            size="icon"
            onClick={decreaseQuantity}
            disabled={quantity <= 1}
            className="h-10 w-10"
          >
            <FiMinus className="h-4 w-4" />
          </Button>
          <div className="w-16 text-center font-medium">{quantity}</div>
          <Button
            variant="outline"
            size="icon"
            onClick={increaseQuantity}
            disabled={quantity >= currentStock}
            className="h-10 w-10"
          >
            <FiPlus className="h-4 w-4" />
          </Button>
          <div className="ml-4 text-sm text-muted-foreground">
            {currentStock} disponibles
          </div>
        </div>
      </div>

      {/* Add to cart button */}
      <Button
        size="lg"
        className="w-full md:w-auto px-8"
        onClick={() => {
          alert(`Agregado al carrito: Talla ${selectedSize}, Cantidad: ${quantity}`);
          // Here you would typically call a function to add the item to the cart
        }}
        disabled={currentStock === 0}
      >
        {currentStock === 0 ? "Agotado" : "Agregar al Carrito"}
      </Button>
    </>
  );
}