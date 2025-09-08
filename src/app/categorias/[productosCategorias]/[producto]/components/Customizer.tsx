"use client"

import React, { useState, ChangeEvent } from 'react'
import Image from 'next/image'

interface CustomPosition {
  id: string
  top: string
  left?: string
  right?: string
}

const positions: CustomPosition[] = [
  { id: "pos1", top: "top-44", left: "left-34" },
  { id: "pos2", top: "top-50", left: "left-42" },
  { id: "pos3", top: "top-44", right: "right-34" },
  { id: "pos4", top: "top-50", right: "right-52" },
]

const Customizer = () => {
  const [selectedImages, setSelectedImages] = useState<{ [key: string]: string }>({})

  const handleImageSelect = async (e: ChangeEvent<HTMLInputElement>, positionId: string) => {
    const file = e.target.files?.[0]
    if (file) {
      const imageUrl = URL.createObjectURL(file)
      setSelectedImages(prev => ({
        ...prev,
        [positionId]: imageUrl
      }))
    }
  }

  return (
    <div className="flex flex-col items-center relative">
      <span className='text-xs font-light'>Selecciona tus secciones a bordar, cada seleccion te pedira una foto de tu logo o imagen</span>
      
      <Image src="/images/Producto/azul.webp" alt="Producto" width={300} height={400} />

      {positions.map((pos) => (
        <div key={pos.id} className={`absolute ${pos.top} ${pos.left || ''} ${pos.right || ''}`}>
          {selectedImages[pos.id] ? (
            <Image 
              src={selectedImages[pos.id]} 
              alt="Selected logo" 
              width={40} 
              height={40} 
              className="rounded-full object-cover"
            />
          ) : (
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleImageSelect(e, pos.id)}
              />
              <div className="h-4 w-4 border-2 border-primary rounded"></div>
            </label>
          )}
        </div>
      ))}
    </div>
  )
}

export default Customizer

