"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronDown } from 'lucide-react';
import { Button } from "@/components/ui/button";

export default function AboutPage() {
  const [isVisible, setIsVisible] = useState({
    history: false,
    panorama: false,
    commitment: false,
    mission: false,
  });
  
  const historyRef = useRef<HTMLDivElement>(null);
  const panoramaRef = useRef<HTMLDivElement>(null);
  const commitmentRef = useRef<HTMLDivElement>(null);
  const missionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target === historyRef.current) {
            setIsVisible(prev => ({ ...prev, history: entry.isIntersecting }));
          } else if (entry.target === panoramaRef.current) {
            setIsVisible(prev => ({ ...prev, panorama: entry.isIntersecting }));
          } else if (entry.target === commitmentRef.current) {
            setIsVisible(prev => ({ ...prev, commitment: entry.isIntersecting }));
          } else if (entry.target === missionRef.current) {
            setIsVisible(prev => ({ ...prev, mission: entry.isIntersecting }));
          }
        });
      },
      { threshold: 0.2 }
    );
    
    const historyElement = historyRef.current;
    const panoramaElement = panoramaRef.current;
    const commitmentElement = commitmentRef.current;
    const missionElement = missionRef.current;
    
    if (historyElement) observer.observe(historyElement);
    if (panoramaElement) observer.observe(panoramaElement);
    if (commitmentElement) observer.observe(commitmentElement);
    if (missionElement) observer.observe(missionElement);
    
    return () => {
      if (historyElement) observer.unobserve(historyElement);
      if (panoramaElement) observer.unobserve(panoramaElement);
      if (commitmentElement) observer.unobserve(commitmentElement);
      if (missionElement) observer.unobserve(missionElement);
    };
  }, []);
  
  const scrollToHistory = () => {
    historyRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="w-full overflow-x-hidden bg-neutral-50">
      <section className="w-full relative h-[calc(100vh-36px)] flex items-center justify-center">
        <div className="absolute inset-0 bg-black/30 z-10" />
        
        <Image
          src="/images/Nosotros/Per-Mon.webp"
          alt="Imagen principal de nosotros"
          fill
          className="object-cover object-top"
          priority
          sizes="100vw"
        />
        
        <div className="relative z-20 text-center px-4 sm:px-6 max-w-4xl mx-auto">
          <motion.h1 
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Nuestra Historia de Excelencia
          </motion.h1>
          
          <motion.p 
            className="text-lg sm:text-xl text-white mb-8 max-w-2xl mx-auto drop-shadow-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Descubre nuestra trayectoria de innovación y compromiso con la calidad que nos ha convertido en líderes del sector.
          </motion.p>
          
          
        </div>
        
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <ChevronDown className="w-10 h-10 text-white cursor-pointer" onClick={scrollToHistory} />
        </motion.div>
        
        <motion.div 
          className="absolute bottom-8 right-8 md:bottom-0 md:right-16 z-10"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <Image
            src="/images/Nosotros/Social-Res.svg"
            alt="Social Responsibility Icon"
            width={300}
            height={300}
            className="w-[150px] h-[150px] sm:w-[200px] sm:h-[200px] md:w-[300px] md:h-[300px] "
          />
        </motion.div>
      </section>

      <section 
        ref={historyRef}
        className="w-full py-16 md:py-24 bg-white"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
            <motion.div 
              className="flex flex-col justify-center"
              initial={{ opacity: 0, x: -50 }}
              animate={isVisible.history ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-gray-900">Algo tiene la baja</h2>
              <div className="w-20 h-1 bg-amber-500 mb-8"></div>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
              En MAJA® se representa el concepto &ldquo;Mexican Baja&rdquo;. Nuestra línea de ropa outdoor captura la esencia, paisajes y actividades que ofrece este terruño abrazado por El Pacífico y El Mar de Cortés.

Algo tiene &ldquo;La Baja&rdquo;, nos llama a la exploración, la pesca, la montaña, el surfear las olas y respirar su aire fresco.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
              Somos una marca mexicana hecha con muchas ganas y respeto por conservar este territorio como un tesoro nacional.
              </p>
            </motion.div>
            
            <motion.div 
              className="relative h-[400px] md:h-[500px] lg:h-[600px] rounded-lg overflow-hidden shadow-xl"
              initial={{ opacity: 0, x: 50 }}
              animate={isVisible.history ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Image
                src="/images/Nosotros/Lentes-Jeep.webp"
                alt="Imagen sobre nuestra historia"
                fill
                className="object-cover object-top hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </motion.div>
          </div>
        </div>
      </section>

 

      <section 
        ref={panoramaRef}
        className="w-full h-[50vh] md:h-[70vh] lg:h-[80vh] relative overflow-hidden"
      >
        <motion.div
          className="absolute inset-0"

        >
          <Image
            src="/images/Nosotros/Razor-Per.webp"
            alt="Imagen panorámica de nuestra empresa"
            fill
            className="object-cover object-top"
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <motion.div 
              className="text-center px-4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isVisible.panorama ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 drop-shadow-lg">
                Nos identificamos con la cultura Baja
              </h2>
              <div className="w-24 h-1 bg-amber-500 mx-auto mb-8"></div>
               <div className="flex flex-col gap-4">

<p className="text-lg md:text-xl text-white max-w-3xl mx-auto">
Respeto por el medio ambiente.              </p>
              <p className="text-lg md:text-xl text-white max-w-3xl mx-auto">
Nunca dejes de ser tú.              </p>
              <p className="text-lg md:text-xl text-white max-w-3xl mx-auto">
La vida es una búsqueda constante.              </p>
              <p className="text-lg md:text-xl text-white max-w-3xl mx-auto">
Moda NO, utilidad SÍ.
              </p>
          
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      <section 
        ref={commitmentRef}
        className="w-full py-16 md:py-24 bg-white"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
            <motion.div 
              className="relative h-[400px] md:h-[500px] lg:h-[600px] rounded-lg overflow-hidden shadow-xl order-2 md:order-1"
              initial={{ opacity: 0, x: -50 }}
              animate={isVisible.commitment ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <Image
                src="/images/Nosotros/Per-Cactus.webp"
                alt="Imagen de nuestro equipo"
                fill
                className="object-cover object-top hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </motion.div>
            
            <motion.div 
              className="flex flex-col justify-center order-1 md:order-2"
              initial={{ opacity: 0, x: 50 }}
              animate={isVisible.commitment ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-gray-900">Nuestro compromiso</h2>
              <div className="w-20 h-1 bg-amber-500 mb-8"></div>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Nuestras prendas y nuestra empresa despiertan el espíritu de aventura, fomentamos el respeto por el mundo natural.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-8">
              Queremos que te veas bien mientras eres tú, aprovechando el uso de la tecnología para la creación de ropa cómoda y útil que contribuya en el desempeño de tus actividades.
              </p>
              {/* <Button className="w-fit bg-gray-900 hover:bg-gray-800 text-white">
                Conoce Más
              </Button> */}
            </motion.div>
          </div>
        </div>
      </section>

      <section 
        ref={missionRef}
        className="w-full py-16 md:py-24 bg-neutral-100"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
            <motion.div 
              className="flex flex-col justify-center"
              initial={{ opacity: 0, x: -50 }}
              animate={isVisible.mission ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-gray-900">Nuestra Misión</h2>
              <div className="w-20 h-1 bg-amber-500 mb-8"></div>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Inspirar y equipar a los aventureros con ropa outdoor de alta calidad que combine funcionalidad y estilo, mientras promovemos la conservación y el respeto por los paisajes únicos de Baja California.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Nos esforzamos por crear productos que no solo resistan las exigencias de la naturaleza, sino que también reflejen el espíritu libre y la cultura única de nuestra región.
              </p>
            </motion.div>
            
            <motion.div 
              className="relative h-[400px] md:h-[500px] lg:h-[600px] rounded-lg overflow-hidden shadow-xl"
              initial={{ opacity: 0, x: 50 }}
              animate={isVisible.mission ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Image
                src="/images/Nosotros/Gen-Play.webp"
                alt="Imagen de nuestra misión"
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="w-full py-16 md:py-24 relative bg-fixed bg-cover bg-center" style={{
          backgroundImage: `url('/images/Nosotros/Fondos/jeep_pattern_duna_comp.webp')`
        }}>
        <div className="absolute inset-0 bg-black/40" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-white">Nuestros Valores</h2>
            <div className="w-20 h-1 bg-amber-500 mx-auto mb-8"></div>
            <p className="text-lg text-white max-w-3xl mx-auto">
              Los principios que guían nuestras acciones y decisiones cada día.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Innovación", description: "Buscamos constantemente nuevas formas de mejorar y superar expectativas." },
              { title: "Calidad", description: "Nos comprometemos con la excelencia en cada detalle de nuestros productos y servicios." },
              { title: "Sostenibilidad", description: "Trabajamos para minimizar nuestro impacto ambiental y contribuir positivamente a la sociedad." },
              { title: "Integridad", description: "Actuamos con honestidad y transparencia en todas nuestras relaciones comerciales." },
              { title: "Colaboración", description: "Creemos en el poder del trabajo en equipo para lograr resultados extraordinarios." },
              { title: "Responsabilidad", description: "Asumimos la responsabilidad de nuestras acciones y sus consecuencias." }
            ].map((value, index) => (
              <motion.div 
                key={index}
                className="bg-white/80 backdrop-blur-sm p-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true, amount: 0.3 }}
              >
                <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center mb-6 mx-auto">
                  <span className="text-white font-bold text-xl">{index + 1}</span>
                </div>
                <h3 className="text-xl font-bold mb-4 text-center text-gray-900">{value.title}</h3>
                <p className="text-gray-700 text-center">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full py-16 md:py-24 bg-black text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">¿Listo para conocernos mejor?</h2>
            <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
              Descubre cómo podemos ayudarte a alcanzar tus objetivos. Estamos aquí para responder a todas tus preguntas.
            </p>
            <Button size="lg" className="bg-amber-500 hover:bg-amber-600 text-black font-medium">
              Contáctanos Hoy
            </Button>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
