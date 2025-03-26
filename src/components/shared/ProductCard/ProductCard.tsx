"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { ShoppingBag } from "lucide-react"
import Link from "next/link"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
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

// Create a motion button by extending the Button component
const MotionButton = motion(Button);

export default function ProductCard({ product }: { product: Product }) {
  const [selectedColor, setSelectedColor] = useState<ColorOption | null>(product.colors[0]);
  
  const colorName = selectedColor ? selectedColor.name : product.colors[0].name;
  const productUrl = `/categorias/${product.categoria}/${product.name}-${colorName}`.replace(/\s+/g, '-');
  

  
  // const currentStock = selectedColor ? selectedColor.stock : product.colors[0].stock;

  return (
    <div className="group relative max-w-[320px] rounded-lg overflow-hidden shadow-lg bg-white hover:shadow-2xl transition-all duration-200">

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


{selectedColor && selectedColor.stock <= 5 && (
          <Badge className="absolute top-3 right-3 text-xs text-white bg-primary/90 z-10 font-medium ">
            ¡Últimas unidades disponibles!
          </Badge>
        )}

      <div className="relative aspect-[4/5] overflow-hidden">
        <Link href={productUrl}>
          <Image
            className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-500"
            src={selectedColor ? selectedColor.image : product.colors[0].image}
            alt={`${product.name} en color ${selectedColor ? selectedColor.name : product.colors[0].name}`}
            fill
            sizes="(max-width: 320px) 100vw"
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

        <p className="text-primary font-light mb-1">
          {product.price.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' })}
        </p>

        {/* <p className="text-sm text-gray-600 font-extralight mb-3">
          {selectedColor ? selectedColor.stock : product.colors[0].stock} unidades disponibles
        </p> */}

        


        <div className="space-y-2 mt-3">
          <p className="text-xs font-medium text-gray-700">Color seleccionado</p>
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
                title={`${color.name} - ${color.stock} disponibles`}
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
          <Link href={productUrl}>
            <MotionButton
              className="w-full gap-2 group rounded-[35px] hover:cursor-pointer"
              whileHover={{ y: [0, -3, 0] }}
              transition={{ duration: 0.8, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
              aria-label={`Ver detalles de ${product.name}`}
            >
              <ShoppingBag className="h-4 w-4 group-hover:scale-110 transition-transform" />
              Ver producto
            </MotionButton>
          </Link>
        </div>
      </div>
    </div>
  );
}

