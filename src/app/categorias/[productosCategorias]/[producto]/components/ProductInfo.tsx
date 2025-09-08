"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

const ProductInfo = () => {
  const [activeTab, setActiveTab] = useState("descripcion")

  const handleTabChange = (value: string) => {
    setActiveTab(value)
  }

  return (
    <div className="border-t pt-6 mt-6">
      <Tabs defaultValue="descripcion" value={activeTab} onValueChange={handleTabChange} className="relative">
        <div className="relative">
          <TabsList className="grid w-full grid-cols-3 relative z-10">
            <TabsTrigger 
              value="descripcion" 
              className="relative z-20 transition-all duration-500 data-[state=active]:bg-black data-[state=active]:text-white"
            >
              Tecnologia
            </TabsTrigger>
            <TabsTrigger 
              value="caracteristicas" 
              className="relative z-20 transition-all duration-500 data-[state=active]:bg-black data-[state=active]:text-white"
            >
              Características
            </TabsTrigger>
            <TabsTrigger 
              value="envio" 
              className="relative z-20 transition-all duration-500 data-[state=active]:bg-black data-[state=active]:text-white"
            >
              Envío
            </TabsTrigger>
          </TabsList>        
        </div>

        <div className="relative mt-6 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
                duration: 0.3,
              }}
              className="relative"
            >
              <TabsContent value="descripcion" className="pt-4 m-0">
                <div className="prose prose-sm max-w-none">
                  <p>
                    Este producto está diseñado con los más altos estándares de calidad para garantizar durabilidad y
                    comodidad. Ideal para uso diario y ocasiones especiales.
                  </p>
                  <p>
                    La tela de alta calidad proporciona una sensación suave al tacto mientras mantiene su forma incluso
                    después de múltiples lavados.
                  </p>
                </div>
              </TabsContent>
              <TabsContent value="caracteristicas" className="pt-4 m-0">
                <ul className="list-disc pl-5 space-y-2 text-sm">
                  <li>Material: 100% algodón premium</li>
                  <li>Diseño ergonómico para mayor comodidad</li>
                  <li>Disponible en múltiples colores</li>
                  <li>Lavable a máquina</li>
                  <li>Fabricado en México</li>
                </ul>
              </TabsContent>
              <TabsContent value="envio" className="pt-4 m-0">
                <div className="prose prose-sm max-w-none">
                  <p>Envío disponible a todo México. Los tiempos de entrega varían según la ubicación:</p>
                  <ul>
                    <li>Ciudad de México: 1-2 días hábiles</li>
                    <li>Resto del país: 3-5 días hábiles</li>
                  </ul>
                  <p>
                    Para consultas sobre envíos internacionales, por favor contacte a nuestro equipo de atención al
                    cliente.
                  </p>
                </div>
              </TabsContent>
            </motion.div>
          </AnimatePresence>
        </div>
      </Tabs>
    </div>
  )
}

export default ProductInfo

