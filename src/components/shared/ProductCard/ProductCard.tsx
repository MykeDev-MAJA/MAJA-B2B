"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import {  ShoppingBag } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"

interface Product {
  id: number;
  name: string;
  price: number;
  colors: ColorOption[];
  isNew: boolean;
  categoria: string;
}

interface ColorOption {
  name: string;
  class: string;
  image: string;
  stock: number;
}

export default function ProductCard({ product }: { product: Product }) {
  const [selectedColor, setSelectedColor] = useState<ColorOption | null>(product.colors[0]);
  // const [isFavorite, setIsFavorite] = useState(false);

  // const handleFavoriteClick = () => {
  //   setIsFavorite(!isFavorite);
  // };

  return (
    <div className="group relative max-w-sm rounded-lg overflow-hidden shadow-lg bg-white hover:shadow-2xl transition-all duration-200">

      {/* ESTE ES EL BOTON PARA AÑADIR A FAVORITOS */}

      {/* <div className="absolute top-3 right-3 z-10">
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full bg-white/80 backdrop-blur-sm hover:bg-white/90"
          onClick={handleFavoriteClick}
        >
          <motion.div animate={isFavorite ? { scale: [1, 1.2, 1] } : { scale: 1 }} transition={{ duration: 0.3 }}>
            <Heart
              className={cn(
                "h-5 w-5 transition-all duration-300 ease-in-out",
                isFavorite ? "text-rose-500 fill-rose-500" : "text-gray-600 hover:text-rose-500"
              )}
            />
          </motion.div>
          <span className="sr-only">Añadir a favoritos</span>
        </Button>
      </div> */}

      {/* ESTE ES EL BOTON PARA AÑADIR A NUEVOS */}

      {product.isNew && (
        <Badge className="absolute rounded-[35px] top-3 left-3 z-10 bg-primary/90 hover:bg-primary">Nuevo</Badge>
      )}

      <div className="relative h-92 overflow-hidden">
        <Link href={`/${product.categoria}/${selectedColor ? `${product.name}-${selectedColor.name}`.replace(/\s+/g, '-') : `${product.name}-${product.colors[0].name}`.replace(/\s+/g, '-')}`}>
        <Image
          className="w-full h-full object-fit object-center transform group-hover:scale-105 transition-transform duration-500"
          src={selectedColor ? selectedColor.image : product.colors[0].image}
          alt={product.name}
          width={500}
          height={600}
          priority
        />
        </Link>
      
      </div>

      <div className="p-5">
        <div className="flex justify-between items-start">
          <h2 className="text-lg font-medium text-gray-900 group-hover:text-primary transition-colors">
            {product.name}
          </h2>
        </div>

        <p className="text-gray-500 text-sm mb-2">
          {selectedColor ? selectedColor.name : product.colors[0].name}
        </p>

        <p className="text-primary font-bold mb-1">
          ${product.price.toFixed(2)}
        </p>

        <p className="text-sm text-gray-600 font-extralight mb-3">
          {selectedColor ? selectedColor.stock : product.colors[0].stock} unidades disponibles
        </p>

        <div className="space-y-3">
          <p className="text-xs font-medium text-gray-700">Colores disponibles</p>
          <div className="flex gap-2">
            {product.colors.map((color) => (
              <button
                key={color.name}
                onClick={() => setSelectedColor(color)}
                className={cn(
                  "relative w-4 h-4 rounded-full transition-all duration-200",
                  color.class,
                  selectedColor?.name === color.name ? "ring-2 ring-offset-2 ring-primary" : "hover:scale-110"
                )}
                aria-label={`Color ${color.name}`}
              >
                {selectedColor?.name === color.name && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <div className="w-2 h-2 bg-white rounded-full" />
                  </motion.div>
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="absolute bottom-3 right-3">
        <Link href={`/${product.categoria}/${selectedColor ? `${product.name}-${selectedColor.name}`.replace(/\s+/g, '-') : `${product.name}-${product.colors[0].name}`.replace(/\s+/g, '-')}`}>

          <Button className="w-full gap-2 group rounded-[35px]">
            <ShoppingBag className="h-4 w-4 group-hover:scale-110 transition-transform" />
            Realizar pedido
          </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

