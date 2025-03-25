"use client"
import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

const TECHNOLOGIES = [
{ id: 4, src: '/images/Tecno/Aguardia 1.svg', desc: 'Con Aguardia, nuestras prendas actúan como una guardia contra el agua, manteniéndote seco y cómodo incluso en las condiciones más húmedas.' },

  { id: 2, src: '/images/Tecno/Ultra-Lit.svg', desc: 'Descubre la comodidad y la ligereza en cada prenda gracias a nuestra tecnología Ultra[Lit], diseñada para ofrecer una experiencia sin peso mientras exploras.' },
  { id: 3, src: '/images/Tecno/N-Seco_Negro.svg', desc: 'Nuestra tela N-Seco seca rápidamente para mantenerte cómodo en todo momento, sin importar cuán mojado te encuentres.' },
  { id: 1, src: '/images/Tecno/Sol-Vivo 1.svg', desc: 'Nuestra tecnología SolVivo ofrece una protección excepcional contra los dañinos rayos UV, permitiendo vivir y disfrutar del sol sin preocupaciones.' },
  { id: 5, src: '/images/Tecno/Transpiral.svg', desc: 'Diseñada para mantener una sensación térmica ideal, la tecnología Transpiral te protege contra condiciones climáticas adversas, permitiéndote aventura sin límites.' },
  { id: 6, src: '/images/Tecno/Fluye-Vent.svg', desc: 'Descubre el confort adicional con Fluye-Vent, que incorpora aberturas de ventilación estratégicamente colocadas en la espalda de nuestras prendas para una mayor comodidad durante tus aventuras.' },
  { id: 7, src: '/images/Tecno/Flex-Move_Negro.svg', desc: 'Experimenta la máxima movilidad con nuestra tecnología Flex-Move, que ofrece estiramiento en 4 direcciones para adaptarse a tus movimientos en cada aventura.' }
];

const TecnoBanner = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTech, setSelectedTech] = useState(4);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);

    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % TECHNOLOGIES.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + TECHNOLOGIES.length) % TECHNOLOGIES.length);
  };

  const MobileCarousel = () => (
    <div className="relative w-[90%] mx-auto px-4 drop-shadow-xl">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.3 }}
          className="flex items-center h-[140px] bg-white rounded-lg shadow-lg p-4"
        >
          <div className="w-1/4 flex justify-center items-center">
            <Image
              src={TECHNOLOGIES[currentIndex].src}
              alt={`Tecnología ${TECHNOLOGIES[currentIndex].id}`}
              width={200}
              height={200}
              className="object-cover"
            />
          </div>
          <div className="w-3/4 pl-4">
            <p className="text-xs">{TECHNOLOGIES[currentIndex].desc}</p>
          </div>
        </motion.div>
      </AnimatePresence>
      
      <button
        onClick={prevSlide}
        className="absolute left-0 top-[45%] transform -translate-y-1/2 bg-black text-white rounded-full p-2 z-10 h-8 w-8 flex items-center justify-center"
      >
        ←
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-0 top-[45%] transform -translate-y-1/2 bg-black text-white rounded-full p-2 z-10 h-8 w-8 flex items-center justify-center"
      >
        →
      </button>
      
      <div className="flex justify-center gap-2 mt-4">
        {TECHNOLOGIES.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2 w-2 rounded-full ${
              currentIndex === index ? 'bg-black' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    </div>
  );

  return (
    <>
      <div className='h-auto w-auto pt-[16px]'>
        <div className='flex px-4 md:px-16 py-4 items-center justify-center md:justify-between'>
          <div>
            <h2 className='text-[42px] md:text-[62px] font-bold'>Tecnología</h2>
            <div className='flex items-center gap-2'>
              <p onClick={() => setIsOpen(!isOpen)} className='text-[24px] md:text-[32px] cursor-pointer font-normal flex items-center underline'>
                Conoce mas
              </p>
              <motion.div
                className="w-6 h-6 flex items-center justify-center cursor-pointer -mt-[1px]"
                onClick={() => setIsOpen(!isOpen)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  className="relative w-4 h-4 flex items-center justify-center"
                  initial={false}
                  animate={isOpen ? "open" : "closed"}
                >
                  <motion.span
                    className="absolute w-full h-0.5 bg-black rounded-full"
                    variants={{
                      open: { rotate: 0 },
                      closed: { rotate: 90 }
                    }}
                    transition={{ duration: 0.3 }}
                  />
                  <motion.span
                    className="absolute w-full h-0.5 bg-black rounded-full"
                    variants={{
                      open: { opacity: 1 },
                      closed: { opacity: 1 }
                    }}
                  />
                </motion.div>
              </motion.div>
            </div>
          </div>
          <div className='h-auto hidden md:flex'>
            <div className='h-full w-auto'>
              <Image src={TECHNOLOGIES[3].src} alt='tecno-banner' width={184} height={184} />
            </div>
            <div className='h-auto w-auto bg-black'>
              <Image src={"/images/Tecno/Aguardia 1.svg"} alt='tecno-banner' width={160} height={160} />
            </div>
          </div>
        </div>
      </div>
      <motion.div
        initial={false}
        animate={{
          height: isOpen ? "auto" : 0,
          opacity: isOpen ? 1 : 0,
          marginTop: isOpen ? "2rem" : 0,
          marginBottom: isOpen ? "2rem" : 0
        }}
        transition={{
          duration: 0.3,
          ease: "easeInOut"
        }}
        className="overflow-hidden w-[95%] md:w-[80%] mx-auto"
      >
        {isMobile ? (
          <MobileCarousel />
        ) : (
          <div className="p-6">
            <div className="flex flex-col gap-8">
              <div className="flex justify-between items-center">
                {TECHNOLOGIES.map((tech) => (
                  <motion.div
                    key={tech.id}
                    className="relative cursor-pointer"
                    onClick={() => setSelectedTech(tech.id)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <motion.div
                      className="absolute inset-0 rounded-lg"
                      animate={{
                        backgroundColor: selectedTech === tech.id ? "#000000" : "rgba(0, 0, 0, 0)",
                        x: selectedTech === tech.id ? 0 : selectedTech > tech.id ? -20 : 20,
                        opacity: selectedTech === tech.id ? 1 : 0.7
                      }}
                      initial={false}
                      transition={{ 
                        duration: 0.5,
                        type: "spring",
                        stiffness: 100
                      }}
                      layoutId="techBackground"
                    />
                    <motion.div 
                      className={`relative p-4 ${selectedTech === tech.id ? 'shadow-4xl' : ''}`}
                      animate={{
                        x: selectedTech === tech.id ? 0 : selectedTech > tech.id ? -10 : 10,
                        scale: selectedTech === tech.id ? 1.1 : 1
                      }}
                      transition={{
                        duration: 0.4,
                        type: "spring",
                        stiffness: 150
                      }}
                    >
                      {tech.id === 4 ? (
                        <Image
                          src={tech.src}
                          alt={`Tecnología ${tech.id}`}
                          width={100}
                          height={100}
                          loading="lazy"
                          className={`transition-all duration-300 ${
                            selectedTech === tech.id ? "brightness-0 invert" : "brightness-0"
                          }`}
                        />
                      ) : (
                        <Image
                          src={tech.src}
                          alt={`Tecnología ${tech.id}`}
                          width={100}
                          height={100}
                          loading="lazy"
                          className={`transition-all duration-300 ${
                            selectedTech === tech.id ? "brightness-0 invert" : ""
                          }`}
                        />
                      )}
                    </motion.div>
                  </motion.div>
                ))}
              </div>

              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                key={selectedTech}
                transition={{ duration: 0.5 }}
              >
                <p className="text-lg">
                  {TECHNOLOGIES.find(tech => tech.id === selectedTech)?.desc}
                </p>
              </motion.div>
            </div>
          </div>
        )}
      </motion.div>
    </>
  )
}

export default TecnoBanner