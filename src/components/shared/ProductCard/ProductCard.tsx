"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Heart, ShoppingBag } from "lucide-react"
import Link from "next/link"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface ColorOption {
  name: string
  class: string
  image: string
  stock: number
  link: string
}

const colorOptions: ColorOption[] = [
    { name: "Azul", class: "bg-[#004963]", image: "/images/Producto/azul.webp", stock: 500 , link: "/hombre/camisa-azul" },
    { name: "Rojo", class: "bg-[#A91A26]", image: "/images/Producto/rojo.webp", stock: 1347 , link: "/hombre/camisa-roja" },
    { name: "Verde", class: "bg-[#607C4C]", image: "/images/Producto/verde.jpg", stock: 621 , link: "/hombre/camisa-verde" },
]

export default function ProductCard() {
  const [selectedColor, setSelectedColor] = useState<ColorOption | null>(null)
  const [isFavorite, setIsFavorite] = useState(false)

  const handleFavoriteClick = () => {
    setIsFavorite(!isFavorite)
  }

  return (
    <div className="group relative max-w-sm rounded-xl overflow-hidden shadow-lg bg-white hover:shadow-xl transition-all duration-300">
      <div className="absolute top-3 right-3 z-10">
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
                isFavorite ? "text-rose-500 fill-rose-500" : "text-gray-600 hover:text-rose-500",
              )}
            />
          </motion.div>
          <span className="sr-only">Añadir a favoritos</span>
        </Button>
      </div>

      <Badge className="absolute top-3 left-3 z-10 bg-primary/90 hover:bg-primary">Nuevo</Badge>

      <div className="relative h-92 overflow-hidden">
        <Link href={selectedColor ? selectedColor.link : colorOptions[0].link}>
          <Image
            className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-500"
            src={selectedColor ? selectedColor.image : "/images/Producto/azul.webp"}
            alt="Camisa manga larga outdoor"
            width={500}
            height={600}
            priority
          />
        </Link>
      </div>

      <div className="p-5">
        <div className="flex justify-between items-start">
          <h2 className="text-lg font-medium text-gray-900 group-hover:text-primary transition-colors">
            Camisa Outdoor Equipo
          </h2>
        </div>

        <p className="text-gray-500 text-sm mb-2">
          {selectedColor ? selectedColor.name : colorOptions[1].name}
        </p>

        <p className="text-primary text-sm font-bold mb-1">
          <span className="font-light">Desde</span> $1,799.00 <span className="font-light">hasta</span> $1,199.00
        </p>

        <p className="text-sm text-gray-600 font-extralight mb-3">
          {selectedColor ? selectedColor.stock : colorOptions[1].stock} unidades disponibles
        </p>

        <div className="space-y-3">
          <p className="text-xs font-medium text-gray-700">Colores disponibles</p>
          <div className="flex gap-2">
            {colorOptions.map((color) => (
              <button
                key={color.name}
                onClick={() => setSelectedColor(color)}
                className={cn(
                  "relative w-4 h-4 rounded-full transition-all duration-200",
                  color.class,
                  selectedColor?.name === color.name ? "ring-2 ring-offset-2 ring-primary" : "hover:scale-110",
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

        <div className="mt-5">
        <Link href={selectedColor ? selectedColor.link : colorOptions[0].link}>
          <Button className="w-full gap-2 group">
            <ShoppingBag className="h-4 w-4 group-hover:scale-110 transition-transform" />
            Realizar pedido
          </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

